import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getSingleOrder } from '../../utils/data/orderRequests';
import MenuListItem from './MenuListItem';
import OrderListItem from './OrderListItem';

export default function EditItems({ orderId, allItems }) {
  const [items, setItems] = useState([]);

  const getCurrentItems = () => {
    getSingleOrder(orderId).then((order) => {
      setItems(order.items);
    });
  };

  useEffect(() => {
    getCurrentItems();
  }, []);

  return (
    <div>
      <section>
        <ul>
          {allItems?.map((item) => (
            <MenuListItem key={`${item.id}-menu`} itemName={item.name} itemId={item.id} orderId={orderId} onUpdate={getCurrentItems} />
          ))}
        </ul>
      </section>
      <section>
        <ul>
          {items?.map((item) => (
            <OrderListItem key={`${item.id}-order`} itemName={item.name} itemId={item.id} orderId={orderId} onUpdate={getCurrentItems} />
          ))}
        </ul>
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
