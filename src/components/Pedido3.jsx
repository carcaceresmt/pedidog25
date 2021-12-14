import React, { useState, useEffect } from 'react'
import { consumirApiProductoGet } from '../assets/js/api'

const Pedido = () => {
    /**
     * llamado de la Api Rest Producto
     */




    /**Estados <*/
    const [data, setData] = useState([])
    const [cantidad, setCantidad] = useState(1)
    const [pedido, setPedido] = useState([])
    const [total, setTotal] = useState(localStorage.getItem("total"))
    let cant = 0


    /**
     * funciones
     */

    const peticionGetProducto = () => {
        const resp = consumirApiProductoGet()
        resp.then(data => {
            setData(data.data)
        })

    }

    const agregar = (producto) => {

        let array = pedido

        if (cantidad === 0) {
            alert("Cantidad Digita Vacia!!")
        }

        else if (cantidad > producto.stock) {
            alert("Excede el Stock")
        }


        else {

            if ((validar(producto, array)) === 0) {
                const objetoProducto = {
                    id: producto.id,
                    nomprod: producto.nomprod,
                    precio: producto.precio,
                    cantidad: cantidad,
                    descripcion: producto.descripcion,
                    subtotal: cantidad * producto.precio,
                    boton: false
                }

                array.push(objetoProducto)
                localStorage.setItem("carrito", JSON.stringify(array))
                setPedido(JSON.parse(localStorage.getItem("carrito")))

                /**reiniciar cantidad */

                console.log("localstorag" + JSON.parse(localStorage.getItem("carrito")))
                calculoTotal(array)




            }
            else {
                alert("Producto Existe en el Pedido")
            }
        }

    }



    const validar = (producto, array) => {
        console.log(array)
        console.log(producto)
        let cont = 0
        array.forEach(element => {
            if (element.id == producto.id) {
                cont++
            }
        })
        return cont
    }

    const remover = (index) => {
        console.log("remover")
        let array = pedido
        if (index > 0) {
            array.splice(index, 1)
        }
        else {
            array.pop()
        }
        console.log(array)
        localStorage.setItem("carrito", JSON.stringify(array))
        setPedido(JSON.parse(localStorage.getItem("carrito")))
        calculoTotal(array)



    }


    const calculoTotal = (array) => {
        let valortotal = array.reduce((total, p) => total + p.subtotal, 0)
        setTotal(valortotal)
        localStorage.setItem("total", valortotal)
    }



    /**
     * useEffect para llamado de la Api
     */

    useEffect(() => {


        peticionGetProducto()

        console.log("cambio de peddido")


    }, [pedido])


    useEffect(() => {


        peticionGetProducto()
        if (localStorage.getItem("carrito") != null) {
            setPedido(JSON.parse(localStorage.getItem("carrito")))

        }


    }, [])





    return (
        <div>
            <button className="btn btn-success mb-2 mt-4" data-toggle="modal" data-target="#myModal">Agregar Producto</button>
            <div className="modal" id="myModal">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Agregar Producto</h4>
                            <button type="button" className="close" data-dismiss="modal" >&times;</button>
                        </div>

                        <div className="modal-body">
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

                                        data.map((producto, index) =>
                                            <tr key={producto.id}>

                                                <td>{producto.id} </td>
                                                <td>{producto.nomprod}</td>
                                                <td><input type="number" id={"id" + producto.id} name={"id" + producto.id}
                                                    onClick={(e) => setCantidad(parseInt(e.target.value))}
                                                    onChange={(e) => setCantidad(parseInt(e.target.value))}
                                                    min="1"

                                                /></td>
                                                <td>{"$ "}{new Intl.NumberFormat("de-DE").format(parseInt(producto.precio))}</td>

                                                <td>{producto.descripcion}</td>

                                                <td>

                                                    <button className="btn btn-success" onClick={(e) => { agregar(producto) }}
                                                    data-dismiss="modal">Agregar</button>
                                                </td>
                                            </tr>


                                        )
                                    }




                                </tbody>
                            </table>



                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal" >Cerrar</button>
                        </div>

                    </div>
                </div>
            </div>

            {pedido.length > 0 &&
                <div >

                    <h1>Pedido</h1>

                    <table id="tablapedido" className="table table-stripped">
                        <thead>
                            <tr>
                                <td >Id</td>
                                <td>Producto</td>
                                <td>Precio</td>
                                <td>Cantidad</td>
                                <td>Descripcion</td>
                                <td>Subtotal</td>
                                <td>Acción</td>
                            </tr>
                        </thead>
                        <tbody>
                            {


                                pedido.map((item, index) =>

                                    <tr key={item.id}>
                                        <td className="anchocol">{item.id}</td>
                                        <td>{item.nomprod}</td>
                                        <td>{new Intl.NumberFormat("de-DE").format(parseInt(item.precio))}</td>
                                        <td>{item.cantidad}</td>
                                        <td>{item.descripcion}</td>
                                        <td>{new Intl.NumberFormat("de-DE").format(parseInt(item.subtotal))}</td>
                                        <td><button className="btn btn-danger" onClick={() => { remover(index) }} >
                                            Remover
                                        </button></td>

                                    </tr>


                                )



                            }


                        </tbody>
                    </table>
                    <hr className="mt-5" />
                    <h1 className="text-right">Total a Pagar {new Intl.NumberFormat("de-DE").format(parseInt(total))}</h1>


                </div>


            }


        </div>
    )
}

export default Pedido
