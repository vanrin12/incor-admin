// @flow

import React, { memo, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
} from 'recharts';
import Select from 'react-select';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import MainLayout from 'commons/components/MainLayout';
import dataCharts from 'mockData/dataCharts';
import formFillInfo from 'mockData/formFillInfo';
import post from 'mockData/post';
import hashtags from 'mockData/hashtags';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

type Props = {
  history: {
    push: Function,
  },
};

const HomeMain = ({ history }: Props) => {
  const [filterChart, setFilterChart] = useState({
    id: 0,
    value: 0,
    label: 'Last Week',
  });

  const handleSelectChange = (option) => {
    setFilterChart(option);
  };

  const renderHashtags = hashtags.map((item) => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return (
      <span
        className="content-wrapper__hashtag__item"
        style={{
          background: `#${randomColor}`,
        }}
      >
        {item.name}
      </span>
    );
  });

  const renderFormFillInfo = formFillInfo.map((item) => (
    <div className="content-wrapper__form-suggest__item">
      <p>
        <span className="content-wrapper__form-suggest__item__username">
          {item.userName}
        </span>
        <span className="content-wrapper__form-suggest__item__info">
          đã điền form tư vấn
        </span>
      </p>
      <p className="content-wrapper__form-suggest__item__time">{item.time}</p>
    </div>
  ));

  const renderPost = post.map((item) => (
    <div className="content-wrapper__post__item">
      <div>
        <p className="content-wrapper__post__item__title">{item.title}</p>
        <p className="content-wrapper__form-suggest__item__time">{item.time}</p>
      </div>
      <div className="content-wrapper__post__item__category">
        {item.category}
      </div>
      <div className="content-wrapper__post__item__username">
        {item.userName}
      </div>
    </div>
  ));
  return (
    <MainLayout>
      <Container fluid>
        <Row className="content-wrapper">
          <Col xs={12} md={8} className="content-wrapper__chart box-content">
            <Row>
              <Col xs={12} md={6}>
                <p className="content-wrapper__chart__title">lượt xem web</p>
              </Col>
              <Col xs={12} md={6} className="content-wrapper__chart__option">
                <div className="content-wrapper__chart__option__select">
                  <Select
                    options={[
                      {
                        id: 0,
                        value: 0,
                        label: 'Last Week',
                      },
                      {
                        id: 1,
                        value: 1,
                        label: 'Last Month',
                      },
                    ]}
                    value={filterChart}
                    onChange={(option) => handleSelectChange(option)}
                    // noOptionsMessage={() => '옵션 없음'}
                  />
                </div>
              </Col>
            </Row>
            <Row className="content-wrapper__chart__body">
              <ResponsiveContainer height={276} minWidth={50} minHeight={250}>
                <LineChart
                  width={650}
                  height={276}
                  data={dataCharts}
                  syncId="anyId"
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#2a5299"
                    fill="#fff"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Row>
          </Col>
          <Col
            xs={12}
            md={3}
            className="content-wrapper__form-suggest box-content"
          >
            <p className="content-wrapper__form-suggest__title">
              lượt điền form
            </p>
            <div className="content-wrapper__form-suggest__list">
              {renderFormFillInfo}
            </div>
            <div className="content-wrapper__form-suggest__list-all">
              xem tat ca
            </div>
          </Col>

          <Col xs={12} md={8} className="content-wrapper__post box-content">
            <p className="content-wrapper__post__title">Bài viết gần đây</p>
            <div className="content-wrapper__post__list">{renderPost}</div>
            <div className="content-wrapper__form-suggest__list-all">
              xem tat ca
            </div>
          </Col>
          <Col xs={12} md={3} className="content-wrapper__hashtag  box-content">
            <p className="content-wrapper__hashtag__title">Hashtag phổ biến</p>
            <div className="content-wrapper__hashtag__list">
              {renderHashtags}
            </div>
            <div className="content-wrapper__hashtag__list-all">xem tat ca</div>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default memo<Props>(HomeMain);
