import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch } from 'react-redux';

import { acGetEpInfo } from './../../class/actions';
import { ModalLoading } from '../default';
import { ROUTER } from '../../class/constants';

const DetailScreen = ({
  episodeInfo, isLoadingEpispdeInfo, errorEpispdeInfo
}) => {
  const { episodeId } = useParams();
  const [goBack, setGoBack] = useState(false);
  const { t } = useTranslation(), dispatch = useDispatch();

  useEffect(() => {
    dispatch(acGetEpInfo(episodeId))
      .catch(err => console.error(err))
  }, [episodeId, dispatch])

  if (goBack)
    return <Redirect to={ROUTER.MAIN} />

  if (!episodeInfo || isLoadingEpispdeInfo)
    return <ModalLoading show={true} />

  return (
    <div className='screen-root'>
      <div className='screen-content'>
        <div className='flex-between'>
          <h1>{episodeInfo.name}</h1>
          <button onClick={() => setGoBack(true)}>
            {t('default.goBack')}
          </button>
        </div>
        <div className='detail-screen-info'>
          <img
            className='detail-screen-image'
            src={episodeInfo.image}
            alt='Episode Cover'
          />
          <div>
            <div className='detail-item'>
              <span>{t('detailScreen.season')} </span>
              <span>{episodeInfo.season}</span>
            </div>
            <div className='detail-item'>
              <span>{t('detailScreen.episode')} </span>
              <span>{episodeInfo.number}</span>
            </div>
            <div className='detail-item'>
              <span>{t('detailScreen.airtime')} </span>
              <span>{episodeInfo.airdate}</span>
            </div>
            <div className='detail-item'>
              <span>{t('detailScreen.runtime')} </span>
              <span>{episodeInfo.runtime}</span>
            </div>
          </div>
        </div>
        <p>{episodeInfo.summary}</p>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  episodeInfo: state.ReducerDetailScreen.episodeInfo,
  isLoadingEpispdeInfo: state.ReducerDetailScreen.isLoadingEpispdeInfo,
  errorEpispdeInfo: state.ReducerDetailScreen.errorEpispdeInfo,
});

export default connect(mapStateToProps)(DetailScreen);

