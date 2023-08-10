import { useState } from "react";

export default function useLoading(initialValue = false) {
  const [loading, setLoading] = useState(initialValue);

  return { loading, setLoading };
}
