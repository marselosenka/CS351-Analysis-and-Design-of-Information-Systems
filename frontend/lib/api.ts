export function getApiBaseUrl() {
  const envBase =
    process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
  if (envBase) {
    return envBase.replace(/\/$/, "");
  }

  return typeof window === "undefined"
    ? "http://backend:5000"
    : "http://localhost:5000";
}

export async function fetchJson<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, init);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}
