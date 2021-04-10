// @flow
import React, { memo, useState, useEffect } from 'react';
import InlineSVG from 'svg-inline-react';
import { Row } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import menuItems from 'constants/menuItems';

type Props = {
  activeMenu: number,
  roleUser: Object,
};
const Menu = ({ activeMenu, roleUser }: Props) => {
  const [dataMenu, setDataMenu] = useState(menuItems);
  const scale = menuItems.filter((item) => item.role === roleUser.name);
  useEffect(() => {
    if (roleUser.name === 'administrator') {
      setDataMenu(menuItems);
    } else {
      setDataMenu(scale);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleUser]);

  const renderItemMenu = dataMenu.map((item) => {
    const isActive = activeMenu === item.id;

    return (
      <div
        key={item.id}
        className={`menu__item ${isActive ? 'menu__item--active' : ''}`}
      >
        <InlineSVG src={item.icon} />

        <Link
          to={{
            pathname: item.url,
          }}
        >
          {item.name}
        </Link>
      </div>
    );
  });

  return (
    <Row className="wrapper-menu">
      <div className="logo" />
      <div>{renderItemMenu}</div>
      {roleUser.name === 'partner' && (
        <div className="description-menu">
          <h2>&quot;</h2>
          <p>Cảm ơn Quý đối tác đã tin tưởng và đồng hành cùng Incor</p>
          <h2 className="text-right">&quot;</h2>
          <p className="description-menu__admin">TOÀN NGUYỄN</p>
          <p className="description-menu__ceo">CEO Incor</p>
          <h1 className="description-menu__incor">INCOR</h1>
          <p>Nền tảng kết nối khách hàng & công ty xây dựng nội thất</p>
          <p className="description-menu__hotline">Hotline:</p>
          <p className="description-menu__email">Email: cskh.incor@gmail.com</p>
        </div>
      )}
    </Row>
  );
};

export default withRouter(memo<Props>(Menu));
