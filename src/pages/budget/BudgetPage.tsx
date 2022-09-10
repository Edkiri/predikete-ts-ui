import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useGetBudget } from '../../features/budget/hooks';
import { Budget, CreateBudgetModal } from '../../features/budget/components';
import { Work } from '../../features/work/components';
import { Work as WorkInterface } from '../../features/work/interfaces';
import './Budget.css';
import { CreateButton } from '../../features/ui';

interface BudgetState {
  work: WorkInterface;
}

export function BudgetPage() {
  const { work } = useLocation().state as BudgetState;
  const { budgets, onCreate } = useGetBudget(work.id);
  const [displayModal, setDisplayModal] = useState(false);

  const openModal = () => {
    setDisplayModal(true);
  };
  const closeModal = () => {
    setDisplayModal(false);
  };

  return (
    <div className="BudgetPageContainer">
      <Work work={work} isDetail />
      <div className="BudgetListContainer">
        <div className="BudgetPageTitleContainer">
          <h1>Partidas</h1>
          <CreateButton onClick={openModal} />
        </div>
        <div className="BudgetList">
          {budgets.map((budget) => (
            <Budget key={budget.id} budget={budget} />
          ))}
        </div>
      </div>
      {displayModal && (
        <CreateBudgetModal
          work={work}
          onCreate={onCreate}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}
