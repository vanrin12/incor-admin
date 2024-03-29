// @flow

import React, { memo, useState, useRef } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import MainLayout from 'commons/components/MainLayout';
import images from 'themes/images';
import Input from 'commons/components/Input';
import Button from 'commons/components/Button';
// import ROUTERS from 'constants/router';
import { listComponent } from 'constants/listData';

type Props = {
  history: {
    push: Function,
    go: Function,
  },
};

const Display = ({ history }: Props) => {
  const [dataSubmit, setDataSubmit] = useState({
    component: '',
    tagline: '',
    slide: null,
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
    if (e && e.files[0]) {
      setDataSubmit({ ...dataSubmit, favicon: e.files[0] });
      setFileName(e.files[0].name);
    }
  };

  const renderComponent =
    listComponent &&
    listComponent.map((item) => {
      return (
        <div
          className={`list-companent__item-display ${
            item.id === dataSubmit.component ? 'active' : ''
          }`}
          onClick={() => {
            history.push({
              pathname: history.push(item.url),
              state: { type: item?.type },
            });
          }}
          onKeyDown={() => {}}
          tabIndex={0}
          role="button"
          key={item.id}
        >
          {item.name}
        </div>
      );
    });

  return (
    <MainLayout activeMenu={6}>
      <Container fluid>
        <Row className="content-wrapper page-display">
          <Col
            xs={12}
            md={12}
            className="d-flex align-items-center mb-4 justify-content-end"
          >
            <img
              src={images.iconBack}
              alt=""
              className="action-increase"
              onClick={() => history.go(-1)}
              role="presentation"
            />
            <h2
              className="cancel-display"
              onClick={() => history.go(-1)}
              role="presentation"
            >
              Hủy bỏ
            </h2>
            <Button customClass="button--primary" onClick={() => {}}>
              LƯU
            </Button>
          </Col>
          <Col xs={12} md={12}>
            <h1>Trang chủ</h1>
            <div className="favicon">Slide</div>
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
            <Input
              type="text"
              onChange={(e) => {
                handleChange(e.target.value, 'tagline');
              }}
              value={dataSubmit.tagline}
              label="Tagline slide"
              placeholder="Nhập tagline"
            />
            <p className="suggestions">Dòng chữ xuất hiện ở trên slide</p>
            <div className="companent">Component</div>
            <div className="list-companent">{renderComponent}</div>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default memo<Props>(Display);
