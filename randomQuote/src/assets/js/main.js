document.addEventListener("DOMContentLoaded", function() {
  function newQuote() {
    $.ajax({
      url: "https://api.forismatic.com/api/1.0/",
      jsonp: "jsonp",
      dataType: "jsonp",
      data: {
        method: "getQuote",
        lang: "en",
        format: "jsonp"
      },
      success: function(data) {
        quote = data.quoteText;
        author = data.quoteAuthor;
        $("#quote").html(quote);
        $("#author").html(author);
      }
    });
  }

  newQuote();

  $(".new-quote").click(function() {
    newQuote();
  });

  $(".tweet").click(function() {
    window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(quote + " - " + author));
  });
});

var i = 0;
var text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
var speed = 50;

function prova() {
  if (i < text.length) {
    document.getElementById("demo").innerHTML += text.charAt(i);
    i++;
    setTimeout(prova, speed);
  }
}
