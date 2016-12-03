$(document).ready(function () {
    selectPieces();

    var piecesArr = JSON.parse(pieces);
    

    img = "<img src='images/board/tiles_empty.png' />";
    $('td.tiles_empty').append(img).droppable({
        addClasses: true,
        drop: function (event, ui) {
            //$('td').closest().append(ui);
            //$(this).droppable('disable');

            //$(this).append('td').closest();
            //$(this).append($('td').closest);
        }
    });

    img = "<img src='images/board/tiles_dl.png' />";
    $('td.tiles_dl').append(img);

    img = "<img src='images/board/tiles_dw.png' />";
    $('td.tiles_dw').append(img);

    img = "<img src='images/board/tiles_tl.png' />";
    $('td.tiles_tl').append(img);

    img = "<img src='images/board/tiles_tw.png' />";
    $('td.tiles_tw').append(img);

    img = "<img src='images/board/tiles_start.png' />";
    $('td.tiles_start').append(img);

    img = "<img src='images/board/tiles_empty_alt.png' />";
    $('td.tiles_empty_alt').append(img);

    $("img#PlayerPiece").draggable({
        addClasses: false,
        drag: function(event, ui) {
            //ui:element being dragged
            //event:info abt the event
            
        }
    });
});

function selectPieces() {

}