// @flow

import React, { memo, useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import MainLayout from 'commons/components/MainLayout';
import Modal from 'commons/components/Modal';
import images from 'themes/images';
import Input from 'commons/components/Input';
import Button from 'commons/components/Button';
import Loading from 'commons/components/Loading';
import ItemSlider from './ItemSlide';

type Props = {
  history: {
    push: Function,
    go: Function,
  },
  getListSlider: Function,
  isProcessing: boolean,
  dataListSlider: Object,
  titleSlider: string,
  deleteSlider: Function,
  updateListSlider: Function,
  statusCode: any,
  typeRequest: string,
  getListLayout: Function,
  siteMapComponent: any,
};

const Display = ({
  history,
  getListSlider,
  isProcessing,
  dataListSlider,
  titleSlider,
  deleteSlider,
  updateListSlider,
  statusCode,
  typeRequest,
  getListLayout,
  siteMapComponent,
}: Props) => {
  const [dataSubmit, setDataSubmit] = useState({
    tagline: '',
  });
  const [modalCancel, setModalCancel] = useState({
    isShow: false,
    content: '',
  });
  const [listSlider, setListSlider] = useState([
    {
      id: 1,
      image: '',
      name: '',
      imageView: '',
    },
  ]);

  useEffect(() => {
    getListSlider();
    getListLayout();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setListSlider(dataListSlider);
    setDataSubmit({
      ...dataSubmit,
      tagline: titleSlider,
    });
    // eslint-disable-next-line
  }, [dataListSlider, titleSlider]);
  console.log(siteMapComponent, 'layoutHeader');
  useEffect(() => {
    switch (typeRequest) {
      case 'UPDATE_LIST_SLIDER_SUCCESS':
        if (statusCode === 200) {
          getListSlider();
          if (!isProcessing) {
            setModalCancel({
              ...modalCancel,
              isShow: true,
              content: 'Cập nhật thành công!.',
            });
          }
        }
        break;
      case 'UPDATE_LIST_SLIDER_FAILED':
        setModalCancel({
          ...modalCancel,
          isShow: true,
          content: 'Cập nhật đang bị lỗi. \n vui lòng thử lại sau!.',
        });
        break;
      default:
        break;
    }
    // eslint-disable-next-line
  }, [typeRequest]);

  const handleChange = (value) => {
    setDataSubmit({
      ...dataSubmit,
      tagline: value,
    });
  };

  const handleAddListSlider = () => {
    if (listSlider.length <= 10) {
      setListSlider([
        ...listSlider,
        {
          id: Math.random(),
          image: '',
          name: '',
          imageView: '',
        },
      ]);
    } else {
      setModalCancel({
        ...modalCancel,
        isShow: true,
        content: 'Đang giới hạng 10 slide.',
      });
    }
  };

  const handleRemoveSlider = (data) => {
    const listRemove =
      listSlider && listSlider.filter((item) => item.id !== data.id);
    if (listSlider && listSlider.length > 1) {
      deleteSlider(data.id);
      setListSlider(listRemove);
    }
  };

  const handelGetFileName = (e, idItem) => {
    if (e.target.validity.valid && e.target.files[0]) {
      if (e.target.files[0].size === 0) {
        setModalCancel({
          ...modalCancel,
          isShow: true,
          content: 'Dung lượng hình ảnh phải lớn hơn 0KB.',
        });
      } else if (e.target.files[0].size > 1574000000) {
        setModalCancel({
          ...modalCancel,
          isShow: true,
          content: 'Kích thước hình ảnh được giới hạn ở 1.5G',
        });
      } else {
        const listItemUpdate = listSlider.map((item) => {
          return item.id === idItem
            ? {
                ...item,
                imageView: (window.URL || window.webkitURL).createObjectURL(
                  e.target.files[0]
                ),
                image: e.target.files[0],
                name: e.target.files[0].name,
              }
            : item;
        });
        setListSlider(listItemUpdate);
      }
    }
  };

  const handleUpdateSlider = () => {
    const listSliderUpload =
      listSlider && listSlider.filter((item) => item.image !== '');
    const listSlideFormat =
      listSliderUpload && listSliderUpload.map((item) => item.image);
    const formData = new window.FormData();
    formData.append('title', (dataSubmit && dataSubmit.tagline) || '');
    if (listSlideFormat && listSlideFormat.length > 0) {
      formData.append('uploads[0]', listSlideFormat[0]);
      if (listSlideFormat[1]) {
        formData.append('uploads[1]', listSlideFormat[1]);
      }
      if (listSlideFormat[2]) {
        formData.append('uploads[2]', listSlideFormat[2]);
      }
      if (listSlideFormat[3]) {
        formData.append('uploads[3]', listSlideFormat[3]);
      }
      if (listSlideFormat[4]) {
        formData.append('uploads[4]', listSlideFormat[4]);
      }
      if (listSlideFormat[5]) {
        formData.append('uploads[5]', listSlideFormat[5]);
      }
      if (listSlideFormat[6]) {
        formData.append('uploads[6]', listSlideFormat[6]);
      }
      if (listSlideFormat[7]) {
        formData.append('uploads[7]', listSlideFormat[7]);
      }
      if (listSlideFormat[8]) {
        formData.append('uploads[8]', listSlideFormat[8]);
      }
      if (listSlideFormat[9]) {
        formData.append('uploads[9]', listSlideFormat[9]);
      }
      if (listSlideFormat[10]) {
        formData.append('uploads[10]', listSlideFormat[10]);
      }
    }

    updateListSlider(formData);
  };

  const renderListSlider =
    listSlider &&
    listSlider.length > 0 &&
    listSlider.map((item) => (
      <ItemSlider
        key={item.id}
        handelGetFileName={handelGetFileName}
        dataItem={item}
        handleRemoveSlider={handleRemoveSlider}
      />
    ));

  const renderComponent =
    siteMapComponent &&
    siteMapComponent.map((item) => {
      return (
        <div
          className="list-companent__item-display"
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
      {isProcessing && <Loading />}
      <Container fluid className="pl-0">
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
              onClick={() => handleUpdateSlider()}
              isDisabled={!dataSubmit?.tagline}
            >
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
            <div className="mb-3">{renderListSlider}</div>
            <Input
              type="text"
              onChange={(e) => {
                handleChange(e.target.value);
              }}
              value={dataSubmit?.tagline}
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
