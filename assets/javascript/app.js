
window.onload = function() {
  
    $("#done").on("click", stopwatch.stop);
   
    $("#start").on("click", stopwatch.start);
  };
  
 
  var intervalId;
  

  var clockRunning = false;

  var stopwatch = {
  
    time: 0,
   
  
    reset: function() {
  
      stopwatch.time = 0;
     

      $("#display").text("00:00");
  

   
    },
    start: function() {
  
      
      if (!clockRunning) {
        intervalId = setInterval(stopwatch.count, 1000);
        clockRunning = true;
      }
    },
    stop: function() {
  
    
      clearInterval(intervalId);
      clockRunning = false;
    },
    recordLap: function() {
  
    
      var converted = stopwatch.timeConverter(stopwatch.time);
  
    
      $("#laps").append("<p>Lap " + stopwatch.lap + " : " + converted + "</p>");
  
    
      stopwatch.lap++;
    },
    count: function() {
  
    
      stopwatch.time++;
  
     
      var converted = stopwatch.timeConverter(stopwatch.time);
      console.log(converted);
  
      
      $("#display").text(converted);
    },
    timeConverter: function(t) {
  
      var minutes = Math.floor(t / 60);
      var seconds = t - (minutes * 60);
  
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
  
      if (minutes === 0) {
        minutes = "00";
      }
      else if (minutes < 10) {
        minutes = "0" + minutes;
      }
  
      return minutes + ":" + seconds;
    }
  };
  
  