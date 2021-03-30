// @flow

import React, { memo, useState, useRef, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import MainLayout from 'commons/components/MainLayout';
import images from 'themes/images';
import Button from 'commons/components/Button';
import ROUTERS from 'constants/router';
import Loading from 'commons/components/Loading';

type Props = {
  history: {
    push: Function,
    go: Function,
  },
  getListLayout: Function,
  layoutHeader: Array<{
    id: number,
    name: string,
  }>,
  isProcessing: boolean,
};

const DisplayHeader = ({
  history,
  getListLayout,
  layoutHeader,
  isProcessing,
}: Props) => {
  const [dataSubmit, setDataSubmit] = useState({
    component: '',
    tagline: '',
    slide: null,
  });
  const [fileName, setFileName] = useState('');
  const inputFile = useRef({});

  useEffect(() => {
    getListLayout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      setDataSubmit({ ...dataSubmit, favicon: e.files[0] });
      setFileName(e.files[0].name);
    }
  };

  const renderComponent =
    layoutHeader &&
    layoutHeader.map((item) => {
      return (
        <div
          className={`list-companent__item-display ${
            item.id === dataSubmit.component ? 'active' : ''
          }`}
          onClick={() => {
            history.push({
              pathname: ROUTERS.DISPLAY_HEADER_INTRODUCE,
              state: { type: item },
            });
          }}
          onKeyDown={() => {}}
          tabIndex={0}
          role="button"
          key={item.id}
        >
          {item.name}
        </div>
      );
    });

  return (
    <MainLayout activeMenu={6}>
      <Container fluid>
        {isProcessing ? (
          <Loading />
        ) : (
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
                onClick={() => history.go(-1)}
                role="presentation"
              />
              <h2
                className="cancel-display"
                onClick={() => history.go(-1)}
                role="presentation"
              >
                Hủy bỏ
              </h2>
              <Button customClass="button--primary" onClick={() => {}}>
                LƯU
              </Button>
            </Col>
            <Col xs={12} md={12}>
              <h1>Header</h1>
              <div className="favicon">Logo</div>
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
                  onChange={(e) => getFileName(e.target)}
                />
                <label>
                  <strong>{fileName || 'Upload file'}</strong>
                </label>
              </div>
              <p className="suggestions">Kích thước tối thiểu 512x512px</p>
              <div className="companent">Site con</div>
              <div className="list-companent">{renderComponent}</div>
            </Col>
          </Row>
        )}
      </Container>
    </MainLayout>
  );
};

export default memo<Props>(DisplayHeader);
