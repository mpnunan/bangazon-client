import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { addItem } from '../../utils/data/orderRequests';

export default function MenuListItem({
  onUpdate,
  itemId,
  itemName,
  orderId,
}) {
  const addToOrder = () => {
    addItem(orderId, { itemId }).then(() => {
      onUpdate();
    });
  };

  return (
    <li>{itemName}<Button onClick={addToOrder}>Add to order</Button></li>
  );
}
MenuListItem.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  itemId: PropTypes.number.isRequired,
  itemName: PropTypes.string.isRequired,
  orderId: PropTypes.number.isRequired,
};
