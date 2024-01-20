import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { closeOrder, getCertainOrders } from '../utils/data/orderRequests';
import OrderCard from '../components/orders/OrderCard';

export default function OpenOrders() {
  const [orders, setOrders] = useState([]);

  const getOpenOrders = () => {
    getCertainOrders('True').then(setOrders);
  };

  const closeThisOrder = (id) => {
    closeOrder(id).then(() => {
      getOpenOrders();
    });
  };

  useEffect(() => {
    getOpenOrders();
  }, []);
  return (
    <div>
      <h1>Open Orders</h1>
      <section>
        {orders?.map((order) => (
          <div>
            <OrderCard
              key={`open${order.id}`}
              orderId={order.id}
              cashierFirstName={order.cashier.first_name}
              cashierLastName={order.cashier.last_name}
              customerObj={order.customer}
              open={order.is_open}
              type={order.type}
              paymentType={order.payment_type}
              tipAmount={order.tip_amount}
              total={order.total}
            />
            <Button onClick={closeThisOrder(order.id)}>Close Out</Button>
          </div>
        ))}
      </section>
    </div>
  );
}
