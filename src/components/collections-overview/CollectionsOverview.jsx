import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCollections } from '../../redux/shop/shop.selectors'
import CollectionPreview from '../collection-preview/CollectionPreview'

import './collectionsOverview.scss'

const CollectionsOverview = ({ collections }) => {
  return (
    <div className='collections-overview'>
      {
        collections.map(({ id, ...otherCollectionsProps }) =>(
          <CollectionPreview key={ id } { ...otherCollectionsProps } />
        ))
      }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  collections: selectCollections
})

export default connect(mapStateToProps)(CollectionsOverview)
