import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { GifProfessor } from '../../assets';

const StylRoot = {
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
};

function ModalLoading({ show }) {
  const { t } = useTranslation();

  if (!show) { return null; }

  return (
    <div style={StylRoot}>
      <img
        src={GifProfessor}
        style={{ width: '150px', height: '150px' }}
        alt="Loading"
      />
      <h3>{t('default.loading')}</h3>
    </div>
  );
};

ModalLoading.propTypes = {
  show: PropTypes.bool,
};

ModalLoading.defaultProps = {
  show: true,
};

export default ModalLoading;
