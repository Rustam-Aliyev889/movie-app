// CustomCheckbox.js
import React from 'react';

const Checkbox = ({ checked, onChange }) => {
  return (
    <div className="checkbox" onClick={onChange}>
      {checked && <div className="checkmark">✔</div>}
    </div>
  );
};

export default Checkbox;
