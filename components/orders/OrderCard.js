import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { deleteOrder, openOrder } from '../../utils/data/orderRequests';

export default function OrderCard({
  orderId,
  cashierFirstName,
  cashierLastName,
  customerObj,
  open,
  type,
  paymentType,
  tipAmount,
  total,
  onUpdate,
}) {
  const deleteThisOrder = () => {
    if (window.confirm(`Close Order ${orderId}?`)) {
      deleteOrder(orderId).then(() => {
        onUpdate();
      });
    }
  };

  const openThisOrder = () => {
    if (window.confirm(`Re-open Order ${orderId}?`)) {
      openOrder(orderId).then(() => {
        onUpdate();
      });
    }
  };

  return (
    <Card key={!open ? `${orderId}--card-closed` : `${orderId}--card-open`}>
      <Card.Header>{customerObj.name}</Card.Header>
      <Card.Body>
        <Card.Text>
          Order Type: {type}
          Payment Type: {paymentType}
          Tip: {tipAmount}
          Total: {total}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        {cashierFirstName} {cashierLastName}
        {!open ? 'Order Closed' : null}
        <Link passHref href={`/orders/${orderId}`}>
          <Button>Order Details</Button>
        </Link>
        <Button onClick={deleteThisOrder}>Delete Order</Button>
        {
          !open
            ? (
              <>
                <Button onClick={openThisOrder}>Re-Open Order</Button>
              </>
            )
            : <Link passHref href={`/orders/close/${orderId}`}><Button>Close Order</Button></Link>
        }
      </Card.Footer>
    </Card>
  );
}

OrderCard.propTypes = {
  orderId: PropTypes.number.isRequired,
  cashierFirstName: PropTypes.string.isRequired,
  cashierLastName: PropTypes.string.isRequired,
  customerObj: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  paymentType: PropTypes.string.isRequired,
  tipAmount: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
