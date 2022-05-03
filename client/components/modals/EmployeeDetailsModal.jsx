import React from 'react'
import PropTypes from 'prop-types'
import { getEmployeeDetails } from '../../dataHelper.js'

import { Button, Box, Dialog, DialogTitle, DialogActions, DialogContent, Typography } from '@mui/material'
import { Backpack, CatchingPokemon, Email, PhoneAndroid, RocketLaunch, Star, Work } from '@mui/icons-material'

/**
 * A grid of game cards
 */
export default function DetailsModal (props) {
  const { employeeId, onClose, previewToggle } = props

  const [employeeDetails, setEmployeeDetails] = React.useState(null)
  const [modalOpen, setModalOpen] = React.useState(false)

  React.useEffect(() => {
    updateGameDetails()
  }, [employeeId])

  // Retrieves the latest game data and updates state
  const updateGameDetails = () => {
    if (employeeId) {
      getEmployeeDetails(employeeId)
        .then((response) => {
          setEmployeeDetails(response)
          setModalOpen(true)
        })
        .catch((err) => {
          alert('Failed to retrieve game data')
          console.error('Failed to retrieve game data')
          console.error(err)
        })
    }
  }

  const hideModal = () => {
    setModalOpen(false)
    if (onClose) { onClose() }
  }

  // Render method must return a single React element
  // - Can access this.props and this.state
  if (employeeDetails) {
    const workLocations = Object.values(employeeDetails.data.locations).join(', ')
    return (
      <Dialog fullWidth open={modalOpen} onClose={hideModal} maxWidth='xs'>
        <DialogTitle align='center'>
          <Typography variant='h3' component='div'>
            {previewToggle ? 'Sam Doe' : `${employeeDetails.data.name}`}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'left' }}>
            <Email sx={{ mr: 1 }}/>
            <Typography variant='subtitle1' component='div'>
              {previewToggle ? 'samdoe@lies.net' : `${employeeDetails.data.email}`}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'left' }}>
            <PhoneAndroid sx={{ mr: 1, color: '#2e88db' }}/>
            <Typography variant='subtitle1' component='div'>
              {previewToggle ? 'XXX-XXX-XXXX' : `${employeeDetails.data.phone}`}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'left' }}>
            <CatchingPokemon sx={{ mr: 1, color: '#ad0c0c' }}/>
            <Typography variant='subtitle1' component='div'>
              {previewToggle ? 'I am very interesting!' : `${employeeDetails.data.interestingFact}`}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'left' }}>
            <Star sx={{ mr: 1, color: '#FFD700' }}/>
            <Typography variant='subtitle1' component='div'>
              {`${employeeDetails.data.yearAtSTAR} Year at STAR`}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'left' }}>
            <Backpack sx={{ mr: 1, color: '#734e2c' }}/>
            <Typography variant='subtitle1' component='div'>
              {`${employeeDetails.data.major}`}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'left' }}>
            <RocketLaunch sx={{ mr: 1, color: 'purple' }}/>
            <Typography variant='subtitle1' component='div'>
              {`${employeeDetails.data.expectedGrad}`}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'left' }}>
            <Work sx={{ mr: 1, color: 'green' }}/>
            <Typography variant='subtitle1' component='div'>
              {`${workLocations}`}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='secondary' onClick={hideModal}>Close</Button>
        </DialogActions>
      </Dialog>
    )
  }
  return (<div></div>)
}

DetailsModal.propTypes = {
  employeeId: PropTypes.string.isRequired,
  previewToggle: PropTypes.bool.isRequired,
  onClose: PropTypes.func
}
