const cookieDomain = import.meta.env.VITE_COOKIE_DOMAIN;

function getSessionCookie() {
  return document.cookie
    .split(';')
    .find((el) => el.trim().startsWith('xpl_sid'));
}

function expireSessionCookie() {
  document.cookie = `xpl_sid=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=${cookieDomain}; path=/; SameSite=Strict; Secure`;
}

export default {
  getSessionCookie,
  expireSessionCookie,
};
