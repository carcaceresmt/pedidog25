import React,{useContext} from 'react'
import { UserContext } from '../../assets/js/contexto'
const Componente5 = () => {

    const user=useContext(UserContext);
    return (
        <div>
             <div>
            <p>Componente 5</p>
            <p>Nombre: {user.nombre}</p>
            <p>Apellido: {user.apellido}</p>
            <p>Edad: {user.edad}</p>
            
        </div>
        </div>
    )
}

export default Componente5
