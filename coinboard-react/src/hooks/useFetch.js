import { useEffect, useState } from "react";
import { getJson } from "../lib/api.js";

// Handles loading, error, data, and retry for a single API path.
export function useFetch(path) {
  const [state, setState] = useState({
    status: path ? "loading" : "idle",
    data: null,
    error: null,
  });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!path) return;
    let ignore = false;

    setState((s) => ({ ...s, status: "loading", error: null }));
    getJson(path)
      .then((data) => {
        if (!ignore) setState({ status: "success", data, error: null });
      })
      .catch((error) => {
        if (!ignore) setState({ status: "error", data: null, error });
      });

    return () => {
      ignore = true;
    };
  }, [path, attempt]);

  return {
    data: state.data,
    error: state.error,
    loading: state.status === "loading",
    retry: () => setAttempt((n) => n + 1),
  };
}
