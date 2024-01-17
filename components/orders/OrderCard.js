import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

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
}) {
  return (
    <Card>
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
          Order Details
        </Link>
      </Card.Footer>
    </Card>
  );
}

OrderCard.propTypes = {
  orderId: PropTypes.string.isRequired,
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
};
