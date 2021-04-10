// @flow
import React, { memo } from 'react';
import { Table } from 'react-bootstrap';
import TableHead from './TableHead';
import TableRow from './TableRow';

type Props = {
  tableHeads: Array<{ id: number, name: string }>,
  tableBody: Array<{ id: number }>,
  onClickRow?: Function,
  rowActive?: Object,
  isShowColumnBtn?: boolean,
  statusActive?: boolean,
  valueStatusField?: Object,
  handleClickBtnDetail?: Function,
  isShowColumnCheck?: boolean,
  showLabel?: boolean,
  isShowId?: boolean,
  handleClickBtnView?: Function,
  isShowColumnBtn1?: boolean,
  nameBtn1?: string,
  nameBtn2?: string,
  listId?: Array<{}>,
  handleCheckBox?: Function,
  isShowRating?: boolean,
  handleDelete?: Function,
  handleUpdate?: Function,
};

const TableData = ({
  tableHeads,
  tableBody,
  onClickRow,
  rowActive,
  isShowColumnBtn = false,
  valueStatusField,
  statusActive,
  handleClickBtnDetail = () => {},
  isShowColumnCheck = false,
  showLabel = false,
  isShowId,
  isShowColumnBtn1 = false,
  handleClickBtnView = () => {},
  nameBtn1,
  nameBtn2,
  listId = [],
  handleCheckBox = () => {},
  isShowRating = false,
  handleDelete = () => {},
  handleUpdate = () => {},
}: Props) => {
  const renderBodyTable = () => {
    return (
      tableBody &&
      tableBody.map((item) => (
        <TableRow
          onClickTableRow={onClickRow}
          rowItem={item}
          key={item.id}
          rowActive={rowActive}
          isShowColumnBtn={isShowColumnBtn}
          handleClickBtnDetail={handleClickBtnDetail}
          valueStatusField={valueStatusField}
          statusActive={statusActive}
          isShowColumnCheck={isShowColumnCheck}
          showLabel={showLabel}
          isShowId={isShowId}
          isShowColumnBtn1={isShowColumnBtn1}
          handleClickBtnView={handleClickBtnView}
          nameBtn1={nameBtn1}
          nameBtn2={nameBtn2}
          handleCheckBox={handleCheckBox}
          listId={listId}
          isShowRating={isShowRating}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      ))
    );
  };

  const renderBody = () => {
    if (renderBodyTable() && renderBodyTable().length > 0) {
      return renderBodyTable();
    }
    return (
      <tr className="p-3 text-center table-no-data w-100">
        <td colSpan={tableHeads && tableHeads.length}>
          <p className="mb-0">KHÔNG CÓ DỮ LIỆU.</p>
        </td>
      </tr>
    );
  };
  return (
    <Table striped bordered hover responsive>
      <thead>
        <TableHead listItems={tableHeads} />
      </thead>
      <tbody>{renderBody()}</tbody>
    </Table>
  );
};
TableData.defaultProps = {
  onClickRow: null,
  rowActive: null,
  isShowColumnBtn: false,
  statusActive: false,
  valueStatusField: null,
  handleClickBtnDetail: () => {},
  isShowColumnCheck: false,
  showLabel: false,
  isShowId: false,
  isShowColumnBtn1: false,
  handleClickBtnView: () => {},
  nameBtn1: '',
  nameBtn2: '',
  listId: [],
  handleCheckBox: () => {},
  isShowRating: false,
  handleDelete: () => {},
  handleUpdate: () => {},
};
export default memo<Props>(TableData);
