/* eslint-disable camelcase */
// import libs
import { create } from 'apisauce';

const API_URI = process.env.REACT_APP_API_URL;

export const ROUTES = {
  GET_DATA_HOME: '/admin/main',
  USER_LIST: '/admin/users',
  GET_ROLES: '/admin/roles',
};

export const API = create({
  baseURL: API_URI,
});
