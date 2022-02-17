import axios from "axios";

const baseURL = "http://localhost:8080/api/v1";

async function getMeterBalance(meterNumber) {
  const meter = await axios.get(`${baseURL}/meters/getByNumber/${meterNumber}`);

  return meter.data.message;
}

async function addtMeterBalance(data) {
  const token = await axios.post(`${baseURL}/token/buy`, data);

  return token.data.body;
}

export { getMeterBalance, addtMeterBalance };
