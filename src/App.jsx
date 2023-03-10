import React, { useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Blog from "./components/Blog";
import Carrito from "./components/Carrito";
import Error404 from "./components/Error404";
import Inicio from "./components/Inicio";
import Tienda from "./components/Tienda";

const App = () => {
  const productos = [
    { id: 1, nombre: "Producto 1" },
    { id: 2, nombre: "Producto 2" },
    { id: 3, nombre: "Producto 3" },
    { id: 4, nombre: "Producto 4" },
  ];
  const [carrito, setcarrito] = useState([]);

  const addProductToCar = (idProductoNuevo, NombreProducto) => {
    if (carrito.length === 0) {
      setcarrito([
        { id: idProductoNuevo, nombre: NombreProducto, cantidad: 1 },
      ]);
    } else {
      // de otra forma tenemos que revisar que el carrito no tenga ya el producto agregado
      // si ya los tiene entonces queremos actualizar la cantidad
      // si no tiene el producto agregado entonces lo agregamos

      const nuevoCarrito = [...carrito]; // clonamos el arreglo para poder editarlo

      //comprobamos si el carrito ya tiene el ID del producto a agregar
      const ProductoExiste =
        nuevoCarrito.filter((productoCarrito) => {
          return productoCarrito.id === idProductoNuevo;
        }).length > 0;

      if (ProductoExiste) {
        nuevoCarrito.forEach((productoCarrito, index) => {
          if (productoCarrito.id === idProductoNuevo) {
            const cantidad = nuevoCarrito[index].cantidad;

            nuevoCarrito[index] = {
              id: idProductoNuevo,
              nombre: NombreProducto,
              cantidad: cantidad + 1,
            };
          }
        });
      } else {
        nuevoCarrito.push({
          id: idProductoNuevo,
          nombre: NombreProducto,
          cantidad: 1,
        });
      }
      setcarrito(nuevoCarrito);

    }
  };

  return (
    <Contenedor>
      <Menu>
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/tienda">Tienda</NavLink>
      </Menu>

      <main>
        <Routes>
          <Route path="*" element={<Error404 />} />
          <Route path="/" element={<Inicio />} />
          <Route path="/blog" element={<Blog />} />
          <Route
            path="/tienda"
            element={
              <Tienda productos={productos} addProductToCar={addProductToCar} />
            }
          />
        </Routes>
      </main>
      <aside>
        <Carrito carrito={carrito} />
      </aside>
    </Contenedor>
  );
};

const Contenedor = styled.div`
  max-width: 1000px;
  padding: 40px;
  width: 90%;
  display: grid;
  gap: 20px;
  grid-template-columns: 2fr 1fr;
  background: #fff;
  margin: 40px 0;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(129, 129, 129, 0.1);
`;

const Menu = styled.nav`
  width: 100%;
  text-align: center;
  background: #092c4c;
  grid-column: span 2;
  border-radius: 3px;

  a {
    color: #fff;
    display: inline-block;
    padding: 15px 20px;
  }

  a:hover {
    background: #1d85e8;
    text-decoration: none;
  }
`;
export default App;
