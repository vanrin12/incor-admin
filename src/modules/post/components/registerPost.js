// @flow

import React, { useState, useRef } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import SelectDropdown from 'commons/components/Select';
import MainLayout from 'commons/components/MainLayout';
import Button from 'commons/components/Button';
import Input from 'commons/components/Input';
import { vote } from '../../../mockData/dataSelect';

const RegisterPost = () => {
  const thumbnailFile = useRef({});
  const [fileName, setFileName] = useState(null);
  const [file, setFile] = useState('');
  const [dataRegister, setRegister] = useState({
    title: '',
    titleSeo: '',
    description: '',
    category: null,
  });
  const handleChange = (value, name) => {
    setRegister({
      ...dataRegister,
      [name]: value,
    });
  };

  const onButtonClick = () => {
    // `current` points to the mounted file input element
    const inputRefCurrent =
      thumbnailFile && thumbnailFile.current ? thumbnailFile.current : null;
    // eslint-disable-next-line no-unused-expressions
    inputRefCurrent && inputRefCurrent.click();
  };

  const fileToBase64 = (inputFileName) => {
    const fileNames = inputFileName.files[0];
    if (fileNames === undefined) return null;
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event && (event.target: window.HTMLInputElement).result);
      };
      reader.readAsDataURL(fileNames);
    });
  };

  const getFileName = async (e) => {
    setFileName(e.files[0]);
    const image = await fileToBase64(e);
    setFile(image);
  };
  console.log(fileName);

  return (
    <MainLayout activeMenu={2}>
      <Container fluid>
        <Row className="content-wrapper page-register-post page-register">
          <Col xs={12} md={12}>
            <Input
              label="TIÊU ĐỀ"
              type="text"
              onChange={(e) => {
                handleChange(e.target.value, 'title');
              }}
              maxLength="20"
              value={dataRegister.title}
              placeholder="Nhập tiêu đề tại đây"
            />
            <Col
              xs={12}
              md={12}
              className="action-delete text-left pl-0 pt-0 pb-3"
            >
              <Button customClass="button--primary" onClick={() => {}}>
                <p>THÊM MEDIA</p>
              </Button>
            </Col>
            <CKEditor
              editor={ClassicEditor}
              data=""
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                console.log({ event, editor, data });
              }}
              onBlur={(event, editor) => {
                console.log('Blur.', editor);
              }}
              onFocus={(event, editor) => {
                console.log('Focus.', editor);
              }}
            />
            <Input
              label="SEO TITLE"
              type="text"
              onChange={(e) => {
                handleChange(e.target.value, 'titleSeo');
              }}
              maxLength="20"
              value={dataRegister.titleSeo}
              placeholder="Nhập tiêu đề không quá 70 từ"
            />
            <p>MÔ TẢ</p>
            <textarea
              placeholder="Nhập mô tả cho bài viết"
              rows={5}
              onChange={(e) => {
                handleChange(e.target.value, 'description');
              }}
              value={dataRegister.description}
            />
          </Col>
          <Col xs={12} md={12}>
            <SelectDropdown
              label="CHUYÊN MỤC"
              placeholder="KHÁCH HÀNG"
              listItem={vote}
              onChange={(e) => {
                handleChange(e, 'category');
              }}
              option={dataRegister.category}
              customClass="select-vote"
            />
            <div className="thumbnail">
              <p>THUMBNAIL</p>
              {fileName && <img src={file} alt="thumbnail" />}
              <Col
                xs={12}
                md={12}
                className="action-delete text-left pl-0 pt-0"
              >
                <Button customClass="button--primary" onClick={onButtonClick}>
                  <p>CHỌN ẢNH</p>
                </Button>
                <input
                  type="file"
                  id="file"
                  style={{ display: 'none' }}
                  ref={thumbnailFile}
                  accept="image/jpg, image/jpeg, image/png, capture=camera"
                  onChange={(e) => getFileName(e.target)}
                />
              </Col>
            </div>
          </Col>
          <Col xs={12} md={12} className="action-register">
            <Button customClass="button--primary" onClick={() => {}}>
              <p>ĐĂNG BÀI</p>
            </Button>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default RegisterPost;
