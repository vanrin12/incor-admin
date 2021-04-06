// @flow

import React, { useState, useEffect, useRef } from 'react';
import Immutable from 'seamless-immutable';
import { Row, Col, Container } from 'react-bootstrap';
import SelectDropdown from 'commons/components/Select';
import MainLayout from 'commons/components/MainLayout';
import Button from 'commons/components/Button';
import images from 'themes/images';
import Input from 'commons/components/Input';

type Props = {
  getListSpaceType: Function,
  getListAreas: Function,
  dataAreas: Array<{}>,
  listSpaceType: Array<{}>,
  getListDivision: Function,
  listDivision: Array<{}>,
  registerProject: Function,
  match: {
    params: {
      id: string,
    },
  },
  type: string,
  history: {
    go: Function,
  },
  registerProjectItem: Function,
  projectId: any,
  resetData: Function,
};
const InformationNeeds = ({
  getListSpaceType,
  getListAreas,
  dataAreas,
  listSpaceType,
  getListDivision,
  listDivision,
  registerProject,
  match,
  type,
  history,
  registerProjectItem,
  projectId,
  resetData,
}: Props) => {
  const inputFile = useRef({});
  const userId = match.params.id;
  const [dataSubmit, setDataSubmit] = useState({
    nameProject: '',
    address: '',
    area: null,
    space: null,
    typeSpace: null,
  });
  const [dataAddCategories, setDataAddCategories] = useState({
    nameCategories: '',
    description: '',
    dvt: '',
    note: '',
  });
  const [total, setTotal] = useState(0);
  const [objFile, setObjFile] = useState(null);
  const [nameImage, setNameImage] = useState('');

  useEffect(() => {
    if (
      window.msPerformance ||
      window.webkitPerformance ||
      window.performance
    ) {
      resetData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getListSpaceType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getListAreas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (type === 'REGISTER_PROJECT_ITEM_SUCCESS') {
      history.go(-1);
    }
    if (type === 'REGISTER_PROJECT_SUCCESS') {
      setDataSubmit({
        nameProject: '',
        address: '',
        area: null,
        space: null,
        typeSpace: null,
      });
      setObjFile(null);
      setNameImage('');
    }
  }, [history, type]);

  useEffect(() => {
    if (dataSubmit?.space) {
      getListDivision({
        space_type_id: dataSubmit?.space?.id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSubmit && dataSubmit.space && dataSubmit.space.id]);

  const handleChange = (value, name) => {
    setDataSubmit({
      ...dataSubmit,
      [name]: value,
    });
    setDataAddCategories({
      ...dataAddCategories,
      [name]: value,
    });
  };

  useEffect(() => {
    setDataSubmit({
      ...dataSubmit,
      typeSpace: null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSubmit && dataSubmit.space && dataSubmit.space.id]);

  const getFileName = async (e) => {
    setObjFile(e.files[0]);
    setNameImage(e.files[0].name);
  };

  const onButtonClick = () => {
    // `current` points to the mounted file input element
    // eslint-disable-next-line no-unused-expressions
    const inputRefCurrent =
      inputFile && inputFile.current ? inputFile.current : null;
    // eslint-disable-next-line no-unused-expressions
    inputRefCurrent && inputRefCurrent.click();
  };

  const handleRegister = () => {
    const formData = new window.FormData();
    formData.append('name', dataSubmit.nameProject);
    formData.append('user_id', userId);
    formData.append('address', dataSubmit.address);
    formData.append('area_id', dataSubmit?.area?.id);
    formData.append('space_type_id', dataSubmit?.space?.id);
    formData.append('space_division_id', dataSubmit?.typeSpace?.id);
    formData.append('file', objFile);
    registerProject(formData);
  };

  const handleRegisterProjectItem = () => {
    registerProjectItem({
      name: dataAddCategories.nameCategories,
      project_id: projectId,
      description: dataAddCategories.description,
      amount: total,
      unit: dataAddCategories?.dvt,
      note: dataAddCategories?.note,
    });
  };
  return (
    <MainLayout activeMenu={4}>
      <Container fluid>
        <Row className="content-wrapper page-information">
          <Col xs={12} md={12}>
            <h2 className="title-page">Thông tin nhu cầu</h2>
          </Col>
          <Col xs={12} md={3}>
            <Input
              type="text"
              onChange={(e) => {
                handleChange(e.target.value, 'nameProject');
              }}
              value={dataSubmit.nameProject}
              label="Tên dự án/chủ đầu tư"
              placeholder="Tên khách hàng"
            />
          </Col>
          <Col xs={12} md={6}>
            <Input
              type="text"
              onChange={(e) => {
                handleChange(e.target.value, 'address');
              }}
              value={dataSubmit.address}
              label="Địa chỉ công trình"
              placeholder="Địa chỉ công trình"
            />
          </Col>
          <Col xs={12} md={3}>
            <SelectDropdown
              placeholder="Chọn tỉnh/thành phố"
              listItem={dataAreas && Immutable.asMutable(dataAreas)}
              onChange={(e) => {
                handleChange(e, 'area');
              }}
              option={dataSubmit.area}
              customClass="select-headquarters"
              label="khu vực"
            />
          </Col>
          <Col xs={12} md={6}>
            <SelectDropdown
              placeholder=""
              listItem={listSpaceType && Immutable.asMutable(listSpaceType)}
              onChange={(e) => {
                handleChange(e, 'space');
              }}
              option={dataSubmit.space}
              customClass="select-headquarters"
              label="Phân chia không gian"
            />
          </Col>
          <Col xs={12} md={6}>
            <SelectDropdown
              placeholder=""
              listItem={listDivision && Immutable.asMutable(listDivision)}
              onChange={(e) => {
                handleChange(e, 'typeSpace');
              }}
              option={dataSubmit.typeSpace}
              customClass="select-headquarters"
              label="Loại hình không gian"
              disabled={dataSubmit.space === null}
            />
          </Col>
          <Col xs={12} md={6}>
            <div className="group-image">
              <h2>Bản vẽ</h2>
              <p>{nameImage}</p>
              <input
                className="box__file d-none"
                type="file"
                ref={inputFile}
                accept="image/jpg, image/jpeg, image/png, capture=camera"
                onChange={(e) => getFileName(e.target)}
              />
              <Button customClass="button--primary" onClick={onButtonClick}>
                <p>CHỌN FILE</p>
              </Button>
            </div>
          </Col>
          <Col xs={12} md={12} className="action-delete">
            <Button customClass="button--primary" onClick={handleRegister}>
              <p>LƯU THAY ĐỔI</p>
            </Button>
          </Col>
          <Col xs={12} md={12}>
            <h2 className="title-project">Hạng mục chi tiết</h2>
            <div className="custom-head">
              <p>Tên hạng mục</p>
              <p>Mô tả kỹ thuật</p>
              <p>Số lượng</p>
              <p>ĐVT</p>
              <p>Ghi chú</p>
            </div>
            <div className="custom-body">
              <div className="custom-body__item">
                <textarea
                  onChange={(e) => {
                    handleChange(e.target.value, 'nameCategories');
                  }}
                  value={dataAddCategories.nameCategories}
                  placeholder="Nhập tên"
                  disabled={projectId === ''}
                />
              </div>
              <div className="custom-body__item">
                <textarea
                  onChange={(e) => {
                    handleChange(e.target.value, 'description');
                  }}
                  value={dataAddCategories.description}
                  placeholder="Nhập mô tả"
                  disabled={projectId === ''}
                />
              </div>
              <div className="custom-body__item action">
                <img
                  src={images.iconBack}
                  alt=""
                  className="action-increase"
                  onClick={() => projectId !== '' && setTotal(total + 1)}
                  role="presentation"
                />
                <p>{total}</p>
                <img
                  src={images.iconBack}
                  alt=""
                  className="action__reduction"
                  onClick={() =>
                    total !== 0 && projectId !== '' && setTotal(total - 1)
                  }
                  role="presentation"
                />
              </div>
              <div className="custom-body__item">
                <textarea
                  onChange={(e) => {
                    handleChange(e.target.value, 'dvt');
                  }}
                  value={dataAddCategories.dvt}
                  placeholder="Nhập đơn vị tính"
                  disabled={projectId === ''}
                />
              </div>
              <div className="custom-body__item">
                <textarea
                  onChange={(e) => {
                    handleChange(e.target.value, 'note');
                  }}
                  value={dataAddCategories.note}
                  placeholder="Nhập Ghi chú"
                  disabled={projectId === ''}
                />
              </div>
            </div>
          </Col>
          <Col xs={12} md={12} className="action-delete">
            <Button
              customClass="button--primary"
              onClick={handleRegisterProjectItem}
              isDisabled={
                dataAddCategories.nameCategories.length === 0 ||
                dataAddCategories.description.length === 0 ||
                total === 0 ||
                dataAddCategories.dvt.length === 0
              }
            >
              <p>THÊM MỚI</p>
            </Button>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default InformationNeeds;
