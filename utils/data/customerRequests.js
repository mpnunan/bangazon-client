import bangarang from '../axiosConfig';

const getAllCustomers = async () => {
  const customers = await bangarang.get('/customers');
  return Object.values(customers.data);
};

const getSingleCustomer = async (id) => {
  const customer = await bangarang.get(`/customers/${id}`);
  return customer.data;
};

const createCustomer = async (payload) => {
  const newCustomer = await bangarang.post('/customers', payload);
  return newCustomer.data;
};

const updateCustomer = async (id, payload) => {
  const updatedCustomer = await bangarang.put(`/customers/${id}`, payload);
  return updatedCustomer.data;
};

const deleteCustomer = async (id) => {
  const deletedCustomer = await bangarang.delete(`/customers/${id}`);
  return deletedCustomer.data;
};

export {
  getAllCustomers,
  getSingleCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
