// @flow

import React, { useState, memo, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import Modal from 'commons/components/Modal';
import MainLayout from 'commons/components/MainLayout';
import Button from 'commons/components/Button';
import Input from 'commons/components/Input';
import Loading from 'commons/components/Loading';

type Props = {
  isProcessing: boolean,
  getDataFooter: Function,
  dataFooter: Object,
  createFooter: Function,
  type: string,
};

const Partner = ({
  isProcessing,
  getDataFooter,
  dataFooter,
  createFooter,
  type,
}: Props) => {
  const inputRef = useRef();
  const hashtag = [];
  const [listHashtag, setListHashtag] = useState(hashtag || []);
  const [valueHashtag, setValueHashtag] = useState('');
  const [titleForm, setTitleForm] = useState('');
  const [modalCancel, setModalCancel] = useState({
    isShow: false,
    content: '',
  });
  useEffect(() => {
    getDataFooter();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (dataFooter?.hashtag) {
      setListHashtag(
        dataFooter && dataFooter.hashtag && dataFooter.hashtag.split(',')
      );
    }

    setTitleForm(dataFooter?.titleForm);
    // eslint-disable-next-line
  }, [dataFooter]);

  useEffect(() => {
    switch (type) {
      case 'CREATE_FOOTER_SUCCESS':
        getDataFooter();
        if (!isProcessing) {
          setModalCancel({
            ...modalCancel,
            isShow: true,
            content: 'Cập nhật thành công!',
          });
        }
        break;
      case 'CREATE_FOOTER_FAILED':
        setModalCancel({
          ...modalCancel,
          isShow: true,
          content: 'Cập nhật thất bại!',
        });
        break;
      default:
        break;
    }
    // eslint-disable-next-line
  }, [type]);

  const handelFocusInput = () => {
    // eslint-disable-next-line no-unused-expressions
    const inputRefCurrent =
      inputRef && inputRef.current ? inputRef.current : null;
    // eslint-disable-next-line no-unused-expressions
    inputRefCurrent && inputRefCurrent.focus();
  };

  const handleInputChange = (value) => {
    setValueHashtag(value);
  };

  const handleRemove = (name) => {
    const updateHashTag = listHashtag.filter((item) => item !== name);
    setListHashtag(updateHashTag);
  };

  const handleSubmit = () => {
    const formData = new window.FormData();
    formData.append('constants[1][name]', 'hashtag');
    formData.append('constants[1][value]', listHashtag.toString());
    createFooter(formData);
  };

  const handleSubmitForm = () => {
    const formData = new window.FormData();
    formData.append('constants[1][name]', 'titleForm');
    formData.append('constants[1][value]', titleForm);
    createFooter(formData);
  };

  const handleKeyDown = (e) => {
    const findHashtag = listHashtag.find(
      (item) => item && item.trim() === valueHashtag && valueHashtag.trim()
    );
    if (e.key === 'Enter') {
      if (findHashtag) {
        setModalCancel({
          ...modalCancel,
          isShow: true,
          content: 'Hashtag đã bị trùng lặp',
        });
      } else if (valueHashtag && valueHashtag.trim()) {
        setListHashtag([...listHashtag, valueHashtag]);
        setValueHashtag('');
        setModalCancel({
          ...modalCancel,
          isShow: false,
          content: '',
        });
      }
    }
  };

  const renderListHashtag =
    listHashtag &&
    listHashtag.length > 0 &&
    listHashtag.map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <li key={index + 1}>
        #{item}
        <span
          onClick={() => handleRemove(item)}
          onKeyDown={() => {}}
          tabIndex={0}
          role="button"
        >
          <svg
            height="14"
            width="14"
            viewBox="0 0 20 20"
            aria-hidden="true"
            focusable="false"
            className="css-6q0nyr-Svg"
          >
            <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z" />
          </svg>
        </span>
      </li>
    ));

  return (
    <MainLayout activeMenu={8}>
      {isProcessing && <Loading />}
      <Container fluid>
        <div className="content-wrapper page-data">
          <h2 className="title-page mb-4">Hashtag</h2>
          <div className="form-search-data">
            <div className="list-hashtag">
              <div
                className="content-hashtag"
                onClick={() => handelFocusInput()}
                onKeyDown={() => {}}
                tabIndex={0}
                role="button"
              >
                <ul>
                  {renderListHashtag}
                  <Input
                    type="text"
                    onChange={(e) => handleInputChange(e.target.value)}
                    value={valueHashtag}
                    onKeyPress={(e) => handleKeyDown(e)}
                    innerRef={inputRef}
                  />
                </ul>
              </div>
              <div className="text-right">
                <Button onClick={() => handleSubmit()}>Lưu thay đổi</Button>
              </div>
            </div>
          </div>
          <h2 className="title-page my-4">Form tư vấn</h2>
          <div className="from-advisory">
            <div className="title-form">
              <Input
                type="text"
                onChange={(e) => setTitleForm(e.target.value)}
                value={titleForm}
                placeholder="Nhập tiêu đề form"
              />
            </div>
            <div className="text-right mt-4">
              <Button onClick={() => handleSubmitForm()}>Lưu thay đổi</Button>
            </div>
          </div>
        </div>
        <Modal
          isOpen={modalCancel.isShow}
          isShowFooter
          handleClose={() => {
            setModalCancel({ ...modalCancel, isShow: false });
          }}
          handleSubmit={() => {
            setModalCancel({ ...modalCancel, isShow: false });
          }}
          textBtnRight="ĐÓNG"
        >
          {modalCancel.content}
        </Modal>
      </Container>
    </MainLayout>
  );
};

export default memo<Props>(Partner);
