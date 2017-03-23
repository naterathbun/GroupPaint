/// <reference path="~/Scripts/jquery-3.1.1.js" />
window.onload = function () {

}

$(document).ready(function () {

    $(".brushColor").click(function () {
        $(".selectedColor").removeClass("selectedColor");
        $(this).addClass("selectedColor");
    });

    var mouseButtonIsDown = false;

    $(document).mousedown(function () {
        mouseButtonIsDown = true;
    })
    $(document).mouseup(function () {
        mouseButtonIsDown = false;
    });


    $(".pixel").mouseover(function () {
        if (mouseButtonIsDown) {
            $(this).css("background-color", $(".selectedColor").css("background-color"));
        }
    });

    $('.pixel').mousedown(function () {
        $(this).css("background-color", $(".selectedColor").css("background-color"));
    });



    /*
    // Create the web socket connection object
    var connection = $.connection("/togglesocket");


    // Attach an event handler to execute code
    // when a message is received
    connection.received(function (data) {
        var dataObject = JSON.parse(data);

        if (dataObject.type == "cellUpdate") {
            updateCell(dataObject.row, dataObject.col, dataObject.colorValue);
        } else {
            updateTable(dataObject);
        }

    });

    connection.start();

    $("td").click(function () {

        var rowIndex = $(this).attr("data-row");
        var colIndex = $(this).attr("data-col");
        var colorValue = $(".selectedColor").css("background-color");

        var message = {
            type: "cellUpdate",
            row: rowIndex,
            col: colIndex,
            colorValue: colorValue
        };
        connection.send(message);
    });*/
    
});


function updateCell(row, column, colorValue) {
    var cell = $(`td[data-row='${row}']`).filter(`td[data-col='${column}']`);
    cell.css("background-color", colorValue);
    cell.removeClass("default");
}

function updateTable(data) {
    for (var rowIndex = 0; rowIndex < data.mapData.length; rowIndex++) {
        for (var colIndex = 0; colIndex < data.mapData[rowIndex].length; colIndex++) {
                        
            var colorValue = data.mapData[rowIndex][colIndex];
            if(colorValue != null){
                updateCell(rowIndex, colIndex, colorValue);
            }
            
        }
    }
}