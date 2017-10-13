//REQUIRES
var Animation = require('alloy/animation'),
    VariableWatcher = require('variableWatcher');

//CONSTANTS

//VARS
var args = $.args || {},
    exampleNumber = args.exampleNumber,
    onRenderedCallback = args.onRenderedCallback || null,
    textLoaded = false,
    imageLoaded = false,
    timeout1Duration,
    timeout2Duration;

//pick a random timeout value in a range to simulate varying load times for text and images - used in examples 1 and 3
timeout1Duration = 1000 * (1 + Math.random() * 3);
timeout2Duration = 1000 * (1 + Math.random() * 1);
console.log('timeout1Duration = ' + timeout1Duration);
console.log('timeout2Duration = ' + timeout2Duration);

switch (exampleNumber) {

    case 1:

        setTimeout(function() {
            $.imageView.image = args.imagePath || '';
            imageLoaded = true;
            if (textLoaded && onRenderedCallback) {
                onRenderedCallback();
            }
        }, timeout1Duration);

        setTimeout(function() {
            $.textLabel.text = args.text || '';
            textLoaded = true;
            if (imageLoaded && onRenderedCallback) {
                onRenderedCallback();
            }
        }, timeout2Duration);

        break;

    case 2:

        $.imageView.addEventListener('load', function(_evt) {
            imageLoaded = true;
            if (textLoaded && onRenderedCallback) {
                onRenderedCallback();
            }
        });
        $.imageView.image = args.imagePath || '';

        $.textLabel.addEventListener('postlayout', function(_evt) {
            textLoaded = true;
            if (imageLoaded && onRenderedCallback) {
                onRenderedCallback();
            }
        });
        $.textLabel.text = args.text || '';

        break;

    case 3:

        var loaded = {
            image: false,
            text: false
        };

        function checkEverythingReadyToRender() {
            if (loaded.image && loaded.text) {
                VariableWatcher.unwatch(loaded, 'image');
                VariableWatcher.unwatch(loaded, 'text');
                if (onRenderedCallback) {
                    onRenderedCallback();
                }
            }
        }
        VariableWatcher.watch(loaded, 'image', checkEverythingReadyToRender);
        VariableWatcher.watch(loaded, 'text', checkEverythingReadyToRender);

        setTimeout(function() {
            $.imageView.image = args.imagePath || '';
            loaded.image = true;
        }, timeout1Duration);

        setTimeout(function() {
            $.textLabel.text = args.text || '';
            loaded.text = true;
        }, timeout2Duration);

        break;
}

// update tile height, based on using a fixed number of lines of text
var numberOfLines = 5;
var textHeight = args.lineHeight * numberOfLines;

// Android doesn't work as expected and so we have to add a bit extra to the height!
if (OS_ANDROID)
    textHeight += 2;

$.textLabel.height = textHeight;
//work out height of tile from all its' sub-views...
$.itemTile.height = textHeight + $.textLabel.top + $.paddingFrame.top + $.paddingFrame.bottom + $.imageView.height;
