import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';

export default function OrderCard({
  orderId,
  cashierName,
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
          {type}
          Payment Type: {paymentType}
          Tip: {tipAmount}
          Total: {total}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        {cashierName}
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
  cashierName: PropTypes.string.isRequired,
  customerObj: PropTypes.shape({
    name: propTypes.string.isRequired,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  paymentType: PropTypes.string.isRequired,
  tipAmount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};
