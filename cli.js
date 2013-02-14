#!/usr/bin/env node
var args, cmd, commands = {};

commands['hash-object'] = require('./commands/hash-object');
commands['cat-file']    = require('./commands/cat-file');

// skip "node" and "ngit"
args = process.argv.slice(2);

if (args.length) {
    if (cmd = commands[args.shift()]) {
        cmd(args);
    } else {
        console.log("command not recognized");
    }
}
