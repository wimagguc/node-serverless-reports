
module.exports.reports = "\
    <h1>Hello {{name}},</h1>\
    <p>A list of users in your database:</p>\
    <p>\
        {{#each usernames}}\
            {{username}}<br>\
        {{/each}}\
    </p>\
    <p>---</p>\
";
