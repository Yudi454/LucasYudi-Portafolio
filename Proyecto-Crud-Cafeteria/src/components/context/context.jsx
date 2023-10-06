    import React, { createContext, useEffect, useState } from 'react';

    export const ProductosContext = createContext();

    export const ProductosProvider = ({ children }) => {

        const [productos, setProducts] = useState([])
        const [usuarios, setUsuarios] = useState([])
        const URLProductos=import.meta.env.VITE_API_PRODUCTOS
        const URLUsuarios = import.meta.env.VITE_API_USUARIOS
        

        useEffect(() =>{
            getApi()
            
        },[])

        const getApi = async () =>{
            try {
                const resProductos = await fetch(URLProductos);
                const resUsuarios = await fetch(URLUsuarios);
                const ProductoApi = await resProductos.json();
                const UsuariosApi = await resUsuarios.json();
            setProducts(ProductoApi)
            setUsuarios(UsuariosApi)
            } catch (error) {
                console.log(error)
        }
        }
    
        const pasarDatos = {
            productos,
            usuarios,
            getApi,
        }

        return (
        <ProductosContext.Provider value={pasarDatos}>
            {children}
        </ProductosContext.Provider>
        );
    };