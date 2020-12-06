// @flow

import React, { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import SelectDropdown from 'commons/components/Select';
import MainLayout from 'commons/components/MainLayout';
import Button from 'commons/components/Button';
import Input from 'commons/components/Input';
import Table from 'commons/components/Table';
import { headCategory } from 'constants/itemHead';
import { vote } from '../../../mockData/dataSelect';
import { listDataCategory } from '../../../mockData/listDataTable';

const Post = () => {
  const [dataRegister, setRegister] = useState({
    category: '',
    slug: '',
    description: '',
    parent: null,
  });
  const [listId, setListId] = useState([]);
  const handleCheckBox = (id) => {
    let dataSubmit = [];
    if (listId.includes({ ...id }[0])) {
      dataSubmit = listId.filter((item) => item !== { ...id }[0]);
    } else {
      dataSubmit = [...listId, ...id];
    }
    setListId(dataSubmit);
  };
  const handleChange = (value, name) => {
    setRegister({
      ...dataRegister,
      [name]: value,
    });
  };

  return (
    <MainLayout activeMenu={2}>
      <Container fluid>
        <Row className="content-wrapper page-register-post">
          <Col xs={12} md={12}>
            <h2 className="title-page">Chỉnh sửa chuyên mục</h2>
          </Col>
          <Col xs={12} md={12} className="action-delete mb-4">
            <Button customClass="button--primary" onClick={() => {}}>
              <p>XÓA</p>
            </Button>
          </Col>
          <Col xs={12} md={8}>
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
                listItem={vote}
                onChange={(e) => {
                  handleChange(e, 'parent');
                }}
                option={dataRegister.parent}
                customClass="select-vote"
              />
            </Col>
            <Col xs={12} md={12} className="action-register">
              <Button customClass="button--primary" onClick={() => {}}>
                <p>LƯU THAY ĐỔI</p>
              </Button>
            </Col>
          </Col>
          <Col xs={12} md={4}>
            <Table
              tableHeads={headCategory}
              tableBody={listDataCategory}
              showLabel
              isShowId
              isShowColumnCheck
              handleCheckBox={handleCheckBox}
              listId={listId}
              isShowColumnBtnStatus
            />
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default Post;
