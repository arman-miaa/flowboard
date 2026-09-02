import Cookies from 'js-cookie';

export const setCookie = async (name: string, value: string, days?: number) => {
  Cookies.set(name, value, { expires: days || 1, secure: process.env.NODE_ENV === 'production' });
};

export const getCookie = async (name: string): Promise<string | undefined> => {
  return Cookies.get(name);
};

export const removeCookie = async (name: string) => {
  Cookies.remove(name);
};
