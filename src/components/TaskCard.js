import React from 'react';
import { Paper, Typography, Box, Chip, Avatar, IconButton } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const priorityColors = {
  Low: '#2196f3',
  Medium: '#ff9800',
  High: '#f44336',
};

const statusColors = {
  backlog: '#4caf50',
  doing: '#ff9800',
  onHold: '#9c27b0',
  done: '#2196f3',
  archived: '#f44336',
};

function TaskCard({ task, onEdit, onDelete }) {
  return (
    <Paper 
      sx={{ 
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        '&:hover': {
          boxShadow: 2,
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: statusColors[task.status],
            }}
          />
          <Typography variant="subtitle1" component="div" sx={{ cursor: 'pointer' }} onClick={() => onEdit(task)}>
            {task.title}
          </Typography>
        </Box>
        <Box>
          <IconButton size="small" onClick={() => onEdit(task)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => onDelete(task.id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      {task.priority && (
        <Chip
          label={task.priority}
          size="small"
          sx={{
            bgcolor: `${priorityColors[task.priority]}15`,
            color: priorityColors[task.priority],
            width: 'fit-content',
          }}
        />
      )}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar 
          sx={{ 
            width: 24, 
            height: 24,
            bgcolor: 'primary.main',
            fontSize: '0.875rem',
          }}
        >
          {task.requester.split(' ').map(n => n[0]).join('')}
        </Avatar>
        <Typography variant="caption" color="text.secondary">
          {task.requester}
        </Typography>
      </Box>
      {task.dueDate && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="caption" color="text.secondary">
            Due {new Date(task.dueDate).toLocaleDateString()}
          </Typography>
        </Box>
      )}
      {task.description && (
        <Typography variant="caption" color="text.secondary">
          {task.description}
        </Typography>
      )}
    </Paper>
  );
}

export default TaskCard;

