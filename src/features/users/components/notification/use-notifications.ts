import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { API_URL } from '../../../../constants';
import { AppContext, AppContextInterface } from '../../../../App.context';
import { ApiNotificationsResponse } from '../../../../api-interfaces';

export const useNotifications = () => {
  const { user } = useContext(AppContext) as AppContextInterface;
  const [notifications, setNotifications] =
    useState<ApiNotificationsResponse | null>(null);

  useEffect(() => {
    if (user?.authToken) {
      axios
        .get<ApiNotificationsResponse>(`${API_URL}/notifications`, {
          headers: {
            Authorization: `Bearer ${user?.authToken}`,
          },
        })
        .then((res) => setNotifications(res.data))
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user?.authToken]);

  return { notifications };
};
