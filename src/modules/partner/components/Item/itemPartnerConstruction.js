// @flow

import React, { useState, memo, useRef } from 'react';
import { Col } from 'react-bootstrap';
// import Immutable from 'seamless-immutable';
import Button from 'commons/components/Button';
import Input from 'commons/components/Input';
import Modal from 'commons/components/Modal';
import images from 'themes/images';
// import ROUTERS from 'constants/router';

type Props = {
  // history: {
  //   push: Function,
  // },
  handleDetailConstruction: Function,
  dataConstructions: Object,
  registerPartnerConstruction: Function,
  // type: string,
  comID: string,
  uploadImageConstruction: Function,
  deleteImage: Function,
  deleteConstruction: Function,
};

const ItemPartnerConstruction = ({
  // history,
  handleDetailConstruction,
  dataConstructions,
  // dataDetailPartnerConstruction,
  registerPartnerConstruction,
  // handleUpdatePartnerConstruction,
  uploadImageConstruction,
  deleteImage,
  deleteConstruction,
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
    if (e && e.files[0]) {
      setFileName(e.files[0]);
    } else {
      setFileName('');
    }
  };

  const handleUploadImage = () => {
    const formData = new window.FormData();
    formData.append('construction_id', currentConstructoinClicking.id);
    formData.append('image', fileName);
    uploadImageConstruction(formData);
  };

  const handleDeleteImage = (item) => {
    deleteImage(item.id);
  };

  const handleDeleteConstruction = (e, item) => {
    e.stopPropagation();
    deleteConstruction(item.id);
  };

  const renderImageList = (imageList) => {
    return imageList.map((item) => {
      const styleBackground = {
        backgroundImage: `url(${item.image})`,
      };
      return (
        <div className="product-image" style={styleBackground}>
          <button
            className="btn-delete-image"
            onClick={() => handleDeleteImage(item)}
          >
            Xóa
          </button>
        </div>
      );
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
            onClick={() => {
              setIsAddImage(true);
              setCurrentConstructoinClicking(item);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={() => {}}
          >
            {item.name}
            <button
              className="btn-delete"
              onClick={(e) => handleDeleteConstruction(e, item)}
            >
              Xóa
            </button>
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

  console.log(fileName, 'fileName');
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
          getFileName('');
        }}
        customClassButton="w-100"
        classNameBtnLeft="btn-left"
        customClass="popup-add-product"
        isShowIconClose
        handleCloseIcon={() => {
          setIsAddImage(false);
          getFileName('');
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
            <img src={images.imgUpload} alt="" />
            <label htmlFor="file">
              <strong style={{ color: '#b6b6b6' }}>
                {fileName?.name || 'Kéo thả tập tin vào đây or'}
              </strong>
            </label>
            {!fileName && (
              <label htmlFor="file">
                <Button
                  customClass="button--primary add-file mt-0"
                  onClick={() => {}}
                >
                  <p className="pb-0">THÊM ẢNH</p>
                </Button>
              </label>
            )}
          </div>
          {fileName && (
            <Button
              customClass="button--primary add-file mt-3"
              onClick={() => handleUploadImage()}
            >
              <p className="pb-0">THÊM ẢNH</p>
            </Button>
          )}
        </div>
      </Modal>
    </>
  );
};

export default memo<Props>(ItemPartnerConstruction);
