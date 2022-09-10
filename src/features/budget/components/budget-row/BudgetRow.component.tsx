import { formatNumber } from '../../../../utils';
import { Budget } from '../../interfaces';

interface BudgetProps {
  budget?: Budget;
}

export function BudgetRow({ budget }: BudgetProps) {
  return (
    <div className={`Row ${!budget && 'RowHeader'}`}>
      <div>
        <span>
          {budget ? `${budget.quantity} ${budget.unit.name}` : 'Cantidad'}
        </span>
      </div>
      <div>
        <span>
          {budget ? formatNumber(budget.unitPrice) : 'Precio unitario'}
        </span>
      </div>
      <div>
        <span>
          {budget ? formatNumber(budget.quantity * budget.unitPrice) : 'Total'}
        </span>
      </div>
    </div>
  );
}
