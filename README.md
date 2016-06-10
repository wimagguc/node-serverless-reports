# Daily Email Reports

A Serverless - Node.js project to create html reports from database queries, and send those reports out in pretty emails.

Using AWS Lambda, you can then schedule this super-lightweight reporting app, to send out a daily email about new signups, basic usage etc.

## Dependencies

Make sure you have:

1. The [Serverless Framework](http://www.serverless.com) installed,

2. Node.js v4.0+.

3. An Amazon AWS account (as described by the [Serverless Framework](http://www.serverless.com))

## Install

1. Install project dependencies via npm:

    ```
    $ npm install
    ```

2. Init the project using Serverless:

    ```
    $ serverless project init
    ```

3. Edit the config file

    You have to include your database and sendmail provider's details. An example is in `/_meta_example/variables/s-variables-dev.json` (and the config file to edit will be located under the `/_meta/` folder).

4. Deploy the function and the /email endpoint:

    Run the function locally:

    ```
    $ cd ./restApi/email
    $ serverless function run
    ```

    Deploy it to AWS Lambda:

    ```
    $ serverless dash deploy
    ```

    (Choose both `function - email` and `endpoint - email - GET`.)

5. (Optional) On the AWS Lambda console, create an event scheduler for the endpoint

## License

[MIT, do-with-the-code-whatever-you-please License](https://github.com/wimagguc/node-serverless-reports/blob/master/LICENSE.md)

And as always, feel free to contribute!

## About

Richard Dancsi

- Blog: [wimagguc.com](http://www.wimagguc.com/)
- Twitter: [twitter.com/wimagguc](http://twitter.com/wimagguc)
- Linkedin: [linkedin.com/in/richarddancsi](http://linkedin.com/in/richarddancsi)
