import { NextApiRequest, NextApiResponse } from 'next';

// Mock database for demonstration
let likeData: { [key: string]: { count: number; likes: Set<string> } } = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const userIdentifier = req.cookies['user-id'] || req.headers['user-agent'];

  if (req.method === 'GET') {
    const likeEntry = likeData[id as string] || { count: 0, likes: new Set() };
    const hasLiked = likeEntry.likes.has(userIdentifier as string);
    res.status(200).json({ likeCount: likeEntry.count, hasLiked });
  } else if (req.method === 'POST') {
    let likeEntry = likeData[id as string];

    if (!likeEntry) {
      likeEntry = { count: 0, likes: new Set() };
      likeData[id as string] = likeEntry;
    }

    if (!likeEntry.likes.has(userIdentifier as string)) {
      likeEntry.count += 1;
      likeEntry.likes.add(userIdentifier as string);
    }

    res.status(200).json({ likeCount: likeEntry.count });
  } else if (req.method === 'DELETE') {
    let likeEntry = likeData[id as string];

    if (!likeEntry) {
      likeEntry = { count: 0, likes: new Set() };
      likeData[id as string] = likeEntry;
    }

    if (likeEntry.likes.has(userIdentifier as string)) {
      likeEntry.count -= 1;
      likeEntry.likes.delete(userIdentifier as string);
    }

    res.status(200).json({ likeCount: likeEntry.count });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
