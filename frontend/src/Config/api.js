export const API_BASE_URL = "http://localhost:8080";

export const api = async (endpoint, options = {}) => {
  const jwt = localStorage.getItem("jwt");

  const defaultHeaders = {
    Authorization: `Bearer ${jwt}`,
    "Content-Type": "application/json",
  };

  const headers = { ...defaultHeaders, ...options.headers };

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};
