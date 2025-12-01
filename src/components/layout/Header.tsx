export default function Header() {
  return (
    <header
      style={{
        width: "100%",
        height: "70px",
        backgroundColor: "#f8f8f8",
        color: "#333",
        borderBottom: "1px solid #e0e0e0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 20px",
        fontWeight: 600,
        fontSize: "30px",
        position: "relative",
        zIndex: 10,
        boxShadow: "0 3px 3px rgba(0, 0, 0, 0.1)", // shadow below
      }}
    >
      IQOL MAPS
    </header>
  );
}
