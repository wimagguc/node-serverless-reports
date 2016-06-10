/**
 * Lib
 */

var path = require('path');
var Promise = require('bluebird');
var nodemailer = require('nodemailer');
var reports = require('./reports');
var handlebars = require('handlebars');
var emailTemplates = require('./templates/email');

var TEMPLATES_DIR = './templates/';

module.exports.sendReports = function(event, cb) {

    if (!process.env.EMAIL_SERVICE || !process.env.EMAIL_SERVICE_USER
        || !process.env.EMAIL_SERVICE_PASS || !process.env.EMAIL_FROM
        || !process.env.EMAIL_TO)
    {
        return cb(null, 'ENV vars are not correctly set');
    }

    reports.createReports(
        // resultFinishedCallback(result)
        function(result) {

            var mailOptions = {
        		from: process.env.EMAIL_FROM,
        		to: process.env.EMAIL_TO,
                template: 'email.handlebars',
        		subject: 'Reports',
                context: {
                    "name" : "Admin",
                    "usernames" : result.usernames
                }
        	};

            var template = handlebars.compile(emailTemplates.reports);
            mailOptions.html = template(mailOptions.context);

            var transporter = nodemailer.createTransport({
                service: process.env.EMAIL_SERVICE,
                auth: {
                    user: process.env.EMAIL_SERVICE_USER,
                    pass: process.env.EMAIL_SERVICE_PASS
                }
            });

            Promise.promisifyAll(transporter);

            transporter.sendMailAsync(mailOptions, function(error, info) {
                if (error) {
                    return cb(null, "Error: " + error);
                }
                return cb(null, "Email sent: " + mailOptions.html);
            });

        },

        // connectionFinishedCallback(error)
        function(error) {
            return cb(null, "Database connection finished.");
        }
    );

};
