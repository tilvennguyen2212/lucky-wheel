import { Net } from '@sentre/senhub'

/**
 * Contructor
 */
type Conf = {
  node: string
  programId: string
  campaignId: string
}

const conf: Record<Net, Conf> = {
  /**
   * Development configurations
   */
  devnet: {
    node: 'https://api.devnet.solana.com',
    programId: 'Hq5UKe4i3Naug6vkr2RGscwec2NCMoeUtLkRyigpuuD4',
    campaignId: '6wQuaRJ4neURVJfRwmhbH2BzBCx3cABxuSXdh1mDKFYs',
  },

  /**
   * Staging configurations
   */
  testnet: {
    node: 'https://api.testnet.solana.com',
    programId: 'Hq5UKe4i3Naug6vkr2RGscwec2NCMoeUtLkRyigpuuD4',
    campaignId: '6wQuaRJ4neURVJfRwmhbH2BzBCx3cABxuSXdh1mDKFYs',
  },

  /**
   * Production configurations
   */
  mainnet: {
    node: 'https://api.mainnet-beta.solana.com',
    programId: 'Hq5UKe4i3Naug6vkr2RGscwec2NCMoeUtLkRyigpuuD4',
    campaignId: '6wQuaRJ4neURVJfRwmhbH2BzBCx3cABxuSXdh1mDKFYs',
  },
}

/**
 * Module exports
 */
export default conf
