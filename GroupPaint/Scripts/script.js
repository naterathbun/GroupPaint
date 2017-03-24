/// <reference path="jquery.signalR-2.2.1.js" />
/// <reference path="jquery-3.1.1.js" />


$(document).ready(function () {
    // Setting Up Websocket
    var connection = $.connection("/grouppaintsocket");

    connection.received(function (data) {
        var dataObject = JSON.parse(data);

        if (dataObject.type == "cellUpdate") {
            updateCell(dataObject.row, dataObject.col, dataObject.colorValue);
        } else {
            updateTable(dataObject);
        }
    });

    connection.start();


    // Drawing logic
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

            var message = {
                type: "cellUpdate",
                row: $(this).attr("data-row"),
                col: $(this).attr("data-col"),
                colorValue: $(".selectedColor").css("background-color")
            };
            connection.send(message);
        }
    });

    $('.pixel').mousedown(function () {
        $(this).css("background-color", $(".selectedColor").css("background-color"));

        var message = {
            type: "cellUpdate",
            row: $(this).attr("data-row"),
            col: $(this).attr("data-col"),
            colorValue: $(".selectedColor").css("background-color")
        };
        connection.send(message);
    });
});


function updateCell(row, column, colorValue) {
    var cell = $(`td[data-row='${row}']`).filter(`td[data-col='${column}']`);
    cell.css("background-color", colorValue);
    cell.removeClass("blank");
}

function updateTable(data) {
    for (var rowIndex = 0; rowIndex < data.mapData.length; rowIndex++) {
        for (var colIndex = 0; colIndex < data.mapData[rowIndex].length; colIndex++) {
            var colorValue = data.mapData[rowIndex][colIndex];
            if (colorValue != null) {
                updateCell(rowIndex, colIndex, colorValue);
            }
        }
    }
}
