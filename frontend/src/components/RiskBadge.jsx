function RiskBadge({ risk }) {
  return (
    <div className="risk-badge">
      <strong>⚠️ {risk.sentence}</strong>
      <p>{risk.explanation}</p>
      <small>Risk level: {risk.risk}</small>
    </div>
  );
}

export default RiskBadge;