import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteButton } from '../../../ui/delete-button/DeleteButton.component';
import { SecondaryButton } from '../../../ui/secondary-button/SecondaryButton.component';
import { Work as WorkInterface } from '../../interfaces';
import { DeleteWorkModal } from '../delete-work-modal/DeleteWorkModal.component';

import './Work.css';

interface WorkProps {
  work: WorkInterface;
  isDetail?: boolean;
}

export function Work({ work, isDetail = false }: WorkProps) {
  const navigate = useNavigate();
  const [displayModal, setDisplayModal] = useState(false);

  const navigateToBudget = () => {
    navigate('/budget', { state: { work } });
  };
  const navigateToHome = () => {
    navigate('/');
  };
  const handleDeleteWork = () => {
    setDisplayModal(true);
  };

  return (
    <div className="WorkContainer">
      <div className="TitleContainer">
        <div className="TitleContainerLeft">
          <h3 className="WorkTitle">{work.description}</h3>
          <span className="WorkType">{work.type}</span>
        </div>
        {isDetail ? (
          <DeleteButton onClick={handleDeleteWork} />
        ) : (
          <SecondaryButton title="Partidas" onClick={navigateToBudget} />
        )}
      </div>
      <span className="ClientName">{work.clientName}</span>
      {displayModal && (
        <DeleteWorkModal
          work={work}
          closeModal={() => setDisplayModal(false)}
          onDelete={navigateToHome}
        />
      )}
    </div>
  );
}
