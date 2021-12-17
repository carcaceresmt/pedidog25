import React from 'react'
import { consumirApitProductoPost } from '../../assets/js/api'
import { useForm } from "react-hook-form"
import * as Yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'


const Guardar = () => {

    const validacion = Yup.object().shape({

        id: Yup.string().required("Requiere un Id"),
        nomprod: Yup.string().required("Requiere Nombre del Producto"),
        precio: Yup.string().required("Requiere Precio"),
        categoria: Yup.string().required("Requiere Categoria"),
        stock: Yup.string().required("Requiere Stock"),
        descripcion: Yup.string().required("Requiere Descripción")

    })

    const formValidar = { resolver: yupResolver(validacion) }
    const { register, handleSubmit, reset, formState } = useForm(formValidar)
    const { errors } = formState

    const guardarproducto = (producto) => {
        const resp = consumirApitProductoPost(producto)
        resp.then(data => {
            if (data.status === 201) {
                alert("Guardo con Exito!!")
                reset()
            }
            else {
                alert("Problemas al Insertar")
            }
        })
        return false
    }

    return (
        <div className="container jumbotron mt-1">
            <form onSubmit={handleSubmit(guardarproducto)}>
                <h1 className='mt-3 mb-3 text-center'>Guardar Producto</h1>
                <label>Id</label>
                <input name="id" type="text"
                    {...register("id")}
                    className={`form-control ${errors.id ? 'is-invalid' : ''}`}
                />
                <div className='invalid-feedback'>{errors.id?.message}</div>


                <label>Producto</label>
                <input name="nomprod" type="text"
                    {...register("nomprod")}
                    className={`form-control ${errors.nomprod ? 'is-invalid' : ''}`} />

                <div className='invalid-feedback'>{errors.nomprod?.message}</div>

                <label>Precio</label>
                <input name="precio" type="number"
                    {...register("precio")}
                    className={`form-control ${errors.precio ? 'is-invalid' : ''}`}
                />
                <div className='invalid-feedback'>{errors.precio?.message}</div>

                <label>Categoria</label>
                <select name="categoria"
                    {...register("categoria")}
                    className={`form-control ${errors.categoria ? 'is-invalid' : ''}`}
                >
                    <option value=""></option>
                    <option value="Producto del Hogar">Producto del Hogar</option>
                    <option value="Tecnologia">Tecnologia</option>
                    <option value="Comida">Comida</option>
                    <option value="Bebida">Bebida</option>
                </select>
                <div className='invalid-feedback'>{errors.categoria?.message}</div>

                <label>Descripción</label>
                <input type="text" name="descripcion" {...register("descripcion")}
                    className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`}
                />
                <div className='invalid-feedback'>{errors.descripcion?.message}</div>

                <label>Stock</label>
                <input type="number" name="stock" {...register("stock")}
                    className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`}
                />
                <div className='invalid-feedback'>{errors.stock?.message}</div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary mt-3 mr-1">Guardar</button>
                    <button className="btn btn-warning mt-3 " onClick={(e) => { reset() }}>Limpiar</button>
                </div>
            </form>
        </div>
    )
}

export default Guardar
