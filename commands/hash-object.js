var createBlob = require('ngit-plumbing/git/createBlob');

module.exports = function hashObject(args) {
    console.log(args);

    if (args.indexOf('--stdin') >= 0) {
        process.stdin.resume();
        process.stdin.setEncoding('utf8');

        collect(process.stdin, function (err, data) {
            console.log(createBlob(data));
        });
    }
}

function collect(stream, callback) {
    var bucket = '';

    stream.on('data', function (chunk) {
        bucket += chunk;
    });

    stream.on('end', function () {
        callback(null, bucket);
    });

    stream.on('error', function (err) {
        callback(err);
    });
}
