import { ArticleData } from "./types";

export const existingArticles: Record<string, ArticleData> = {
  "home-loan-balance-transfer-guide": {
    title: "The Master Guide to Home Loan Balance Transfers in India: Process, Charges & RBI Norms",
    description: "A comprehensive, practitioner-grade masterclass on transferring your home loan in India: understanding lender spreads, calculating break-even recovery, MODT stamp duty, and executing document handover.",
    date: "October 10, 2026",
    updatedDate: "October 24, 2026",
    readTime: "12 min read",
    category: "Master Guide",
    author: "Anshul",
    authorRole: "Lead Software Engineer & Creator",
    reviewer: "DevsPoint Research Desk",
    reviewerRole: "Banking & Regulatory Research",
    content: `
<p>If you have been servicing a home loan in India for more than two or three years, there is a very high probability that you are paying a higher interest rate than newly onboarded borrowers at other banks. While Indian lending institutions advertise competitive repo-linked home loan rates starting at 8.35% to 8.50%, existing borrowers are frequently stuck paying 9.15% to 9.85% under older spreads or legacy MCLR benchmarks.</p>

<p>A Home Loan Balance Transfer (refinancing) allows you to move your outstanding principal from your existing bank or Housing Finance Company (HFC) to a new lender offering a lower interest rate. Because a residential mortgage is typically the largest financial liability an Indian family ever manages, even a 0.50% interest rate reduction on a ₹50 Lakh loan can save over ₹3.5 Lakhs in interest and shorten your repayment journey by years.</p>

<p>In this guide, we break down the step-by-step balance transfer process, state-by-state switching charges, Reserve Bank of India (RBI) regulatory protections, and how to verify that your transaction creates genuine wealth.</p>

<h2>What Actually Happens During a Home Loan Balance Transfer?</h2>

<p>When you initiate a balance transfer, you are not simply renegotiating your existing EMI; you are having a new lender issue a fresh loan sanction that pays off the entire outstanding principal at your existing bank. Once your old bank receives the payoff cheque, they release their charge (hypothecation/mortgage) on your property and hand over the original property title deeds to your new lender.</p>

<p>The entire transaction involves four distinct phases:</p>

<ol>
  <li><strong>Application & Eligibility Appraisal:</strong> The new lender evaluates your credit profile, CIBIL score (750+ required for benchmark pricing), income documents, and repayment track record (last 12 months' bank statements showing no bounced EMIs).</li>
  <li><strong>Procuring the Foreclosure & List of Documents (LOD) Letters:</strong> You request a formal foreclosure statement and an official List of Documents (LOD) from your existing lender detailing every original paper held in their custody.</li>
  <li><strong>Sanction & Payoff Disbursement:</strong> The new lender issues an official sanction letter and disburses a demand draft/NEFT directly in favor of your existing loan account to clear the principal.</li>
  <li><strong>Title Deed Handover & MODT Re-registration:</strong> Within 15 to 30 days of loan payoff, your old bank releases all original title deeds, sale deeds, and encumbrance certificates. Your new bank then executes a fresh Memorandum of Deposit of Title Deeds (MODT) at the local sub-registrar office.</li>
</ol>

<h2>Reserve Bank of India (RBI) Regulations Protecting Borrowers</h2>

<p>One of the most important regulatory safeguards in Indian consumer banking is the <strong>RBI mandate on prepayment and foreclosure charges</strong>:</p>

<div class="info-box">
  <span class="info-box-icon">📜</span>
  <p><strong>Official RBI Circular (DBOD.Dir.BC.107/13.03.00/2011-12):</strong> Scheduled Commercial Banks, NBFCs, and HFCs are strictly prohibited from charging any foreclosure fees, pre-payment penalties, or exit charges on floating-rate home loans sanctioned to individual borrowers, regardless of the source of repayment.</p>
</div>

<p>This means your current bank cannot penalize you for transferring your loan. Any bank executive who claims you must pay a 2% foreclosure penalty on a floating rate loan is violating central bank regulations.</p>

<h2>The True Costs of Switching Lenders in India</h2>

<p>While your existing bank cannot levy exit fees, transitioning to a new institution involves upfront transaction friction. When using our <a href="/calculator">Home Loan Balance Transfer Calculator</a>, ensure you account for the following three fee components:</p>

<table class="amort-table">
  <thead>
    <tr>
      <th>Expense Head</th>
      <th>Typical Cost Range</th>
      <th>Who Charges It</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Processing Fee</strong></td>
      <td>₹5,000 to ₹15,000 (often capped by PSUs) or 0.25%</td>
      <td>New Bank</td>
    </tr>
    <tr>
      <td><strong>MODT Stamp Duty</strong></td>
      <td>0.1% to 0.5% of loan amount (state-dependent)</td>
      <td>State Government Sub-Registrar</td>
    </tr>
    <tr>
      <td><strong>Legal & Technical Valuation</strong></td>
      <td>₹3,500 to ₹7,500</td>
      <td>Empaneled Advocate & Engineer</td>
    </tr>
    <tr>
      <td><strong>CIBIL & Documentation Fee</strong></td>
      <td>₹500 to ₹1,500</td>
      <td>New Bank</td>
    </tr>
  </tbody>
</table>

<p>On a ₹50 Lakh loan balance transfer in states like Karnataka or Maharashtra, total switching friction typically ranges between ₹15,000 and ₹30,000. Unless your monthly EMI savings recover this friction within 6 to 12 months, a balance transfer may not be mathematically justified.</p>

<h2>Worked Illustrative Example: The Mathematical Impact of an Interest Rate Reduction</h2>

<p><em>(Note: The following is a hypothetical illustrative calculation based on standard Indian home loan terms.)</em></p>

<p>Consider an illustrative homeowner with an outstanding home loan balance of ₹54 Lakhs and 16 years (192 months) remaining on their original loan tenure. Over the years, lender spread revisions increased the rate to 9.40% p.a. An external lender offers to take over the balance at a competitive RLLR-linked rate of 8.45% p.a.</p>

<ul>
  <li><strong>Existing Loan (at 9.40% p.a. for 192 months):</strong> Monthly EMI = <strong>₹54,478</strong></li>
  <li><strong>New Loan Offer (at 8.45% p.a. for 192 months):</strong> Monthly EMI = <strong>₹51,382</strong></li>
  <li><strong>Monthly EMI Savings:</strong> ₹54,478 - ₹51,382 = <strong>₹3,096 per month</strong></li>
  <li><strong>Total Gross Interest Saved (192 months):</strong> ₹3,096 × 192 = <strong>₹5,94,432</strong></li>
  <li><strong>Estimated Switching Costs (MODT stamp duty + processing + legal):</strong> ~₹24,000</li>
  <li><strong>Break-Even Horizon:</strong> ₹24,000 ÷ ₹3,096 = <strong>7.8 Months</strong></li>
  <li><strong>Net Projected Financial Benefit:</strong> ₹5,94,432 - ₹24,000 = <strong>₹5,70,432</strong></li>
</ul>

<p>Because the upfront friction of ₹24,000 is fully recovered in under 8 months, transferring the balance delivers substantial net interest reduction over the remaining 16 years.</p>

<h2>The Pro Strategy: Request an Internal Rate Switch First</h2>

<p>Before undergoing the administrative effort of procuring physical title deeds and registering fresh MODTs, always attempt an <strong>Internal Rate Conversion</strong> with your existing lender. Most major lenders (including State Bank of India, HDFC Bank, ICICI Bank, and Axis Bank) maintain an internal rate switch policy.</p>

<p>By paying an administrative conversion fee of ₹1,000 to ₹5,000 plus GST, existing borrowers can often reset their interest rate to the bank's active new-borrower rate without moving their physical documents. If your current bank refuses to match the prevailing market rate, immediately proceed with an external balance transfer.</p>
`,
  },

  "when-to-transfer-home-loan": {
    title: "When Does It Make Sense to Transfer Your Home Loan in India? The Exact Math",
    description: "Learn the quantitative criteria for home loan balance transfers: interest rate deltas, remaining tenure thresholds, and how to evaluate your break-even velocity.",
    date: "October 12, 2026",
    updatedDate: "October 24, 2026",
    readTime: "9 min read",
    category: "Strategy",
    author: "Anshul",
    authorRole: "Lead Software Engineer & Creator",
    reviewer: "DevsPoint Research Desk",
    reviewerRole: "Banking & Regulatory Research",
    content: `
<p>Transferring your home loan to a new bank sounds tempting whenever you see advertisements for lower interest rates. However, balance transfers are not universally beneficial. Because every transfer involves upfront fees, documentation hassle, and administrative coordination, executing a balance transfer at the wrong time can actually leave you with net financial losses.</p>

<p>To determine whether transferring your home loan is mathematically sound, evaluate your loan against four non-negotiable quantitative rules:</p>

<h2>Rule 1: The 0.35% Interest Rate Delta Rule</h2>

<p>As a rule of thumb in Indian retail mortgage underwriting, a balance transfer is rarely worth the legal and stamp duty friction unless the new bank offers an interest rate that is at least <strong>0.35% to 0.50% lower</strong> than your current rate.</p>

<p>If your existing rate is 8.85% and a competitor is offering 8.70% (a mere 0.15% drop), the monthly savings on a ₹40 Lakh loan is only around ₹380 per month. After paying ₹18,000 in MODT and processing charges, it would take nearly 4 years just to break even!</p>

<h2>Rule 2: Remaining Tenure Must Exceed 5 Years</h2>

<p>Because of compound interest amortization, retail home loans are heavily front-loaded with interest:</p>

<ul>
  <li>During <strong>Years 1 to 7</strong> of a 20-year loan, up to 70% of each EMI goes toward interest. This is where interest rate cuts deliver massive financial leverage.</li>
  <li>During <strong>Years 15 to 20</strong>, the vast majority of your monthly EMI goes directly toward principal repayment. The interest component is minimal.</li>
</ul>

<p>If you only have 3 to 4 years remaining on your loan, your outstanding interest liability is already low. Transferring lenders late in your loan lifecycle will incur transaction fees that outweigh your remaining interest reduction.</p>

<h2>Rule 3: Break-Even Period Must Be Under 18 Months</h2>

<p>Your break-even velocity is calculated by dividing your total switching costs by your monthly EMI savings:</p>

<div style="background: var(--surface); border: 1px solid var(--border); padding: 18px; border-radius: 12px; font-family: monospace; text-align: center; margin: 16px 0;">
  Break-Even Months = Switching Costs (₹) ÷ Monthly EMI Reduction (₹)
</div>

<p>If your break-even period is <strong>under 12 months</strong>, transferring is an absolute no-brainer. If it falls between <strong>12 and 18 months</strong>, it remains favorable provided you plan to stay in the home. If your break-even period exceeds 24 months, you should reconsider or negotiate lower fees.</p>

<h2>Rule 4: Avoid Restarting the Loan Clock</h2>

<p>One of the most dangerous traps borrowers fall into is resetting a 20-year loan back to a full 20 years after having already serviced it for 5 years. While stretching the tenure lowers your monthly EMI, it increases your total lifetime interest liability significantly. Always request the new bank to match your <em>remaining</em> tenure (e.g. 15 years) rather than stretching it out.</p>
`,
  },

  "home-loan-transfer-charges-modt": {
    title: "Understanding Home Loan Transfer Charges: MODT, Processing Fees & Stamp Duty Explained",
    description: "A comprehensive line-by-line guide to every switching fee charged during an Indian home loan balance transfer: state-wise MODT stamp duty, processing fee caps, and hidden bank charges.",
    date: "October 14, 2026",
    updatedDate: "October 24, 2026",
    readTime: "10 min read",
    category: "Cost Analysis",
    author: "Anshul",
    authorRole: "Lead Software Engineer & Creator",
    reviewer: "DevsPoint Research Desk",
    reviewerRole: "Banking & Regulatory Research",
    content: `
<p>When planning a home loan balance transfer, borrowers frequently ask: <em>"How much money do I actually need to pay upfront to switch banks?"</em></p>

<p>Understanding fee structures is critical. While RBI guidelines prohibit your current bank from levying any exit or foreclosure penalty on floating-rate home loans, transferring to a new financial institution involves statutory charges and third-party fees.</p>

<h2>1. What Is MODT (Memorandum of Deposit of Title Deeds)?</h2>

<p>MODT is an official legal undertaking registered with the state government's sub-registrar confirming that you have deposited your original property title deeds with the bank as security against the home loan.</p>

<p>Because your old lender cancels their MODT upon loan payoff, your new lender must execute a fresh MODT. The stamp duty and registration fees for MODT vary significantly across Indian states:</p>

<ul>
  <li><strong>Maharashtra:</strong> 0.2% to 0.3% of the loan amount (subject to state ceilings).</li>
  <li><strong>Karnataka:</strong> 0.1% to 0.2% stamp duty on mortgage by deposit of title deeds.</li>
  <li><strong>Tamil Nadu:</strong> 0.5% of the loan amount, capped at specified statutory maximums.</li>
  <li><strong>Delhi & NCR:</strong> Flat stamp paper and registration charges typically ranging between ₹2,000 and ₹10,000.</li>
  <li><strong>Telangana & Andhra Pradesh:</strong> Approximately 0.5% stamp duty on registered mortgage deeds.</li>
</ul>

<h2>2. Bank Processing Fees & Waivers</h2>

<p>Most commercial banks charge a one-time administrative fee to process a balance transfer file. However, during festive campaigns (such as Diwali or financial year-end in March), major banks like SBI, Bank of Baroda, and PNB frequently offer <strong>100% processing fee waivers</strong>.</p>

<p>Always ask your prospective bank manager whether they can waive the processing fee before submitting your application!</p>

<h2>3. Legal Scrutiny & Technical Valuation Fees</h2>

<p>Even though your property was inspected when you first purchased it, the new bank must dispatch an empaneled civil engineer and legal advocate to conduct fresh due diligence:</p>

<ul>
  <li><strong>Technical Valuation (₹2,500 - ₹4,500):</strong> An engineer visits the property to verify structural integrity, age, and current fair market value.</li>
  <li><strong>Legal Title Search (₹2,500 - ₹5,000):</strong> An advocate inspects records at the local registrar office for the past 13 to 30 years to verify that the property has a continuous, encumbrance-free title.</li>
</ul>

<h2>Fee Breakdown Summary Checklist</h2>

<p>Use our <a href="/calculator/break-even">Switching Break-Even Calculator</a> to plug in your exact state fees and verify that your monthly EMI reduction pays off these costs within months.</p>
`,
  },

  "rllr-vs-mclr-home-loan-interest-rates": {
    title: "RLLR vs. MCLR vs. Base Rate: How Indian Home Loan Interest Rates Are Fixed",
    description: "Demystifying Indian home loan benchmark mechanisms: why RBI mandated Repo Linked Lending Rates (RLLR), how bank spreads work, and why legacy MCLR borrowers must switch.",
    date: "October 16, 2026",
    updatedDate: "October 24, 2026",
    readTime: "10 min read",
    category: "Rates & RBI",
    author: "Anshul",
    authorRole: "Lead Software Engineer & Creator",
    reviewer: "DevsPoint Research Desk",
    reviewerRole: "Banking & Regulatory Research",
    content: `
<p>In October 2019, the Reserve Bank of India introduced a transformative regulatory mandate: all commercial banks were required to link all new floating-rate personal and retail loans to an <strong>External Benchmark Lending Rate (EBLR)</strong>, with the vast majority adopting the RBI Repo Rate (RLLR).</p>

<p>Prior to this, banks utilized internal benchmarks known as <strong>MCLR (Marginal Cost of Funds based Lending Rate)</strong> and earlier <strong>Base Rate</strong>. If you took your home loan before October 2019 and have never requested a conversion, you are likely still pegged to MCLR and overpaying substantially.</p>

<h2>How RLLR Works: The Anatomy of Modern Home Loan Pricing</h2>

<p>Under the RLLR framework, your final home loan interest rate is determined by a simple transparent equation:</p>

<div style="background: var(--surface); border: 1px solid var(--border); padding: 18px; border-radius: 12px; font-family: monospace; text-align: center; margin: 16px 0;">
  Home Loan Interest Rate = RBI Repo Rate + Bank Operating Spread (Margin) + Credit Risk Spread
</div>

<ul>
  <li><strong>RBI Repo Rate:</strong> The rate at which the central bank lends short-term liquidity to commercial banks. When the Monetary Policy Committee (MPC) alters the repo rate, your loan rate must adjust by the exact same margin within a mandatory 3-month reset window.</li>
  <li><strong>Bank Spread:</strong> The fixed margin charged by the bank to cover operating costs and net interest margin (typically 2.0% to 2.25%).</li>
  <li><strong>Credit Risk Spread:</strong> Additional basis points added if your CIBIL score is below 750 or if your loan-to-value ratio exceeds standard thresholds.</li>
</ul>

<h2>Why MCLR Was Unfavorable for Borrowers</h2>

<p>Under the older MCLR regime, when the RBI cut policy rates, banks were notoriously sluggish to pass on rate cuts to borrowers, claiming their internal cost of term deposits had not yet declined. However, when the RBI increased rates, banks raised MCLR almost immediately!</p>

<p>External benchmarking under RLLR eliminated this asymmetry. Rate cuts decided in Mumbai by the RBI are legally required to translate directly into your lower EMI.</p>

<h2>How to Switch from MCLR to RLLR</h2>

<p>If your loan is still tied to MCLR, submit a formal conversion request letter to your home branch. Under RBI guidelines, banks are required to permit borrowers to transition from internal to external benchmarks upon payment of a nominal administrative fee without any penalty.</p>
`,
  },

  "home-loan-prepayment-strategies": {
    title: "Home Loan Prepayment Strategies: Reduce EMI vs. Reduce Tenure (The ₹15 Lakh Difference)",
    description: "A mathematical analysis of home loan prepayment in India. Compare shortening tenure versus reducing monthly EMI, and learn how to save lakhs with annual part-payments.",
    date: "October 18, 2026",
    updatedDate: "October 24, 2026",
    readTime: "11 min read",
    category: "Strategy",
    author: "Anshul",
    authorRole: "Lead Software Engineer & Creator",
    reviewer: "DevsPoint Research Desk",
    reviewerRole: "Banking & Regulatory Research",
    content: `
<p>Whenever you make a lump-sum prepayment toward your home loan (such as an annual bonus, tax refund, or matured fixed deposit), your bank will ask you a critical question: <em>"Would you like us to reduce your monthly EMI or reduce your remaining loan tenure?"</em></p>

<p>While most homeowners instinctively choose to lower their monthly EMI to free up immediate household cash flow, mathematically, <strong>reducing your tenure saves dramatically more interest</strong>.</p>

<h2>The Mathematical Comparison: Reduce EMI vs. Reduce Tenure</h2>

<p>Let's look at the numbers for a ₹50 Lakh home loan at 8.50% interest with 20 years remaining. Suppose the borrower makes a lump-sum part-payment of ₹5 Lakhs at the end of Year 3:</p>

<table class="amort-table">
  <thead>
    <tr>
      <th>Prepayment Option</th>
      <th>New Monthly EMI</th>
      <th>New Loan Tenure</th>
      <th>Total Lifetime Interest Saved</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Option A: Reduce Monthly EMI</strong></td>
      <td>₹39,100 (saved ₹4,300/mo)</td>
      <td>Keeps full remaining 17 years</td>
      <td><strong>₹4.2 Lakhs</strong></td>
    </tr>
    <tr>
      <td><strong>Option B: Reduce Loan Tenure</strong></td>
      <td>Keeps original ₹43,400/mo</td>
      <td><strong>Shortened by 4.5 Years!</strong></td>
      <td><strong>₹11.8 Lakhs!</strong></td>
    </tr>
  </tbody>
</table>

<p>By simply keeping the monthly EMI constant and choosing to <strong>reduce tenure</strong>, the borrower saves an extra <strong>₹7.6 Lakhs in pure interest</strong> compared to reducing the monthly EMI!</p>

<h2>The 1 Extra EMI Every Year Strategy</h2>

<p>If you cannot afford large lump-sum prepayments, an exceptionally powerful alternative is paying just <strong>one additional EMI each calendar year</strong> (13 EMIs in 12 months). On a standard 20-year home loan, this simple habit cuts your repayment duration from 20 years down to approximately 16.5 years, slashing nearly 20% of your total lifetime interest.</p>

<p>Model your exact numbers right now on our <a href="/calculator/amortization">Amortization & Prepayment Calculator</a>.</p>
`,
  },

  "home-loan-top-up-vs-personal-loan": {
    title: "Home Loan Top-Up vs. Personal Loan: Why Top-Up Loans Beat Personal Loans Every Time",
    description: "Need funds for home renovation, weddings, or medical liquidity? Compare low-interest Home Loan Top-Ups (8.75%) against expensive Personal Loans (14%), and explore tax rules.",
    date: "October 20, 2026",
    updatedDate: "October 24, 2026",
    readTime: "9 min read",
    category: "Equity",
    author: "Anshul",
    authorRole: "Lead Software Engineer & Creator",
    reviewer: "DevsPoint Research Desk",
    reviewerRole: "Banking & Regulatory Research",
    content: `
<p>When Indian homeowners need ₹5 Lakhs to ₹25 Lakhs for home renovations, children's higher education, or medical obligations, they frequently turn to unsecured Personal Loans. However, for anyone with an active, clean home loan, a <strong>Home Loan Top-Up</strong> is vastly superior in almost every financial dimension.</p>

<h2>1. Massive Interest Rate Differential</h2>

<ul>
  <li><strong>Unsecured Personal Loans:</strong> Typically priced at <strong>12.5% to 18.0% p.a.</strong> depending on your employer profile and credit score.</li>
  <li><strong>Home Loan Top-Up Loans:</strong> Typically priced at <strong>8.75% to 9.75% p.a.</strong> (usually just 25 to 50 basis points above your base home loan rate).</li>
</ul>

<h2>2. Flexible Long Tenures Mean Much Lower EMIs</h2>

<p>Personal loans generally cap repayment at 5 years (60 months). In contrast, home loan top-ups can be extended across 10, 15, or even 20 years (aligned with your remaining home loan lifespan). This keeps your monthly cash flow pressure minimal.</p>

<table class="amort-table">
  <thead>
    <tr>
      <th>Loan Feature (₹10 Lakhs Needed)</th>
      <th>Personal Loan (5 Yrs @ 14%)</th>
      <th>Home Loan Top-Up (12 Yrs @ 9%)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Monthly EMI</strong></td>
      <td>₹23,268 / month</td>
      <td><strong>₹11,460 / month</strong></td>
    </tr>
    <tr>
      <td><strong>Monthly Cash Flow Relief</strong></td>
      <td>-</td>
      <td><strong>₹11,808 freed up monthly!</strong></td>
    </tr>
  </tbody>
</table>

<h2>3. Tax Benefits Under Section 24(b)</h2>

<p>Under Section 24(b) of the Indian Income Tax Act, if you utilize top-up loan proceeds exclusively for repairs, renewal, or reconstruction of your existing self-occupied residential property, you are eligible to claim an income tax deduction on interest paid up to <strong>₹30,000 per financial year</strong>!</p>

<p>Personal loans provide zero tax benefits under any circumstances.</p>
`,
  },

  "transfer-sbi-hdfc-icici-home-loan": {
    title: "How to Transfer an SBI, HDFC, or ICICI Home Loan: Step-by-Step Bank Checklist",
    description: "The complete tactical procedure for transferring home loans between India's top lenders: State Bank of India, HDFC Bank, ICICI Bank, and Axis Bank. Document list and LOD handling.",
    date: "October 22, 2026",
    updatedDate: "October 24, 2026",
    readTime: "11 min read",
    category: "Master Guide",
    author: "Anshul",
    authorRole: "Lead Software Engineer & Creator",
    reviewer: "DevsPoint Research Desk",
    reviewerRole: "Banking & Regulatory Research",
    content: `
<p>State Bank of India (SBI), HDFC Bank, ICICI Bank, and Axis Bank account for the overwhelming majority of India's retail home loan market. If you are servicing your loan with one of these institutions and planning a balance transfer to another, this tactical guide provides the exact document checklist and transition timeline.</p>

<h2>Step 1: Obtain the LOD (List of Documents) & Foreclosure Statement</h2>

<p>Visit your current lender's home branch or loan servicing hub and submit a formal request for:</p>
<ol>
  <li><strong>Foreclosure Statement:</strong> Showing the exact principal outstanding balance and daily interest rate up to a future validity date (usually 15 to 30 days out).</li>
  <li><strong>LOD (List of Documents) Letter:</strong> A signed, bank-sealed inventory of every original document stored in their central vault (Sale Deed, Mother Deed, Building Plan Sanction, Tripartite Agreement, NOC from Builder/Society, Encumbrance Certificate).</li>
</ol>

<h2>Step 2: Submit Application to the New Bank</h2>

<p>Present the foreclosure statement, LOD letter, last 3 years' ITRs, 6 months' salary slips, and 12 months' bank statements to your prospective bank. Upon satisfactory credit verification and technical property valuation, they will issue a formal sanction letter detailing your new rate and tenure.</p>

<h2>Step 3: Payoff Check Disbursement & Deed Retrieval</h2>

<p>The new bank issues a banker's cheque or RTGS directly to your existing loan account. Once cleared, your old loan account is formally closed. Your old bank then initiates a 15 to 21-day vault retrieval process to release your physical title deeds, which are subsequently deposited with the new bank to register the fresh MODT.</p>
`,
  },
};
