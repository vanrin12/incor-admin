/* eslint-disable react-hooks/exhaustive-deps */
// @flow

import React, { useState, memo, useEffect, useRef } from 'react';
import ReactPaginate from 'react-paginate';
import MainLayout from 'commons/components/MainLayout';
import Modal from 'commons/components/Modal';
import Button from 'commons/components/Button';
import Input from 'commons/components/Input';
import Video from 'commons/components/Video';
import Loading from 'commons/components/Loading';
import LoadingSmall from 'commons/components/Loading/LoadingSmall';
import ItemMedia from './ItemMedia';

type Props = {
  getListMedia: Function,
  dataListMedia: Array<{
    url: string,
    id: number,
  }>,
  isProcessing: boolean,
  uploadMedia: Function,
  type: string,
  totalRows: number,
  isProcessingUpload: boolean,
  deleteMedia: Function,
  statusCode: any,
};
const Medias = ({
  getListMedia,
  dataListMedia,
  isProcessing,
  uploadMedia,
  statusCode,
  totalRows,
  type,
  isProcessingUpload,
  deleteMedia,
}: Props) => {
  const inputFile = useRef({});
  const [isShow, setIsShow] = useState(false);
  const [mediaType, setMediaType] = useState('image');
  const [page, setPage] = useState(1);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const [modalCancel, setModalCancel] = useState({
    isShow: false,
    content: '',
  });
  const [idDelete, setIdDelete] = useState(null);
  const [modalDelete, setModalDelete] = useState({
    isShow: false,
    content: '',
  });

  const [imageUpload, setImageUpload] = useState({
    url: '',
    name: '',
    nameImage: '',
    imageView: '',
  });

  // sau khi upload thành công
  useEffect(() => {
    switch (type) {
      case 'UPLOAD_MEDIA_SUCCESS':
        setImageUpload({
          ...imageUpload,
          url: '',
          name: '',
          nameImage: '',
          imageView: '',
        });
        if (statusCode === 200) {
          setIsShow(false);
        } else {
          setIsShow(false);
          setModalCancel({
            ...modalCancel,
            isShow: true,
            content: 'Upload hình ảnh đang bị lỗi vui lòng thử lại sau.',
          });
        }
        break;
      case 'UPLOAD_MEDIA_FAILED':
        setIsShow(false);
        setImageUpload({
          ...imageUpload,
          url: '',
          name: '',
          nameImage: '',
          imageView: '',
        });
        setModalCancel({
          ...modalCancel,
          isShow: true,
          content: 'Upload hình ảnh đang bị lỗi vui lòng thử lại sau.',
        });
        break;

      case 'DELETE_MEDIA_SUCCESS':
        setModalDelete({
          ...modalDelete,
          isShow: false,
          content: '',
        });
        if (statusCode === 200) {
          getListMedia({
            page: 1,
            mediaType,
          });
        } else {
          setModalCancel({
            ...modalCancel,
            isShow: true,
            content: 'Xóa đang bị lỗi vui lòng thử lại sau.',
          });
        }
        break;
      case 'DELETE_MEDIA_FAILED':
        setModalDelete({
          ...modalDelete,
          isShow: false,
          content: '',
        });
        setModalCancel({
          ...modalCancel,
          isShow: true,
          content: 'Xóa đang bị lỗi vui lòng thử lại sau.',
        });
        break;

      default:
        break;
    }
    // eslint-disable-next-line
  }, [type]);

  useEffect(() => {
    getListMedia({
      page,
      mediaType,
    });
  }, [mediaType, page]);

  const handleChangeFile = (e) => {
    if (e.target.validity.valid && e.target.files[0]) {
      if (e.target.files[0].size === 0) {
        setModalCancel({
          ...modalCancel,
          isShow: true,
          content: 'Dung lượng hình ảnh phải lớn hơn 0KB.',
        });
      } else if (e.target.files[0].size > 1574000000 && mediaType === 'image') {
        setModalCancel({
          ...modalCancel,
          isShow: true,
          content: 'Kích thước hình ảnh được giới hạn ở 1.5G',
        });
      } else {
        setImageUpload({
          ...imageUpload,
          url: e.target.files[0],
          imageView: (window.URL || window.webkitURL).createObjectURL(
            e.target.files[0]
          ),
          nameImage: e.target.files[0].name,
        });
      }
    }
  };

  const handleChange = (value) => {
    setImageUpload({
      ...imageUpload,
      name: value,
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

  const handleAddMediaProduct = () => {
    // update coupon offline
    const formData = new window.FormData();
    formData.append('name', (imageUpload && imageUpload.name) || '');
    formData.append('file', (imageUpload && imageUpload.url) || '');
    formData.append('type', mediaType);
    uploadMedia(formData);
  };

  const handleSelectPagination = (value) => {
    setPage(value.selected + 1);
    setPaginationIndex(value.selected);
  };

  const handleShowDeleteMedia = (idMedia) => {
    setModalDelete({
      ...modalDelete,
      isShow: true,
      content: 'Bạn có muốn xóa hay không?',
    });
    setIdDelete(idMedia);
  };

  const handleDeleteMedia = () => {
    deleteMedia(idDelete);
  };

  const renderItemMedia =
    dataListMedia && dataListMedia.length > 0 ? (
      dataListMedia
        .slice(0, 10)
        .map((item) => (
          <ItemMedia
            key={item.id}
            dataMedia={item}
            handleDeleteMedia={handleShowDeleteMedia}
          />
        ))
    ) : (
      <div className="no-data">
        {mediaType === 'image'
          ? 'KHÔNG CÓ HÌNH ẢNH NÀO.'
          : 'KHÔNG CÓ VIDEO NÀO.'}
      </div>
    );

  return (
    <MainLayout activeMenu={1}>
      <div className="media-content">
        <div className="media-header d-flex">
          <div className="list-type">
            <div
              className={`img ${mediaType === 'image' ? 'active' : ''}`}
              onClick={() => {
                setPage(1);
                setMediaType('image');
              }}
              tabIndex="0"
              onKeyPress={() => {}}
              role="button"
            >
              HÌNH ẢNH
            </div>
            <div
              className={`video ${mediaType === 'video' ? 'active' : ''}`}
              onClick={() => {
                setPage(1);
                setMediaType('video');
              }}
              tabIndex="0"
              onKeyPress={() => {}}
              role="button"
            >
              VIDEO
            </div>
          </div>
          <div className="btn-upload">
            <Button
              customClass="button--primary"
              onClick={() => setIsShow(true)}
            >
              TẢI LÊN
            </Button>
          </div>
        </div>

        <div className="list-media">
          {isProcessing ? <Loading /> : <>{renderItemMedia}</>}
        </div>
        {dataListMedia && dataListMedia.length > 0 && (
          <div className="wrapper-pagination mt-4">
            {!isProcessing && (
              <>
                {totalRows > 10 && (
                  <ReactPaginate
                    previousLabel="Previous"
                    nextLabel="Next"
                    breakLabel={<span className="gap">...</span>}
                    pageCount={Math.ceil(totalRows / 10)}
                    onPageChange={(eventKey) =>
                      handleSelectPagination(eventKey)
                    }
                    forcePage={paginationIndex}
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
                )}
              </>
            )}
          </div>
        )}
      </div>

      <Modal
        isOpen={isShow}
        handleClose={() => {
          setIsShow(false);
          setImageUpload({
            ...imageUpload,
            url: '',
            name: '',
            nameImage: '',
            imageView: '',
          });
        }}
        customClassButton="w-100"
        classNameBtnLeft="btn-left"
        customClass="popup-add-product media"
        isShowIconClose
        handleCloseIcon={() => {
          setIsShow(false);
          setImageUpload({
            ...imageUpload,
            url: '',
            name: '',
            nameImage: '',
            imageView: '',
          });
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
              {mediaType === 'image' ? (
                <input
                  className="box__file"
                  type="file"
                  ref={inputFile}
                  accept="image/jpg, image/jpeg, image/png, capture=camera"
                  onChange={(e) => handleChangeFile(e)}
                />
              ) : (
                <input
                  className="box__file"
                  type="file"
                  ref={inputFile}
                  accept="video/mp4,video/x-m4v,video/*"
                  onChange={(e) => handleChangeFile(e)}
                />
              )}

              {/* accept="video/mp4,video/x-m4v,video/*" */}
              <label>
                <strong>
                  {(imageUpload && imageUpload.nameImage) ||
                    'Kéo thả tập tin vào đây'}
                </strong>
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
            <p className=" input__label">
              {mediaType === 'image' ? 'Hình ảnh' : 'Video'}
            </p>
            {mediaType === 'image' ? (
              <div className="image-view">
                {imageUpload && imageUpload.imageView && (
                  <img
                    src={imageUpload && imageUpload.imageView}
                    alt={imageUpload && imageUpload.name}
                  />
                )}
              </div>
            ) : (
              <div className="mb-3">
                <Video src={imageUpload && imageUpload.imageView} />
              </div>
            )}
            <Input
              type="text"
              onChange={(e) => {
                handleChange(e.target.value);
              }}
              value={imageUpload && imageUpload.name}
              label={mediaType === 'image' ? 'Tên hình ảnh' : 'Tên Video'}
            />

            <Button
              customClass="button--primary mt-0"
              onClick={() => handleAddMediaProduct()}
              isDisabled={
                !imageUpload.imageView ||
                !imageUpload.name ||
                isProcessingUpload
              }
            >
              <p>Thêm {isProcessingUpload && <LoadingSmall />}</p>
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalCancel.isShow}
        isShowFooter
        handleClose={() => {
          setModalCancel({ ...modalCancel, isShow: false });
        }}
        handleSubmit={() => {
          setModalCancel({ ...modalCancel, isShow: false });
        }}
        textBtnRight="ĐÓNG"
      >
        {modalCancel.content}
      </Modal>

      <Modal
        isOpen={modalDelete.isShow}
        isShowFooter
        handleClose={() =>
          setModalDelete({
            ...modalDelete,
            isShow: false,
            content: '',
          })
        }
        handleSubmit={() => handleDeleteMedia()}
        textBtnRight="KHÔNG"
        isShowTwoBtn
        textBtnLeft="CÓ"
      >
        {modalDelete.content}
      </Modal>
    </MainLayout>
  );
};

export default memo<Props>(Medias);
