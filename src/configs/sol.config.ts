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
    programId: 'CmPmemCsdSH4CypNJEZRYEa29rhDPdQyadK71ArKmTGT',
    campaignId: 'F6LdJ4NHPJgLzMF5wuspBkJjHqvcJZkrqGzuzBaGFA2q',
  },

  /**
   * Staging configurations
   */
  testnet: {
    node: 'https://api.testnet.solana.com',
    programId: 'CmPmemCsdSH4CypNJEZRYEa29rhDPdQyadK71ArKmTGT',
    campaignId: 'F6LdJ4NHPJgLzMF5wuspBkJjHqvcJZkrqGzuzBaGFA2q',
  },

  /**
   * Production configurations
   */
  mainnet: {
    node: 'https://api.mainnet-beta.solana.com',
    programId: 'CmPmemCsdSH4CypNJEZRYEa29rhDPdQyadK71ArKmTGT',
    campaignId: 'F6LdJ4NHPJgLzMF5wuspBkJjHqvcJZkrqGzuzBaGFA2q',
  },
}

/**
 * Module exports
 */
export default conf
