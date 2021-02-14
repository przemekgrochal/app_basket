import React, { useState, useEffect, useContext, useMemo } from 'react';
import ProductCounter from './ProductCounter';
import AppContext  from './AppContext';

const Basket = () => {
  const context = useContext(AppContext);

  const listProduct = context.product.map((item,index) =>
    <li key={index.toString()} className="row">
      {item.name}, 
      <span style={{fontWeight: '600'}}> cena</span>: 
      <span style={{color: 'green'}}> {item.price} zł </span>
      <ProductCounter
          min={item.min}
          max={item.max}
          pid={item.pid}
          price={item.price}
          isBlocked={item.isBlocked ? item.isBlocked : false}
      />
    </li>
  );

  return (
    <>
      <div className="basket">
        {listProduct}
      </div>
    </>
  );
};

export default Basket;
