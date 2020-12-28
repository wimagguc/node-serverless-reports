# Daily Email Reports

A Serverless - Node.js project to create html reports from database queries, and send those reports out in pretty emails.

Using AWS Lambda, you can then schedule this super-lightweight reporting app, to send out a daily email about new signups, basic usage etc.

## Dependencies

Make sure you have:

1. The [Serverless Framework](https://www.serverless.com) installed,

2. Node.js v12.0+.

3. An Amazon AWS account (as described by the [Serverless Framework](https://www.serverless.com))

## Install

1. Install project dependencies:

    ```
    $ yarn install
    ```

2. Set up all environment variables:

    You have to include your database and sendmail provider's details. Look into `serverless.yml` to see which variables you need to set.

3. Deploy the function and the /email endpoint:

    Deploy it to AWS Lambda:

    ```
    $ sls deploy
    ```

    To remove a deployed Lambda, call:

    ```
    $ sls remove
    ```

## License

[MIT, do-with-the-code-whatever-you-please License](https://github.com/wimagguc/node-serverless-reports/blob/master/LICENSE.md)

And as always, feel free to contribute!

## About

Richard Dancsi

- Blog: [wimagguc.com](https://www.wimagguc.com/)
- Twitter: [twitter.com/wimagguc](https://twitter.com/wimagguc)
- Linkedin: [linkedin.com/in/richarddancsi](https://linkedin.com/in/richarddancsi)
