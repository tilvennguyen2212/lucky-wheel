import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { AntdProvider, useSetBackground } from '@sentre/senhub'

import View from 'view'

import model from 'model'
import configs from 'configs'

import BG from 'static/images/bg-lucky-wheel.svg'

import './static/styles/light.less'
import './static/styles/dark.less'

const {
  manifest: { appId },
} = configs

export const Page = () => {
  const setBackground = useSetBackground()

  useEffect(() => {
    setBackground({ dark: BG, light: BG })
  }, [setBackground])

  return (
    <AntdProvider appId={appId} prefixCls={appId}>
      <Provider store={model}>
        <View />
      </Provider>
    </AntdProvider>
  )
}

export * from 'static.app'
