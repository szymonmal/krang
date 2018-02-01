// @flow

import React from 'react';
import Drawer from 'material-ui/Drawer';
import Grid from 'material-ui/Grid';

const Footer = () => (
  <div id="footer">
    <Drawer anchor="bottom" type="permanent" open>
      <Grid style={{ justifyContent: 'center', padding: '1rem' }}>
        <Grid item xs={12}>
          <p>Footer</p>
        </Grid>
      </Grid>
    </Drawer>
  </div>
);

export default Footer;
