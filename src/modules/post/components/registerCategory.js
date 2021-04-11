// @flow

import React, { useState, memo, useEffect, useRef } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Immutable from 'seamless-immutable';
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
}: Props) => {
  const [dataRegister, setRegister] = useState({
    category: '',
    slug: '',
    description: '',
    parent: null,
  });
  const [listId, setListId] = useState([]);
  const inputFile = useRef({});
  const [objFile, setObjFile] = useState(null);
  const [nameImage, setNameImage] = useState('');

  // call api get list parent
  useEffect(() => {
    getListParent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // call api get list categories
  useEffect(() => {
    getListCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (type === 'DELETE_CATEGORIES_SUCCESS') {
      getListCategories();
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
    setObjFile(e.files[0]);
    setNameImage(e.files[0].name);
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
    console.log(objFile);
    registerCategories({
      name: dataRegister?.category,
      slug: dataRegister?.slug,
      description: dataRegister?.description,
      parent_id: dataRegister?.parent?.id || 0,
    });
  };

  return (
    <MainLayout activeMenu={2}>
      <Container fluid>
        {isProcessing ? (
          <Loading />
        ) : (
          <Row className="content-wrapper page-register-post">
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
              <Col xs={12} md={12}>
                <Input
                  label="Tên chuyên mục"
                  type="text"
                  onChange={(e) => {
                    handleChange(e.target.value, 'category');
                  }}
                  maxLength="20"
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
                  maxLength="20"
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
                <p>{nameImage}</p>
                <input
                  className="box__file d-none"
                  type="file"
                  ref={inputFile}
                  accept="image/jpg, image/jpeg, image/png, capture=camera"
                  onChange={(e) => getFileName(e.target)}
                />
                <div className="action-register pt-2">
                  <Button customClass="button--primary" onClick={onButtonClick}>
                    <p>CHỌN FILE</p>
                  </Button>
                </div>
              </Col>
              <Col xs={12} md={12} className="action-register">
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
            </Col>
          </Row>
        )}
      </Container>
    </MainLayout>
  );
};

export default memo<Props>(RegisterPost);
