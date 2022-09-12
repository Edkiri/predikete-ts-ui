import { useState } from 'react';
import { CreateButton } from '../../../ui';

import { useGetBudgetUnits } from '../../hooks';
import { CreateBudgetUnitModal } from '../create-budget-unit-modal/CreateBudgetUnitModal.component';
import './BudgetUnitConfig.css';

export function BudgetUnitConfig() {
  const { budgetUnits, onCreate } = useGetBudgetUnits();
  const [budgetUnit, setBudgetUnit] = useState('Remodelación');
  const [createBudgetUnitModal, setCreateBudgetUnitModal] = useState(false);

  const handleOptionChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setBudgetUnit(event.currentTarget.value);
  };

  return (
    <div className="WorkTypeContainer">
      <h3>Unidades</h3>
      <select id="workType" onChange={handleOptionChange}>
        {budgetUnits.map((unit) => (
          <option
            key={unit.id}
            value={unit.name}
            selected={unit.name === budgetUnit}
          >
            {unit.name}
          </option>
        ))}
      </select>
      <CreateButton onClick={() => setCreateBudgetUnitModal(true)} />
      {createBudgetUnitModal && (
        <CreateBudgetUnitModal
          closeModal={() => setCreateBudgetUnitModal(false)}
          onCreate={onCreate}
        />
      )}
    </div>
  );
}
