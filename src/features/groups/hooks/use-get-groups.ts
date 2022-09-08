import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { API_URL } from '../../../constants';
import { AppContext, AppContextInterface } from '../../../App.context';
import { ApiGroup, ApiPaginationResponse } from '../../../api-interfaces';

export const useGetGroups = (take: number, skip: number) => {
  const [groups, setGroups] = useState<ApiGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const { user } = useContext(AppContext) as AppContextInterface;

  useEffect(() => {
    axios
      .get<ApiPaginationResponse<ApiGroup>>(`${API_URL}/group/my-groups`, {
        headers: {
          Authorization: `Bearer ${user?.authToken}`,
        },
        params: {
          take,
          skip,
        },
      })
      .then((res) => {
        setGroups(res.data.data);
        setCount(res.data.count);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [skip, take, user?.authToken]);

  return { groups, count, loading };
};
