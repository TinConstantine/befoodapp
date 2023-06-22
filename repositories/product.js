import { product } from "../model/index.js";
async function getAllProduct() {
  const products = await product.find({});
  return products;
}
export default { getAllProduct };
