import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../utils/data/orderRequests';
import OrderCard from '../components/orders/OrderCard';

export default function OpenOrders() {
  const [orders, setOrders] = useState([]);

  const getOpenOrders = () => {
    getAllOrders().then(setOrders);
  };

  useEffect(() => {
    getOpenOrders();
  }, []);
  return (
    <div>
      <h1>Open Orders</h1>
      <section>
        {orders.map((order) => (
          <OrderCard
            key={`open${order.id}`}
            orderId={order.id}
            cashierName={order.cashier.name}
            customerObj={order.customer}
            open={order.is_open}
            type={order.type}
            paymentType={order.payment_type}
            tipAmount={order.tip_amount}
            total={order.total}
          />
        ))}
      </section>
    </div>
  );
}
