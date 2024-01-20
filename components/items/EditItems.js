import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getSingleOrder, totalOrder } from '../../utils/data/orderRequests';
import MenuListItem from './MenuListItem';
import OrderListItem from './OrderListItem';

let amount = 0.00;
export default function EditItems({ orderId, allItems }) {
  const [items, setItems] = useState([]);
  const router = useRouter();

  const getCurrentItems = () => {
    getSingleOrder(orderId).then((order) => {
      setItems(order.items);
    });
  };

  useEffect(() => {
    getCurrentItems();
  }, []);

  const orderTotal = () => {
    items.forEach((item) => {
      amount += (parseFloat(item.price));
    });
    totalOrder(orderId, { total: amount })
      .then(() => {
        router.push(`/orders/${orderId}`);
      });
  };

  return (
    <div>
      <section>
        <ul>
          {allItems?.map((item) => (
            <MenuListItem key={`${item.id}--${items.indexOf(item)}-menu`} itemName={item.name} itemId={item.id} orderId={orderId} onUpdate={getCurrentItems} />
          ))}
        </ul>
      </section>
      <section>
        <ul>
          {items?.map((item) => (
            <OrderListItem key={`${item.id}--${items.indexOf(item)}-order`} itemName={item.name} itemId={item.id} orderId={orderId} onUpdate={getCurrentItems} />
          ))}
        </ul>
      </section>
      <section>
        <Button onClick={orderTotal}>Save Items</Button>
      </section>
    </div>
  );
}

EditItems.propTypes = {
  orderId: PropTypes.number.isRequired,
  allItems: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.string,
  })).isRequired,
};
