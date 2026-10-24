"use client";

import { useState, useCallback, useEffect } from "react";
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

// ─── Indian Currency & Formatting Utilities ──────────────────────────────────
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

function totalInterest(emi: number, months: number, principal: number): number {
  return emi * months - principal;
}

interface CalcResult {
  currentEMI: number;
  newEMI: number;
  monthlySavings: number;
  totalSavings: number;
  breakEvenMonths: number;
  currentTotalInterest: number;
  newTotalInterest: number;
  interestSaved: number;
  amortData: Array<{ year: number; currentBalance: number; newBalance: number; cumulativeSavings: number }>;
  pieData: Array<{ name: string; value: number }>;
}

export default function RefinanceCalculator() {
  // Current Home Loan (Indian defaults: ₹50 Lakhs @ 9.15% for 18 yrs)
  const [currentBalance, setCurrentBalance] = useState(5000000);
  const [currentRate, setCurrentRate] = useState(9.15);
  const [currentTermLeft, setCurrentTermLeft] = useState(18);

  // New Bank / Balance Transfer Offer (e.g. SBI/HDFC 8.35% for 18 yrs, ₹18,000 switching/MODT costs)
  const [newRate, setNewRate] = useState(8.35);
  const [newTerm, setNewTerm] = useState(18);
  const [switchingCosts, setSwitchingCosts] = useState(18000);

  // UI state
  const [activeTab, setActiveTab] = useState<"results" | "amortization" | "chart" | "json">("results");
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<CalcResult | null>(null);
  const [calculated, setCalculated] = useState(false);

  const calculate = useCallback(() => {
    const curEMI = monthlyEMI(currentBalance, currentRate, currentTermLeft * 12);
    const nwEMI = monthlyEMI(currentBalance, newRate, newTerm * 12);
    const mSavings = curEMI - nwEMI;
    const tSavings = mSavings * Math.min(currentTermLeft, newTerm) * 12 - switchingCosts;
    const breakEven = mSavings > 0 ? Math.ceil(switchingCosts / mSavings) : Infinity;

    const curTotalInt = totalInterest(curEMI, currentTermLeft * 12, currentBalance);
    const nwTotalInt = totalInterest(nwEMI, newTerm * 12, currentBalance);
    const intSaved = curTotalInt - nwTotalInt;

    // Year-by-year Amortization schedule
    const amortData: CalcResult["amortData"] = [];
    const curR = currentRate / 100 / 12;
    const nwR = newRate / 100 / 12;
    let curBal = currentBalance;
    let nwBal = currentBalance;
    let cumSavings = -switchingCosts;

    const maxYears = Math.max(currentTermLeft, newTerm);
    for (let y = 1; y <= maxYears; y++) {
      for (let m = 0; m < 12; m++) {
        if (curBal > 0) {
          curBal -= curEMI - curBal * curR;
          if (curBal < 0) curBal = 0;
        }
        if (nwBal > 0) {
          nwBal -= nwEMI - nwBal * nwR;
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
      { name: "Principal Outstanding", value: currentBalance },
      { name: "New Total Interest", value: Math.max(0, Math.round(nwTotalInt)) },
      { name: "Interest Saved", value: Math.max(0, Math.round(intSaved)) },
    ];

    setResult({
      currentEMI: curEMI,
      newEMI: nwEMI,
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
  }, [currentBalance, currentRate, currentTermLeft, newRate, newTerm, switchingCosts]);

  // Initial calculation on mount
  useEffect(() => {
    calculate();
  }, [calculate]);

  const PIE_COLORS = ["#1a56db", "#7c3aed", "#10b981"];

  return (
    <section className="calc-section-wrapper">
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <span className="section-tag">🇮🇳 Indian Home Loan Calculator</span>
        <h1 style={{ fontSize: "clamp(24px, 4vw, 40px)", color: "var(--dark)", marginBottom: 12, marginTop: 12 }}>
          Home Loan Balance Transfer Calculator
        </h1>
        <p style={{ fontSize: "clamp(15px, 2vw, 17px)", color: "var(--text-secondary)", maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>
          Calculate exact EMI reduction, total interest saved, and break-even period when switching your home loan to a lower interest rate bank (SBI, HDFC, ICICI, etc.).
        </p>
      </div>

      <div className="calc-inputs-grid">
        {/* Existing Home Loan Card */}
        <div className="calc-card">
          <div className="calc-title">
            <div className="calc-title-icon">🏦</div>
            Current Existing Loan
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="current-balance">
              <span>Outstanding Principal Balance</span>
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>
                {fmtINR(currentBalance)} <span style={{ fontSize: 12, color: "var(--text-muted)" }}>({fmtINRLakh(currentBalance)})</span>
              </span>
            </label>
            <div className="form-input-wrapper">
              <span className="form-prefix">₹</span>
              <input
                id="current-balance"
                type="number"
                className="form-input"
                value={currentBalance}
                onChange={(e) => setCurrentBalance(Number(e.target.value))}
                min={500000}
                max={50000000}
                step={50000}
                aria-label="Outstanding loan balance in Rupees"
              />
            </div>
            <input
              type="range"
              className="range-slider"
              min={500000}
              max={20000000}
              step={50000}
              value={currentBalance}
              onChange={(e) => setCurrentBalance(Number(e.target.value))}
              style={{ "--val": `${((currentBalance - 500000) / (20000000 - 500000)) * 100}%` } as React.CSSProperties}
              aria-label="Adjust current balance"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="current-rate">
              <span>Current Interest Rate</span>
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>{currentRate}% p.a.</span>
            </label>
            <div className="form-input-wrapper">
              <input
                id="current-rate"
                type="number"
                className="form-input no-prefix has-suffix"
                value={currentRate}
                onChange={(e) => setCurrentRate(Number(e.target.value))}
                min={6.5}
                max={16}
                step={0.05}
                aria-label="Current interest rate percentage"
              />
              <span className="form-suffix">%</span>
            </div>
            <input
              type="range"
              className="range-slider"
              min={6.5}
              max={15}
              step={0.05}
              value={currentRate}
              onChange={(e) => setCurrentRate(Number(e.target.value))}
              style={{ "--val": `${((currentRate - 6.5) / (15 - 6.5)) * 100}%` } as React.CSSProperties}
              aria-label="Adjust current interest rate"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="term-left">
              <span>Remaining Loan Tenure</span>
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>{currentTermLeft} Years ({currentTermLeft * 12} EMIs)</span>
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
              aria-label="Adjust remaining tenure"
            />
          </div>
        </div>

        {/* New Bank / Balance Transfer Offer Card */}
        <div className="calc-card">
          <div className="calc-title">
            <div className="calc-title-icon">✨</div>
            New Bank / Balance Transfer Offer
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="new-rate">
              <span>New Offered Interest Rate</span>
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>{newRate}% p.a. (RLLR/EBLR)</span>
            </label>
            <div className="form-input-wrapper">
              <input
                id="new-rate"
                type="number"
                className="form-input no-prefix has-suffix"
                value={newRate}
                onChange={(e) => setNewRate(Number(e.target.value))}
                min={6.5}
                max={15}
                step={0.05}
                aria-label="New interest rate percentage"
              />
              <span className="form-suffix">%</span>
            </div>
            <input
              type="range"
              className="range-slider"
              min={6.5}
              max={14}
              step={0.05}
              value={newRate}
              onChange={(e) => setNewRate(Number(e.target.value))}
              style={{ "--val": `${((newRate - 6.5) / (14 - 6.5)) * 100}%` } as React.CSSProperties}
              aria-label="Adjust new interest rate"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="new-term">
              <span>New Loan Tenure</span>
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>{newTerm} Years</span>
            </label>
            <div className="form-input-wrapper">
              <input
                id="new-term"
                type="number"
                className="form-input no-prefix has-suffix"
                value={newTerm}
                onChange={(e) => setNewTerm(Number(e.target.value))}
                min={1}
                max={30}
                step={1}
                aria-label="New loan tenure in years"
              />
              <span className="form-suffix">yrs</span>
            </div>
            <input
              type="range"
              className="range-slider"
              min={1}
              max={30}
              step={1}
              value={newTerm}
              onChange={(e) => setNewTerm(Number(e.target.value))}
              style={{ "--val": `${((newTerm - 1) / (30 - 1)) * 100}%` } as React.CSSProperties}
              aria-label="Adjust new loan tenure"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="switching-costs">
              <span>Switching Charges (MODT + Processing + Legal)</span>
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>{fmtINR(switchingCosts)}</span>
            </label>
            <div className="form-input-wrapper">
              <span className="form-prefix">₹</span>
              <input
                id="switching-costs"
                type="number"
                className="form-input"
                value={switchingCosts}
                onChange={(e) => setSwitchingCosts(Number(e.target.value))}
                min={0}
                max={150000}
                step={1000}
                aria-label="Estimated switching charges in Rupees"
              />
            </div>
            <input
              type="range"
              className="range-slider"
              min={0}
              max={80000}
              step={1000}
              value={switchingCosts}
              onChange={(e) => setSwitchingCosts(Number(e.target.value))}
              style={{ "--val": `${(switchingCosts / 80000) * 100}%` } as React.CSSProperties}
              aria-label="Adjust switching costs"
            />
            <span style={{ fontSize: 12, color: "var(--text-muted)", display: "block", marginTop: 4 }}>
              *Note: Under RBI guidelines, banks cannot charge foreclosure fees on floating rate home loans.
            </span>
          </div>

          <button
            id="calculate-btn"
            className="calc-btn"
            onClick={calculate}
            aria-label="Recalculate balance transfer savings"
          >
            <span>Recalculate Savings</span>
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
                <div className="savings-title">Monthly EMI Reduction</div>
                <div className="savings-value">
                  {fmtINR(Math.round(result.monthlySavings))}
                  <span style={{ fontSize: 16, fontWeight: 500, color: "#047857" }}> / month</span>
                </div>
                <div className="savings-sub">
                  Total Net Savings over {Math.min(currentTermLeft, newTerm)} years:{" "}
                  <strong>{fmtINR(Math.round(result.totalSavings))}</strong> ({fmtINRLakh(result.totalSavings)} after deducting ₹{switchingCosts.toLocaleString("en-IN")} transfer charges)
                </div>
              </div>
            </div>
          ) : (
            <div className="info-box" role="alert">
              <span className="info-box-icon">ℹ️</span>
              <p>
                <strong>Observation:</strong> With the selected parameters, the new monthly EMI is equal to or higher
                than your current EMI. If shortening tenure, check the total interest saved below!
              </p>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="calc-toolbar">
            <div className="tabs" role="tablist" aria-label="Results tabs">
              {(
                [
                  { id: "results", label: "📊 Summary Cards" },
                  { id: "amortization", label: "📋 Amortization Table" },
                  { id: "chart", label: "📈 Balance Decay Chart" },
                  { id: "json", label: "💻 Verified Math & JSON" },
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
                    engine: "DevsPoint Home Loan Engine (India)",
                    currency: "INR",
                    rbiGuidelinesCompliant: true,
                    timestamp: new Date().toISOString(),
                    inputs: {
                      outstandingPrincipalINR: currentBalance,
                      currentRatePct: currentRate,
                      currentTenureRemainingYrs: currentTermLeft,
                      newRatePct: newRate,
                      newTenureYrs: newTerm,
                      switchingFeesINR: switchingCosts,
                    },
                    metrics: {
                      currentMonthlyEMI: Math.round(result.currentEMI),
                      newMonthlyEMI: Math.round(result.newEMI),
                      monthlyEMISavings: Math.round(result.monthlySavings),
                      totalLifetimeInterestSaved: Math.round(result.interestSaved),
                      netSavingsAfterFees: Math.round(result.totalSavings),
                      breakEvenPeriodMonths: result.breakEvenMonths,
                    },
                  };
                  navigator.clipboard.writeText(JSON.stringify(exportPayload, null, 2));
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="export-btn"
                aria-label="Copy Indian home loan calculation JSON"
              >
                {copied ? "✓ Copied JSON" : "📋 Copy Payload"}
              </button>
            </div>
          </div>

          {/* Tab 1: Summary Metrics */}
          {activeTab === "results" && (
            <div id="tabpanel-results" role="tabpanel" aria-labelledby="tab-results">
              <div className="results-metrics-grid">
                <div className="metric-card">
                  <div className="metric-label">Current Monthly EMI</div>
                  <div className="metric-value">{fmtINR(Math.round(result.currentEMI))}</div>
                  <div className="metric-sub">{currentRate}% p.a. for {currentTermLeft} yrs</div>
                </div>

                <div className="metric-card highlight">
                  <div className="metric-label">New Monthly EMI</div>
                  <div className="metric-value" style={{ color: "var(--primary)" }}>
                    {fmtINR(Math.round(result.newEMI))}
                  </div>
                  <div className="metric-sub">{newRate}% p.a. for {newTerm} yrs</div>
                </div>

                <div className="metric-card" id="break-even-metric">
                  <div className="metric-label">Break-Even Period</div>
                  <div className="metric-value" style={{ color: "#7c3aed" }}>
                    {isFinite(result.breakEvenMonths) ? `${result.breakEvenMonths} Months` : "N/A"}
                  </div>
                  <div className="metric-sub">
                    {isFinite(result.breakEvenMonths)
                      ? `Recoup ₹${switchingCosts.toLocaleString("en-IN")} fees in ${(result.breakEvenMonths / 12).toFixed(1)} years`
                      : "No monthly savings"}
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-label">Total Interest Saved</div>
                  <div className="metric-value" style={{ color: "#10b981" }}>
                    {fmtINR(Math.max(0, Math.round(result.interestSaved)))}
                  </div>
                  <div className="metric-sub">{fmtINRLakh(Math.max(0, result.interestSaved))} over entire loan</div>
                </div>
              </div>

              {/* Pie breakdown */}
              <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "center" }}>
                <div>
                  <h3 style={{ fontSize: 18, color: "var(--dark)", marginBottom: 8 }}>
                    Loan Cost Distribution
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    Switching from <strong>{currentRate}%</strong> to <strong>{newRate}%</strong> cuts total interest from{" "}
                    <strong>{fmtINR(Math.round(result.currentTotalInterest))}</strong> down to{" "}
                    <strong>{fmtINR(Math.round(result.newTotalInterest))}</strong>.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ width: 12, height: 12, borderRadius: 3, background: PIE_COLORS[0] }} />
                        Principal Borrowed
                      </span>
                      <strong>{fmtINR(currentBalance)}</strong>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ width: 12, height: 12, borderRadius: 3, background: PIE_COLORS[1] }} />
                        New Total Interest
                      </span>
                      <strong>{fmtINR(Math.round(result.newTotalInterest))}</strong>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ width: 12, height: 12, borderRadius: 3, background: PIE_COLORS[2] }} />
                        Net Interest Saved
                      </span>
                      <strong style={{ color: "#059669" }}>{fmtINR(Math.max(0, Math.round(result.interestSaved)))}</strong>
                    </div>
                  </div>
                </div>

                <div style={{ height: 220 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={result.pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {result.pieData.map((entry, index) => (
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
          )}

          {/* Tab 2: Amortization Schedule */}
          {activeTab === "amortization" && (
            <div id="tabpanel-amortization" role="tabpanel" aria-labelledby="tab-amortization">
              <h3 style={{ fontSize: 18, color: "var(--dark)", marginBottom: 12 }}>
                Side-by-Side Yearly Principal Decay Schedule
              </h3>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16 }}>
                Compare remaining principal balance and cumulative savings year by year in Indian Rupees.
              </p>
              <div className="table-wrapper">
                <table className="amort-table">
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>Current Balance ({currentRate}%)</th>
                      <th>New Balance ({newRate}%)</th>
                      <th>Cumulative Net Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.amortData.map((row) => (
                      <tr key={row.year}>
                        <td>Year {row.year}</td>
                        <td>{fmtINR(row.currentBalance)}</td>
                        <td style={{ color: "var(--primary)", fontWeight: 600 }}>{fmtINR(row.newBalance)}</td>
                        <td style={{ color: row.cumulativeSavings >= 0 ? "#059669" : "#dc2626", fontWeight: 600 }}>
                          {row.cumulativeSavings >= 0 ? `+${fmtINR(row.cumulativeSavings)}` : fmtINR(row.cumulativeSavings)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Chart View */}
          {activeTab === "chart" && (
            <div id="tabpanel-chart" role="tabpanel" aria-labelledby="tab-chart">
              <h3 style={{ fontSize: 18, color: "var(--dark)", marginBottom: 12 }}>
                Cumulative Net Savings Over Loan Tenure (₹)
              </h3>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20 }}>
                Visualizes the growth of your savings after factoring in initial transfer costs.
              </p>
              <div style={{ height: 320, width: "100%" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={result.amortData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="year" tickFormatter={(v) => `Yr ${v}`} />
                    <YAxis tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                    <Tooltip formatter={(v: any) => [fmtINR(Number(v)), "Cumulative Savings"]} />
                    <Area
                      type="monotone"
                      dataKey="cumulativeSavings"
                      stroke="#10b981"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorSavings)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Tab 4: Verified Math & JSON */}
          {activeTab === "json" && (
            <div id="tabpanel-json" role="tabpanel" aria-labelledby="tab-json">
              <div style={{ background: "#0f172a", color: "#f8fafc", padding: 20, borderRadius: 12, fontFamily: "monospace", fontSize: 13, overflowX: "auto" }}>
                <div style={{ color: "#38bdf8", marginBottom: 12 }}>// Verified Closed-Form EMI Amortization Algorithm</div>
                <div style={{ color: "#94a3b8", marginBottom: 16 }}>
                  EMI = P × [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ]
                  <br />
                  where P = Principal (₹{currentBalance.toLocaleString("en-IN")}), r = monthly rate ({newRate}% / 12), n = {newTerm * 12} EMIs
                </div>
                <pre style={{ margin: 0 }}>
                  {JSON.stringify(
                    {
                      engine: "DevsPoint Home Loan Balance Transfer Engine (India)",
                      currency: "INR",
                      inputs: {
                        principal: currentBalance,
                        currentRatePct: currentRate,
                        remainingTenureYrs: currentTermLeft,
                        newRatePct: newRate,
                        newTenureYrs: newTerm,
                        switchingFees: switchingCosts,
                      },
                      computed: {
                        currentEMI: Math.round(result.currentEMI),
                        newEMI: Math.round(result.newEMI),
                        monthlyEMIDelta: Math.round(result.monthlySavings),
                        breakEvenMonths: result.breakEvenMonths,
                        totalInterestSaved: Math.round(result.interestSaved),
                        netFinancialGain: Math.round(result.totalSavings),
                      },
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
