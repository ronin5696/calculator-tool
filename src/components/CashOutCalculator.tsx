"use client";

import { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
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

function monthlyEMI(principal: number, annualRate: number, months: number): number {
  if (annualRate === 0) return principal / months;
  const r = annualRate / 100 / 12;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

export default function CashOutCalculator() {
  // Indian home loan defaults: ₹90 Lakhs property, ₹45 Lakhs current balance, ₹10 Lakhs top-up needed
  const [propertyValue, setPropertyValue] = useState(9000000);
  const [currentBalance, setCurrentBalance] = useState(4500000);
  const [desiredTopUp, setDesiredTopUp] = useState(1000000);

  // Top-Up Loan terms
  const [topUpRate, setTopUpRate] = useState(8.85);
  const [topUpTermYears, setTopUpTermYears] = useState(12);

  // Alternative Personal Loan terms
  const [personalLoanRate, setPersonalLoanRate] = useState(13.5);
  const [personalLoanTermYears, setPersonalLoanTermYears] = useState(5);

  const calculation = useMemo(() => {
    const maxLTV = 0.75; // 75% RBI cap for general residential loans
    const maxAllowedTotalLoan = propertyValue * maxLTV;
    const currentLtvPct = (currentBalance / propertyValue) * 100;

    // Maximum eligible top-up without breaching 75% LTV
    const maxEligibleTopUp = Math.max(0, maxAllowedTotalLoan - currentBalance);
    const actualTopUp = Math.min(desiredTopUp, maxEligibleTopUp);
    const isExceedingLtv = desiredTopUp > maxEligibleTopUp;

    // Top-up loan EMI and total interest
    const topUpEMI = monthlyEMI(actualTopUp, topUpRate, topUpTermYears * 12);
    const topUpTotalInterest = topUpEMI * topUpTermYears * 12 - actualTopUp;

    // Personal loan EMI and total interest (for the same desired amount)
    const personalEMI = monthlyEMI(actualTopUp, personalLoanRate, personalLoanTermYears * 12);
    const personalTotalInterest = personalEMI * personalLoanTermYears * 12 - actualTopUp;

    const monthlyCashflowSavings = personalEMI - topUpEMI;
    const lifetimeInterestDelta = personalTotalInterest - topUpTotalInterest;

    const pieData = [
      { name: "Current Loan Balance", value: currentBalance },
      { name: "Top-Up Principal", value: actualTopUp },
      { name: "Remaining Property Equity", value: Math.max(0, propertyValue - currentBalance - actualTopUp) },
    ];

    return {
      maxEligibleTopUp,
      actualTopUp,
      isExceedingLtv,
      currentLtvPct,
      newCombinedLtvPct: ((currentBalance + actualTopUp) / propertyValue) * 100,
      topUpEMI,
      topUpTotalInterest,
      personalEMI,
      personalTotalInterest,
      monthlyCashflowSavings,
      lifetimeInterestDelta,
      pieData,
    };
  }, [propertyValue, currentBalance, desiredTopUp, topUpRate, topUpTermYears, personalLoanRate, personalLoanTermYears]);

  const PIE_COLORS = ["#1a56db", "#10b981", "#cbd5e1"];

  return (
    <div className="calc-section-wrapper">
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <span className="section-tag">💰 Indian Home Equity &amp; Top-Up</span>
        <h1 style={{ fontSize: "clamp(24px, 4vw, 38px)", color: "var(--dark)", margin: "12px 0 8px" }}>
          Home Loan Top-Up vs. Personal Loan Calculator
        </h1>
        <p style={{ color: "var(--text-secondary)", maxWidth: 640, margin: "0 auto", fontSize: 16, lineHeight: 1.6 }}>
          Tap your home equity at 8.75%–9.5% interest instead of paying 13%–16% on expensive personal loans. Compare EMI affordability and RBI LTV eligibility.
        </p>
      </div>

      <div className="calc-inputs-grid" style={{ marginBottom: 32 }}>
        {/* Property & Equity Card */}
        <div className="calc-card">
          <div className="calc-title">
            <span className="calc-title-icon">🏠</span> Property Value &amp; Loan Balance
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="prop-value">
              <span>Current Property Market Value</span>
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>
                {fmtINR(propertyValue)} <span style={{ fontSize: 12, color: "var(--text-muted)" }}>({fmtINRLakh(propertyValue)})</span>
              </span>
            </label>
            <div className="form-input-wrapper">
              <span className="form-prefix">₹</span>
              <input
                id="prop-value"
                type="number"
                className="form-input"
                value={propertyValue}
                onChange={(e) => setPropertyValue(Number(e.target.value))}
                min={1000000}
                max={100000000}
                step={100000}
              />
            </div>
            <input
              type="range"
              className="range-slider"
              min={1500000}
              max={30000000}
              step={100000}
              value={propertyValue}
              onChange={(e) => setPropertyValue(Number(e.target.value))}
              style={{ "--val": `${((propertyValue - 1500000) / (30000000 - 1500000)) * 100}%` } as React.CSSProperties}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="curr-loan-balance">
              <span>Existing Home Loan Balance</span>
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>
                {fmtINR(currentBalance)} <span style={{ fontSize: 12, color: "var(--text-muted)" }}>({fmtINRLakh(currentBalance)})</span>
              </span>
            </label>
            <div className="form-input-wrapper">
              <span className="form-prefix">₹</span>
              <input
                id="curr-loan-balance"
                type="number"
                className="form-input"
                value={currentBalance}
                onChange={(e) => setCurrentBalance(Number(e.target.value))}
                min={0}
                max={propertyValue}
                step={50000}
              />
            </div>
            <input
              type="range"
              className="range-slider"
              min={0}
              max={propertyValue * 0.75}
              step={50000}
              value={currentBalance}
              onChange={(e) => setCurrentBalance(Number(e.target.value))}
              style={{ "--val": `${(currentBalance / (propertyValue * 0.75)) * 100}%` } as React.CSSProperties}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="desired-topup">
              <span>Additional Cash / Top-Up Needed</span>
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>
                {fmtINR(desiredTopUp)} <span style={{ fontSize: 12, color: "var(--text-muted)" }}>({fmtINRLakh(desiredTopUp)})</span>
              </span>
            </label>
            <div className="form-input-wrapper">
              <span className="form-prefix">₹</span>
              <input
                id="desired-topup"
                type="number"
                className="form-input"
                value={desiredTopUp}
                onChange={(e) => setDesiredTopUp(Number(e.target.value))}
                min={50000}
                max={20000000}
                step={50000}
              />
            </div>
            <span style={{ fontSize: 12, color: "var(--text-muted)", display: "block", marginTop: 4 }}>
              Max eligible under 75% LTV cap: <strong>{fmtINR(calculation.maxEligibleTopUp)}</strong>
            </span>
          </div>
        </div>

        {/* Top-Up vs Personal Loan Rates */}
        <div className="calc-card">
          <div className="calc-title">
            <span className="calc-title-icon">⚖️</span> Top-Up vs. Personal Loan Rates
          </div>

          <div style={{ background: "#f8fafc", padding: "14px 16px", borderRadius: 10, border: "1px solid #e2e8f0", marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#1e293b", marginBottom: 8 }}>
              🏦 Home Loan Top-Up Parameters
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, color: "var(--text-secondary)", display: "block" }}>Interest Rate (% p.a.)</label>
                <input
                  type="number"
                  className="form-input no-prefix"
                  value={topUpRate}
                  onChange={(e) => setTopUpRate(Number(e.target.value))}
                  min={7}
                  max={15}
                  step={0.05}
                  style={{ marginTop: 4 }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, color: "var(--text-secondary)", display: "block" }}>Tenure (Years)</label>
                <input
                  type="number"
                  className="form-input no-prefix"
                  value={topUpTermYears}
                  onChange={(e) => setTopUpTermYears(Number(e.target.value))}
                  min={1}
                  max={20}
                  step={1}
                  style={{ marginTop: 4 }}
                />
              </div>
            </div>
          </div>

          <div style={{ background: "#f8fafc", padding: "14px 16px", borderRadius: 10, border: "1px solid #e2e8f0" }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#1e293b", marginBottom: 8 }}>
              💳 Unsecured Personal Loan Alternative
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, color: "var(--text-secondary)", display: "block" }}>Interest Rate (% p.a.)</label>
                <input
                  type="number"
                  className="form-input no-prefix"
                  value={personalLoanRate}
                  onChange={(e) => setPersonalLoanRate(Number(e.target.value))}
                  min={10}
                  max={24}
                  step={0.25}
                  style={{ marginTop: 4 }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, color: "var(--text-secondary)", display: "block" }}>Max Tenure (Years)</label>
                <input
                  type="number"
                  className="form-input no-prefix"
                  value={personalLoanTermYears}
                  onChange={(e) => setPersonalLoanTermYears(Number(e.target.value))}
                  min={1}
                  max={7}
                  step={1}
                  style={{ marginTop: 4 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison KPI Cards */}
      <div className="results-metrics-grid" style={{ marginBottom: 32 }}>
        <div className="metric-card highlight">
          <div className="metric-label">Home Loan Top-Up EMI</div>
          <div className="metric-value" style={{ color: "var(--primary)" }}>
            {fmtINR(Math.round(calculation.topUpEMI))}
            <span style={{ fontSize: 14, color: "var(--text-muted)" }}>/mo</span>
          </div>
          <div className="metric-sub">{topUpRate}% p.a. for {topUpTermYears} yrs</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Personal Loan EMI</div>
          <div className="metric-value" style={{ color: "#dc2626" }}>
            {fmtINR(Math.round(calculation.personalEMI))}
            <span style={{ fontSize: 14, color: "var(--text-muted)" }}>/mo</span>
          </div>
          <div className="metric-sub">{personalLoanRate}% p.a. for {personalLoanTermYears} yrs</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Monthly EMI Relief</div>
          <div className="metric-value" style={{ color: "#10b981" }}>
            {fmtINR(Math.round(calculation.monthlyCashflowSavings))}
            <span style={{ fontSize: 14, color: "#10b981" }}>/mo</span>
          </div>
          <div className="metric-sub">Lower cash-flow burden vs. personal loan</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Combined LTV Ratio</div>
          <div className="metric-value" style={{ color: calculation.newCombinedLtvPct <= 75 ? "#10b981" : "#dc2626" }}>
            {calculation.newCombinedLtvPct.toFixed(1)}%
          </div>
          <div className="metric-sub">RBI 75% guideline cap</div>
        </div>
      </div>

      {/* Breakdown Visualization */}
      <div className="calc-card">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "center" }}>
          <div>
            <h3 style={{ fontSize: 18, color: "var(--dark)", marginBottom: 8 }}>
              Home Equity &amp; Top-Up Verdict
            </h3>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Taking a <strong>Home Loan Top-Up of {fmtINR(calculation.actualTopUp)}</strong> reduces your monthly EMI burden by{" "}
              <strong style={{ color: "#059669" }}>{fmtINR(Math.round(calculation.monthlyCashflowSavings))} per month</strong> compared to an unsecured personal loan.
            </p>
            <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>
              💡 <strong>Tax Tip:</strong> Under Section 24(b) of the Indian Income Tax Act, if you use home loan top-up funds for home repair, renovation, or expansion, you can claim an additional tax deduction on interest of up to ₹30,000 per financial year for a self-occupied house property!
            </p>
          </div>

          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={calculation.pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {calculation.pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => fmtINR(Number(value))} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
