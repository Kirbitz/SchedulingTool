import React from 'react'
import PropTypes from 'prop-types'

import InputModalBody from '../modalParts/InputModalBody.jsx'

import { Box, Button, Dialog, DialogActions, DialogTitle, Paper, Tab, Tabs, Typography } from '@mui/material'

export default function InputScheduleModal (props) {
  // Destructor props into openModal, onClose, and previewToggle
  const { previewToggle, openModal, onClose } = props

  // Indicator color for the tabs
  const tabColors = ['green', 'orange', 'purple']

  // Hook for tabPosition
  const [tabPos, setTabPos] = React.useState(0)

  // Handles updates of the tabPosition
  const handleChange = (event, newTabPos) => {
    if (newTabPos !== tabPos) {
      setTabPos(newTabPos)
    }
  }

  // Function to close the input modal
  const hideModal = () => {
    if (onClose) { onClose() }
  }

  return (
    <Dialog fullWidth open={openModal} maxWidth='xl' onClose={hideModal}>
      <DialogTitle>
        <Box sx={{ display: 'flex' }}>
          <Typography variant='h3' component='div' sx={{ flexGrow: 1 }}>
            Schedule Input
          </Typography>
        </Box>
        {/* Tab selector for the different schedules */}
        <Paper elevation={2} sx={{ mt: 1 }}>
          <Tabs
            value={tabPos}
            onChange={handleChange}
            centered
            TabIndicatorProps={{ style: { backgroundColor: tabColors[tabPos] } }}
            textColor='inherit'
            variant='fullWidth'
            aria-label='Employee areas tabs'
          >
            <Tab label='Walkup' sx={{ color: 'green' }} />
            <Tab label='QA' sx={{ color: 'orange' }} />
            <Tab label='PC Repair' sx={{ color: 'purple' }} />
          </Tabs>
        </Paper>
      </DialogTitle>
      {/* Body of the modal to load in based on the tab position */}
      <InputModalBody previewToggle={previewToggle} tabPos={tabPos} />
      <DialogActions>
        {/* Button to close the modal */}
        <Button variant='outlined' color='secondary' onClick={hideModal}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

// Prop validation for InputScheduleModal
InputScheduleModal.propTypes = {
  openModal: PropTypes.bool,
  previewToggle: PropTypes.bool.isRequired,
  onClose: PropTypes.func
}

InputScheduleModal.defaultProps = {
  openModal: false,
  onClose: null
}
