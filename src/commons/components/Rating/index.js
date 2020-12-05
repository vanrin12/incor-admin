// @flow
// libs
import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStartBold } from '@fortawesome/free-solid-svg-icons';

type Props = {
  numberStar: number,
};

export const Rating = ({ numberStar = 0 }: Props) => {
  const stars = [];
  let i = 1;
  for (i = 1; i < 6; i += 1) {
    let faIcon = faStar;
    let classIcon = 'line';
    if (numberStar >= i && numberStar !== null) {
      faIcon = faStartBold;
      classIcon = 'bold';
    }
    stars.push(<FontAwesomeIcon icon={faIcon} key={i} className={classIcon} />);
  }
  return <div className="rating">{stars}</div>;
};

export default memo<Props>(Rating);
