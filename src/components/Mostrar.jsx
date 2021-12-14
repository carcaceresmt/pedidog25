import React from 'react'

const Mostrar = (props) => {
    return (
        <div>
            <p className="mt-5">Componente Mostrar</p>
            <p>Nombre:{props.nombre}</p>
            <p>Estudio:{props.estudio}</p>
            <p>Objeto Persona</p>
            <p>Nombre:{props.persona.nombre}</p>
            <p>Estudio:{props.persona.estudio}</p>
            <p></p>
        </div>
    )
}

export default Mostrar


