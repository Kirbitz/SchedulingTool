import React from 'react'
import PropTypes from 'prop-types'

import { getFinalShifts } from '../../dataHelper.js'

import FinalModalBody from '../modalParts/FinalModalBody.jsx'
import MyDatePicker from '../modalParts/MyDatePicker.jsx'

import { Backdrop, Box, Button, CircularProgress, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material'

export default function FinalShiftModal (props) {
  // Destructor props into openModal, onClose, and previewToggle
  const { previewToggle, openModal, onClose } = props

  // Hooks for storing the startDate, endData, shiftData, and openLoading
  const [shiftData, setShiftData] = React.useState(null)
  const [startDate, setStartDate] = React.useState(null)
  const [endDate, setEndDate] = React.useState(null)
  const [openLoading, setOpenLoading] = React.useState(false)

  // Function for grabbing the shift data for employees
  const getShifts = () => {
    if (startDate && endDate) {
      setOpenLoading(true)
      getFinalShifts(startDate.format('L'), endDate.format('L'))
        .then((response) => {
          setShiftData(response.data.filter((employee) => { return (!employee.locations['1949304']) }))
          setOpenLoading(false)
        })
        .catch((err) => {
          alert('Failed to get weekend shifts!')
          console.error(err)
          setOpenLoading(false)
        })
    }
  }

  // Function to hide the weekend shifts modal
  const hideModal = () => {
    if (onClose) { onClose() }
  }

  return (
    <Dialog fullWidth open={openModal} maxWidth='md' onClose={hideModal}>
      <DialogTitle>
        {/* Title for the modal being the final shifts and boxes for date entries */}
        <Box sx={{ display: 'flex' }}>
          <Typography variant='h3' component='div' sx={{ flexGrow: 1 }}>
            Finals Shifts
          </Typography>
          <MyDatePicker textLabel={'Start Date'} dateVal={startDate} changeDate={setStartDate} />
          <MyDatePicker textLabel={'End Date'} dateVal={endDate} changeDate={setEndDate} />
        </Box>
      </DialogTitle>
      {/* Backdrop and circular progress to appear when loading the data */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* Body of the modal to appear when the data is loaded */}
      <FinalModalBody previewToggle={previewToggle} finalShiftData={shiftData} />
      <DialogActions>
        {/* Close and submit actions for the modal */}
        <Button variant='outlined' sx={{ color: '#0b233f' }} onClick={getShifts}>Get Shifts</Button>
        <Button variant='outlined' color='secondary' onClick={hideModal}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

// Prop validation for FinalShiftModal
FinalShiftModal.propTypes = {
  openModal: PropTypes.bool,
  previewToggle: PropTypes.bool.isRequired,
  onClose: PropTypes.func
}

FinalShiftModal.defaultProps = {
  openModal: false,
  onClose: null
}
