import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch } from 'react-redux';

import { acGetShowInfo } from '../../../class/actions';
import { Loader } from '../../default';

function DetailPanel({
  showId, showInfo, isLoadingShowInfo
}) {
  const { t } = useTranslation(), dispatch = useDispatch();

  useEffect(() => {
    dispatch(acGetShowInfo(showId))
      .catch(err => console.error(err))
  }, [dispatch, showId])

  if (!showId || !showInfo || isLoadingShowInfo) {
    return <Loader />
  }

  return (
    <div className='detail-panel-root'>
      <div>
        <div className='detail-panel-title'>
          <h1>
            {showInfo.name}
          </h1>
          <p className='detail-panel-premiered'>
            ({showInfo.premiered})
          </p>
        </div>
        <p className='detail-panel-summary'>
          {showInfo.summary}
        </p>
      </div>
      <div>
        <div className='detail-item'>
          <span>{t('detailPanel.type')} </span>
          <span>{showInfo.type}</span>
        </div>
        <div className='detail-item'>
          <span>{t('detailPanel.language')} </span>
          <span>{showInfo.language}</span>
        </div>
        <div className='detail-item'>
          <span>{t('detailPanel.genres')} </span>
          <span>{showInfo.genres}</span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  showInfo: state.ReducerMainScreen.showInfo,
  isLoadingShowInfo: state.ReducerMainScreen.isLoadingShowInfo,
  errorShowInfo: state.ReducerMainScreen.errorShowInfo,
});

DetailPanel.propTypes = {
  showId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired
};

export default connect(mapStateToProps)(DetailPanel);
