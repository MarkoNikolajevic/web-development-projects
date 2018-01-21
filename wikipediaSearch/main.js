$(document).ready(function() {
    $("#search-btn").click(function() {
        var searchFor = $("#search-for").val();
        // API
        var api = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchFor + "&limit=5&callback=?";

        $.ajax({
            type: "GET",
            url: api,
            async: false,
            dataType: "json",
            success: function(data) {
                $("#search-result").html("");
                // For loop to go through the search's results
                for (var i = 0; i < data[1].length; i++) {
                    $("#search-result").append("<div class='col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-8 col-md-offset-2 result'><h3>" + data[1][i] + "</h3><p>" + data[2][i] + "</p><a href=" + data[3][i] + " target='_blank'>Read the article" + "</a></div>");
                }
                $("#search-for").val("");
                $("footer").css("position", "relative");
            },
        });
    });
    $("#search-for").keypress(function(keyPressed) {
        if (keyPressed.which == 13) {
            $("#search-btn").click();
        }
    });
});
