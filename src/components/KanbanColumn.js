import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

function KanbanColumn({ title, count, color, children }) {
  return (
    <Paper 
      sx={{ 
        width: 'calc(20% - 8px)',
        minWidth: 250,
        bgcolor: 'background.default',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
        transition: 'background-color 0.3s',
        '&:hover': {
          bgcolor: `${color}10`,
        },
      }}
      elevation={0}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            bgcolor: 'background.paper',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            color: 'text.secondary',
          }}
        >
          {count}
        </Typography>
      </Box>
      <Box 
        sx={{ 
          borderTop: 3, 
          borderColor: color,
          pt: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {children}
      </Box>
    </Paper>
  );
}

export default KanbanColumn;

