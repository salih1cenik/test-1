import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const res = await fetch("http://localhost:7000/todos");
    return await res.json();
  }
);
export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter: "all",
  },
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: ({ title }) => {
        return { payload: { id: nanoid(), completed: false, title } };
      },
    },
    toggle: (state, action) => {
      const { id } = action.payload;
      const item = state.items.find((item) => item.id === id);
      item.completed = !item.completed;
    },
    destroy: (state, action) => {
      const id = action.payload;
      const filtered = state.items.filter((item) => item.id !== id);
      state.items = filtered;
    },
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      const filtered = state.items.filter((item) => item.completed === false);
      state.items = filtered;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodosAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTodosAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(getTodosAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export const { addTodo, toggle, destroy, changeActiveFilter, clearCompleted } =
  todosSlice.actions;
export default todosSlice.reducer;

// ! This is your old code
// extraReducers: {
//   [getTodosAsync.pending]: (state, action) => {
//     state.isLoading = true;
//   },
//   [getTodosAsync.fulfilled]: (state, action) => {
//     state.items = action.payload;
//     state.isLoading = false;
//   },
//   [getTodosAsync.rejected]: (state, action) => {
//     state.isLoading = false;
//     state.error = action.error.message;
//   }
// },

//* This is updated code, at the new version of redux it's used builder callback function so you have to add only call back which called builder that's it
// extraReducers: (builder) => {
//   builder
//     .addCase(getTodosAsync.pending, (state) => {
//       state.isLoading = true;
//     })
//     .addCase(getTodosAsync.fulfilled, (state, action) => {
//       state.items = action.payload;
//       state.isLoading = false;
//     })
//     .addCase(getTodosAsync.rejected, (state, action) => {
//       state.isLoading = false;
//       state.error = action.error.message;
//     });
// },
