import { useLocation } from 'react-router-dom';
import { Work } from '../../features/work/components';
import { Work as WorkInterface } from '../../features/work/interfaces';

interface BudgetState {
  work: WorkInterface;
}

export function Budget() {
  const { work } = useLocation().state as BudgetState;
  return <Work work={work} isDetail />;
}
