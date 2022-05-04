import React from 'react'
import PropTypes from 'prop-types'

import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import { Menu } from '@mui/icons-material'

import MenuDrawer from './MenuDrawer.jsx'

export default function PageHeader (props) {
  // Destructor props into previewToggle, openWeekendModal, openFinalModal, and openInputModal
  const { previewToggle, openWeekendModal, openFinalModal, openInputModal } = props

  // Hooks for grabbing showDrawer state
  const [showDrawer, setShowDrawer] = React.useState(false)

  // function to open the menu drawer
  const openDrawer = () => {
    setShowDrawer(true)
  }

  // function to close the menu drawer
  const closeDrawer = () => {
    setShowDrawer(false)
  }

  return (
    <React.Fragment>
      {/* Header bar for the website */}
      <AppBar sx={{ bgcolor: '#0b233f' }}>
        <Toolbar>
          {/* IconButton for the menu options */}
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
          {/* Header title */}
          <Typography variant='h4' component='h3' sx={{ flexGrow: 1 }}>
            Techdesk Schedule Tool {previewToggle ? '- Preview' : ''}
          </Typography>
          {/* Stout image for the bar */}
          <img
            src='\StoutIcon.jpg'
            alt='Stout Logo'
            height='80px'
            width='80px'
          />

          {/* MenuDrawer component to display options the the user */}
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

// Prop validation for PageHeader
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
