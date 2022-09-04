import { Fragment, useState } from 'react'

import { Button, Modal } from 'antd'
import {
  SearchNFT as ModalContentListNFTs,
  searchNFTType,
} from '@sen-use/components'

const NftCollection = ({
  setCollection,
}: {
  setCollection: (val: string) => void
}) => {
  const [visible, setVisible] = useState(false)

  return (
    <Fragment>
      <Button onClick={() => setVisible(true)}>Select NFT</Button>
      <Modal visible={visible} onCancel={() => setVisible(false)} footer={null}>
        <ModalContentListNFTs
          onSelect={(mintAddress) => setCollection(mintAddress)}
          searchNFTby={searchNFTType.collections}
        />
      </Modal>
    </Fragment>
  )
}

export default NftCollection
