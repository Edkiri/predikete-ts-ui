import { Work as WorkInterface } from '../../interfaces';

import './Work.css';

interface WorkProps {
  work: WorkInterface;
}

export function Work({ work }: WorkProps) {
  return (
    <div className="WorkContainer">
      <div className="TitleContainer">
        <div className="TitleContainerLeft">
          <h3>{work.description}</h3>
          <span className="WorkType">{work.type}</span>
        </div>
        <button type="button" className="SecondaryButton">
          Partidas
        </button>
      </div>
      <span className="ClientName">{work.clientName}</span>
    </div>
  );
}
