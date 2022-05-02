import axios from 'axios'

export function getEmployeeList () {
  return new Promise((resolve, reject) => {
    axios.get('data/employees')
      .then((response) => { return resolve(response) })
      .catch((error) => { return reject(error) })
  })
}

export function getManagerList () {
  return new Promise((resolve, reject) => {
    axios.get('data/managers')
      .then((response) => { return resolve(response) })
      .catch((error) => { return reject(error) })
  })
}

export function getEmployeeDetails (employeeID) {
  return new Promise((resolve, reject) => {
    axios.get(`data/employee/${employeeID}`)
      .then((response) => { return resolve(response) })
      .catch((error) => { return reject(error) })
  })
}

export function getManagerDetails (employeeID) {
  return new Promise((resolve, reject) => {
    axios.get(`data/manager/${employeeID}`)
      .then((response) => { return resolve(response) })
      .catch((error) => { return reject(error) })
  })
}

export function getWeekendShifts (dateStart, dateEnd) {
  return new Promise((resolve, reject) => {
    axios.get(`data/weekend_shifts/${dateStart}/${dateEnd}`)
      .then((response) => { return resolve(response) })
      .catch((error) => { return reject(error) })
  })
}

export function getFinalShifts (dateStart, dateEnd) {
  return new Promise((resolve, reject) => {
    axios.get(`data/shifts/${dateStart}/${dateEnd}`)
      .then((response) => { return resolve(response) })
      .catch((error) => { return reject(error) })
  })
}

export function postGame (game) {
  return new Promise((resolve, reject) => {
    axios.post('data/insert', game)
      .then((response) => {
        alert('Data added successfully')
        return resolve()
      })
      .catch((err) => {
        alert('Data not posted to database')
        return reject(err)
      })
  })
}
