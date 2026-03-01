export default function StatusBadge({ status }) {
  const colors = {
    Applied: "#3498db",
    Interview: "#f1c40f",
    Rejected: "#e74c3c",
    Selected: "#2ecc71",
  };

  return (
    <span
      style={{
        padding: "4px 8px",
        borderRadius: "4px",
        backgroundColor: colors[status] || "#95a5a6",
        color: "#fff",
        fontSize: "12px",
      }}
    >
      {status}
    </span>
  );
}