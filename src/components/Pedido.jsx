import React, { useState, useEffect } from 'react'
import { consumirApiProductoGet } from '../assets/js/api'

const Pedido = () => {
    /**
     * llamado de la Api Rest Producto
     */

    const resp = consumirApiProductoGet()


    /**Estados */
    const [data, setData] = useState([])
    const [cantidad, setCantidad] = useState(0)
    const [pedido, setPedido] = useState([])
    const [total, setTotal] = useState(0)
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
            if (validar(producto, array) === 0) {

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
                calculoTotal(array)
            }
            else {
                alert("Producto se Encuentra Agregado")
            }
        }

    }

    const validar = (producto, array) => {

        let cont = 0
        array.forEach(element => {

            if (producto.id === element.id) {
                cont++
            }

        })

        return cont
    }


    const calculoTotal = (array) => {

        let totalpagar = 0
        array.forEach(element => {
            totalpagar = totalpagar + element.subtotal
        })
        setTotal(totalpagar)
        localStorage.setItem("total", totalpagar)

    }

    const remover = (index) => {

        let array = pedido
        if (index > 0) {
            array.splice(index, 1)
        }
        else {
            array.pop()
        }

        localStorage.setItem("carrito", JSON.stringify(array))
        setPedido(JSON.parse(localStorage.getItem("carrito")))
        calculoTotal(array)

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

        if (localStorage.getItem("total") != null) {
            setTotal(localStorage.getItem("total"))
        }


    }, [])

    return (
        <div>
            <div class="jumbotron">
                <h1 class="text-center mt-5">Compra de Productos</h1>
                <label>Codigo Pedido</label>
                <input type="text" className="form-control" />
                <label>Nombres</label>
                <input type="text" className="form-control" />
                <label>Apellidos</label>
                <input type="date" className="form-control" />

                <button type="button" className="btn btn-primary mt-3" data-toggle="modal" data-target="#modalpedido">
                    Agregar Producto
                </button>
            </div>
            <div class="modal" id="modalpedido">
                <div class="modal-dialog modal-xl modal-dialog-centered">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h4 class="modal-title">Productos</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div class="modal-body">

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
                                                <td><button className="btn btn-success" data-dismiss="modal"
                                                    onClick={(e) => { agregar(producto) }}>
                                                    Agregar
                                                </button>
                                                </td>
                                            </tr>


                                        )
                                    }



                                </tbody>
                            </table>





                        </div>
                        <div class="modal-footer">
                            <button type="button" class="close" data-dismiss="modal">Cerrar</button>
                        </div>

                    </div>
                </div>
            </div>



            {pedido.length > 0 ?
                <div>

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
                                <th>
                                    Acción
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                pedido.map((item, index) =>

                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.nomprod}</td>
                                        <td>{"$ "}{new Intl.NumberFormat("de-DE").format(parseInt(item.precio))}</td>
                                        <td>{item.cantidad}</td>
                                        <td>{item.descripcion}</td>
                                        <td>{"$ "}{new Intl.NumberFormat("de-DE").format(parseInt(item.subtotal))}</td>
                                        <td><button className="btn btn-danger" onClick={(e) => { remover(index) }}>Remover(-)
                                        </button></td>
                                    </tr>
                                )
                            }


                        </tbody>

                    </table>
                    <hr className="mt-5" />
                    <h1 className="text-right">Total a Pagar {new Intl.NumberFormat("de-DE").format(parseInt(total))}</h1>
                </div>
                :
                <h1>No tiene Pedidos Disponibles</h1>
            }
        </div>
    )
}

export default Pedido
