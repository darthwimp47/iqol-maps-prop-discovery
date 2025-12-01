import { axiosClient } from "./axiosClient";
import { PropertySchema } from "../schemas/property.schema";
import { z } from "zod";

export async function fetchProperties(params?: Record<string, any>) {
  const response = await axiosClient.get("/properties", { params });

  const PropertyArraySchema = z.array(PropertySchema);
  return PropertyArraySchema.parse(response.data);
}
