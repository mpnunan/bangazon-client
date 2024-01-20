import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createOrder, updateOrder } from '../../utils/data/orderRequests';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  id: '',
  cashier: 0,
  customer: 0,
  isOpen: '',
  openTime: '',
  closeTime: '',
  type: '',
  paymentType: '',
  tipAmount: 0.00,
  total: 0.00,
};

const now = new Date();
const rightNow = now.toISOString().substring(0, 10);

export default function NewOrder({ orderObj, customerId }) {
  const [currentOrder, setCurrentOrder] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (orderObj.id) {
      setCurrentOrder(currentOrder);
    }
  }, [orderObj.id, currentOrder]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderObj.id) {
      updateOrder(orderObj.id, currentOrder).then(() => router.push('/'));
    } else {
      createOrder({
        ...currentOrder,
        openTime: rightNow,
        customer: customerId,
        cashier: user.uid,
      }).then(() => router.push('/orders'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Select
        aria-label="Order Type"
        name="type"
        required
        value={currentOrder.type}
        onChange={handleChange}
      >
        <option value="">Order Type:</option>
        <option key="dinein" value="dinein">Dine-In</option>
        <option key="pickup" value="pickup">Pickup</option>
        <option key="delivery" value="delivery">Delivery</option>
      </Form.Select>
      <Form.Select
        aria-label="Payment Type"
        name="paymentType"
        required
        value={currentOrder.paymentType}
        onChange={handleChange}
      >
        <option value="">Payment Type:</option>
        <option key="cash" value="cash">Cash</option>
        <option key="card" value="card">Card</option>
      </Form.Select>
      <Form.Group className="mb-3">
        <Form.Label>Tip Amount</Form.Label>
        <Form.Control
          name="tipAmount"
          type="number"
          value={currentOrder.tipAmount}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

  );
}

NewOrder.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.string,
    cashier: PropTypes.number,
    customer: PropTypes.number,
    isOpen: PropTypes.bool,
    openTime: PropTypes.string,
    closeTime: PropTypes.string,
    type: PropTypes.string,
    paymentType: PropTypes.string,
    tipAmount: PropTypes.number,
    total: PropTypes.number,
  }),
  customerId: PropTypes.string,
};

NewOrder.defaultProps = {
  orderObj: PropTypes.shape({
    id: '',
    cashier: 0,
    customer: 0,
    isOpen: '',
    openTime: '',
    closeTime: '',
    type: '',
    paymentType: '',
    tipAmount: 0.00,
    total: 0.00,
  }),
  customerId: '',
};
