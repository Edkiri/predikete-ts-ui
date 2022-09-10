import { Budget as BudgetInterface } from '../../interfaces';
import { BudgetRow } from '../budget-row/BudgetRow.component';
import './Budget.css';

interface BudgetProps {
  budget: BudgetInterface;
}

export function Budget({ budget }: BudgetProps) {
  return (
    <div className="BudgetContainer">
      <div className="BudgetHeader">
        <h3>{budget.description}</h3>
      </div>
      <div className="BudgetBody">
        <BudgetRow />
        <BudgetRow budget={budget} />
      </div>
    </div>
  );
}
