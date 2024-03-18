import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllCollections  } from '@/pages/api';
import { AppDispatch } from './store';

interface CollectionState {
  collections: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CollectionState = {
  collections: [],
  status: 'idle',
  error: null,
};

export const fetchAllCollections = createAsyncThunk(
  'collections/fetchAll',
  async () => {
    const response = await getAllCollections();
    return response.data;
  }
)

export const collectionsSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCollections.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCollections.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.collections = action.payload;
      })
      .addCase(fetchAllCollections.rejected, (state, action) => {
        state.status = 'failed';
      });
  }
});

export default collectionsSlice.reducer;