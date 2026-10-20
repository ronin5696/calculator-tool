import Link from "next/link";

interface CalculatorNavProps {
  active: "refinance" | "amortization" | "break-even" | "cash-out";
}

const navItems = [
  { id: "refinance", label: "Refinance Calculator", href: "/calculator", icon: "🧮", badge: "Core" },
  { id: "amortization", label: "Amortization Schedule", href: "/calculator/amortization", icon: "📋", badge: "Table" },
  { id: "break-even", label: "Break-Even Calculator", href: "/calculator/break-even", icon: "⏱️", badge: "Timeline" },
  { id: "cash-out", label: "Cash-Out Refinance", href: "/calculator/cash-out", icon: "💰", badge: "Equity" },
];

export default function CalculatorNav({ active }: CalculatorNavProps) {
  return (
    <nav className="calc-nav-wrapper" aria-label="Calculator suite navigation" style={{ margin: "0 auto 32px", maxWidth: 1040, padding: "0 16px" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 12,
        background: "var(--surface)",
        padding: 8,
        borderRadius: 16,
        border: "1px solid var(--border)",
      }}>
        {navItems.map((item) => {
          const isActive = item.id === active;
          return (
            <Link
              key={item.id}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                borderRadius: 12,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 14,
                transition: "all 0.2s ease",
                background: isActive ? "var(--primary)" : "white",
                color: isActive ? "#ffffff" : "var(--dark)",
                boxShadow: isActive ? "0 4px 14px rgba(26,86,219,0.3)" : "none",
                border: isActive ? "1px solid var(--primary)" : "1px solid var(--border)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 18 }} aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              <span style={{
                fontSize: 11,
                padding: "2px 8px",
                borderRadius: 100,
                background: isActive ? "rgba(255,255,255,0.2)" : "var(--primary-light)",
                color: isActive ? "#ffffff" : "var(--primary)",
                fontWeight: 700,
                textTransform: "uppercase",
              }}>
                {item.badge}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
