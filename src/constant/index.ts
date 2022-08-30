export enum Reward {
  Token = 'token',
  NFT = 'nft',
  GoodLuck = 'good-luck',
  Ticket = 'ticket',
}

export const LIST_BG_WHEEL = [
  'radial-gradient(47.41% 47.41% at 49.98% 50.04%,#8952cc 10.07%,#b67aff 58.27%,#d2adff 85.66%,#d2adff 92.66%,#9553e6 100%)',
  'radial-gradient(47.41% 47.41% at 49.98% 50.04%, #52C4CC 10.07%, #7AF6FF 58.27%, #B3FAFF 85.66%, #85F7FF 92.66%, #53DCE6 100%)',
  'radial-gradient(47.41% 47.41% at 49.98% 50.04%, #C25F3E 10.07%, #EE7C56 58.27%, #FFAB8F 84.11%, #FFA385 92.66%, #E67049 100%)',
]

export enum TabId {
  Spin = 'spin',
  Reward = 'reward',
  Challenge = 'challenge',
}

export const LUCKY_WHEEL_TABS = [
  { label: 'Spin', value: TabId.Spin },
  { label: 'Your Reward', value: TabId.Reward },
  { label: 'Challenge', value: TabId.Challenge },
]
