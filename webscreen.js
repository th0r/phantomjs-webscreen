var DEFAULT_RESOLUTION = [1280, 1024],
    fullArgs = require('system').args,
    args = fullArgs.slice(1),
    page = require('webpage').create(),
    url,
    screenshotFile,
    resolution = DEFAULT_RESOLUTION;

function print(msg) {
    console.log(msg);
}

function error(msg) {
    print(msg);
    phantom.exit();
}

if (args.length >= 2) {
    url = args[0];
    screenshotFile = args[1];
    if (args[2]) {
        resolution = args[2].split(/x/i, 2).map(function (val) {
            return parseInt(val, 10);
        });
        
        if (resolution.length !== 2 || resolution.some(function (val) {return isNaN(val)})) {
            error('Incorrect window_size parameter: ' + args[2]);
        }
    }
} else {
    error(
        'Usage:\n' +
        '    phantomjs ' + fullArgs[0] + ' webpage_url screenshot_file [window_size=1280x1024]\n\n' +
        'Example:\n' +
        '    phantomjs ' + fullArgs[0] + ' http://dudu.com dudu.png 1920x1080'
    )
}

page.viewportSize = {
    width: resolution[0],
    height: resolution[1]
};

page.clipRect = {
    left: 0,
    top: 0,
    width: resolution[0],
    height: resolution[1]
};

page.open(url, function () {
    // Fixing transparent background issue
    // http://uggedal.com/journal/phantomjs-default-background-color/
    page.evaluate(function () {
        var style = document.createElement('style'),
            text = document.createTextNode('body { background: #fff }');
        
        style.setAttribute('type', 'text/css');
        style.appendChild(text);
        document.head.insertBefore(style, document.head.firstChild);
    });

    page.render(screenshotFile);
    print('Screenshot for "' + url + '" is successfully captured to "' + screenshotFile + '" with resolution ' + resolution.join('x'));
    phantom.exit();
});
