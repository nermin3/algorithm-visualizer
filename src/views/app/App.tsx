import React from 'react';
import { SorterView } from '../sorter/SorterView';
import { sortService } from '../sorter/SortService';
import { Header } from '../../components/header/Header';
import './app.scss';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PathFindingView } from '../pathFinding/PathFindingView';
import { pathFindingService } from '../pathFinding/PathFindingService';

const theme = createMuiTheme({
  overrides: {
    MuiFormLabel: {
      root: {
        color: '#fff',
        '&$focused': {
          color: '#fff',
        },
      },
    },
    MuiInput: {
      underline: {
        '&:before': {
          borderBottom: '2px solid white',
        },
        '&:after': {
          borderBottom: '2px solid white',
        },
      },
      root: {
        color: '#fff',
      },
    },

    MuiSvgIcon: {
      root: {
        fill: '#fff',
      },
    },
  },
});

function App() {
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <Header />
        <Switch>
          <Route exact={true} path="/sorters">
            <SorterView
              arrayObservable={sortService.arraySubject}
              algorithmObservable={sortService.algorithmSubject}
              array={sortService.arraySubject.getValue()}
              algorithm={sortService.algorithmSubject.getValue()}
              updateAlgorithm={sortService.updateAlgorithm}
            />
          </Route>
          <Route exact={true} path="/path-finding">
            <PathFindingView
              grid={pathFindingService.gridSubject.getValue()}
              updateCell={pathFindingService.updateCell}
              gridObservable={pathFindingService.gridSubject}
            />
          </Route>
        </Switch>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
