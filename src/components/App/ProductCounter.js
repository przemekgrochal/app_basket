import React, { useState, useEffect, useContext, useMemo } from 'react';
import { fetchData } from './fetchData';
import AppContext  from './AppContext';

const Basket = ({min, max, pid, price, isBlocked}) => {

  const context = useContext(AppContext);
  const [data, setData] = useState();
  const [count, setCount] = useState(parseInt(min));
  const [msg, setMsg] = useState();

  useEffect(() => {
    fetchData(
      {
        urlApi: 'http://localhost:3030/api/cart',
        methods: 'GET',
        bodyData: null,
      }
    ).then(
      res => setData(res)
    )   
  }, []);

  const checkProduct = (pidItem, quantity) => {
    fetchData(
      {
        urlApi: 'http://localhost:3030/api/product/check',
        methods: 'POST',
        headers: {
            ['Content-Type']: 'application/json',
            // ['Authorization']: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        },
        bodyData: {
            pid: pidItem,
            quantity: quantity
        },
      }
    ).then(
      res => {
        setMsg(res);
        if(res.isError === true) {
          setCount(0);
        }
      }
    ) 
  }  

  const productListIist = data?.map((item, index) =>
    <li key={index.toString()} className="row">
      {item.name}, 
      <span style={{fontWeight: '600'}}> cena</span>: 
      <span style={{color: 'green'}}> {item.price} zł</span>
    </li>
  );

  const handleIncrement = () => {
    count < max ?
        setCount(prevCount => prevCount + 1)
      :
        null
  };

  const handleDecrement = () => {
    count > min ?
        setCount(prevCount => prevCount - 1)
      :
        null
  };

  return (
    <>
      <div>
        <div className="product-counter-container">

          <button onClick={() => {
              handleDecrement();
              checkProduct(pid, count);
              context.setSum(price);
            }} disabled={isBlocked}>-</button>

          <h5>{count}</h5>

          <button onClick={() => {
              handleIncrement();
              checkProduct(pid, count);
              context.setSum(price);
          }} disabled={isBlocked}>+</button>
        </div>

        <h5>Obecnie masz {count.toFixed(2)} sztuk produktu </h5>
        <h3>{msg ? msg.message : 'Sprawdzanie liczby sztuk...'}</h3>
      </div>
    </>
  );
};

export default Basket;
