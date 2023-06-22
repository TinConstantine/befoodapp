import HttpStatusCode from "../exception/HttpStatusCode.js";
import { productRepositories } from "../repositories/index.js";
async function getAllProduct(req, res) {
  try {
    const allProduct = await productRepositories.getAllProduct();
    res
      .status(HttpStatusCode.OK)
      .json({ message: "Get product Successfully", data: allProduct });
  } catch (Exception) {
    res
      .status(HttpStatusCode.INTERNAL_SEVER_EROR)
      .json({ message: Exception.toString() });
  }
}

export default { getAllProduct };
