import { useState } from 'react';
import { SecondaryButton } from '../../features/ui';
import { CreateWorkTypeModal } from '../../features/work/components/create-work-type-modal/CreateWorkTypeModal.component';
import { useGetWorkTypes } from '../../features/work/hooks';
import './Config.css';

export function Config() {
  const { workTypes, onCreate } = useGetWorkTypes();
  const [workType, setWorkType] = useState('Remodelación');
  const [createWorkTypeModal, setCreateWorkTypeModal] = useState(false);

  const handleOptionChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setWorkType(event.currentTarget.value);
  };

  return (
    <div className="ConfigContainer">
      <h1>Configuración</h1>
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
        <SecondaryButton
          title="Agregar"
          onClick={() => setCreateWorkTypeModal(true)}
        />
      </div>
      {createWorkTypeModal && (
        <CreateWorkTypeModal
          closeModal={() => setCreateWorkTypeModal(false)}
          onCreate={onCreate}
        />
      )}
    </div>
  );
}
