import React, { useState, useEffect } from 'react'
import '../assets/css/style.css'
import Mostrar from './Mostrar'
const Formulario = () => {


    const objpersona = {
        "nombre": "",
        "estudio": ""
    }

    const [nombre, setNombre] = useState("")
    const [estudio, setEstudio] = useState("Sin Estudios")
    const [persona, setPersona] = useState(objpersona)
    const [visible, setVisible] = useState(0)

    const mostrar = (e) => {
        e.preventDefault()
        objpersona.nombre = nombre
        objpersona.estudio = estudio
        setPersona(objpersona)
        setVisible(1)
    }

    useEffect(() => {

        console.log("se ejecutado useEffect")
        if(nombre.length>0){
            setVisible(1)
        }    
        else{
            setVisible(0)
        }
    }, [nombre])
    

  

    

    return (
        <div className="forms jumbotron">
            <form onSubmit={mostrar}>
                <h1 className="text-center">Datos de Persona</h1>
                <label className="mt-3">Nombres y Apellidos</label>
                <input type="text" className="form-control mt-1" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <label className="mt-3">Estudio</label>
                <select className="form-control mt-1" value={estudio} onChange={(e) => setEstudio(e.target.value)}>
                    <option value="Sin Estudios">Sin Estudios</option>
                    <option value="Primaria">Primaria</option>
                    <option value="Secundaria">Secundaria</option>
                    <option value="Universidad">Universidad</option>
                    <option value="Tecnico">Tecnico</option>
                    <option value="Tecnologo">Tecnologo</option>
                    <option value="Profesional">Profesional</option>
                    <option value="Postgrado">Postgrado</option>
                </select>
                <p className="mt-3">Nombre:{nombre}</p>
                <p>Estudio:{estudio}</p>
                <button type="submit" className="btn btn-primary mt-3">Mostrar</button>
                {
                  visible>0 && <Mostrar nombre={nombre} estudio={estudio} persona={persona}></Mostrar>
                }
                {
                  visible>0?<Mostrar nombre={nombre} estudio={estudio} persona={persona}></Mostrar>:<p>Sin Datos</p>
                }    
            </form>
        </div>
    )
}

export default Formulario
