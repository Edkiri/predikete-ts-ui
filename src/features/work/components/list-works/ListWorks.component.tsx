import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import { useGetWorks } from '../../hooks';
import { CreateWorkModal } from '../create-work-modal/CreateWorkModal.component';
import { Work } from '../work/Work.component';

import './ListWorks.css';

export function ListWorks() {
  const { works, onCreate } = useGetWorks();
  const [displayModal, setDisplayModal] = useState(false);

  const openModal = () => {
    setDisplayModal(true);
  };

  const closeModal = () => {
    setDisplayModal(false);
  };

  return (
    <div className="ListWorksContainer">
      <div className="TitleContainer">
        <h1>Obras</h1>
        <button onClick={openModal} type="button" className="AddButton">
          <FaPlus className="AddIcon" />
          Crear
        </button>
      </div>
      <div className="ListWorksContent">
        {works.length > 0 &&
          works.map((work) => <Work key={work.id} work={work} />)}
      </div>
      {displayModal && (
        <CreateWorkModal onCreate={onCreate} closeModal={closeModal} />
      )}
    </div>
  );
}
