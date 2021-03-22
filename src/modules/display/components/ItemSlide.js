// @flow

import React, { memo } from 'react';

type Props = {
  dataItem: Object,
  handelGetFileName: Function,
  handleRemoveSlider: Function,
};

const ItemSlider = ({
  dataItem,
  handelGetFileName,
  handleRemoveSlider,
}: Props) => {
  return (
    <div className="item-slide">
      <div
        className="btn-mis"
        onClick={() => handleRemoveSlider(dataItem)}
        role="presentation"
      >
        -
      </div>

      <div
        className="box__input input-slider"
        onKeyDown={() => {}}
        tabIndex={0}
        role="button"
        style={{
          backgroundImage: `url(${dataItem?.imageView})`,
        }}
      >
        <input
          className="box__file"
          type="file"
          id={dataItem.id}
          name={`name${dataItem.id}`}
          accept="image/jpg, image/jpeg, image/png, capture=camera"
          onChange={(e) => handelGetFileName(e, dataItem.id)}
        />
        <label>
          <strong>{dataItem.name || 'Upload file'}</strong>
        </label>
      </div>
      <p className="suggestions pb-0">Kích thước tối thiểu 512x512px</p>
    </div>
  );
};

export default memo<Props>(ItemSlider);
