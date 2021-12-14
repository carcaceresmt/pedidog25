import React, { useState, useEffect } from 'react'
import { consumirApiProductoGet } from '../assets/js/api'

const Pedido = () => {
    /**
     * llamado de la Api Rest Producto
     */

    const resp = consumirApiProductoGet()


    /**Estados */
    const [data, setData] = useState([])
    const [cantidad, setCantidad] = useState(1)
    const [pedido, setPedido] = useState([])

    /**
     * funciones
     */

    const agregar = (producto) => {

        if (pedido === 0) {
            alert("Digite la Cantidad de Producto a Comprar")
        }

        else if (cantidad > producto.stock) {
            alert("Excede el Stock")
        }
        else {

            const array = pedido


            const objetoProducto = {
                id: producto.id,
                nomprod: producto.nomprod,
                precio: producto.precio,
                cantidad: cantidad,
                descripcion: producto.descripcion,
                subtotal: cantidad * producto.precio
            }

            array.push(objetoProducto)
            localStorage.setItem("carrito", JSON.stringify(array))
            setPedido(JSON.parse(localStorage.getItem("carrito")))
        }

    }

    const validar = (producto,array)=>{

        let cont = 0
        array.forEach(element => {
            
            if(producto.id=== element.id){
                cont++
            }

        });

        return cont
    }





    /**
     * useEffect para llamado de la Api
     */

    useEffect(() => {

        resp.then(data => {
            setData(data.data)
        })

        if (localStorage.getItem("carrito") != null) {
            setPedido(JSON.parse(localStorage.getItem("carrito")))
        }


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
                            Cantidad
                        </th>
                        <th>
                            Precio
                        </th>

                        <th>
                            Descripcion
                        </th>
                        <th>
                            Acción
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {

                        data.map(producto =>

                            <tr key={producto.id}>
                                <td>{producto.id}</td>
                                <td>{producto.nomprod}</td>
                                <td><input type="number" id={"id" + producto.id}
                                    onClick={(e) => setCantidad(e.target.value)}
                                    onChange={(e) => setCantidad(e.target.value)}
                                    min="1"
                                /></td>
                                <td>{"$ "}{new Intl.NumberFormat("de-DE").format(parseInt(producto.precio))}</td>

                                <td>{producto.descripcion}</td>
                                <td><button className="btn btn-success" onClick={(e) => { agregar(producto) }}>
                                    Agregar
                                    </button>
                                </td>
                            </tr>


                        )
                    }



                </tbody>
            </table>


            <h1 className="text-center mt-5 mb-3">Pedidos</h1>
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
                            Cantidad
                        </th>
                        <th>
                            Descripción
                        </th>
                        <th>
                            Subtotal
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pedido.map((item,index)=>

                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nomprod}</td>
                                <td>{"$ "}{new Intl.NumberFormat("de-DE").format(parseInt(item.precio))}</td>
                                <td>{item.cantidad}</td>
                                <td>{item.descripcion}</td>
                                <td>{"$ "}{new Intl.NumberFormat("de-DE").format(parseInt(item.subtotal))}</td>
                            </tr>
                        )

                    }
                </tbody>

            </table>


        </div>
    )
}

export default Pedido
