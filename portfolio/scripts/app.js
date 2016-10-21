function init() {
  // Sidebar functions - open and close the sidebar when hamburger or close button is clicked
  $(document).ready(function() {
    $('#close-btn').click(function() {
      $('.sidebar-wrapper').toggleClass('open');
    });
    $('#hamburger').click(function() {
      $('.sidebar-wrapper').toggleClass('open');
    });
    // Query Weather Underground API and set the conditions
    getWeather();
    function getWeather() {
      $.ajax({
        url: 'http://api.wunderground.com/api/0fab5cf05915f696/geolookup/conditions/q/97601.json',
        dataType: 'jsonp',
        success: function(response) {
          var conditions = response.current_observation.weather;
          loadImage(conditions);
        }
      });
    }
    // Get the current, local time and return the categorical time of day (morning, afternoon, or night)
    function getTimeOfDay() {
      var date = new Date();
      var time = date.toLocaleTimeString();
      var hours = date.getHours();
      var timeOfDay;
      if (hours > 17) {
        timeOfDay = 'night';
      } else if (hours > 12 && hours < 16) {
        timeOfDay = 'afternoon';
      } else {
        timeOfDay = 'morning';
      }
      return timeOfDay;
    }
    // Set the background image for the intro section based on the passed conditions
    function loadImage(conditions) {
      var imageSRC = 'img/weather/hero-';
      var validConditions = ['clear', 'cloudy', 'rain', 'snow'];
      var timeOfDay = getTimeOfDay();
      var conditions = conditions.toLowerCase();
      for (var i = 0; i < validConditions.length; i++) {
        if (conditions === validConditions[i]) {
          break;
        } else if (i === validConditions.length - 1){
          conditions = 'cloudy';
        }
      }
      var url = imageSRC + conditions + '-' + timeOfDay + '.jpg';
      $('#intro').css('background-image', 'url(' + url + ')');
    }
  });
}
init();
