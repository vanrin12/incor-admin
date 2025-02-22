// @flow
import React, { memo } from 'react';
import Checkbox from 'commons/components/Checkbox';

type Props = {
  listItems: Array<{ id: number, name: string }>,
  handleCheckBox?: Function,
  listId?: Array<number>, // Specify correct type for listId
  isShowCheckAll?: boolean,
  lengthItems?: number,
};

const TableHead = ({
  listItems = [],
  handleCheckBox = () => {},
  listId = [],
  isShowCheckAll = false,
  lengthItems = 0,
}: Props) => {
  const isCheckAll =
    listId.length === lengthItems || !!listId.includes('checkAll');

  const handleChange = (event) => {
    const { id } = event.target;
    handleCheckBox(id);
  };

  return (
    <tr>
      {isShowCheckAll && (
        <th>
          <Checkbox
            label=""
            checked={isCheckAll}
            onChange={handleChange}
            customClass="custom-check-all"
            name="selectAll"
          />
        </th>
      )}
      {listItems.map((item) => (
        <th key={item.id}>{item.name}</th>
      ))}
    </tr>
  );
};

export default memo(TableHead);
