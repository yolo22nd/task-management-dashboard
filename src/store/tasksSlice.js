import { createSlice } from '@reduxjs/toolkit';

const initialState = {
        backlog: [
          {
            id: 1,
            title: 'temp task',
            priority: 'Medium',
            requester: 'test user',
            description: 'Some random description',
            status: 'backlog',
          }
        ],
        doing: [
          {
            id: 2,
            title: 'test3231',
            priority: 'Low',
            requester: 'abc123',
            dueDate: '2024-04-28',
            status: 'doing',
          },
          {
            id: 3,
            title: 'hwlloo',
            priority: 'High',
            requester: 'xyz999',
            dueDate: '2024-04-28',
            description: 'Doing something important',
            status: 'doing',
          }
        ],
        onHold: [
          {
            id: 4,
            title: 'zzzzzzzz',
            priority: 'Medium',
            requester: 'noidea',
            dueDate: '2024-04-30',
            description: 'Paused for no reason',
            status: 'onHold',
          }
        ],
        done: [
          {
            id: 5,
            title: 'done_task_01',
            priority: 'High',
            requester: 'tester',
            completed: true,
            description: 'This one is done!',
            status: 'done',
          }
        ],
        archived: [
          {
            id: 6,
            title: 'old_stuff',
            requester: 'archive_guy',
            completed: true,
            status: 'archived',
          },
          {
            id: 7,
            title: 'yolo_task',
            priority: 'Low',
            requester: 'random_person',
            completed: true,
            description: 'Something that nobody finished',
            status: 'archived',
          }
        ]
      };
      

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { status, ...newTask } = action.payload;
      state[status].push({ ...newTask, id: Date.now() });
    },
    updateTask: (state, action) => {
      const { id, status, ...updatedTask } = action.payload;
      const oldStatus = Object.keys(state).find(key => 
        state[key].some(task => task.id === id)
      );
      if (oldStatus) {
        state[oldStatus] = state[oldStatus].filter(task => task.id !== id);
        state[status].push({ id, status, ...updatedTask });
      }
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;
      Object.keys(state).forEach(status => {
        state[status] = state[status].filter(task => task.id !== taskId);
      });
    },
  },
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;

