"use client";

import { useState, useMemo, useCallback } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function fmtINR(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

function fmtINRLakh(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 10000000) {
    return `${n < 0 ? "-" : ""}₹${(abs / 10000000).toFixed(2)} Cr`;
  }
  if (abs >= 100000) {
    return `${n < 0 ? "-" : ""}₹${(abs / 100000).toFixed(2)} Lakh`;
  }
  return fmtINR(n);
}

interface AmortRow {
  period: number;
  dateStr: string;
  payment: number;
  principal: number;
  interest: number;
  extraPayment: number;
  balance: number;
  totalInterestPaid: number;
}

interface YearSummary {
  year: number;
  principalPaid: number;
  interestPaid: number;
  extraPaid: number;
  endingBalance: number;
}

export default function AmortizationCalculator() {
  // Indian home loan defaults: ₹45 Lakhs, 8.5% p.a., 20 years, ₹5,000 extra prepayment
  const [loanAmount, setLoanAmount] = useState(4500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTermYears, setLoanTermYears] = useState(20);
  const [extraMonthly, setExtraMonthly] = useState(5000);
  const [startYear] = useState(new Date().getFullYear());
  const [startMonth] = useState(new Date().getMonth() + 1);

  const [scheduleView, setScheduleView] = useState<"annual" | "monthly">("annual");
  const [page, setPage] = useState(1);
  const pageSize = 24;

  // Discrete Amortization Calculation
  const calculation = useMemo(() => {
    const totalMonths = loanTermYears * 12;
    const r = interestRate / 100 / 12;

    const baseMonthly =
      r === 0
        ? loanAmount / totalMonths
        : (loanAmount * r * Math.pow(1 + r, totalMonths)) / (Math.pow(1 + r, totalMonths) - 1);

    const monthlyRows: AmortRow[] = [];
    const annualRows: YearSummary[] = [];

    let currentBalance = loanAmount;
    let baselineBalance = loanAmount;
    let accumulatedInterest = 0;
    let baselineTotalInterest = 0;

    let curYear = startYear;
    let curMonth = startMonth;

    let yearPrincipal = 0;
    let yearInterest = 0;
    let yearExtra = 0;

    const chartData: Array<{
      year: number;
      actualBalance: number;
      baselineBalance: number;
      cumulativeInterest: number;
    }> = [];

    // Simulate baseline without extra payment
    for (let m = 1; m <= totalMonths; m++) {
      if (baselineBalance > 0) {
        const intPmt = baselineBalance * r;
        const prinPmt = Math.min(baselineBalance, baseMonthly - intPmt);
        baselineBalance -= prinPmt;
        baselineTotalInterest += intPmt;
      }
    }

    baselineBalance = loanAmount;

    let period = 0;
    while (currentBalance > 0 && period < 600) {
      period++;
      const interestPmt = currentBalance * r;
      let principalPmt = baseMonthly - interestPmt;
      let actualExtra = extraMonthly;

      if (currentBalance < principalPmt + actualExtra) {
        if (currentBalance < principalPmt) {
          principalPmt = currentBalance;
          actualExtra = 0;
        } else {
          actualExtra = currentBalance - principalPmt;
        }
      }

      const totalPaidThisMonth = principalPmt + interestPmt + actualExtra;
      currentBalance = Math.max(0, currentBalance - (principalPmt + actualExtra));
      accumulatedInterest += interestPmt;

      yearPrincipal += principalPmt;
      yearInterest += interestPmt;
      yearExtra += actualExtra;

      if (baselineBalance > 0) {
        const bInt = baselineBalance * r;
        const bPrin = Math.min(baselineBalance, baseMonthly - bInt);
        baselineBalance = Math.max(0, baselineBalance - bPrin);
      }

      const monthName = new Date(curYear, curMonth - 1, 1).toLocaleString("en-IN", { month: "short" });
      const dateStr = `${monthName} ${curYear}`;

      monthlyRows.push({
        period,
        dateStr,
        payment: totalPaidThisMonth,
        principal: principalPmt,
        interest: interestPmt,
        extraPayment: actualExtra,
        balance: currentBalance,
        totalInterestPaid: accumulatedInterest,
      });

      if (curMonth === 12 || currentBalance === 0) {
        annualRows.push({
          year: curYear,
          principalPaid: yearPrincipal,
          interestPaid: yearInterest,
          extraPaid: yearExtra,
          endingBalance: currentBalance,
        });

        chartData.push({
          year: curYear,
          actualBalance: Math.round(currentBalance),
          baselineBalance: Math.round(baselineBalance),
          cumulativeInterest: Math.round(accumulatedInterest),
        });

        yearPrincipal = 0;
        yearInterest = 0;
        yearExtra = 0;
      }

      curMonth++;
      if (curMonth > 12) {
        curMonth = 1;
        curYear++;
      }
    }

    const actualPayoffMonths = monthlyRows.length;
    const monthsSaved = totalMonths - actualPayoffMonths;
    const interestSaved = baselineTotalInterest - accumulatedInterest;
    const finalDateStr = monthlyRows.length > 0 ? monthlyRows[monthlyRows.length - 1].dateStr : "";

    return {
      baseMonthly,
      totalPaid: loanAmount + accumulatedInterest,
      totalInterest: accumulatedInterest,
      baselineTotalInterest,
      interestSaved: Math.max(0, interestSaved),
      monthsSaved: Math.max(0, monthsSaved),
      payoffDate: finalDateStr,
      monthlyRows,
      annualRows,
      chartData,
    };
  }, [loanAmount, interestRate, loanTermYears, extraMonthly, startYear, startMonth]);

  const totalPages = Math.ceil(calculation.monthlyRows.length / pageSize);
  const paginatedMonthly = calculation.monthlyRows.slice((page - 1) * pageSize, page * pageSize);

  const exportCSV = useCallback(() => {
    let csv = "Period,Date,EMI Payment,Principal,Interest,Extra Prepayment,Ending Balance,Total Interest Paid\n";
    calculation.monthlyRows.forEach((r) => {
      csv += `${r.period},"${r.dateStr}",${r.payment.toFixed(2)},${r.principal.toFixed(2)},${r.interest.toFixed(2)},${r.extraPayment.toFixed(2)},${r.balance.toFixed(2)},${r.totalInterestPaid.toFixed(2)}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `home-loan-amortization-${loanAmount}-inr.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }, [calculation, loanAmount]);

  return (
    <div className="calc-section-wrapper">
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <span className="section-tag">📋 Indian Home Loan Amortization</span>
        <h1 style={{ fontSize: "clamp(24px, 4vw, 38px)", color: "var(--dark)", margin: "12px 0 8px" }}>
          Home Loan EMI &amp; Prepayment Amortization Calculator
        </h1>
        <p style={{ color: "var(--text-secondary)", maxWidth: 640, margin: "0 auto", fontSize: 16, lineHeight: 1.6 }}>
          Visualize your monthly principal vs. interest breakdown, and see how small monthly part-prepayments can save lakhs in interest under RBI guidelines.
        </p>
      </div>

      {/* Inputs */}
      <div className="calc-inputs-grid" style={{ marginBottom: 32 }}>
        <div className="calc-card">
          <div className="calc-title">
            <span className="calc-title-icon">💰</span> Home Loan Details
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="amort-loan-amount">
              <span>Home Loan Principal</span>
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>
                {fmtINR(loanAmount)} <span style={{ fontSize: 12, color: "var(--text-muted)" }}>({fmtINRLakh(loanAmount)})</span>
              </span>
            </label>
            <div className="form-input-wrapper">
              <span className="form-prefix">₹</span>
              <input
                id="amort-loan-amount"
                type="number"
                className="form-input"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                min={500000}
                max={50000000}
                step={50000}
              />
            </div>
            <input
              type="range"
              className="range-slider"
              min={500000}
              max={20000000}
              step={50000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              style={{ "--val": `${((loanAmount - 500000) / (20000000 - 500000)) * 100}%` } as React.CSSProperties}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="amort-rate">
              <span>Interest Rate (% p.a.)</span>
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>{interestRate}%</span>
            </label>
            <div className="form-input-wrapper">
              <input
                id="amort-rate"
                type="number"
                className="form-input no-prefix has-suffix"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                min={6.5}
                max={16}
                step={0.05}
              />
              <span className="form-suffix">%</span>
            </div>
            <input
              type="range"
              className="range-slider"
              min={6.5}
              max={15}
              step={0.05}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              style={{ "--val": `${((interestRate - 6.5) / (15 - 6.5)) * 100}%` } as React.CSSProperties}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="amort-term">
              <span>Loan Tenure (Years)</span>
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>{loanTermYears} Years ({loanTermYears * 12} EMIs)</span>
            </label>
            <div className="form-input-wrapper">
              <input
                id="amort-term"
                type="number"
                className="form-input no-prefix has-suffix"
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                min={1}
                max={30}
                step={1}
              />
              <span className="form-suffix">yrs</span>
            </div>
            <input
              type="range"
              className="range-slider"
              min={1}
              max={30}
              step={1}
              value={loanTermYears}
              onChange={(e) => setLoanTermYears(Number(e.target.value))}
              style={{ "--val": `${((loanTermYears - 1) / (30 - 1)) * 100}%` } as React.CSSProperties}
            />
          </div>
        </div>

        <div className="calc-card">
          <div className="calc-title">
            <span className="calc-title-icon">⚡</span> Prepayment Accelerator (RBI Zero Penalty)
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="amort-extra">
              <span>Extra Monthly Principal Prepayment</span>
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>{fmtINR(extraMonthly)}/mo</span>
            </label>
            <div className="form-input-wrapper">
              <span className="form-prefix">₹</span>
              <input
                id="amort-extra"
                type="number"
                className="form-input"
                value={extraMonthly}
                onChange={(e) => setExtraMonthly(Number(e.target.value))}
                min={0}
                max={100000}
                step={1000}
              />
            </div>
            <input
              type="range"
              className="range-slider"
              min={0}
              max={50000}
              step={1000}
              value={extraMonthly}
              onChange={(e) => setExtraMonthly(Number(e.target.value))}
              style={{ "--val": `${(extraMonthly / 50000) * 100}%` } as React.CSSProperties}
            />
            <p style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 8, lineHeight: 1.5 }}>
              💡 <strong>RBI Rule:</strong> All floating-rate home loans issued by Indian banks &amp; HFCs to individual borrowers have <strong>zero prepayment charges</strong>. Prepaying directly reduces your principal!
            </p>
          </div>

          {extraMonthly > 0 && calculation.interestSaved > 0 && (
            <div style={{ background: "linear-gradient(135deg, #ecfdf5, #d1fae5)", border: "1px solid #10b981", borderRadius: 12, padding: "16px 20px", marginTop: 20 }}>
              <div style={{ fontWeight: 700, color: "#065f46", fontSize: 15, marginBottom: 4 }}>
                Prepayment Impact Summary:
              </div>
              <div style={{ fontSize: 14, color: "#047857", lineHeight: 1.6 }}>
                Paying an extra <strong>{fmtINR(extraMonthly)}/mo</strong> will save you{" "}
                <strong>{fmtINR(Math.round(calculation.interestSaved))}</strong> ({fmtINRLakh(calculation.interestSaved)}) in interest and close your loan{" "}
                <strong>{Math.floor(calculation.monthsSaved / 12)} years {calculation.monthsSaved % 12} months earlier</strong>!
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="results-metrics-grid" style={{ marginBottom: 32 }}>
        <div className="metric-card">
          <div className="metric-label">Base Monthly EMI</div>
          <div className="metric-value">{fmtINR(Math.round(calculation.baseMonthly))}</div>
          <div className="metric-sub">Standard monthly payment</div>
        </div>

        <div className="metric-card highlight">
          <div className="metric-label">Total Interest (with Prepayment)</div>
          <div className="metric-value" style={{ color: "var(--primary)" }}>
            {fmtINR(Math.round(calculation.totalInterest))}
          </div>
          <div className="metric-sub">{fmtINRLakh(calculation.totalInterest)}</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Interest Saved by Prepaying</div>
          <div className="metric-value" style={{ color: "#10b981" }}>
            {fmtINR(Math.round(calculation.interestSaved))}
          </div>
          <div className="metric-sub">{fmtINRLakh(calculation.interestSaved)} in net savings</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Loan Freedom Date</div>
          <div className="metric-value" style={{ color: "#7c3aed" }}>
            {calculation.payoffDate || "N/A"}
          </div>
          <div className="metric-sub">{calculation.monthsSaved} months saved</div>
        </div>
      </div>

      {/* Amortization Chart */}
      <div className="calc-card" style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, color: "var(--dark)", marginBottom: 12 }}>
          Principal Decay: Standard vs. Accelerated Prepayment (₹)
        </h3>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20 }}>
          Visual comparison showing how monthly prepayments crush the remaining principal balance years ahead of schedule.
        </p>
        <div style={{ height: 320, width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={calculation.chartData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
              <Tooltip formatter={(v: any) => fmtINR(Number(v))} />
              <Legend />
              <Area type="monotone" dataKey="baselineBalance" name="Standard Schedule" stroke="#94a3b8" fill="#f1f5f9" />
              <Area type="monotone" dataKey="actualBalance" name="With Prepayment" stroke="#1a56db" fill="#93c5fd" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Amortization Table */}
      <div className="calc-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h3 style={{ fontSize: 18, color: "var(--dark)", margin: "0 0 4px" }}>
              Amortization Schedule Breakdown
            </h3>
            <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>
              Inspect annual totals or dive into individual monthly EMI installments
            </span>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <div className="tabs" style={{ marginBottom: 0 }}>
              <button
                className={`tab-btn ${scheduleView === "annual" ? "active" : ""}`}
                onClick={() => setScheduleView("annual")}
              >
                Annual Summary
              </button>
              <button
                className={`tab-btn ${scheduleView === "monthly" ? "active" : ""}`}
                onClick={() => setScheduleView("monthly")}
              >
                Monthly Breakdown
              </button>
            </div>
            <button
              onClick={exportCSV}
              className="export-btn"
              style={{ display: "flex", alignItems: "center", gap: 6 }}
            >
              📥 Export CSV
            </button>
          </div>
        </div>

        {scheduleView === "annual" ? (
          <div className="table-wrapper">
            <table className="amort-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Principal Paid</th>
                  <th>Interest Paid</th>
                  <th>Prepayment</th>
                  <th>Ending Balance</th>
                </tr>
              </thead>
              <tbody>
                {calculation.annualRows.map((row) => (
                  <tr key={row.year}>
                    <td>Year {row.year}</td>
                    <td style={{ fontWeight: 600 }}>{fmtINR(Math.round(row.principalPaid))}</td>
                    <td style={{ color: "#dc2626" }}>{fmtINR(Math.round(row.interestPaid))}</td>
                    <td style={{ color: "#059669" }}>{row.extraPaid > 0 ? fmtINR(Math.round(row.extraPaid)) : "-"}</td>
                    <td style={{ fontWeight: 700, color: "var(--primary)" }}>{fmtINR(Math.round(row.endingBalance))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <div className="table-wrapper">
              <table className="amort-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Month</th>
                    <th>Total EMI</th>
                    <th>Principal</th>
                    <th>Interest</th>
                    <th>Prepayment</th>
                    <th>Remaining Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedMonthly.map((m) => (
                    <tr key={m.period}>
                      <td>{m.period}</td>
                      <td>{m.dateStr}</td>
                      <td>{fmtINR(Math.round(m.payment))}</td>
                      <td>{fmtINR(Math.round(m.principal))}</td>
                      <td style={{ color: "#dc2626" }}>{fmtINR(Math.round(m.interest))}</td>
                      <td style={{ color: "#059669" }}>{m.extraPayment > 0 ? fmtINR(Math.round(m.extraPayment)) : "-"}</td>
                      <td style={{ fontWeight: 600 }}>{fmtINR(Math.round(m.balance))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
                <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
                  Showing page {page} of {totalPages} ({calculation.monthlyRows.length} total payments)
                </span>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="tab-btn"
                    style={{ padding: "6px 14px" }}
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="tab-btn"
                    style={{ padding: "6px 14px" }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
