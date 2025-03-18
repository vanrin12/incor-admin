import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs, Tab } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Button from 'react-bootstrap/Button';
import MainLayout from 'commons/components/MainLayout';
import ProductImageCarousel from 'commons/components/ImageCarousel';
import { addProduct } from '../redux';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ROUTERS from 'constants/router';
import { bindActionCreators } from 'redux';
import { Creators } from '../../post/redux';
import { connect } from 'react-redux';
import SelectDropdown from 'commons/components/Select';
import Immutable from 'seamless-immutable';
import useFileUpload from '../../../customHooks/useFileUpload';

// Initial form data state
const INITIAL_FORM_DATA = {
  name: '',
  price: '',
  category: '',
  endow: '',
  product_no: '',
  unit_of_measure: '',
  product_input: '',
  stockOut: '',
  remaining: '',
  description: '',
  technical_specifications: '',
  feature: '',
  keyworks: '',
  sell_out: '',
  productKeyword: '',
};

const AddProduct = ({ getListAllCategories }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [activeTab, setActiveTab] = useState('tab1');
  const [status, setStatus] = useState('N');
  const [show, setShow] = useState('N');
  const dispatch = useDispatch();
  const history = useHistory();
  const { type } = useSelector((state) => state?.productsReducer);
  const { uploadAdapter } = useFileUpload();
  const { listAllCategories } = useSelector((state) => state?.postReducer);

  // Generic input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // CKEditor change handler
  const handleEditorChange = (key, data) => {
    setFormData((prev) => ({ ...prev, [key]: data }));
  };

  // Submit form handler
  const handleSubmit = () => {
    const formSB = new FormData(); // Create a new FormData object

    formSB.append('name', formData.name);
    formSB.append('price', formData.price);
    formSB.append('endow', formData.endow);
    formSB.append('feature', formData.feature);
    formSB.append('description', formData.description);
    formSB.append(
      'technical_specifications',
      formData.technical_specifications
    );
    formSB.append('product_category_id', formData?.category?.id);
    formSB.append('status', status);
    formSB.append('show', show);
    formSB.append('remaining', formData.remaining);
    formSB.append('keyworks', formData.productKeyword);
    formSB.append('sell_out', formData.sell_out);
    formSB.append('product_no', formData.product_no);
    formSB.append('unit_of_measure' , formData.unit_of_measure);
    formSB.append('product_input', formData.product_input);

    // Append multiple files correctly
    if (formData.images && formData.images.length > 0) {
      formData.images.forEach((file) => {
        formSB.append('uploads[]', file?.image);
      });
    }

    // Dispatch FormData directly
    dispatch(addProduct(formSB));
  };

  const handleLoadImages = (images) => {
    setFormData((prev) => ({ ...prev, images }));
  };

  useEffect(() => {
    if (type === 'products/addProductSuccess') {
      history.push(ROUTERS.PRODUCTS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    getListAllCategories();
  }, [dispatch, getListAllCategories]);

  function uploadPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <MainLayout activeMenu={9}>
      <div className="container product-form">
        {/* <h3 className="text-center mb-4">Product Management</h3> */}

        <div className="row">
          {/* Image Carousel */}
          <div className="col-md-4">
            <ProductImageCarousel handleLoadImages={handleLoadImages} />
          </div>

          {/* Product Form */}
          <div className="col-md-8">
            <form>
              {/* Product Name and Price */}
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>TÊN SẢN PHẨM</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    className="form-control"
                    placeholder="Nhập tiêu đề tại đây"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>GIÁ NIÊM YẾT</label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    className="form-control"
                    placeholder="Nhập giá tại đây"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* endow and category */}
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>ƯU ĐÃI</label>
                  <textarea
                    name="endow"
                    value={formData.endow}
                    className="form-control"
                    rows={3}
                    placeholder="Nhập ưu đãi tại đây"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <SelectDropdown
                    label="CHUYÊN MỤC"
                    placeholder="KHÁCH HÀNG"
                    listItem={
                      listAllCategories &&
                      Immutable.asMutable(listAllCategories)
                    }
                    onChange={(e) => {
                      handleChange(e, 'category');
                    }}
                    option={formData.category}
                    customClass="select-category"
                  />
                </div>
              </div>
              {/* Stock Information */}
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>TÍNH NĂNG</label>
                  <textarea
                    name="feature"
                    value={formData.feature}
                    className="form-control"
                    rows={3}
                    placeholder="Nhập tính năng tại đây"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <div className="form-row">
                    {/* Stock Details Inputs */}
                    {[
                      {
                        name: 'product_no',
                        label: 'MÃ SẢN PHẨM',
                        placeholder: 'Nhập mã sản phẩm',
                      },
                      {
                        name: 'unit_of_measure',
                        label: 'ĐƠN VỊ TÍNH',
                        placeholder: 'Nhập đơn vị tính',
                      },
                      {
                        name: 'product_input',
                        label: 'ĐẦU VÀO',
                        placeholder: 'Số lượng nhập kho',
                      },
                    ].map((field) => (
                      <div key={field.name} className="form-group col-md-4">
                        <label>{field.label}</label>
                        <input
                          type="text"
                          name={field.name}
                          value={formData[field.name]}
                          className="form-control"
                          placeholder={field.placeholder}
                          onChange={handleInputChange}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="form-row">
                    {/* Additional Stock Details */}
                    {[
                      {
                        name: 'productKeyword',
                        placeholder: 'Từ khóa sản phẩm',
                      },
                      { name: 'sell_out', placeholder: 'Số lượng bán ra' },
                      {
                        name: 'remaining',
                        placeholder: 'Số lượng còn lại',
                      },
                    ].map((field) => (
                      <div key={field.name} className="form-group col-md-4">
                        <input
                          type="text"
                          name={field.name}
                          value={formData[field.name]}
                          className="form-control"
                          placeholder={field.placeholder}
                          onChange={handleInputChange}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="row d-flex">
          <div className="tab-content mt-2 col-8">
            <Tabs
              activeKey={activeTab}
              className="partner__tab col-9"
              onSelect={(key) => setActiveTab(key)}
            >
              <Tab eventKey="tab1" title="MÔ TẢ SẢN PHẨM">
                <CKEditor
                  editor={ClassicEditor}
                  data={formData.description}
                  config={{
                    extraPlugins: [uploadPlugin],
                  }}
                  onChange={(_, editor) =>
                    handleEditorChange('description', editor.getData())
                  }
                />
              </Tab>
              <Tab eventKey="tab2" title="THÔNG SỐ KỶ THUẬT">
                <CKEditor
                  editor={ClassicEditor}
                  data={formData.technical_specifications}
                  onChange={(_, editor) =>
                    handleEditorChange(
                      'technical_specifications',
                      editor.getData()
                    )
                  }
                  config={{
                    extraPlugins: [uploadPlugin],
                  }}
                />
              </Tab>
            </Tabs>
          </div>
          <div className="box-status col-3">
            <p>
              Trạng thái: Đã xuất bản
              <span
                // onClick={() => {
                //   setIsStatus(true);
                // }}
                role="presentation"
              >
                Edit
              </span>
            </p>
            <p>
              Hiển thị: {show === 'Y' ? 'Hiện bài viết' : 'Ẩn bài viết'}
              <span
                // onClick={() => {
                //   setIsShow(true);
                // }}
                role="presentation"
              >
                Edit
              </span>
            </p>
            <div className="group-action">
              <p className="mr-auto view-post">Xem bài viết</p>
              <div
                className="draft"
                // onClick={handleDraft}
                onKeyDown={() => {}}
                role="button"
                tabIndex={0}
              >
                Lưu nháp
              </div>
              <Button className="btn btn-success" onClick={handleSubmit}>
                <p>ĐĂNG BÀI</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getListAllCategories: Creators.getListAllCategories,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(AddProduct);
