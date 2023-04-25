import { NextApiRequest, NextApiResponse } from 'next'
import defaultVaultList from '../../../vaultLists/default'

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(defaultVaultList)
}
