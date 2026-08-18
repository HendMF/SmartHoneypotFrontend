const ACCESS_TOKEN_KEY = "smart_honeypot_access_token";
const USER_KEY = "smart_honeypot_user";
const LAST_ACTIVITY_KEY = "smart_honeypot_last_activity";

export function setAuthData({ accessToken, user }) {
  if (accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }

  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  localStorage.setItem(
    LAST_ACTIVITY_KEY,
    String(Date.now())
  );
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getCurrentUser() {
  const storedUser = localStorage.getItem(USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
}

export function getLastActivity() {
  const value = localStorage.getItem(LAST_ACTIVITY_KEY);

  if (!value) {
    return null;
  }

  const timestamp = Number(value);

  if (Number.isNaN(timestamp)) {
    return null;
  }

  return timestamp;
}

export function updateLastActivity() {
  localStorage.setItem(
    LAST_ACTIVITY_KEY,
    String(Date.now())
  );
}

export function clearAuthData() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(LAST_ACTIVITY_KEY);
}
