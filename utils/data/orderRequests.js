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

export {
  getAllOrders,
  getCertainOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
