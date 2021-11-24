import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const useFetchGet = (url) => {
  const [data, setData] = useState(null);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessTokenSilently();
      await fetch(url, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json)
        .then((response) => {
          setData(response);
        });
    };
    fetchData();
  }, [url]);

  return { data };
};
