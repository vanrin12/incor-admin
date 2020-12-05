import ROUTERS from './router';

const menuItems = [
  {
    id: 0,
    name: 'tổng Quan',
    url: ROUTERS.MAIN_PAGE,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
      <path class="home" id="ic_home_24px" d="M10,20V14h4v6h5V12h3L12,3,2,12H5v8Z" transform="translate(-2 -3)"/>
    </svg>`,
  },
  {
    id: 1,
    name: 'media',
    url: '/media',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
    <path id="ic_crop_original_24px" d="M19,3H5A2.006,2.006,0,0,0,3,5V19a2.006,2.006,0,0,0,2,2H19a2.006,2.006,0,0,0,2-2V5A2.006,2.006,0,0,0,19,3Zm0,16H5V5H19Zm-5.04-6.71-2.75,3.54L9.25,13.47,6.5,17h11Z" transform="translate(-3 -3)"/>
  </svg>`,
  },
  {
    id: 2,
    name: 'bài viết',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
    <path id="ic_library_books_24px" d="M4,6H2V20a2.006,2.006,0,0,0,2,2H18V20H4ZM20,2H8A2.006,2.006,0,0,0,6,4V16a2.006,2.006,0,0,0,2,2H20a2.006,2.006,0,0,0,2-2V4A2.006,2.006,0,0,0,20,2Zm-1,9H9V9H19Zm-4,4H9V13h6Zm4-8H9V5H19Z" transform="translate(-2 -2)"/>
  </svg>
  `,
    url: '/baiviet',
  },
  {
    id: 3,
    name: 'đối tác',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
    <path id="ic_account_circle_24px" d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,3A3,3,0,1,1,9,8,3,3,0,0,1,12,5Zm0,14.2a7.2,7.2,0,0,1-6-3.22c.03-1.99,4-3.08,6-3.08s5.97,1.09,6,3.08A7.2,7.2,0,0,1,12,19.2Z" transform="translate(-2 -2)"/>
  </svg>
  `,
    url: ROUTERS.PARTNER,
  },
  {
    id: 4,
    name: 'khách hàng',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20">
    <path id="ic_assignment_ind_24px" d="M19,3H14.82A2.988,2.988,0,0,0,9.18,3H5A2.006,2.006,0,0,0,3,5V19a2.006,2.006,0,0,0,2,2H19a2.006,2.006,0,0,0,2-2V5A2.006,2.006,0,0,0,19,3ZM12,3a1,1,0,1,1-1,1A1,1,0,0,1,12,3Zm0,4a3,3,0,1,1-3,3A3,3,0,0,1,12,7Zm6,12H6V17.6c0-2,4-3.1,6-3.1s6,1.1,6,3.1Z" transform="translate(-3 -1)"/>
  </svg>`,
    url: '/khachhang',
  },
  {
    id: 5,
    name: 'tài khoản',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" viewBox="0 0 22 16">
    <path id="ic_person_add_24px" d="M15,12a4,4,0,1,0-4-4A4,4,0,0,0,15,12ZM6,10V7H4v3H1v2H4v3H6V12H9V10Zm9,4c-2.67,0-8,1.34-8,4v2H23V18C23,15.34,17.67,14,15,14Z" transform="translate(-1 -4)"/>
  </svg>`,
    url: 'taikhoan',
  },
  {
    id: 6,
    name: 'giao diện',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
    <path id="ic_dashboard_24px" d="M3,13h8V3H3Zm0,8h8V15H3Zm10,0h8V11H13ZM13,3V9h8V3Z" transform="translate(-3 -3)"/>
  </svg>
  `,
    url: '/giaodien',
  },
  {
    id: 7,
    name: 'công cụ',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
    <path id="ic_extension_24px" d="M20.5,11H19V7a2.006,2.006,0,0,0-2-2H13V3.5a2.5,2.5,0,0,0-5,0V5H4A2,2,0,0,0,2.01,7v3.8H3.5a2.7,2.7,0,0,1,0,5.4H2V20a2.006,2.006,0,0,0,2,2H7.8V20.5a2.7,2.7,0,1,1,5.4,0V22H17a2.006,2.006,0,0,0,2-2V16h1.5a2.5,2.5,0,0,0,0-5Z" transform="translate(-2 -1)"/>
  </svg>`,
    url: '/congcu',
  },
  {
    id: 8,
    name: 'data',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="22" viewBox="0 0 16 22">
    <path id="ic_autorenew_24px" d="M12,6V9l4-4L12,1V4A7.986,7.986,0,0,0,5.24,16.26L6.7,14.8A5.87,5.87,0,0,1,6,12,6,6,0,0,1,12,6Zm6.76,1.74L17.3,9.2A5.99,5.99,0,0,1,12,18V15L8,19l4,4V20A7.986,7.986,0,0,0,18.76,7.74Z" transform="translate(-4 -1)"/>
  </svg>
  `,
    url: '/data',
  },
];

export default menuItems;
