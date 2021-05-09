// @flow

import React, { memo } from 'react';
import { Col } from 'react-bootstrap';
import Table from 'commons/components/Table';
import { headProgress } from 'constants/itemHead';

type Props = {
  dataObj: Object,
  indexProject: number,
  rowActive: Object,
  handleDelete: Function,
  handleUpdateData: Function,
  onClickTableRow: Function,
};

const ItemProgressProject = ({
  dataObj,
  indexProject,
  rowActive,
  handleDelete,
  handleUpdateData,
  onClickTableRow,
}: Props) => {
  return (
    <div className="item-progress-project w-100 row m-0">
      <Col xs={12} md={12} className="title-project">
        {`Dự án ${indexProject}`}
      </Col>
      <Col xs={12} md={4}>
        <p className="page-progress__title-info">Tên dự án/ chủ đầu tư</p>
        <h2 className="page-progress__content-info">{dataObj?.name}</h2>
      </Col>
      <Col xs={12} md={7}>
        <p className="page-progress__title-info">Địa chỉ công trình</p>
        <h2 className="page-progress__content-info">{dataObj?.address}</h2>
      </Col>
      <Col xs={12} md={12} className="pt-3 table-progress-project">
        <Table
          tableHeads={headProgress}
          tableBody={
            dataObj &&
            dataObj.item &&
            dataObj.item.map(
              (table) =>
                ({
                  id: table.id,
                  hashtag: table.category,
                  customerProject: table.name,
                  describe: table.description,
                  total:
                    (table.amount && table.amount.toLocaleString('en')) || '0',
                  time: `${table.estimate} ${table.unit}`,
                  progress: `${table.progress_begin} / ${table.progress_end}`,
                  price: (table.paid && table.paid).toLocaleString('en') || '0',
                  prices:
                    (table.amount - table.paid).toLocaleString('en') || '0',
                  note: table.note,
                  description: '',
                } || [])
            )
          }
          showLabel
          isShowId
          isShowColumnBtn
          isShowCustomerProject
          isShowHashtag
          rowActive={rowActive}
          handleDelete={handleDelete}
          handleUpdate={handleUpdateData}
          onClickRow={onClickTableRow}
          isShowTooltip
          // handleClickBtnView={handleViewInformation}
        />
      </Col>
    </div>
  );
};

export default memo<Props>(ItemProgressProject);
