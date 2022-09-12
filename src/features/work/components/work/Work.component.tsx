import { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { SecondaryButton } from '../../../ui/secondary-button/SecondaryButton.component';
import { Work as WorkInterface } from '../../interfaces';
import { CreateOrUpdateWorkModal } from '../create-or-update-work-modal/CreateOrUpdateWorkModal.component';
import { DeleteWorkModal } from '../delete-work-modal/DeleteWorkModal.component';

import './Work.css';

interface WorkProps {
  work: WorkInterface;
  isDetail?: boolean;
  onUpdate?: (work: WorkInterface) => void;
}

export function Work({ work, onUpdate, isDetail = false }: WorkProps) {
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const navigateToBudget = () => {
    navigate('/budget', { state: { work } });
  };
  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <div className="WorkContainer">
      <div className="TitleContainer">
        <div className="TitleContainerLeft">
          <h3 className="WorkTitle">{work.description}</h3>
          <span className="WorkType">{work.type}</span>
        </div>
        {isDetail ? (
          <div className="IconsContainer">
            <button type="button" onClick={() => setDeleteModal(true)}>
              <FaTrashAlt className="TrashIcon" />
            </button>
            <button type="button" onClick={() => setUpdateModal(true)}>
              <FaEdit className="EditIcon" />
            </button>
          </div>
        ) : (
          <SecondaryButton title="Partidas" onClick={navigateToBudget} />
        )}
      </div>
      <span className="ClientName">{work.clientName}</span>
      {deleteModal && (
        <DeleteWorkModal
          work={work}
          closeModal={() => setDeleteModal(false)}
          onDelete={navigateToHome}
        />
      )}
      {updateModal && (
        <CreateOrUpdateWorkModal
          closeModal={() => setUpdateModal(false)}
          work={work}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
}
