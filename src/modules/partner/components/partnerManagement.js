// @flow

import React, { useState, useRef, memo, useEffect } from 'react';
import { Row, Col, Container, Tabs, Tab } from 'react-bootstrap';
import Immutable from 'seamless-immutable';
import SelectDropdown from 'commons/components/Select';
import MainLayout from 'commons/components/MainLayout';
import Button from 'commons/components/Button';
import Input from 'commons/components/Input';
import Modal from 'commons/components/Modal';
import IMAGES from 'themes/images';
import Loading from 'commons/components/Loading';
import { headPartnerManagement } from 'constants/itemHead';
import ItemPartnerManagement from './Item/itemPartnerManagement';

type Props = {
  isProcessing: boolean,
  getListPartnerManagement: Function,
  dataQuotes: Array<{
    id: number,
  }>,
  dataProducts: Object,
  dataConstructions: Object,
  // totalPartnerManagement: number,
  dataPartnerManagement: Object,
  match: {
    params: {
      id: string,
    },
  },
  registerPartnerCompany: Function,
  dataConstant: Array<{}>,
  getListScales: Function,
  dataScales: Array<{
    id: number,
    value: string,
  }>,
  type: string,
  getListConstruction: Function,
  getListPartnerProduct: Function,
  registerPartnerProduct: Function,
  registerPartnerConstruction: Function,
  getListPartnerQuote: Function,
  getDetailPartnerProduct: Function,
  dataDetailPartnerProduct: Object,
  updatePartnerProduct: Function,
  getDetailPartnerConstruction: Function,
  updatePartnerConstruction: Function,
  dataDetailPartnerConstruction: Object,
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
  registerPartnerCompany,
  dataConstant,
  getListScales,
  dataScales,
  type,
  getListConstruction,
  getListPartnerProduct,
  registerPartnerProduct,
  registerPartnerConstruction,
  getListPartnerQuote,
  getDetailPartnerProduct,
  dataDetailPartnerProduct,
  updatePartnerProduct,
  getDetailPartnerConstruction,
  updatePartnerConstruction,
  dataDetailPartnerConstruction,
}: Props) => {
  const partnerId = match.params.id;
  const [isOpenAddConstruction, setIsOpenAddConstruction] = useState(false);
  const [isShowDetailProduct, setIsShowDetailProduct] = useState(false);
  const [isShowUpdateConstruction, setIsShowUpdateConstruction] = useState(
    false
  );
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [isShowDetailConstruction, setIsShowDetailConstruction] = useState(
    false
  );
  const [isShowAddConstruction, setIsShowAddConstruction] = useState(false);
  const [dataManagement, setDataManagement] = useState(dataPartnerManagement);
  const [construction, setConstruction] = useState('');
  const scale = dataScales.filter(
    (item) => item.value === dataPartnerManagement.scale_name
  );
  const [dataFilter, setDataFilter] = useState({
    scales: (scale && scale[0]) || null,
    job: null,
    tax_code: dataManagement.company_tax_code || '',
    name: dataManagement.company_name || '',
    address: dataManagement.company_address || '',
  });
  const [dataAddProduct, setDataAddProduct] = useState({
    name: '',
    description: '',
    hashtag: '',
    image: null,
  });
  const [dataAddConstruction, setDataAddConstruction] = useState({
    name: construction,
    description: '',
    hashtag: '',
    image: null,
  });
  const [dataUpdateProduct, setDataUpdateProduct] = useState({
    name: dataDetailPartnerProduct?.name || '',
    description: dataDetailPartnerProduct?.description,
    hashtag: dataDetailPartnerProduct?.hashtag,
    image: null,
  });
  const [dataUpdateConstruction, setDataUpdateConstruction] = useState({
    name: dataDetailPartnerConstruction?.name || '',
    description: dataDetailPartnerConstruction?.description,
    hashtag: dataDetailPartnerConstruction?.hashtag,
    image: null,
  });

  const [keySearch, setKeySearch] = useState('');
  const [isShow, setIsShow] = useState(false);
  const [fileName, setFileName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [objAvatar, setObjAvatar] = useState(null);
  const inputFile = useRef({});
  const [activeTab, setActiveTab] = useState('tab1');

  const onSelect = (key) => {
    setActiveTab(key);
    setKeySearch('');
  };

  // call api get list partner management
  useEffect(() => {
    if (activeTab === 'tab1') {
      getListPartnerManagement(partnerId);
      getListPartnerQuote(partnerId, {
        keywords: keySearch,
        page: 0,
      });
    } else if (activeTab === 'tab2') {
      getListPartnerProduct({
        id: dataPartnerManagement.company_id,
        keywords: keySearch,
      });
    } else {
      getListConstruction({
        id: dataPartnerManagement.company_id,
        keywords: keySearch,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partnerId, activeTab]);

  useEffect(() => {
    setDataUpdateProduct({
      name: dataDetailPartnerProduct?.name || '',
      description: dataDetailPartnerProduct?.description,
      hashtag: dataDetailPartnerProduct?.hashtag,
      image: null,
    });
  }, [dataDetailPartnerProduct]);

  const handleSearchCompany = () => {
    getListPartnerManagement({ id: partnerId, keywords: keySearch });
  };

  const handleSearchPartnerProduct = () => {
    getListPartnerProduct({
      id: dataPartnerManagement.company_id,
      keywords: keySearch,
    });
  };

  const handleSearchConstruction = () => {
    getListConstruction({
      id: dataPartnerManagement.company_id,
      keywords: keySearch,
    });
  };
  // call api get list scales
  useEffect(() => {
    getListScales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (type === 'GET_LIST_PARTNER_MANAGEMENT_SUCCESS') {
      setDataManagement(dataPartnerManagement);
      setDataFilter({
        scales: (scale && scale[0]) || null,
        job: null,
        tax_code: dataPartnerManagement.company_tax_code || '',
        name: dataPartnerManagement.company_name || '',
        address: dataPartnerManagement.company_address || '',
      });
    }
    if (type === 'REGISTER_PARTNER_PRODUCT_SUCCESS') {
      getListPartnerProduct({
        id: dataPartnerManagement.company_id,
        keywords: keySearch,
      });
    }
    if (type === 'REGISTER_PARTNER_CONSTRUCTION_SUCCESS') {
      getListConstruction({
        id: dataPartnerManagement.company_id,
        keywords: keySearch,
      });
    }
    if (type === 'UPDATE_PARTNER_PRODUCT_SUCCESS') {
      getListPartnerProduct({
        id: dataPartnerManagement.company_id,
        keywords: keySearch,
      });
    }
    if (type === 'UPDATE_PARTNER_CONSTRUCTION_SUCCESS') {
      getListConstruction({
        id: dataPartnerManagement.company_id,
        keywords: keySearch,
      });
    }
    if (type === 'GET_DETAIL_PARTNER_PRODUCT_SUCCESS') {
      setIsShowDetailProduct(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const handleChange = (value, name) => {
    setDataFilter({
      ...dataFilter,
      [name]: value,
    });
    setDataAddProduct({
      ...dataAddProduct,
      [name]: value,
    });
    setDataAddConstruction({
      ...dataAddConstruction,
      [name]: value,
    });
    setDataUpdateProduct({
      ...dataUpdateProduct,
      [name]: value,
    });
    setDataUpdateConstruction({
      ...dataUpdateConstruction,
      [name]: value,
    });
  };
  const handleKeySearch = (value) => {
    setKeySearch(value);
  };
  // const getDetailConstruction = () => {
  //   setIsShowDetailConstruction(true);
  // };
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    // eslint-disable-next-line no-unused-expressions
    const inputRefCurrent =
      inputFile && inputFile.current ? inputFile.current : null;
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
    setDataAddProduct({ ...dataAddProduct, image: e.files[0] });
    setDataAddConstruction({ ...dataAddConstruction, image: e.files[0] });
    setDataUpdateProduct({ ...dataUpdateProduct, image: e.files[0] });
    setDataUpdateConstruction({ ...dataUpdateProduct, image: e.files[0] });
    setObjAvatar(e.files[0]);
    const image = await fileToBase64(e);
    setAvatar(image);
    setFileName(e.files[0] && e.files[0].name);
  };

  const handleDetailProduct = (item) => {
    getDetailPartnerProduct(item);
  };

  const handleDetailConstruction = (item) => {
    getDetailPartnerConstruction(item);
    setIsShowUpdateConstruction(true);
  };

  const renderProduct =
    dataProducts &&
    dataProducts.data &&
    dataProducts.data.map((item) => {
      const styleBackground = {
        backgroundImage: `url(${item.image})`,
      };
      return (
        <div
          className="product"
          style={styleBackground}
          onClick={() => handleDetailProduct(item.id)}
          role="button"
          tabIndex={0}
          onKeyDown={() => {}}
        >
          <p>{item.name}</p>
        </div>
      );
    });

  const renderConstructions =
    dataConstructions &&
    dataConstructions.data &&
    dataConstructions.data.map((item) => {
      const styleBackground = {
        backgroundImage: `url(${item.image})`,
      };
      return (
        <div
          className="product"
          onClick={() => handleDetailConstruction(item.id)}
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
    backgroundImage: `url(${dataPartnerManagement.company_image || avatar})`,
  };

  const dataJob =
    dataFilter &&
    dataFilter.job &&
    dataFilter.job.map((item) => {
      return item.value;
    });

  const handleSubmit = () => {
    const formData = new window.FormData();
    formData.append('user_id', partnerId);
    formData.append('avatar', objAvatar);
    formData.append('name', dataFilter.name);
    formData.append('address', dataFilter.address);
    formData.append('scale_id', dataFilter?.scales?.id);
    formData.append('tax_code', dataFilter.tax_code);
    formData.append('career', dataJob && dataJob.toString());
    registerPartnerCompany(formData);
  };

  const handleAddPartnerProduct = () => {
    const formData = new window.FormData();
    formData.append(
      'company_id',
      parseInt(dataPartnerManagement.company_id, 10)
    );
    formData.append('image', dataAddProduct.image);
    formData.append('name', dataAddProduct.name);
    formData.append('description', dataAddProduct.description);
    formData.append('hashtag', dataAddProduct?.hashtag);
    if (dataAddProduct.name.length > 0) {
      registerPartnerProduct(formData);
      setIsShow(false);
    }
  };

  const handleUpdatePartnerProduct = () => {
    const formData = new window.FormData();
    formData.append(
      'company_id',
      parseInt(dataPartnerManagement.company_id, 10)
    );
    formData.append('image', dataUpdateProduct.image);
    formData.append('name', dataUpdateProduct.name);
    formData.append('description', dataUpdateProduct.description);
    formData.append('hashtag', dataUpdateProduct?.hashtag);
    if (dataUpdateProduct.name.length > 0) {
      updatePartnerProduct(dataDetailPartnerProduct.id, formData);
      setIsShowDetailProduct(false);
    }
  };

  const handleUpdatePartnerConstruction = () => {
    const formData = new window.FormData();
    formData.append(
      'company_id',
      parseInt(dataPartnerManagement.company_id, 10)
    );
    formData.append('image', dataUpdateConstruction.image);
    formData.append('name', dataUpdateConstruction.name);
    formData.append('description', dataUpdateConstruction.description);
    formData.append('hashtag', dataUpdateConstruction?.hashtag);
    if (dataUpdateConstruction.name.length > 0) {
      updatePartnerConstruction(dataDetailPartnerConstruction.id, formData);
      setIsShowUpdateConstruction(false);
    }
  };

  const handleAddPartnerConstruction = () => {
    const formData = new window.FormData();
    formData.append(
      'company_id',
      parseInt(dataPartnerManagement.company_id, 10)
    );
    formData.append('image', dataAddConstruction.image);
    formData.append('name', dataAddConstruction.name);
    formData.append('description', dataAddConstruction.description);
    formData.append('hashtag', dataAddConstruction?.hashtag);
    if (dataAddConstruction.name.length > 0) {
      registerPartnerConstruction(formData);
      setIsShowAddConstruction(false);
    }
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
                <p onClick={onButtonClick} role="presentation">
                  THAY ẢNH
                  <input
                    className="d-none"
                    type="file"
                    multiple
                    ref={inputFile}
                    accept="image/jpg, image/png, image/gif, capture=camera"
                    onChange={(e) => getFileName(e.target)}
                  />
                </p>
              </div>
            </Col>
            {!isShowEdit && dataPartnerManagement.company_name ? (
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
                        listItem={dataScales && Immutable.asMutable(dataScales)}
                        onChange={(e) => {
                          handleChange(e, 'scales');
                        }}
                        option={dataFilter.scales}
                        customClass="select-headquarters"
                        label="Quy mô nhân sự"
                      />
                    </Col>
                    <Col xs={12} md={6}>
                      <Input
                        type="text"
                        onChange={(e) => {
                          handleChange(e.target.value, 'tax_code');
                        }}
                        value={dataFilter.tax_code}
                        placeholder="Nhập mã số thuế"
                        label="Mã số thuế"
                        customClass="name-account"
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
                          handleChange(e.target.value, 'address');
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
                        listItem={
                          dataConstant && Immutable.asMutable(dataConstant)
                        }
                        onChange={(e) => {
                          handleChange(e, 'job');
                        }}
                        option={dataFilter.job}
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
              {!isShowEdit && dataPartnerManagement.company_name ? (
                <Button
                  customClass="button--primary"
                  onClick={() => setIsShowEdit(true)}
                >
                  <p>CHỈNH SỬA</p>
                </Button>
              ) : (
                <Button
                  customClass="button--primary"
                  onClick={handleSubmit}
                  isDisabled={
                    dataFilter.address.length === 0 &&
                    dataFilter.name.length === 0 &&
                    !dataFilter.scales &&
                    !dataFilter.job &&
                    dataFilter.tax_code.length === 0
                  }
                >
                  <p>LƯU THAY ĐỔI</p>
                </Button>
              )}
            </Col>

            <Tabs
              defaultActiveKey={activeTab}
              className="partner__tab col-12"
              onSelect={(eventKey) => onSelect(eventKey)}
            >
              <Tab eventKey="tab1" title="Báo giá">
                <ItemPartnerManagement
                  headPartnerManagement={headPartnerManagement}
                  dataQuotes={dataQuotes}
                  handleSearchCompany={handleSearchCompany}
                />
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
                      onClick={handleSearchPartnerProduct}
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
                      onClick={handleSearchConstruction}
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
          setIsShowAddConstruction(true);
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
            <Button
              customClass="button--primary mt-0"
              onClick={handleAddPartnerProduct}
            >
              <p>Thêm</p>
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isShowAddConstruction}
        handleClose={() => {
          setIsShowAddConstruction(false);
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
              value={dataAddConstruction.name}
              label="Tên"
            />
            <p>Mô tả</p>
            <textarea
              onChange={(e) => {
                handleChange(e.target.value, 'description');
              }}
              value={dataAddConstruction.description}
              rows={5}
            />
            <Input
              type="text"
              onChange={(e) => {
                handleChange(e.target.value, 'hashtag');
              }}
              value={dataAddConstruction.hashtag}
              label="Hashtag"
            />
            <Button
              customClass="button--primary mt-0"
              onClick={handleAddPartnerConstruction}
            >
              <p>Thêm</p>
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isShowDetailProduct}
        handleClose={() => {
          setIsShowDetailProduct(false);
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
              value={dataUpdateProduct.name}
              label="Tên"
            />
            <p>Mô tả</p>
            <textarea
              onChange={(e) => {
                handleChange(e.target.value, 'description');
              }}
              value={dataUpdateProduct.description}
              rows={5}
            />
            <Input
              type="text"
              onChange={(e) => {
                handleChange(e.target.value, 'hashtag');
              }}
              value={dataUpdateProduct.hashtag}
              label="Hashtag"
            />
            <Button
              customClass="button--primary mt-0"
              onClick={handleUpdatePartnerProduct}
            >
              <p>Thêm</p>
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isShowUpdateConstruction}
        handleClose={() => {
          setIsShowUpdateConstruction(false);
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
              value={dataUpdateConstruction.name}
              label="Tên"
            />
            <p>Mô tả</p>
            <textarea
              onChange={(e) => {
                handleChange(e.target.value, 'description');
              }}
              value={dataUpdateConstruction.description}
              rows={5}
            />
            <Input
              type="text"
              onChange={(e) => {
                handleChange(e.target.value, 'hashtag');
              }}
              value={dataUpdateConstruction.hashtag}
              label="Hashtag"
            />
            <Button
              customClass="button--primary mt-0"
              onClick={handleUpdatePartnerConstruction}
            >
              <p>Thêm</p>
            </Button>
          </div>
        </div>
      </Modal>
    </MainLayout>
  );
};

export default memo<Props>(Customer);
