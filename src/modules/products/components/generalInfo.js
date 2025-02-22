import React from 'react'

const GeneralInfo = ({ formData, handleInputChange }) => (
    <div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label>TÊN SẢN PHẨM</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
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
  
      <div className="form-row">
        <div className="form-group col-md-6">
          <label>ƯU ĐÃI</label>
          <textarea
            name="promotion"
            value={formData.promotion}
            className="form-control"
            rows="3"
            placeholder="Nhập ưu đãi tại đây"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="form-group col-md-6">
          <label>CHUYÊN MỤC</label>
          <select
            name="category"
            value={formData.category}
            className="form-control"
            onChange={handleInputChange}
          >
            <option>Khóa cửa nhôm</option>
            <option>Khóa cửa gỗ</option>
            <option>Khóa cửa kính</option>
          </select>
        </div>
      </div>
    </div>
  );
  
  export default GeneralInfo