// @flow

import React, { memo, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Menu from 'commons/components/Menu';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as AuthenCreators } from '../../../modules/authen/redux';
// import Header from '../Header';

type Props = {
  children: any,
  activeMenu: number,
  logOut: Function,
  // customClass?: string,
};

const MainLayout = ({ children, activeMenu, logOut }: Props) => {
  const [showLogout, setShowLogout] = useState(false);
  return (
    <Container fluid>
      <Row className="main-layout">
        <div
          className="main-layout__profile"
          onClick={() => setShowLogout(!showLogout)}
          role="button"
          tabIndex={0}
          onKeyDown={() => {}}
        >
          ADMIN INCOR
        </div>
        {showLogout && (
          <div className="popup-logout">
            <p
              className="popup-logout__item-logout"
              onClick={logOut}
              role="presentation"
            >
              Đăng xuất
            </p>
          </div>
        )}
        <Col xs={12} md={2} className="menu-left">
          <Menu activeMenu={activeMenu} />
        </Col>
        <Col xs={12} md={10} className="layout-right">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      logOut: AuthenCreators.logOut,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null
)(memo<Props>(MainLayout));
