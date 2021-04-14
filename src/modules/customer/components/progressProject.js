// @flow

import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Immutable from 'seamless-immutable';
import ReactPaginate from 'react-paginate';
import SelectDropdown from 'commons/components/Select';
import MainLayout from 'commons/components/MainLayout';
import Button from 'commons/components/Button';
import images from 'themes/images';
import Input from 'commons/components/Input';
import Table from 'commons/components/Table';
import Loading from 'commons/components/Loading';
import { headProgress } from 'constants/itemHead';
import { timeProject } from '../../../mockData/dataSelect';

type Props = {
  getDetailCustomer: Function,
  dataDetailCustomer: Object,
  dataAreas: Array<{
    id: number,
    value: string,
  }>,
  getListConstructionCustomer: Function,
  match: {
    params: {
      id: string,
    },
  },
  listConstructionCustomer: Object,
  registerConstructionCustomer: Function,
  listTableConstruction: Array<{
    id: number,
  }>,
  totalConstruction: number,
  getListParent: Function,
  dataParent: Array<{}>,
  type: string,
  isProcessing: boolean,
  getListAreas: Function,
  updateCustomer: Function,
};
const InformationNeeds = ({
  getDetailCustomer,
  dataDetailCustomer,
  dataAreas,
  getListConstructionCustomer,
  match,
  listConstructionCustomer,
  registerConstructionCustomer,
  listTableConstruction,
  totalConstruction,
  getListParent,
  dataParent,
  type,
  isProcessing,
  getListAreas,
  updateCustomer,
}: Props) => {
  const customerId = match.params && match.params.id;
  const [dataAddProject, setDataAddProject] = useState({
    category: '',
    partner_id: null,
    description: '',
    time: null,
    price: '',
    prices: '',
    note: '',
    project: null,
  });
  const areas = dataAreas.filter(
    (item) => item.id === dataDetailCustomer?.area_id
  );
  const [params, setParams] = useState({
    page: 1,
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [dataSubmit, setDataSubmit] = useState({
    nameProject: '',
    address: '',
    area: null,
    phone: '',
  });

  useEffect(() => {
    getDetailCustomer(customerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId]);

  const handleSelectPagination = (eventKey) => {
    setParams({ ...params, page: eventKey.selected + 1 });
    getListConstructionCustomer(customerId, { page: eventKey.selected + 1 });
  };

  useEffect(() => {
    getListParent();
    getListAreas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getListConstructionCustomer(customerId, params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId]);

  useEffect(() => {
    if (type === 'UPDATE_CUSTOMER_SUCCESS') {
      getDetailCustomer(customerId);
      setIsUpdate(false);
    }
    if (type === 'REGISTER_CONSTRUCTION_CUSTOMER_SUCCESS') {
      getListConstructionCustomer(customerId);
    }
    if (type === 'REGISTER_CONSTRUCTION_CUSTOMER_SUCCESS') {
      setDataAddProject({
        category: '',
        partner_id: null,
        description: '',
        time: null,
        price: '',
        prices: '',
        note: '',
        project: null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);
  const [sttTime, setSttTime] = useState(0);
  const [progressStart, setProgressStart] = useState(0);
  const [progressEnd, setProgressEnd] = useState(0);
  const handleChange = (value, name) => {
    setDataAddProject({
      ...dataAddProject,
      [name]: value,
    });
  };
  const listProject =
    dataDetailCustomer &&
    dataDetailCustomer.projects &&
    dataDetailCustomer.projects.map((item) => {
      return { id: item.id, value: item.name, label: item.name };
    });

  const handleRegister = () => {
    const data = {
      project_id: dataAddProject?.project?.id,
      partner_id: dataAddProject?.partner_id?.id,
      category: dataAddProject.category,
      description: dataAddProject.description,
      estimate: sttTime,
      construction_time: dataAddProject?.time?.value,
      unit: dataAddProject?.time?.value,
      progress_begin: progressStart,
      progress_end: progressEnd,
      paid: dataAddProject.prices,
      amount: dataAddProject.price,
      note: dataAddProject.note,
    };
    registerConstructionCustomer(data);
  };

  const handleChangeUpdate = (value, name) => {
    setDataSubmit({
      ...dataSubmit,
      [name]: value,
    });
  };

  useEffect(() => {
    setDataSubmit({
      nameCustomer: dataDetailCustomer.name || '',
      phone: dataDetailCustomer.phone || '',
      email: dataDetailCustomer.email || '',
      area: (areas && areas[0]) || null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDetailCustomer, customerId]);

  const handleUpdate = () => {
    updateCustomer(customerId, {
      name: dataSubmit?.nameCustomer,
      email: dataSubmit?.email,
      phone: dataSubmit?.phone,
      area_id: dataSubmit?.area?.id,
    });
  };

  return (
    <MainLayout activeMenu={4}>
      {isProcessing ? (
        <Loading />
      ) : (
        <Container fluid className="pl-0">
          <Row className="content-wrapper page-information page-progress">
            <Col xs={12} md={12} className="header-page">
              <img
                src={images.iconBack}
                alt=""
                className="action-increase"
                onClick={() => window.history.go(-1)}
                role="presentation"
              />
              <h2 className="title-page">Quản lý tiến độ công trình</h2>
            </Col>
            <Col xs={12} md={3}>
              {isUpdate ? (
                <Input
                  type="text"
                  onChange={(e) => {
                    handleChangeUpdate(e.target.value, 'nameCustomer');
                  }}
                  value={dataSubmit.nameCustomer}
                  label="Tên khách hàng"
                  placeholder="Tên khách hàng"
                />
              ) : (
                <>
                  <p className="page-progress__title-info">Tên khách hàng</p>
                  <h2 className="page-progress__content-info name">
                    {dataDetailCustomer.name}
                  </h2>
                </>
              )}
            </Col>
            <Col xs={12} md={3}>
              {isUpdate ? (
                <Input
                  type="text"
                  onChange={(e) => {
                    handleChangeUpdate(e.target.value, 'phone');
                  }}
                  value={dataSubmit.phone}
                  label="Số điện thoại"
                  placeholder="Số điện thoại"
                />
              ) : (
                <>
                  <p className="page-progress__title-info">Số điện thoại</p>
                  <h2 className="page-progress__content-info">
                    {dataDetailCustomer.phone}
                  </h2>
                </>
              )}
            </Col>
            <Col xs={12} md={3}>
              {isUpdate ? (
                <Input
                  type="text"
                  onChange={(e) => {
                    handleChangeUpdate(e.target.value, 'email');
                  }}
                  value={dataSubmit.email}
                  label="Email"
                  placeholder="Email"
                />
              ) : (
                <>
                  <p className="page-progress__title-info">Email</p>
                  <h2 className="page-progress__content-info">
                    {dataDetailCustomer.email}
                  </h2>
                </>
              )}
            </Col>
            <Col xs={12} md={3}>
              {isUpdate ? (
                <SelectDropdown
                  placeholder="Chọn tỉnh/thành phố"
                  listItem={dataAreas && Immutable.asMutable(dataAreas)}
                  onChange={(e) => {
                    handleChangeUpdate(e, 'area');
                  }}
                  option={dataSubmit.area}
                  customClass="select-headquarters"
                  label="khu vực"
                />
              ) : (
                <>
                  <p className="page-progress__title-info">Khu vực</p>
                  <h2 className="page-progress__content-info">
                    {areas[0] && areas[0].value}
                  </h2>
                </>
              )}
            </Col>
            <Col xs={12} md={12} className="action-delete">
              {isUpdate ? (
                <Button
                  customClass="button--primary"
                  onClick={() => handleUpdate()}
                >
                  <p>LƯU THAY ĐỔI</p>
                </Button>
              ) : (
                <Button
                  customClass="button--primary"
                  onClick={() => setIsUpdate(true)}
                >
                  <p>CHỈNH SỬA</p>
                </Button>
              )}
            </Col>
            <Col xs={12} md={4}>
              <SelectDropdown
                placeholder="Chọn dự án"
                listItem={listProject && Immutable.asMutable(listProject)}
                onChange={(e) => {
                  handleChange(e, 'project');
                }}
                option={dataAddProject.project}
                customClass="select-project"
                label="Chọn dự án"
              />
            </Col>
            <Col xs={12} md={12}>
              <div className="custom-head table-head-progress">
                <p>HẠNG MỤC / ĐƠN VỊ</p>
                <p>MÔ TẢ KỸ THUẬT</p>
                <p>DỰ TOÁN</p>
                <p>THỜI GIAN THI CÔNG</p>
                <p>TIẾN ĐỘ</p>
                <p>SỐ TIỀN ĐÃ THANH TOÁN</p>
                <p>GHI CHÚ</p>
              </div>
              <div className="custom-body table-body-progress">
                <div className="custom-body__item">
                  <SelectDropdown
                    placeholder="Nhập tên hạng mục"
                    listItem={dataParent && Immutable.asMutable(dataParent)}
                    onChange={(e) => {
                      handleChange(e, 'partner_id');
                    }}
                    option={dataAddProject.partner_id}
                    customClass="select-category"
                  />
                  {/* <textarea
                    onChange={(e) => {
                      handleChange(e.target.value, 'category');
                    }}
                    value={dataAddProject.category}
                    placeholder="Nhập tên hạng mục"
                  /> */}
                  <textarea
                    onChange={(e) => {
                      handleChange(e.target.value, 'category');
                    }}
                    value={dataAddProject.category}
                    placeholder="Nhập tên đơn vị"
                  />
                </div>
                <div className="custom-body__item">
                  <textarea
                    onChange={(e) => {
                      handleChange(e.target.value, 'description');
                    }}
                    value={dataAddProject.description}
                    placeholder="Nhập mô tả"
                  />
                </div>
                <div className="custom-body__item">
                  <textarea
                    onChange={(e) => {
                      handleChange(e.target.value, 'price');
                    }}
                    value={dataAddProject.price}
                    placeholder="Nhập số tiền"
                  />
                </div>
                <div className="custom-body__item action">
                  <div>
                    <img
                      src={images.iconBack}
                      alt=""
                      className="action-increase"
                      onClick={() => setSttTime(sttTime + 1)}
                      role="presentation"
                    />
                    <p>{sttTime}</p>
                    <img
                      src={images.iconBack}
                      alt=""
                      className="action__reduction"
                      onClick={() => sttTime !== 0 && setSttTime(sttTime - 1)}
                      role="presentation"
                    />
                  </div>
                  <SelectDropdown
                    placeholder="THÁNG"
                    listItem={timeProject}
                    onChange={(e) => {
                      handleChange(e, 'time');
                    }}
                    option={dataAddProject.time}
                    customClass="select-headquarters"
                  />
                </div>
                <div className="custom-body__item action-progress">
                  <div>
                    <img
                      src={images.iconBack}
                      alt=""
                      className="action-increase"
                      onClick={() => setProgressStart(progressStart + 1)}
                      role="presentation"
                    />
                    <p>{progressStart}</p>
                    <img
                      src={images.iconBack}
                      alt=""
                      className="action__reduction"
                      onClick={() =>
                        progressStart !== 0 &&
                        setProgressStart(progressStart - 1)
                      }
                      role="presentation"
                    />
                  </div>
                  <h3>/</h3>
                  <div>
                    <img
                      src={images.iconBack}
                      alt=""
                      className="action-increase"
                      onClick={() => setProgressEnd(progressEnd + 1)}
                      role="presentation"
                    />
                    <p>{progressEnd}</p>
                    <img
                      src={images.iconBack}
                      alt=""
                      className="action__reduction"
                      onClick={() =>
                        progressEnd !== 0 && setProgressEnd(progressEnd - 1)
                      }
                      role="presentation"
                    />
                  </div>
                </div>
                <div className="custom-body__item">
                  <textarea
                    onChange={(e) => {
                      handleChange(e.target.value, 'prices');
                    }}
                    value={dataAddProject.prices}
                    placeholder="Nhập số tiền"
                  />
                </div>
                <div className="custom-body__item">
                  <textarea
                    onChange={(e) => {
                      handleChange(e.target.value, 'note');
                    }}
                    value={dataAddProject.note}
                    placeholder="Nhập Ghi chú"
                  />
                </div>
              </div>
            </Col>
            <Col xs={12} md={12} className="action-delete">
              <Button
                customClass="button--primary"
                onClick={handleRegister}
                isDisabled={dataAddProject.project === null}
              >
                <p>THÊM MỚI</p>
              </Button>
            </Col>
            <Col xs={12} md={12} className="title-project">
              Dự án 1
            </Col>
            <Col xs={12} md={4}>
              <p className="page-progress__title-info">Tên dự án/ chủ đầu tư</p>
              <h2 className="page-progress__content-info">
                {listConstructionCustomer?.name}
              </h2>
            </Col>
            <Col xs={12} md={7}>
              <p className="page-progress__title-info">Địa chỉ công trình</p>
              <h2 className="page-progress__content-info">
                {listConstructionCustomer?.address}
              </h2>
            </Col>
            <Col xs={12} md={12} className="pt-3 table-progress-project">
              <Table
                tableHeads={headProgress}
                tableBody={listTableConstruction}
                showLabel
                isShowId
                isShowColumnBtn
                nameBtn2="Xem"
                // handleClickBtnView={handleViewInformation}
              />
            </Col>
            <Col sm={12} className="wrapper-pagination">
              <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                breakLabel={<span className="gap">...</span>}
                pageCount={Math.ceil(totalConstruction / 10)}
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
            </Col>
          </Row>
        </Container>
      )}
    </MainLayout>
  );
};

export default InformationNeeds;
