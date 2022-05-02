import React from 'react'
import PropTypes from 'prop-types'

import { Box, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { EventNote, DateRange, NextWeek } from '@mui/icons-material'

export default function MenuDrawer (props) {
  const { showDrawer, toggleDrawer, openWeekendModal, openFinalModal, openInputModal } = props

  return (
    <Drawer
      open={showDrawer}
      onClose={toggleDrawer}
      >
        <Box
          sx={{ auto: 250 }}
          onClick={toggleDrawer}
        >
          <List>
            <ListItem button onClick={openInputModal}>
              <ListItemIcon>
                <EventNote sx={{ color: '#2e88db' }} />
              </ListItemIcon>
              <ListItemText primary={'Input Schedule'} />
            </ListItem>
          </List>
          <Divider />
          <List>
            {['Weekend Shifts', 'Finals Shifts'].map((text, index) => (
              <ListItem button key={index} onClick={index % 2 === 0 ? openWeekendModal : openFinalModal}>
                <ListItemIcon>
                  {index % 2 === 0 ? <DateRange sx={{ color: 'green' }} /> : <NextWeek sx={{ color: '#FFD700' }} />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
  )
}

MenuDrawer.propTypes = {
  showDrawer: PropTypes.bool.isRequired,
  openWeekendModal: PropTypes.func,
  openFinalModal: PropTypes.func,
  openInputModal: PropTypes.func,
  toggleDrawer: PropTypes.func
}

MenuDrawer.defaultProps = {
  toggleDrawer: null,
  openWeekendModal: null,
  openFinalModal: null,
  openInputModal: null
}
