import axios from "axios";

export const api = axios.create({
  baseURL: process.env.WORKFLOW_BASE_URL,
  headers: {
    "API-Key": process.env.WORKFLOW_API_KEY,
  },
});
