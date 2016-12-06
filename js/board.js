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

var turn = 1;
$(document).ready(function () {
    setupBoard();
    selectPieces();
});

function selectPieces() {
    var tmp = 256;
    var tilesNeeded = 7;
    var handPos;

    for (i = 0; tilesNeeded > 0; i++) {
        //generate random number to get random tile
        var randomNum = Math.floor(Math.random() * 27);
        //if we have no more of that tile get another random number
        while (ScrabbleTiles[randomNum].number_remaining == 0) {
            randomNum = Math.floor(Math.random() * 26)
        }

        //when we find a tile with some remaining decrement it
        ScrabbleTiles[randomNum].number_remaining--;
        //create the tile 'letter_(char).png'
        var tilename =
            "<img src='images/tiles/letter_" + ScrabbleTiles[randomNum].letter + ".png' class='piece' />";

        //get create td to look for
        handPos = "td#" + tmp;

        //add img to div
        $(handPos).append(tilename);

        //change handpos to look for div img
        handPos += " img";

        //add position on rack to the piece on the rack
        $(handPos).addClass(tmp.toString());

        //make the images draggable
        $(handPos).draggable({
            revert: 'invalid',
            snap: '.boardTile, .rack',
            snapMode: "both",
            snapTolerance: 50,
            drag: function (event, ui) {

            }
        });

        //move to next handpos
        tmp++;
        //one less tile needed
        tilesNeeded--;
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

            var string = $(ui.draggable).attr("class");
            var rackpos = parseInt(string.substring(6, 9));
            console.log("add empty to rack pos: " + rackpos);
            $('#' + rackpos).addClass('empty');
        }
    });

    $(".rack").droppable({
        accept: '.piece',
        drop: function (event, ui) {
            $(ui.draggable).removeClass('onboard');
            $(this).removeClass('empty');
        }

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


    $('button').click(checkPosition);
}

function checkPosition() {
    //check if connected
    var onboardPieces = $(".onboard");
    var size = $(".onboard").size();

    var posOk = true;
    var posArr = [];
    //sort least to greatest


    //check right of the first element
    //if theres an item to right keep checking right for others
    //else check down if yes keep checking down 
    //else not in right pos
    //not needed anymore
    var atStart = true;

    for (j = 0; j < size; j++) {
        if (turn === 1 && (parseInt(onboardPieces[j].id) === 8)) {
            atStart = true
        }
        posArr.push(parseInt(onboardPieces[j].id));

    }
    posArr.sort(sortArr);
    //console.log(posArr);
    var length = posArr.length;
    length--;
    for (i = 0; i < length; i++) {
        var num = i;
        num++;
        var next = posArr[num];
        var prevPlusOne = posArr[i];
        prevPlusOne++;
        //console.log(posArr);
        //console.log("next :" + next);
        //console.log("prev :" + prevPlusOne);


        if (next === prevPlusOne) {
            posOk = true;

        } else {
            posOk = false;
            console.log("not connected");
            break;
        }

    }


    console.log("Position was ok? " + posOk);
    if (turn === 1 && !atStart) {
        posOk = false;
        console.log("actually it aint ok first turn need element at start");
    }

    if (posOk) {
        checkWord();

    }
}


function sortArr(a, b) {

    return (a - b);
}

function sortById(a, b) {

    return (a.id - b.id);
}

function checkWord() {
    var word = "";
    var size = $(".onboard").size();
    var str = "";
    var srcArr = $(".onboard");

    console.log(srcArr.sort(sortById));

    for (var k = 0; k < size; k++) {
        console.log(srcArr[k].id);
        str = srcArr[k].src;

        var n = str.lastIndexOf('_');
        var result = str.substring(n + 1, n + 2);
        if (result === '.') {
            //could ask player for letter they want to use
            result = ' ';
        }
        console.log(result);
        word += (result);

    }
    console.log("the word is: " + word);
    lookup(word);
    //update score
}

function lookup(word) {
    var apikey = "6574d3d5-aa7a-4a8a-9063-e312b096015f";
    var xmlRequest = "https://www.dictionaryapi.com/api/v1/references/collegiate/xml/" + word + "?key=" + apikey;
    var xhttp = new XMLHttpRequest();

/*
        $.ajax({
        type: "GET",
        url: xmlRequest,
        data:{q:idiom},
        async:true,
        dataType : 'jsonp',   //you may use jsonp for cross origin request
        crossDomain:true,
        success: function(data, status, xhr) {
            alert(xhr.response);
        }
    });
*/


    xhttp.onload = function () {
        if (xhttp.status == 200) {
            // Action to be performed when the document is read;
            //console.log(xhttp.response);

            var xml = xhttp.response,
                xmlDoc = $.parseXML(xml),
                $xml = $(xmlDoc),
                $suggestion = $xml.find("suggestion");
            if ($suggestion.text() !== "")
                console.log("not a word");
            else {
                console.log("it is a word!");
                $("img.onboard").draggable('disable');
                calculateScore(word);
                turn++;
                newHand();
            }

        } else
            console.log("error api call");
    };
    xhttp.open("GET", xmlRequest, true);
    xhttp.send(null);
}

var totalScore = 0;

function calculateScore(word) {

    var onboardPieces = $(".onboard");
    var posArr = [];
    var size = $(".onboard").size();
    var tw = false;
    var dlAt4 = false;
    var dlAt12 = false;
    for (j = 0; j < size; j++) {
        posArr.push(parseInt(onboardPieces[j].id));
    }

    posArr.sort(sortArr);
    for (j = 0; j < size; j++) {
        if (posArr[j] === 1 || posArr[j] === 15) {
            var dw = true;
        } else if (posArr[j] === 4) {
            var dlAt4 = j;

        } else if (posArr[j] === 12) {
            var dlAt12 = j;

        }

    }

    var score = 0;

    for (i = 0; i < word.length; i++) {
        var character = word[i];
        var value = 0;
        for (j = 0; j <= 26; j++) {
            if (ScrabbleTiles[j].letter === character) {
                value = ScrabbleTiles[j].value;
                break;
            }
        }
        console.log("The score was: " + score);
        if (dlAt4 === i)
            score += value
        if (dlAt12 === i)
            score += value;

        score += value;
        console.log("The score is: " + score);
    }
    if (dw)
        score *= 3;

    totalScore += score;
    $('h2').text("Score: " + totalScore);
}

function newHand() {
    var onboardPieces = $(".onboard");
    var size = $('.onboard').length;
    var rackpos;

    console.log("the size is: " + size);

    for (i = 0; i < size; i++) {

        console.log("missing tiles class: " + onboardPieces[i].className);
        rackpos = parseInt(onboardPieces[i].className.substring(6, 9));
        console.log(rackpos);
        $("#" + rackpos + " img").remove();

        //generate random number to get random tile
        var randomNum = Math.floor(Math.random() * 27);
        //if we have no more of that tile get another random number
        while (ScrabbleTiles[randomNum].number_remaining == 0) {
            randomNum = Math.floor(Math.random() * 26)
        }

        //when we find a tile with some remaining decrement it
        ScrabbleTiles[randomNum].number_remaining--;
        //create the tile 'letter_(char).png'
        var tilename =
            "<img src='images/tiles/letter_" + ScrabbleTiles[randomNum].letter + ".png' class='piece' />";

        $("#" + rackpos).append(tilename);

        //add position on rack to the piece on the rack
        $("#" + rackpos + " img").addClass(rackpos.toString());

        //make the images draggable
        $("#" + rackpos + " img").draggable({
            revert: 'invalid',
            snap: '.boardTile, .rack',
            snapMode: "both",
            snapTolerance: 50,
            drag: function (event, ui) {

            }
        });
    }
}

