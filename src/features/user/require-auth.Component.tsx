import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AppContext, AppContextInterface } from '../../App.context';

import { ChildrenProp } from '../../interfaces';

export function RequireAuth({ children }: ChildrenProp) {
  const { user } = useContext(AppContext) as AppContextInterface;
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
