import { Fragment, useEffect, useState } from 'react'
import { getAnchorProvider } from '@sen-use/web3'
import { rpc, useWalletAddress } from '@sentre/senhub'
import LuckyWheel from 'lucky-wheel-core'

import configs from 'configs'

export const AppLoader: React.FC = ({ children }) => {
  const address = useWalletAddress()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (loaded) return
    const provider = getAnchorProvider(rpc, address, window.sentre.wallet)
    const luckyWheel = new LuckyWheel(provider, configs.sol.programId)
    window.luckyWheel = luckyWheel
    setLoaded(true)
  }, [address, loaded])

  if (!loaded) return null
  return <Fragment>{children}</Fragment>
}
