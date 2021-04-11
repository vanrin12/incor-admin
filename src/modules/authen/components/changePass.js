/* eslint-disable no-nested-ternary */
// @flow
import React, { useState, useEffect, memo } from 'react';
import Button from 'commons/components/Button';
import MainLayout from 'commons/components/MainLayout';
import Input from 'commons/components/Input';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ModalPopup } from 'commons/components/Modal';

type Props = {
  changePassword: Function,
  errorMsg: string,
  type: string,
  isProcessingPass: boolean,
  resetType: Function,
  logOut: Function,
};

const ChangePass = ({
  changePassword,
  errorMsg,
  type,
  isProcessingPass,
  resetType,
  logOut,
}: Props) => {
  const [dataChange, setDataChange] = useState({
    password: '',
    confirmPassword: '',
    passwordOld: '',
  });
  const [errorMess, setErrorMess] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [isIconName, setIsIconName] = useState({
    password: false,
    confirmPassword: false,
    passwordOld: false,
  });

  const [isShowType, setIsShowType] = useState({
    password: false,
    confirmPassword: false,
    passwordOld: false,
  });

  // handle logout
  const handleLogout = () => {
    logOut();
  };

  useEffect(() => {
    resetType();
    setErrorMess('');
    // eslint-disable-next-line
  }, []);

  /** Show popup sign in success */
  useEffect(() => {
    switch (type) {
      case 'CHANGE_PASSWORD_SUCCESS':
        setErrorMess('');
        setIsShowModal(true);
        setDataChange({
          password: '',
          confirmPassword: '',
          passwordOld: '',
        });
        break;
      case 'CHANGE_PASSWORD_FAILED':
        setErrorMess(errorMsg || 'Mật khẩu củ không trùng khớp');
        setIsShowModal(false);
        break;
      default:
        break;
    }
    // eslint-disable-next-line
  }, [type, errorMsg]);

  const handleChange = (value, name) => {
    setDataChange({
      ...dataChange,
      [name]: value,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleClickLookPassword = (name, boo) => {
    setIsIconName({
      ...isIconName,
      [name]: boo,
    });
    setIsShowType({
      ...isShowType,
      [name]: boo,
    });
  };

  const { confirmPassword, password, passwordOld } = dataChange;

  const onBlur = () => {
    if (confirmPassword && password && confirmPassword !== password) {
      setErrorMess('Xác nhận mật khẩu không đúng.');
    } else {
      setErrorMess('');
    }
  };

  const onFocus = () => {
    setErrorMess('');
  };

  const handleSubmit = () => {
    const formData = new window.FormData();
    if (confirmPassword !== password) {
      setErrorMess('Xác nhận mật khẩu không đúng.');
    } else {
      formData.append('password_old', passwordOld);
      formData.append('password', password);
      changePassword(formData);
    }
  };

  return (
    <MainLayout>
      <div className="change-pass">
        <div className="container">
          <div className="form-change-pass">
            <div className="form-group">
              <Input
                placeholder="Mật khẩu cũ của bạn"
                label="Mật khẩu cũ của bạn"
                name="passwordOld"
                onKeyPress={(e) => handleKeyDown(e)}
                value={passwordOld}
                onChange={(e) => handleChange(e.target.value, 'passwordOld')}
                type={isShowType?.passwordOld ? 'text' : 'password'}
                classIcon="faEyeSlash"
                icoIcon={
                  passwordOld &&
                  passwordOld.trim().length > 3 &&
                  (isIconName?.passwordOld ? faEye : faEyeSlash)
                }
                handleClickIcon={() =>
                  handleClickLookPassword(
                    'passwordOld',
                    !isIconName?.passwordOld
                  )
                }
                onBlur={() => onBlur()}
                onFocus={() => onFocus()}
                isShowIcon
              />
            </div>

            <div className="form-group">
              <Input
                placeholder="Mật khẩu mới"
                label="Mật khẩu mới"
                name="password"
                onKeyPress={(e) => handleKeyDown(e)}
                value={password}
                onChange={(e) => handleChange(e.target.value, 'password')}
                type={isShowType?.password ? 'text' : 'password'}
                classIcon="faEyeSlash"
                icoIcon={
                  password &&
                  password.trim().length > 3 &&
                  (isIconName?.password ? faEye : faEyeSlash)
                }
                handleClickIcon={() =>
                  handleClickLookPassword('password', !isIconName?.password)
                }
                onBlur={() => onBlur()}
                onFocus={() => onFocus()}
                isShowIcon
              />
            </div>
            <div className="form-group">
              <Input
                placeholder="Xác nhận mật khẩu"
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                onKeyPress={(e) => handleKeyDown(e)}
                value={confirmPassword}
                onChange={(e) =>
                  handleChange(e.target.value, 'confirmPassword')
                }
                // errorMsg={formik?.errors?.confirmPassword}
                type={isShowType?.confirmPassword ? 'text' : 'password'}
                classIcon="faEyeSlash"
                icoIcon={
                  confirmPassword &&
                  confirmPassword.trim().length > 3 &&
                  (isIconName?.confirmPassword ? faEye : faEyeSlash)
                }
                handleClickIcon={() =>
                  handleClickLookPassword(
                    'confirmPassword',
                    !isIconName?.confirmPassword
                  )
                }
                isShowIcon
                onBlur={() => onBlur()}
                onFocus={() => onFocus()}
              />
            </div>
            {errorMess && (
              <div className="form-group">
                <p className="input__error-msg">{errorMess}</p>
              </div>
            )}
            <div className="form-group mb-0 text-center btn-summit">
              <Button
                onClick={handleSubmit}
                isShowLoading={isProcessingPass}
                isDisabled={!password || !passwordOld || !confirmPassword}
              >
                ĐỔI MẬT KHẨU
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal success */}
      <ModalPopup
        isOpen={isShowModal}
        isShowFooter
        textBtnRight="ĐÓNG"
        handleClose={() => {
          setIsShowModal(false);
          handleLogout();
        }}
      >
        <h2 className="modal-title">CẢM ƠN BẠN !</h2>
        <div className="text-modal-content">
          <p>Mật khẩu đã được thay đổi thành công.</p>
          <small>(Vùi lòng đăng xuất và đăng nhập lại)</small>
        </div>
      </ModalPopup>
    </MainLayout>
  );
};

export default memo<Props>(ChangePass);
