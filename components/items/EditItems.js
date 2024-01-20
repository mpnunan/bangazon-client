import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { addItem, getSingleOrder, removeItem } from '../../utils/data/orderRequests';

export default function EditItems({ orderId, allItems }) {
  const [items, setItems] = useState([]);

  const getCurrentItems = () => {
    getSingleOrder(orderId).then((order) => {
      setItems(order.items);
    });
  };

  const addToOrder = (id, payload) => {
    addItem(id, payload).then(() => {
      getCurrentItems();
    });
  };

  const removeFromOrder = (id, payload) => {
    removeItem(id, payload).then(() => {
      getCurrentItems();
    });
  };

  useEffect(() => {
    getCurrentItems();
  }, []);

  return (
    <div>
      <section>
        <ul>
          {allItems.map((item) => (
            <li key={item.id}>{item.name} <Button onClick={addToOrder(orderId, { order: orderId, item: item.id })}>Add Item</Button></li>
          ))}
        </ul>
      </section>
      <section>
        <ul>
          {items.map((item) => (
            <li>{item.name} <Button onClick={removeFromOrder(orderId, { order: orderId, item: item.id })}>Remove Item</Button></li>
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
