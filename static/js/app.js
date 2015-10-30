(function() {

	$(document).ready(function() {

		// Time
		function checkTime(i) {
			return (i < 10) ? "0" + i : i;
    }

    function startTime() {
    	var today, h, h_mod, m, s, am_pm;

      today = new Date();
      h = checkTime(today.getHours());
      m = checkTime(today.getMinutes());
      s = checkTime(today.getSeconds());

      am_pm = h < 12 ? 'am' : 'pm';
      h_mod = h < 12 ? h : h - 12;

      if (h == 0) {
      	h_mod = 12;      	
      } else if (h < 12) {
      	h_mod = h;
      } else {
      	h_mod -= 12;
      }
      
      $("#timer-hour").html(h_mod);
      $("#timer-min").html(m);
      $("#timer-suffix").html(am_pm);
      t = setTimeout(function () {
				startTime()
			}, 500);
    }

    // Weather
    function getWeather() {
			$.ajax({
				type: 'GET',
				dataType: 'jsonp',
				url: "https://api.forecast.io/forecast/" + config.weather_api_key + "/" + config.latitude + "," + config.longitude,
				success: function(data) {
					formatWeather(data);
				}
			});
		}

		function formatWeather(weather) {
			console.log('weather', weather);
			$('#current-temp').html(Math.round(weather.currently.temperature));
			$('#current-weather-icon').addClass(weatherIcons[weather.currently.icon]);
			$('#prob-rain').html(weather.daily.data[0].precipProbability * 100);
		}

    startTime();
		getWeather();


	});

})();