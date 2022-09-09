import { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import { AppContext, AppContextInterface } from '../../../App.context';
import { WorkType } from '../interfaces';
import { API_URL } from '../../../constants';

export const useGetWorkTypes = () => {
  const [workTypes, setWorkTypes] = useState<WorkType[]>([]);
  const { user } = useContext(AppContext) as AppContextInterface;

  useEffect(() => {
    (async () => {
      const url = `${API_URL}/work-type`;
      try {
        const { data } = await axios.get<WorkType[]>(url, {
          headers: {
            Authorization: `Bearer ${user?.authToken}`,
          },
        });
        setWorkTypes(data);
      } catch (err) {
        console.log(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { workTypes };
};
