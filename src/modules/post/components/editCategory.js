// @flow

import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Immutable from 'seamless-immutable';
import SelectDropdown from 'commons/components/Select';
import MainLayout from 'commons/components/MainLayout';
import Loading from 'commons/components/Loading';
import Button from 'commons/components/Button';
import Input from 'commons/components/Input';
import Table from 'commons/components/Table';
import { headCategory } from 'constants/itemHead';

type Props = {
  getListCategories: Function,
  dataCategories: Object,
  deleteCategories: Function,
  getListParent: Function,
  dataParent: Array<{
    id: number,
  }>,
  isProcessing: boolean,
  getCategoriesDetail: Function,
  match: {
    params: {
      id: string,
    },
  },
  categoriesDetail: Object,
  updateCategories: Function,
  type: string,
};

const UpdateCategoryPost = ({
  getListCategories,
  dataCategories,
  deleteCategories,
  getListParent,
  dataParent,
  isProcessing,
  getCategoriesDetail,
  match,
  categoriesDetail,
  updateCategories,
  type,
}: Props) => {
  const categoryId = match.params.id;
  const [dataRegister, setRegister] = useState({
    category: categoriesDetail?.name || '',
    slug: categoriesDetail?.slug || '',
    description: categoriesDetail?.description || '',
    parent: null,
  });
  const [listId, setListId] = useState([]);
  // call api get list parent
  useEffect(() => {
    getListParent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // call api get detail category
  useEffect(() => {
    getCategoriesDetail(categoryId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  // call api get list categories
  useEffect(() => {
    getListCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (
      type === 'UPDATE_CATEGORIES_SUCCESS' ||
      type === 'DELETE_CATEGORIES_SUCCESS'
    ) {
      getListCategories();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);
  const filterParent = dataParent.filter((obj) => {
    return obj.id === categoriesDetail.parent_id;
  });
  useEffect(() => {
    setRegister({
      ...dataRegister,
      category: categoriesDetail?.name || '',
      slug: categoriesDetail?.slug || '',
      description: categoriesDetail?.description || '',
      parent: filterParent[0],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesDetail]);

  const handleCheckBox = (id) => {
    let dataSubmit = [];
    if (listId.includes({ ...id }[0])) {
      dataSubmit = listId.filter((item) => item !== { ...id }[0]);
    } else {
      dataSubmit = [...listId, ...id];
    }
    setListId(dataSubmit);
  };
  const handleDelete = () => {
    deleteCategories({ arrayId: listId && listId.toString() });
  };
  const handleChange = (value, name) => {
    setRegister({
      ...dataRegister,
      [name]: value,
    });
  };

  const handleUpdateCategory = () => {
    updateCategories(categoryId, {
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
              <h2 className="title-page">Chỉnh sửa chuyên mục</h2>
            </Col>
            <Col xs={12} md={12} className="action-delete mb-4">
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
              </Col>
              <Col xs={12} md={12} className="action-register">
                <Button
                  customClass="button--primary"
                  onClick={handleUpdateCategory}
                  isDisabled={
                    dataRegister?.category.length === 0 ||
                    dataRegister?.slug.length === 0
                  }
                >
                  <p>LƯU THAY ĐỔI</p>
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
              />
            </Col>
          </Row>
        )}
      </Container>
    </MainLayout>
  );
};

export default UpdateCategoryPost;
