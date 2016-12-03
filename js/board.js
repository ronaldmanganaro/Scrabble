var ScrabbleTiles = [];
ScrabbleTiles[0] = { "letter": "a", "value": 1, "original_distribution": 9, "number_remaining": 9 };
ScrabbleTiles[1] = { "letter": "b", "value": 3, "original_distribution": 2, "number_remaining": 2 };
ScrabbleTiles[2] = { "letter": "c", "value": 3, "original_distribution": 2, "number_remaining": 2 };
ScrabbleTiles[3] = { "letter": "d", "value": 2, "original_distribution": 4, "number_remaining": 4 };
ScrabbleTiles[4] = { "letter": "e", "value": 1, "original_distribution": 12, "number_remaining": 12 };
ScrabbleTiles[5] = { "letter": "f", "value": 4, "original_distribution": 2, "number_remaining": 2 };
ScrabbleTiles[6] = { "letter": "g", "value": 2, "original_distribution": 3, "number_remaining": 3 };
ScrabbleTiles[7] = { "letter": "h", "value": 4, "original_distribution": 2, "number_remaining": 2 };
ScrabbleTiles[8] = { "letter": "i", "value": 1, "original_distribution": 9, "number_remaining": 9 };
ScrabbleTiles[9] = { "letter": "j", "value": 8, "original_distribution": 1, "number_remaining": 1 };
ScrabbleTiles[10] = { "letter": "k", "value": 5, "original_distribution": 1, "number_remaining": 1 };
ScrabbleTiles[11] = { "letter": "l", "value": 1, "original_distribution": 4, "number_remaining": 4 };
ScrabbleTiles[12] = { "letter": "m", "value": 3, "original_distribution": 2, "number_remaining": 2 };
ScrabbleTiles[13] = { "letter": "n", "value": 1, "original_distribution": 6, "number_remaining": 6 };
ScrabbleTiles[14] = { "letter": "o", "value": 1, "original_distribution": 8, "number_remaining": 8 };
ScrabbleTiles[15] = { "letter": "p", "value": 3, "original_distribution": 2, "number_remaining": 2 };
ScrabbleTiles[16] = { "letter": "q", "value": 10, "original_distribution": 1, "number_remaining": 1 };
ScrabbleTiles[17] = { "letter": "r", "value": 1, "original_distribution": 6, "number_remaining": 6 };
ScrabbleTiles[18] = { "letter": "s", "value": 1, "original_distribution": 4, "number_remaining": 4 };
ScrabbleTiles[19] = { "letter": "t", "value": 1, "original_distribution": 6, "number_remaining": 6 };
ScrabbleTiles[20] = { "letter": "u", "value": 1, "original_distribution": 4, "number_remaining": 4 };
ScrabbleTiles[21] = { "letter": "v", "value": 4, "original_distribution": 2, "number_remaining": 2 };
ScrabbleTiles[22] = { "letter": "w", "value": 4, "original_distribution": 2, "number_remaining": 2 };
ScrabbleTiles[23] = { "letter": "x", "value": 8, "original_distribution": 1, "number_remaining": 1 };
ScrabbleTiles[24] = { "letter": "y", "value": 4, "original_distribution": 2, "number_remaining": 2 };
ScrabbleTiles[25] = { "letter": "z", "value": 10, "original_distribution": 1, "number_remaining": 1 };
ScrabbleTiles[26] = { "letter": "", "value": 0, "original_distribution": 2, "number_remaining": 2 };

$(document).ready(function () {
    selectPieces();
    setupBoard();
});

