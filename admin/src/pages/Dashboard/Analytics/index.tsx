import React from 'react';
import BreadCrumb from 'Common/BreadCrumb';
import Widgets from './Widgets';
import AccountsStatistics from './AccountsStatistics';

const Analytics = () => {

  return (
    <React.Fragment>
      <BreadCrumb title='Analytics' pageTitle='Dashboards' />
      <div className="grid grid-cols-12 gap-x-5">
        <Widgets />
        {/* <AccountsStatistics /> */}
      </div>
    </React.Fragment>
  );
};

export default Analytics;