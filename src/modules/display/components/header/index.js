// @flow

import React, { memo, useState, useRef, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import MainLayout from 'commons/components/MainLayout';
import images from 'themes/images';
import Button from 'commons/components/Button';
import ROUTERS from 'constants/router';
import Modal from 'commons/components/Modal';
import Loading from 'commons/components/Loading';

type Props = {
  history: {
    push: Function,
    go: Function,
  },
  getListLayout: Function,
  layoutHeader: Array<{
    id: number,
    name: string,
  }>,
  isProcessing: boolean,
  getDataFooter: Function,
  dataFooter: Object,
  createFooter: Function,
  type: string,
  deleteItemHeader: Function,
};

const DisplayHeader = ({
  history,
  getListLayout,
  layoutHeader,
  isProcessing,
  getDataFooter,
  dataFooter,
  createFooter,
  type,
  deleteItemHeader,
}: Props) => {
  const [fileLogo, setFileLogo] = useState(null);
  const [imgLogoView, setImgLogoView] = useState('');
  const inputFile = useRef({});
  const [showError, setShowError] = useState({
    isShow: false,
    content: '',
  });
  useEffect(() => {
    getListLayout('menu');
    getDataFooter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      case 'DELETE_ITEM_HEADER_SUCCESS':
        getListLayout('menu');
        break;
      case 'DELETE_ITEM_HEADER_FAILED':
        setShowError({
          isShow: true,
          content: 'Xóa thất bại!.',
        });
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);
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
      setFileLogo(e.files[0]);
      setImgLogoView(
        (window.URL || window.webkitURL).createObjectURL(e.files[0])
      );
    }
  };

  useEffect(() => {
    setImgLogoView(dataFooter?.logo);
  }, [dataFooter]);

  const handleSubmit = () => {
    const formData = new window.FormData();
    if (fileLogo) {
      formData.append('constants[1][name]', 'logo');
      formData.append('constants[1][value]', fileLogo);
      formData.append('constants[1][type]', true);
    }
    createFooter(formData);
  };

  const handleRemoveMenu = (item) => {
    deleteItemHeader(item.id);
  };

  const renderComponent =
    layoutHeader &&
    layoutHeader.map((item) => {
      return (
        <div className="list-companent__item d-flex align-items-center">
          <div
            className="list-companent__item-display"
            onClick={() => {
              history.push({
                pathname: ROUTERS.DISPLAY_HEADER_INTRODUCE,
                state: { type: item },
              });
            }}
            onKeyDown={() => {}}
            tabIndex={0}
            role="button"
            key={item.id}
          >
            {item.name}
          </div>
          <div
            className="btn-mis mb-4"
            onClick={() => handleRemoveMenu(item)}
            role="presentation"
          >
            -
          </div>
        </div>
      );
    });

  return (
    <MainLayout activeMenu={6}>
      <Container fluid className="pl-0">
        {isProcessing ? (
          <Loading />
        ) : (
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
              <h1>Header</h1>
              <div className="favicon">Logo</div>
              <div
                className="box__input"
                onClick={onButtonClick}
                onKeyDown={() => {}}
                tabIndex={0}
                role="button"
                style={{
                  backgroundImage: `url(${imgLogoView})`,
                }}
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
                  <strong>{'Upload file'}</strong>
                </label>
              </div>
              <p className="suggestions">Kích thước tối thiểu 512x512px</p>
              <div className="companent">Site con</div>{' '}
              <div className="favicon d-flex justify-content-between">
                Slide
                <div
                  className="plus-slide"
                  onClick={() =>
                    history.push({
                      pathname: ROUTERS.DISPLAY_HEADER_INTRODUCE,
                      state: { type: '', dataLength: layoutHeader?.length+1 },
                    })
                  }
                  role="presentation"
                >
                  +
                </div>
              </div>
              <div className="list-companent">{renderComponent}</div>
            </Col>
          </Row>
        )}
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

export default memo<Props>(DisplayHeader);
