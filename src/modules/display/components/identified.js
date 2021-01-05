// @flow

import React, { memo, useState, useRef } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import MainLayout from 'commons/components/MainLayout';
import images from 'themes/images';
import Input from 'commons/components/Input';
import Button from 'commons/components/Button';

type Props = {
  history: {
    push: Function,
    go: Function,
  },
};

const Display = ({ history }: Props) => {
  const [dataSubmit, setDataSubmit] = useState({
    nameWebsite: '',
    tagline: '',
    favicon: null,
  });
  const [fileName, setFileName] = useState('');
  const inputFile = useRef({});
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
              onClick={() => history.go(-1)}
              role="presentation"
            />
            <h2 className="cancel-display">Hủy bỏ</h2>
            <Button customClass="button--primary" onClick={() => {}}>
              LƯU
            </Button>
          </Col>
          <Col xs={12} md={12}>
            <h1>Nhận diện</h1>
            <Input
              type="text"
              onChange={(e) => {
                handleChange(e.target.value, 'nameWebsite');
              }}
              value={dataSubmit.nameWebsite}
              label="Tên website"
              placeholder="Tên websie"
            />
            <p className="suggestions">
              Hiển thị trên tab trình duyệt & kết quả tìm kiếm google
            </p>
            <Input
              type="text"
              onChange={(e) => {
                handleChange(e.target.value, 'tagline');
              }}
              value={dataSubmit.tagline}
              label="Tagline"
              placeholder="Tagline"
            />
            <p className="suggestions">Hiển thị trên kết quả tìm kiếm google</p>
            <div className="favicon">Favicon</div>
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
            <p className="suggestions">Kích thước tối thiểu 512x512px</p>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default memo<Props>(Display);
