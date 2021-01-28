// @flow

import React, { useState, useRef, memo, useEffect } from 'react';
import { Row, Col, Container, Tabs, Tab } from 'react-bootstrap';
import SelectDropdown from 'commons/components/Select';
import ReactPaginate from 'react-paginate';
import MainLayout from 'commons/components/MainLayout';
import Button from 'commons/components/Button';
import Table from 'commons/components/Table';
import Input from 'commons/components/Input';
import Modal from 'commons/components/Modal';
import IMAGES from 'themes/images';
import Loading from 'commons/components/Loading';
import { headPartnerManagement } from 'constants/itemHead';
import { headquarters, job, vote } from '../../../mockData/dataSelect';

type Props = {
  isProcessing: boolean,
  getListPartnerManagement: Function,
  dataQuotes: Array<{
    id: number,
  }>,
  dataProducts: Array<{
    name: string,
    image: string,
  }>,
  dataConstructions: Array<{
    name: string,
    image: string,
  }>,
  // totalPartnerManagement: number,
  dataPartnerManagement: Object,
  match: {
    params: {
      id: string,
    },
  },
};

const Customer = ({
  isProcessing,
  getListPartnerManagement,
  dataQuotes,
  dataProducts,
  dataConstructions,
  // totalPartnerManagement,
  dataPartnerManagement,
  match,
}: Props) => {
  const partnerId = match.params.id;
  const [isOpenAddConstruction, setIsOpenAddConstruction] = useState(false);
  const [isShowDetailConstruction, setIsShowDetailConstruction] = useState(
    false
  );
  const [dataFilter, setDataFilter] = useState({
    headquarters: null,
    job: null,
    vote: null,
    name: '',
    address: '',
  });
  const [dataAddProduct, setDataAddProduct] = useState({
    name: '',
    description: '',
    hashtag: '',
    image: null,
  });
  const [keySearch, setKeySearch] = useState('');
  const [construction, setConstruction] = useState('');
  const [isShow, setIsShow] = useState(false);
  const [fileName, setFileName] = useState('');
  const inputFile = useRef({});

  // call api get list partner management
  useEffect(() => {
    getListPartnerManagement(partnerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partnerId]);
  const handleChange = (value, name) => {
    setDataFilter({
      ...dataFilter,
      [name]: value,
    });
    setDataAddProduct({
      ...dataAddProduct,
      [name]: value,
    });
  };
  const handleKeySearch = (value) => {
    setKeySearch(value);
  };
  const getDetailConstruction = () => {
    setIsShowDetailConstruction(true);
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
    setDataAddProduct({ ...dataAddProduct, favicon: e.files[0] });
    setFileName(e.files[0].name);
  };
  const renderProduct =
    dataProducts &&
    dataProducts.map((item) => {
      const styleBackground = {
        backgroundImage: `url(${item.image})`,
      };
      return (
        <div className="product" style={styleBackground}>
          <p>{item.name}</p>
        </div>
      );
    });
  const renderConstructions =
    dataConstructions &&
    dataConstructions.map((item) => {
      const styleBackground = {
        backgroundImage: `url(${item.image})`,
      };
      return (
        <div
          className="product"
          onClick={getDetailConstruction}
          role="button"
          tabIndex={0}
          onKeyDown={() => {}}
          style={styleBackground}
        >
          <p>{item.name}</p>
        </div>
      );
    });
  const styleAvatar = {
    backgroundImage: `url(${dataPartnerManagement.company_image})`,
  };
  return (
    <MainLayout activeMenu={3}>
      {isProcessing ? (
        <Loading />
      ) : (
        <Container fluid>
          <Row className="content-wrapper page-partner page-post page-partner-management">
            <Col xs={12} md={2}>
              <div className="avatar" style={styleAvatar}>
                <p>THAY ẢNH</p>
              </div>
            </Col>
            {dataPartnerManagement.company_name ? (
              <>
                <Col xs={12} md={4} className="box-info-partner">
                  <h2>Tên doanh nghiệp</h2>
                  <h1>{dataPartnerManagement.company_name}</h1>
                  <Row>
                    <Col xs={12} md={6}>
                      <h2>Quy mô nhân sự</h2>
                      <p>{dataPartnerManagement.scale_name} người</p>
                    </Col>
                    <Col xs={12} md={6}>
                      <h2>Mã số thuế</h2>
                      <p>{dataPartnerManagement.company_tax_code}</p>
                    </Col>
                  </Row>
                </Col>
                <Col xs={12} md={4} className="box-info-partner">
                  <h2>Trụ sở</h2>
                  <h4>{dataPartnerManagement.company_address}</h4>
                  <h2>Ngành nghề</h2>
                  <div className="list-tag">
                    {dataPartnerManagement &&
                      dataPartnerManagement.company_career &&
                      dataPartnerManagement.company_career
                        .split(',')
                        .map((item) => {
                          return <span>#{item}</span>;
                        })}
                  </div>
                </Col>
              </>
            ) : (
              <>
                <Col xs={12} md={4}>
                  <Row>
                    <Col xs={12} md={12}>
                      <Input
                        type="text"
                        onChange={(e) => {
                          handleChange(e.target.value, 'name');
                        }}
                        maxLength="20"
                        value={dataFilter.name}
                        placeholder="Nhập tên doanh nghiệp"
                        label="Tên doanh nghiệp"
                        customClass="name-account"
                      />
                    </Col>
                    <Col xs={12} md={6}>
                      <SelectDropdown
                        placeholder="Chọn quy mô"
                        listItem={headquarters}
                        onChange={(e) => {
                          handleChange(e, 'headquarters');
                        }}
                        option={dataFilter.headquarters}
                        customClass="select-headquarters"
                        label="Quy mô nhân sự"
                      />
                    </Col>
                    <Col xs={12} md={6}>
                      <SelectDropdown
                        placeholder="Nhập mã số thuế"
                        listItem={job}
                        onChange={(e) => {
                          handleChange(e, 'job');
                        }}
                        option={dataFilter.job}
                        customClass="select-headquarters"
                        label="Mã số thuế"
                      />
                    </Col>
                  </Row>
                </Col>
                <Col xs={12} md={4}>
                  <Row>
                    <Col xs={12} md={12}>
                      <Input
                        type="text"
                        onChange={(e) => {
                          handleChange(e.target.value, 'name');
                        }}
                        maxLength="20"
                        value={dataFilter.address}
                        placeholder="Nhập địa chỉ công ty"
                        label="Trụ sở"
                        customClass="name-account"
                      />
                    </Col>
                    <Col xs={12} md={12}>
                      <SelectDropdown
                        placeholder="Chọn hashtag"
                        listItem={vote}
                        onChange={(e) => {
                          handleChange(e, 'vote');
                        }}
                        option={dataFilter.vote}
                        customClass="select-vote"
                        label="Ngành nghề"
                        isMulti
                      />
                    </Col>
                  </Row>
                </Col>
              </>
            )}

            <Col xs={12} md={2}>
              {dataPartnerManagement.company_name ? (
                <Button customClass="button--primary" onClick={() => {}}>
                  <p>CHỈNH SỬA</p>
                </Button>
              ) : (
                <Button customClass="button--primary" onClick={() => {}}>
                  <p>LƯU THAY ĐỔI</p>
                </Button>
              )}
            </Col>

            <Tabs
              defaultActiveKey="tab1"
              className="partner__tab col-12"
              // onSelect={(eventKey) => onSelect(eventKey)}
            >
              <Tab eventKey="tab1" title="Báo giá">
                <Col xs={12} md={12} className="form-search">
                  <div className="form-search__right">
                    <Input
                      type="text"
                      onChange={(e) => {
                        handleKeySearch(e.target.value);
                      }}
                      maxLength="20"
                      value={keySearch}
                    />
                    <Button
                      customClass="button--primary mt-0"
                      onClick={() => {}}
                    >
                      <p>TÌM</p>
                    </Button>
                  </div>
                </Col>
                <Col xs={12} md={12} className="table-page table-partner">
                  <Table
                    tableHeads={headPartnerManagement}
                    tableBody={dataQuotes}
                    showLabel
                    isShowId
                    isShowColumnBtn1
                    nameBtn1="Xem"
                    isShowColumnBtn
                    nameBtn2="Báo giá"
                  />
                </Col>
                <Col sm={12} className="wrapper-pagination">
                  <ReactPaginate
                    previousLabel="Previous"
                    nextLabel="Next"
                    breakLabel={<span className="gap">...</span>}
                    // pageCount={Math.ceil(totalRows / params.pageSize)}
                    // onPageChange={(eventKey) => handleSelectPagination(eventKey)}
                    forcePage={0}
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
              </Tab>
              <Tab eventKey="tab2" title="Sản phẩm">
                <Col xs={12} md={12} className="form-search">
                  <div className="form-search__right">
                    <Input
                      type="text"
                      onChange={(e) => {
                        handleKeySearch(e.target.value);
                      }}
                      maxLength="20"
                      value={keySearch}
                    />
                    <Button
                      customClass="button--primary mt-0"
                      onClick={() => {}}
                    >
                      <p>TÌM</p>
                    </Button>
                  </div>
                </Col>
                <Col xs={12} md={12} className="list-product">
                  {renderProduct}
                  <div
                    className="add-product"
                    onClick={() => setIsShow(true)}
                    role="button"
                    onKeyDown={() => {}}
                    tabIndex={0}
                  >
                    +
                  </div>
                </Col>
              </Tab>
              <Tab eventKey="tab3" title="Công trình">
                <Col xs={12} md={12} className="form-search">
                  <div className="form-search__right">
                    <Input
                      type="text"
                      onChange={(e) => {
                        handleKeySearch(e.target.value);
                      }}
                      maxLength="20"
                      value={keySearch}
                    />
                    <Button
                      customClass="button--primary mt-0"
                      onClick={() => {}}
                    >
                      <p>TÌM</p>
                    </Button>
                  </div>
                </Col>
                {!isShowDetailConstruction ? (
                  <Col xs={12} md={12} className="list-product">
                    {renderConstructions}
                    <div
                      className="add-product"
                      onClick={() => setIsOpenAddConstruction(true)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={() => {}}
                    >
                      +
                    </div>
                  </Col>
                ) : (
                  <>
                    <Col xs={12} md={12} className="list-product__back">
                      <img
                        src={IMAGES.iconBack}
                        alt=""
                        onClick={() => setIsShowDetailConstruction(false)}
                        role="presentation"
                      />
                      <p className="list-product__back__title">
                        SUNRISE VILLA - ĐÀ NẴNG
                      </p>
                    </Col>
                    <Col xs={12} md={12} className="list-product">
                      <div className="product">
                        <p>CỬA NHÔM ADOOR MÀU NÂU</p>
                      </div>
                      <div
                        className="add-product"
                        onClick={() => setIsOpenAddConstruction(true)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={() => {}}
                      >
                        +
                      </div>
                    </Col>
                  </>
                )}
              </Tab>
            </Tabs>
          </Row>
        </Container>
      )}

      <Modal
        isOpen={isOpenAddConstruction}
        isShowFooter
        handleClose={() => {
          setIsOpenAddConstruction(false);
        }}
        customClassButton="w-100"
        textBtnRight="THÊM"
        isShowHeader
        title="TẠO CÔNG TRÌNH"
        classNameBtnLeft="btn-left"
      >
        <div className="title-content">
          <Input
            type="text"
            onChange={(e) => {
              setConstruction(e.target.value);
            }}
            maxLength="20"
            value={construction}
            placeholder="Nhập tên công trình"
          />
        </div>
      </Modal>
      <Modal
        isOpen={isShow}
        handleClose={() => {
          setIsShow(false);
        }}
        customClassButton="w-100"
        classNameBtnLeft="btn-left"
        customClass="popup-add-product"
        isShowIconClose
      >
        <div className="title-content">
          <div className="popup-add-product__left">
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
                <strong>{fileName || 'Kéo thả tập tin vào đây or'}</strong>
                <Button
                  customClass="button--primary add-file mt-0"
                  onClick={() => {}}
                >
                  <p>CHỌN TỆP</p>
                </Button>
              </label>
            </div>
          </div>
          <div className="popup-add-product__right">
            <Input
              type="text"
              onChange={(e) => {
                handleChange(e.target.value, 'name');
              }}
              value={dataAddProduct.name}
              label="Tên"
            />
            <p>Mô tả</p>
            <textarea
              onChange={(e) => {
                handleChange(e.target.value, 'description');
              }}
              value={dataAddProduct.description}
              rows={5}
            />
            <Input
              type="text"
              onChange={(e) => {
                handleChange(e.target.value, 'hashtag');
              }}
              value={dataAddProduct.hashtag}
              label="Hashtag"
            />
            <Button customClass="button--primary mt-0" onClick={() => {}}>
              <p>Thêm</p>
            </Button>
          </div>
        </div>
      </Modal>
    </MainLayout>
  );
};

export default memo<Props>(Customer);
