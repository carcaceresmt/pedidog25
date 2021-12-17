import React,{useEffect,useState} from 'react'
import { consumirApiProductoGet } from '../../assets/js/api'
const Mostrar = () => {

    const [data,setData]=useState([])

    useEffect(() => {
        const resp=consumirApiProductoGet()
        resp.then(data => {
            setData(data.data)
        })

       
    }, [])
    return (
        <div>
             <h1 className="text-center mt-5 mb-3">Lista de Productos</h1>
                            <table className="table table-striped text-center">
                                <thead>
                                    <tr>
                                        <th>
                                            Id
                                        </th>
                                        <th>
                                            Producto
                                        </th>
                                        <th>
                                            Precio
                                        </th>

                                        <th>
                                            Descripcion
                                        </th>
                                        <th>
                                           Categoria
                                        </th>
                                        <th>
                                            Stock
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {


                                        data.map(producto =>

                                            <tr key={producto.id}>
                                                <td>{producto.id}</td>
                                                <td>{producto.nomprod}</td>
                                                <td>{"$ "}{new Intl.NumberFormat("de-DE").format(parseInt(producto.precio))}</td>

                                                <td>{producto.descripcion}</td>
                                                <td>{producto.categoria} </td>
                                                <td>{producto.stock} </td>                                                
                                            </tr>
                                        )
                                    }



                                </tbody>
                            </table>
            
        </div>
    )
}

export default Mostrar
