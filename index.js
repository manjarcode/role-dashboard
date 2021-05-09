const init = require('./server')
const setupEndpoints = require('./endpoints')
const Dashboard = require('./dashboard')

const dashboard = new Dashboard
const app = init()

setupEndpoints(app, dashboard)

