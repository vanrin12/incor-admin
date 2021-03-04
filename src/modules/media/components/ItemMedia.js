// @flow

import React, { memo } from 'react';
import Video from 'commons/components/Video';

type Props = {
  dataMedia: Object,
  handleDeleteMedia: Function,
};

const ItemMedia = ({ dataMedia, handleDeleteMedia }: Props) => {
  return (
    <>
      {dataMedia?.type === 'image' ? (
        <div className="item-media">
          <div
            className="icon-delete"
            onClick={() => handleDeleteMedia(dataMedia?.id)}
            role="button"
            tabIndex={0}
            onKeyDown={() => {}}
          >
            x
          </div>
          <div
            className="media-content"
            style={{
              backgroundImage: `url(${dataMedia?.url})`,
            }}
          />
        </div>
      ) : (
        <div className="item-media">
          <div
            className="icon-delete"
            onClick={() => handleDeleteMedia(dataMedia?.id)}
            role="button"
            tabIndex={0}
            onKeyDown={() => {}}
          >
            x
          </div>
          <div className="media-content">
            <Video src={dataMedia?.url} />
          </div>
        </div>
      )}
    </>
  );
};

export default memo<Props>(ItemMedia);
