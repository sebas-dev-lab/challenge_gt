export function getSession() {
  const _sn = sessionStorage.getItem("_sn");
  return _sn ? true : false;
}

export function setSession(tk, log, nav) {
  sessionStorage.setItem("_sn", tk);
  if (log) nav('/')
}

export function verifySession (nav) {
    const ss = getSession();
    if (!ss) {
      sessionStorage.clear();
      nav('/auth');
    }
    return;
}

export function verifyAuthByPathName (path, nav) {
  if (getSession() && path.includes('auth')) nav('/')
}