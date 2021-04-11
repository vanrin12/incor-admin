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
  handleDetailConstruction: Function,
  dataConstructions: Object,
  dataDetailPartnerConstruction: Object,
  handleAddPartnerConstruction: Function,
  handleUpdatePartnerConstruction: Function,
  type: string,
};

const ItemPartnerConstruction = ({
  // history,
  handleDetailConstruction,
  dataConstructions,
  dataDetailPartnerConstruction,
  handleAddPartnerConstruction,
  handleUpdatePartnerConstruction,
  type,
}: Props) => {
  const inputFile = useRef({});
  const [isShowUpdateConstruction, setIsShowUpdateConstruction] = useState(
    false
  );
  const [isOpenAddConstruction, setIsOpenAddConstruction] = useState(false);
  const [isShowAddConstruction, setIsShowAddConstruction] = useState(false);
  const [fileName, setFileName] = useState('');
  const [construction, setConstruction] = useState('');
  const [dataAddConstruction, setDataAddConstruction] = useState({
    name: construction,
    description: '',
    hashtag: '',
    image: null,
  });

  useEffect(() => {
    if (type === 'GET_DETAIL_PARTNER_PRODUCT_SUCCESS') {
      setIsShowUpdateConstruction(true);
    }
  }, [type]);

  const [dataUpdateConstruction, setDataUpdateConstruction] = useState({
    name: dataDetailPartnerConstruction?.name || '',
    description: dataDetailPartnerConstruction?.description,
    hashtag: dataDetailPartnerConstruction?.hashtag,
    image: null,
  });

  useEffect(() => {
    setDataUpdateConstruction({
      name: dataDetailPartnerConstruction?.name || '',
      description: dataDetailPartnerConstruction?.description,
      hashtag: dataDetailPartnerConstruction?.hashtag,
      image: null,
    });
  }, [dataDetailPartnerConstruction]);

  const handleChange = (value, name) => {
    setDataAddConstruction({
      ...dataAddConstruction,
      [name]: value,
    });
    setDataUpdateConstruction({
      ...dataUpdateConstruction,
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
    setDataAddConstruction({ ...dataAddConstruction, image: e.files[0] });
    setDataUpdateConstruction({ ...dataUpdateConstruction, image: e.files[0] });
    setFileName(e.files[0] && e.files[0].name);
  };

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
  return (
    <>
      <Col xs={12} md={12} className="list-product">
        {renderConstructions}
        <div
          className="add-product"
          onClick={() => setIsOpenAddConstruction(true)}
          role="button"
          onKeyDown={() => {}}
          tabIndex={0}
        >
          +
        </div>
      </Col>
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
          
            value={construction}
            placeholder="Nhập tên công trình"
          />
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
              onClick={() => handleAddPartnerConstruction(dataAddConstruction)}
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
              onClick={() =>
                handleUpdatePartnerConstruction(dataUpdateConstruction)
              }
            >
              <p>Thêm</p>
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default memo<Props>(ItemPartnerConstruction);
