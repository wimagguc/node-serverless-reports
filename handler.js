'use strict'

/**
 * Serverless Module: Lambda Handler
 * - Your lambda functions should be a thin wrapper around your own separate
 * modules, to keep your code testable, reusable and AWS independent
 * - 'serverless-helpers-js' module is required for Serverless ENV var support.  Hopefully, AWS will add ENV support to Lambda soon :)
 */

// Require Logic
const lib = require('./lib/')

// Lambda Handler
module.exports.handler = async (event, context) => {
  const { error, success: response } = await lib.sendReports()
  return context.done(error, response)
}
