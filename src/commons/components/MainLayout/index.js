// @flow

import React, { memo, useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Menu from 'commons/components/Menu';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ROUTERS from 'constants/router';
import IMAGES from 'themes/images';
import useOnClickOutside from '../../../customHooks/useClickOutSide';
import { Creators as AuthenCreators } from '../../../modules/authen/redux';

// import Header from '../Header';

type Props = {
  children: any,
  activeMenu: number,
  logOut: Function,
  roleUser: Object,
  type: string,
  history: {
    push: Function,
  },
  // customClass?: string,
};

const MainLayout = ({
  children,
  activeMenu,
  logOut,
  roleUser,
  type,
  history,
}: Props) => {
  const [showLogout, setShowLogout] = useState(false);
  const refMenu = useRef(null);

  useOnClickOutside(refMenu, () => setShowLogout(false));

  useEffect(() => {
    if (type === 'LOG_OUT') {
      history.push(ROUTERS.LOGIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

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
          <img src={IMAGES.iconBack} alt="" />
          {roleUser?.name}
        </div>
        {showLogout && (
          <>
            <ul ref={refMenu} className="menu-logout">
              <li
                onClick={() => history && history.push(ROUTERS.CHANGE_PASSWORD)}
                role="presentation"
              >
                <div className="change-password">Đổi mật khẩu</div>
              </li>
              <li onClick={logOut} role="presentation">
                <div className="popup-logout">Đăng xuất</div>
              </li>
            </ul>
          </>
        )}
        <Col xs={12} md={2} className="menu-left">
          <Menu activeMenu={activeMenu} roleUser={roleUser} />
        </Col>
        <Col xs={12} md={10} className="layout-right">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    roleUser: state.authReducer.roleUser,
    type: state.authReducer.type,
  };
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
)(withRouter(memo<Props>(MainLayout)));
