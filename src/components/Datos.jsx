import React, { useState, useEffect } from 'react'

const Datos = () => {

    const [nombre, setNombre] = useState("")
    const [edad, setEdad] = useState(0)

    const guardar = (e) => {
        e.preventDefault()
        if (nombre.length > 0 && edad.length > 0) {
            localStorage.setItem("nombre", nombre)
            localStorage.setItem("edad", edad)
        }
        else{
            alert("Campo Vacio!!")
        }
    }

    const mostrar = (e) => {
        if (localStorage.getItem("nombre") == null && localStorage.getItem("edad") == null) {
            alert("No se puede Mostar porque no tiene elemenentos Guardados en el Navegador")
        }
        else {
            alert(`Nombre:${localStorage.getItem("nombre")} Edad:${localStorage.getItem("edad")}`)
        }
    }

    const eliminarNombre = () => {
        localStorage.removeItem("nombre")
    }

    const eliminarEdad = () => {
        localStorage.removeItem("edad")
    }

    const eliminarClaves=()=>{
        localStorage.clear()
    }

    useEffect(() => {

        if (localStorage.getItem("nombre") != null) {
            localStorage.setItem("nombre", "")
        }

        if (localStorage.getItem("edad") != null) {
            localStorage.setItem("edad", 0)
        }

    }, []);


    return (
        <div className="container mt-5">
            <form onSubmit={guardar}>
                <h1 className="text-center">Datos de Persona</h1>
                <label>Digite el Nombre</label>
                <input type="text" onChange={(e) => { setNombre(e.target.value) }} className="form-control" />
                <label>Digite la Edad</label>
                <input type="text" onChange={(e) => { setEdad(e.target.value) }} className="form-control" />
                <button className="btn btn-success mt-3 btn-block">Guardar</button>
            </form>
            <button className="btn btn-primary mt-3 btn-block" onClick={(e) => mostrar()}>Ver</button>
            <button className="btn btn-danger mt-3 btn-block" onClick={(e) => eliminarNombre()}>Eliminar Nombre</button>
            <button className="btn btn-danger mt-3 btn-block" onClick={(e) => eliminarEdad()}>Eliminar Edad</button>
            <button className="btn btn-danger mt-3 btn-block" onClick={(e) => eliminarClaves()}>Eliminar Nombre y Edad</button>

        </div>
    )
}
export default Datos


