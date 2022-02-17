import axios from "axios";

const baseURL = "http://localhost:8080/api/v1";

async function getMeterBalance(meterNumber) {
  const meter = await axios.get(`${baseURL}/meters/getBynumber/${meterNumber}`);

  return meter.data.message;
}

async function addtMeterBalance() {
  const token = await axios.get(`${baseURL}/token/buy`);

  return token.data.body;
}

export { getMeterBalance, addtMeterBalance };
