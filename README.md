#phantomjs-webscreen

Simple PhantomJS script to capture webpage screenshots

##Usage:
From command line:

    $ phantomjs webscreen.js webpage_url screenshot_file [window_size=1280x1024]

Parameters:  
`webpage_url` - URL of the page to capture screenshot from. **Required.**  
`screenshot_file` - Absolute ot relative path to the captured screenshot. **Required.**  
`window_size` - Size of the browser window (and screenshot) in `width`x`height` format. **Optional** (default is `1280x1024`).

Example:

    $ phantomjs webscreen.js http://google.com google.png 1920x1080