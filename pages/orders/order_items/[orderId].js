import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getAllItems } from '../../../utils/data/itemRequests';
import EditItems from '../../../components/items/EditItems';

export default function OrderItems() {
  const router = useRouter();
  const orderId = router.query;
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAllItems().then(setItems);
  }, []);

  return (
    <div>
      <h1>Edit Order Items</h1>
      <EditItems orderId={orderId} allItems={items} />
    </div>
  );
}
