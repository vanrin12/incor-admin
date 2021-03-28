// @flow

import React, { memo, useState, useRef, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import MainLayout from 'commons/components/MainLayout';
import images from 'themes/images';
import Input from 'commons/components/Input';
import Button from 'commons/components/Button';
import Modal from 'commons/components/Modal';
import Loading from 'commons/components/Loading';

type Props = {
  history: {
    push: Function,
    go: Function,
  },
  getDataFooter: Function,
  dataFooter: Object,
  createFooter: Function,
  type: string,
  isProcessing: boolean,
};

const Display = ({
  history,
  getDataFooter,
  dataFooter,
  createFooter,
  isProcessing,
  type,
}: Props) => {
  const [dataSubmit, setDataSubmit] = useState({
    nameWebsite: '',
    tagline: '',
    favicon: null,
    faviconView: '',
  });
  const [showError, setShowError] = useState({
    isShow: false,
    content: '',
  });
  const inputFile = useRef({});
  const { faviconView, nameWebsite, tagline, favicon } = dataSubmit;
  useEffect(() => {
    getDataFooter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDataSubmit({
      nameWebsite: dataFooter?.nameWebsite || '',
      tagline: dataFooter?.tagline || '',
      favicon: null,
      faviconView: dataFooter?.favicon || null,
    });
  }, [dataFooter]);

  useEffect(() => {
    switch (type) {
      case 'CREATE_FOOTER_SUCCESS':
        setShowError({
          isShow: true,
          content: 'Cập nhật thành công!.',
        });
        getDataFooter();
        break;
      case 'CREATE_FOOTER_FAILED':
        setShowError({
          isShow: true,
          content: 'Cập nhật thất bại!.',
        });
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

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
      setDataSubmit({
        ...dataSubmit,
        favicon: e.files[0],
        faviconView: (window.URL || window.webkitURL).createObjectURL(
          e.files[0]
        ),
      });
    }
  };

  const handleSubmit = () => {
    const formData = new window.FormData();
    formData.append('constants[1][name]', 'nameWebsite');
    formData.append('constants[1][value]', nameWebsite || '');
    formData.append('constants[2][name]', 'tagline');
    formData.append('constants[2][value]', tagline);

    if (favicon) {
      formData.append('constants[3][name]', 'favicon');
      formData.append('constants[3][value]', favicon);
      formData.append('constants[3][type]', true);
    }
    createFooter(formData);
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
            <Button
              customClass="button--primary"
              onClick={() => handleSubmit()}
            >
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
                <img
                  src={faviconView}
                  alt=""
                  className="d-block"
                  width="30px"
                />

                <strong>{!faviconView && 'Upload file'}</strong>
              </label>
            </div>
            <p className="suggestions">Kích thước tối thiểu 512x512px</p>
          </Col>
        </Row>
      </Container>
      <Modal
        isOpen={showError.isShow}
        isShowFooter
        handleClose={() => {
          setShowError({ ...showError, isShow: false });
        }}
        handleSubmit={() => {
          setShowError({ ...showError, isShow: false });
        }}
        textBtnRight="ĐÓNG"
      >
        {showError.content}
      </Modal>
    </MainLayout>
  );
};

export default memo<Props>(Display);
