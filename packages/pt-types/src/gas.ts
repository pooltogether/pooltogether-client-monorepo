import { BigNumber } from 'ethers'

export interface PoolTogetherApiGasPrices {
  SafeGasPrice: number
  ProposeGasPrice: number
  FastGasPrice: number
}

export interface GasCostEstimates {
  totalGasWei: BigNumber
  totalGasCurrencies: {
    [currency: string]: string
  }
}
