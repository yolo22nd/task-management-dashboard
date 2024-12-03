import React, { useState } from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/Header';
import KanbanBoard from './components/KanbanBoard';

const theme = createTheme({
  palette: {
    background: {
      default: '#f5f5f5',
    },
    primary: {
      main: '#1351C5',
    },
    secondary: {
      main: '#2E8AE7',
    },
  },
});

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <Header onSearch={setSearchQuery} />
          <Box component="main" sx={{ flexGrow: 1, p: 3, overflowX: 'auto' }}>
            <KanbanBoard searchQuery={searchQuery} />
          </Box>
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

