import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  users: [],
  isLoading: false,
  error: undefined,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://randomuser.me/api/?results=5');
      return response.data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});


// export const {} = usersSlice.actions;
export default usersSlice.reducer;
