import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.withCredentials = true;
const URL = process.env.REACT_APP_URL;

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async () => {
  try {
    const response = await axios.get(`${URL}/profile`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message || 'Failed to fetch profile');
  }
});

export const updateProfile = createAsyncThunk('profile/updateProfile', async (profileData) => {
  try {
    const response = await axios.put(`${URL}/profile`, profileData, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message || 'Failed to update profile');
  }
});

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default profileSlice.reducer;
