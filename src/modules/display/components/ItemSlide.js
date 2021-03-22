// @flow

import React, { memo } from 'react';

type Props = {
  inputFile: Object,
  onButtonClick: Function,
  dataItem: Object,
  handelGetFileName: Function,
  handleRemoveSlider: Function,
};

const ItemSlider = ({
  inputFile,
  onButtonClick,
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
          onChange={(e) => handelGetFileName(e, dataItem.id)}
        />
        <label>
          <strong>{dataItem.name || 'Upload file'}</strong>
        </label>
      </div>
      <p className="suggestions">Kích thước tối thiểu 512x512px</p>
    </div>
  );
};

export default memo<Props>(ItemSlider);
