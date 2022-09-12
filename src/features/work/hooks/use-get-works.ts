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
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AppContext) as AppContextInterface;

  useEffect(() => {
    const url = `${API_URL}/work`;
    setLoading(true);
    axios
      .get<ApiWorkResponse[]>(url, {
        headers: { Authorization: `Bearer ${user?.authToken}` },
      })
      .then(({ data }) => {
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
      })
      .catch(() => {
        setLoading(false);
        setError('Error cargando las obras');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCreate = (work: Work) => {
    setWorks([...works, work]);
  };

  const onUpdate = (payload: Work) => {
    const newWorkList = works.filter((work) => work.id !== payload.id);
    setWorks([...newWorkList, payload]);
  };

  return { error, loading, works, onCreate, onUpdate };
};
