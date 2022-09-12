import { useState } from 'react';

import { CreateButton } from '../../../ui';
import { useGetWorkTypes } from '../../hooks';
import { CreateWorkTypeModal } from '../create-work-type-modal/CreateWorkTypeModal.component';
import './WorkTypeConfig.css';

export function WorkTypeConfig() {
  const { workTypes, onCreate } = useGetWorkTypes();
  const [workType, setWorkType] = useState('Remodelación');
  const [createWorkTypeModal, setCreateWorkTypeModal] = useState(false);

  const handleOptionChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setWorkType(event.currentTarget.value);
  };

  return (
    <div className="WorkTypeContainer">
      <h3>Tipos de obras</h3>
      <select id="workType" onChange={handleOptionChange}>
        {workTypes.map((type) => (
          <option
            key={type.id}
            value={type.name}
            selected={type.name === workType}
          >
            {type.name}
          </option>
        ))}
      </select>
      <CreateButton onClick={() => setCreateWorkTypeModal(true)} />
      {createWorkTypeModal && (
        <CreateWorkTypeModal
          closeModal={() => setCreateWorkTypeModal(false)}
          onCreate={onCreate}
        />
      )}
    </div>
  );
}
