// @flow

import React, { useState, memo, useRef } from 'react';
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
  registerPartnerConstruction: Function,
  handleUpdatePartnerConstruction: Function,
  type: string,
  comID: string,
  uploadImageConstruction: Function,
};

const ItemPartnerConstruction = ({
  // history,
  handleDetailConstruction,
  dataConstructions,
  // dataDetailPartnerConstruction,
  registerPartnerConstruction,
  // handleUpdatePartnerConstruction,
  uploadImageConstruction,
  // type,
  comID,
}: Props) => {
  const inputFile = useRef({});
  const [isAddImage, setIsAddImage] = useState(false);
  const [isOpenAddConstruction, setIsOpenAddConstruction] = useState(false);
  const [
    currentConstructoinClicking,
    setCurrentConstructoinClicking,
  ] = useState({});
  // const [isShowAddConstruction, setIsShowAddConstruction] = useState(false);
  const [fileName, setFileName] = useState('');
  const [construction, setConstruction] = useState('');
  // const [dataAddConstruction, setDataAddConstruction] = useState({
  //   name: construction,
  //   description: '',
  //   hashtag: '',
  //   image: null,
  // });

  // useEffect(() => {
  //   if (type === 'GET_DETAIL_PARTNER_PRODUCT_SUCCESS') {
  //     setIsShowUpdateConstruction(true);
  //   }
  // }, [type]);

  // const handleChange = (value, name) => {
  //   setDataAddConstruction({
  //     ...dataAddConstruction,
  //     [name]: value,
  //   });
  //   setDataUpdateConstruction({
  //     ...dataUpdateConstruction,
  //     [name]: value,
  //   });
  // };
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    // eslint-disable-next-line no-unused-expressions
    const inputRefCurrent =
      inputFile && inputFile.current ? inputFile.current : null;
    // eslint-disable-next-line no-unused-expressions
    inputRefCurrent && inputRefCurrent.click();
  };

  const getFileName = async (e) => {
    setFileName(e.files[0]);
  };

  const handleUploadImage = () => {
    const formData = new window.FormData();
    formData.append('construction_id', currentConstructoinClicking.id);
    formData.append('image', fileName);
    uploadImageConstruction(formData);
  };

  const renderImageList = (imageList) => {
    return imageList.map((item) => {
      const styleBackground = {
        backgroundImage: `url(${item.image})`,
      };
      return <div className="product-image" style={styleBackground} />;
    });
  };
  const renderConstructions =
    dataConstructions &&
    dataConstructions.data &&
    dataConstructions.data.map((item) => {
      return (
        <div className="wrapper-product">
          <div
            className="product-item"
            onClick={() => handleDetailConstruction(item.id)}
            role="button"
            tabIndex={0}
            onKeyDown={() => {}}
          >
            {item.name}
          </div>
          {renderImageList(item.uploads)}
          <div
            className="add-product"
            onClick={() => {
              setIsAddImage(true);
              setCurrentConstructoinClicking(item);
            }}
            role="button"
            onKeyDown={() => {}}
            tabIndex={0}
          >
            +
          </div>
        </div>
      );
    });
  return (
    <>
      <Button onClick={() => setIsOpenAddConstruction(true)}>
        Tạo Công Trình
      </Button>
      <Col xs={12} md={12} className="list-product">
        <div className="wrapper-constructions">{renderConstructions}</div>
      </Col>
      <Modal
        isOpen={isOpenAddConstruction}
        isShowFooter
        isShowIconClose
        handleCloseIcon={() => {
          setIsOpenAddConstruction(false);
        }}
        handleClose={() => {
          setIsOpenAddConstruction(false);
          registerPartnerConstruction({
            name: construction,
            company_id: parseInt(comID, 10),
          });
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
            customClassWrap="w-100"
            placeholder="Nhập tên công trình"
          />
        </div>
      </Modal>
      <Modal
        isOpen={isAddImage}
        handleClose={() => {
          setIsAddImage(false);
        }}
        customClassButton="w-100"
        classNameBtnLeft="btn-left"
        customClass="popup-add-product"
        isShowIconClose
        handleCloseIcon={() => {
          setIsAddImage(false);
        }}
      >
        <div className="wrapper-add-image">
          <div
            className="box__input"
            onClick={onButtonClick}
            onKeyDown={() => {}}
            tabIndex={0}
            role="button"
          >
            <input
              className="input-file"
              id="file"
              type="file"
              multiple
              ref={inputFile}
              accept="image/jpg, image/png, image/gif, capture=camera"
              onChange={(e) => getFileName(e.target)}
            />
            {fileName && (
              <img
                src={URL.createObjectURL(fileName)}
                alt=""
                width="284"
                height="279"
              />
            )}
            <label htmlFor="file">
              <Button
                customClass="button--primary add-file mt-0"
                onClick={() => {}}
              >
                <p>CHỌN TỆP</p>
              </Button>
            </label>
          </div>
          <div className="wrapper-submit-image">
            <Button
              customClass="button--primary submit-image mt-0"
              onClick={() => handleUploadImage()}
            >
              <p>THÊM ẢNH</p>
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default memo<Props>(ItemPartnerConstruction);
