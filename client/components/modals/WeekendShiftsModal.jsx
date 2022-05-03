import React from 'react'
import PropTypes from 'prop-types'

import { getWeekendShifts } from '../../dataHelper.js'

import WeekendModalBody from '../modalParts/WeekendModalBody.jsx'
import MyDatePicker from '../modalParts/MyDatePicker.jsx'

import { Backdrop, Box, Button, CircularProgress, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material'

export default function WeekendShiftsModal (props) {
  const { previewToggle, openModal, onClose } = props

  const [shiftData, setShiftData] = React.useState(null)
  const [startDate, setStartDate] = React.useState(null)
  const [endDate, setEndDate] = React.useState(null)
  const [openLoading, setOpenLoading] = React.useState(false)

  const getShifts = () => {
    if (startDate && endDate) {
      setOpenLoading(true)
      getWeekendShifts(startDate.format('L'), endDate.format('L'))
        .then((response) => {
          setShiftData(response.data.filter((employee) => { return (!employee.locations['1949304']) }))
          setOpenLoading(false)
        })
        .catch((err) => {
          alert('Failed to get weekend shifts!\nPlease enter a proper date and time!')
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
            Weekend Shifts
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
      <WeekendModalBody previewToggle={previewToggle} weekendShiftData={shiftData} />
      <DialogActions>
        <Button variant='outlined' sx={{ color: '#0b233f' }} onClick={getShifts}>Get Shifts</Button>
        <Button variant='outlined' color='secondary' onClick={hideModal}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

WeekendShiftsModal.propTypes = {
  openModal: PropTypes.bool,
  previewToggle: PropTypes.bool.isRequired,
  onClose: PropTypes.func
}

WeekendShiftsModal.defaultProps = {
  openModal: false,
  onClose: null
}
