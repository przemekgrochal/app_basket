import React, { useState, useEffect, useContext, useMemo } from 'react';
import { fetchData } from './fetchData';
import AppContext  from './AppContext';

const ProductList = () => {
  const context = useContext(AppContext);
  const [data, setData] = useState();
  
  useEffect(() => {
    fetchData(
      {
        urlApi: 'http://localhost:3030/api/cart',
        methods: 'GET',
      }
    ).then(
      res => setData(res)
    )   
  }, []);

  const productListIist = data?.map((item, index) =>
    <li key={index.toString()} className="row">
      {item.name}, 
      <span style={{fontWeight: '600'}}> cena</span>: 
      <span style={{color: 'green'}}> {item.price} zł </span>
      <button style={{cursor: 'pointer'}} onClick={()=>context.setProduct(item)}> DODAJ DO KOSZYKA</button>
    </li>
  );

  return (
    <>
      <ul>
        {productListIist}
      </ul>
    </>
  );
};

export default ProductList;
