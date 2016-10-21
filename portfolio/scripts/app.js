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
    function getWeather() {
      $.ajax({
        url: 'http://api.wunderground.com/api/0fab5cf05915f696/geolookup/conditions/q/97601.json',
        dataType: 'jsonp',
        success: function(response) {
          var conditions = response.current_observation.weather;
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
  });
}
init();
