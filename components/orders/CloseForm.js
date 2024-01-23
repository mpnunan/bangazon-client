import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { closeOrder } from '../../utils/data/orderRequests';

const initialCloseState = {
  type: '',
  paymentType: '',
  tipAmount: '0.00',
  total: '0.00',
};

export default function CloseForm({
  orderId,
  total,
  paymentType,
  tipAmount,
  type,
  subTotal,
}) {
  const [closing, setClosing] = useState(initialCloseState);
  const router = useRouter();

  useEffect(() => {
    setClosing({
      type,
      paymentType,
      tipAmount,
      total: parseFloat(subTotal) + parseFloat(tipAmount),
    });
  }, [type, paymentType, tipAmount, total, subTotal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClosing((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeOrder(orderId, closing).then(() => router.push(`/orders/${orderId}`));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Select
        aria-label="Order Type"
        name="type"
        type="text"
        required
        value={closing.type}
        onChange={handleChange}
      >
        <option key="type_option" value="">Order Type:</option>
        <option key="dinein" value="dinein">Dine-In</option>
        <option key="pickup" value="pickup">Pickup</option>
        <option key="delivery" value="delivery">Delivery</option>
      </Form.Select>
      <Form.Select
        aria-label="Payment Type"
        name="paymentType"
        type="text"
        required
        value={closing.paymentType}
        onChange={handleChange}
      >
        <option key="payment_option" value="">Payment Type:</option>
        <option key="cash" value="cash">Cash</option>
        <option key="card" value="card">Card</option>
      </Form.Select>
      <Form.Group className="mb-3">
        <Form.Label>Tip Amount</Form.Label>
        <Form.Control
          name="tipAmount"
          type="number"
          value={closing.tipAmount}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Text style={{ color: 'white' }}>Total: {closing.total}</Form.Text>
      <Button key="close_button" variant="primary" type="submit">
        Submit
      </Button>
    </Form>

  );
}

CloseForm.propTypes = {
  orderId: PropTypes.string.isRequired,
  total: PropTypes.string,
  paymentType: PropTypes.string,
  tipAmount: PropTypes.string,
  type: PropTypes.string,
  subTotal: PropTypes.string,
};

CloseForm.defaultProps = {
  total: '0.00',
  paymentType: '',
  tipAmount: '0.00',
  type: '',
  subTotal: '0.00',
};
