// @flow

import React, { memo, useState, useRef } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import MainLayout from 'commons/components/MainLayout';
import Modal from 'commons/components/Modal';
import images from 'themes/images';
import Input from 'commons/components/Input';
import Button from 'commons/components/Button';
import { listComponent } from 'constants/listData';
import ItemSlider from './ItemSlide';

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
  const [modalCancel, setModalCancel] = useState({
    isShow: false,
    content: '',
  });
  const [listSlider, setListSlider] = useState([
    {
      id: 1,
      fileName: '',
      name: '',
    },
  ]);
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

  const handleAddListSlider = () => {
    setListSlider([
      ...listSlider,
      {
        idx: Math.random(),
        fileName: '',
        name: '',
      },
    ]);
  };

  const handleRemoveSlider = (item) => {
    console.log(item, 'ssssssss');
    if (listSlider.length > 1) {
      setModalCancel({ ...modalCancel, isShow: true, content: '' });
    } else {
    }
  };

  const renderListSlider =
    listSlider &&
    listSlider.length > 0 &&
    listSlider.map((item) => (
      <ItemSlider
        inputFile={inputFile}
        onButtonClick={onButtonClick}
        key={item.id}
        dataItem={item}
        handleRemoveSlider={handleRemoveSlider}
      />
    ));

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
              pathname: item.url,
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
            <div className="favicon d-flex justify-content-between">
              Slide
              <div
                className="plus-slide"
                onClick={() => handleAddListSlider()}
                role="presentation"
              >
                +
              </div>
            </div>
            {renderListSlider}
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
    </MainLayout>
  );
};

export default memo<Props>(Display);
