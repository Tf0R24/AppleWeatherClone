window.addEventListener('load', function () {
    fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Leeds?unitGroup=uk&include=days&key=7NXFV8AJEAKU3BYMBQESNEHU8&contentType=json").then((response) => {
    console.log(response);
    response.json().then((data) => {
        console.log(data);
    });
});
})