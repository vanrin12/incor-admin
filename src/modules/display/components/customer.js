// @flow

import React, { memo, useState, useRef, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import MainLayout from 'commons/components/MainLayout';
import images from 'themes/images';
import ROUTERS from 'constants/router';
import Modal from 'commons/components/Modal';
import Input from 'commons/components/Input';
import Button from 'commons/components/Button';
import Loading from 'commons/components/Loading';

type Props = {
  history: {
    push: Function,
    go: Function,
    location: Object,
  },
  getCustomerEXP: Function,
  dataCustomer: Object,
  isProcessing: boolean,
  updateCustomerEXP: Function,
  type: string,
};

const Sale = ({
  history,
  getCustomerEXP,
  dataCustomer,
  isProcessing,
  updateCustomerEXP,
  type,
}: Props) => {
  const inputFile = useRef({});
  const inputFile2 = useRef({});
  const [customer1, setCustomer1] = useState({
    id: 1,
    name: '',
    address: '',
    description: '',
    image: null,
    imageView: '',
  });
  const [customer2, setCustomer2] = useState({
    id: 2,
    name: '',
    address: '',
    description: '',
    image: null,
    imageView: '',
  });
  const [dataSubmit, setDataSubmit] = useState({
    name: '',
  });

  const [modalCancel, setModalCancel] = useState({
    isShow: false,
    content: '',
  });
  useEffect(() => {
    getCustomerEXP();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    switch (type) {
      case 'UPDATE_CUSTOMER_EXP_SUCCESS':
        getCustomerEXP();
        if (!isProcessing) {
          setModalCancel({
            ...modalCancel,
            isShow: true,
            content: 'Cập nhật thành công!',
          });
        }
        break;
      case 'UPDATE_CUSTOMER_EXP_FAILED':
        setModalCancel({
          ...modalCancel,
          isShow: true,
          content: 'Cập nhật thất bại!',
        });
        break;
      default:
        break;
    }
    // eslint-disable-next-line
  }, [type]);

  useEffect(() => {
    if (dataCustomer?.experiences && dataCustomer?.experiences[0]) {
      setCustomer1({
        ...customer1,
        id: dataCustomer?.experiences[0]?.id,
        name: dataCustomer?.experiences[0]?.name || '',
        address: dataCustomer?.experiences[0]?.address || '',
        description: dataCustomer?.experiences[0]?.description || '',
        image: null,
        imageView: dataCustomer?.experiences[0]?.image || '',
      });
    }
    if (dataCustomer?.experiences && dataCustomer?.experiences[1]) {
      setCustomer2({
        ...customer2,
        id: dataCustomer?.experiences[1]?.id,
        name: dataCustomer?.experiences[1]?.name || '',
        address: dataCustomer?.experiences[1]?.address || '',
        description: dataCustomer?.experiences[1]?.description || '',
        image: null,
        imageView: dataCustomer?.experiences[1]?.image || '',
      });
    }
    setDataSubmit({
      name: dataCustomer?.name || '',
    });
    // eslint-disable-next-line
  }, [dataCustomer]);

  const handleChange = (value, name, customer) => {
    switch (customer) {
      case 'customer1':
        setCustomer1({
          ...customer1,
          [name]: value,
        });
        break;
      case 'customer2':
        setCustomer2({
          ...customer2,
          [name]: value,
        });
        break;
      default:
        break;
    }
  };

  const onButtonClick1 = () => {
    // `current` points to the mounted file input element
    // eslint-disable-next-line no-unused-expressions
    const inputRefCurrent =
      inputFile && inputFile.current ? inputFile.current : null;
    // eslint-disable-next-line no-unused-expressions
    inputRefCurrent && inputRefCurrent.click();
  };

  const onButtonClick2 = () => {
    // `current` points to the mounted file input element
    // eslint-disable-next-line no-unused-expressions
    const inputRefCurrent =
      inputFile2 && inputFile2.current ? inputFile2.current : null;
    // eslint-disable-next-line no-unused-expressions
    inputRefCurrent && inputRefCurrent.click();
  };

  const handleChangeFile = (e, name) => {
    if (e.target.validity.valid && e.target.files[0]) {
      if (e.target.files[0].size === 0) {
        setModalCancel({
          ...modalCancel,
          isShow: true,
          content: 'Dung lượng hình ảnh phải lớn hơn 0KB.',
        });
      } else if (e.target.files[0].size > 1574000000) {
        setModalCancel({
          ...modalCancel,
          isShow: true,
          content: 'Kích thước hình ảnh được giới hạn ở 1.5G',
        });
      } else {
        switch (name) {
          case 'customer1':
            setCustomer1({
              ...customer1,
              image: e.target.files[0],
              imageView: (window.URL || window.webkitURL).createObjectURL(
                e.target.files[0]
              ),
            });
            break;

          case 'customer2':
            setCustomer2({
              ...customer2,
              image: e.target.files[0],
              imageView: (window.URL || window.webkitURL).createObjectURL(
                e.target.files[0]
              ),
            });
            break;

          default:
            break;
        }
      }
    }
  };

  const handelSubmit = () => {
    const formData = new window.FormData();
    formData.append('name', (dataSubmit && dataSubmit.name) || '');
    formData.append('customer[0][id]', customer1?.id);
    formData.append('customer[0][name]', customer1?.name);
    if (customer1?.image) {
      formData.append('customer[0][image]', customer1?.image);
    }
    formData.append('customer[0][address]', customer1?.address);
    formData.append('customer[0][description]', customer1?.description);
    formData.append('customer[1][id]', customer2?.id);
    formData.append('customer[1][name]', customer2?.name);
    if (customer2?.image) {
      formData.append('customer[1][image]', customer2?.image);
    }
    formData.append('customer[1][address]', customer2?.address);
    formData.append('customer[1][description]', customer2?.description);
    updateCustomerEXP(formData);
  };

  return (
    <MainLayout activeMenu={6}>
      {isProcessing && <Loading />}
      <Container fluid className="pl-0">
        <Row className="content-wrapper page-display">
          <Col
            xs={12}
            md={12}
            className="d-flex align-items-center mb-4 justify-content-end"
          >
            <img
              src={images.iconBack}
              alt=""
              className="action-increase"
              onClick={() => history.push(ROUTERS.DISPLAY_MAIN)}
              role="presentation"
            />
            <h2
              className="cancel-display"
              onClick={() => history.push(ROUTERS.DISPLAY_MAIN)}
              role="presentation"
            >
              Hủy bỏ
            </h2>
            <Button
              customClass="button--primary"
              onClick={() => handelSubmit()}
              isDisabled={!dataSubmit?.name}
            >
              LƯU
            </Button>
          </Col>
          <Col xs={12} md={12}>
            <h1>{dataCustomer?.name}</h1>
            <Input
              type="text"
              onChange={(e) => {
                setDataSubmit({
                  ...dataSubmit,
                  name: e.target.value,
                });
              }}
              value={dataSubmit?.name}
              label="Tên chuyên mục"
              placeholder="Nhập tên chuyên mục"
            />
            <p className="suggestions">
              Dòng tiêu đề của chuyên mục tại trang chủ
            </p>
            <div className="form-customer">
              <div className="favicon">Khách hàng 1</div>
              <div
                className="box__input"
                onClick={onButtonClick1}
                onKeyDown={() => {}}
                tabIndex={0}
                role="button"
                style={{
                  backgroundImage: `url(${customer1?.imageView})`,
                }}
              >
                <input
                  className="box__file"
                  type="file"
                  ref={inputFile}
                  accept="image/jpg, image/jpeg, image/png, capture=camera"
                  onChange={(e) => handleChangeFile(e, 'customer1')}
                />
                <label>
                  <strong>Upload file</strong>
                </label>
              </div>
              <Input
                type="text"
                onChange={(e) => {
                  handleChange(e.target.value, 'name', 'customer1');
                }}
                value={customer1?.name}
                placeholder="Nhập tên khách hàng"
              />
              <Input
                type="text"
                onChange={(e) => {
                  handleChange(e.target.value, 'address', 'customer1');
                }}
                value={customer1?.address}
                placeholder="Nhập địa chỉ"
              />
              <textarea
                onChange={(e) => {
                  handleChange(e.target.value, 'description', 'customer1');
                }}
                value={customer1?.description}
                placeholder="Nhập cảm nhận khách hàng"
                rows={5}
              />
            </div>

            <div className="form-customer">
              <div className="favicon">Khách hàng 2</div>
              <div
                className="box__input"
                onClick={onButtonClick2}
                onKeyDown={() => {}}
                tabIndex={0}
                role="button"
                style={{
                  backgroundImage: `url(${customer2?.imageView})`,
                }}
              >
                <input
                  className="box__file"
                  type="file"
                  ref={inputFile2}
                  accept="image/jpg, image/jpeg, image/png, capture=camera"
                  onChange={(e) => handleChangeFile(e, 'customer2')}
                />
                <label>
                  <strong>Upload file</strong>
                </label>
              </div>
              <Input
                type="text"
                onChange={(e) => {
                  handleChange(e.target.value, 'name', 'customer2');
                }}
                value={customer2?.name}
                placeholder="Nhập tên khách hàng"
              />
              <Input
                type="text"
                onChange={(e) => {
                  handleChange(e.target.value, 'address', 'customer2');
                }}
                value={customer2?.address}
                placeholder="Nhập địa chỉ"
              />
              <textarea
                onChange={(e) => {
                  handleChange(e.target.value, 'description', 'customer2');
                }}
                value={customer2?.description}
                placeholder="Nhập cảm nhận khách hàng"
                rows={5}
              />
            </div>
          </Col>
        </Row>
      </Container>
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
    </MainLayout>
  );
};

export default memo<Props>(Sale);
