// // @flow
// import React, { memo } from 'react';
// import { Link } from 'react-router-dom';
// import IMAGES from 'themes/images';
// import ROUTERS from 'constants/router';

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className=" container-fluid">
//         <div className="content-footer row">
//           <div className="col-left col-12 col-md-4 align-self-center">
//             <div className="logo-footer">
//               <Link to={ROUTERS.MAIN_PAGE} title="">
//                 <img src={IMAGES.logoFooter} alt="Logo" />
//               </Link>
//             </div>
//             <div className="logo-copyright">
//               <Link to={ROUTERS.MAIN_PAGE} title="">
//                 <img src={IMAGES.logoCopyright} alt="Logo" />
//               </Link>
//             </div>
//           </div>
//           <div className="col-right col-12 col-md-8 align-self-center">
//             <div className="info-company">
//               <h3>CÔNG TY TNHH INCOR</h3>
//               <div className="company-desc">
//                 Với hơn 100+ nhà thầu thiết kế và thi công nội thất đã được đội
//                 ngũ kỹ sư của Incor kiểm định hồ sơ năng lực và chất lượng thi
//                 công, sàng lọc những đơn vị phù hợp với tiêu chuẩn công ty đề
//                 ra. Thông qua đánh giá ấy, Incor nắm bắt khuynh hướng làm việc
//                 và trình độ của các nhà thầu để có những tư vấn chính xác cho
//                 khách hàng.
//               </div>
//               <div className="address">
//                 <div className="address-title">Địa chỉ văn phòng</div>
//                 <div className="address-name">
//                   Đà Nẵng: Số 1, đường 123, Phường 4, Quận 5, TP 6
//                 </div>
//               </div>
//               <div className="address-company">
//                 <ul className="d-flex align-items-center">
//                   <li>
//                     <div className="address-title">Điện thoại</div>
//                     <div className="address-name">0123 456 789</div>
//                   </li>
//                   <li>
//                     <div className="address-title">Email</div>
//                     <div className="address-name">info@incor.vn</div>
//                   </li>
//                   <li>
//                     <div className="address-title">Social</div>
//                     <div className="address-name d-flex align-items-center">
//                       <Link to={ROUTERS.MAIN_PAGE} title="">
//                         <img src={IMAGES.facebook} alt="" />
//                       </Link>
//                       <Link to={ROUTERS.MAIN_PAGE} title="">
//                         <img src={IMAGES.youtube} alt="" />
//                       </Link>
//                     </div>
//                   </li>
//                 </ul>
//               </div>
//               <div className="copyright">
//                 Copyright Incor. All Rights Reserved.
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default memo<Props>(Footer);
