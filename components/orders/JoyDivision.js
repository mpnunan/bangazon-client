import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createOrder, updateOrder } from '../../utils/data/orderRequests';
import { useAuth } from '../../utils/context/authContext';
import { createCustomer, updateCustomer } from '../../utils/data/customerRequests';

const initialState = {
  cashierId: '',
  customerId: 0,
  type: '',
  paymentType: '',
  tipAmount: '0.00',
  total: '0.00',
};

const initialCustomerState = {
  name: '',
  email: '',
  phoneNumber: '',
};

export default function NewOrder({ orderObj }) {
  const [currentOrder, setCurrentOrder] = useState(initialState);
  const [customer, setCustomer] = useState(initialCustomerState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (orderObj.id) {
      setCurrentOrder({
        cashierId: user.uid,
        customerId: orderObj.customer.id,
        type: orderObj.type,
        paymentType: orderObj.payment_type,
        tipAmount: orderObj.tip_amount,
        total: orderObj.total,
      });
      setCustomer({
        id: orderObj.customer.id,
        name: orderObj.customer.name,
        email: orderObj.customer.email,
        phoneNumber: orderObj.customer.phone_number,
      });
    }
  }, [user.uid, orderObj.customer, orderObj.id, orderObj.payment_type, orderObj.tip_amount, orderObj.total, orderObj.type]);

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setCurrentOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderObj.id) {
      updateCustomer(customer.id, customer).then(() => {
        updateOrder(orderObj.id, currentOrder).then(() => router.push(`/orders/${orderObj.id}`));
      });
    } else {
      createCustomer(customer).then((customerObj) => {
        createOrder({
          ...currentOrder,
          customerId: customerObj.id,
          cashierId: user.uid,
        }).then((orderData) => router.push(`/orders/order_items/${orderData.id}`));
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Customer Name</Form.Label>
        <Form.Control
          name="name"
          type="text"
          value={customer.name}
          onChange={handleCustomerChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Customer Email</Form.Label>
        <Form.Control
          name="email"
          type="email"
          value={customer.email}
          onChange={handleCustomerChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Customer Phone Number</Form.Label>
        <Form.Control
          name="phoneNumber"
          type="number"
          value={customer.phoneNumber}
          onChange={handleCustomerChange}
          required
        />
      </Form.Group>
      <Form.Select
        aria-label="Order Type"
        name="type"
        required
        value={currentOrder.type}
        onChange={handleOrderChange}
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
        onChange={handleOrderChange}
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
          onChange={handleOrderChange}
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
    id: PropTypes.number,
    customer: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
      phone_number: PropTypes.number,
    }),
    type: PropTypes.string,
    payment_type: PropTypes.string,
    tip_amount: PropTypes.string,
    total: PropTypes.string,
  }),
};

NewOrder.defaultProps = {
  orderObj: PropTypes.shape({
    id: 0,
    customer: {
      id: 0,
      name: '',
      email: '',
      phone_number: 0,
    },
    type: '',
    payment_type: '',
    tip_amount: '',
    total: '',
  }),
};
