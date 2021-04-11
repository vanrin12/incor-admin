// @flow

import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  placeholder?: string,
  value?: any,
  errorMsg?: any,
  label?: string,
  disabled?: boolean,
  inputMode?: string,
  type?: string,
  onBlur?: Function,
  onBlurWrapper?: Function,
  onFocusWrapper?: Function,
  onClickWrapper?: Function,
  onChange?: Function,
  onFocus?: Function,
  onKeyPress?: Function,
  onPaste?: Function,
  readOnly?: boolean,
  variant?: string,
  customClassName?: string,
  customClassLabel?: string,
  customClassWrap?: string,
  isShowIcon?: boolean,
  name?: string,
  request?: boolean,
  innerRef?: any,
  customClass?: string,
  innerRef?: any,
  pattern?: string,
  maxLength?: string,
  autocomplete?: string,
  autoFocus?: boolean,
  classIcon?: string,
  isShowIcon?: boolean,
  icoIcon?: any,
  handleClickIcon?: Function,
};

const Input = ({
  placeholder = '',
  value = '',
  errorMsg = '',
  label = '',
  disabled = false,
  readOnly = false,
  type = 'text',
  onBlur = () => {},
  onBlurWrapper = () => {},
  onFocusWrapper = () => {},
  onClickWrapper = () => {},
  onChange = () => {},
  customClassName = null,
  customClassWrap = null,
  customClassLabel = null,
  onFocus = () => {},
  onKeyPress = () => {},
  onPaste = () => {},
  variant = 'outline',
  isShowIcon = false,
  name = '',
  request = false,
  customClass = '',
  innerRef = null,
  pattern = '',
  inputMode = '',
  maxLength = '',
  autocomplete = '',
  autoFocus,
  classIcon = '',
  icoIcon = '',
  handleClickIcon = () => {},
}: Props) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={`input ${
        variant !== 'outline' ? ` input__wrapper--${variant}` : ''
      }`}
      onBlur={(e) => onBlurWrapper(e)}
      onFocus={(e) => onFocusWrapper(e)}
      onClick={(e) => onClickWrapper(e)}
      onKeyUp={() => {}}
    >
      {!!label && (
        <p className={`${customClassLabel} input__label`}>
          {label}
          {request && <span className="request">*</span>}
        </p>
      )}
      <div
        className={`input__box ${customClassWrap} ${
          isShowIcon ? 'input__box__custom' : ''
        }`}
      >
        <input
          className={`input-change ${
            customClass.length > 0 ? customClass : ''
          } ${
            variant !== 'outline' ? `input--${variant}` : ''
          } ${customClassName}`}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          type={type}
          ref={innerRef}
          onPaste={onPaste}
          onKeyPress={onKeyPress}
          readOnly={readOnly}
          onBlur={(e) => onBlur(e)}
          onFocus={(e) => onFocus(e)}
          onChange={(e) => onChange(e)}
          autoCapitalize="none"
          inputMode={inputMode}
          maxLength={maxLength}
          name={name}
          pattern={pattern}
          autoComplete={autocomplete}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
        />
        {isShowIcon && (
          <div
            className={`input__box__icon ${classIcon}`}
            onClick={() => handleClickIcon()}
            role="button"
            tabIndex={0}
            onKeyUp={() => handleClickIcon()}
          >
            {icoIcon && <FontAwesomeIcon icon={icoIcon} />}
          </div>
        )}
      </div>
      {errorMsg && <p className="input__error-msg">{errorMsg}</p>}
    </div>
  );
};

Input.defaultProps = {
  classIcon: '',
  placeholder: '',
  value: '',
  errorMsg: '',
  label: '',
  disabled: false,
  readOnly: false,
  type: 'text',
  onBlur: () => {},
  onBlurWrapper: () => {},
  onFocusWrapper: () => {},
  onClickWrapper: () => {},
  onFocus: () => {},
  onChange: () => {},
  onKeyPress: () => {},
  onPaste: () => {},
  inputMode: '',
  maxLength: '',
  variant: 'outline',
  customClassName: '',
  customClassLabel: '',
  customClassWrap: '',
  isShowIcon: false,
  icoIcon: '',
  name: '',
  request: false,
  innerRef: null,
  customClass: '',
  pattern: '',
  autocomplete: '',
  autoFocus: false,
  handleClickIcon: () => {},
};

export default memo<Props>(Input);
