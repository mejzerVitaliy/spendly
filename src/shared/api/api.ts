import { env } from "@/env";
import axios from "axios";

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL
})

export {api}