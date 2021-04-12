// @flow

import React, { useState, memo, useEffect, useRef } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Immutable from 'seamless-immutable';
import ReactPaginate from 'react-paginate';
import SelectDropdown from 'commons/components/Select';
import MainLayout from 'commons/components/MainLayout';
import Loading from 'commons/components/Loading';
import Button from 'commons/components/Button';
import Input from 'commons/components/Input';
import Table from 'commons/components/Table';
import { headCategory } from 'constants/itemHead';
import ROUTERS from 'constants/router';

type Props = {
  history: {
    push: Function,
  },
  getListCategories: Function,
  dataCategories: Object,
  deleteCategories: Function,
  registerCategories: Function,
  getListParent: Function,
  dataParent: Array<{}>,
  isProcessing: boolean,
  type: string,
  totalCategory: number,
};
const RegisterPost = ({
  history,
  getListCategories,
  dataCategories,
  deleteCategories,
  registerCategories,
  getListParent,
  dataParent,
  isProcessing,
  type,
  totalCategory,
}: Props) => {
  const [dataRegister, setRegister] = useState({
    category: '',
    slug: '',
    description: '',
    parent: null,
  });
  const [listId, setListId] = useState([]);
  const inputFile = useRef({});
  const [objFile, setObjFile] = useState({
    imgUpload: '',
    imgView: '',
  });
  const [nameImage, setNameImage] = useState('');
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
  });
  // call api get list parent
  useEffect(() => {
    getListParent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // call api get list categories
  useEffect(() => {
    getListCategories({
      page: 1,
      pageSize: 10,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (type === 'DELETE_CATEGORIES_SUCCESS') {
      getListCategories();
    }
    if (type === 'REGISTER_CATEGORIES_SUCCESS') {
      getListCategories();
      setRegister({
        category: '',
        slug: '',
        description: '',
        parent: null,
      });
      setNameImage('');
      setObjFile({
        imgUpload: '',
        imgView: '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const handleCheckBox = (id) => {
    let dataSubmit = [];
    if (listId.includes({ ...id }[0])) {
      dataSubmit = listId.filter((item) => item !== { ...id }[0]);
    } else {
      dataSubmit = [...listId, ...id];
    }
    setListId(dataSubmit);
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
    if (e && e.files && e.files[0]) {
      setObjFile({
        imgView: (window.URL || window.webkitURL).createObjectURL(e.files[0]),
        imgUpload: e.files[0],
      });
      setNameImage(e.files[0].name);
    }
  };

  const handleSelectPagination = (eventKey) => {
    setParams({ ...params, page: eventKey.selected + 1 });
    const paramsRequest = { ...params, page: eventKey.selected + 1 };
    getListCategories(paramsRequest);
  };

  const handleChange = (value, name) => {
    setRegister({
      ...dataRegister,
      [name]: value,
    });
  };

  const handleDelete = () => {
    deleteCategories({ arrayId: listId && listId.toString() });
  };

  const handleViewDetail = (item) => {
    history.push(`${ROUTERS.UPDATE_CATEGORY}/${item.id}`);
  };

  const handleRegisterCategory = () => {
    const formData = new window.FormData();
    formData.append('name', dataRegister?.category);
    formData.append('slug', dataRegister?.slug);
    formData.append('description', dataRegister?.description);
    formData.append('parent_id', dataRegister?.parent?.id || 0);
    if (objFile?.imgUpload) {
      formData.append('image', objFile?.imgUpload);
    }
    registerCategories(formData);
  };

  return (
    <MainLayout activeMenu={2}>
      <Container fluid className="pl-0">
        {isProcessing ? (
          <Loading />
        ) : (
          <Row className="content-wrapper page-register-post page-register-category">
            <Col xs={12} md={12}>
              <h2 className="title-page">Thêm chuyên mục</h2>
            </Col>
            <Col xs={12} md={12} className="action-delete mb-4 ">
              <Button
                customClass="button--primary"
                onClick={handleDelete}
                isDisabled={listId.length === 0}
              >
                <p>XÓA</p>
              </Button>
            </Col>
            <Col xs={12} md={6}>
              <Col xs={12} md={12} className="pl-0">
                <Input
                  label="Tên chuyên mục"
                  type="text"
                  onChange={(e) => {
                    handleChange(e.target.value, 'category');
                  }}
                  value={dataRegister.category}
                  placeholder="Nhập tên chuyên mục"
                />
                <h4>Tên chuyên mục sẽ xuất hiện trên web</h4>
                <Input
                  label="Slug"
                  type="text"
                  onChange={(e) => {
                    handleChange(e.target.value, 'slug');
                  }}
                  value={dataRegister.slug}
                  placeholder="Nhập tên chuyên mục"
                />
                <h4>Phần hiển thị chuyên mục trên URL</h4>
                <p>Mô tả</p>
                <textarea
                  placeholder="Nhập tên chuyên mục"
                  rows={5}
                  onChange={(e) => {
                    handleChange(e.target.value, 'description');
                  }}
                  value={dataRegister.description}
                />
                <SelectDropdown
                  label="Parent"
                  placeholder="Không"
                  listItem={dataParent && Immutable.asMutable(dataParent)}
                  onChange={(e) => {
                    handleChange(e, 'parent');
                  }}
                  option={dataRegister.parent}
                  customClass="select-vote"
                />
                <div className="d-flex align-items-center">
                  <div>
                    <p>{nameImage}</p>
                    <input
                      className="box__file d-none"
                      type="file"
                      ref={inputFile}
                      accept="image/jpg, image/jpeg, image/png, capture=camera"
                      onChange={(e) => getFileName(e.target)}
                    />
                    <div className="action-register pt-2">
                      <Button
                        customClass="button--primary"
                        onClick={onButtonClick}
                      >
                        <p>CHỌN FILE</p>
                      </Button>
                    </div>
                  </div>
                  {objFile?.imgView && (
                    <div
                      className="image-category"
                      style={{
                        backgroundImage: `url(${objFile?.imgView})`,
                      }}
                    />
                  )}
                </div>
              </Col>
              <Col xs={12} md={12} className="action-register pl-0">
                <Button
                  customClass="button--primary"
                  onClick={handleRegisterCategory}
                  isDisabled={
                    dataRegister?.category.length === 0 ||
                    dataRegister?.slug.length === 0
                  }
                >
                  <p>TẠO CHUYÊN MỤC</p>
                </Button>
              </Col>
            </Col>
            <Col xs={12} md={6}>
              <Table
                tableHeads={headCategory}
                tableBody={dataCategories}
                showLabel
                isShowId
                isShowColumnCheck
                handleCheckBox={handleCheckBox}
                listId={listId}
                isShowColumnBtnStatus
                onClickRow={handleViewDetail}
              />
              <div className="wrapper-pagination">
                <ReactPaginate
                  previousLabel="Previous"
                  nextLabel="Next"
                  breakLabel={<span className="gap">...</span>}
                  pageCount={Math.ceil(totalCategory / 10)}
                  onPageChange={(eventKey) => handleSelectPagination(eventKey)}
                  forcePage={params.page - 1 || 0}
                  containerClassName="pagination"
                  disabledClassName="disabled"
                  activeClassName="active"
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  marginPagesDisplayed={1}
                  nextLinkClassName="page-link"
                />
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </MainLayout>
  );
};

export default memo<Props>(RegisterPost);
