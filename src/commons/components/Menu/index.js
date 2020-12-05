// @flow
import React, { useState } from 'react';
import InlineSVG from 'svg-inline-react';
import { Row } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import menuItems from 'constants/menuItems';

const Menu = () => {
  const [activeMenu, setacTiveMenu] = useState(0);

  const handleChangeActiveMenu = (key) => {
    setacTiveMenu(key);
  };

  const renderItemMenu = menuItems.map((item) => {
    const isActive = activeMenu === item.id;

    return (
      <div
        key={item.id}
        className={`menu__item ${isActive ? 'menu__item--active' : ''}`}
        onClick={() => handleChangeActiveMenu(item.id)}
        role="button"
        tabIndex="0"
        onKeyPress={() => {}}
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

export default withRouter(Menu);
