const cookieDomain = import.meta.env.VITE_COOKIE_DOMAIN;
const sessionCookieMaxAge = import.meta.env.VITE_SESSION_COOKIE_MAX_AGE;

function getSessionCookie() {
  return document.cookie
    .split(';')
    .find((el) => el.trim().startsWith('xpl_sid'));
}

function setSessionCookie(sessionToken) {
  document.cookie = `xpl_sid=${sessionToken}; max-age=${sessionCookieMaxAge}; domain=${cookieDomain}; path=/; SameSite=Strict; Secure`;
}

function expireSessionCookie() {
  document.cookie = `xpl_sid=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=${cookieDomain}; path=/; SameSite=Strict; Secure`;
}

export default {
  getSessionCookie,
  setSessionCookie,
  expireSessionCookie,
};
