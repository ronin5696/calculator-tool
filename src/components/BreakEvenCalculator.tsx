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
  ReferenceLine,
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

function monthlyEMI(principal: number, annualRate: number, months: number): number {
  if (annualRate === 0) return principal / months;
  const r = annualRate / 100 / 12;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

export default function BreakEvenCalculator() {
  const [mode, setMode] = useState<"detailed" | "quick">("detailed");

  // Detailed inputs (Indian defaults: ₹50 Lakhs, 9.15% existing, 8.35% new, ₹18k switching charges)
  const [loanBalance, setLoanBalance] = useState(5000000);
  const [currentRate, setCurrentRate] = useState(9.15);
  const [currentTermYears, setCurrentTermYears] = useState(18);
  const [newRate, setNewRate] = useState(8.35);
  const [newTermYears, setNewTermYears] = useState(18);

  // Quick inputs
  const [quickCurrentEMI, setQuickCurrentEMI] = useState(48000);
  const [quickNewEMI, setQuickNewEMI] = useState(44500);

  // Common switching costs & planned holding horizon
  const [switchingCosts, setSwitchingCosts] = useState(18000);
  const [plannedYearsHolding, setPlannedYearsHolding] = useState(8);

  const calculation = useMemo(() => {
    let curPmt = 0;
    let newPmt = 0;

    if (mode === "detailed") {
      curPmt = monthlyEMI(loanBalance, currentRate, currentTermYears * 12);
      newPmt = monthlyEMI(loanBalance, newRate, newTermYears * 12);
    } else {
      curPmt = quickCurrentEMI;
      newPmt = quickNewEMI;
    }

    const monthlySavings = curPmt - newPmt;
    const isPositiveSavings = monthlySavings > 0;
    const breakEvenMonths = isPositiveSavings ? Math.ceil(switchingCosts / monthlySavings) : Infinity;
    const breakEvenYears = isPositiveSavings ? (breakEvenMonths / 12).toFixed(1) : "N/A";

    const plannedMonths = plannedYearsHolding * 12;
    const totalSavingsAtHorizon = isPositiveSavings ? monthlySavings * plannedMonths - switchingCosts : 0;
    const totalGrossSavings = isPositiveSavings ? monthlySavings * plannedMonths : 0;
    const roiPercentage = switchingCosts > 0 ? (totalSavingsAtHorizon / switchingCosts) * 100 : 0;

    // Timeline chart data
    const maxMonths = Math.min(180, Math.max(96, plannedMonths + 24));
    const timelineData: Array<{ month: number; year: string; netCash: number; grossSavings: number }> = [];

    let runningGross = 0;
    for (let m = 0; m <= maxMonths; m += 6) {
      if (m === 0) {
        timelineData.push({ month: 0, year: "Start", netCash: -switchingCosts, grossSavings: 0 });
      } else {
        runningGross = isPositiveSavings ? monthlySavings * m : 0;
        const runningNet = runningGross - switchingCosts;
        timelineData.push({
          month: m,
          year: `Yr ${(m / 12).toFixed(1)}`,
          netCash: Math.round(runningNet),
          grossSavings: Math.round(runningGross),
        });
      }
    }

    // Verdict logic
    let verdict = {
      title: "Strong Balance Transfer Candidate",
      desc: `You will recoup your switching charges of ${fmtINR(switchingCosts)} in just ${breakEvenMonths} months. Across your ${plannedYearsHolding}-year horizon, your net gain will be ${fmtINR(Math.round(totalSavingsAtHorizon))} (${fmtINRLakh(totalSavingsAtHorizon)}).`,
      badge: "✅ HIGHLY RECOMMENDED",
      color: "#15803d",
      bg: "#f0fdf4",
      border: "#86efac",
    };

    if (!isPositiveSavings) {
      verdict = {
        title: "Do Not Transfer Loan",
        desc: "Your new monthly EMI is equal to or higher than your current EMI. A balance transfer would increase your monthly outlay without recovering switching charges.",
        badge: "❌ NOT RECOMMENDED",
        color: "#991b1b",
        bg: "#fef2f2",
        border: "#fca5a5",
      };
    } else if (breakEvenMonths > plannedMonths) {
      verdict = {
        title: "Will Not Break Even Before Planned Tenure",
        desc: `You require ${breakEvenMonths} months to recoup ${fmtINR(switchingCosts)} in switching fees, but you plan to close or sell within ${plannedMonths} months (${plannedYearsHolding} years). You will face a net loss of ${fmtINR(Math.abs(Math.round(totalSavingsAtHorizon)))}.`,
        badge: "⚠️ UNFAVORABLE",
        color: "#b45309",
        bg: "#fffbeb",
        border: "#fde68a",
      };
    } else if (plannedMonths - breakEvenMonths < 12) {
      verdict = {
        title: "Marginal Financial Return",
        desc: `You will break even in ${breakEvenMonths} months, leaving only ${plannedMonths - breakEvenMonths} months of positive savings before your planned horizon.`,
        badge: "⚠️ MARGINAL",
        color: "#b45309",
        bg: "#fffbeb",
        border: "#fde68a",
      };
    }

    return {
      currentPayment: curPmt,
      newPayment: newPmt,
      monthlySavings,
      breakEvenMonths,
      breakEvenYears,
      totalSavingsAtHorizon,
      totalGrossSavings,
      roiPercentage,
      verdict,
      timelineData,
    };
  }, [
    mode,
    loanBalance,
    currentRate,
    currentTermYears,
    newRate,
    newTermYears,
    quickCurrentEMI,
    quickNewEMI,
    switchingCosts,
    plannedYearsHolding,
  ]);

  const exportJSON = useCallback(() => {
    const payload = {
      calculator: "DevsPoint Home Loan Break-Even Engine (India)",
      currency: "INR",
      generatedAt: new Date().toISOString(),
      formula: "BreakEvenMonths = Ceil(SwitchingCosts / MonthlyEMISavings)",
      inputs: {
        mode,
        switchingCostsINR: switchingCosts,
        plannedYearsHolding,
        loanBalanceINR: mode === "detailed" ? loanBalance : null,
        currentMonthlyEMI: Math.round(calculation.currentPayment),
        newMonthlyEMI: Math.round(calculation.newPayment),
      },
      results: {
        monthlySavingsINR: Math.round(calculation.monthlySavings),
        breakEvenMonths: calculation.breakEvenMonths === Infinity ? null : calculation.breakEvenMonths,
        netSavingsAtHorizonINR: Math.round(calculation.totalSavingsAtHorizon),
        roiPercentage: Number(calculation.roiPercentage.toFixed(1)),
        verdict: calculation.verdict.title,
      },
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `home-loan-break-even-${switchingCosts}-inr.json`);
    link.click();
    URL.revokeObjectURL(url);
  }, [mode, switchingCosts, plannedYearsHolding, loanBalance, calculation]);

  return (
    <div className="calc-section-wrapper">
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <span className="section-tag">⏱️ Balance Transfer Feasibility</span>
        <h1 style={{ fontSize: "clamp(24px, 4vw, 38px)", color: "var(--dark)", margin: "12px 0 8px" }}>
          Home Loan Balance Transfer Break-Even Calculator
        </h1>
        <p style={{ color: "var(--text-secondary)", maxWidth: 640, margin: "0 auto", fontSize: 16, lineHeight: 1.6 }}>
          Calculate the exact month when your EMI savings fully recover the switching fees (MODT, stamp duty, processing, legal charges) of transferring your home loan in India.
        </p>
      </div>

      {/* Mode Toggle */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
        <div className="tabs" style={{ marginBottom: 0 }}>
          <button
            className={`tab-btn ${mode === "detailed" ? "active" : ""}`}
            onClick={() => setMode("detailed")}
          >
            📊 Detailed (Rates &amp; Balance)
          </button>
          <button
            className={`tab-btn ${mode === "quick" ? "active" : ""}`}
            onClick={() => setMode("quick")}
          >
            ⚡ Quick (Direct EMI Input)
          </button>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="calc-inputs-grid" style={{ marginBottom: 32 }}>
        {mode === "detailed" ? (
          <>
            <div className="calc-card">
              <div className="calc-title">
                <span className="calc-title-icon">🏦</span> Existing Home Loan
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="be-loan-balance">
                  <span>Outstanding Principal</span>
                  <span style={{ color: "var(--primary)", fontWeight: 700 }}>
                    {fmtINR(loanBalance)} <span style={{ fontSize: 12, color: "var(--text-muted)" }}>({fmtINRLakh(loanBalance)})</span>
                  </span>
                </label>
                <div className="form-input-wrapper">
                  <span className="form-prefix">₹</span>
                  <input
                    id="be-loan-balance"
                    type="number"
                    className="form-input"
                    value={loanBalance}
                    onChange={(e) => setLoanBalance(Number(e.target.value))}
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
                  value={loanBalance}
                  onChange={(e) => setLoanBalance(Number(e.target.value))}
                  style={{ "--val": `${((loanBalance - 500000) / (20000000 - 500000)) * 100}%` } as React.CSSProperties}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="be-cur-rate">
                  <span>Current Interest Rate</span>
                  <span style={{ color: "var(--primary)", fontWeight: 700 }}>{currentRate}% p.a.</span>
                </label>
                <div className="form-input-wrapper">
                  <input
                    id="be-cur-rate"
                    type="number"
                    className="form-input no-prefix has-suffix"
                    value={currentRate}
                    onChange={(e) => setCurrentRate(Number(e.target.value))}
                    min={6.5}
                    max={16}
                    step={0.05}
                  />
                  <span className="form-suffix">%</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="be-cur-term">
                  <span>Remaining Tenure (Years)</span>
                  <span style={{ color: "var(--primary)", fontWeight: 700 }}>{currentTermYears} yrs</span>
                </label>
                <div className="form-input-wrapper">
                  <input
                    id="be-cur-term"
                    type="number"
                    className="form-input no-prefix has-suffix"
                    value={currentTermYears}
                    onChange={(e) => setCurrentTermYears(Number(e.target.value))}
                    min={1}
                    max={30}
                    step={1}
                  />
                  <span className="form-suffix">yrs</span>
                </div>
              </div>
            </div>

            <div className="calc-card">
              <div className="calc-title">
                <span className="calc-title-icon">✨</span> New Bank Offer
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="be-new-rate">
                  <span>New Interest Rate (RLLR)</span>
                  <span style={{ color: "var(--primary)", fontWeight: 700 }}>{newRate}% p.a.</span>
                </label>
                <div className="form-input-wrapper">
                  <input
                    id="be-new-rate"
                    type="number"
                    className="form-input no-prefix has-suffix"
                    value={newRate}
                    onChange={(e) => setNewRate(Number(e.target.value))}
                    min={6.5}
                    max={15}
                    step={0.05}
                  />
                  <span className="form-suffix">%</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="be-new-term">
                  <span>New Loan Tenure (Years)</span>
                  <span style={{ color: "var(--primary)", fontWeight: 700 }}>{newTermYears} yrs</span>
                </label>
                <div className="form-input-wrapper">
                  <input
                    id="be-new-term"
                    type="number"
                    className="form-input no-prefix has-suffix"
                    value={newTermYears}
                    onChange={(e) => setNewTermYears(Number(e.target.value))}
                    min={1}
                    max={30}
                    step={1}
                  />
                  <span className="form-suffix">yrs</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="be-switching-costs">
                  <span>Switching Charges (MODT + Processing + Legal)</span>
                  <span style={{ color: "var(--primary)", fontWeight: 700 }}>{fmtINR(switchingCosts)}</span>
                </label>
                <div className="form-input-wrapper">
                  <span className="form-prefix">₹</span>
                  <input
                    id="be-switching-costs"
                    type="number"
                    className="form-input"
                    value={switchingCosts}
                    onChange={(e) => setSwitchingCosts(Number(e.target.value))}
                    min={0}
                    max={100000}
                    step={1000}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="calc-card">
              <div className="calc-title">
                <span className="calc-title-icon">⚡</span> Current vs. New EMI
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="be-quick-cur">
                  <span>Current Monthly EMI</span>
                  <span style={{ color: "var(--primary)", fontWeight: 700 }}>{fmtINR(quickCurrentEMI)}</span>
                </label>
                <div className="form-input-wrapper">
                  <span className="form-prefix">₹</span>
                  <input
                    id="be-quick-cur"
                    type="number"
                    className="form-input"
                    value={quickCurrentEMI}
                    onChange={(e) => setQuickCurrentEMI(Number(e.target.value))}
                    min={5000}
                    max={500000}
                    step={500}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="be-quick-new">
                  <span>New Offered Monthly EMI</span>
                  <span style={{ color: "var(--primary)", fontWeight: 700 }}>{fmtINR(quickNewEMI)}</span>
                </label>
                <div className="form-input-wrapper">
                  <span className="form-prefix">₹</span>
                  <input
                    id="be-quick-new"
                    type="number"
                    className="form-input"
                    value={quickNewEMI}
                    onChange={(e) => setQuickNewEMI(Number(e.target.value))}
                    min={5000}
                    max={500000}
                    step={500}
                  />
                </div>
              </div>
            </div>

            <div className="calc-card">
              <div className="calc-title">
                <span className="calc-title-icon">💸</span> Transfer Expenses
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="be-quick-fees">
                  <span>Total Switching Charges</span>
                  <span style={{ color: "var(--primary)", fontWeight: 700 }}>{fmtINR(switchingCosts)}</span>
                </label>
                <div className="form-input-wrapper">
                  <span className="form-prefix">₹</span>
                  <input
                    id="be-quick-fees"
                    type="number"
                    className="form-input"
                    value={switchingCosts}
                    onChange={(e) => setSwitchingCosts(Number(e.target.value))}
                    min={0}
                    max={100000}
                    step={1000}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Planned Horizon Slider */}
      <div className="calc-card" style={{ marginBottom: 32 }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" htmlFor="be-horizon">
            <span>How long do you plan to hold this home loan?</span>
            <span style={{ color: "var(--primary)", fontWeight: 700 }}>{plannedYearsHolding} Years ({plannedYearsHolding * 12} Months)</span>
          </label>
          <input
            id="be-horizon"
            type="range"
            className="range-slider"
            min={1}
            max={25}
            step={1}
            value={plannedYearsHolding}
            onChange={(e) => setPlannedYearsHolding(Number(e.target.value))}
            style={{ "--val": `${((plannedYearsHolding - 1) / (25 - 1)) * 100}%` } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Verdict Alert Box */}
      <div
        style={{
          background: calculation.verdict.bg,
          border: `1px solid ${calculation.verdict.border}`,
          borderRadius: 14,
          padding: "20px 24px",
          marginBottom: 32,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <h3 style={{ margin: 0, color: calculation.verdict.color, fontSize: 18 }}>
            {calculation.verdict.title}
          </h3>
          <span
            style={{
              fontSize: 12,
              fontWeight: 800,
              background: calculation.verdict.border,
              color: calculation.verdict.color,
              padding: "4px 10px",
              borderRadius: 6,
            }}
          >
            {calculation.verdict.badge}
          </span>
        </div>
        <p style={{ margin: 0, color: calculation.verdict.color, fontSize: 14, lineHeight: 1.6 }}>
          {calculation.verdict.desc}
        </p>
      </div>

      {/* Results Cards */}
      <div className="results-metrics-grid" style={{ marginBottom: 32 }}>
        <div className="metric-card highlight">
          <div className="metric-label">Break-Even Velocity</div>
          <div className="metric-value" style={{ color: "var(--primary)" }}>
            {isFinite(calculation.breakEvenMonths) ? `${calculation.breakEvenMonths} Months` : "N/A"}
          </div>
          <div className="metric-sub">{calculation.breakEvenYears} years to recoup charges</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Monthly EMI Savings</div>
          <div className="metric-value" style={{ color: "#10b981" }}>
            {fmtINR(Math.round(calculation.monthlySavings))}
          </div>
          <div className="metric-sub">Saved every month</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Net Gain in {plannedYearsHolding} Years</div>
          <div className="metric-value" style={{ color: "#7c3aed" }}>
            {fmtINR(Math.round(calculation.totalSavingsAtHorizon))}
          </div>
          <div className="metric-sub">{fmtINRLakh(calculation.totalSavingsAtHorizon)} net profit</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Return on Investment (ROI)</div>
          <div className="metric-value">
            {calculation.roiPercentage > 0 ? `${calculation.roiPercentage.toFixed(0)}%` : "0%"}
          </div>
          <div className="metric-sub">Return on switching fees</div>
        </div>
      </div>

      {/* Break-Even Timeline Chart */}
      <div className="calc-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <h3 style={{ fontSize: 18, color: "var(--dark)", margin: "0 0 4px" }}>
              Net Cash Flow Trajectory (₹)
            </h3>
            <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>
              The curve starts at -₹{switchingCosts.toLocaleString("en-IN")} and crosses ₹0 at month {calculation.breakEvenMonths}
            </span>
          </div>
          <button onClick={exportJSON} className="export-btn">
            📥 Export JSON
          </button>
        </div>

        <div style={{ height: 320, width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={calculation.timelineData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
              <Tooltip formatter={(v: any) => fmtINR(Number(v))} />
              <ReferenceLine y={0} stroke="#dc2626" strokeDasharray="4 4" label="Break-Even (₹0)" />
              <Area type="monotone" dataKey="netCash" name="Net Cash Position" stroke="#10b981" fill="url(#colorNet)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
