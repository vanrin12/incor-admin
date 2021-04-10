// @flow
import React, { memo, useState } from 'react';
import Checkbox from 'commons/components/Checkbox';
import Rating from 'commons/components/Rating';

type Props = {
  rowItem: Object,
  onClickTableRow?: Function,
  rowActive?: Object,
  isShowColumnBtn?: boolean,
  isShowColumnBtnStatus?: boolean,
  statusActive?: boolean,
  handleClickBtnDetail?: Function,
  handleClickBtnView?: Function,
  isShowColumnBtn1?: boolean,
  isShowColumnCheck?: boolean,
  isShowId?: boolean,
  nameBtn1?: string,
  nameBtn2?: string,
  listId?: Array<{}>,
  handleCheckBox?: Function,
  isShowRating?: boolean,
  handleDelete?: Function,
  handleUpdate?: Function,
};

const TableRow = ({
  rowItem,
  onClickTableRow,
  rowActive,
  isShowColumnBtn = false,
  handleClickBtnDetail = () => {},
  isShowColumnBtn1 = () => {},
  handleClickBtnView = () => {},
  isShowColumnBtnStatus = false,
  statusActive,
  isShowColumnCheck = false,
  isShowId,
  nameBtn1,
  nameBtn2,
  listId = [],
  handleCheckBox = () => {},
  isShowRating = false,
  handleDelete = () => {},
  handleUpdate = () => {},
}: Props) => {
  // const isShowId = true;
  const fieldId = 'id';
  const [checkedItems, setCheckedItems] = useState({});
  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
    handleCheckBox([rowItem.id]);
  };
  return (
    <tr
      className={`${onClickTableRow ? 'row-cursor-pointer' : ''} ${
        rowActive && rowActive.id === rowItem.id ? 'row-active' : ''
      }`}
    >
      {isShowColumnCheck && (
        <td>
          <Checkbox
            label=""
            checked={!!listId.includes(rowItem.id)}
            onChange={handleChange}
            name={rowItem && rowItem.id}
          />
        </td>
      )}
      {Object.keys(rowItem).map((item, index) => {
        return (
          <td
            key={item}
            className={`${
              // eslint-disable-next-line no-nested-ternary
              isShowColumnBtnStatus && statusActive && rowItem.status === 1
                ? 'active'
                : isShowId && item === fieldId
                ? 'd-none'
                : ''
            }`}
            onClick={() => onClickTableRow && onClickTableRow(rowItem)}
            role="presentation"
          >
            {isShowRating && index === 5 ? (
              <Rating numberStar={rowItem[item]} />
            ) : (
              <span>{rowItem && rowItem[item]}</span>
            )}
          </td>
        );
      })}
      {isShowColumnBtn1 && (
        <td>
          <p
            onClick={() => handleClickBtnView(rowItem)}
            type="secondary"
            role="presentation"
          >
            {nameBtn1}
          </p>
        </td>
      )}
      {/* {isShowRating && (
        <td>
          <Rating numberStar={rowItem[5]} />
        </td>
      )} */}
      {isShowColumnBtn && (
        <td>
          <p
            onClick={() => handleClickBtnDetail(rowItem)}
            type="secondary"
            role="presentation"
          >
            {nameBtn2}
          </p>
        </td>
      )}
      {rowActive && rowActive.id === rowItem.id && (
        <div className="action-category">
          <p
            className="edit-categories"
            onClick={() => handleUpdate(rowItem)}
            role="presentation"
          >
            Chỉnh sửa
          </p>
          <p
            className="cancel-categories"
            onClick={() => handleDelete(rowItem)}
            role="presentation"
          >
            Loại bỏ
          </p>
        </div>
      )}
    </tr>
  );
};
TableRow.defaultProps = {
  onClickTableRow: null,
  rowActive: null,
  isShowColumnBtn: false,
  isShowColumnBtnStatus: false,
  statusActive: false,
  handleClickBtnDetail: () => {},
  isShowColumnBtn1: false,
  handleClickBtnView: () => {},
  isShowColumnCheck: false,
  isShowId: false,
  nameBtn1: '',
  nameBtn2: '',
  listId: [],
  handleCheckBox: () => {},
  isShowRating: false,
  handleDelete: () => {},
  handleUpdate: () => {},
};
export default memo<Props>(TableRow);
