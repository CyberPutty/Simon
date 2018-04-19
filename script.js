// returns blue yellow etc;
var currentId;
// translate the id to number and back;
function translate(id) {
    var newId;
    switch (id) {
        case "red":
            newId = 0;
            break;
        case "blue":
            newId = 1;
            break;
        case "yellow":
            newId = 2;
            break;
        case "green":
            newId = 3;
            break;
        case 0:
            newId = "red";
            break;
        case 1:
            newId = "blue";
            break;
        case 2:
            newId = "yellow";
            break;
        case 3:
            newId = "green";
            break;
        default:
            break;
    }

    return newId;
}
// enable/disable controls
$onSwitch = $('#slider');
var on;
$onSwitch.on('click', function () {
    if ($('#slider').hasClass('trans')) {
        $('#dispC').text('');
        $onSwitch.toggleClass("trans");
        $('.primary').toggleClass('light');
        on = false;
    }
    else {
        $onSwitch.toggleClass("trans");
        $('#dispC').text('--');
        $('.primary').toggleClass('light');
        on = true;
        player.length = 0;
        sequence.length = 0;
        gameStart = false;
        playerTurn = false;
        round = 0;
        seq = 0;
    }


});


//set up game variables
var gameStart = false;
var player = [];
var sequence = [];
var round = 0;
var playerTurn = false;
var strictMode = false;
// disp update
function disp() {
    if (round < 10) {
        return "0" + (round + 1).toString();
    }
    else {
        return (round + 1).toString();
    }
}
//buttons
$('#start').on('click', function () {
    if (gameStart === false && on === true) {
        gameStart = true;
        round = 0;
        Simon();// sets up simons sequence
        return;
    }
    if (gameStart === true && on === true) {
        gameStart = false;

        $('#dispC').text("--");
        return;
    }

});
$('#strict').on("click", function () {
    if (gameStart === false && on === true) {
        if (strictMode === false) {
            strictMode = true;
            $('#indicator').toggleClass('simonLight');

        }
        else {
            strictMode = false;
            $('#indicator').toggleClass('simonLight');

        }
    }
});

$("#buttonGroup").on("click", function (event) {
    if (on === true) {
        $myTarget = $(event.target);
        currentId = translate(event.target.id);// returns id needs to translate into number 1-4;
        audioTrigger(currentId);
        if (playerTurn === true) {
            guess();
        }
    }

});
// sets up simons memory and runs the light show.
function Simon() {
    for (i = 0; i < 20; i++)// game length is 20 rounds
    {
        sequence[i] = Math.floor(Math.random() * Math.floor(4));
    }

    lightMemory();
}

// light memory plays back simons sequence
function lightMemory() {
    if (gameStart === true) {
        $('.primary').toggleClass('light');
        var item = 0;

        $('#dispC').text(disp());
        var light = setInterval(function () {
            if ($('#' + translate(sequence[item])).hasClass('simonLight')) {
                audioTrigger(sequence[item]);
                $('#' + translate(sequence[item])).toggleClass('simonLight');

                item++;
                if (item > round) {
                    $('.primary').toggleClass('light');
                    playerTurn = true;
                    clearInterval(light);

                }
            }
            else {
                $('#' + translate(sequence[item])).toggleClass('simonLight');

            }
        }, 600);

    }
}
var seq = 0;
// players turn
function guess() {
    if (round > 19) {
        player.length = 0;
        sequence.length = 0;
        playerTurn = false;
        round = 0;
        seq = 0;
        winning();
        Simon();
    }
    if (seq <= round && !player[seq] && on === true) {

        if (currentId === sequence[seq]) {
            player[seq] = sequence[seq];

            seq++;
        }
        else if (strictMode === true) {
            player.length = 0;
            sequence.length = 0;
            playerTurn = false;
            round = 0;
            seq = 0;
            wrongAnswer();
            Simon();
        }
        else {
        player.length = 0;
            playerTurn = false;
            seq = 0;
            wrongAnswer();
            lightMemory();
        }
    }
    if (seq > round) {
        seq = 0;
        player.length = 0;
        round++;
        playerTurn = false;
        lightMemory();

    }

}
// play audio
function audioTrigger(id) {

    switch (id) {
        case 0:

            document.getElementById('audio0').play();
            break;
        case 1:

            document.getElementById('audio1').play();
            break;
        case 2:

            document.getElementById('audio2').play();
            break;
        case 3:

            document.getElementById('audio3').play();
            break;
        default:
            return;
    }


}
// !! on every even count
function wrongAnswer() {
    var count = 0;
    var alarm = setInterval(function () {
        if (count < 6) {
            if (count % 2 === 0) {
                $('#dispC').text("!!");
                count++;
            } else {
                $('#dispC').text("");
                count++;
            }

        }
        else {
            clearInterval(alarm);
            $('#dispC').text(disp());
        }

    }, 200);
}
// on win display WW on every even.
function winning() {
    var count = 0;
    var alarm = setInterval(function () {
        if (count < 6) {
            if (count % 2 === 0) {
                $('#dispC').text("WW");
                count++;
            } else {
                $('#dispC').text("");
                count++;
            }

        }
        else {
            clearInterval(alarm);
            $('#dispC').text(disp());
        }

    }, 200);
}