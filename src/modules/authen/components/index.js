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
}: Props) => {
  const [isShowError, setIsShowError] = useState({
    isOpen: false,
    content: '',
  });

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
        history.push(ROUTERS.MAIN_PAGE);
        break;
      default:
        break;
    }
  }, [token, type, history]);

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
