var provideContent = require('ngit-plumbing/git/provideContent'),
    objectType = require('ngit-plumbing/git/objectType');

module.exports = function catFile(args) {
    var sha = args[args.length - 1],
        objDir = '.git/objects';

    if (args.indexOf('-p') >= 0) {
        provideContent(sha, objDir, function (err, data) {
            console.log(data.toString());
        });
    } else if (args.indexOf('-t') >= 0) {
        objectType(sha, objDir, function (err, type) {
            console.log(type);
        });
    }

}
