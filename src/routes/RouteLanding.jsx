// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';

const RouteLanding = () => (
  <div className="route-landing">
    <Link to="/scan" className="button-link">
      <Button color="primary" raised>
        Scan QR code
      </Button>
    </Link>
  </div>
);

export default RouteLanding;
