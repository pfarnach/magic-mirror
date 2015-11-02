(function() {

	$(document).ready(function() {

		var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

		// Fade in once weather loads
		$('.container').hide();

		// TIME
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
      	h_mom = h - 12;
      }
      
      $(".full-date").html(monthNames[today.getMonth()] + " " + today.getDate());
      $(".timer-hour").html(h_mod);
      $(".timer-min").html(m);
      $(".timer-suffix").html(am_pm);
      t = setTimeout(function () {
				startTime()
			}, 500);
    }

    // WEATHER
    function getWeather() {
			$.ajax({
				type: 'GET',
				dataType: 'jsonp',
				url: "https://api.forecast.io/forecast/" + config.weather_api_key + "/" + config.location.latitude + "," + config.location.longitude,
				success: function(data) {
					formatWeather(data);
					$('.container').fadeIn(1500);
				}
			});
		}

		function formatWeather(weather) {
			var days = ['Sun', 'Mon', 'Tu', 'Wed', 'Th', 'Fri', 'Sat'];			
		  var dayOfWeek = new Date().getDay();
		  var arrangedDays = (days.splice(dayOfWeek)).concat(days);

			$('.current-temp').html(Math.round(weather.currently.temperature));
			$('.current-weather-icon').addClass(weatherIcons[weather.currently.icon]);
			$('.prob-rain').html(Math.round(weather.daily.data[0].precipProbability * 100));
			
			for (var i = 0; i < 7; i++) {
				$('.weekly-forecast-container').append("<div class='weekly-forecast-day'></div>")
				$('.weekly-forecast-day').last().append("<span class='day-label'>" + arrangedDays[i] + "</span>");
				$('.weekly-forecast-day').last().append("<span class='weekday-high-temp'> " + Math.round(weather.daily.data[i].temperatureMax) + "º</span> / <span class='weekday-low-temp'>" + Math.round(weather.daily.data[i].temperatureMin) + "º </span>");
				$('.weekly-forecast-day').last().append("<span class='" + weatherIcons[weather.daily.data[i].icon] +"'></span>");
			}
		}

		// QUOTES
		function getQuote() {
			// TODO: Scrape this in python, add to DB and pull from Flask - http://www.forbes.com/sites/kevinkruse/2013/05/28/inspirational-quotes/
			var quotes = [
				{
					content: "Strive not to be a success, but rather to be of value.",
					author: "Albert Einstein"
				},
				{
					content: "The most difficult thing is the decision to act, the rest is merely tenacity.",
					author: "Amelia Earhart"
				},
				{
					content: " The best time to plant a tree was 20 years ago. The second best time is now.",
					author: "Chinese Proverb"
				},
				{
					content: "Every child is an artist.  The problem is how to remain an artist once he grows up.",
					author: "Pablo Picasso"
				},
				{
					content: "Más vale la pena en el rostro que la mancha en el corazón.",
					author: "Miguel de Cervantes"
				},
				{
					content: "There is nothing to writing. All you do is sit down at a typewriter and bleed.",
					author: "Mark Twain"
				},
				{
					content: "In this world / love has no color / yet how deeply / my body / is stained by yours.",
					author: "Izumi Shikibu"
				}
			];

			var randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

			$('.quote-content').html(randomQuote.content);
			$('.quote-author').html(randomQuote.author);
		}

		// NEWS TICKER
		function getNews() {
			$.get("/get_news_headlines", function (data) {
				var headlines = data.headlines;
				
				headlines.forEach(function(headline) {
					$('.newsticker').append("<li>>>" + headline.title + "</li>");
				});

				$('.newsticker').newsTicker({
			    row_height: 13.5,
			    max_rows: 2,
			    speed: 600,
			    direction: 'up',
			    duration: 4000,
			    autostart: 1,
			    pauseOnHover: 0
				});					
			});
		}

    startTime();
		getWeather();
		getQuote();
		getNews();

	});

})();