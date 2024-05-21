import React from 'react';

import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
