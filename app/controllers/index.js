// @author        Simon Buckingham
// @date          11 October 2017
// @description   Example Titanium project to show an assortment of techniques to delay rendering of data-dependent views
//                example 1: using a simulated data load delay, we wait until the data has loaded before rendering a set of image and text tiles
//                example 2: using a real-world download of remote images, as for example 1, we wait until the data has loaded before rendering a set of image and text tiles
//                example 3: using a variable watcher technique, as for example 1, we wait until the data has loaded before rendering a set of image and text tiles


function onClickExample1(_evt) {
    Alloy.createController('example', {
        exampleNumber: 1
    }).getView().open();
}

function onClickExample2(_evt) {
    Alloy.createController('example', {
        exampleNumber: 2
    }).getView().open();
}

function onClickExample3(_evt) {
    Alloy.createController('example', {
        exampleNumber: 3
    }).getView().open();
}

$.win.open();
