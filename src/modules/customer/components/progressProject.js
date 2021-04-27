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
import Loading from 'commons/components/Loading';
import { ModalPopup } from 'commons/components/Modal';
import { timeProject } from '../../../mockData/dataSelect';

import ItemProgressProject from './ItemProgressProject';

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
  registerConstructionCustomer: Function,
  totalConstruction: number,
  getListParent: Function,
  type: string,
  isProcessing: boolean,
  getListAreas: Function,
  updateCustomer: Function,
  listHashtag: Array<{}>,
  getDataFooter: Function,
  listTableConstructionProject: Array<{
    id: number,
  }>,
  getNamePartner: Function,
  listNamePartner: Array<{
    id: Number,
    value: string,
  }>,
};
const InformationNeeds = ({
  getDetailCustomer,
  dataDetailCustomer,
  dataAreas,
  getListConstructionCustomer,
  match,
  registerConstructionCustomer,
  totalConstruction,
  getListParent,
  type,
  isProcessing,
  getListAreas,
  updateCustomer,
  listHashtag,
  getDataFooter,
  listTableConstructionProject,
  getNamePartner,
  listNamePartner,
}: Props) => {
  const customerId = match.params && match.params.id;
  const [dataAddProject, setDataAddProject] = useState({
    name: null,
    partner_id: null,
    description: '',
    time: null,
    price: '',
    prices: '',
    note: '',
    project: null,
  });
  const [isShowError, setIsShowError] = useState({
    isShow: false,
    content: '',
  });
  const areas = dataAreas.filter(
    (item) => item.id === dataDetailCustomer?.area_id
  );
  const [params, setParams] = useState({
    page: 1,
    paged: 10,
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [dataSubmit, setDataSubmit] = useState({
    nameProject: '',
    address: '',
    area: null,
    phone: '',
    email: '',
    nameCustomer: '',
  });

  const [valueHashtag, setValueHashtag] = useState([]);
  const [sttTime, setSttTime] = useState(0);
  const [progressStart, setProgressStart] = useState(0);
  const [progressEnd, setProgressEnd] = useState(0);

  // get list name partner
  useEffect(() => {
    getNamePartner(2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    getDataFooter();
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
      setDataAddProject({
        name: null,
        partner_id: null,
        description: '',
        time: null,
        price: '',
        prices: '',
        note: '',
        project: null,
      });
    }
    setValueHashtag([]);
    setSttTime(0);
    setProgressStart(0);
    setProgressEnd(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const handleChange = (value, name) => {
    let names = [];
    if (name === 'hashtag') {
      names =
        (value &&
          value.length &&
          value.map((item) => {
            return item.label;
          })) ||
        [];
      setValueHashtag(names);
    }
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
      description: dataAddProject.description,
      name: dataAddProject?.name?.value,
      estimate: sttTime,
      construction_time: dataAddProject?.time?.value,
      unit: dataAddProject?.time?.value,
      progress_begin: progressStart,
      progress_end: progressEnd,
      paid: dataAddProject.prices,
      amount: dataAddProject.price,
      note: dataAddProject.note,
      category: valueHashtag && valueHashtag.toString(),
    };
    if (
      dataAddProject?.project?.id &&
      dataAddProject.description &&
      sttTime &&
      dataAddProject?.time?.value &&
      progressStart &&
      progressEnd &&
      dataAddProject.prices &&
      dataAddProject.price &&
      dataAddProject.note &&
      valueHashtag?.length > 0
    ) {
      registerConstructionCustomer(data);
    } else {
      setIsShowError({
        ...isShowError,
        isShow: true,
        content: 'Vui lòng điền đầy đủ thông tin.',
      });
    }
  };

  const handleChangeUpdate = (value, name) => {
    setDataSubmit({
      ...dataSubmit,
      [name]: value,
    });
  };

  useEffect(() => {
    setDataSubmit({
      nameCustomer: dataDetailCustomer.full_name || '',
      phone: dataDetailCustomer.phone || '',
      email: dataDetailCustomer.email || '',
      area: (areas && areas[0]) || null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDetailCustomer, customerId]);

  const handleUpdate = () => {
    updateCustomer(customerId, {
      full_name: dataSubmit?.nameCustomer,
      email: dataSubmit?.email,
      phone: dataSubmit?.phone,
      area_id: dataSubmit?.area?.id,
    });
  };

  const defaultOption =
    valueHashtag && valueHashtag.length > 0
      ? valueHashtag.map((item, index) => {
          return {
            id: index + 1,
            value: item,
            label: item,
          };
        })
      : null;

  const renderListTableConstructionProject =
    listTableConstructionProject &&
    listTableConstructionProject.length > 0 &&
    listTableConstructionProject.map((item, index) => (
      <ItemProgressProject
        key={item.id}
        dataObj={item}
        indexProject={index + 1}
      />
    ));

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
                    {dataDetailCustomer.full_name}
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
                <div className="custom-body__item hashtag">
                  <SelectDropdown
                    placeholder="Chọn hashtag"
                    listItem={listHashtag && Immutable.asMutable(listHashtag)}
                    onChange={(e) => {
                      handleChange(e, 'hashtag');
                    }}
                    isMulti
                    option={defaultOption}
                  />
                  <SelectDropdown
                    placeholder="Tên đơn vị"
                    listItem={
                      listNamePartner && Immutable.asMutable(listNamePartner)
                    }
                    onChange={(e) => {
                      handleChange(e, 'name');
                    }}
                    option={dataAddProject?.name}
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
            {renderListTableConstructionProject}

            <Col sm={12} className="wrapper-pagination d-none">
              {/* TODO UPDATE */}
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

      <ModalPopup
        isOpen={isShowError.isShow}
        isShowFooter
        handleClose={() => {
          setIsShowError({ ...isShowError, isShow: false });
        }}
        handleSubmit={() => {
          setIsShowError({ ...isShowError, isShow: false });
        }}
        textBtnRight="ĐÓNG"
      >
        {isShowError.content}
      </ModalPopup>
    </MainLayout>
  );
};

export default InformationNeeds;
