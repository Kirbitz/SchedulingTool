import React from 'react'
import PropTypes from 'prop-types'

import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import { Menu } from '@mui/icons-material'

import MenuDrawer from './MenuDrawer.jsx'

export default function PageHeader (props) {
  const { previewToggle, openWeekendModal, openFinalModal, openInputModal } = props

  const [showDrawer, setShowDrawer] = React.useState(false)

  const openDrawer = () => {
    setShowDrawer(true)
  }

  const closeDrawer = () => {
    setShowDrawer(false)
  }

  return (
    <React.Fragment>
      <AppBar sx={{ bgcolor: '#0b233f' }}>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={openDrawer}
          >
            <Menu />
          </IconButton>
          <Typography variant='h4' component='h3' sx={{ flexGrow: 1 }}>
            Techdesk Schedule Tool {previewToggle ? '- Preview' : ''}
          </Typography>
          <img
            src='\StoutIcon.jpg'
            alt='Stout Logo'
            height='80px'
            width='80px'
            />

            <MenuDrawer
              showDrawer={showDrawer}
              openWeekendModal={openWeekendModal}
              openFinalModal={openFinalModal}
              openInputModal={openInputModal}
              toggleDrawer={closeDrawer}
            />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  )
}

PageHeader.propTypes = {
  previewToggle: PropTypes.bool.isRequired,
  openWeekendModal: PropTypes.func,
  openFinalModal: PropTypes.func,
  openInputModal: PropTypes.func
}

PageHeader.defaultProps = {
  openWeekendModal: null,
  openFinalModal: null,
  openInputModal: null
}
