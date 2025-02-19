import history from "./history";

export const tokenExpired = (exp: number) => {
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;

  if (timeLeft <= 0) {
    alert("Token expired");
    sessionStorage.removeItem("auth_token");
    history.push("/auth");
  }
};

export const isValidToken = (accessToken: string | null): boolean => {
  if (!accessToken) {
    return false;
  }

  try {
    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    console.error("Failed to decode token", error);
    return false;
  }
};

export function jwtDecode(token: string): { exp: number } {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch {
    throw new Error("Invalid token");
  }
}
