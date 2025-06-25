import { getActiveRoute } from '../routes/url-parser';
import { ACCESS_TOKEN_KEY } from '../config';

export function getAccessToken() {
  try {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (
      !accessToken ||
      accessToken === '' ||
      accessToken === 'null' ||
      accessToken === 'undefined'
    ) {
      return null;
    }
    return accessToken;
  } catch (error) {
    console.error('getAccessToken: error:', error);
    return null;
  }
}

export function putAccessToken(token) {
  try {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    console.log('Access Token:', getAccessToken());
    return true;
  } catch (error) {
    console.error('putAccessToken: error:', error);
    return false;
  }
}

export function removeAccessToken() {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    return true;
  } catch (error) {
    console.error('getLogout: error:', error);
    return false;
  }
}

const unauthenticatedRoutesOnly = ['/login', '/register'];

export function checkUnauthenticatedRouteOnly(page) {
  const url = getActiveRoute();
  const isLogin = !!getAccessToken();
  console.log('DEBUG checkUnauthenticatedRouteOnly:', { url, isLogin });
  if (unauthenticatedRoutesOnly.includes(url) && isLogin) {
    location.pathname = '/';
    return null;
  }
  return page;
}

export function checkAuthenticatedRoute(page) {
  const isLogin = !!getAccessToken();
  const url = getActiveRoute();
  console.log('DEBUG checkAuthenticatedRoute:', { url, isLogin });
  if (!isLogin) {
    location.pathname = '/login';
    return null;
  }
  return page;
}

export function getLogout() {
  removeAccessToken();
}
