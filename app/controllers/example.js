//REQUIRES
var Animation = require('alloy/animation');

//CONSTANTS
//define an example set of data ITEMS
var ITEMS = [{
        imagePath: '/images/image01.png',
        text: 'Some text'
    }, {
        imagePath: '/images/image02.png',
        text: 'Some more text but a bit longer this time to make the block a bit bigger!'
    }, {
        imagePath: '/images/image03.png',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id augue in nibh rhoncus dictum a eu odio. Vestibulum ac faucibus velit. sapien, laoreet cursus purus. Mauris tincidunt nisl id augue feugiat, et finibus eros mollis.'
    }, {
        imagePath: '/images/image04.png',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id augue in nibh rhoncus dictum a eu odio.'
    }, {
        imagePath: '/images/image05.png',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }, {
        imagePath: '/images/image06.png',
        text: 'Vestibulum id augue in nibh rhoncus dictum a eu odio. Vestibulum ac faucibus velit. Sed in convallis neque, eget elementum est.'
    }, {
        imagePath: '/images/image07.png',
        text: 'Vestibulum ac faucibus velit.'
    }, {
        imagePath: '/images/image08.png',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id augue in nibh rhoncus dictum a eu odio. Vestibulum ac faucibus velit. Sed in convallis neque, eget elementum est.'
    }],
    FADE_DURATION = 500;

//VARS
var args = $.args || {},
    exampleNumber = args.exampleNumber || 1,
    items = args.items || [],
    itemTileController,
    numberOfTilesRendered = 0; //number of tiles rendered

//set hidden label text to 10 lines of text..
$.hiddenLabel.text = '1\n2\n3\n4\n5\n6\n7\n8\n9\n0';

function onHiddenLabelPostlayout(_evt) {
    $.hiddenLabel.removeEventListener('postlayout', onHiddenLabelPostlayout);
    var lineHeight = $.hiddenLabel.size.height / 10;
    updateScrollView(lineHeight);
}
$.hiddenLabel.addEventListener('postlayout', onHiddenLabelPostlayout);

function updateScrollView(_lineHeight) {
    ITEMS.forEach(function (_item) {
        var imagePath = _item.imagePath;
        if (exampleNumber === 2) {
            //supply a URL for a remote image
            imagePath = 'http://www.icecandy.com/titaniumexamples/delayedrendering' + imagePath;
        }
        itemTileController = Alloy.createController('itemTile', {
            exampleNumber: exampleNumber,
            imagePath: imagePath,
            text: _item.text,
            onRenderedCallback: onRenderedCallback,
            lineHeight: _lineHeight
        });
        $.scrollView.add(itemTileController.getView());
    });
}

function onRenderedCallback() {
    numberOfTilesRendered++;
    if (numberOfTilesRendered === ITEMS.length) {
        fadeScrollViewOn();
        $.activityIndicator.hide();
    }
}

function fadeScrollViewOn() {
    Animation.fadeIn($.scrollView, FADE_DURATION, function () {
        $.scrollView.opacity = 1.0;
    });
};

$.activityIndicator.show();

function onClickCloseWindow(_evt) {
    $.win.close();
}

$.win.open();
