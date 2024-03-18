import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CounterType, FilterType, InitialFilterState } from '@/types/types';
import { getBids } from '@/pages/api';

interface BidState {
  bids: {
    bid: any[];
    collection: any[];
  };
  isLoading: boolean;
  isSuccessed: boolean;
  error: string;
}


const initialState: BidState = {
    bids: {bid: [], collection: []},
    isLoading: false,
    isSuccessed: false,
    error: '',

};

export const getBidsLists = createAsyncThunk(
  'bids/fetchAll',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await getBids(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const bidSlice = createSlice({
  name: 'bid',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBidsLists.pending, (state) => {
          state.isLoading = true;
          state.isSuccessed = false;
          state.error = '';
      })
      .addCase(getBidsLists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessed = true;
        state.bids = action.payload;
        state.error = '';
      })
      .addCase(getBidsLists.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccessed = false;
        if (action.payload) {
          state.error = action.payload as string;
        } else {
          state.error = 'An unknown error occurred.';
        }
      });
  }
});

export default bidSlice.reducer;