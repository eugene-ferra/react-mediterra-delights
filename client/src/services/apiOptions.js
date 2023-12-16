import axios from "axios";

export async function getProductOptions() {
  try {
    const response = await axios.get("/api/products/options");
    return response.data.data;
  } catch (err) {
    throw { status: err.response.status };
  }
}
