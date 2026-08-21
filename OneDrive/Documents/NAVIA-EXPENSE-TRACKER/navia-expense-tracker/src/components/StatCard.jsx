export default function StatCard({ label, value, tone = 'default' }) {
  return (
    <div className={`stat-card stat-card--${tone}`}>
      <p className="stat-card__label">{label}</p>
      <h3 className="stat-card__value">{value}</h3>
    </div>
  )
}
