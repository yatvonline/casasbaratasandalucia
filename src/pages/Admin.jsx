export default function Admin() {
  return (
    <div style={{
      background: "#111",
      color: "white",
      minHeight: "100vh",
      padding: "40px",
      fontFamily: "Arial"
    }}>
      <h1>Panel Administrador</h1>

      <p>Bienvenido al panel privado.</p>

      <button style={{
        padding: "12px 20px",
        background: "#c46b3d",
        border: "none",
        color: "white",
        borderRadius: "8px",
        cursor: "pointer"
      }}>
        Añadir nueva casa
      </button>
    </div>
  );
}
