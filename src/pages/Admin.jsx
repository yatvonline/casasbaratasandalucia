export default function Admin() {
  return (
    <div style={{
      background:"#0b0b0b",
      minHeight:"100vh",
      color:"white",
      padding:"40px",
      fontFamily:"Arial"
    }}>
      
      <h1 style={{fontSize:"38px",marginBottom:"10px"}}>
        Panel Privado
      </h1>

      <p style={{opacity:"0.7",marginBottom:"40px"}}>
        Añade nuevas oportunidades off-market
      </p>

      <form style={{
        display:"flex",
        flexDirection:"column",
        gap:"20px",
        maxWidth:"600px"
      }}>

        <input 
          placeholder="Título de la vivienda"
          style={inputStyle}
        />

        <input 
          placeholder="Pueblo / Provincia"
          style={inputStyle}
        />

        <input 
          placeholder="Precio"
          style={inputStyle}
        />

        <textarea 
          placeholder="Descripción emocional de la oportunidad"
          rows="6"
          style={inputStyle}
        />

        <input 
          type="file"
          style={inputStyle}
        />

        <button style={{
          background:"#c9784a",
          border:"none",
          padding:"18px",
          borderRadius:"12px",
          color:"white",
          fontSize:"18px",
          cursor:"pointer",
          fontWeight:"bold"
        }}>
          Publicar vivienda
        </button>

      </form>
    </div>
  )
}

const inputStyle = {
  padding:"16px",
  borderRadius:"12px",
  border:"1px solid #333",
  background:"#161616",
  color:"white",
  fontSize:"16px"
}
