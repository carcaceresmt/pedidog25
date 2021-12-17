import React,{useState} from 'react'
import {UserContext} from '../../assets/js/contexto' 
import Componente2 from './Componente2'
import Componente5 from './Componente5'
const Componente1 = () => {

    const objetoUsuario={
        "nombre":"Juan",
        "apellido":"Perez",
        "edad":30
    }

    const [user,setUser] = useState(objetoUsuario)
    

    const cambiar=()=>{
        setUser({
            "nombre":"Carlos",
            "apellido":"Caceres",
            "edad":42
        })
    }
    return (
        <div>
            <p>Componente 1</p>
            <button onClick={(e)=>{cambiar()}}>Cambiar</button>
            <UserContext.Provider value={user} >              
                <Componente2></Componente2>
                <Componente5></Componente5>
            </UserContext.Provider>

            
        </div>
    )
}

export default Componente1
