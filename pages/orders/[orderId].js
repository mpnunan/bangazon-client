import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleOrder } from '../../utils/data/orderRequests';

export default function OrderDetails() {
  const [orderObj, setOrderObj] = useState({});
  const router = useRouter();
  const { orderId } = router.query;

  const getOrderDetails = (id) => {
    getSingleOrder(id).then(setOrderObj);
  };

  useEffect(() => {
    getOrderDetails(orderId);
  }, [orderId]);

  return (
    <div>
      <h1>{`Order ${orderObj.id}`}</h1>
      <p>{`Opened ${orderObj.open_time}`}</p>
      {!orderObj.is_open ? `Closed ${orderObj.close_time}` : null}
      <section>
        <h2>Order Details</h2>
        <div>
          <p>{`Customer Name: ${orderObj.customer?.name}`}</p>
          <p>{`Customer Phone Number: ${orderObj.customer?.phone_number}`}</p>
          <p>{`Customer Email: ${orderObj.customer?.email}`}</p>
        </div>
        <div>
          <h3>Information</h3>
          <ul>
            <li>{`Order Type: ${orderObj.type}`}</li>
            <li>{`Payment Type: ${orderObj.payment_type}`}</li>
            <li>{`Tip Amount: ${orderObj.tip_amount}`}</li>
            <li><bold>{`Order Total: ${orderObj.total}`}</bold></li>
          </ul>
        </div>
        <div>
          <h3>Items</h3>
          <ul>
            {orderObj.items?.map((item) => (
              <li>{item.name} : {item.price}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
