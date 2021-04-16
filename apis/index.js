import axios from "axios";
import { NIP_API, EXAMPLE_API_URL } from "../constants";

export const searchNip = (nip) => {
  const currentDate = new Date().toISOString().slice(0, 10);
  const url = `${NIP_API}/api/search/nip/${nip}?date=${currentDate}`;
  return axios.get(url);
};

export const sendContractorData = (data) =>
  axios.post(EXAMPLE_API_URL, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
