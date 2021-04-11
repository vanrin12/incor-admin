/* eslint-disable no-nested-ternary */
// @flow
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'commons/components/Button';
import Input from 'commons/components/Input';
import { changePassword, resetSingIn } from 'modules/accounts/redux';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ModalPopup } from 'commons/components/Modal';
import { logout } from 'modules/accounts/redux';

const ChangePass = () => {
  const dispatch = useDispatch();
  const { type, isProcessingPass, errorMsg } = useSelector(
    (state) => state?.account
  );
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
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(resetSingIn());
    setErrorMess('');
    // eslint-disable-next-line
  }, []);

  /** Show popup sign in success */
  useEffect(() => {
    switch (type) {
      case 'accounts/changePasswordSuccess':
        setErrorMess('');
        setIsShowModal(true);
        setDataChange({
          password: '',
          confirmPassword: '',
          passwordOld: '',
        });
        break;
      case 'accounts/changePasswordFailed':
        setErrorMess(errorMsg || 'Mật khẩu củ không trùng khớp');
        setIsShowModal(false);
        break;
      default:
        break;
    }
    // eslint-disable-next-line
  }, [type, errorMsg]);

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
      dispatch(changePassword(formData));
    }
  };

  return (
    <div>
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
                onChange={formik.handleChange}
                errorMsg={formik?.errors?.passwordOld}
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
                onChange={formik.handleChange}
                errorMsg={formik?.errors?.password}
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
                onChange={formik.handleChange}
                errorMsg={formik?.errors?.confirmPassword}
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
              <Button onClick={handleSubmit} isShowLoading={isProcessingPass}>
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
    </div>
  );
};

export default ChangePass;
