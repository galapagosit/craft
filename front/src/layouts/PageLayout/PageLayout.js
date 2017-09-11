import React from 'react'
import PropTypes from 'prop-types'
import './PageLayout.scss'

import FooterNavigation from '../../components/FooterNavigation'

export const PageLayout = ({ children }) => (
  <div className='container' style={{height: '100%', width: '100%', padding: 0}}>
    <div className='page-layout__viewport' style={{paddingBottom: '64px'}}>
      {children}
    </div>
    <FooterNavigation classes={{root: 'footer'}}/>
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
