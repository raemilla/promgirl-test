$(document).ready(function() {
  $('#credit-card').on('keypress change',function() {
    $(this).val(function (index, value) {
      return value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
    });
  });

  $('#address-2').hide();
  $('#add-address-2').on('click', function() {
    $('#address-2').show();
    $(this).hide();
  });

  $(function() {
		// IMPORTANT: Fill in your client key
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
});
