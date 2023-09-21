window.addEventListener('load', function () {

    geoSetup();

    //API Function
    function runApi(weather) {
        console.log(weather);
        console.log(JSON.parse(JSON.stringify(weather.address)));
    }

    // GEOLOCATION SETUP

    async function geoSetup(){
        const successCallback = (position) => {
            console.log(position.coords.latitude);
            console.log(position.coords.longitude);
            apiSetup();
        };
        const errorCallback = (error) => {
            console.log(error);
        };
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }

    // API SETUP
    async function apiSetup(){
        console.log("Ive been waiting!");
        const response = await fetch(
            "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Leeds?unitGroup=uk&include=days&key=7NXFV8AJEAKU3BYMBQESNEHU8&contentType=json",
            {
                method: 'GET',
                headers: {}
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        runApi(data);
    }
})