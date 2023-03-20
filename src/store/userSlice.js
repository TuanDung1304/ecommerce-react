import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthService } from '../api/service/auth';

const initialState = { name: '', username: '', email: '' };

export const getUser = createAsyncThunk('users/profile', async () => {
  const { data } = await AuthService.userProfile();
  return data.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(_, action) {
      return { ...action.payload };
    },
  },
  extraReducers(builder) {
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.email = payload.email;
      state.lastName = payload.lastName;
      state.firstName = payload.firstName;
    });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
