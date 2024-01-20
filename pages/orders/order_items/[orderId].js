import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getAllItems } from '../../../utils/data/itemRequests';
import EditItems from '../../../components/items/EditItems';

export default function OrderItems() {
  const router = useRouter();
  const { orderId } = router.query;
  const [items, setItems] = useState([]);

  const orderIdNum = parseInt(orderId, 10);

  useEffect(() => {
    getAllItems().then(setItems);
  }, []);

  return (
    <div key={`${orderId}--order-items`}>
      <h1>Edit Order Items</h1>
      <EditItems orderId={orderIdNum} allItems={items} />
    </div>
  );
}
