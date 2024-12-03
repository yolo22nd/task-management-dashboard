import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KanbanColumn from './KanbanColumn';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import { addTask, updateTask, deleteTask } from '../store/tasksSlice';

const columnColors = {
  backlog: '#4caf50',
  doing: '#ff9800',
  onHold: '#9c27b0',
  done: '#2196f3',
  archived: '#f44336',
};

function KanbanBoard({ searchQuery }) {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const filterTasks = (taskList) => {
    if (!searchQuery) return taskList;
    return taskList.filter(task => 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.requester.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleNewTask = (newTask) => {
    dispatch(addTask({ ...newTask, requester: 'Current User' }));
};

const handleEditTask = (editedTask) => {
    // console.log(editedTask)
    // dispatch(updateTask(editedTask));
    dispatch(addTask({ ...editedTask, requester: 'Current User' }));
    dispatch(deleteTask(editedTask.id));
};

const handleDeleteTask = (taskId) => {
      dispatch(deleteTask(taskId));
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, minHeight: 'calc(100vh - 128px)', overflowX: 'auto' }}>
      {Object.entries(tasks).map(([status, taskList]) => (
        <KanbanColumn 
          key={status}
          title={status.charAt(0).toUpperCase() + status.slice(1)} 
          count={taskList.length}
          color={columnColors[status]}
        >
          {filterTasks(taskList).map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onEdit={setEditingTask}
              onDelete={handleDeleteTask}
            />
          ))}
          {status === 'backlog' && (
            <Button
              startIcon={<AddIcon />}
              sx={{ mt: 2 }}
              variant="contained"
              color="primary"
              onClick={() => setIsNewTaskModalOpen(true)}
            >
              New task
            </Button>
          )}
        </KanbanColumn>
      ))}
      <TaskModal
        open={isNewTaskModalOpen}
        handleClose={() => setIsNewTaskModalOpen(false)}
        onSubmit={handleNewTask}
      />
      {editingTask && (
        <TaskModal
          open={Boolean(editingTask)}
          handleClose={() => setEditingTask(null)}
          onSubmit={handleEditTask}
          task={editingTask}
        />
      )}
    </Box>
  );
}

export default KanbanBoard;

