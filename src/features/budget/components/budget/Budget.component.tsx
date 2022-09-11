import { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Work } from '../../../work/interfaces';

import { Budget as BudgetInterface } from '../../interfaces';
import { BudgetRow } from '../budget-row/BudgetRow.component';
import { CreateOrUpdateBudgetModal } from '../create-or-update-budget-modal/CreateOrUpdateBudgetModal.component';
import { DeleteBudgetModal } from '../delete-budget-modal/DeleteBudgetModal.component';
import './Budget.css';

interface BudgetProps {
  budget: BudgetInterface;
  work: Work;
  onUpdate: (budget: BudgetInterface) => void;
  onDelete: (budgetId: number) => void;
}

export function Budget({ budget, work, onUpdate, onDelete }: BudgetProps) {
  const [updateModal, setUpdatedModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const openUpdateModal = () => {
    setUpdatedModal(true);
  };
  const closeUpdateModal = () => {
    setUpdatedModal(false);
  };
  const openDeleteModal = () => {
    setDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  return (
    <div className="BudgetContainer">
      <div className="BudgetHeader">
        <h3>{budget.description}</h3>
        <div className="IconsContainer">
          <button type="button" onClick={openDeleteModal}>
            <FaTrashAlt className="TrashIcon" />
          </button>
          <button type="button" onClick={openUpdateModal}>
            <FaEdit className="EditIcon" />
          </button>
        </div>
      </div>
      <div className="BudgetBody">
        <BudgetRow />
        <BudgetRow budget={budget} />
      </div>
      {updateModal && (
        <CreateOrUpdateBudgetModal
          work={work}
          budget={budget}
          onUpdate={onUpdate}
          closeModal={closeUpdateModal}
        />
      )}
      {deleteModal && (
        <DeleteBudgetModal
          budget={budget}
          closeModal={closeDeleteModal}
          onDelete={onDelete}
          workId={work.id}
        />
      )}
    </div>
  );
}
