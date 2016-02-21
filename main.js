// TODO: create a list (arrary) of file names, have attribs, timestamps and
// contents stored elsewhere. Move into a file.
var contents = {
    "linkedin.txt": "Linkedin profile at <a href=\"https://www.linkedin.com/in/ottojongerius\">https://www.linkedin.com/in/ottojongerius</a>",
    "github.txt": "Github profile at <a href=\"https://github.com/ojongerius\">https://github.com/ojongerius</a>",
};

// Surely there must be a better way to do this
window.Cookies = require('js-cookie');

function cmd(input) {
    // TODO put commands in dict
    if (input == "ls") {
        $( "div.stdout" ).html(String(Object.keys(contents)).replace(",","<br>"));
    }
    else if (input.match("cat")) {
        // TODO see if our match is in the keys, if so: represent it
        if (input.match("cat (.*)")) {
            var match = input.match("cat (.*)")[1]
            if (contents[match]) {
                $( "div.stdout" ).html(contents[match])
            } else {
                $( "div.stdout" ).html("cat: " + match + ": No such file or directory")
            }
        } else {
            $( "div.stdout" ).html("usage: cat [file]")
        }
    }
    else if (input == "help") {
        $( "div.stdout" ).html("available commands:<br>cat<br>history<br>ls<br>write")
    }
    else if (input == "write") {
        //$( "div.stdout" ).html("Usage: write [text]")
        $( "div.stdout" ).html("not implemented yet, stay tuned.")
    }
    else if (input == "history") {
        // TODO: handle empty history
        if (window.Cookies.get("commands")) {
            $( "div.stdout" ).html( JSON.parse(window.Cookies.get("commands")).toString().replace(/,/g, "<br>") )
        } else {
            $( "div.stdout" ).html( "" )
        }
    }
    else if (input == "") {
        $( "div.stdout" ).html("")
    }
    else {
        $( "div.stdout" ).html(input + ": command not found")
    }
}

// TODO: Always keep focus on stdin, not just on document load
//(document).ready(function() {
$(function() {
    var commands = [];
    if ( Cookies.get('last_visit') ) {
        $( '#last' ).text(Cookies.get('last_visit').replace(/(?:\r\n|\r|\n)/g, '').split(','));
    }
    if ( Cookies.get('commands') ) {
        // var commands = [];
        commands = JSON.parse(Cookies.get('commands')); // Would need to go through
    }
    Cookies.set('last_visit', Date());
    $( '#stdin' ).focus();
    $( '#stdin' ).on("keypress", function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            e.stopPropagation();
            cmd($( '#stdin' ).val());
            commands.push($( '#stdin' ).val());
            // TODO: trash dupes
            // TODO: check lenght, save last 10 commands
            Cookies.set('commands', commands);
            this.value = '';
        }
    });
});