function selectPieces() {
    var tilecount = 0; //used to count how many tiles generated
    let tmp = 256

    //loop 7 times
    while (tilecount < 7) {
        //*need to make sure player gets vowel
        //generate random number to get random tile
        var randomNum = Math.floor(Math.random() * 26)
        //console.log("first gen: " + randomNum);
        //if we have no more of that tile get another random number
        while (ScrabbleTiles[randomNum].number_remaining == 0) {
            randomNum = Math.floor(Math.random() * 26)
            //console.log("regenerated num: " + randomNum);
        }

        //when we find a tile with some remaining decrement it
        ScrabbleTiles[randomNum].number_remaining--;
        //console.log("number remaining after: " + ScrabbleTiles[randomNum].number_remaining);
        //create the tile 'letter_(char).png'
        var tilename =
            "<img src='images/tiles/letter_" + ScrabbleTiles[randomNum].letter + ".png' class='piece' />"
        var handPos = "td#" + tmp;
        //console.log(handPos);
        $(handPos).append(tilename);
        tmp++
        tilecount++;
    }


}

function setupBoard() {

    $('div#Board table tr td').addClass("boardTile");
    $('div#Board table tr td').attr('id', function (i) {
        return ++i;
    });


    $(".boardTile").droppable({
        accept: '.piece',
        drop: function (event, ui) {
            var posOnBoard = parseInt($(this).attr('id'));
            //console.log(posOnBoard);

            $(ui.draggable).addClass('onboard');
            $(ui.draggable).attr("id", posOnBoard);

        }
        //out: Drag
    });

    $(".rack").droppable({
        accept: '.piece',
        //drop: Drop,
        //out: Drag
    });

    img = "<img src='images/board/tiles_empty.png' />";
    $('td.tiles_empty').append(img);

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

    $("td.PlayerPiece img").draggable({
        revert: 'invalid',
        snap: '.boardTile, .rack',
        //snap: ".rack",
        snapMode: "both",
        snapTolerance: 50,
        drag: function (event, ui) {

            //ui:element being dragged
            //event:info abt the event
            //console.log(ui);

        }
    });

    $('button').click(calculateScore);
}

function calculateScore() {
    //check if connected
    var onboardPieces = $(".onboard");
    var size = $(".onboard").size();
    var posOk = false;
    var posArr = [];

    for (i = 0; i < size; i++) {
        let value = parseInt(onboardPieces[i].id);
        posArr.push(value);
    }

    console.log(posArr);

    for (j = 0; j < size; j++) {
        let temp = parseInt(onboardPieces[j].id);
        var left = right = above = below = temp;

        console.log("pos: " + temp);
        left--;
        console.log("left: " + left);
        right++;
        console.log("right: " + right);
        above += 15;
        console.log("top: " + above);
        below -= 15;
        console.log("top: " + below);
        //check if first piece top touches other piece
        if (posArr.includes(left) || posArr.includes(right)
            || posArr.includes(above) || posArr.includes(below)) {
            console.log("right match");
            posOk = true;
            //console.log("Ok pos: " + onboardPieces[j].id);
        } else {
            posOk = false;
            //console.log("Not Ok pos: " + onboardPieces[j].id);
            break;
        }
    }
    console.log(posOk);

    //lock in tiles if is a word
    if (posOk) {
        lock();

    }
}

function lock() {
   

    var word = "";
    var size = $(".onboard").size();
    var str = "";
    var srcArr = $("img.onboard");

    for (var k = 0; k < size; k++) {
        str = srcArr[k].src;
        var n = str.lastIndexOf('_');
        var result = str.substring(n + 1, n + 2);
        console.log(result);
        word += (result);

    }
    console.log("the word is: " + word);

    lookup(word);
    //update score
}

function lookup(word) {
    var apikey = "6574d3d5-aa7a-4a8a-9063-e312b096015f";
    var xmlRequest = "http://www.dictionaryapi.com/api/v1/references/collegiate/xml/" + word + "?key=" + apikey;
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if (xhttp.status == 200) {
            // Action to be performed when the document is read;
            console.log(xhttp.response);

            var xml = xhttp.response,
                xmlDoc = $.parseXML(xml),
                $xml = $(xmlDoc),
                $suggestion = $xml.find("suggestion");
            if ($suggestion.text() !== "")
                console.log("not a word");
            else {
                console.log("it is a word!");
                 $(".onboard").draggable('disable');
             }
                
        }
    };
    xhttp.open("GET", xmlRequest, true);
    xhttp.send(null);
}


