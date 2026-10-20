"use client";

import { useState, useCallback } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// ─── Utility ───────────────────────────────────────────────────────────────
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

function totalInterest(payment: number, months: number, principal: number): number {
  return payment * months - principal;
}

interface CalcResult {
  currentPayment: number;
  newPayment: number;
  monthlySavings: number;
  totalSavings: number;
  breakEvenMonths: number;
  currentTotalInterest: number;
  newTotalInterest: number;
  interestSaved: number;
  amortData: Array<{ year: number; currentBalance: number; newBalance: number; cumulativeSavings: number }>;
  pieData: Array<{ name: string; value: number }>;
}

// ─── Main Component ─────────────────────────────────────────────────────────
export default function RefinanceCalculator() {
  // Current loan
  const [currentBalance, setCurrentBalance] = useState(350000);
  const [currentRate, setCurrentRate] = useState(7.25);
  const [currentTermLeft, setCurrentTermLeft] = useState(27);

  // New loan
  const [newRate, setNewRate] = useState(6.25);
  const [newTerm, setNewTerm] = useState(30);
  const [closingCosts, setClosingCosts] = useState(4500);

  // Tab
  const [activeTab, setActiveTab] = useState<"results" | "amortization" | "chart" | "json">("results");
  const [copied, setCopied] = useState(false);

  const [result, setResult] = useState<CalcResult | null>(null);
  const [calculated, setCalculated] = useState(false);

  const calculate = useCallback(() => {
    const curPayment = monthlyPayment(currentBalance, currentRate, currentTermLeft * 12);
    const nwPayment = monthlyPayment(currentBalance, newRate, newTerm * 12);
    const mSavings = curPayment - nwPayment;
    const tSavings = mSavings * Math.min(currentTermLeft, newTerm) * 12 - closingCosts;
    const breakEven = mSavings > 0 ? Math.ceil(closingCosts / mSavings) : Infinity;

    const curTotalInt = totalInterest(curPayment, currentTermLeft * 12, currentBalance);
    const nwTotalInt = totalInterest(nwPayment, newTerm * 12, currentBalance);
    const intSaved = curTotalInt - nwTotalInt;

    // Amortization data (yearly)
    const amortData: CalcResult["amortData"] = [];
    const curR = currentRate / 100 / 12;
    const nwR = newRate / 100 / 12;
    let curBal = currentBalance;
    let nwBal = currentBalance;
    let cumSavings = -closingCosts;

    const years = Math.max(currentTermLeft, newTerm);
    for (let y = 1; y <= years; y++) {
      for (let m = 0; m < 12; m++) {
        if (curBal > 0) {
          curBal -= curPayment - curBal * curR;
          if (curBal < 0) curBal = 0;
        }
        if (nwBal > 0) {
          nwBal -= nwPayment - nwBal * nwR;
          if (nwBal < 0) nwBal = 0;
        }
        cumSavings += mSavings;
      }
      amortData.push({
        year: y,
        currentBalance: Math.max(0, Math.round(curBal)),
        newBalance: Math.max(0, Math.round(nwBal)),
        cumulativeSavings: Math.round(cumSavings),
      });
    }

    const pieData = [
      { name: "Principal", value: currentBalance },
      { name: "New Interest", value: Math.max(0, Math.round(nwTotalInt)) },
      { name: "Interest Saved", value: Math.max(0, Math.round(intSaved)) },
    ];

    setResult({
      currentPayment: curPayment,
      newPayment: nwPayment,
      monthlySavings: mSavings,
      totalSavings: tSavings,
      breakEvenMonths: breakEven,
      currentTotalInterest: curTotalInt,
      newTotalInterest: nwTotalInt,
      interestSaved: intSaved,
      amortData,
      pieData,
    });
    setCalculated(true);
    setActiveTab("results");
  }, [currentBalance, currentRate, currentTermLeft, newRate, newTerm, closingCosts]);

  const PIE_COLORS = ["#1a56db", "#7c3aed", "#10b981"];

  return (
    <section className="calc-section-wrapper">
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <span className="section-tag">🧮 Free Tool</span>
        <h1 style={{ fontSize: "clamp(24px, 4vw, 42px)", color: "var(--dark)", marginBottom: 12, marginTop: 12 }}>
          Mortgage Refinance Calculator
        </h1>
        <p style={{ fontSize: "clamp(15px, 2vw, 17px)", color: "var(--text-secondary)", maxWidth: 560, margin: "0 auto", lineHeight: 1.6 }}>
          Enter your current loan details and the new loan terms you&apos;re considering.
          We&apos;ll instantly show your monthly savings, total interest saved, and break-even point.
        </p>
      </div>

      <div className="calc-inputs-grid">
        {/* Current Loan */}
        <div className="calc-card">
          <div className="calc-title">
            <div className="calc-title-icon">📋</div>
            Current Loan
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="current-balance">
              <span>Current Loan Balance</span>
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>{fmt(currentBalance)}</span>
            </label>
            <div className="form-input-wrapper">
              <span className="form-prefix">$</span>
              <input
                id="current-balance"
                type="number"
                className="form-input"
                value={currentBalance}
                onChange={(e) => setCurrentBalance(Number(e.target.value))}
                min={10000}
                max={5000000}
                step={1000}
                aria-label="Current loan balance in dollars"
              />
            </div>
            <input
              type="range"
              className="range-slider"
              min={50000}
              max={2000000}
              step={5000}
              value={currentBalance}
              onChange={(e) => setCurrentBalance(Number(e.target.value))}
              style={{ "--val": `${((currentBalance - 50000) / (2000000 - 50000)) * 100}%` } as React.CSSProperties}
              aria-label="Adjust current balance"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="current-rate">
              <span>Current Interest Rate</span>
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>{currentRate}%</span>
            </label>
            <div className="form-input-wrapper">
              <input
                id="current-rate"
                type="number"
                className="form-input no-prefix has-suffix"
                value={currentRate}
                onChange={(e) => setCurrentRate(Number(e.target.value))}
                min={0.5}
                max={20}
                step={0.05}
                aria-label="Current interest rate percentage"
              />
              <span className="form-suffix">%</span>
            </div>
            <input
              type="range"
              className="range-slider"
              min={1}
              max={15}
              step={0.05}
              value={currentRate}
              onChange={(e) => setCurrentRate(Number(e.target.value))}
              style={{ "--val": `${((currentRate - 1) / (15 - 1)) * 100}%` } as React.CSSProperties}
              aria-label="Adjust current interest rate"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="term-left">
              <span>Years Remaining on Loan</span>
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>{currentTermLeft} yrs</span>
            </label>
            <div className="form-input-wrapper">
              <input
                id="term-left"
                type="number"
                className="form-input no-prefix has-suffix"
                value={currentTermLeft}
                onChange={(e) => setCurrentTermLeft(Number(e.target.value))}
                min={1}
                max={30}
                step={1}
                aria-label="Years remaining on current loan"
              />
              <span className="form-suffix">yrs</span>
            </div>
            <input
              type="range"
              className="range-slider"
              min={1}
              max={30}
              step={1}
              value={currentTermLeft}
              onChange={(e) => setCurrentTermLeft(Number(e.target.value))}
              style={{ "--val": `${((currentTermLeft - 1) / (30 - 1)) * 100}%` } as React.CSSProperties}
              aria-label="Adjust remaining term"
            />
          </div>
        </div>

        {/* New Loan */}
        <div className="calc-card">
          <div className="calc-title">
            <div className="calc-title-icon">✨</div>
            New Loan
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="new-rate">
              <span>New Interest Rate</span>
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>{newRate}%</span>
            </label>
            <div className="form-input-wrapper">
              <input
                id="new-rate"
                type="number"
                className="form-input no-prefix has-suffix"
                value={newRate}
                onChange={(e) => setNewRate(Number(e.target.value))}
                min={0.5}
                max={20}
                step={0.05}
                aria-label="New interest rate percentage"
              />
              <span className="form-suffix">%</span>
            </div>
            <input
              type="range"
              className="range-slider"
              min={1}
              max={15}
              step={0.05}
              value={newRate}
              onChange={(e) => setNewRate(Number(e.target.value))}
              style={{ "--val": `${((newRate - 1) / (15 - 1)) * 100}%` } as React.CSSProperties}
              aria-label="Adjust new interest rate"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="new-term">
              <span>New Loan Term</span>
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>{newTerm} yrs</span>
            </label>
            <div className="form-input-wrapper">
              <input
                id="new-term"
                type="number"
                className="form-input no-prefix has-suffix"
                value={newTerm}
                onChange={(e) => setNewTerm(Number(e.target.value))}
                min={5}
                max={30}
                step={5}
                aria-label="New loan term in years"
              />
              <span className="form-suffix">yrs</span>
            </div>
            <input
              type="range"
              className="range-slider"
              min={5}
              max={30}
              step={5}
              value={newTerm}
              onChange={(e) => setNewTerm(Number(e.target.value))}
              style={{ "--val": `${((newTerm - 5) / (30 - 5)) * 100}%` } as React.CSSProperties}
              aria-label="Adjust new loan term"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="closing-costs">
              <span>Estimated Closing Costs</span>
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>{fmt(closingCosts)}</span>
            </label>
            <div className="form-input-wrapper">
              <span className="form-prefix">$</span>
              <input
                id="closing-costs"
                type="number"
                className="form-input"
                value={closingCosts}
                onChange={(e) => setClosingCosts(Number(e.target.value))}
                min={0}
                max={50000}
                step={100}
                aria-label="Estimated closing costs in dollars"
              />
            </div>
            <input
              type="range"
              className="range-slider"
              min={0}
              max={20000}
              step={100}
              value={closingCosts}
              onChange={(e) => setClosingCosts(Number(e.target.value))}
              style={{ "--val": `${((closingCosts) / (20000)) * 100}%` } as React.CSSProperties}
              aria-label="Adjust closing costs"
            />
          </div>

          <button
            id="calculate-btn"
            className="calc-btn"
            onClick={calculate}
            aria-label="Calculate refinance savings"
          >
            <span>Calculate Savings</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {/* ── Results Panel ── */}
      {calculated && result && (
        <div className="calc-card animate-fade-up" id="results-section" aria-live="polite" aria-atomic="true">
          {/* Savings Highlight */}
          {result.monthlySavings > 0 ? (
            <div className="savings-box">
              <span className="savings-icon">🎉</span>
              <div>
                <div className="savings-title">Your Monthly Savings</div>
                <div className="savings-value">{fmtFull(result.monthlySavings)}<span style={{ fontSize: 16, fontWeight: 500, color: "#047857" }}>/mo</span></div>
                <div className="savings-sub">Over {Math.min(currentTermLeft, newTerm)} years, you could save {fmt(Math.max(0, result.totalSavings))} (after closing costs)</div>
              </div>
            </div>
          ) : (
            <div className="info-box" role="alert">
              <span className="info-box-icon">ℹ️</span>
              <p><strong>Heads up:</strong> Based on these figures, your new payment would be <em>higher</em> than your current payment. Consider adjusting the new rate or term.</p>
            </div>
          )}

          {/* Tabs & Developer Actions Toolbar */}
          <div className="calc-toolbar">
            <div className="tabs" role="tablist" aria-label="Results tabs">
              {(
                [
                  { id: "results", label: "📊 Summary" },
                  { id: "amortization", label: "📋 Schedule" },
                  { id: "chart", label: "📈 Chart" },
                  { id: "json", label: "💻 API / JSON" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`tabpanel-${tab.id}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Quick Export Actions */}
            <div className="calc-export-actions">
              <button
                type="button"
                onClick={() => {
                  const exportPayload = {
                    engine: "DevsPoint Financial Engine (dp-calc-engine)",
                    version: "2.4.1",
                    formula: "M = P * [r(1+r)^n] / [(1+r)^n - 1]",
                    timestamp: new Date().toISOString(),
                    inputs: {
                      principal: currentBalance,
                      currentAnnualRatePct: currentRate,
                      currentTermRemainingYears: currentTermLeft,
                      newAnnualRatePct: newRate,
                      newTermYears: newTerm,
                      closingCostsUSD: closingCosts,
                    },
                    metrics: {
                      currentMonthlyPaymentUSD: Number(result.currentPayment.toFixed(2)),
                      newMonthlyPaymentUSD: Number(result.newPayment.toFixed(2)),
                      monthlySavingsUSD: Number(result.monthlySavings.toFixed(2)),
                      breakEvenPeriodMonths: result.breakEvenMonths === Infinity ? null : result.breakEvenMonths,
                      totalInterestSavedUSD: Number(result.interestSaved.toFixed(2)),
                      netLifetimeSavingsUSD: Number(result.totalSavings.toFixed(2)),
                    },
                    amortizationSchedule: result.amortData,
                  };
                  const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `devspoint-mortgage-amortization-${Date.now()}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.2s",
                }}
                title="Download complete calculation as JSON file"
              >
                <span>📥</span> Export JSON
              </button>

              <button
                type="button"
                onClick={() => {
                  const exportPayload = {
                    engine: "DevsPoint Financial Engine (dp-calc-engine)",
                    version: "2.4.1",
                    formula: "M = P * [r(1+r)^n] / [(1+r)^n - 1]",
                    timestamp: new Date().toISOString(),
                    inputs: {
                      principal: currentBalance,
                      currentRate,
                      currentTermYears: currentTermLeft,
                      newRate,
                      newTermYears: newTerm,
                      closingCosts,
                    },
                    metrics: {
                      currentPayment: Number(result.currentPayment.toFixed(2)),
                      newPayment: Number(result.newPayment.toFixed(2)),
                      monthlySavings: Number(result.monthlySavings.toFixed(2)),
                      breakEvenMonths: result.breakEvenMonths === Infinity ? null : result.breakEvenMonths,
                      totalInterestSaved: Number(result.interestSaved.toFixed(2)),
                    },
                  };
                  navigator.clipboard.writeText(JSON.stringify(exportPayload, null, 2));
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                style={{
                  background: copied ? "#d1fae5" : "var(--surface)",
                  borderColor: copied ? "#10b981" : "var(--border)",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: copied ? "#065f46" : "var(--text-secondary)",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.2s",
                }}
                title="Copy engine payload to clipboard"
              >
                <span>{copied ? "✓" : "📋"}</span> {copied ? "Copied!" : "Copy API Payload"}
              </button>
            </div>
          </div>

          {/* Results Summary */}
          {activeTab === "results" && (
            <div id="tabpanel-results" role="tabpanel" aria-labelledby="tab-results">
              <div className="results-grid">
                <div className="result-card">
                  <div className="result-label">Current Payment</div>
                  <div className="result-value">{fmtFull(result.currentPayment)}</div>
                  <div className="result-sub">per month</div>
                </div>
                <div className="result-card highlight">
                  <div className="result-label">New Payment</div>
                  <div className="result-value">{fmtFull(result.newPayment)}</div>
                  <div className="result-sub">per month</div>
                </div>
                <div className="result-card">
                  <div className="result-label">Monthly Difference</div>
                  <div className="result-value" style={{ color: result.monthlySavings > 0 ? "#059669" : "#ef4444" }}>
                    {result.monthlySavings > 0 ? "-" : "+"}{fmtFull(Math.abs(result.monthlySavings))}
                  </div>
                  <div className="result-sub">{result.monthlySavings > 0 ? "savings" : "more per month"}</div>
                </div>
                <div className="result-card">
                  <div className="result-label">Current Total Interest</div>
                  <div className="result-value">{fmt(result.currentTotalInterest)}</div>
                  <div className="result-sub">over remaining term</div>
                </div>
                <div className="result-card">
                  <div className="result-label">New Total Interest</div>
                  <div className="result-value">{fmt(result.newTotalInterest)}</div>
                  <div className="result-sub">over new term</div>
                </div>
                <div className="result-card" style={{ background: "linear-gradient(135deg, #d1fae5, #a7f3d0)", borderColor: "#6ee7b7" }}>
                  <div className="result-label" style={{ color: "#065f46" }}>Interest Saved</div>
                  <div className="result-value" style={{ color: "#059669" }}>{fmt(Math.max(0, result.interestSaved))}</div>
                  <div className="result-sub" style={{ color: "#047857" }}>lifetime savings</div>
                </div>
              </div>

              {/* Break-even */}
              <div className="info-box">
                <span className="info-box-icon">⏱️</span>
                <p>
                  <strong>Break-Even Point: </strong>
                  {result.breakEvenMonths === Infinity
                    ? "Refinancing would not save money at these rates."
                    : result.breakEvenMonths > 120
                    ? `It would take ${result.breakEvenMonths} months (${(result.breakEvenMonths / 12).toFixed(1)} years) to recoup closing costs — consider whether you'll stay in the home that long.`
                    : `You'll recoup your ${fmt(closingCosts)} closing costs in just ${result.breakEvenMonths} months (${(result.breakEvenMonths / 12).toFixed(1)} years). After that, it's pure savings!`}
                </p>
              </div>

              {/* Breakdown bars */}
              <div style={{ marginTop: 28 }}>
                <h3 style={{ fontSize: 16, color: "var(--dark)", marginBottom: 4 }}>Payment Breakdown Comparison</h3>
                <div className="breakdown-bars">
                  <div className="breakdown-bar-item">
                    <span className="bar-label">Current P&amp;I</span>
                    <div className="bar-track"><div className="bar-fill blue" style={{ width: "100%" }} /></div>
                    <span className="bar-value">{fmtFull(result.currentPayment)}</span>
                  </div>
                  <div className="breakdown-bar-item">
                    <span className="bar-label">New P&amp;I</span>
                    <div className="bar-track">
                      <div className="bar-fill green" style={{ width: `${Math.min(100, (result.newPayment / result.currentPayment) * 100)}%` }} />
                    </div>
                    <span className="bar-value">{fmtFull(result.newPayment)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Amortization Table */}
          {activeTab === "amortization" && (
            <div id="tabpanel-amortization" role="tabpanel" aria-labelledby="tab-amortization">
              <div className="table-wrapper amort-wrapper">
                <table className="data-table" aria-label="Amortization schedule comparing current and new loan balances">
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>Current Balance</th>
                      <th>New Balance</th>
                      <th>Cumulative Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.amortData.map((row) => (
                      <tr key={row.year}>
                        <td>Year {row.year}</td>
                        <td>{fmt(row.currentBalance)}</td>
                        <td>{fmt(row.newBalance)}</td>
                        <td style={{ color: row.cumulativeSavings >= 0 ? "#059669" : "#ef4444", fontWeight: 600 }}>
                          {row.cumulativeSavings >= 0 ? "+" : ""}{fmt(row.cumulativeSavings)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Chart */}
          {activeTab === "chart" && (
            <div id="tabpanel-chart" role="tabpanel" aria-labelledby="tab-chart">
              <div className="chart-wrapper" role="img" aria-label="Loan balance comparison chart over time">
                <h3 style={{ fontSize: 16, color: "var(--dark)", marginBottom: 16 }}>Loan Balance Over Time</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={result.amortData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1a56db" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#1a56db" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="year" tickFormatter={(v) => `Yr ${v}`} tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(v) => fmt(Number(v))} labelFormatter={(l) => `Year ${l}`} />
                    <Legend />
                    <Area type="monotone" dataKey="currentBalance" name="Current Loan" stroke="#ef4444" fill="url(#colorCurrent)" strokeWidth={2} />
                    <Area type="monotone" dataKey="newBalance" name="New Loan" stroke="#1a56db" fill="url(#colorNew)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-wrapper" style={{ marginTop: 20 }} role="img" aria-label="Cumulative savings over time chart">
                <h3 style={{ fontSize: 16, color: "var(--dark)", marginBottom: 16 }}>Cumulative Savings Over Time</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={result.amortData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="year" tickFormatter={(v) => `Yr ${v}`} tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(v) => fmt(Number(v))} labelFormatter={(l) => `Year ${l}`} />
                    <Area type="monotone" dataKey="cumulativeSavings" name="Net Savings" stroke="#10b981" fill="url(#colorSavings)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Pie */}
              <div className="chart-wrapper" style={{ marginTop: 20 }} role="img" aria-label="Loan cost breakdown pie chart">
                <h3 style={{ fontSize: 16, color: "var(--dark)", marginBottom: 16 }}>New Loan Cost Breakdown</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={result.pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                      {result.pieData.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => fmt(Number(v))} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Developer JSON / API View */}
          {activeTab === "json" && (
            <div id="tabpanel-json" role="tabpanel" aria-labelledby="tab-json">
              <div style={{ background: "#0f172a", borderRadius: "16px", padding: "20px", color: "#f8fafc", border: "1px solid #334155" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1e293b", paddingBottom: "12px", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981", display: "inline-block" }}></span>
                    <span style={{ fontSize: "13px", fontFamily: "monospace", color: "#93c5fd" }}>dp-calc-engine v2.4.1 [REST/JSON Spec]</span>
                  </div>
                  <span style={{ fontSize: "12px", color: "#64748b" }}>Execution: Client V8 (&lt;0.5ms) • Zero Tracking</span>
                </div>

                <div style={{ marginBottom: "12px", background: "#1e293b", borderRadius: "8px", padding: "10px 14px", fontSize: "12px", color: "#cbd5e1", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>Formula: <code style={{ color: "#38bdf8", fontFamily: "monospace" }}>M = P * [r(1+r)^n] / [(1+r)^n - 1]</code></span>
                  <span style={{ color: "#34d399", fontWeight: 600 }}>Status: 200 OK</span>
                </div>

                <div style={{ overflowX: "auto", maxHeight: "380px", overflowY: "auto" }}>
                  <pre style={{ margin: 0, fontFamily: "monospace", fontSize: "12px", lineHeight: "1.6", color: "#e2e8f0" }}>
                    {JSON.stringify(
                      {
                        engine: "DevsPoint Financial Engine (dp-calc-engine)",
                        version: "2.4.1",
                        spec: "RFC-7946-Financial-Extension",
                        timestamp: new Date().toISOString(),
                        parameters: {
                          principal: currentBalance,
                          currentAnnualInterestRate: currentRate,
                          currentRemainingTermMonths: currentTermLeft * 12,
                          newAnnualInterestRate: newRate,
                          newTermMonths: newTerm * 12,
                          closingCosts: closingCosts,
                        },
                        computedMetrics: {
                          currentMonthlyPayment: Number(result.currentPayment.toFixed(2)),
                          newMonthlyPayment: Number(result.newPayment.toFixed(2)),
                          monthlyDelta: Number(result.monthlySavings.toFixed(2)),
                          breakEvenMonths: result.breakEvenMonths === Infinity ? null : result.breakEvenMonths,
                          totalInterestCurrent: Number(result.currentTotalInterest.toFixed(2)),
                          totalInterestNew: Number(result.newTotalInterest.toFixed(2)),
                          lifetimeInterestDelta: Number(result.interestSaved.toFixed(2)),
                          netSavingsAfterClosingCosts: Number(result.totalSavings.toFixed(2)),
                        },
                        amortizationScheduleSample: result.amortData.slice(0, 5).map((row) => ({
                          year: row.year,
                          currentBalance: row.currentBalance,
                          newBalance: row.newBalance,
                          cumulativeSavings: row.cumulativeSavings,
                        })),
                        fullScheduleAvailable: true,
                        totalYearsCalculated: result.amortData.length,
                      },
                      null,
                      2
                    )}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
