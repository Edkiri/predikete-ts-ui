import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { AppContext, AppContextInterface } from '../../../App.context';
import { API_URL } from '../../../constants';
import { Work } from '../interfaces';

export interface ApiWorkResponse {
  clientName: string;
  description: string;
  id: number;
  isFinished: boolean;
  type: {
    id: number;
    name: string;
  };
}

export const useGetWorks = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AppContext) as AppContextInterface;
  const url = `${API_URL}/work`;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<ApiWorkResponse[]>(url, {
          headers: {
            Authorization: `Bearer ${user?.authToken}`,
          },
        });
        const formatedWorks = data.map((work) => {
          const { clientName, description, id, isFinished, type } = work;
          return {
            clientName,
            description,
            id,
            isFinished,
            type: type.name,
          };
        });
        setWorks(formatedWorks);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError('Error cargando las obras');
      }
    })();
  }, [url, user]);

  const onCreate = (work: Work) => {
    setWorks([...works, work]);
  };

  return { error, loading, works, onCreate };
};
