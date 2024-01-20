import bangarang from '../axiosConfig';

const getAllOrders = async () => {
  const orders = await bangarang.get('/orders');
  return Object.values(orders.data);
};

const getCertainOrders = async (yayornay) => {
  const certainOrders = await bangarang.get(`/orders?is_open=${yayornay}`);
  return Object.values(certainOrders.data);
};

const getSingleOrder = async (id) => {
  const order = await bangarang.get(`/orders/${id}`);
  return order.data;
};

const createOrder = async (payload) => {
  const joyDivsion = await bangarang.post('/orders', payload);
  return joyDivsion.data;
};

const updateOrder = async (id, payload) => {
  const updatedOrder = await bangarang.put(`/orders/${id}`, payload);
  return updatedOrder.data;
};

const deleteOrder = async (id) => {
  const deletedOrder = await bangarang.delete(`/orders/${id}`);
  return deletedOrder.data;
};

const addItem = async (orderId, payload) => {
  const addition = await bangarang.post(`/orders/${orderId}/add_item`, payload);
  return addition.data;
};

const removeItem = async (orderId, payload) => {
  const subtraction = await bangarang.put(`/orders/${orderId}/remove_item`, payload);
  return subtraction.data;
};

const closeOrder = async (orderId) => {
  const order = await bangarang.put(`/orders/${orderId}/close`);
  return order.data;
};

const openOrder = async (orderId) => {
  const order = await bangarang.put(`/orders/${orderId}/reopen`);
  return order.data;
};

const totalOrder = async (orderId, payload) => {
  const total = await bangarang.put(`/orders/${orderId}/total`, payload);
  return total.data;
};

export {
  getAllOrders,
  getCertainOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  addItem,
  removeItem,
  closeOrder,
  openOrder,
  totalOrder,
};
