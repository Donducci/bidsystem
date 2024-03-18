import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { query, body, method } = req;

    if (method === 'POST') {
      const createBids = await prisma.bid.create({ data: body });

      return res.status(200).json({ message: 'Success', data: createBids })
    }

    if (method === 'GET') {
      const { id, userId } = query;
      if (id) {
        const bidForCollection = await prisma.bid.findMany({
          where: {
            collectionId: Number(id)
          },
          include: {
            user: true // Include user data
          }
        });
              
        const collectionById = await prisma.collection.findMany({ where: { id: Number(id) } })
        return res.status(200).json({ message: 'Success', bid: bidForCollection, collection: collectionById })
      }
    }

    if (method === 'PUT') {
      const { id } = query;
      if (!id) { return res.status(400).json({ messsage: 'Bid ID is required' }) }
      const updatedBid = await prisma.bid.update({ where: { id: Number(id) }, data: body });
      
      return res.status(200).json({ message: 'Bid updated successfully', data: updatedBid });

    }

    if (method === 'DELETE') {
      const { id } = query;
      if (!id) {
        return res.status(400).json({ message: 'Bid ID is required' });
      }

      await prisma.bid.delete({ where: { id: Number(id) } });
      return res.status(200).json({ message: 'Bid deleted successfully' });
    }

  } catch (error) {
    console.error('Error processing request', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
