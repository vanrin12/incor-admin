// @flow
import React, { memo } from 'react';
import InlineSVG from 'svg-inline-react';
import { Row } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import menuItems from 'constants/menuItems';

type Props = {
  activeMenu: number,
};
const Menu = ({ activeMenu }: Props) => {
  const renderItemMenu = menuItems.map((item) => {
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
    </Row>
  );
};

export default withRouter(memo<Props>(Menu));
