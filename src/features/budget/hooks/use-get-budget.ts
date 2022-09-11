import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { AppContext, AppContextInterface } from '../../../App.context';
import { API_URL } from '../../../constants';
import { Budget } from '../interfaces';

export const useGetBudget = (workId: number) => {
  const { user } = useContext(AppContext) as AppContextInterface;
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const url = `${API_URL}/work/${workId}/budget`;
        const { data } = await axios.get<Budget[]>(url, {
          headers: { Authorization: `Bearer ${user?.authToken}` },
        });
        setLoading(false);
        setBudgets(data);
      } catch (err) {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workId]);

  const onCreate = (payload: Budget) => {
    setBudgets([...budgets, payload]);
  };

  const onUpdate = (payload: Budget) => {
    const newBudgetList = budgets.filter((budget) => budget.id !== payload.id);
    setBudgets([...newBudgetList, payload]);
  };

  const onDelete = (budgetId: number) => {
    setBudgets(budgets.filter((budget) => budget.id !== budgetId));
  };

  return { loading, budgets, onCreate, onUpdate, onDelete };
};
