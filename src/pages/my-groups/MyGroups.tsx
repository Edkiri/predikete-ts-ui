import React, { useState } from 'react';

import './MyGroups.css';
import { Link } from 'react-router-dom';
import { useGetGroups } from '../../features/groups/hooks/use-get-groups';
import { GroupCard } from '../../features/groups/components';
import { Pagination } from '../../features/ui/pagination/Pagination.component';

export function MyGroups() {
  const TAKE = 4;
  const [skip, setSkip] = useState(0);
  const { groups, count, loading } = useGetGroups(TAKE, skip);
  return (
    <div className="GroupsContainer">
      <h2 className="GroupsTitle">My groups</h2>
      <div className="LinksContainer">
        <Link className="NewGroupLink" to="/new-group">
          New group...
        </Link>
        <Link className="SearchGroupLink" to="/search-groups">
          Search...
        </Link>
      </div>
      <div className="ListGroups">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
        <Pagination count={count} take={TAKE} setSkip={setSkip} />
        {!groups.length && (
          <p className="EmptyGroups">You`re not in any group yet...</p>
        )}
      </div>
    </div>
  );
}
