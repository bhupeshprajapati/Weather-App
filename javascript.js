$(document).ready(function(){
   
        
    
    var endpoint= "https://fcc-weather-api.glitch.me/api/current?"
    var lat,long;
    var finalUrl;
    var currTempC;
    var tempCelcius;
    var flag='c';
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
         var lat='lat='+position.coords.latitude;
         var long='lon='+position.coords.longitude;
         getValues(lat,long);
        });
      }
     
      function getValues(lat,long){
          var finalUrl= endpoint + lat+'&'+long;
          console.log(finalUrl);
          $.ajax({
              url: finalUrl,
              success: function (result) {
                  $('#city').text(result.name +", ");
                  $('#country').text(result.sys.country);
                  tempCelcius=Math.round(result.main.temp);
                  currTempC= Math.round(result.main.temp)+String.fromCharCode(176)+'C';
                  $('#temp').text(currTempC);
                  $('#desc').text(result.weather[0].main);
                  $('#icon').prepend($('<img>',{id:'theImg',src: result.weather[0].icon}))
              }
          });
      }
      $('#toggle').click(function(){
         if(flag=='c'){
         var temp= tempCelcius*(9/5)+32;
         currTempC=Math.round(temp)+String.fromCharCode(176)+'F';
         $('#toggle').text(String.fromCharCode(176)+'C');
         $('#temp').text(currTempC); 
         flag='f';          
         }
         else{
            currTempC=tempCelcius+String.fromCharCode(176)+'C';
            $('#toggle').text(String.fromCharCode(176)+'F');
            $('#temp').text(currTempC);
            flag='c';  
         }

      });
});