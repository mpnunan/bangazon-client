import React, { useEffect, useState } from 'react';
import { getCertainOrders } from '../utils/data/orderRequests';
import OrderCard from '../components/orders/OrderCard';

export default function ClosedOrders() {
  const [orders, setOrders] = useState([]);

  const getClosedOrders = () => {
    getCertainOrders('False').then(setOrders);
  };

  useEffect(() => {
    getClosedOrders();
  }, []);
  return (
    <div id="closedOrderSection">
      <h1 id="closedOrderHeader">Closed Orders</h1>
      <section>
        {orders?.map((order) => (
          <div key={`${order.id}--closed-subSection`}>
            <OrderCard
              key={`closed-${order.id}`}
              orderId={order.id}
              cashierFirstName={order.cashier.first_name}
              cashierLastName={order.cashier.last_name}
              customerObj={order.customer}
              open={order.is_open}
              type={order.type}
              paymentType={order.payment_type}
              tipAmount={order.tip_amount}
              total={order.total}
              onUpdate={getClosedOrders}
            />
          </div>
        ))}
      </section>
    </div>
  );
}
