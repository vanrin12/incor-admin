import React from 'react'

const StockDetails = ({ formData, handleInputChange }) => (
  <div>
    <div className="form-row">
      <div className="form-group col-md-6">
        <label>MÃ SẢN PHẨM</label>
        <input
          type="text"
          name="productCode"
          value={formData.productCode}
          className="form-control"
          placeholder="Nhập mã sản phẩm"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group col-md-6">
        <label>ĐƠN VỊ TÍNH</label>
        <input
          type="text"
          name="unit"
          value={formData.unit}
          className="form-control"
          placeholder="Đơn vị tính"
          onChange={handleInputChange}
        />
      </div>
    </div>

    <div className="form-row">
      <div className="form-group col-md-6">
        <label>ĐẦU VÀO</label>
        <input
          type="text"
          name="stockIn"
          value={formData.stockIn}
          className="form-control"
          placeholder="Số lượng nhập kho"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group col-md-6">
        <label>BÁN RA</label>
        <input
          type="text"
          name="stockOut"
          value={formData.stockOut}
          className="form-control"
          placeholder="Số lượng bán ra"
          onChange={handleInputChange}
        />
      </div>
    </div>
  </div>
);

export default StockDetails;