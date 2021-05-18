var currentPage = 1;
var total;

$(document).ready(function () {
  getData(currentPage);
  $("#loadbtn").on("click", getData);
  $(".next.nav-button").click(next);
  $(".prev.nav-button").click(prev);
});

function getData(a) {
  var record = $(".record");
  record.empty();
  record.append("Loading....");

  $.ajax({
    url: "https://reqres.in/api/users?page=" + a,
    method: "GET",
    success: function (response) {
      var record = $(".record");
      record.empty();
      total = response.total_pages;
      checkpage();

      for (var i = 0; i < response.data.length; i++) {
        var dat = response.data[i];
        record.append(
          "<div class='prod' data-id= " +
            dat.id +
            " >Email: <h4>" +
            dat.email +
            "</h4> first_name: <h4>" +
            dat.first_name +
            "</h4> last_name: <h4>" +
            dat.last_name +
            "</h4>. <h5> Avatar: </h5><img src= " +
            dat.avatar +
            "></img></div>"
        );
      }
    },
  });
}

function checkpage() {
  if (currentPage < total) {
    $(".prev.nav-button").addClass("disabled");
    $(".next.nav-button").removeClass("disabled");
  } else {
    $(".next.nav-button").addClass("disabled");
    $(".prev.nav-button").removeClass("disabled");
  }
}

function next() {
  console.log("Next Clicked");
  getData(currentPage + 1);
  currentPage = currentPage + 1;
  console.log(currentPage);
  checkpage();
}

function prev() {
  console.log("Prev Clicked");
  getData(currentPage - 1);
  currentPage = currentPage - 1;
  console.log(currentPage);
  checkpage();
}
