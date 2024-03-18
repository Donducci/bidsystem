// auth.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { query, body, method } = req;

    if (method === 'POST') {
      console.log(body, 'data')
      const createCollections = await prisma.collection.create({ data: body });

      return res.status(200).json({ message: 'Success', data: createCollections })
    }

    if (method === 'GET') {
      const fetchAllCollections = await prisma.collection.findMany();

      return res.status(200).json({ message: 'Success', data: fetchAllCollections })
    }
    
    if (method === 'DELETE') {
      const { id } = query;
      if (!id) {
        return res.status(400).json({ message: 'Collection ID is required' });
      }
      const collectionId = Number(id);

      await prisma.bid.deleteMany({
        where: {
          collectionId: collectionId,
        },
      });

      await prisma.collection.delete({ where: { id: collectionId } });
      return res.status(200).json({ message: 'Collection deleted successfully' });
    }

    if (method === 'PUT') {
      const { id } = query;
      if (!id) { return res.status(400).json({ messsage: 'Collection ID is required' }) }
      const updateCollection = await prisma.collection.update({ where: { id: Number(id) }, data: body });
      
      return res.status(200).json({ message: 'Collection updated successfully', data: updateCollection });

    }

  } catch (error) {
    console.error('Error processing request', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
