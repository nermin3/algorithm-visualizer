import React from 'react';
import { SorterView } from '../sorter/SorterView';
import { sortService } from '../sorter/SortService';
import { Header } from '../../components/header/Header';
import './app.scss';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

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
    <MuiThemeProvider theme={theme}>
      <Header
        value={sortService.algorithmSubject.getValue()}
        onChange={sortService.updateAlgorithm}
      />
      <SorterView observable={sortService.arraySubject} />
    </MuiThemeProvider>
  );
}

export default App;
