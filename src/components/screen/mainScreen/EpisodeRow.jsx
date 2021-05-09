import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { useTranslation } from 'react-i18next';

import { ROUTER } from '../../../class/constants';

function EpisodeRow({ id, image, name, runtime, summary }) {
  const { t } = useTranslation();
  const [click, setClick] = useState(false);

  if (click) {
    return <Redirect to={{ pathname: `${ROUTER.DETAIL}/${id}` }} />
  }

  return (
    <div
      className='episode-row-root'
      onClick={() => setClick(true)}
    >
      <img
        src={image}
        className='episode-row-image'
        alt='Ep Cover'
      />
      <div className='episode-row-info'>
        <div className='episode-row-header'>
          <p><b>{name}</b></p>
          <p className='detail-item' style={{ fontSize: 16 }}>
            <b>{runtime} {t('seasonPanel.min')}</b>
          </p>
        </div>
        <p className='episode-summary'>
          {summary}
        </p>
      </div>
    </div>
  );
};

EpisodeRow.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string,
  name: PropTypes.string,
  runtime: PropTypes.number,
  summary: PropTypes.string,
};

EpisodeRow.defaultProps = {
  image: '',
  name: '',
  runtime: '',
  summary: '',
};

export default EpisodeRow;