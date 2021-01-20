// @flow
import React, { memo, useState } from 'react';
import Input from 'commons/components/Input';
import PrimaryButton from 'commons/components/Button';
import { Container, Row } from 'react-bootstrap';

type Props = {
  signIn: Function,
};
const FormLogin = ({ signIn }: Props) => {
  const [objLogin, setObjLogin] = useState({
    name: '',
    password: '',
  });
  const handleChange = (value, name) => {
    setObjLogin({
      ...objLogin,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    signIn({
      ...objLogin,
    });
  };

  /**
   * Handle custom show content error
   */
  // eslint-disable-next-line consistent-return

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="form-wrapper position-relative d-flex">
      <Container className="p-0">
        <Row className="p-0">
          <form className="form-login">
            <h4>ĐĂNG NHẬP</h4>
            <Input
              label="TÊN ĐĂNG NHẬP"
              type="text"
              onChange={(e) => {
                handleChange(e.target.value, 'name');
              }}
              value={objLogin.name}
              placeholder="Nhập tài khoản tại đây"
              onKeyPress={handleKeyDown}
            />
            <Input
              label="MẬT KHẨU"
              type="password"
              onChange={(e) => {
                handleChange(e.target.value, 'password');
              }}
              value={objLogin.password}
              placeholder="Nhập mật khẩu tại đây"
              onKeyPress={handleKeyDown}
            />

            <div className="text-center d-block">
              <PrimaryButton
                type="button"
                variant="primary"
                onClick={handleSubmit}
              >
                ĐĂNG NHẬP
              </PrimaryButton>
            </div>
          </form>
        </Row>
      </Container>
    </div>
  );
};

export default memo<Props>(FormLogin);
