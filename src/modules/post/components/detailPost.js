// @flow

import React, { useState, useRef, memo, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Immutable from 'seamless-immutable';
import moment from 'moment';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import SelectDropdown from 'commons/components/Select';
import MainLayout from 'commons/components/MainLayout';
import Button from 'commons/components/Button';
import Loading from 'commons/components/Loading';
import Input from 'commons/components/Input';
import Modal from 'commons/components/Modal';
import ROUTERS from 'constants/router';

type Props = {
  updatePost: Function,
  getListAllCategories: Function,
  listAllCategories: Array<{}>,
  errorMsg: string,
  type: string,
  history: {
    push: Function,
  },
  match: {
    params: {
      id: string,
    },
  },
  getPostDetail: Function,
  dataPostDetail: Object,
  listCategoryPost: Object,
  isProcessing: boolean,
};

const DetailPost = ({
  updatePost,
  getListAllCategories,
  listAllCategories,
  errorMsg,
  type,
  history,
  match,
  getPostDetail,
  dataPostDetail,
  listCategoryPost,
  isProcessing,
}: Props) => {
  const postId = match.params.id;
  const thumbnailFile = useRef({});
  const [content, setContent] = useState(dataPostDetail.content);
  const [createDate, setCreateDate] = useState(null);
  const [isStatus, setIsStatus] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isShowError, setIsShowError] = useState({
    isOpen: false,
    content: '',
  });
  const [objFile, setObjFile] = useState(null);
  const [file, setFile] = useState(dataPostDetail.image);
  const [status, setStatus] = useState('Y');
  const [show, setShow] = useState('Y');
  const [dataRegister, setRegister] = useState({
    title: dataPostDetail?.name,
    titleSeo: dataPostDetail?.seo_title,
    description: dataPostDetail?.description,
    category: listCategoryPost,
    status: dataPostDetail?.status,
    show: dataPostDetail?.show,
  });
  useEffect(() => {
    getPostDetail(postId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  useEffect(() => {
    setRegister({
      title: dataPostDetail?.name,
      titleSeo: dataPostDetail?.seo_title,
      description: dataPostDetail?.description,
      category: listCategoryPost,
      status: dataPostDetail?.status,
      show: dataPostDetail?.show,
    });
    setFile(dataPostDetail?.image);
    setContent(dataPostDetail?.content);
    setStatus(dataPostDetail?.status);
    setShow(dataPostDetail?.show);
  }, [dataPostDetail, listCategoryPost]);

  const handleChange = (value, name) => {
    setRegister({
      ...dataRegister,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setCreateDate(date);
  };

  useEffect(() => {
    if (type === 'UPDATE_POST_FAILED') {
      setIsShowError({ isOpen: true, content: errorMsg });
    }
    if (type === 'UPDATE_POST_SUCCESS') {
      history.push(ROUTERS.POST);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMsg, type]);

  // call api get list all category
  useEffect(() => {
    getListAllCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    setObjFile(e.files[0]);
    const image = await fileToBase64(e);
    setFile(image);
  };
  const handleSubmit = () => {
    const formData = new window.FormData();
    formData.append('name', dataRegister.title);
    formData.append('content', content);
    formData.append('seo_title', dataRegister.titleSeo);
    formData.append('comment', dataRegister.description);
    formData.append('category_id', dataRegister?.category?.id);
    formData.append('image', objFile);
    formData.append('status', status);
    formData.append('show', show);
    formData.append(
      'calendar',
      createDate && moment(createDate).format('YYYY-MM-DD HH:mm:ss')
    );
    formData.append('type', 'Y');
    formData.append('_method', 'put');
    updatePost(postId, formData);
  };
  const handleDraft = () => {
    const formData = new window.FormData();
    formData.append('name', dataRegister.title);
    formData.append('content', content);
    formData.append('seo_title', dataRegister.titleSeo);
    formData.append('comment', dataRegister.description);
    formData.append('category_id', dataRegister?.category?.id);
    formData.append('image', objFile);
    formData.append('status', status);
    formData.append('show', show);
    formData.append(
      'calendar',
      createDate && moment(createDate).format('YYYY-MM-DD HH:mm:ss')
    );
    formData.append('type', 'N');
    formData.append('_method', 'put');
    updatePost(postId, formData);
  };
  return (
    <MainLayout activeMenu={2}>
      {isProcessing ? (
        <Loading />
      ) : (
        <Container fluid>
          <Row className="content-wrapper page-register-post page-register">
            <Col xs={12} md={7}>
              <Input
                label="TIÊU ĐỀ"
                type="text"
                onChange={(e) => {
                  handleChange(e.target.value, 'title');
                }}
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
                data={content}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setContent(data);
                }}
              />
              <Input
                label="SEO TITLE"
                type="text"
                onChange={(e) => {
                  handleChange(e.target.value, 'titleSeo');
                }}
                maxLength="70"
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
            <Col xs={12} md={5}>
              <SelectDropdown
                label="CHUYÊN MỤC"
                placeholder="KHÁCH HÀNG"
                listItem={
                  listAllCategories && Immutable.asMutable(listAllCategories)
                }
                onChange={(e) => {
                  handleChange(e, 'category');
                }}
                option={dataRegister.category}
                customClass="select-category"
              />
              <div className="thumbnail">
                <p>THUMBNAIL</p>
                {file && (
                  <img src={file} alt="thumbnail" className="image-thumbnail" />
                )}
                <Col xs={12} md={12} className="action-delete pl-0 pt-0">
                  {!file && <div className="box-image" />}

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
              <div className="box-status">
                <p>
                  Trạng thái: {status === 'Y' ? 'Đã xuất bản' : 'Chưa xuất bản'}
                  <span
                    onClick={() => {
                      setIsStatus(true);
                    }}
                    role="presentation"
                  >
                    Edit
                  </span>
                </p>
                <p>
                  Hiển thị: {show === 'Y' ? 'Hiện bài viết' : 'Ẩn bài viết'}
                  <span
                    onClick={() => {
                      setIsShow(true);
                    }}
                    role="presentation"
                  >
                    Edit
                  </span>
                </p>
                <p>
                  Lên lịch:
                  <DatePicker
                    selected={createDate}
                    placeholderText="Chọn thời gian"
                    // onSelect={handleDateSelect} //when day is clicked
                    onChange={(date) => handleDateChange(date)}
                  />
                </p>
                <div className="group-action">
                  <p className="mr-auto view-post">Xem bài viết</p>
                  <div
                    className="draft"
                    onClick={handleDraft}
                    onKeyDown={() => {}}
                    role="button"
                    tabIndex={0}
                  >
                    Lưu nháp
                  </div>
                  <Button customClass="button--primary" onClick={handleSubmit}>
                    <p>ĐĂNG BÀI</p>
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      )}

      <Modal
        isOpen={isStatus}
        isShowFooter
        handleClose={() => {
          setIsStatus(false);
          setStatus('N');
        }}
        handleSubmit={() => {
          setIsStatus(false);
          setStatus('Y');
        }}
        textBtnRight="KHÔNG"
        isShowTwoBtn
        textBtnLeft="CÓ"
      >
        Cho hiển thị trạng thái bài viết
      </Modal>
      <Modal
        isOpen={isShow}
        isShowFooter
        handleClose={() => {
          setIsShow(false);
          setShow('N');
        }}
        handleSubmit={() => {
          setIsShow(false);
          setShow('Y');
        }}
        textBtnRight="KHÔNG"
        isShowTwoBtn
        textBtnLeft="CÓ"
      >
        Cho hiển thị bài viết
      </Modal>
      <Modal
        isOpen={isShowError.isOpen}
        isShowFooter
        handleClose={() => {
          setIsShowError({ ...isShowError, isOpen: false });
        }}
        handleSubmit={() => {
          setIsShowError({ ...isShowError, isOpen: false });
        }}
        textBtnRight="ĐÓNG"
      >
        {isShowError.content}
      </Modal>
    </MainLayout>
  );
};

export default memo<Props>(DetailPost);
