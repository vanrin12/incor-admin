// @flow

import React, { memo, useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ROUTERS from 'constants/router';
import Modal from 'commons/components/Modal';
import { API } from '../../../utils/Apis';
import FormLogin from './FormLogin';
import { Types } from '../redux';

type Props = {
  signIn: Function,
  type: string,
  token: string,
  isProcessing: boolean,
  errors: Object,
  history: {
    push: Function,
  },
  getListUser: Function,
  userInfo: Object,
  roleUser: Object,
  resetType: Function,
  accountInfo: Object,
};
const Signin = ({
  signIn,
  type,
  token,
  isProcessing,
  history,
  errors,
  getListUser,
  userInfo,
  roleUser,
  resetType,
  accountInfo,
}: Props) => {
  const [isShowError, setIsShowError] = useState({
    isOpen: false,
    content: '',
  });

  useEffect(() => {
    resetType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (type === 'SIGN_IN_FAILED') {
      setIsShowError({ isOpen: true, content: errors && errors.message });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors, type]);
  /**
   * handle effect after login success
   */
  useEffect(() => {
    switch (type) {
      case Types.SIGN_IN_SUCCESS:
        API.setHeader('Authorization', `Bearer ${token}`);
        if (roleUser?.name === 'administrator') {
          history.push(ROUTERS.MAIN_PAGE);
        }
        if (roleUser?.name === 'content') {
          history.push(ROUTERS.POST);
        }
        if (roleUser?.name === 'partner') {
          history.push(
            `${ROUTERS.ROUTERS_PARTNER_MANAGEMENT}/${accountInfo?.id}`
          );
        }
        if (roleUser?.name === 'sale_admin') {
          history.push(ROUTERS.CUSTOMER);
        }

        if (roleUser?.name === 'customer') {
          setIsShowError({
            isOpen: true,
            content: 'Tài khoản không có quyền truy cập',
          });
        }
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, type, history, roleUser]);

  return (
    <Container fluid className="signin-page">
      <Row>
        <Col xs={12}>
          <FormLogin
            signIn={signIn}
            isProcessing={isProcessing}
            errors={errors}
            type={type}
            getListUser={getListUser}
            userInfo={userInfo}
          />
        </Col>
      </Row>
      <Modal
        isOpen={isShowError.isOpen}
        isShowFooter
        handleClose={() => {
          setIsShowError({ ...isShowError, isOpen: false });
        }}
        handleSubmit={() => {
          setIsShowError({ ...isShowError, isOpen: false });
        }}
        textBtnRight="ĐÓNG"
      >
        {isShowError.content}
      </Modal>
    </Container>
  );
};

export default memo<Props>(Signin);
