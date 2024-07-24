const BASE_URL = "https://0kadddxyh3.execute-api.us-east-1.amazonaws.com";

export async function apiClient<T>(
  endpoint: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, init);
  const data = await response.json();

  return data;
}

export async function getToken() {
  const { token } = await apiClient<{ token: string }>("/auth/token");
  return token;
}
