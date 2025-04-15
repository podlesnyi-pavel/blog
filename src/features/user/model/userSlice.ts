import { getItem } from '@/shared/lib';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  token: getItem('auth_token'),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    logout(state) {
      state.token = null;
    },
  },
});

export const { setToken, logout } = userSlice.actions;
export default userSlice.reducer;
