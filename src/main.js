/**
 * __          __   _ _   _                  _
 * \ \        / /  (_) | | |                | |
 *  \ \  /\  / / __ _| |_| |__    _ __   ___| |_
 *   \ \/  \/ / '__| | __| '_ \  | '_ \ / _ \ __|
 *    \  /\  /| |  | | |_| | | |_| | | |  __/ |_
 *     \/  \/ |_|  |_|\__|_| |_(_)_| |_|\___|\__|
 *
 * @created     2012-09-21
 * @edited      2012-09-21
 * @package     hm-s3-backup
 *
 * Copyright (c) 2012 evin Kragenbrink <kevin@writh.net>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

var args                                = process.argv.slice(2, process.argv.length);
var config                              = require('../config/backup');
var knox                                = require('knox');
var actions                             = {};

actions.backup = function(client, files) {

    for (var i in files) {
        var file                        = files[i];
        var parts                       = file.split('/');
        var fileName                    = parts[parts.length];
        console.log(fileName);
    }
};

var createClient = function(bucket) {

    return knox.createClient({
        key                             : config.aws.apiKey,
        secret                          : config.aws.apiSecret,
        bucket                          : bucket
    });
};

var getArgument = function(n) {
    return args.shift();
};

for (var bucket in config.data) {
    var client                              = createClient(bucket);
    var action                              = getArgument();

    actions[action](client, config.data[bucket]);
}