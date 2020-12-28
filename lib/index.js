/**
 * Lib
 */

const Promise = require('bluebird')
const nodemailer = require('nodemailer')
const reports = require('./reports')
const handlebars = require('handlebars')
const emailTemplates = require('./templates/email')

module.exports.sendReports = async function () {
  if (
    !process.env.EMAIL_SERVICE_HOST ||
    !process.env.EMAIL_SERVICE_USER ||
    !process.env.EMAIL_SERVICE_PASS ||
    !process.env.EMAIL_FROM ||
    !process.env.EMAIL_TO
  ) {
    return { error: 'ENV vars are not correctly set' }
  }

  const getReports = () => {
    return new Promise((resolve) => {
      reports.createReports((results) => {
        resolve({ results })
      })
    })
  }

  const { error, data } = await getReports()

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    template: 'email.handlebars',
    subject: 'Reports',
    context: {
      name: 'Admin',
      usernames: data,
    },
  }

  const template = handlebars.compile(emailTemplates.reports)
  mailOptions.html = template(mailOptions.context)

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVICE_HOST,
    port: process.env.EMAIL_SERVICE_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_SERVICE_USER,
      pass: process.env.EMAIL_SERVICE_PASS,
    },
  })

  Promise.promisifyAll(transporter)

  const sendMail = (mailOptions) => {
    return new Promise((resolve) => {
      transporter.sendMail(mailOptions, function (error) {
        resolve({ error })
      })
    })
  }

  const { error } = await sendMail(mailOptions)

  if (error) {
    return { error }
  }
  return { success: 'Email sent: ' + mailOptions.html }
}
