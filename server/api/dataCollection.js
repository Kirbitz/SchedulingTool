import axios from 'axios'
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'
import dotenv from 'dotenv'

// Read the .env variables into the environment
dotenv.config()

// Generates data of the current employees in humanity
export function generateEmployees () {
  return new Promise((resolve, reject) => {
    // Creates initial list of employees
    const employees = []

    // Axios call to the humanity api
    axios.get(`https://www.humanity.com/api/v2/employees?access_token=${process.env.API_KEY}`)
      .then((response) => {
        // Loops through response data
        response.data.data.forEach(employee => {
          // Checks if the employee does not have the manager label and if they are a student manager via name
          if (!employee.schedules['1949304'] || [''].includes(employee.name)) {
            // Creates image name based of the employee's name
            const imageName = employee.name.replace(/[^a-zA-Z]/ig, '')
            // Fetches image and places it in the public avatars folder
            if (employee.avatar.medium !== '/app/layout/images/no_avatar.png') {
              fetch(employee.avatar.medium)
                .then(image => image.arrayBuffer())
                .then(image => fs.writeFileSync(path.join('public', 'avatars', `${imageName}.jpg`), Buffer.from(image)))
            }
            // Creates an employee with data provided and pushes that employee to the employees array
            employees.push({
              id: employee.id,
              name: employee.name,
              email: employee.email,
              phone: employee.cell_phone,
              locations: employee.schedules,
              interestingFact: employee.custom['3678'].value,
              yearAtSTAR: employee.custom['6879'].value,
              major: employee.custom['6880'].value,
              expectedGrad: employee.custom['15936'].value,
              avatar: `${imageName}.jpg`
            })
          }
        })
        // Writes the managers and employees arrays to their appropriate file
        fs.writeFileSync(path.join('server', 'api', 'employeeData.json'), JSON.stringify(employees, null, 2))
        return resolve()
      })
      .catch((err) => {
        return reject(err)
      })
  })
}
