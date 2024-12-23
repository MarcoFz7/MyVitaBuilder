import Cookies from 'js-cookie';

export const isUserAuthorized = () => {
  const token = Cookies.get('token');
  return !!token;
};