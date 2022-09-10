import { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Work } from '../../../work/interfaces';

import { Budget as BudgetInterface } from '../../interfaces';
import { BudgetRow } from '../budget-row/BudgetRow.component';
import { CreateOrUpdateBudgetModal } from '../create-budget-modal/CreateOrUpdateBudgetModal.component';
import './Budget.css';

interface BudgetProps {
  budget: BudgetInterface;
  work: Work;
  onUpdate: (budget: BudgetInterface) => void;
}

export function Budget({ budget, work, onUpdate }: BudgetProps) {
  const [updateModal, setUpdatedModal] = useState(false);

  const openUpdateModal = () => {
    setUpdatedModal(true);
  };
  const closeUpdateModal = () => {
    setUpdatedModal(false);
  };

  return (
    <div className="BudgetContainer">
      <div className="BudgetHeader">
        <h3>{budget.description}</h3>
        <div className="IconsContainer">
          <button type="button">
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
    </div>
  );
}
