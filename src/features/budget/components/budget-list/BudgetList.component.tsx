import { useState } from 'react';
import { CreateButton, Loader } from '../../../ui';
import { Work } from '../../../work/interfaces';
import { useGetBudget } from '../../hooks';
import { Budget } from '../budget/Budget.component';
import { CreateOrUpdateBudgetModal } from '../create-or-update-budget-modal/CreateOrUpdateBudgetModal.component';
import './BudgetList.css';

interface BudgetListProps {
  work: Work;
}

export function BudgetList({ work }: BudgetListProps) {
  const [createModal, setCreateModal] = useState(false);
  const { budgets, onCreate, onUpdate, onDelete, loading } = useGetBudget(
    work.id,
  );

  const openCreateModal = () => {
    setCreateModal(true);
  };
  const closeCreateModal = () => {
    setCreateModal(false);
  };

  return (
    <div className="BudgetListContainer">
      <div className="BudgetPageTitleContainer">
        <h1>Partidas</h1>
        <CreateButton onClick={openCreateModal} />
      </div>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <div className="BudgetList">
          {budgets.map((budget) => (
            <Budget
              work={work}
              key={budget.id}
              budget={budget}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
      {!loading && budgets.length === 0 && (
        <p className="EmptyBudgetsText">No existen partidas</p>
      )}
      {createModal && (
        <CreateOrUpdateBudgetModal
          work={work}
          onCreate={onCreate}
          closeModal={closeCreateModal}
        />
      )}
    </div>
  );
}
