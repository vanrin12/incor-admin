/* eslint-disable camelcase */
// import libs
import { create } from 'apisauce';

const API_URI = process.env.REACT_APP_API_URL;

export const ROUTES = {
  GET_PARTNER: 'api/v1/admin/partners',
  GET_AREAS: 'api/v1/site/areas',
  GET_SCALES: 'api/v1/site/scales',
  GET_CATEGORIES: 'api/v1/admin/categories',
  DELETE_CATEGORIES: 'api/v1/admin/categories',
  REGISTER_CATEGORIES: 'api/v1/admin/categories',
  GET_PARENT: 'api/v1/admin/categories/parent',
  GET_CATEGORIES_DETAIL: (id) => `api/v1/admin/categories/${id}`,
  UPDATE_CATEGORIES: (id) => `api/v1/admin/categories/${id}`,
};

export const API = create({
  baseURL: API_URI,
});
