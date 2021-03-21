// @flow

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
// import formFillInfo from 'mockData/formFillInfo';
// import post from 'mockData/post';
// import hashtags from 'mockData/hashtags';
import { getDataMain } from 'modules/home/redux';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const HomeMain = () => {
  const dispatch = useDispatch();

  const [filterChart, setFilterChart] = useState({
    id: 0,
    value: 0,
    label: 'Last Week',
  });

  const { dataMain } = useSelector((state) => state.main);

  const handleSelectChange = (option) => {
    setFilterChart(option);
  };
  console.log(dataMain);
  const hashtags =
    dataMain &&
    dataMain.hashtag &&
    dataMain.hashtag &&
    dataMain.hashtag.split(',');
  // const posts = dataMain?.posts?.data;

  useEffect(() => {
    dispatch(getDataMain());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderHashtags =
    hashtags &&
    hashtags.map((item) => {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      return (
        <span
          className="content-wrapper__hashtag__item"
          style={{
            background: `#${randomColor}`,
          }}
        >
          {item}
        </span>
      );
    });

  const renderFormFillInfo =
    dataMain && dataMain.histories && dataMain.histories.length > 0 ? (
      dataMain.histories.map((item) => (
        <div className="content-wrapper__form-suggest__item">
          <p>
            <span
              className="content-wrapper__form-suggest__item__username"
              dangerouslySetInnerHTML={{ __html: item.name }}
            />
            <span
              className="content-wrapper__form-suggest__item__username"
              dangerouslySetInnerHTML={{ __html: ` ${item.created_custom}` }}
            />
          </p>
        </div>
      ))
    ) : (
      <p className="no-data">Không có lượt điền form</p>
    );
  const renderPost =
    dataMain && dataMain.posts && dataMain.posts.length > 0 ? (
      dataMain.posts.map((item) => (
        <div className="content-wrapper__post__item">
          <div className="col-6">
            <p className="content-wrapper__post__item__title">{item.name}</p>
            <p className="content-wrapper__form-suggest__item__time">
              {item.created_custom}
            </p>
          </div>
          <div className="content-wrapper__post__item__category col-2">
            {item?.category?.name}
          </div>
          <div className="content-wrapper__post__item__username col-2">
            {item?.user?.name}
          </div>
        </div>
      ))
    ) : (
      <p className="no-data">Chưa Có bài Post</p>
    );
  return (
    <MainLayout activeMenu={0}>
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
            {dataMain?.histories && dataMain?.histories.length > 6 && (
              <div className="content-wrapper__form-suggest__list-all">
                xem tat ca
              </div>
            )}
          </Col>
          <Col xs={12} md={3} className="content-wrapper__hashtag  box-content">
            <p className="content-wrapper__hashtag__title">Hashtag phổ biến</p>
            <div className="content-wrapper__hashtag__list">
              {renderHashtags}
            </div>
            {dataMain?.posts && dataMain?.posts.length > 4 && (
              <div className="content-wrapper__hashtag__list-all">
                xem tat ca
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default HomeMain;
