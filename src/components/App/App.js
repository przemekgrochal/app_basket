import React, { useState } from 'react';
import './App.css';
import ProductList from './ProductList';
import Basket from './Basket';
import AppContext from './AppContext';

const App = () => {
  const [data, setData] = useState([]);
  const [sum, setSum] = useState([0]);

  const suma = sum?.reduce(function(prev, curr) {
    return prev + curr;
  });

  return (
    <>
      <AppContext.Provider value={{
        product: data,
        sum: sum,
        setSum: (item) => {
          setSum([...sum, parseFloat(item)]);
        },
        setProduct: (item) => {
          setData([...data, item]);
          setSum([...sum, parseFloat(item.price)]);
        }}}>
        <h3>Lista produktów</h3>
        <ProductList/>
        <h3>Koszyk</h3>
        <Basket/>
        <h3>SUMA</h3>
        {suma} zł
    </AppContext.Provider>
    </>
  );
};

export {
    App
};
