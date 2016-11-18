var config = {
    // Language for the mirror (currently not implemented)
    language : "ko",
    greeting : ["SmartHome"], // An array of greetings to randomly choose from
    // forcast.io
    forcast : {
        key : "d21d0b75ab7e5417af7ae54d5600659d", // Your forcast.io api key
        units : "auto" // See forcast.io documentation if you are getting the wrong units
    },
    // Calendar (An array of iCals)
    calendar: {
      icals : ["380106264704-dtdqu8sp0skqfpf8ev4acs670imf81gq.apps.googleusercontent.com"],
      maxResults: 9, // Number of calender events to display (Defaults is 9)
      maxDays: 365 // Number of days to display (Default is one year)
    },
    traffic: {
      key : ".....", // Bing Maps API Key
      mode : "Transit", // Possibilities: Driving / Transit / Walking
      origin : "Suwon", // Start of your trip. Human readable address.
      destination : "Yangjae", // Destination of your trip. Human readable address.
      name : "테스트시스템", // Name of your destination ex: "work"
      reload_interval : 5 // Number of minutes the information is refreshed
    },

    youtube: {
      key:"....."
    },

    subway: {
      key:"....."
    },
    soundcloud: {
    	key:"....."
    }
}
