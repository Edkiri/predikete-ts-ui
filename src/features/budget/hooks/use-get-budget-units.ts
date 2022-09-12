import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AppContext, AppContextInterface } from '../../../App.context';
import { API_URL } from '../../../constants';
import { BudgetUnit } from '../interfaces';

export const useGetBudgetUnits = () => {
  const { user } = useContext(AppContext) as AppContextInterface;
  const [budgetUnits, setBudgetUnits] = useState<BudgetUnit[]>([]);

  useEffect(() => {
    (async () => {
      const url = `${API_URL}/budget-unit`;
      try {
        const { data } = await axios.get<BudgetUnit[]>(url, {
          headers: {
            Authorization: `Bearer ${user?.authToken}`,
          },
        });
        setBudgetUnits(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [user?.authToken]);

  const onCreate = (payload: BudgetUnit) => {
    setBudgetUnits([...budgetUnits, payload]);
  };

  return { budgetUnits, onCreate };
};
