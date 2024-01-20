import React, { useEffect, useState } from 'react';
import { getCertainOrders } from '../utils/data/orderRequests';

export default function Finances() {
  const [money, setMoney] = useState(0.00);
  const [orders, setOrders] = useState([]);

  const allClosedOrders = () => {
    getCertainOrders('False').then(setOrders);
  };

  const totalItUp = (arr) => {
    let amount = money;
    arr.forEach((element) => {
      setMoney((amount += parseFloat(element.total)));
    });
  };

  useEffect(() => {
    allClosedOrders();
  }, []);

  useEffect(() => {
    totalItUp(orders);
  }, [orders]);

  return (
    <h1>Congrats on all the ${money.toFixed(2)}</h1>
  );
}
