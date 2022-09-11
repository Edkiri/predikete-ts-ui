import { useLocation } from 'react-router-dom';

import { BudgetList } from '../../features/budget/components';
import { Work } from '../../features/work/components';
import { Work as WorkInterface } from '../../features/work/interfaces';
import './Budget.css';

interface BudgetState {
  work: WorkInterface;
}

export function BudgetPage() {
  const { work } = useLocation().state as BudgetState;
  return (
    <div className="BudgetPageContainer">
      <Work work={work} isDetail />
      <BudgetList work={work} />
    </div>
  );
}
