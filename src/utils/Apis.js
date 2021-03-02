/* eslint-disable camelcase */
// import libs
import { create } from 'apisauce';

const API_URI = process.env.REACT_APP_API_URL;

export const ROUTES = {
  LOGIN: `/api/v1/auth/login`,
  GET_PARTNER: 'api/v1/admin/partners',
  GET_AREAS: 'api/v1/site/areas',
  GET_SCALES: 'api/v1/site/scales',
  GET_CATEGORIES: 'api/v1/admin/categories',
  DELETE_CATEGORIES: 'api/v1/admin/categories',
  REGISTER_CATEGORIES: 'api/v1/admin/categories',
  GET_PARENT: 'api/v1/admin/categories/parent',
  GET_CATEGORIES_DETAIL: (id) => `api/v1/admin/categories/${id}`,
  UPDATE_CATEGORIES: (id) => `api/v1/admin/categories/${id}`,
  GET_LIST_POST: 'api/v1/admin/posts',
  GET_ALL_CATEGORIES: 'api/v1/site/categories',
  REGISTER_POST: 'api/v1/admin/posts',
  GET_ALL_SEO_TITLE: 'api/v1/admin/posts/seo-title',
  DELETE_POST: 'api/v1/admin/posts',
  GET_POST_DETAIL: (id) => `api/v1/admin/posts/${id}`,
  UPDATE_POST: (id) => `api/v1/admin/posts/${id}`,
  GET_LIST_CONSTANT: `api/v1/site/constants`,
  LOG_OUT: `api/v1/auth/logout`,
  GET_PARTNER_MANAGEMENT: (id) => `api/v1/admin/partners/${id}`,
  API_GET_LIST_MEDIA: (params) => `/admin/media/${params}`,
};

export const API = create({
  baseURL: API_URI,
});
