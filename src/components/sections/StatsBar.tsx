const stats = [
  {
    value: "★4.84",
    label: "Best rated on App Store",
  },
  {
    value: "$14,530,779,925",
    label: "Funds managed with Solflare",
  },
  {
    value: "4M+",
    label: "Active users",
  },
];

export default function StatsBar() {
  return (
    <section className="relative z-10 -mt-16 px-4 pb-24">
      <div className="w-full rounded-[36px] bg-[#ffef46] px-10 py-28 sm:px-16 sm:py-32">
        <ul className="grid gap-10 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <li key={stat.label} className="space-y-4">
              <p className="text-4xl font-semibold text-[#0a0c10] sm:text-6xl">
                {stat.value}
              </p>
              <p className="pt-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#0a0c10] sm:text-xs">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
