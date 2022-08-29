import { Net } from '@sentre/senhub'

/**
 * Contructor
 */
type Conf = {
  node: string
  programId: string
}

const conf: Record<Net, Conf> = {
  /**
   * Development configurations
   */
  devnet: {
    node: 'https://api.devnet.solana.com',
    programId: '9GgryaH2sF4yCAYAp6GQ8R5Lu48BQ1vQKtQQP5NsebUU',
  },

  /**
   * Staging configurations
   */
  testnet: {
    node: 'https://api.testnet.solana.com',
    programId: '9GgryaH2sF4yCAYAp6GQ8R5Lu48BQ1vQKtQQP5NsebUU',
  },

  /**
   * Production configurations
   */
  mainnet: {
    node: 'https://api.mainnet-beta.solana.com',
    programId: '9GgryaH2sF4yCAYAp6GQ8R5Lu48BQ1vQKtQQP5NsebUU',
  },
}

/**
 * Module exports
 */
export default conf
