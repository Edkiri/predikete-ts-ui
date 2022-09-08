import React from 'react';
import { ListWorks } from '../../features/work/components';

import './Home.css';

export function Home() {
  return (
    <div className="HomeContainer">
      <h1>Obras</h1>
      <ListWorks />
    </div>
  );
}
