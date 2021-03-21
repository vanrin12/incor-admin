// @flow

import React, { memo, useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import MainLayout from 'commons/components/MainLayout';
import images from 'themes/images';
import Input from 'commons/components/Input';
import Button from 'commons/components/Button';
import Loading from 'commons/components/Loading';

type Props = {
  history: {
    push: Function,
    go: Function,
    location: Object,
  },
  createIntroduce: Function,
  getValueHeader: Function,
  valueHeader: Object,
  isProcessing: boolean,
  type: string,
};

const Introduce = ({
  history,
  createIntroduce,
  getValueHeader,
  valueHeader,
  isProcessing,
  type,
}: Props) => {
  const typePage = history?.location?.state?.type;
  const [dataSubmit, setDataSubmit] = useState({
    nameWebsite: '',
    tagline: '',
  });
  const dataHeader = valueHeader.filter(
    (item) => item.type === typePage?.category
  );
  useEffect(() => {
    if (type === 'CREATE_INTRODUCE_SUCCESS') {
      history.go(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    setDataSubmit({
      nameWebsite: dataHeader && dataHeader[0] && dataHeader[0].name,
      tagline: dataHeader && dataHeader[0] && dataHeader[0].link,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typePage]);

  useEffect(() => {
    getValueHeader();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (value, name) => {
    setDataSubmit({
      ...dataSubmit,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    createIntroduce({
      name: dataSubmit.nameWebsite,
      link: dataSubmit.tagline,
      type: typePage.category,
    });
  };

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
            <Button customClass="button--primary" onClick={handleSubmit}>
              LƯU
            </Button>
          </Col>
          {isProcessing ? (
            <Loading />
          ) : (
            <Col xs={12} md={12}>
              <h1>{typePage?.title}</h1>
              <Input
                type="text"
                onChange={(e) => {
                  handleChange(e.target.value, 'nameWebsite');
                }}
                value={dataSubmit.nameWebsite}
                label="Tên chuyên mục"
                placeholder="Nhập tên chuyên mục"
              />
              <p className="suggestions">
                Dòng tiêu đề của chuyên mục tại trang chủ
              </p>
              <Input
                type="text"
                onChange={(e) => {
                  handleChange(e.target.value, 'tagline');
                }}
                value={dataSubmit.tagline}
                label="Liên kết đến"
                placeholder="Nhập URL"
              />
              <p className="suggestions">
                Đường dẫn đến category của chuyên mục
              </p>
            </Col>
          )}
        </Row>
      </Container>
    </MainLayout>
  );
};

export default memo<Props>(Introduce);
