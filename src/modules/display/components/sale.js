// @flow

import React, { memo, useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import MainLayout from 'commons/components/MainLayout';
import images from 'themes/images';
import Modal from 'commons/components/Modal';
import ROUTERS from 'constants/router';
import Input from 'commons/components/Input';
import Button from 'commons/components/Button';
import Loading from 'commons/components/Loading';

type Props = {
  history: {
    push: Function,
    go: Function,
    location: Object,
  },
  getDataMap: Function,
  dataSaleMap: Object,
  isProcessing: boolean,
  updateSaleMap: Function,
  type: string,
};

const Sale = ({
  history,
  getDataMap,
  dataSaleMap,
  isProcessing,
  updateSaleMap,
  type,
}: Props) => {
  const typePage = history?.location?.state?.type;

  const [dataSubmit, setDataSubmit] = useState({
    name: '',
    link: '',
    type: typePage || 'promotion',
  });
  const [modalCancel, setModalCancel] = useState({
    isShow: false,
    content: '',
  });

  useEffect(() => {
    getDataMap({ type: typePage || 'promotion' });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    switch (type) {
      case 'UPDATE_SALE_MAP_SUCCESS':
        getDataMap({ type: typePage || 'promotion' });
        if (!isProcessing) {
          setModalCancel({
            ...modalCancel,
            isShow: true,
            content: 'Cập nhật thành công!',
          });
        }
        break;
      case 'UPDATE_SALE_MAP_FAILED':
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

  useEffect(() => {
    setDataSubmit({
      name: dataSaleMap?.name || '',
      link: dataSaleMap?.link || '',
      type: dataSaleMap?.type || 'promotion',
    });
    // eslint-disable-next-line
  }, [dataSaleMap, typePage]);

  const handleChange = (value, name) => {
    setDataSubmit({
      ...dataSubmit,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const params = {
      name: dataSubmit?.name || '',
      link: dataSubmit?.link || '',
      type: dataSubmit?.type || '',
    };
    updateSaleMap(params);
  };

  return (
    <MainLayout activeMenu={6}>
      {isProcessing && <Loading />}
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
              onClick={() => history.push(ROUTERS.DISPLAY_MAIN)}
              role="presentation"
            />
            <h2
              className="cancel-display"
              onClick={() => history.push(ROUTERS.DISPLAY_MAIN)}
              role="presentation"
            >
              Hủy bỏ
            </h2>
            <Button
              customClass="button--primary"
              onClick={() => handleSubmit()}
              isDisabled={!dataSubmit?.name || !dataSubmit?.link}
            >
              LƯU
            </Button>
          </Col>
          <Col xs={12} md={12}>
            <h1>{dataSaleMap?.name}</h1>
            <Input
              type="text"
              onChange={(e) => {
                handleChange(e.target.value, 'name');
              }}
              value={dataSubmit?.name}
              label="Tên chuyên mục"
              placeholder="Nhập tên chuyên mục"
            />
            <p className="suggestions">
              Dòng tiêu đề của chuyên mục tại trang chủ
            </p>

            <Input
              type="text"
              onChange={(e) => {
                handleChange(e.target.value, 'link');
              }}
              value={dataSubmit?.link}
              label="Liên kết đến"
              placeholder="Nhập URL"
            />
            <p className="suggestions">Đường dẫn đến category của chuyên mục</p>
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

export default memo<Props>(Sale);
