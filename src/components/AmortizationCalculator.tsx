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

function fmt(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function fmtFull(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(n);
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
  const [loanAmount, setLoanAmount] = useState(400000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTermYears, setLoanTermYears] = useState(30);
  const [extraMonthly, setExtraMonthly] = useState(150);
  const [startYear, setStartYear] = useState(new Date().getFullYear());
  const [startMonth, setStartMonth] = useState(new Date().getMonth() + 1);

  const [scheduleView, setScheduleView] = useState<"annual" | "monthly">("annual");
  const [page, setPage] = useState(1);
  const pageSize = 24;

  // Discrete Amortization Calculation
  const calculation = useMemo(() => {
    const totalMonths = loanTermYears * 12;
    const r = interestRate / 100 / 12;

    // Base monthly payment without extra payment
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

    // Reset baseline for chart tracking
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

      // Baseline comparison for the chart
      if (baselineBalance > 0) {
        const bInt = baselineBalance * r;
        const bPrin = Math.min(baselineBalance, baseMonthly - bInt);
        baselineBalance = Math.max(0, baselineBalance - bPrin);
      }

      const monthName = new Date(curYear, curMonth - 1, 1).toLocaleString("en-US", { month: "short" });
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

      // End of calendar year or loan completion
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

  // Export CSV
  const exportCSV = useCallback(() => {
    const headers = ["Period", "Date", "Total Payment", "Principal", "Interest", "Extra Payment", "Ending Balance", "Total Interest Paid"];
    const csvContent = [
      headers.join(","),
      ...calculation.monthlyRows.map((r) =>
        [r.period, `"${r.dateStr}"`, r.payment.toFixed(2), r.principal.toFixed(2), r.interest.toFixed(2), r.extraPayment.toFixed(2), r.balance.toFixed(2), r.totalInterestPaid.toFixed(2)].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `amortization-schedule-${loanAmount}-${loanTermYears}yr.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [calculation, loanAmount, loanTermYears]);

  // Export JSON
  const exportJSON = useCallback(() => {
    const payload = {
      calculator: "DevsPoint Amortization Engine (dp-amort-v2)",
      generatedAt: new Date().toISOString(),
      parameters: {
        principalUSD: loanAmount,
        nominalAnnualRatePct: interestRate,
        termYears: loanTermYears,
        extraMonthlyPaymentUSD: extraMonthly,
        startPeriod: `${startMonth}/${startYear}`,
      },
      summary: {
        regularMonthlyPayment: Number(calculation.baseMonthly.toFixed(2)),
        totalInterestPaid: Number(calculation.totalInterest.toFixed(2)),
        totalInterestSavedWithExtra: Number(calculation.interestSaved.toFixed(2)),
        monthsAccelerated: calculation.monthsSaved,
        payoffDate: calculation.payoffDate,
      },
      annualSchedule: calculation.annualRows,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `amortization-data-${loanAmount}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [calculation, loanAmount, interestRate, loanTermYears, extraMonthly, startMonth, startYear]);

  // Pagination for monthly view
  const paginatedMonthly = useMemo(() => {
    const start = (page - 1) * pageSize;
    return calculation.monthlyRows.slice(start, start + pageSize);
  }, [calculation.monthlyRows, page]);

  const totalPages = Math.ceil(calculation.monthlyRows.length / pageSize);

  return (
    <div className="calc-section-wrapper" id="amortization">
      {/* Inputs Grid */}
      <div className="calc-inputs-grid">
        <div className="calc-card">
          <div className="calc-title">
            <div className="calc-title-icon">📐</div>
            Loan Parameters
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="amort-principal">
              <span>Loan Amount / Principal</span>
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>{fmt(loanAmount)}</span>
            </label>
            <div className="form-input-wrapper">
              <span className="form-prefix">$</span>
              <input
                id="amort-principal"
                type="number"
                className="form-input"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Math.max(1000, Number(e.target.value)))}
                min={5000}
                max={5000000}
                step={5000}
              />
            </div>
            <input
              type="range"
              className="range-slider"
              min={50000}
              max={1500000}
              step={5000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              style={{ "--val": `${((loanAmount - 50000) / (1500000 - 50000)) * 100}%` } as React.CSSProperties}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="amort-rate">
              <span>Annual Interest Rate (%)</span>
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>{interestRate}%</span>
            </label>
            <div className="form-input-wrapper">
              <input
                id="amort-rate"
                type="number"
                className="form-input no-prefix has-suffix"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                min={0.1}
                max={20}
                step={0.1}
              />
              <span className="form-suffix">%</span>
            </div>
            <input
              type="range"
              className="range-slider"
              min={1}
              max={15}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              style={{ "--val": `${((interestRate - 1) / (15 - 1)) * 100}%` } as React.CSSProperties}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="amort-term">
              <span>Loan Term</span>
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>{loanTermYears} Years</span>
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 8 }}>
              {[15, 20, 30].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setLoanTermYears(t)}
                  style={{
                    padding: "10px",
                    borderRadius: 10,
                    border: loanTermYears === t ? "2px solid var(--primary)" : "1px solid var(--border)",
                    background: loanTermYears === t ? "var(--primary-light)" : "white",
                    color: loanTermYears === t ? "var(--primary)" : "var(--dark)",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {t} Years
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Extra Payment & Acceleration */}
        <div className="calc-card">
          <div className="calc-title">
            <div className="calc-title-icon">⚡</div>
            Prepayment &amp; Acceleration
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="amort-extra">
              <span>Extra Payment Per Month</span>
              <span style={{ color: "var(--success)", fontWeight: 700 }}>+{fmt(extraMonthly)}/mo</span>
            </label>
            <div className="form-input-wrapper">
              <span className="form-prefix">$</span>
              <input
                id="amort-extra"
                type="number"
                className="form-input"
                value={extraMonthly}
                onChange={(e) => setExtraMonthly(Math.max(0, Number(e.target.value)))}
                min={0}
                max={10000}
                step={25}
              />
            </div>
            <input
              type="range"
              className="range-slider"
              min={0}
              max={2000}
              step={25}
              value={extraMonthly}
              onChange={(e) => setExtraMonthly(Number(e.target.value))}
              style={{ "--val": `${(extraMonthly / 2000) * 100}%` } as React.CSSProperties}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="form-group">
              <label className="form-label" htmlFor="start-month">
                <span>Start Month</span>
              </label>
              <select
                id="start-month"
                className="form-input no-prefix"
                value={startMonth}
                onChange={(e) => setStartMonth(Number(e.target.value))}
                style={{ height: 48 }}
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(2024, i, 1).toLocaleString("en-US", { month: "long" })}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="start-year">
                <span>Start Year</span>
              </label>
              <input
                id="start-year"
                type="number"
                className="form-input no-prefix"
                value={startYear}
                onChange={(e) => setStartYear(Number(e.target.value))}
                min={2000}
                max={2050}
                style={{ height: 48 }}
              />
            </div>
          </div>

          {/* Quick Stat Pill */}
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 14, padding: "16px 20px", marginTop: 24 }}>
            <div style={{ fontSize: 13, color: "#166534", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Payoff Acceleration Impact
            </div>
            <div style={{ fontSize: 20, color: "#15803d", fontWeight: 800, marginTop: 4 }}>
              Save {fmt(calculation.interestSaved)} in Interest
            </div>
            <div style={{ fontSize: 13, color: "#166534", marginTop: 4 }}>
              Eliminate {Math.floor(calculation.monthsSaved / 12)} years {calculation.monthsSaved % 12} months of payments.
            </div>
          </div>
        </div>
      </div>

      {/* Primary KPI Results */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, margin: "32px 0" }}>
        <div className="result-metric-card" style={{ background: "white", padding: 24, borderRadius: 18, border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>Monthly Principal &amp; Interest</span>
          <div style={{ fontSize: 28, fontWeight: 800, color: "var(--dark)", marginTop: 6 }}>
            {fmtFull(calculation.baseMonthly)}
          </div>
          <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>Base required payment</span>
        </div>

        <div className="result-metric-card" style={{ background: "white", padding: 24, borderRadius: 18, border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>Total With Extra Payment</span>
          <div style={{ fontSize: 28, fontWeight: 800, color: "var(--primary)", marginTop: 6 }}>
            {fmtFull(calculation.baseMonthly + extraMonthly)}
          </div>
          <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>Total monthly out-of-pocket</span>
        </div>

        <div className="result-metric-card" style={{ background: "white", padding: 24, borderRadius: 18, border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>Total Lifetime Interest</span>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#9333ea", marginTop: 6 }}>
            {fmt(calculation.totalInterest)}
          </div>
          <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>Cumulative financing cost</span>
        </div>

        <div className="result-metric-card" style={{ background: "white", padding: 24, borderRadius: 18, border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>Projected Debt-Free Date</span>
          <div style={{ fontSize: 28, fontWeight: 800, color: "var(--success)", marginTop: 6 }}>
            {calculation.payoffDate}
          </div>
          <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>Final payoff milestone</span>
        </div>
      </div>

      {/* Visual Chart */}
      <div className="calc-card" style={{ margin: "32px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h3 style={{ fontSize: 18, color: "var(--dark)", margin: 0 }}>Loan Balance Amortization Trajectory</h3>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0" }}>
              Visualizing principal decay curve with extra payments (solid blue) vs standard schedule (purple).
            </p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button type="button" onClick={exportCSV} className="tab-btn" style={{ fontSize: 12, padding: "6px 14px" }}>
              📥 Export CSV
            </button>
            <button type="button" onClick={exportJSON} className="tab-btn" style={{ fontSize: 12, padding: "6px 14px" }}>
              💻 Export JSON
            </button>
          </div>
        </div>

        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer>
            <AreaChart data={calculation.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1a56db" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#1a56db" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9333ea" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="year" stroke="#94a3b8" />
              <YAxis tickFormatter={(val) => `$${Math.round(val / 1000)}k`} stroke="#94a3b8" />
              <Tooltip formatter={(value: any) => fmt(Number(value))} />
              <Legend />
              <Area type="monotone" dataKey="actualBalance" name="With Extra Payment" stroke="#1a56db" strokeWidth={2.5} fillOpacity={1} fill="url(#colorActual)" />
              <Area type="monotone" dataKey="baselineBalance" name="Standard Schedule" stroke="#9333ea" strokeWidth={1.5} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorBaseline)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Amortization Schedule Table */}
      <div className="calc-card" style={{ marginTop: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <div className="calc-title" style={{ margin: 0 }}>
            <div className="calc-title-icon">📋</div>
            Comprehensive Amortization Schedule
          </div>
          <div className="tabs" style={{ margin: 0 }}>
            <button
              type="button"
              className={`tab-btn ${scheduleView === "annual" ? "active" : ""}`}
              onClick={() => { setScheduleView("annual"); setPage(1); }}
            >
              Annual Summary
            </button>
            <button
              type="button"
              className={`tab-btn ${scheduleView === "monthly" ? "active" : ""}`}
              onClick={() => { setScheduleView("monthly"); setPage(1); }}
            >
              Monthly Breakdown
            </button>
          </div>
        </div>

        <div className="table-responsive" style={{ overflowX: "auto" }}>
          {scheduleView === "annual" ? (
            <table className="amort-table" style={{ width: "100%", textAlign: "right" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left" }}>Year</th>
                  <th>Principal Paid</th>
                  <th>Interest Paid</th>
                  <th>Extra Paid</th>
                  <th>Ending Balance</th>
                </tr>
              </thead>
              <tbody>
                {calculation.annualRows.map((row) => (
                  <tr key={row.year}>
                    <td style={{ textAlign: "left", fontWeight: 700 }}>{row.year}</td>
                    <td style={{ color: "var(--primary)" }}>{fmt(row.principalPaid)}</td>
                    <td style={{ color: "#ef4444" }}>{fmt(row.interestPaid)}</td>
                    <td style={{ color: "var(--success)" }}>{row.extraPaid > 0 ? `+${fmt(row.extraPaid)}` : "—"}</td>
                    <td style={{ fontWeight: 600 }}>{fmt(row.endingBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <>
              <table className="amort-table" style={{ width: "100%", textAlign: "right" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>#</th>
                    <th style={{ textAlign: "left" }}>Date</th>
                    <th>Payment</th>
                    <th>Principal</th>
                    <th>Interest</th>
                    <th>Extra</th>
                    <th>Ending Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedMonthly.map((row) => (
                    <tr key={row.period}>
                      <td style={{ textAlign: "left", color: "var(--text-muted)" }}>{row.period}</td>
                      <td style={{ textAlign: "left", fontWeight: 600 }}>{row.dateStr}</td>
                      <td>{fmtFull(row.payment)}</td>
                      <td style={{ color: "var(--primary)" }}>{fmtFull(row.principal)}</td>
                      <td style={{ color: "#ef4444" }}>{fmtFull(row.interest)}</td>
                      <td style={{ color: "var(--success)" }}>{row.extraPayment > 0 ? `+${fmtFull(row.extraPayment)}` : "—"}</td>
                      <td style={{ fontWeight: 600 }}>{fmt(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination controls */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
                <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
                  Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, calculation.monthlyRows.length)} of {calculation.monthlyRows.length} months
                </span>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    type="button"
                    className="tab-btn"
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    style={{ opacity: page === 1 ? 0.5 : 1 }}
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    className="tab-btn"
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    style={{ opacity: page === totalPages ? 0.5 : 1 }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
