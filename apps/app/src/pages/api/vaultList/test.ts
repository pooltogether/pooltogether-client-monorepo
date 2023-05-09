import { NextApiRequest, NextApiResponse } from 'next'
import testVaultList from '../../../vaultLists/test'

// TODO: remove this once no longer needed
export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(testVaultList)
}
