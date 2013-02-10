var Blob = require('ngit-plumbing/git/objects/Blob'),
    mkdirp = require('mkdirp'),
    fs = require('fs'),
    zlib = require('zlib');

module.exports = function hashObject(args) {
    if (args.indexOf('--stdin') >= 0) {
        process.stdin.resume();
        process.stdin.setEncoding('utf8');

        collect(process.stdin, function (err, data) {
            var blob = new Blob(data), dir;

            console.log(blob.sha);

            if (args.indexOf('-w') >= 0) {
                dir = '.git/objects/' + blob.sha.slice(0,2);

                mkdirp(dir, function (err) {
                    if (err) throw err;

                    zlib.deflate(blob.data, function (err, compressed) {
                        if (err) throw err;

                        fs.writeFileSync(dir + '/' + blob.sha.slice(2), compressed);
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
