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
    programId: 'CmPmemCsdSH4CypNJEZRYEa29rhDPdQyadK71ArKmTGT',
  },

  /**
   * Staging configurations
   */
  testnet: {
    node: 'https://api.testnet.solana.com',
    programId: 'CmPmemCsdSH4CypNJEZRYEa29rhDPdQyadK71ArKmTGT',
  },

  /**
   * Production configurations
   */
  mainnet: {
    node: 'https://api.mainnet-beta.solana.com',
    programId: 'CmPmemCsdSH4CypNJEZRYEa29rhDPdQyadK71ArKmTGT',
  },
}

/**
 * Module exports
 */
export default conf
