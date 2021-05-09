import React from 'react';
import PropTypes from 'prop-types';

function Dropdown({ items, selected, onChange }) {

  const handleChange = evt => {
    onChange(evt.target.value)
  };

  return (
    <select
      defaultValue={selected}
      selected={selected}
      onChange={handleChange}
    >
      {items.map(({ value, label }) => (
        <option
          key={value}
          value={value}
        >
          {label}
        </option>
      ))}
    </select>
  )
};

Dropdown.propTypes = {
  items: PropTypes.array,
  selected: PropTypes.any,
  onChange: PropTypes.func,
};

Dropdown.defaultProps = {
  items: [],
  selected: 1,
  onChange: () => true
};

export default Dropdown;