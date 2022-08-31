import { Env } from '@sentre/senhub'

/**
 * Contructor
 */

type BasicEndpoint = { index: string } & Record<string, string>
type Conf = {
  origin: string
  lottery: BasicEndpoint
}

const generator = (origin: string): Conf => ({
  origin,
  lottery: {
    index: origin + '/lottery',
    get publicKey() {
      return this.index + '/util/lottery-pubkey'
    },
    get luckyNumber() {
      return this.index + '/lucky-number/'
    },
  },
})

const conf: Record<Env, Conf> = {
  /**
   * Development configurations
   */
  development: {
    ...generator('https://api.sentre.io'),
  },

  /**
   * Production configurations
   */
  production: {
    ...generator('https://api.sentre.io'),
  },
}

/**
 * Module exports
 */
export default conf
