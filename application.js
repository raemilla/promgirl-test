$(document).ready(function() {
  // credit card auto format
  $('#credit-card').on('keypress change',function() {
    $(this).val(function (index, value) {
      return value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
    });
  });

  // phone auto format
  $('#phone').on('keypress change',function() {
    $(this).val(function (index, value) {
      return value.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    });
  });

  // collapsible address 2 line
  $('#address-2').hide();
  $('#add-address-2').on('click', function() {
    $('#address-2').show();
    $(this).hide();
  });

  // est arrival dates
  var today = new Date();
  var dd = today.getDate();
  var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  // ground est arrival
  var groundMin = dd+5;
  var groundMax = dd+7;

  $("#ground").append("<br><span class='est-arrival'> Est Arrival: "+groundMin+"-"+groundMax+" "+monthNames[today.getMonth()]+"</span>");

  // 3 day est arrival
  var threeDay = dd+3;
  $("#3-day").append("<br><span class='est-arrival'> Est Arrival: "+threeDay+" "+monthNames[today.getMonth()]+"</span>");

  // 2 day est arrival
  var twoDay = dd+2;
  $("#2-day").append("<br><span class='est-arrival'> Est Arrival: "+twoDay+" "+monthNames[today.getMonth()]+"</span>");

  //next day est arrival
  var nextDay = dd+1;
  $("#next-day").append("<br><span class='est-arrival'> Est Arrival: "+nextDay+" "+monthNames[today.getMonth()]+"</span>");

  // zip code autofill hardcoded for NYC
  $("#zip").on("blur", function() {
    var zip = $(this).val();
    if (zip === "10024") {
      $("#city").val("New York");
      $("#state").val("New York");
    }
  });


  // validate email
  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/
    return re.test(email);
  }

  $("#email").on('blur', function() {
    var enteredEmail = $(this).val();
    if (validateEmail(enteredEmail)) {
      $("#email").addClass("valid-check");
      $(".email-check").addClass("valid");
    }
  });

  // validate phone
  function validatePhone(phone) {
    var re = /^[2-9]\d{2}-\d{3}-\d{4}$/
    return re.test(phone);
  }

  $("#phone").on('blur', function() {
    var enteredPhone = $(this).val();
    if (validatePhone(enteredPhone)) {
      $("#phone").addClass("valid-check");
      $(".phone-check").addClass("valid");
    }
  })

});
