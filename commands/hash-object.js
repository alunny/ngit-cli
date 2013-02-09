var createBlob = require('ngit-plumbing/git/createBlob'),
    mkdirp = require('mkdirp'),
    fs = require('fs'),
    zlib = require('zlib');

module.exports = function hashObject(args) {
    console.log(args);

    if (args.indexOf('--stdin') >= 0) {
        process.stdin.resume();
        process.stdin.setEncoding('utf8');

        collect(process.stdin, function (err, data) {
            var sha = createBlob(data), dir;

            if (args.indexOf('-w') >= 0) {
                dir = '.git/objects/' + sha.slice(0,2);

                mkdirp(dir, function (err) {
                    if (err) throw err;

                    zlib.deflate(data, function (err, compressed) {
                        if (err) throw err;

                        fs.writeFileSync(dir + '/' + sha.slice(2), compressed);
                    });
                });
            }
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
