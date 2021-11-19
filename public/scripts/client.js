/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const loadTweets = function () {
    $.ajax("/tweets").then(function (res) {
      renderTweets(res);
    });
  };
  loadTweets();
  const tweetData = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  const renderTweets = (tweetData) => {
    $("#tweet-container").empty();
    for (let index of tweetData) {
      let $tweet = createTweetElement(index);
      $("#tweets-container").prepend($tweet);
    }
  };

  const createTweetElement = (tweetData) => {
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    const $something = `
      <article class = "border">
          <header class= 'command'>
            <div class= 'monster'>
              <div> <img src="${tweetData.user["avatars"]}"></div>
              <span>${tweetData.user["name"]}</span>
            </div>
            <span id= "username">${tweetData.user["handle"]}</span>
          </header>
          <main id= 'main'>
           <span>${escape(tweetData.content["text"])}</span>
           <hr>
          </main>
          <footer class ='option'>
            <div class = 'dinosar'>
              <span id = 'days'> ${timeago.format(tweetData.created_at)}</span>
              <div class ='icons'>
                <span id="span1"><i class="fa-solid fa-flag"></i></span>
                <span id = "span2"><i class="fa-solid fa-retweet"></i></span>
                <span id = "span3"><i class="fa-solid fa-heart"></i></span>
              </div>
            </div>
          </footer>
        </article>
      `;
    return $something;
  };

  $("#form").on("submit", function (event) {
    event.preventDefault();
    const letterCounter = $("#tweet-text").val().trim().length;
    $("#error-message").hide();
    if (letterCounter === 0) {
      $("#error-message").text("tweet cannot be empty");
      $("#error-message").slideDown("slow");
      $("#error-message").delay(2500).slideUp("slow");
      return;
    }
    if (letterCounter > 140) {
      $("#error-message").text("Tweet must be shorter than 140 characters");
      $("#error-message").slideDown("slow");
      $("#error-message").delay(2500).slideUp("slow");
      return;
    }
    const serializedFormData = $(this).serialize();
    $.ajax("/tweets", { method: "POST", data: serializedFormData }).then(() => {
      loadTweets();
      $("#tweet-text").val("");
    });
  });
});
