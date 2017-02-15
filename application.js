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

  // zip code autofill

  $(function() {
		var clientKey = "js-S6EStxQmNgGXBnz1bW456JKd0qzsb503cEVGbM2Y3IWE5vGhsKmzt6NtwmWHrWLE";

		var cache = {};
		var container = $("body");
		var errorDiv = container.find("div.text-error");

		/** Handle successful response */
		function handleResp(data)
		{
			// Check for error
			if (data.error_msg)
				errorDiv.text(data.error_msg);
			else if ("city" in data)
			{
				// Set city and state
				container.find("input[name='city']").val(data.city);
				container.find("input[name='state']").val(data.state);
			}
		}

		// Set up event handlers
		container.find("input[name='zipcode']").on("keyup change", function() {
			// Get zip code
			var zipcode = $(this).val().substring(0, 5);
			if (zipcode.length == 5 && /^[0-9]+$/.test(zipcode))
			{
				// Clear error
				errorDiv.empty();

				// Check cache
				if (zipcode in cache)
				{
					handleResp(cache[zipcode]);
				}
				else
				{
					// Build url
					var url = "https://www.zipcodeapi.com/rest/"+clientKey+"/info.json/" + zipcode + "/radians";

					// Make AJAX request
					$.ajax({
						"url": url,
						"dataType": "json"
					}).done(function(data) {
						handleResp(data);

						// Store in cache
						cache[zipcode] = data;
					}).fail(function(data) {
						if (data.responseText && (json = $.parseJSON(data.responseText)))
						{
							// Store in cache
							cache[zipcode] = json;

							// Check for error
							if (json.error_msg)
								errorDiv.text(json.error_msg);
						}
						else
							errorDiv.text('Request failed.');
					});
				}
			}
		}).trigger("change");
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
