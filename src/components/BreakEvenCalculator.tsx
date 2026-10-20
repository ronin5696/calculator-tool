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

function monthlyPayment(principal: number, annualRate: number, months: number): number {
  if (annualRate === 0) return principal / months;
  const r = annualRate / 100 / 12;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

export default function BreakEvenCalculator() {
  const [mode, setMode] = useState<"quick" | "detailed">("detailed");

  // Detailed inputs
  const [loanBalance, setLoanBalance] = useState(380000);
  const [currentRate, setCurrentRate] = useState(7.125);
  const [currentTermYears, setCurrentTermYears] = useState(28);
  const [newRate, setNewRate] = useState(5.875);
  const [newTermYears, setNewTermYears] = useState(30);

  // Quick inputs
  const [quickCurrentPayment, setQuickCurrentPayment] = useState(2550);
  const [quickNewPayment, setQuickNewPayment] = useState(2250);

  // Common inputs
  const [closingCosts, setClosingCosts] = useState(5500);
  const [plannedYearsInHome, setPlannedYearsInHome] = useState(7);

  // Calculation engine
  const calculation = useMemo(() => {
    let curPmt = 0;
    let newPmt = 0;

    if (mode === "detailed") {
      curPmt = monthlyPayment(loanBalance, currentRate, currentTermYears * 12);
      newPmt = monthlyPayment(loanBalance, newRate, newTermYears * 12);
    } else {
      curPmt = quickCurrentPayment;
      newPmt = quickNewPayment;
    }

    const monthlySavings = curPmt - newPmt;
    const isPositiveSavings = monthlySavings > 0;
    const breakEvenMonths = isPositiveSavings ? Math.ceil(closingCosts / monthlySavings) : Infinity;
    const breakEvenYears = isPositiveSavings ? (breakEvenMonths / 12).toFixed(1) : "N/A";

    const plannedMonths = plannedYearsInHome * 12;
    const totalSavingsAtHorizon = isPositiveSavings ? (monthlySavings * plannedMonths) - closingCosts : 0;
    const totalGrossSavings = isPositiveSavings ? monthlySavings * plannedMonths : 0;
    const roiPercentage = closingCosts > 0 ? (totalSavingsAtHorizon / closingCosts) * 100 : 0;

    // Opportunity cost of investing closing costs at 6% annual return
    const monthlyOppRate = 0.06 / 12;
    const opportunityCost = closingCosts * Math.pow(1 + monthlyOppRate, plannedMonths) - closingCosts;

    // Timeline chart data (up to 120 months or 1.5x planned months)
    const maxMonths = Math.min(180, Math.max(120, plannedMonths + 24));
    const timelineData: Array<{ month: number; year: string; netCash: number; grossSavings: number }> = [];

    let runningNet = -closingCosts;
    let runningGross = 0;

    for (let m = 0; m <= maxMonths; m += 6) {
      if (m === 0) {
        timelineData.push({ month: 0, year: "Month 0", netCash: -closingCosts, grossSavings: 0 });
      } else {
        runningGross = isPositiveSavings ? monthlySavings * m : 0;
        runningNet = runningGross - closingCosts;
        const yearLabel = `Yr ${(m / 12).toFixed(1)}`;
        timelineData.push({
          month: m,
          year: yearLabel,
          netCash: Math.round(runningNet),
          grossSavings: Math.round(runningGross),
        });
      }
    }

    // Verdict logic
    let verdict: { title: string; desc: string; badge: string; color: string; bg: string; border: string } = {
      title: "Strong Refinance Candidate",
      desc: `Your break-even horizon of ${breakEvenMonths} months is well within your ${plannedYearsInHome}-year holding period. You will come out ahead by ${fmt(totalSavingsAtHorizon)}.`,
      badge: "✅ STRONGLY RECOMMENDED",
      color: "#15803d",
      bg: "#f0fdf4",
      border: "#86efac",
    };

    if (!isPositiveSavings) {
      verdict = {
        title: "Do Not Refinance",
        desc: "Your new monthly payment is higher than your existing payment. Refinancing would increase your monthly outlay without generating break-even savings.",
        badge: "❌ NOT RECOMMENDED",
        color: "#991b1b",
        bg: "#fef2f2",
        border: "#fca5a5",
      };
    } else if (breakEvenMonths > plannedMonths) {
      verdict = {
        title: "Will Not Break Even Before You Move",
        desc: `You need ${breakEvenMonths} months to recoup your ${fmt(closingCosts)} closing costs, but you plan to leave in ${plannedMonths} months (${plannedYearsInHome} years). You will lose ${fmt(Math.abs(totalSavingsAtHorizon))}.`,
        badge: "⚠️ UNFAVORABLE",
        color: "#b45309",
        bg: "#fffbeb",
        border: "#fde68a",
      };
    } else if (plannedMonths - breakEvenMonths < 12) {
      verdict = {
        title: "Marginal Return",
        desc: `You break even in ${breakEvenMonths} months, leaving only ${plannedMonths - breakEvenMonths} months of positive cash flow before moving. Net gain is modest at ${fmt(totalSavingsAtHorizon)}.`,
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
      opportunityCost,
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
    quickCurrentPayment,
    quickNewPayment,
    closingCosts,
    plannedYearsInHome,
  ]);

  // Export JSON
  const exportJSON = useCallback(() => {
    const payload = {
      calculator: "DevsPoint Break-Even Engine (dp-breakeven-v2)",
      generatedAt: new Date().toISOString(),
      formula: "BreakEvenMonths = Ceil(ClosingCosts / MonthlySavingsDelta)",
      inputs: {
        mode,
        closingCostsUSD: closingCosts,
        plannedYearsInHome,
        loanBalanceUSD: mode === "detailed" ? loanBalance : null,
        currentMonthlyPayment: calculation.currentPayment,
        newMonthlyPayment: calculation.newPayment,
      },
      results: {
        monthlySavingsUSD: calculation.monthlySavings,
        breakEvenMonths: calculation.breakEvenMonths === Infinity ? null : calculation.breakEvenMonths,
        netSavingsAtHorizonUSD: calculation.totalSavingsAtHorizon,
        roiPercentage: Number(calculation.roiPercentage.toFixed(1)),
        verdict: calculation.verdict.title,
      },
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `break-even-analysis-${closingCosts}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [calculation, mode, closingCosts, plannedYearsInHome, loanBalance]);

  return (
    <div className="calc-section-wrapper" id="break-even">
      {/* Mode Switcher */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
        <div className="tabs" style={{ background: "var(--surface)", padding: 4, borderRadius: 12 }}>
          <button
            type="button"
            className={`tab-btn ${mode === "detailed" ? "active" : ""}`}
            onClick={() => setMode("detailed")}
          >
            Loan Terms Mode (Auto-Compute Payments)
          </button>
          <button
            type="button"
            className={`tab-btn ${mode === "quick" ? "active" : ""}`}
            onClick={() => setMode("quick")}
          >
            Direct Payments Mode (Enter Payments Directly)
          </button>
        </div>
      </div>

      <div className="calc-inputs-grid">
        {/* Left Inputs Card */}
        <div className="calc-card">
          <div className="calc-title">
            <div className="calc-title-icon">📊</div>
            {mode === "detailed" ? "Loan Parameters" : "Monthly Payment Comparison"}
          </div>

          {mode === "detailed" ? (
            <>
              <div className="form-group">
                <label className="form-label" htmlFor="be-loan-balance">
                  <span>Current Loan Balance</span>
                  <span style={{ color: "var(--primary)", fontWeight: 700 }}>{fmt(loanBalance)}</span>
                </label>
                <div className="form-input-wrapper">
                  <span className="form-prefix">$</span>
                  <input
                    id="be-loan-balance"
                    type="number"
                    className="form-input"
                    value={loanBalance}
                    onChange={(e) => setLoanBalance(Number(e.target.value))}
                    step={5000}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="be-cur-rate">
                    <span>Current Rate (%)</span>
                  </label>
                  <input
                    id="be-cur-rate"
                    type="number"
                    className="form-input no-prefix"
                    value={currentRate}
                    onChange={(e) => setCurrentRate(Number(e.target.value))}
                    step={0.125}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="be-new-rate">
                    <span>New Rate (%)</span>
                  </label>
                  <input
                    id="be-new-rate"
                    type="number"
                    className="form-input no-prefix"
                    value={newRate}
                    onChange={(e) => setNewRate(Number(e.target.value))}
                    step={0.125}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="be-cur-term">
                    <span>Current Term Left</span>
                  </label>
                  <input
                    id="be-cur-term"
                    type="number"
                    className="form-input no-prefix"
                    value={currentTermYears}
                    onChange={(e) => setCurrentTermYears(Number(e.target.value))}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="be-new-term">
                    <span>New Loan Term</span>
                  </label>
                  <input
                    id="be-new-term"
                    type="number"
                    className="form-input no-prefix"
                    value={newTermYears}
                    onChange={(e) => setNewTermYears(Number(e.target.value))}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label className="form-label" htmlFor="be-quick-cur">
                  <span>Current Monthly Payment</span>
                  <span style={{ color: "var(--primary)", fontWeight: 700 }}>{fmt(quickCurrentPayment)}/mo</span>
                </label>
                <div className="form-input-wrapper">
                  <span className="form-prefix">$</span>
                  <input
                    id="be-quick-cur"
                    type="number"
                    className="form-input"
                    value={quickCurrentPayment}
                    onChange={(e) => setQuickCurrentPayment(Number(e.target.value))}
                    step={50}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="be-quick-new">
                  <span>New Quoted Monthly Payment</span>
                  <span style={{ color: "var(--success)", fontWeight: 700 }}>{fmt(quickNewPayment)}/mo</span>
                </label>
                <div className="form-input-wrapper">
                  <span className="form-prefix">$</span>
                  <input
                    id="be-quick-new"
                    type="number"
                    className="form-input"
                    value={quickNewPayment}
                    onChange={(e) => setQuickNewPayment(Number(e.target.value))}
                    step={50}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Inputs Card: Friction & Horizon */}
        <div className="calc-card">
          <div className="calc-title">
            <div className="calc-title-icon">🎯</div>
            Closing Costs &amp; Time Horizon
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="be-costs">
              <span>Total Closing Costs (Fees &amp; Friction)</span>
              <span style={{ color: "#ef4444", fontWeight: 700 }}>{fmt(closingCosts)}</span>
            </label>
            <div className="form-input-wrapper">
              <span className="form-prefix">$</span>
              <input
                id="be-costs"
                type="number"
                className="form-input"
                value={closingCosts}
                onChange={(e) => setClosingCosts(Number(e.target.value))}
                min={0}
                max={50000}
                step={250}
              />
            </div>
            <input
              type="range"
              className="range-slider"
              min={1000}
              max={20000}
              step={250}
              value={closingCosts}
              onChange={(e) => setClosingCosts(Number(e.target.value))}
              style={{ "--val": `${((closingCosts - 1000) / (20000 - 1000)) * 100}%` } as React.CSSProperties}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="be-horizon">
              <span>How Long Do You Plan to Stay in This Home?</span>
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>{plannedYearsInHome} Years ({plannedYearsInHome * 12} Months)</span>
            </label>
            <div className="form-input-wrapper">
              <input
                id="be-horizon"
                type="number"
                className="form-input no-prefix has-suffix"
                value={plannedYearsInHome}
                onChange={(e) => setPlannedYearsInHome(Math.max(1, Number(e.target.value)))}
                min={1}
                max={30}
              />
              <span className="form-suffix">Years</span>
            </div>
            <input
              type="range"
              className="range-slider"
              min={1}
              max={20}
              step={1}
              value={plannedYearsInHome}
              onChange={(e) => setPlannedYearsInHome(Number(e.target.value))}
              style={{ "--val": `${((plannedYearsInHome - 1) / (20 - 1)) * 100}%` } as React.CSSProperties}
            />
          </div>

          {/* Quick formula callout */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 18px", marginTop: 18, fontSize: 13, color: "var(--text-secondary)" }}>
            <strong>Formula:</strong> <code>Break-Even (Months) = Closing Costs ÷ Monthly Payment Savings</code>
          </div>
        </div>
      </div>

      {/* Verdict Callout Banner */}
      <div style={{
        background: calculation.verdict.bg,
        border: `1.5px solid ${calculation.verdict.border}`,
        borderRadius: 20,
        padding: "24px 32px",
        margin: "32px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
        flexWrap: "wrap",
      }}>
        <div style={{ maxWidth: 700 }}>
          <span style={{
            fontSize: 12,
            fontWeight: 800,
            padding: "4px 12px",
            borderRadius: 100,
            background: "rgba(0,0,0,0.06)",
            color: calculation.verdict.color,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}>
            {calculation.verdict.badge}
          </span>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: calculation.verdict.color, margin: "10px 0 6px" }}>
            {calculation.verdict.title}
          </h3>
          <p style={{ fontSize: 14, color: calculation.verdict.color, lineHeight: 1.6, margin: 0, opacity: 0.9 }}>
            {calculation.verdict.desc}
          </p>
        </div>

        <button type="button" onClick={exportJSON} className="tab-btn" style={{ background: "white", borderColor: calculation.verdict.border, color: calculation.verdict.color, fontWeight: 700 }}>
          💻 Export Analysis JSON
        </button>
      </div>

      {/* Key Result Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginBottom: 32 }}>
        <div className="result-metric-card" style={{ background: "white", padding: 24, borderRadius: 18, border: "1px solid var(--border)" }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>Break-Even Horizon</span>
          <div style={{ fontSize: 32, fontWeight: 800, color: "var(--primary)", marginTop: 6 }}>
            {calculation.breakEvenMonths === Infinity ? "Never" : `${calculation.breakEvenMonths} Mos`}
          </div>
          <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>
            {calculation.breakEvenMonths === Infinity ? "No monthly savings" : `Roughly ${calculation.breakEvenYears} years`}
          </span>
        </div>

        <div className="result-metric-card" style={{ background: "white", padding: 24, borderRadius: 18, border: "1px solid var(--border)" }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>Monthly Payment Savings</span>
          <div style={{ fontSize: 32, fontWeight: 800, color: calculation.monthlySavings > 0 ? "var(--success)" : "#ef4444", marginTop: 6 }}>
            {calculation.monthlySavings > 0 ? `+${fmtFull(calculation.monthlySavings)}` : fmtFull(calculation.monthlySavings)}
          </div>
          <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>
            {fmtFull(calculation.currentPayment)} → {fmtFull(calculation.newPayment)}
          </span>
        </div>

        <div className="result-metric-card" style={{ background: "white", padding: 24, borderRadius: 18, border: "1px solid var(--border)" }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>Net Profit Over {plannedYearsInHome} Yrs</span>
          <div style={{ fontSize: 32, fontWeight: 800, color: calculation.totalSavingsAtHorizon > 0 ? "var(--success)" : "#ef4444", marginTop: 6 }}>
            {fmt(calculation.totalSavingsAtHorizon)}
          </div>
          <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>
            After subtracting {fmt(closingCosts)} fees
          </span>
        </div>

        <div className="result-metric-card" style={{ background: "white", padding: 24, borderRadius: 18, border: "1px solid var(--border)" }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>Return on Investment (ROI)</span>
          <div style={{ fontSize: 32, fontWeight: 800, color: calculation.roiPercentage > 0 ? "#7c3aed" : "var(--text-muted)", marginTop: 6 }}>
            {calculation.roiPercentage.toFixed(0)}%
          </div>
          <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>
            Net profit on closing friction
          </span>
        </div>
      </div>

      {/* Break-Even Visual Cross-Over Chart */}
      <div className="calc-card" style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, color: "var(--dark)", marginBottom: 8 }}>
          Cumulative Net Cash Trajectory (Crossing the Zero Line)
        </h3>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 20 }}>
          At Month 0, you start at -{fmt(closingCosts)}. Each month, your monthly payment savings push the curve upward until it crosses zero into net wealth creation.
        </p>

        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer>
            <AreaChart data={calculation.timelineData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="netCashGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="year" stroke="#94a3b8" />
              <YAxis tickFormatter={(val) => `$${Math.round(val / 1000)}k`} stroke="#94a3b8" />
              <Tooltip formatter={(val: any) => fmt(Number(val))} />
              <ReferenceLine y={0} stroke="#ef4444" strokeWidth={1.5} strokeDasharray="3 3" label={{ value: "Break-Even $0", fill: "#ef4444", fontSize: 12 }} />
              <Area type="monotone" dataKey="netCash" name="Cumulative Net Cash" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#netCashGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
