// @flow

import React, { useState, memo, useRef, useEffect } from 'react';
import { Col } from 'react-bootstrap';
// import Immutable from 'seamless-immutable';
import Button from 'commons/components/Button';
import Input from 'commons/components/Input';
import Modal from 'commons/components/Modal';
// import ROUTERS from 'constants/router';

type Props = {
  // history: {
  //   push: Function,
  // },
  handleDetailProduct: Function,
  dataProducts: Object,
  dataDetailPartnerProduct: Object,
  handleAddPartnerProduct: Function,
  handleUpdatePartnerProduct: Function,
  type: string,
  deletePartnerProduct: Function,
};

const ItemPartnerProduct = ({
  // history,
  handleDetailProduct,
  dataProducts,
  dataDetailPartnerProduct,
  handleAddPartnerProduct,
  handleUpdatePartnerProduct,
  type,
  deletePartnerProduct,
}: Props) => {
  const inputFile = useRef({});
  const [isShow, setIsShow] = useState(false);
  const [isShowDetailProduct, setIsShowDetailProduct] = useState(false);
  const [fileName, setFileName] = useState('');
  const [dataAddProduct, setDataAddProduct] = useState({
    name: '',
    description: '',
    hashtag: '',
    image: null,
  });

  useEffect(() => {
    if (type === 'GET_DETAIL_PARTNER_CONSTRUCTION_SUCCESS') {
      setIsShowDetailProduct(true);
    }
  }, [type]);

  const [dataUpdateProduct, setDataUpdateProduct] = useState({
    name: dataDetailPartnerProduct?.name || '',
    description: dataDetailPartnerProduct?.description,
    hashtag: dataDetailPartnerProduct?.hashtag,
    image: null,
  });

  useEffect(() => {
    setDataUpdateProduct({
      name: dataDetailPartnerProduct?.name || '',
      description: dataDetailPartnerProduct?.description,
      hashtag: dataDetailPartnerProduct?.hashtag,
      image: null,
    });
  }, [dataDetailPartnerProduct]);

  const handleChange = (value, name) => {
    setDataAddProduct({
      ...dataAddProduct,
      [name]: value,
    });
    setDataUpdateProduct({
      ...dataUpdateProduct,
      [name]: value,
    });
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
    setDataAddProduct({ ...dataAddProduct, image: e.files[0] });
    setDataUpdateProduct({ ...dataUpdateProduct, image: e.files[0] });
    setFileName(e.files[0] && e.files[0].name);
  };

  const handleDeleteConstruction = (e, item) => {
    e.stopPropagation();
    deletePartnerProduct(item.id);
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
          onClick={() => {
            handleDetailProduct(item.id);
          }}
          role="button"
          tabIndex={0}
          onKeyDown={() => {}}
        >
          <p>{item.name}</p>
          <button
            className="btn-delete-image"
            onClick={(e) => handleDeleteConstruction(e, item)}
          >
            Xóa
          </button>
        </div>
      );
    });
  return (
    <>
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
      <Modal
        isOpen={isShow}
        handleClose={() => {
          setIsShow(false);
        }}
        customClassButton="w-100"
        classNameBtnLeft="btn-left"
        customClass="popup-add-product"
        isShowIconClose
        handleCloseIcon={() => {
          setIsShow(false);
        }}
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
              onClick={() => handleAddPartnerProduct(dataAddProduct)}
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
          // resetType();
        }}
        customClassButton="w-100"
        classNameBtnLeft="btn-left"
        customClass="popup-add-product"
        isShowIconClose
        handleCloseIcon={() => {
          setIsShowDetailProduct(false);
          // resetType();
        }}
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
              onClick={() => handleUpdatePartnerProduct(dataUpdateProduct)}
            >
              <p>Thêm</p>
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default memo<Props>(ItemPartnerProduct);
