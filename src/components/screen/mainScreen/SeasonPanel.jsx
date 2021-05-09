import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import EpisodeRow from './EpisodeRow';
import { Dropdown, Loader } from '../../default';
import {
  acGetSeasonEps, acGetShowSeasons, acSetCurrentSeason
} from '../../../class/actions';

function SeasonPanel({
  showId, seasons, isLoadingSeasons,
  seasonEps, isLoadingSeasonEps,
  currentSeason
}) {
  const { t } = useTranslation(), dispatch = useDispatch();

  // Fetch Show Seasons Information on First Mount
  useEffect(() => {
    dispatch(acGetShowSeasons(showId))
      .catch(err => console.error(err))
  }, [showId, dispatch]);

  // Fetch Seasons Episodes
  useEffect(() => {
    if (!seasons.length) { return }

    let sid = currentSeason || seasons[0]

    if (!seasonEps[sid]) {
      dispatch(acGetSeasonEps(sid))
        .catch(err => console.error(err))

      if (!currentSeason) // Only on first render it will be null
        dispatch(acSetCurrentSeason(sid))
    }
  }, [seasonEps, seasons, currentSeason, dispatch]);

  if (!showId || !seasons || isLoadingSeasons) {
    return <Loader />
  };

  return (
    <div>
      <div className='flex-between'>
        <h2>{t('seasonPanel.episodes')}</h2>
        <div>
          <Dropdown
            onChange={sid => dispatch(acSetCurrentSeason(sid))}
            selected={currentSeason}
            items={
              seasons.map((seasonId, idx) => ({
                value: seasonId,
                label: `${t('seasonPanel.season')} ${idx + 1}`
              }))
            }
          />
        </div>
      </div>
      <div>
        {
          !seasonEps[currentSeason] || isLoadingSeasonEps ? <Loader /> : (
            seasonEps[currentSeason].map(ep => (
              <EpisodeRow
                key={ep.id}
                id={ep.id}
                image={ep.image}
                name={ep.name}
                runtime={ep.runtime}
                summary={ep.summary}
              />
            ))
          )
        }
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  seasons: state.ReducerMainScreen.seasons,
  isLoadingSeasons: state.ReducerMainScreen.isLoadingSeasons,
  errorSeasons: state.ReducerMainScreen.errorSeasons,

  seasonEps: state.ReducerMainScreen.seasonEps,
  isLoadingSeasonEps: state.ReducerMainScreen.isLoadingSeasonEps,
  errorSeasonEps: state.ReducerMainScreen.errorSeasonEps,

  currentSeason: state.ReducerMainScreen.currentSeason,
});

SeasonPanel.propTypes = {
  showId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired
};

export default connect(mapStateToProps)(SeasonPanel);
