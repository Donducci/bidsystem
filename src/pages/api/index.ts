import axios from "axios";

interface PostDataProps {
  email: string,
  password: string
}

export async function userApi(postData: PostDataProps): Promise<any> {
  try {
    const response = await axios.post('/api/user', postData, { headers: { 'Content-Type': 'application/json' } });
    return response.data;
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

export async function getAllCollections(): Promise<any> {
  try {
    const response = await axios.get('/api/collection', { headers: { 'Content-Type': 'application/json' } });
    return response.data;
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

export async function deleteCollection(id: number | string): Promise<any> {
  try {
    const response = await axios.delete(`/api/collection?id=${id}`, { headers: { 'Content-Type': 'application/json' }})
    return response.data;
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

export async function createCollection(collectionData): Promise<any> {
  try {
    const response = await axios.post('/api/collection', collectionData, { headers: { 'Content-Type': 'application/json' } });
    return response.data;
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

export async function updateCollection(id: number, collectionData): Promise<any> {
  try { 
    const response = await axios.put(`/api/collection?id=${id}`, collectionData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error(error)
  }
}


export async function createBid(bidData): Promise<any> {
  try {
    const response = await axios.post('/api/bid', bidData, { headers: { 'Content-Type': 'application/json' } });
    return response.data;
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

export async function getBids(id: number): Promise<any> {
  try {
    const response = await axios.get(`/api/bid?id=${id}`, { headers: { 'Content-Type': 'application/json' } });
    return response.data;
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

export async function updateBid(id: number, bidStatus): Promise < any > {
  try {
    const response = await axios.put(`/api/bid?id=${id}`, bidStatus, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

export async function deleteBid(id: number | string): Promise<any> {
  try {
    const response = await axios.delete(`/api/bid?id=${id}`, { headers: { 'Content-Type': 'application/json' }})
    return response.data;
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}