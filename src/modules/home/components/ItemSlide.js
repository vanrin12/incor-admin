// @flow

import React, { memo } from 'react';
import Button from '../../../commons/components/Button';
// import ROUTERS from 'constants/router';

type Props = {
  itemObj: Object,
  history: {
    push: Function,
  },
};

const SlideMain = ({ history, itemObj }: Props) => {
  return (
    <>
      <div className="slide-content">
        <div
          className="bg-image"
          style={{
            backgroundImage: `url(${itemObj?.image})`,
          }}
          onClick={() => history.push('#')}
          onKeyDown={() => history.push('#')}
          role="button"
          tabIndex={0}
        />
        <h3
          onClick={() => history.push('#')}
          onKeyDown={() => history.push('#')}
          role="presentation"
          // tabIndex={0}
        >
          {itemObj?.name}
        </h3>
        <Button onClick={() => {}}>XEM</Button>
      </div>
    </>
  );
};

export default memo<Props>(SlideMain);
