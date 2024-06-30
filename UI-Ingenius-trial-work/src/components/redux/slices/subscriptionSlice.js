import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.withCredentials = true;
const URL = process.env.REACT_APP_URL;

export const fetchPlans = createAsyncThunk('subscription/fetchPlans', async () => {
  try {
    const response = await axios.get(`${URL}/subscriptions/plans`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message || 'Failed to fetch plans');
  }
});

export const createSubscription = createAsyncThunk('subscription/createSubscription', async (subscriptionData) => {
  try {
    const response = await axios.post(`${URL}/subscriptions`, subscriptionData, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message || 'Failed to create subscription');
  }
});

export const fetchSubscription = createAsyncThunk('subscription/fetchSubscription', async () => {
  try {
    const response = await axios.get(`${URL}/subscriptions`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message || 'Failed to fetch subscription');
  }
});

export const updateSubscription = createAsyncThunk('subscription/updateSubscription', async (subscriptionData) => {
  try {
    const response = await axios.put(`${URL}/subscriptions`, subscriptionData, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message || 'Failed to update subscription');
  }
});

export const cancelSubscription = createAsyncThunk('subscription/cancelSubscription', async (subscriptionId) => {
  try {
    const response = await axios.delete(`${URL}/subscriptions`, { data: { subscriptionId }, withCredentials: true });
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message || 'Failed to cancel subscription');
  }
});

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState: {
    plans: [],
    currentSubscription: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.plans = action.payload;
        state.loading = false;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(createSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubscription.fulfilled, (state, action) => {
        state.currentSubscription = action.payload;
        state.loading = false;
      })
      .addCase(createSubscription.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscription.fulfilled, (state, action) => {
        state.currentSubscription = action.payload;
        state.loading = false;
      })
      .addCase(fetchSubscription.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(updateSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubscription.fulfilled, (state, action) => {
        state.currentSubscription = action.payload;
        state.loading = false;
      })
      .addCase(updateSubscription.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(cancelSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelSubscription.fulfilled, (state, action) => {
        state.currentSubscription = null;
        state.loading = false;
      })
      .addCase(cancelSubscription.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default subscriptionSlice.reducer;
