// @flow

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Reboot from 'material-ui/Reboot';
import Grid from 'material-ui/Grid';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import yellow from 'material-ui/colors/yellow';

import Header from '../Header';
import Footer from '../Footer';
import AsyncComponent from '../helpers/AsyncComponent';

import './App.css';

const primary = '#FFDA00'; // vattenfall new color for log top
const secondary = '#2071B5'; // vattenfall new color for log bottom

const theme = createMuiTheme({
  palette: {
    primary: { light: blue[300], main: primary, dark: blue[700] },
    secondary: { light: secondary, main: yellow[500], dark: yellow[700] }
  }
});

const LandingPage = AsyncComponent(
  () =>
    import(/* webpackChunkName: "LandingPage" */ '../../routes/RouteLanding').then(
      module => module.default
    ),
  { name: 'FixIt' }
);

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Router>
      <div className="app">
        <Reboot />

        <Header />

        <div className="app__content">
          <Grid container style={{ justifyContent: 'center' }}>
            <Grid item xs={10}>
              <Route exact path="/" component={LandingPage} />
            </Grid>
          </Grid>
        </div>

        <Footer />
      </div>
    </Router>
  </MuiThemeProvider>
);

export default App;
