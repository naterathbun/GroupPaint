/// <reference path="~/Scripts/jquery-3.1.1.js" />
window.onload = function () {

}

$(document).ready(function () {

    var mouseButtonIsDown = false;

    $(document).mousedown(function () {
        mouseButtonIsDown = true;
    })
    $(document).mouseup(function () {
        mouseButtonIsDown = false;
    });


    $(".pixel").mouseover(function () {
        if (mouseButtonIsDown) {
            $(this).css({ background: "#FFFFFF" });
        }
    });

    $('.pixel').mousedown(function () {
        $(this).css({ background: "#FFFFFF" });
    });

});