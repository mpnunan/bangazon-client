import bangarang from '../axiosConfig';

const getAllItems = async () => {
  const items = await bangarang.get('/items');
  return Object.values(items.data);
};

const getSingleItem = async (id) => {
  const item = await bangarang.get(`/items/${id}`);
  return item.data;
};

export {
  getAllItems,
  getSingleItem,
};
