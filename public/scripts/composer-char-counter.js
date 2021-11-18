const BeginingNumber = 140;
function ifBelow() {
  const counter = $("#tweet-text").val().trim().length;
  $(".counter").text(BeginingNumber - counter);
  if ($(".counter").text() < 0) {
    $(".counter").addClass("newColor");
  } else {
    return $(".counter").removeClass("newColor");
  }
}

$(document).ready(function () {
  $("#tweet-text").on("input", ifBelow);
});
