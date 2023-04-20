import { NextApiRequest, NextApiResponse } from 'next'
import { defaultVaultList } from 'pt-utilities'

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(defaultVaultList)
}
