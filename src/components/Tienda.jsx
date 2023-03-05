import React from "react";
import Productos from "./Productos";

const Tienda = ({ productos, addProductToCar }) => {
  return (
    <div>
      <h1>Tienda</h1>
      <Productos productos={productos} addProductToCar={addProductToCar} />
    </div>
  );
};

export default Tienda;
