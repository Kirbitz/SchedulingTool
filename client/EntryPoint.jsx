import React from 'react'

import { Container, CssBaseline } from '@mui/material'

import PageHeader from './components/PageHeader'
import ManagerGrid from './components/ManagerGrid.jsx'
import EmployeeGrid from './components/EmployeeGrid.jsx'
import ManagerDetailsModal from './components/ManagerDetailsModal.jsx'
import EmployeeDetailsModal from './components/EmployeeDetailsModal.jsx'
import WeekendShiftsModal from './components/WeekendShiftsModal.jsx'
import FinalShiftModal from './components/FinalShiftModal.jsx'
import InputScheduleModal from './components/InputScheduleModal.jsx'

export default function EntryPoint (props) {
  const previewToggle = false

  const [employeeId, setEmployeeId] = React.useState('')
  const [managerId, setManagerId] = React.useState('')
  const [showWeekendModal, setShowWeekendModal] = React.useState(false)
  const [showFinalModal, setShowFinalModal] = React.useState(false)
  const [showInputModal, setShowInputModal] = React.useState(false)

  const onEmployeeClicked = (newEmployeeId) => {
    if (newEmployeeId !== employeeId) {
      setEmployeeId(newEmployeeId)
    }
  }

  const onManagerClicked = (newManagerId) => {
    if (newManagerId !== managerId) {
      setManagerId(newManagerId)
    }
  }

  const openWeekendModal = () => {
    setShowWeekendModal(true)
  }

  const openFinalModal = () => {
    setShowFinalModal(true)
  }

  const openInputModal = () => {
    setShowInputModal(true)
  }

  const onModalClose = () => {
    setEmployeeId('')
    setManagerId('')
    setShowWeekendModal(false)
    setShowFinalModal(false)
    setShowInputModal(false)
  }

  return (
    <Container>
      <CssBaseline />
      <PageHeader previewToggle={previewToggle} openWeekendModal={openWeekendModal} openFinalModal={openFinalModal} openInputModal={openInputModal} />
      <ManagerGrid previewToggle={previewToggle} onClickCallback={onManagerClicked} />
      <EmployeeGrid previewToggle={previewToggle} onClickCallback={onEmployeeClicked} />
      <ManagerDetailsModal previewToggle={previewToggle} employeeId={managerId} onClose={onModalClose} />
      <EmployeeDetailsModal previewToggle={previewToggle} employeeId={employeeId} onClose={onModalClose} />
      <WeekendShiftsModal previewToggle={previewToggle} openModal={showWeekendModal} onClose={onModalClose} />
      <FinalShiftModal previewToggle={previewToggle} openModal={showFinalModal} onClose={onModalClose} />
      <InputScheduleModal previewToggle={previewToggle} openModal={showInputModal} onClose={onModalClose} />
    </Container>
  )
}
