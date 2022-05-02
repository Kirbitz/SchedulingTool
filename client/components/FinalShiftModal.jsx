import React from 'react'
import PropTypes from 'prop-types'

import { getFinalShifts } from '../dataHelper.js'

import FinalModalBody from './modalParts/FinalModalBody.jsx'
import MyDatePicker from './modalParts/MyDatePicker.jsx'

import { Backdrop, Box, Button, CircularProgress, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material'

export default function FinalShiftModal (props) {
  const { previewToggle, openModal, onClose } = props

  const [shiftData, setShiftData] = React.useState(null)
  const [startDate, setStartDate] = React.useState(null)
  const [endDate, setEndDate] = React.useState(null)
  const [openLoading, setOpenLoading] = React.useState(false)

  const getShifts = () => {
    if (startDate && endDate) {
      setOpenLoading(true)
      getFinalShifts(startDate.format('L'), endDate.format('L'))
        .then((response) => {
          setShiftData(response.data)
          setOpenLoading(false)
        })
        .catch((err) => {
          alert('Failed to get weekend shifts!')
          console.error(err)
          setOpenLoading(false)
        })
    }
  }

  const hideModal = () => {
    if (onClose) { onClose() }
  }

  return (
    <Dialog fullWidth open={openModal} maxWidth='md' onClose={hideModal}>
      <DialogTitle>
        <Box sx={{ display: 'flex' }}>
          <Typography variant='h3' component='div' sx={{ flexGrow: 1 }}>
            Finals Shifts
          </Typography>
          <MyDatePicker textLabel={'Start Date'} dateVal={startDate} changeDate={setStartDate} />
          <MyDatePicker textLabel={'End Date'} dateVal={endDate} changeDate={setEndDate} />
        </Box>
      </DialogTitle>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <FinalModalBody previewToggle={previewToggle} finalShiftData={shiftData} />
      <DialogActions>
        <Button variant='outlined' sx={{ color: '#0b233f' }} onClick={getShifts}>Get Shifts</Button>
        <Button variant='outlined' color='secondary' onClick={hideModal}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

FinalShiftModal.propTypes = {
  openModal: PropTypes.bool,
  previewToggle: PropTypes.bool.isRequired,
  onClose: PropTypes.func
}

FinalShiftModal.defaultProps = {
  openModal: false,
  onClose: null
}
