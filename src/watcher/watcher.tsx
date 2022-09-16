import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { Program, web3 } from '@project-serum/anchor'
import { encodeIxData, accountDiscriminator } from '@sen-use/web3'

import { notifyError } from 'helper'

type UseWatcherProps = {
  program: Program<any>
  name: keyof UseWatcherProps['program']['account']
  filter: web3.GetProgramAccountsFilter[]
  upset: (key: string, value: any) => void
  init: (bulk: Record<string, any>) => void
}

const Watcher = (props: UseWatcherProps) => {
  const { program, name, filter, upset, init } = props
  const [watchId, setWatchId] = useState(0)

  const { accountClient, connection } = useMemo(() => {
    const accountClient = program?.account?.[name]
    const connection = accountClient.provider.connection
    return { accountClient, connection }
  }, [name, program?.account])

  const fetchData = useCallback(async () => {
    try {
      const accountInfos = await accountClient.all(filter)
      const bulk: any = {}
      for (const info of accountInfos) {
        bulk[info.publicKey.toBase58()] = info.account
      }
      init(bulk)
    } catch (error) {
      notifyError(error)
    }
  }, [accountClient, filter, init])

  const watchData = useCallback(async () => {
    if (watchId) return
    const newWatcherId = connection.onProgramAccountChange(
      accountClient.programId,
      async (info) => {
        const address = info.accountId.toBase58()
        const buffer = info.accountInfo.data
        const accountData = program.coder.accounts.decode(name, buffer)
        upset(address, accountData)
      },
      'confirmed',
      [
        {
          memcmp: {
            offset: 0,
            bytes: encodeIxData(accountDiscriminator(name)),
          },
        },
        ...filter,
      ],
    )
    setWatchId(newWatcherId)
  }, [
    accountClient.programId,
    connection,
    filter,
    name,
    program.coder.accounts,
    upset,
    watchId,
  ])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    if (watchId) return
    watchData()
    return () => {
      ;(async () => {
        if (!watchId) return
        await connection.removeProgramAccountChangeListener(watchId)
        setWatchId(0)
      })()
    }
  }, [connection, watchData, watchId])

  return <Fragment />
}

export default Watcher
