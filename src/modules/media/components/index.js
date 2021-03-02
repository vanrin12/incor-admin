/* eslint-disable react-hooks/exhaustive-deps */
// @flow

import React, { useState, memo, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import MainLayout from 'commons/components/MainLayout';
import ROUTERS from 'constants/router';

type Props = {
  history: {
    push: Function,
  },
  getListMedia: Function,
};
const Medias = ({ history, getListMedia }: Props) => {
  const [mediaType, setMediaType] = useState('image');
  const [pages, setPages] = useState(1);
  useEffect(() => {
    getListMedia({
      pages,
      mediaType,
    });
  }, [mediaType]);

  return (
    <MainLayout activeMenu={1}>
      <div className="media-content">
        <div className="media-header d-flex"></div>
        Mediassssssssssssssssssssssssssssssss
      </div>
    </MainLayout>
  );
};

export default memo<Props>(Medias);
