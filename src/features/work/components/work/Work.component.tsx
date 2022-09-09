import { Work as WorkInterface } from '../../interfaces';

import './Work.css';

interface WorkProps {
  work: WorkInterface;
}

export function Work({ work }: WorkProps) {
  return (
    <div className="WorkContainer">
      <div className="TitleContainer">
        <h3>{work.description}</h3>
        <span className="WorkType">{work.type}</span>
      </div>
      <span className="ClientName">{work.clientName}</span>
    </div>
  );
}
