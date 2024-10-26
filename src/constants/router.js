const ROUTERS = {
  MAIN_PAGE: `/`,
  LOGIN: `/login`,
  SIGN_UP: '/sign-up',
  PARTNER: '/partner',
  CUSTOMER: '/customer',
  CUSTOMER_INFORMATION_PROJECT: '/customer/information/project',
  CUSTOMER_INFORMATION: '/customer/information/project/:id',
  POST: '/post',
  PRODUCTS: '/products',
  DETAIL_POST: '/post/:id',
  POST_REGISTER: '/post/add',
  REGISTER_CATEGORY_POST: '/post/category/add',
  UPDATE_CATEGORY: '/post/category/update',
  UPDATE_CATEGORY_POST: '/post/category/update/:id',
  ACCOUNTS: '/accounts',
  ROUTERS_PARTNER_MANAGEMENT: '/partner/management',
  PARTNER_MANAGEMENT: '/partner/management/:id',
  INFORMATION: '/customer/information',
  INFORMATION_NEEDS: '/customer/information/:id',
  INFORMATION_PROJECT: '/customer/information/project/register',
  INFORMATION_PROJECT_REGISTER: '/customer/information/project/register/:id',
  PROGRESS_PROJECT: '/customer/progress/project',
  PROGRESS_PROJECT_DETAIL: '/customer/progress/project/:id',
  DISPLAY: '/display',
  DISPLAY_IDENTIFIED: '/display/identified',
  DISPLAY_MAIN: '/display/main',
  MAIN_MEDIA: '/medias',
  DISPLAY_HEADER: '/header',
  DISPLAY_HEADER_INTRODUCE: '/header/introduce',
  DISPLAY_FOOTER: '/header/footer',
  ABOUT_US: '/display/about_us',
  CUSTOMER_EXP: '/display/customer_exp',
  DISPLAY_SALE: `/display/sale-map`,
};

export default ROUTERS;
