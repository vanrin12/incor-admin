// @flow

import React, { memo, useState, useRef, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import MainLayout from 'commons/components/MainLayout';
import images from 'themes/images';
import ROUTERS from 'constants/router';
import Video from 'commons/components/Video';
import Input from 'commons/components/Input';
import Button from 'commons/components/Button';
import Modal from 'commons/components/Modal';
import Loading from 'commons/components/Loading';

type Props = {
  history: {
    push: Function,
    go: Function,
    location: Object,
  },
  getAboutUs: Function,
  isProcessing: boolean,
  dataAboutUs: Object,
  updateAboutUs: Function,
  type: string,
};

const Sale = ({
  history,
  getAboutUs,
  isProcessing,
  dataAboutUs,
  updateAboutUs,
  type,
}: Props) => {
  const [fileName, setFileName] = useState('');
  const inputFile = useRef({});
  const inputFileThumbnail = useRef({});
  const [dataSubmit, setDataSubmit] = useState({
    name: '',
    video: '',
    tagline: '',
    videoView: '',
    thumbnailVideo: '',
    thumbnailViewVideo: '',
  });

  const [showError, setShowError] = useState({
    isShow: false,
    content: '',
  });

  useEffect(() => {
    getAboutUs();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setDataSubmit({
      ...dataSubmit,
      name: dataAboutUs?.name || '',
      tagline: dataAboutUs?.tagline || '',
      videoView: dataAboutUs?.video,
    });
    // eslint-disable-next-line
  }, [dataAboutUs]);

  useEffect(() => {
    switch (type) {
      case 'UPDATE_ABOUT_US_SUCCESS':
        getAboutUs();
        if (!isProcessing) {
          setShowError({
            isShow: true,
            content: 'Cập nhật thành công!.',
          });
        }
        break;
      case 'UPDATE_ABOUT_US_FAILED':
        setShowError({
          isShow: true,
          content: 'Cập nhật thất bại!.',
        });
        break;
      default:
        break;
    }
    // eslint-disable-next-line
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
  const onButtonClickThumbnail = () => {
    // `current` points to the mounted file input element
    // eslint-disable-next-line no-unused-expressions
    const inputRefCurrent =
      inputFileThumbnail && inputFileThumbnail.current
        ? inputFileThumbnail.current
        : null;
    // eslint-disable-next-line no-unused-expressions
    inputRefCurrent && inputRefCurrent.click();
  };

  const handleChangeFile = (e) => {
    if (e.target.validity.valid && e.target.files[0]) {
      if (e.target.files[0].size === 0) {
        setShowError({
          ...showError,
          isShow: true,
          content: 'Dung lượng video phải lớn hơn 0KB.',
        });
      } else if (e.target.files[0].size > 1574000000) {
        setShowError({
          ...showError,
          isShow: true,
          content: 'Dung lượng video được giới hạn ở 1.5G',
        });
      } else {
        setFileName(e.target.files[0].name);
        setDataSubmit({
          ...dataSubmit,
          video: e.target.files[0],
          videoView: (window.URL || window.webkitURL).createObjectURL(
            e.target.files[0]
          ),
        });
      }
    }
  };
  const handleChangeFileThumbnail = (e) => {
    if (e.target.validity.valid && e.target.files[0]) {
      if (e.target.files[0].size === 0) {
        setShowError({
          ...showError,
          isShow: true,
          content: 'Dung lượng ảnh phải lớn hơn 0KB.',
        });
      } else if (e.target.files[0].size > 1574000000) {
        setShowError({
          ...showError,
          isShow: true,
          content: 'Dung lượng hình ảnh được giới hạn ở 1.5G',
        });
      } else {
        setDataSubmit({
          ...dataSubmit,
          thumbnailVideo: e.target.files[0],
          thumbnailViewVideo: (window.URL || window.webkitURL).createObjectURL(
            e.target.files[0]
          ),
        });
      }
    }
  };

  const handleSubmit = () => {
    const formData = new window.FormData();
    formData.append('name', (dataSubmit && dataSubmit.name) || '');
    if (dataSubmit && dataSubmit.video) {
      formData.append('file', (dataSubmit && dataSubmit.video) || '');
    }
    formData.append('tagline', dataSubmit && dataSubmit.tagline);
    updateAboutUs(formData);
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
              isDisabled={!dataSubmit?.name || !dataSubmit?.tagline}
            >
              LƯU
            </Button>
          </Col>
          <Col xs={12} md={12} className="page-display__aboutUs">
            <h1>{dataAboutUs?.name}</h1>
            <Input
              type="text"
              onChange={(e) => {
                handleChange(e.target.value, 'name');
              }}
              value={dataSubmit.name}
              label="Tên chuyên mục"
              placeholder="Nhập tên chuyên mục"
            />
            <p className="suggestions">
              Dòng tiêu đề của chuyên mục tại trang chủ
            </p>

            <div className="favicon">Tagline</div>
            <textarea
              onChange={(e) => {
                handleChange(e.target.value, 'tagline');
              }}
              value={dataSubmit.tagline}
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
                onChange={(e) => handleChangeFile(e)}
              />
              <label>
                <strong>{fileName || 'Upload file'}</strong>
              </label>
            </div>
            {dataSubmit?.videoView && (
              <div className="mt-3 mb-3">
                <Video src={dataSubmit?.videoView} />
              </div>
            )}

            <div className="favicon">Thumbnail video</div>
            <div
              className="box__input"
              onClick={onButtonClickThumbnail}
              onKeyDown={() => {}}
              tabIndex={0}
              role="button"
              style={{
                backgroundImage: `url(${dataSubmit?.thumbnailViewVideo})`,
              }}
            >
              <input
                className="box__file"
                type="file"
                ref={inputFileThumbnail}
                accept="image/jpg, image/jpeg, image/png, capture=camera"
                onChange={(e) => handleChangeFileThumbnail(e)}
              />
              <label>
                <strong>{'Upload file'}</strong>
              </label>
            </div>
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

export default memo<Props>(Sale);
