import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import DetailPanel from './DetailPanel';
import SeasonPanel from './SeasonPanel';
import { ModalLoading } from './../../default';
import { acGetImageUrl } from '../../../class/actions';

const MainScreen = ({
  imageUrl, isLoadingImageUrl, errorImageUrl,
}) => {
  const id = useParams().id || 1955;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(acGetImageUrl(id))
      .catch(err => console.error(err))
  }, [id, dispatch])

  if (isLoadingImageUrl)
    return <ModalLoading show={true} />

  return (
    <div className='screen-root'>
      <div className='screen-content'>
        <img
          src={imageUrl}
          style={{ width: '100%' }}
          alt="Powerpuff Girls Banner"
        />
        <div style={{ padding: '1em' }}>
          <div style={{ marginBottom: '0.5em' }}>
            <DetailPanel showId={id} />
          </div>
          <div style={{ marginBottom: '0.5em' }}>
            <SeasonPanel showId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  imageUrl: state.ReducerMainScreen.imageUrl,
  isLoadingImageUrl: state.ReducerMainScreen.isLoadingImageUrl,
  errorImageUrl: state.ReducerMainScreen.errorImageUrl,
});

export default connect(mapStateToProps)(MainScreen);
