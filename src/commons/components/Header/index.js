// /* eslint-disable no-nested-ternary */
// // @flow

// import React, { memo } from 'react';
// import { withRouter } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import IMAGES from 'themes/images';
// import ROUTERS from 'constants/router';

// type Props = {
//   children?: any,
// };

// const Header = () => {
//   return (
//     <div className="header-main">
//       <header className="header d-flex align-items-center">
//         <div className="main_logo">
//           <Link to={ROUTERS.MAIN_PAGE} title="Logo">
//             <img src={IMAGES.logo} alt="Logo" />
//           </Link>
//         </div>
//         <div className="menu-main d-flex align-items-center w-100">
//           <ul>
//             <li>
//               <Link to="#" title="GIỚI THIỆU">
//                 GIỚI THIỆU
//               </Link>
//             </li>
//             <li>
//               <Link to="#" title="DỊCH VỤ">
//                 DỊCH VỤ
//               </Link>
//             </li>
//             <li>
//               <Link to="#" title="KHÁCH HÀNG">
//                 KHÁCH HÀNG
//               </Link>
//             </li>
//             <li>
//               <Link to="#" title="HỢP TÁC">
//                 HỢP TÁC
//               </Link>
//             </li>
//             <li>
//               <Link to="#" title="TUYỂN DỤNG">
//                 TUYỂN DỤNG
//               </Link>
//             </li>
//             <li>
//               <Link to="#" title="LIÊN HỆ">
//                 LIÊN HỆ
//               </Link>
//             </li>
//           </ul>
//           <div className="user-info">
//             <button>ĐĂNG NHẬP</button>
//           </div>
//         </div>
//       </header>
//     </div>
//   );
// };

// Header.defaultProps = {
//   children: '',
// };

// export default withRouter(memo<Props>(Header));
