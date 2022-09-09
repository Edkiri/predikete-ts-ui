import { useGetWorks } from '../../hooks';
import { Work } from '../work/Work.component';

import './ListWorks.css';

export function ListWorks() {
  const { works } = useGetWorks();
  return (
    <div className="ListWorksContainer">
      <h1>Obras</h1>
      <div className="ListWorksContent">
        {works.length > 0 &&
          works.map((work) => <Work key={work.id} work={work} />)}
      </div>
    </div>
  );
}
