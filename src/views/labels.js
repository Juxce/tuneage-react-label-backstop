import React, { useState } from 'react';
import { LabelBackstop } from '../components';

const Labels = () => {
  const [message, setMessage] = useState('');

  return (
    <div>
      <LabelBackstop />
    </div>
  );
};

export default Labels;
