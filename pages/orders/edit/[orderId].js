import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NewOrder from '../../../components/orders/JoyDivision';
import { getSingleOrder } from '../../../utils/data/orderRequests';

export default function EditOrder() {
  const [order, setOrder] = useState({});
  const router = useRouter();
  const { orderId } = router.query;

  useEffect(() => {
    getSingleOrder(orderId).then(setOrder);
  }, [orderId]);

  return (
    <div key={`${orderId}--edit-order-page`}>
      <h1>New Order</h1>
      <NewOrder orderObj={order} />
    </div>
  );
}
