import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleOrder } from '../../../utils/data/orderRequests';
import CloseForm from '../../../components/orders/CloseForm';

export default function CloseOut() {
  const [order, setOrder] = useState({});
  const router = useRouter();
  const { orderId } = router.query;

  useEffect(() => {
    getSingleOrder(orderId).then(setOrder);
  }, [orderId]);

  return (
    <div>
      <CloseForm orderId={orderId} paymentType={order.payment_type} type={order.type} tipAmount={order.tip_amount} subTotal={order.total} />
    </div>
  );
}
