import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const GetTokenBruh = () => {
  const [thang, setThang] = useState('');
  const { getAccessTokenSilently } = useAuth0();
  const callTheApiBroo = async () => {
    try {
      const token = await getAccessTokenSilently();

      await fetch('/api/LabelApprovals_GetAllDocuments', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          setThang('al' + JSON.stringify(response));
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      setThang(error.message);
    }
  };

  return (
    <div>
      <p>Son...</p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={callTheApiBroo}
      >
        Call dat thang
      </button>
      <h1>{thang}</h1>
    </div>
  );
};

export default GetTokenBruh;
