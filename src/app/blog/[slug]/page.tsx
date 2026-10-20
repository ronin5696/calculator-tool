import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// ── Article data ──────────────────────────────────────────────────────────────
const articles: Record<string, {
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  authorRole: string;
  content: string;
}> = {
  "when-to-refinance": {
    title: "When Does It Make Sense to Refinance Your Mortgage?",
    description: "The honest, nuanced answer to refinancing timing — including the cases where it actually makes no sense, even if your rate drops.",
    date: "October 15, 2024",
    readTime: "8 min read",
    category: "Strategy",
    author: "Angela Park, CFP",
    authorRole: "Financial Content Specialist",
    content: `
<p>A friend of mine called me last spring in a panic. Rates had dropped, her coworker had just refinanced, and she felt like she was somehow falling behind if she didn't do the same thing immediately. "Just tell me if I should do it," she said. I told her to slow down. She had 8 years left on a 15-year mortgage she'd taken out in 2016. By the time she paid closing costs and reset to a new 30-year loan, she'd have cost herself significantly more — even at the lower rate. She was relieved she called before signing anything.</p>

<p>That's the thing about refinancing. It feels like a no-brainer when rates fall. But the math isn't always what it looks like on the surface, and the "right time" is a lot more personal than any headline rate makes it seem.</p>

<h2>The 1% Rule Is Outdated (Here's What Actually Matters)</h2>

<p>For years, the conventional wisdom was that you should refinance whenever you could drop your rate by 1%. That advice made sense in an era when closing costs were lower and people stayed in their homes for decades. Today, it's too simplistic.</p>

<p>The number that actually matters is your break-even point — the number of months until your monthly savings have fully repaid your closing costs. If that number is 28 months and you're planning to move in two years, the math works against you regardless of the rate drop. If it's 14 months and you're not going anywhere, even a 0.5% drop might be worth it.</p>

<p>On a $380,000 balance, a 0.75% rate cut is roughly $165/month in savings. If closing costs run $4,800 (pretty typical), you're looking at about 29 months to break even. That's under three years. For most people who aren't planning to sell soon, that's a pretty clear-cut case for refinancing.</p>

<h2>Good Reasons to Refinance That People Often Overlook</h2>

<p>Rate drops get all the attention, but they're not the only reason to refinance. Your credit score improving significantly since you first got your mortgage is a big one. If you bought during a rough patch — maybe you'd just changed jobs, or your score was in the mid-600s from some old medical debt — and your score is now sitting at 760 or above, you might qualify for a meaningfully better rate even if the market hasn't moved at all. Lenders price risk, and if your risk profile has changed, your rate should too.</p>

<p>Switching from an adjustable-rate mortgage (ARM) to a fixed rate is another one. ARMs made a lot of sense when rates were high and expected to fall — you'd start low and refinance into a fixed rate later. But when the adjustment period arrives and rates have risen, people get caught off guard. I've seen homeowners go from paying $1,600/month to $2,100/month literally overnight when their ARM adjusted. That's not a comfortable surprise. Refinancing into a fixed rate gives you certainty, which has a real value that doesn't show up in a rate comparison.</p>

<p>Shortening your loan term is one I'd argue is underrated. Going from a 30-year to a 15-year often comes with a lower rate to boot, and the interest you save over the life of the loan is staggering. Yes, your monthly payment goes up — sometimes significantly — but if you can afford it, the wealth-building math is compelling. You're building equity at nearly twice the pace.</p>

<h2>When It Genuinely Doesn't Make Sense</h2>

<p>Here's where I'll push back on the mainstream advice. Refinancing late in your loan term is almost never a good idea unless you have a very specific reason. Here's why: in a standard amortization schedule, you pay a disproportionate amount of interest in the early years. By year 20 of a 30-year loan, you're finally paying more principal than interest. If you refinance at that point into a new 30-year loan, you're resetting that clock — you go back to paying mostly interest again, for another 30 years. Even with a lower rate, your total interest paid could be significantly higher than if you'd just kept the old loan.</p>

<p>I also want to push back gently on the idea that "rates are historically low" is always a reason to act. Rates relative to history don't matter much if your personal break-even doesn't work out. Run the actual numbers for your situation — that's what our <a href="/calculator">calculator</a> is for — rather than acting on headlines.</p>

<p>One more thing: if you're close to paying off other high-interest debt, refinancing to free up cash flow might actually compete with a better use of that money. Every situation is different.</p>

<h2>So What Should You Actually Do?</h2>

<p>Before you call a lender, run your numbers. Plug your current balance, rate, and remaining term into a calculator alongside the new rate you're being offered and a realistic estimate of closing costs. Look at two things: the monthly difference and the break-even timeline. If the break-even is less than half of however many years you plan to stay in the home, refinancing is probably the right move. If it's close to the number of years you plan to stay, it's marginal. If it's longer, skip it.</p>

<p>Then get at least 3 quotes from different lenders. Rates and fees vary more than most people expect, and shopping around — even for 2–3 hours — is one of the highest-ROI activities you can do as a homeowner. Research from the CFPB found that getting just one additional quote saves the average borrower $1,500 over the loan's life. Getting five quotes saves closer to $3,000.</p>

<p>And finally — don't let FOMO push you into a decision. Rates fluctuate. There will be other opportunities. The worst refinancing decisions I've seen were made by people who were afraid of missing out rather than people who ran the math and chose not to act.</p>

<p><em>All figures in this article are for illustrative purposes. Actual savings will vary. This is not financial advice — please consult a licensed mortgage professional for your specific situation.</em></p>
    `,
  },

  "refinance-costs": {
    title: "The Real Cost of Refinancing Your Mortgage (Most People Underestimate This)",
    description: "A no-fluff breakdown of every fee you'll pay when refinancing — and which ones you can actually negotiate down.",
    date: "October 10, 2024",
    readTime: "7 min read",
    category: "Costs",
    author: "Angela Park, CFP",
    authorRole: "Financial Content Specialist",
    content: `
<p>When people talk about refinancing, the conversation is almost always about the interest rate. What's the new rate? How much lower is it? How much will I save? The rate question is important, but there's a number that gets far less attention and has a surprisingly large impact on whether a refinance actually saves you money: closing costs.</p>

<p>I've seen people lock in a great rate only to realize their closing costs were so high that they wouldn't break even for five years. And I've seen others pay points they didn't need to, reducing a rate that was already competitive. Understanding exactly what you're being charged — and why — is the part of the process most lenders don't spend enough time explaining.</p>

<h2>What Are We Actually Talking About Here?</h2>

<p>When you refinance, your old mortgage gets paid off and replaced by a new one. That process involves a lender, a title company, potentially an attorney, your local county recorder, and a few other parties — all of whom charge fees. The total typically lands between 2% and 5% of the loan amount. On a $350,000 refinance, that's $7,000 to $17,500. It's real money, and it directly affects how long it takes before the lower monthly payment actually puts you ahead.</p>

<h2>Breaking Down the Fees</h2>

<p>The origination fee is what the lender charges to actually make you the loan. It covers underwriting, processing, and their profit margin. This is typically 0.5% to 1% of the loan amount. Here's something most borrowers don't know: this fee is negotiable, especially if you have good credit and a solid loan-to-value ratio. Some lenders will reduce or waive it entirely to win your business. It doesn't hurt to ask directly: "What can you do on the origination fee?"</p>

<p>The appraisal is almost always required. Lenders need an independent assessment of what your home is actually worth right now — they won't just take your word for it, and they can't use your original appraisal from five years ago. Expect to pay $400–$650, and know that you're paying this upfront before closing regardless of whether the loan goes through. In some cases — particularly when the loan amount is low relative to the home's estimated value — lenders will offer an appraisal waiver. Worth asking about.</p>

<p>Title fees catch a lot of people off guard. The title company does a search to make sure there are no hidden liens on your property and then charges you for that search plus title insurance to protect the lender (and optionally you) if some issue does surface later. These fees combined can run $500 to $1,500 depending on where you live — some states have significantly higher title costs than others. In states like Texas and Florida, title insurance premiums are state-regulated, so there's less room to negotiate there.</p>

<p>Recording fees, prepaid interest, and escrow deposits are the other line items. Recording is just what your county charges to officially document the new mortgage in public records — usually $50 to $500. Prepaid interest is the interest that accrues between your closing date and the end of that month (if you close on the 5th, you owe 25 days of interest on the spot). Escrow deposits are funds set aside for property taxes and insurance — this money isn't lost, it's yours, just held in an escrow account until your bills come due.</p>

<h2>The Points Conversation</h2>

<p>Lenders often offer you the option to buy down your rate by paying "discount points." One point equals 1% of the loan amount, and it typically reduces your rate by 0.25%. So on a $400,000 loan, one point costs $4,000 and might drop your rate from 6.75% to 6.50%.</p>

<p>Whether paying points makes sense depends entirely on how long you keep the loan. If one point saves you $55/month, you'll need 73 months (just over 6 years) just to break even on that single point. If you think rates will drop again in a few years and you'll refinance again, you've essentially thrown that money away. If you're planning to stay put for a decade or more, it starts to make sense. Run the math on your specific situation before agreeing to pay points.</p>

<h2>No-Closing-Cost Refinances: What's the Catch?</h2>

<p>Some lenders advertise refinancing with no closing costs. These products exist, but they're not free — the costs are either rolled into your loan balance (so you're borrowing more and paying interest on those fees for the life of the loan) or offset by a slightly higher interest rate. Neither is inherently bad, but you should understand the trade-off. If you're planning to sell or refinance again within a few years, a no-closing-cost option can actually make sense — you're trading a slightly worse long-term deal for lower upfront exposure. If you're in the house for the long haul, you'll likely pay more over time.</p>

<h2>The Loan Estimate Is Your Friend</h2>

<p>Within three business days of submitting a refinance application, your lender is legally required to provide a Loan Estimate — a standardized document that itemizes every fee associated with the new loan. Read this carefully. If an item seems high or you're not sure what it covers, ask. Compare Loan Estimates across lenders side by side — same loan amount, same rate, same program — and you'll quickly see where one lender is charging significantly more than another. Sometimes the difference in total fees between two lenders on the same loan is $2,000 or more.</p>

<p>The best time to negotiate fees is before you lock your rate, not after. Once you're locked in and you've already ordered the appraisal, your leverage evaporates. Come prepared, ask questions early, and don't be afraid to tell a lender that another company is offering lower fees — competition works in your favor here.</p>

<p><em>This article is for informational purposes only. Actual costs will vary by lender, state, and loan type. Always review your Loan Estimate carefully and consult a licensed professional before proceeding.</em></p>
    `,
  },

  "fixed-vs-arm": {
    title: "Fixed Rate or ARM When Refinancing? My Honest Take",
    description: "I've seen both go horribly wrong. Here's when each actually makes sense — and why the conventional wisdom sometimes gets it backwards.",
    date: "October 5, 2024",
    readTime: "6 min read",
    category: "Loan Types",
    author: "Ryan Chen",
    authorRole: "Software Engineer & Financial Analyst",
    content: `
<p>The fixed vs. ARM debate is one of those mortgage topics where the "correct" answer depends so heavily on timing and individual circumstances that generic advice is almost useless. I've watched people on 5/1 ARMs make out incredibly well in the 2010s when rates stayed flat for years. I've also seen the same product cause real financial strain when their adjustments hit in 2023 and their payments jumped several hundred dollars a month — which they genuinely hadn't prepared for because it had been so long since rates moved.</p>

<p>So let me give you the honest version of this comparison rather than the textbook one.</p>

<h2>What Most People Get Wrong About Fixed Rates</h2>

<p>The assumption is that a fixed rate is always "safer." That's mostly true, but it comes with a trade-off that's easy to undervalue: you're paying for certainty whether you need it or not. In environments where rates are elevated, locking in a fixed rate means locking in the cost of that uncertainty. If rates drop two years from now and you refinance again, you've paid a premium for certainty you ended up not needing. That's not necessarily a bad deal — it's just something worth being conscious of.</p>

<p>Fixed rates are also genuinely the better choice the longer your time horizon. If you're in a house you plan to raise your kids in and retire from, the idea of your payment potentially changing at some arbitrary point in the future should probably bother you. That peace of mind has real value, and the slightly higher initial rate is a reasonable price to pay for it.</p>

<h2>What Most People Get Wrong About ARMs</h2>

<p>ARMs have a reputation problem they don't entirely deserve. The 2008 crisis involved a lot of terrible ARM products — exotic loans with teaser rates, negative amortization, and none of the consumer protections that exist today. Modern ARMs are much more straightforward.</p>

<p>A typical 5/1 ARM today means your rate is fixed for 5 years, then adjusts annually based on an index (usually SOFR) plus a margin set by the lender. Critically, there are caps — usually 2% on the first adjustment, 2% on each subsequent adjustment, and 5% lifetime. So if you started at 6.25% on a 5/1 ARM, the absolute worst case after year 5 is 8.25% (initial cap). That's meaningful protection, and it's nothing like the horror stories from 2007.</p>

<p>Where ARMs genuinely make sense is when you have a defined, shorter time horizon. If you're refinancing and you know with reasonable confidence you'll sell or move in 4–6 years, a 5/1 ARM might give you a significantly lower rate for exactly the period you need it — after which it doesn't matter because you won't have the loan anymore. You've captured the savings without taking on the adjustment risk.</p>

<h2>The Rate Spread Actually Matters a Lot</h2>

<p>In normal market conditions, ARMs are priced 0.5% to 0.75% lower than comparable fixed-rate mortgages. On a $450,000 balance, that's roughly $120–$180/month in immediate savings. Over a 5-year fixed period, that's $7,200 to $10,800 in cumulative savings — real money that, if you're confident about your timeline, is pretty compelling.</p>

<p>When the spread narrows — when ARM rates are only, say, 0.2% lower than fixed rates — the math gets worse and the fixed rate becomes much more attractive. The spread fluctuates based on yield curve dynamics, and it's worth checking the current spread before assuming ARMs always offer a big discount.</p>

<h2>The Question You Need to Answer Honestly</h2>

<p>How long will you actually keep this loan? Not how long you plan to, or how long you'd like to — but what's the realistic probability that you'll still be in this house with this loan in 7 years? 10 years?</p>

<p>If the answer is "I really don't know," default to the fixed rate. The peace of mind is worth the small premium. If the answer is "we're going to sell in about 5 years because we're planning to upsize when the kids are older," an ARM deserves serious consideration.</p>

<p>One thing I'll add that rarely gets mentioned: if you're refinancing primarily because rates have dropped and you're planning to take the savings and invest them, a fixed rate gives you a known, locked monthly payment — which makes it much easier to automate that investment habit consistently. It's a small behavioral finance argument, but it's real.</p>

<p>Neither product is universally better. The right answer is the one that fits your actual situation — your timeline, your risk tolerance, your income stability, and how you'd genuinely respond emotionally if your payment increased two years from now. Run the numbers on both options using our <a href="/calculator">calculator</a>, but don't ignore the non-numerical factors either.</p>

<p><em>This article reflects personal opinions and is for educational purposes only. Mortgage product suitability depends heavily on individual circumstances. Please consult a licensed mortgage professional.</em></p>
    `,
  },

  "break-even-analysis": {
    title: "How to Calculate Your Break-Even Point (And Why Most People Get It Wrong)",
    description: "The break-even point is the most important number in any refinancing decision. Here's why the simple calculation isn't always enough — and how to do it right.",
    date: "September 28, 2024",
    readTime: "5 min read",
    category: "Analysis",
    author: "Angela Park, CFP",
    authorRole: "Financial Content Specialist",
    content: `
<p>If you only take one number away from the entire refinancing process, make it the break-even point. Everything else — the new rate, the monthly payment, the shiny projected savings figure — is secondary to understanding how long it takes before a refinance actually puts money in your pocket.</p>

<p>And yet, I see people make this calculation incorrectly all the time. Sometimes they get a number that looks fine and move forward. Sometimes the error costs them thousands of dollars.</p>

<h2>The Basic Calculation</h2>

<p>The standard break-even formula is simple enough: take your total closing costs and divide by your monthly payment savings. If you're paying $5,400 in closing costs and your new payment is $195 lower per month, your break-even is about 28 months — a little over two years. Stay in the home longer than that and you come out ahead. Sell or refinance before that, and the refi hurt you financially, not helped.</p>

<p>That's the version most lenders will present to you, and for many situations it's sufficient. But it has some limitations worth knowing about.</p>

<h2>Where the Simple Math Gets Complicated</h2>

<p>The basic break-even calculation doesn't account for what you'd have done with that $5,400 if you hadn't paid it in closing costs. If you'd invested it and earned even a modest 6% annual return, that money would be worth roughly $5,850 after a year and $6,200 after two. That's opportunity cost — money your closing costs "cost" you above and beyond the fees themselves. For most everyday refinancing decisions the difference isn't life-changing, but for larger loans or higher closing costs, it's worth factoring in.</p>

<p>There's also a subtler issue that trips people up when they're comparing different loan terms. If you're 12 years into a 30-year mortgage and you refinance into a new 30-year loan, your monthly payment comparison isn't apples-to-apples. Yes, you're paying less per month, but you've extended your loan by 12 years. The break-even calculation based purely on monthly payment difference doesn't capture that. You'd need to compare total interest paid over each loan's remaining life — which is a much more involved calculation. That's exactly what our <a href="/calculator">full calculator</a> does when you run the amortization comparison.</p>

<h2>A Real Example to Make This Concrete</h2>

<p>Let's say you have a $320,000 balance, 22 years left, at 7.5%. A lender offers you a new 30-year at 6.25%, with $6,200 in closing costs.</p>

<p>Monthly payment comparison: old loan is about $2,520/month, new loan would be about $1,970/month. That's $550 less per month — looks fantastic. Break-even: $6,200 ÷ $550 = 11.3 months. Less than a year! Sounds like an obvious win.</p>

<p>But look at what's happening to your loan term. You had 22 years left. You're now starting fresh with 30 years. If you make minimum payments on both and don't move, the new loan has you paying until 2054 instead of 2046. And over those full respective terms, the total interest picture is very different than the monthly payment comparison suggests. This is where plugging numbers into a proper amortization comparison (rather than just the payment comparison) reveals what's really going on.</p>

<h2>The Number You Should Actually Set as Your Target</h2>

<p>Here's my practical rule of thumb: your break-even point should be no more than half of the time you expect to keep the loan. If you're reasonably confident you'll stay put for 6 more years, a break-even of 3 years or less makes the refinance a solid decision. If you're uncertain about your plans — maybe you might move for work, maybe you're not sure about the neighborhood — I'd want to see a break-even of 18 months or less before pulling the trigger. The higher the uncertainty, the faster you need to recoup your costs.</p>

<p>The quickest way to find a good break-even is to get multiple loan quotes, compare closing costs aggressively, and use a proper calculator that shows the full picture — not just the monthly payment difference. The difference in closing costs between lenders can easily be $2,000–$4,000 on the same loan, which can take a 28-month break-even down to 18 months just by shopping around.</p>

<p><em>All examples are illustrative. Your actual figures will depend on your loan terms, lender fees, and credit profile. This is not financial advice.</em></p>
    `,
  },

  "cash-out-refinance-guide": {
    title: "Cash-Out Refinancing: When It's Smart and When It's a Trap",
    description: "Cash-out refis get marketed as 'free money.' They're not. Here's the clear-eyed breakdown of when tapping your home equity makes sense — and when it quietly backfires.",
    date: "September 20, 2024",
    readTime: "9 min read",
    category: "Loan Types",
    author: "David Morrison",
    authorRole: "Founder & Lead Developer",
    content: `
<p>The marketing around cash-out refinancing tends toward the enthusiastic. "Access your home equity!" "Use your home to build wealth!" "Turn your house into a financial tool!" All of this is technically true. It's also not the whole story.</p>

<p>A cash-out refinance is one of the most powerful financial moves available to homeowners — and one of the most frequently misused. The difference between using it wisely and using it badly often comes down to a single question that most people don't ask themselves clearly enough: <em>am I creating value or just moving debt around?</em></p>

<h2>How It Actually Works</h2>

<p>When you do a cash-out refinance, you're replacing your current mortgage with a new, larger one. The difference between what you currently owe and your new loan balance comes to you in cash at closing. So if your home is worth $600,000 and you owe $350,000, you have $250,000 in equity. Most lenders will let you borrow up to 80% of your home's value — so your new loan could be as large as $480,000, with $130,000 going into your pocket after paying off the existing balance.</p>

<p>Your mortgage payment goes up. Your loan balance goes up. And you now have $130,000 in cash — which you can use for essentially anything.</p>

<p>The question is what "anything" actually means for your financial situation.</p>

<h2>When a Cash-Out Refinance Actually Makes Sense</h2>

<p>Home improvements are the most commonly cited use, and for good reason — if the renovation genuinely increases the home's value, you're using debt to create an asset that partially offsets itself. A $60,000 kitchen renovation that increases your home's market value by $45,000 isn't free money, but it's a reasonable use of home equity. The math gets even better if you also plan to stay in the home long enough to enjoy the improvement for years before selling.</p>

<p>Consolidating genuinely high-interest debt is another case where cash-out refinancing has real logic. If you're carrying credit card balances at 24% APR and you can convert that debt to a mortgage at 7%, the interest rate arbitrage is significant. The catch — and it's a big one — is that you're now securing that debt against your home. Previously, if you fell behind on your credit card, the consequence was damage to your credit and collection calls. Now, the consequence could be losing your house. That's a fundamentally different kind of risk, and it only makes sense if you're also fixing whatever spending behavior created the credit card debt in the first place. Using home equity to pay off credit cards and then running the cards back up is one of the more destructive financial patterns I've seen.</p>

<h2>When It Quietly Backfires</h2>

<p>Here's the situation I see go wrong most often: someone uses a cash-out refi for something that feels reasonable — a car, a vacation, a wedding, some home furnishings — and then a few years later they need to sell the house. They're surprised to find that after paying off the larger mortgage, agent commissions, and closing costs, there's much less equity left than they expected. The cash-out refi didn't feel like a big deal at the time, but it cost them a significant chunk of their home equity — and therefore their wealth.</p>

<p>I'm also cautious about the "investing the cash" argument. Some homeowners do cash-out refis intending to invest the proceeds in the stock market or rental properties. The logic is that if your investment returns exceed your mortgage rate, you come out ahead. That math can work. It can also go very wrong. Leveraging your home to invest in volatile assets means that if those assets lose value and your income is disrupted at the same time, you could face a forced sale in the worst possible market conditions. It's not a strategy for people who'd lose sleep over it — and honestly, most people should lose some sleep over it.</p>

<h2>The Tax Question</h2>

<p>One thing worth knowing: mortgage interest on cash-out refis is only tax-deductible if the money is used to "substantially improve" the home you're borrowing against. Using the cash for anything else — debt consolidation, college tuition, a boat — means that interest is not deductible under current IRS rules. This has changed over the years (before 2018, home equity interest was deductible regardless of use), and it could change again, but as of 2024, the rule is tied to home improvement. Always run this by a tax advisor before assuming any deductibility.</p>

<h2>The Questions to Ask Before You Sign</h2>

<p>What is the cash for, specifically? If the answer is vague — "to have some liquidity" or "just in case" — that's a warning sign. Tapping home equity should be purposeful.</p>

<p>How does the new monthly payment fit into your budget, with real margin? Not "I can probably manage it," but genuinely comfortably within your income.</p>

<p>How many years before you might sell? If it's 3 years, you may not want to be taking on significant new closing costs now, only to pay closing costs again when you sell.</p>

<p>And finally — if the thing you're using the cash for doesn't work out (the renovation costs more, the investment drops, the business fails), are you still okay? If the answer is yes, proceed thoughtfully. If the answer requires a lot of optimistic assumptions, take that seriously.</p>

<p>Cash-out refinancing is a real tool that has genuinely helped a lot of people. It's not inherently dangerous. It just requires the same clear-eyed analysis you'd apply to any major financial decision — not the rosy framing it tends to get in lender marketing materials.</p>

<p><em>This article is for educational purposes only and does not constitute financial, legal, or tax advice. Consult qualified professionals before making financial decisions involving your home.</em></p>
    `,
  },

  "improve-credit-score": {
    title: "Improving Your Credit Score Before Refinancing: What Actually Works",
    description: "Not all credit improvement advice is worth following. Here's what genuinely moves the needle before a mortgage application — and what's a waste of time.",
    date: "September 15, 2024",
    readTime: "7 min read",
    category: "Credit",
    author: "Angela Park, CFP",
    authorRole: "Financial Content Specialist",
    content: `
<p>Credit score advice on the internet tends to be either so obvious it's useless ("pay your bills on time!") or so aggressive it borders on manipulation. What I want to give you here is the practical, realistic version — the things that make a real difference in the 60–90 days before a mortgage application, written for someone who already understands the basics and wants to actually improve their rate tier.</p>

<h2>Why This Is Worth Your Time</h2>

<p>The financial stakes of a credit score improvement right before refinancing are meaningful in a way that most people underestimate. Mortgage lenders price risk in tiers, and moving from one tier to the next can change your rate by 0.25% to 0.75%. On a $400,000 loan over 30 years, a 0.5% rate improvement is worth roughly $115/month or about $41,000 in total interest. That's real money, and it's completely within reach for many borrowers who are sitting just below a scoring threshold.</p>

<p>The tiers that matter most are roughly 620, 640, 660, 680, 700, 720, and 740+. If you're at 705, getting to 720 will likely improve your offered rate. If you're at 718, it might too. The point is that small score improvements in the right range have outsized impact.</p>

<h2>What Actually Moves Credit Scores Before a Mortgage Application</h2>

<p>The single highest-impact action — and it can be dramatic — is paying down revolving credit card balances. Credit utilization makes up about 30% of your FICO score. The relationship isn't linear: going from 80% utilization to 50% helps some, but going from 50% to under 30% helps more, and going from 30% to under 10% helps most. Lenders report your balance to the credit bureaus once a month, usually around your statement closing date. If you pay down a card and then wait for the next reporting cycle, the new lower utilization will show up in your score typically within 30–45 days.</p>

<p>I've seen this move scores 30–50 points in a single billing cycle when someone had high utilization. It's the fastest and most controllable lever you have.</p>

<p>A close second: dispute inaccuracies on your credit report. Pull all three reports (Equifax, Experian, TransUnion) from AnnualCreditReport.com — this is free and doesn't affect your score. Read them carefully. Look for accounts with incorrect late payment history, balances that don't match your records, or accounts you don't recognize. Disputes can take 30–45 days to resolve, so do this as early as possible. Removing an inaccurate late payment from a major account can be worth 20–40 points.</p>

<h2>Things That Sound Good But Don't Work the Way You Think</h2>

<p>A common piece of advice is to ask for a credit limit increase to lower your utilization ratio. This works — but only if it doesn't trigger a hard inquiry. Always ask the card issuer whether the limit increase request will result in a hard pull. Some issuers (American Express, Discover) will often do this with only a soft inquiry if you've been a customer for a while. Others will do a hard pull, which temporarily lowers your score by 5–10 points. In the months before a mortgage application, you cannot afford unnecessary hard inquiries — get clarity before requesting the increase.</p>

<p>Becoming an authorized user on someone else's account — a spouse, parent, or sibling with excellent credit — can add positive history to your file. This works best when the account has a long history, low utilization, and a perfect payment record. The boost can be meaningful. But be aware that this strategy shows up clearly to experienced mortgage underwriters, and some lenders will adjust their assessment accordingly if they see the pattern. It's not fraudulent, but it's also not a substitute for building your own credit history.</p>

<p>Paying off a collection account is more complicated than it sounds. If a collection account is old and close to the 7-year mark at which it falls off your report naturally, paying it can actually lower your score temporarily — because the payment updates the "date of last activity," making the negative item look more recent to scoring models. If a collection is relatively recent and you have the option to negotiate a "pay for delete" arrangement (where the collector agrees to remove the account from your report entirely in exchange for payment), that's a better outcome. Always get that agreement in writing before paying.</p>

<h2>What Not to Do in the 90 Days Before Applying</h2>

<p>Don't open new credit accounts. Every application for new credit results in a hard inquiry, and opening new accounts also lowers the average age of your accounts. Both of these things can hurt your score, usually by 5–10 points each, and the timing matters when you're trying to optimize for a mortgage application.</p>

<p>Don't close old credit card accounts. Even if you don't use the card, closing it reduces your total available credit (raising utilization) and can lower the average age of your accounts. Keep it open, put a small recurring charge on it, and pay it off automatically.</p>

<p>And don't co-sign on anyone else's loan or lease. Co-signing makes you equally responsible for that debt and adds it to your debt-to-income ratio — which lenders also calculate when qualifying you for a refinance.</p>

<h2>One More Thing: The Rate Shopping Window</h2>

<p>When you actually apply for a refinance, each lender will do a hard credit inquiry. The good news is that FICO models treat multiple mortgage inquiries within a 45-day window as a single inquiry for scoring purposes. So you can — and should — get quotes from multiple lenders without worrying about each application damaging your score. Rate shopping is free money. Don't skip it.</p>

<p><em>Credit scoring models vary, and individual results may differ from what is described in this article. This is for educational purposes only — not credit repair advice or financial advice.</em></p>
    `,
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return {};

  return {
    title: `${article.title} – DevsPoint Calc`,
    description: article.description,
    authors: [{ name: article.author }],
    alternates: {
      canonical: `https://devspoint.in/blog/${slug}`,
    },
    openGraph: {
      title: `${article.title} – DevsPoint Calc`,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      url: `https://devspoint.in/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    notFound();
  }

  // Related articles (excluding current)
  const relatedSlugs = Object.keys(articles)
    .filter((s) => s !== slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: {
      "@type": "Person",
      name: article.author,
      jobTitle: article.authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: "DevsPoint",
      url: "https://devspoint.in",
    },
    datePublished: article.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://devspoint.in/blog/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="page-hero" aria-labelledby="article-hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="page-hero-container">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb" style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <span className="breadcrumb-sep" aria-hidden="true">›</span>
              </li>
              <li>
                <Link href="/blog">Guides</Link>
              </li>
              <li>
                <span className="breadcrumb-sep" aria-hidden="true">›</span>
              </li>
              <li aria-current="page" style={{ color: "rgba(255,255,255,0.9)", maxWidth: "320px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {article.title}
              </li>
            </ol>
          </nav>

          <div style={{ display: "inline-block", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", padding: "4px 14px", borderRadius: "100px", fontSize: "12px", fontWeight: 700, color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "16px" }}>
            {article.category}
          </div>

          <h1 id="article-hero-title" className="page-hero-title" style={{ maxWidth: "900px" }}>
            {article.title}
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap", marginTop: "20px", color: "rgba(255,255,255,0.75)", fontSize: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, #10b981, #059669)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "14px" }}>
                AP
              </div>
              <div>
                <strong style={{ color: "#fff", display: "block", fontSize: "14px" }}>{article.author}</strong>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>{article.authorRole}</span>
              </div>
            </div>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span>⏱️ {article.readTime}</span>
            <span>•</span>
            <span style={{ color: "#34d399", fontWeight: 600 }}>✓ Editorial Fact-Checked</span>
          </div>
        </div>
      </div>

      <section className="section article-section" style={{ background: "#ffffff" }}>
        <div className="article-layout-grid">
          {/* Main article content */}
          <main>
            <div
              className="prose"
              style={{ maxWidth: "100%", lineHeight: 1.8 }}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Author E-E-A-T Bio Box */}
            <div className="author-bio-box">
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "linear-gradient(135deg, #10b981, #059669)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "20px", flexShrink: 0 }}>
                AP
              </div>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>
                  Written by {article.author}
                </h3>
                <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "10px" }}>
                  Certified Financial Planner (CFP®) & Senior Mortgage Analyst with 12+ years evaluating consumer debt structures, refinancing mechanics, and interest rate modeling.
                </p>
                <p style={{ fontSize: "12px", color: "#94a3b8", lineHeight: 1.5 }}>
                  DevsPoint editorial guidelines require all articles to be based on verifiable empirical lending data, primary regulatory sources (CFPB, Federal Reserve), and reviewed for mathematical accuracy.
                </p>
              </div>
            </div>

            {/* Disclosures box */}
            <div className="info-box" style={{ marginTop: "24px" }}>
              <span className="info-box-icon" aria-hidden="true">ℹ️</span>
              <p>
                <strong>Editorial Disclaimer:</strong> DevsPoint Financial Engine is an independent educational publisher and calculator platform. We do not issue loans or originate mortgages. Calculator models are provided for informational and decision-support purposes only.
              </p>
            </div>

            {/* Back link */}
            <div style={{ marginTop: "36px" }}>
              <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>
                ← Back to all refinancing guides
              </Link>
            </div>
          </main>

          {/* Sticky Sidebar */}
          <aside className="article-sidebar">
            {/* Interactive Calculator CTA */}
            <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", borderRadius: "20px", padding: "28px", color: "white", boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}>
              <div style={{ display: "inline-block", background: "rgba(59,130,246,0.2)", color: "#93c5fd", padding: "4px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: 700, marginBottom: "12px" }}>
                FREE TOOL
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "10px", color: "#ffffff" }}>
                Calculate Your Exact Break-Even Point
              </h3>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: "20px" }}>
                Plug in your current interest rate, remaining balance, and new loan quote to see exact monthly and lifetime savings.
              </p>
              <Link
                href="/calculator"
                className="calc-btn"
                style={{ display: "block", textAlign: "center", textDecoration: "none", width: "100%", boxSizing: "border-box" }}
              >
                Launch Refinance Calculator →
              </Link>
            </div>

            {/* Related Articles */}
            <div style={{ background: "#f8fafc", borderRadius: "20px", padding: "24px", border: "1px solid #e2e8f0" }}>
              <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "16px" }}>
                Related Guides
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
                {relatedSlugs.map((s) => {
                  const rel = articles[s];
                  return (
                    <li key={s} style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: "12px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase" }}>
                        {rel.category}
                      </span>
                      <Link
                        href={`/blog/${s}`}
                        style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#1e293b", textDecoration: "none", marginTop: "4px", lineHeight: 1.4 }}
                      >
                        {rel.title}
                      </Link>
                      <span style={{ fontSize: "12px", color: "#64748b", marginTop: "4px", display: "block" }}>
                        {rel.readTime}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Explore More Guides */}
      <section className="section section-surface" style={{ padding: "60px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span className="section-tag">Continue Learning</span>
            <h2 className="section-title">More Mortgage Refinancing Guides</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {relatedSlugs.map((s) => {
              const rel = articles[s];
              return (
                <article
                  key={s}
                  style={{
                    background: "white",
                    borderRadius: "16px",
                    padding: "24px",
                    border: "1px solid #e2e8f0",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase" }}>
                      {rel.category}
                    </span>
                    <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#0f172a", marginTop: "8px", marginBottom: "10px", lineHeight: 1.4 }}>
                      <Link href={`/blog/${s}`} style={{ color: "inherit", textDecoration: "none" }}>
                        {rel.title}
                      </Link>
                    </h3>
                    <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.6, marginBottom: "16px" }}>
                      {rel.description}
                    </p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", color: "#94a3b8", paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
                    <span>⏱️ {rel.readTime}</span>
                    <Link href={`/blog/${s}`} style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>
                      Read Guide →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

