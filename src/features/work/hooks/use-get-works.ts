import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { AppContext, AppContextInterface } from '../../../App.context';
import { API_URL } from '../../../constants';
import { Work } from '../interfaces';

export const useGetWorks = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { authToken } = useContext(AppContext) as AppContextInterface;
  const url = `${API_URL}/work`;

  useEffect(() => {
    (async () => {
      try {
        const axiosResponse = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        console.log(axiosResponse);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [url]);

  return { error, loading, works };
};
