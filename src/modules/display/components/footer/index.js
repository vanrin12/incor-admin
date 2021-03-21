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
  createFooter: Function,
};

const DisplayFooter = ({ history, createFooter }: Props) => {
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
  const inputFile = useRef({});
  const inputFile2 = useRef({});
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
    if (e && e.files[0]) {
      setDataSubmit({ ...dataSubmit, logo: e.files[0] });
      setFileName(e.files[0].name);
    }
  };
  const getFileName2 = async (e) => {
    if (e && e.files[0]) {
      setDataSubmit({ ...dataSubmit, logo2: e.files[0] });
      setFileName2(e.files[0].name);
    }
  };
  console.log(dataSubmit.logo);
  const handleSubmit = () => {
    const formData = new window.FormData();
    formData.append('logo', dataSubmit.logo);
    formData.append('logo2', dataSubmit.logo2);
    const constant = [
      JSON.stringify({
        name: 'logo',
        value: formData.get('logo'),
        type: true,
      }),
      JSON.stringify({
        name: 'name_company',
        value: dataSubmit.nameWebsite,
      }),
      JSON.stringify({
        name: 'tagline',
        value: dataSubmit.tagline,
      }),
      JSON.stringify({
        name: 'description',
        value: dataSubmit.description,
      }),
      JSON.stringify({
        name: 'address',
        value: dataSubmit.address,
      }),
      JSON.stringify({
        name: 'phone',
        value: dataSubmit.phone,
      }),
      JSON.stringify({
        name: 'email',
        value: dataSubmit.email,
      }),
      JSON.stringify({
        name: 'facebook',
        value: dataSubmit.facebook,
      }),
      JSON.stringify({
        name: 'youTube',
        value: dataSubmit.youtube,
      }),
      JSON.stringify({
        name: 'logo2',
        value: formData.get('logo2'),
        type: true,
      }),
    ];
    createFooter(constant);
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
          <Col xs={12} md={12}>
            <h1>Footer</h1>
            <div className="favicon">Logo</div>
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
            >
              <input
                className="box__file"
                type="file"
                multiple
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
      </Container>
    </MainLayout>
  );
};

export default memo<Props>(DisplayFooter);
