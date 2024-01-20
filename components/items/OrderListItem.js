import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { removeItem } from '../../utils/data/orderRequests';

export default function OrderListItem({
  onUpdate,
  itemId,
  itemName,
  orderId,
}) {
  const removeFromOrder = () => {
    removeItem(orderId, { itemId }).then(() => {
      onUpdate();
    });
  };
  return (
    <li>{itemName}<Button onClick={removeFromOrder}>Remove from order</Button></li>
  );
}

OrderListItem.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  itemId: PropTypes.number.isRequired,
  itemName: PropTypes.string.isRequired,
  orderId: PropTypes.number.isRequired,
};
