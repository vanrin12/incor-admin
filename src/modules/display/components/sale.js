// @flow

import React, { memo, useState, useRef } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import MainLayout from 'commons/components/MainLayout';
import images from 'themes/images';
import ROUTERS from 'constants/router';
import Input from 'commons/components/Input';
import Button from 'commons/components/Button';

type Props = {
  history: {
    push: Function,
    go: Function,
    location: Object,
  },
};

const Sale = ({ history }: Props) => {
  const typePage = history?.location?.state?.type;
  const [fileName, setFileName] = useState('');
  const inputFile = useRef({});
  const [dataSubmit, setDataSubmit] = useState({
    nameCategory: '',
    linkUrl: '',
    tag: '',
    nameCustomer: '',
    addressCustomer: '',
    feelCustomer: '',
  });
  const handleChange = (value, name) => {
    setDataSubmit({
      ...dataSubmit,
      [name]: value,
    });
  };
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    // eslint-disable-next-line no-unused-expressions
    const inputRefCurrent =
      inputFile && inputFile.current ? inputFile.current : null;
    // eslint-disable-next-line no-unused-expressions
    inputRefCurrent && inputRefCurrent.click();
  };

  const getFileName = async (e) => {
    setDataSubmit({ ...dataSubmit, favicon: e.files[0] });
    setFileName(e.files[0].name);
  };
  return (
    <MainLayout activeMenu={6}>
      <Container fluid>
        <Row className="content-wrapper page-display">
          <Col xs={12} md={12} className="d-flex align-items-center mb-4">
            <img
              src={images.iconBack}
              alt=""
              className="action-increase"
              onClick={() => history.push(ROUTERS.DISPLAY_MAIN)}
              role="presentation"
            />
            <h2 className="cancel-display">Hủy bỏ</h2>
            <Button customClass="button--primary" onClick={() => {}}>
              LƯU
            </Button>
          </Col>
          <Col xs={12} md={12}>
            <h1>{typePage?.name}</h1>
            <Input
              type="text"
              onChange={(e) => {
                handleChange(e.target.value, 'nameCategory');
              }}
              value={dataSubmit.nameCategory}
              label="Tên chuyên mục"
              placeholder="Nhập tên chuyên mục"
            />
            <p className="suggestions">
              Dòng tiêu đề của chuyên mục tại trang chủ
            </p>
            {(typePage?.id === 1 || typePage?.id === 3) && (
              <>
                <Input
                  type="text"
                  onChange={(e) => {
                    handleChange(e.target.value, 'linkUrl');
                  }}
                  value={dataSubmit.linkUrl}
                  label="Liên kết đến"
                  placeholder="Nhập URL"
                />
                <p className="suggestions">
                  Đường dẫn đến category của chuyên mục
                </p>
              </>
            )}
            {typePage?.id === 4 && (
              <>
                <div className="favicon">Tagline</div>
                <textarea
                  onChange={(e) => {
                    handleChange(e.target.value, 'tag');
                  }}
                  value={dataSubmit.tag}
                  placeholder="Nhập tagline"
                  rows={5}
                />
                <div className="favicon">Video về chúng tôi</div>
                <div
                  className="box__input"
                  onClick={onButtonClick}
                  onKeyDown={() => {}}
                  tabIndex={0}
                  role="button"
                >
                  <input
                    className="box__file"
                    type="file"
                    multiple
                    ref={inputFile}
                    accept="video/mp4,video/x-m4v,video/*"
                    onChange={(e) => getFileName(e.target)}
                  />
                  <label>
                    <strong>{fileName || 'Upload file'}</strong>
                  </label>
                </div>
              </>
            )}
            {typePage?.id === 2 && (
              <div className="form-customer">
                <div className="favicon">Khách hàng 1</div>
                <div
                  className="box__input"
                  onClick={onButtonClick}
                  onKeyDown={() => {}}
                  tabIndex={0}
                  role="button"
                >
                  <input
                    className="box__file"
                    type="file"
                    multiple
                    ref={inputFile}
                    accept="image/jpg, image/png, image/gif, capture=camera"
                    onChange={(e) => getFileName(e.target)}
                  />
                  <label>
                    <strong>{fileName || 'Upload file'}</strong>
                  </label>
                </div>
                <Input
                  type="text"
                  onChange={(e) => {
                    handleChange(e.target.value, 'nameCustomer');
                  }}
                  value={dataSubmit.nameCustomer}
                  placeholder="Nhập tên khách hàng"
                />
                <Input
                  type="text"
                  onChange={(e) => {
                    handleChange(e.target.value, 'addressCustomer');
                  }}
                  value={dataSubmit.addressCustomer}
                  placeholder="Nhập địa chỉ"
                />
                <textarea
                  onChange={(e) => {
                    handleChange(e.target.value, 'feelCustomer');
                  }}
                  value={dataSubmit.feelCustomer}
                  placeholder="Nhập cảm nhận khách hàng"
                  rows={5}
                />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default memo<Props>(Sale);
