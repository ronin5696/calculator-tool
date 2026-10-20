"use client";

import { useState, useMemo, useCallback } from "react";
import {
  PieChart,
  Pie,
  Cell,
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

function monthlyPayment(principal: number, annualRate: number, months: number): number {
  if (annualRate === 0) return principal / months;
  const r = annualRate / 100 / 12;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

export default function CashOutCalculator() {
  const [homeValue, setHomeValue] = useState(550000);
  const [currentBalance, setCurrentBalance] = useState(280000);
  const [desiredCashOut, setDesiredCashOut] = useState(60000);
  const [newRate, setNewRate] = useState(6.25);
  const [newTermYears, setNewTermYears] = useState(30);
  const [closingCosts, setClosingCosts] = useState(5000);
  const [rollCostsIntoLoan, setRollCostsIntoLoan] = useState(true);
  const [currentMonthlyPmt, setCurrentMonthlyPmt] = useState(1950);

  // Cash-out calculations with 80% LTV guardrail
  const calculation = useMemo(() => {
    const maxLTV = 0.8;
    const maxAllowedBalance = homeValue * maxLTV;
    const currentEquity = Math.max(0, homeValue - currentBalance);
    const currentLtvPct = (currentBalance / homeValue) * 100;

    // Maximum cash you can theoretically extract while staying under 80% LTV
    const maxExtractableCash = Math.max(
      0,
      maxAllowedBalance - currentBalance - (rollCostsIntoLoan ? closingCosts : 0)
    );

    const actualFinancedCosts = rollCostsIntoLoan ? closingCosts : 0;
    const newTotalLoanAmount = currentBalance + desiredCashOut + actualFinancedCosts;
    const newLtvPct = (newTotalLoanAmount / homeValue) * 100;
    const exceedsMaxLTV = newTotalLoanAmount > maxAllowedBalance;

    // Cash received in borrower's bank account
    const netCashInHand = rollCostsIntoLoan
      ? desiredCashOut
      : Math.max(0, desiredCashOut - closingCosts);

    // Remaining home equity after transaction
    const remainingEquity = Math.max(0, homeValue - newTotalLoanAmount);
    const remainingEquityPct = (remainingEquity / homeValue) * 100;

    // New monthly payment
    const newMonthlyPayment = monthlyPayment(newTotalLoanAmount, newRate, newTermYears * 12);
    const monthlyPaymentChange = newMonthlyPayment - currentMonthlyPmt;
    const totalNewInterest = newMonthlyPayment * (newTermYears * 12) - newTotalLoanAmount;

    // Pie chart distribution of property value
    const pieData = [
      { name: "Existing Debt", value: currentBalance, color: "#1a56db" },
      { name: "Cash Extracted", value: desiredCashOut + actualFinancedCosts, color: "#10b981" },
      { name: "Remaining Equity", value: remainingEquity, color: "#8b5cf6" },
    ];

    return {
      currentEquity,
      currentLtvPct,
      maxAllowedBalance,
      maxExtractableCash,
      newTotalLoanAmount,
      newLtvPct,
      exceedsMaxLTV,
      netCashInHand,
      remainingEquity,
      remainingEquityPct,
      newMonthlyPayment,
      monthlyPaymentChange,
      totalNewInterest,
      pieData,
    };
  }, [
    homeValue,
    currentBalance,
    desiredCashOut,
    newRate,
    newTermYears,
    closingCosts,
    rollCostsIntoLoan,
    currentMonthlyPmt,
  ]);

  // Export JSON
  const exportJSON = useCallback(() => {
    const payload = {
      calculator: "DevsPoint Cash-Out Engine (dp-cashout-v2)",
      generatedAt: new Date().toISOString(),
      property: {
        homeMarketValueUSD: homeValue,
        currentMortgageBalanceUSD: currentBalance,
        currentHomeEquityUSD: calculation.currentEquity,
        currentLTVPercent: Number(calculation.currentLtvPct.toFixed(1)),
      },
      transaction: {
        cashOutAmountUSD: desiredCashOut,
        closingCostsUSD: closingCosts,
        financedCostsIntoLoan: rollCostsIntoLoan,
        netCashToBorrowerUSD: calculation.netCashInHand,
        newMortgageBalanceUSD: calculation.newTotalLoanAmount,
        newLTVPercent: Number(calculation.newLtvPct.toFixed(1)),
        conventional80LTVLimitPassed: !calculation.exceedsMaxLTV,
      },
      paymentMetrics: {
        currentMonthlyPayment: currentMonthlyPmt,
        newMonthlyPayment: Number(calculation.newMonthlyPayment.toFixed(2)),
        monthlyPaymentChangeDelta: Number(calculation.monthlyPaymentChange.toFixed(2)),
        remainingHomeEquityUSD: calculation.remainingEquity,
        remainingEquityPercent: Number(calculation.remainingEquityPct.toFixed(1)),
      },
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `cash-out-analysis-${desiredCashOut}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [calculation, homeValue, currentBalance, desiredCashOut, closingCosts, rollCostsIntoLoan, currentMonthlyPmt]);

  return (
    <div className="calc-section-wrapper" id="cash-out">
      {/* Inputs Grid */}
      <div className="calc-inputs-grid">
        {/* Card 1: Home Value & Current Debt */}
        <div className="calc-card">
          <div className="calc-title">
            <div className="calc-title-icon">🏡</div>
            Property &amp; Current Mortgage
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="co-home-value">
              <span>Estimated Home Market Value</span>
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>{fmt(homeValue)}</span>
            </label>
            <div className="form-input-wrapper">
              <span className="form-prefix">$</span>
              <input
                id="co-home-value"
                type="number"
                className="form-input"
                value={homeValue}
                onChange={(e) => setHomeValue(Math.max(10000, Number(e.target.value)))}
                step={5000}
              />
            </div>
            <input
              type="range"
              className="range-slider"
              min={100000}
              max={2000000}
              step={10000}
              value={homeValue}
              onChange={(e) => setHomeValue(Number(e.target.value))}
              style={{ "--val": `${((homeValue - 100000) / (2000000 - 100000)) * 100}%` } as React.CSSProperties}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="co-current-bal">
              <span>Current Unpaid Mortgage Balance</span>
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>{fmt(currentBalance)}</span>
            </label>
            <div className="form-input-wrapper">
              <span className="form-prefix">$</span>
              <input
                id="co-current-bal"
                type="number"
                className="form-input"
                value={currentBalance}
                onChange={(e) => setCurrentBalance(Number(e.target.value))}
                step={5000}
              />
            </div>
            <input
              type="range"
              className="range-slider"
              min={0}
              max={homeValue}
              step={5000}
              value={currentBalance}
              onChange={(e) => setCurrentBalance(Number(e.target.value))}
              style={{ "--val": `${(currentBalance / homeValue) * 100}%` } as React.CSSProperties}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="co-cur-pmt">
              <span>Current Monthly Payment</span>
              <span style={{ color: "var(--text-secondary)", fontWeight: 600 }}>{fmt(currentMonthlyPmt)}/mo</span>
            </label>
            <div className="form-input-wrapper">
              <span className="form-prefix">$</span>
              <input
                id="co-cur-pmt"
                type="number"
                className="form-input"
                value={currentMonthlyPmt}
                onChange={(e) => setCurrentMonthlyPmt(Number(e.target.value))}
                step={50}
              />
            </div>
          </div>
        </div>

        {/* Card 2: Cash Extraction & New Terms */}
        <div className="calc-card">
          <div className="calc-title">
            <div className="calc-title-icon">💵</div>
            Cash-Out Request &amp; Terms
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="co-desired-cash">
              <span>Desired Cash-Out Amount</span>
              <span style={{ color: "var(--success)", fontWeight: 700 }}>{fmt(desiredCashOut)}</span>
            </label>
            <div className="form-input-wrapper">
              <span className="form-prefix">$</span>
              <input
                id="co-desired-cash"
                type="number"
                className="form-input"
                value={desiredCashOut}
                onChange={(e) => setDesiredCashOut(Math.max(0, Number(e.target.value)))}
                step={2500}
              />
            </div>
            <input
              type="range"
              className="range-slider"
              min={5000}
              max={Math.max(50000, calculation.maxExtractableCash * 1.2)}
              step={2500}
              value={desiredCashOut}
              onChange={(e) => setDesiredCashOut(Number(e.target.value))}
              style={{ "--val": `${(desiredCashOut / Math.max(50000, calculation.maxExtractableCash * 1.2)) * 100}%` } as React.CSSProperties}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
              <span>Max at 80% LTV:</span>
              <strong style={{ color: "var(--primary)" }}>{fmt(calculation.maxExtractableCash)}</strong>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="form-group">
              <label className="form-label" htmlFor="co-new-rate">
                <span>New Interest Rate</span>
              </label>
              <input
                id="co-new-rate"
                type="number"
                className="form-input no-prefix has-suffix"
                value={newRate}
                onChange={(e) => setNewRate(Number(e.target.value))}
                step={0.125}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="co-new-term">
                <span>New Term (Years)</span>
              </label>
              <select
                id="co-new-term"
                className="form-input no-prefix"
                value={newTermYears}
                onChange={(e) => setNewTermYears(Number(e.target.value))}
                style={{ height: 48 }}
              >
                <option value={15}>15 Years</option>
                <option value={20}>20 Years</option>
                <option value={30}>30 Years</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="co-closing-costs">
              <span>Estimated Closing Costs</span>
              <span style={{ color: "#ef4444", fontWeight: 600 }}>{fmt(closingCosts)}</span>
            </label>
            <div className="form-input-wrapper">
              <span className="form-prefix">$</span>
              <input
                id="co-closing-costs"
                type="number"
                className="form-input"
                value={closingCosts}
                onChange={(e) => setClosingCosts(Number(e.target.value))}
                step={250}
              />
            </div>
          </div>

          {/* Roll costs toggle */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "var(--surface)", borderRadius: 12, border: "1px solid var(--border)", marginTop: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--dark)" }}>Roll Closing Costs into New Loan?</span>
            <input
              type="checkbox"
              id="co-roll-costs"
              checked={rollCostsIntoLoan}
              onChange={(e) => setRollCostsIntoLoan(e.target.checked)}
              style={{ width: 18, height: 18, cursor: "pointer" }}
            />
          </div>
        </div>
      </div>

      {/* LTV Safety Guardrail Callout */}
      {calculation.exceedsMaxLTV ? (
        <div style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 16, padding: "20px 24px", margin: "28px 0", display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 28 }}>⚠️</span>
          <div>
            <h4 style={{ color: "#991b1b", margin: "0 0 4px", fontSize: 16, fontWeight: 700 }}>
              Requested Loan Exceeds Conventional 80% LTV Limit ({calculation.newLtvPct.toFixed(1)}% LTV)
            </h4>
            <p style={{ color: "#7f1d1d", fontSize: 14, margin: 0, lineHeight: 1.5 }}>
              Most conventional mortgage lenders cap cash-out refinances at 80% of your property&apos;s appraised value ({fmt(calculation.maxAllowedBalance)}). Reduce your requested cash-out to <strong>{fmt(calculation.maxExtractableCash)}</strong> or below to qualify for conventional guidelines.
            </p>
          </div>
        </div>
      ) : (
        <div style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: 16, padding: "18px 24px", margin: "28px 0", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 24 }}>🛡️</span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#15803d" }}>
                Within Conventional 80% LTV Threshold ({calculation.newLtvPct.toFixed(1)}% LTV)
              </div>
              <div style={{ fontSize: 13, color: "#166534" }}>
                You have {fmt(calculation.remainingEquity)} ({calculation.remainingEquityPct.toFixed(1)}%) in safe home equity cushion remaining.
              </div>
            </div>
          </div>
          <button type="button" onClick={exportJSON} className="tab-btn" style={{ background: "white", borderColor: "#86efac", color: "#15803d", fontWeight: 700 }}>
            💻 Export Cash-Out JSON
          </button>
        </div>
      )}

      {/* Key Metric Highlights */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginBottom: 32 }}>
        <div className="result-metric-card" style={{ background: "white", padding: 24, borderRadius: 18, border: "1px solid var(--border)" }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>Net Cash in Hand</span>
          <div style={{ fontSize: 32, fontWeight: 800, color: "var(--success)", marginTop: 6 }}>
            {fmt(calculation.netCashInHand)}
          </div>
          <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>
            Cash deposited in your bank
          </span>
        </div>

        <div className="result-metric-card" style={{ background: "white", padding: 24, borderRadius: 18, border: "1px solid var(--border)" }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>New Total Mortgage</span>
          <div style={{ fontSize: 32, fontWeight: 800, color: "var(--primary)", marginTop: 6 }}>
            {fmt(calculation.newTotalLoanAmount)}
          </div>
          <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>
            New debt balance ({calculation.newLtvPct.toFixed(1)}% LTV)
          </span>
        </div>

        <div className="result-metric-card" style={{ background: "white", padding: 24, borderRadius: 18, border: "1px solid var(--border)" }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>New Monthly Payment</span>
          <div style={{ fontSize: 32, fontWeight: 800, color: "var(--dark)", marginTop: 6 }}>
            {fmtFull(calculation.newMonthlyPayment)}
          </div>
          <span style={{ fontSize: 12, color: calculation.monthlyPaymentChange >= 0 ? "#ef4444" : "var(--success)" }}>
            {calculation.monthlyPaymentChange >= 0 ? `+${fmtFull(calculation.monthlyPaymentChange)}/mo` : `${fmtFull(calculation.monthlyPaymentChange)}/mo`}
          </span>
        </div>

        <div className="result-metric-card" style={{ background: "white", padding: 24, borderRadius: 18, border: "1px solid var(--border)" }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>Remaining Home Equity</span>
          <div style={{ fontSize: 32, fontWeight: 800, color: "#8b5cf6", marginTop: 6 }}>
            {fmt(calculation.remainingEquity)}
          </div>
          <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>
            {calculation.remainingEquityPct.toFixed(1)}% retained ownership
          </span>
        </div>
      </div>

      {/* Visual Property Equity Distribution Chart */}
      <div className="calc-card" style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, color: "var(--dark)", marginBottom: 8 }}>
          Post-Refinance Property Equity Distribution
        </h3>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 20 }}>
          Visualizing how your {fmt(homeValue)} property is divided across existing debt, new cash extracted, and remaining retained equity.
        </p>

        <div style={{ width: "100%", height: 280 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={calculation.pieData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={105}
                paddingAngle={4}
                dataKey="value"
              >
                {calculation.pieData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(val: any) => fmt(Number(val))} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
