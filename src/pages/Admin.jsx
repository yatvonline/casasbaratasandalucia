import { useState } from "react"

export default function Admin() {

const [mensaje, setMensaje] = useState("")
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

  <form
onSubmit={(e)=>{
e.preventDefault()
setMensaje("✅ Vivienda publicada correctamente")
}}
style={{
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
       {
mensaje && (
  <p style={{
    color:"#6ee7b7",
    marginTop:"10px",
    fontWeight:"bold"
  }}>
    {mensaje}
  </p>
)
}{
mensaje && (
  <p style={{
    color:"#6ee7b7",
    marginTop:"10px",
    fontWeight:"bold"
  }}>
    {mensaje}
  </p>
)
}

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
