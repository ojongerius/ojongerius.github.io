function cmd(input) {
    if (input == "ls") {
        $( "div.stdout" ).html("-rw-r--r--    1 guest staff      4 20 Feb 23:53 <a href=\"https://www.linkedin.com/in/ottojongerius\">linkedin.txt</a><br>-rw-r--r--    1 guest staff      4 20 Feb 23:53 <a href=\"https://github.com/ojongerius\">github.txt</a><br>");
    }
    else if (input == "cat") {
        //$( "div.stdout" ).html("Usage: cat [file]")
        $( "div.stdout" ).html("not implemented yet, stay tuned.")
    }
    else if (input == "help") {
        $( "div.stdout" ).html("available commands:<br>cat<br>ls<br>write")
    }
    else if (input == "write") {
        //$( "div.stdout" ).html("Usage: write [text]")
        $( "div.stdout" ).html("not implemented yet, stay tuned.")
    }
    else if (input == "") {
        $( "div.stdout" ).html("")
    }
    else {
        $( "div.stdout" ).html(input + ": command not found")
    }
}
// TODO: Always keep focus on stdin, not just on document load
//alertCookie()
$(document).ready(function() {
    $('#stdin').focus();
    $('#stdin').on("keypress", function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            e.stopPropagation();
            console.log($('#stdin').val());
            cmd($('#stdin').val());
            this.value = '';
        }
    });
});
