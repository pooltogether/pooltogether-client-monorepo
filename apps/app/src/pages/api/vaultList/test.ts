import { NextApiRequest, NextApiResponse } from 'next'
import testVaultList from '../../../vaultLists/test'

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(testVaultList)
}
