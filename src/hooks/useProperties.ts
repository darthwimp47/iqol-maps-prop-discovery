import { useEffect, useState } from "react";
import { fetchProperties } from "../api/propertyApi";
import { Property } from "../schemas/property.schema";

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const result = await fetchProperties();
        setProperties(result);
      } catch (err) {
        console.error("Error loading properties:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { properties, loading };
}
