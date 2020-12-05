/* eslint-disable no-nested-ternary */
// @flow
// libs
import React, { memo } from 'react';
import { Modal } from 'react-bootstrap';
import Button from 'commons/components/Button';
import images from 'themes/images';

type Props = {
  title?: string,
  children: any,
  animation?: boolean,
  isOpen: boolean,
  size?: string,
  handleClose: Function,
  customClass?: string,
  isShowIconClose?: boolean,
  isShowHeader?: boolean,
  isShowFooter?: boolean,
  isShowTwoBtn?: boolean,
  customClassButton?: string,
  classNameBtnLeft?: string,
  textBtnLeft?: string,
  classNameBtnRight?: string,
  textBtnRight?: string,
  handleSubmit?: Function,
  isDisabledButton?: boolean,
};

export const ModalPopup = ({
  title = '',
  children,
  animation = false,
  isOpen,
  size,
  handleClose,
  customClass,
  isShowIconClose,
  isShowHeader,
  isShowFooter,
  isShowTwoBtn,
  customClassButton = '',
  classNameBtnLeft = '',
  textBtnLeft = '',
  classNameBtnRight = '',
  textBtnRight = 'OK',
  handleSubmit = () => {},
  isDisabledButton,
}: Props) => (
  <Modal
    animation={animation}
    onHide={() => {
      return true;
    }}
    show={isOpen}
    size={size}
    className={customClass}
  >
    {isShowIconClose && (
      <div
        className="modal-content__iconClose"
        onClick={handleClose}
        role="button"
        tabIndex={0}
        onKeyUp={handleClose}
      >
        <img src={images.icon_close} alt="" />
      </div>
    )}

    {isShowHeader && <h3 className="modal-title">{title}</h3>}

    <Modal.Body>
      {!isShowHeader ? (
        <div className="modal-body__no-header">{children}</div>
      ) : (
        <div className="modal-body__has-header">{children}</div>
      )}
    </Modal.Body>
    {isShowFooter && (
      <Modal.Footer>
        {!isShowTwoBtn ? (
          <Button
            type="button"
            customClass={customClassButton}
            onClick={handleClose}
          >
            {textBtnRight}
          </Button>
        ) : (
          <>
            <Button
              type="button"
              customClass={`button--half ${customClassButton} ${classNameBtnLeft}`}
              onClick={handleSubmit}
              isDisabled={isDisabledButton}
            >
              {textBtnLeft}
            </Button>
            <Button
              type="button"
              customClass={`button--half ${customClassButton} ${classNameBtnRight}`}
              onClick={handleClose}
            >
              {textBtnRight}
            </Button>
          </>
        )}
      </Modal.Footer>
    )}
  </Modal>
);

ModalPopup.defaultProps = {
  title: '',
  animation: false,
  size: '',
  customClass: '',
  isShowIconClose: false,
  isShowHeader: false,
  isShowFooter: false,
  isShowTwoBtn: false,
  customClassButton: '',
  classNameBtnLeft: '',
  textBtnLeft: '',
  classNameBtnRight: '',
  textBtnRight: 'OK',
  handleSubmit: () => {},
  isDisabledButton: false,
};
export default memo<Props>(ModalPopup);
