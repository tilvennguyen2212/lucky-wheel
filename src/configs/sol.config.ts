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
    programId: '2L1eKz8TA88j84yoAywGdeKF1ohvjQC4iMxzR5GbjkWD',
    campaignId: 'FdBXXUwYfzc7B6krZPd3UoksqDA5dHzzYuJWLbJBG9Qj',
  },

  /**
   * Staging configurations
   */
  testnet: {
    node: 'https://api.testnet.solana.com',
    programId: '2L1eKz8TA88j84yoAywGdeKF1ohvjQC4iMxzR5GbjkWD',
    campaignId: 'FdBXXUwYfzc7B6krZPd3UoksqDA5dHzzYuJWLbJBG9Qj',
  },

  /**
   * Production configurations
   */
  mainnet: {
    node: 'https://api.mainnet-beta.solana.com',
    programId: '2L1eKz8TA88j84yoAywGdeKF1ohvjQC4iMxzR5GbjkWD',
    campaignId: 'FdBXXUwYfzc7B6krZPd3UoksqDA5dHzzYuJWLbJBG9Qj',
  },
}

/**
 * Module exports
 */
export default conf
