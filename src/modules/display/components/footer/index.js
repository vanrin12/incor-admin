// @flow

import React, { memo, useState, useRef, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import MainLayout from 'commons/components/MainLayout';
import images from 'themes/images';
import Input from 'commons/components/Input';
import Button from 'commons/components/Button';
import Loading from 'commons/components/Loading';
import Modal from 'commons/components/Modal';

type Props = {
  history: {
    push: Function,
    go: Function,
  },
  createFooter: Function,
  getDataFooter: Function,
  dataFooter: Object,
  isProcessing: boolean,
  type: string,
};

const DisplayFooter = ({
  history,
  createFooter,
  getDataFooter,
  dataFooter,
  isProcessing,
  type,
}: Props) => {
  const [dataSubmit, setDataSubmit] = useState({
    nameWebsite: '',
    tagline: '',
    logo: null,
    description: '',
    address: '',
    phone: '',
    email: '',
    youtube: '',
    facebook: '',
    logo2: null,
  });
  const [fileName, setFileName] = useState('');
  const [fileName2, setFileName2] = useState('');
  const [UrlFileName1, setUrlFileName1] = useState('');
  const [UrlFileName2, setUrlFileName2] = useState('');
  const inputFile = useRef({});
  const inputFile2 = useRef({});
  const [showError, setShowError] = useState({
    isShow: false,
    content: '',
  });
  useEffect(() => {
    setFileName(dataFooter?.logo);
    setUrlFileName1(dataFooter?.logo);
    setFileName2(dataFooter?.logoCongThuong);
    setUrlFileName2(dataFooter?.logoCongThuong);
    setDataSubmit({
      nameWebsite: dataFooter?.companyName,
      tagline: '',
      logo: null,
      description: dataFooter?.descCompany,
      address: dataFooter?.address,
      phone: dataFooter?.phone,
      email: dataFooter?.email,
      youtube: dataFooter?.linkYoutube,
      facebook: dataFooter?.linkFacebook,
      logo2: null,
    });
  }, [dataFooter]);

  useEffect(() => {
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
  const onButtonClick2 = () => {
    // `current` points to the mounted file input element
    // eslint-disable-next-line no-unused-expressions
    const inputRefCurrent =
      inputFile2 && inputFile2.current ? inputFile2.current : null;
    // eslint-disable-next-line no-unused-expressions
    inputRefCurrent && inputRefCurrent.click();
  };
  const getFileName = async (e) => {
    if (e && e.files[0] && e.files[0].size > 10485760) {
      setShowError({
        ...showError,
        isShow: true,
        content: 'Dung lượng hình ảnh được giới hạn ở 10MB',
      });
    } else {
      setDataSubmit({ ...dataSubmit, logo: e.files[0] });
      setFileName(e.files[0].name);
      setUrlFileName1(
        (window.URL || window.webkitURL).createObjectURL(e.files[0])
      );
    }
  };
  const getFileName2 = async (e) => {
    if (e && e.files[0] && e.files[0].size > 10485760) {
      setShowError({
        ...showError,
        isShow: true,
        content: 'Dung lượng video được giới hạn ở 10MB',
      });
    } else {
      setDataSubmit({ ...dataSubmit, logo2: e.files[0] });
      setFileName2(e.files[0].name);
      setUrlFileName2(
        (window.URL || window.webkitURL).createObjectURL(e.files[0])
      );
    }
  };
  const handleSubmit = () => {
    const formData = new window.FormData();
    formData.append('constants[1][name]', 'name_company');
    formData.append('constants[1][value]', dataSubmit.nameWebsite);
    formData.append('constants[2][name]', 'description');
    formData.append('constants[2][value]', dataSubmit.description);
    formData.append('constants[3][name]', 'address');
    formData.append('constants[3][value]', dataSubmit.address);
    formData.append('constants[4][name]', 'phone');
    formData.append('constants[4][value]', dataSubmit.phone);
    formData.append('constants[5][name]', 'email');
    formData.append('constants[5][value]', dataSubmit.email);
    formData.append('constants[6][name]', 'facebook');
    formData.append('constants[6][value]', dataSubmit.facebook);
    formData.append('constants[7][name]', 'youTube');
    formData.append('constants[7][value]', dataSubmit.youtube);
    if (dataSubmit && dataSubmit.logo) {
      formData.append('constants[8][name]', 'logo');
      formData.append('constants[8][value]', dataSubmit && dataSubmit.logo);
      formData.append('constants[8][type]', true);
    }
    if (dataSubmit && dataSubmit.logo2) {
      formData.append('constants[9][name]', 'logoCongThuong');
      formData.append('constants[9][value]', dataSubmit && dataSubmit.logo2);
      formData.append('constants[9][type]', true);
    }
    createFooter(formData);
  };

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
              <Button customClass="button--primary" onClick={handleSubmit}>
                LƯU
              </Button>
            </Col>
            <Col xs={12} md={12}>
              <h1>Footer</h1>
              <div className="favicon">Logo</div>
              <div
                className="box__input"
                onClick={onButtonClick}
                onKeyDown={() => {}}
                tabIndex={0}
                role="button"
                style={{
                  backgroundImage: `url(${UrlFileName1})`,
                }}
              >
                <input
                  className="box__file"
                  type="file"
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
                  handleChange(e.target.value, 'nameWebsite');
                }}
                value={dataSubmit.nameWebsite}
                label="Tên công ty"
                placeholder="Nhập tên công ty"
              />
              <div className="favicon mt-3">Mô tả</div>
              <textarea
                onChange={(e) => {
                  handleChange(e.target.value, 'description');
                }}
                value={dataSubmit.description}
                placeholder="Nhập mô tả"
                rows={3}
              />
              <Input
                type="text"
                onChange={(e) => {
                  handleChange(e.target.value, 'address');
                }}
                value={dataSubmit.address}
                label="Địa chỉ"
                placeholder="Nhập địa chỉ"
              />
              <Input
                type="text"
                onChange={(e) => {
                  handleChange(e.target.value, 'phone');
                }}
                value={dataSubmit.phone}
                label="Liên hệ"
                placeholder="Nhập số điện thoại"
                customClassLabel="mt-3"
              />
              <Input
                type="text"
                onChange={(e) => {
                  handleChange(e.target.value, 'email');
                }}
                value={dataSubmit.email}
                label=""
                placeholder="Nhập email"
                customClassWrap="mt-2"
              />
              <div className="favicon mt-3">Liên kết</div>
              <div className="group-facebook">
                <img src={images.icon_fb} alt="" />
                <Input
                  type="text"
                  onChange={(e) => {
                    handleChange(e.target.value, 'facebook');
                  }}
                  value={dataSubmit.facebook}
                  label=""
                  placeholder="Nhập URL Facebook"
                />
              </div>
              <div className="group-facebook">
                <img src={images.icon_you} alt="" />
                <Input
                  type="text"
                  onChange={(e) => {
                    handleChange(e.target.value, 'youtube');
                  }}
                  value={dataSubmit.youtube}
                  label=""
                  placeholder="Nhập URL Youtube"
                />
              </div>
              <div className="favicon mt-3">Logo Bộ công thương</div>
              <div
                className="box__input"
                onClick={onButtonClick2}
                onKeyDown={() => {}}
                tabIndex={0}
                role="button"
                style={{
                  backgroundImage: `url(${UrlFileName2})`,
                }}
              >
                <input
                  className="box__file"
                  type="file"
                  ref={inputFile2}
                  accept="image/jpg, image/png, image/gif, capture=camera"
                  onChange={(e) => getFileName2(e.target)}
                />
                <label>
                  <strong>{fileName2 || 'Upload file'}</strong>
                </label>
              </div>
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

export default memo<Props>(DisplayFooter);
