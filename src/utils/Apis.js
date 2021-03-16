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
  API_GET_LIST_MEDIA: (params) => `/api/v1/admin/media/${params}`,
  API_DELETE_PARTNER: `api/v1/admin/partners`,
  API_REGISTER_PARTNER_COMPANY: `api/v1/admin/partners/company`,
  API_GET_LIST_CONSTRUCTION: `api/v1/admin/partners/constructions`,
  API_GET_LIST_PARTNER_PRODUCT: `api/v1/admin/partners/products`,
  API_REGISTER_PARTNER_PRODUCT: `api/v1/admin/partners/products`,
  API_UPLOAD_MEDIA: `/api/v1/admin/media`,
  API_REGISTER_PARTNER_CONSTRUCTION: `api/v1/admin/partners/constructions`,
  API_GET_LIST_PARTNER_QUOTE: (id) => `api/v1/admin/partners/${id}/quotes`,
  API_GET_DETAIL_PARTNER_PRODUCT: (id) =>
    `api/v1/admin/partners/products/${id}`,
  API_UPDATE_PARTNER_PRODUCT: (id) => `api/v1/admin/partners/products/${id}`,
  API_GET_DETAIL_PARTNER_CONSTRUCTION: (id) =>
    `api/v1/admin/partners/constructions/${id}`,
  API_UPDATE_PARTNER_CONSTRUCTION: (id) =>
    `api/v1/admin/partners/constructions/${id}`,
  API_DELETE_MEDIA: (id) => `/api/v1/admin/media/${id}`,
  API_GET_LIST_CUSTOMER: `/api/v1/admin/customers`,
  API_GET_LIST_NAME: `/api/v1/admin/customers/name-incor`,
  API_GET_DETAIL_CUSTOMER: (id) => `/api/v1/admin/customers/${id}`,
  API_UPDATE_CUSTOMER: (id) => `/api/v1/admin/customers/${id}`,
  API_GET_LIST_SPACE_TYPE: `/api/v1/site/space-type`,
  API_GET_LIST_DIVISION: `/api/v1/site/space-division`,
  API_REGISTER_PROJECT: `/api/v1/admin/customers/project`,
  API_DELETE_PROJECT: (id) => `/api/v1/admin/customers/project/${id}`,
  API_GET_DETAIL_PROJECT: (id) => `/api/v1/admin/customers/${id}/project`,
  API_GET_LIST_PROJECT: `/api/v1/site/projects`,
  API_GET_LIST_CONSTRUCTION_CUSTOMER: (id) =>
    `/api/v1/admin/customers/construction-items/${id}`,
  API_REGISTER_CONSTRUCTION_CUSTOMER: `/api/v1/admin/customers/construction-items`,
  API_REGISTER_PROJECT_ITEM: `/api/v1/admin/customers/project-items`,
  API_GET_DETAIL_CONSTRUCTION_CUSTOMER: (id) =>
    `/api/v1/admin/customers/construction-items/${id}`,
  API_UPDATE_PROJECT_ITEM: (id) =>
    `/api/v1/admin/customers/project-items/${id}`,
};

export const API = create({
  baseURL: API_URI,
});
