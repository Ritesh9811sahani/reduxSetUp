import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  name: string;
  status: 'pending' | 'done';
}

interface TaskState {
  tasks: Task[];
  filter: 'all' | 'pending' | 'done';
}

const initialState: TaskState = {
  tasks: [],
  filter: 'all',
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.tasks.push({
        id: Date.now().toString(),
        name: action.payload,
        status: 'pending',
      });
    },
    toggleTaskStatus: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.status = task.status === 'pending' ? 'done' : 'pending';
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<'all' | 'pending' | 'done'>) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, toggleTaskStatus, deleteTask, setFilter } = taskSlice.actions;
export default taskSlice.reducer;
