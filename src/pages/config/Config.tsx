import { BudgetUnitConfig } from '../../features/budget/components';
import { WorkTypeConfig } from '../../features/work/components';
import './Config.css';

export function Config() {
  return (
    <div className="ConfigContainer">
      <h1>Configuración</h1>
      <WorkTypeConfig />
      <BudgetUnitConfig />
    </div>
  );
}
