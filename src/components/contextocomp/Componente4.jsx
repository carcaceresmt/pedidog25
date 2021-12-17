import React,{useContext} from 'react'
import { UserContext } from '../../assets/js/contexto'
const Componente4 = () => {

    const user=useContext(UserContext);
    return (
        <div>
            <p>Componente 4</p>
            <p>Nombre: {user.nombre}</p>
            <p>Apellido: {user.apellido}</p>
            <p>Edad: {user.edad}</p>
            
        </div>
    )
}

export default Componente4
