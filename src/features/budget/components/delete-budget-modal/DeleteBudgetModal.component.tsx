import { useContext } from 'react';
import axios from 'axios';
import { AppContext, AppContextInterface } from '../../../../App.context';
import { API_URL } from '../../../../constants';
import { DeleteButton, ModalContainer, SecondaryButton } from '../../../ui';
import { Budget } from '../../interfaces';
import './DeleteBudgetModal.css';

interface DeleteBudgetProps {
  budget: Budget;
  workId: number;
  closeModal: () => void;
  onDelete: (budgetId: number) => void;
}

export function DeleteBudgetModal({
  closeModal,
  budget,
  workId,
  onDelete,
}: DeleteBudgetProps) {
  const { user } = useContext(AppContext) as AppContextInterface;

  const handleDelete = async () => {
    const url = `${API_URL}/work/${workId}/budget/${budget.id}`;
    try {
      const { data } = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${user?.authToken}`,
        },
      });
      if (data.message === 'Budget deleted') {
        onDelete(budget.id);
        closeModal();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ModalContainer>
      <div className="DeleteBudgetModalContainer">
        <h3>¿Eliminar esta partida?</h3>
        <p className="DescriptionText">{budget.description}</p>
        <div className="ButtonsContainer">
          <SecondaryButton title="Cancelar" onClick={closeModal} />
          <DeleteButton onClick={handleDelete} />
        </div>
      </div>
    </ModalContainer>
  );
}
