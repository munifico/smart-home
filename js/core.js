(function (angular) {
    'use stric';

    function  HomeCtrl(GeolocationService, WeatherService,
                       MapService,
                       $scope, $timeout, $interval, $sce, $http) {
        var _this = this;
        //var command = COMMANDS.ko;
        //var DEFAULT_COMMAND_TEXT = command.default;
        //$scope.interimResult = DEFAULT_COMMAND_TEXT;

        /*PC일경우 IP 주소 확인*/
        var os = require('os');
        var networkInterfaces = os.networkInterfaces();
        var addresses = [];
        for (var k in networkInterfaces) {
            for (var k2 in networkInterfaces[k]) {
                var address = networkInterfaces[k][k2];
                if (address.family === 'IPv4' && !address.internal) {
                    addresses.push(address.address);
                }
            }
        }
        $scope.ipAddress = addresses[0];


        /*라즈베리파이일 경우 IP 확인*/
        //$scope.ipAddress = networkInterfaces.wlan0[0].address;

        //시간 업데이트
        function updateTime() {
            $scope.date = new Date();
        }

        _this.init = function() {
            $scope.map = MapService.generateMap("Seoul, Korea");
            var tick = $interval(updateTime, 1000); //1초마다 재실행
            updateTime();

            var geoloc = {};
            geoloc.coords = null;

            var geolocation = require('geolocation');

            //GPS정보를 가져온다
           GeolocationService.getLocation({enableHighAccuracy: true}).then(function(geoposition){
                console.log("Geoposition", geoposition);
                geoloc = geoposition;
               $scope.map = MapService.generateMap(geoposition.coords.latitude+','+geoposition.coords.longitude);
            }, function(error){
               console.log(error); //GPS정보를 못가져올때.
               //IP주소로 위치를 확인한다.
               console.log('IP주소',$scope.ipAddress);
           });
            //restCommand();

            /** 현재 장소를 가져오며, 날씨 정보를 가져온다. */
            var refreshMirrorData = function() {
                //Get our location and then get the weather for our location
                //GeolocationService.getLocation({enableHighAccuracy: true}).then(function(geoposition){
                GeolocationService.getLocation().then(function(geoposition){
                        console.log("Geoposition", geoposition);
                        /*WeatherService.init(geoposition).then(function() {
                            $scope.currentForcast = WeatherService.currentForcast();
                            $scope.weeklyForcast = WeatherService.weeklyForcast();
                            $scope.hourlyForcast = WeatherService.hourlyForcast();
                            console.log("Current", $scope.currentForcast);
                            console.log("Weekly", $scope.weeklyForcast);
                            console.log("Hourly", $scope.hourlyForcast);
                        });*/
                }, function(error){
                    console.log(error);
                });

                /*날씨정보를 가져온다.*/
                WeatherService.init(geoloc).then(function() {
                    $scope.currentForcast = WeatherService.currentForcast();
                    $scope.weeklyForcast = WeatherService.weeklyForcast();
                    $scope.hourlyForcast = WeatherService.hourlyForcast();
                    console.log("Current", $scope.currentForcast);
                    console.log("Weekly", $scope.weeklyForcast);
                    console.log("Hourly", $scope.hourlyForcast);
                });







                /** icals로 연동된 달력의 정보를 가져온다. */
                /*CalendarService.getCalendarEvents().then(function(response) {
                    $scope.calendar = CalendarService.getFutureEvents();
                }, function(error) {
                    console.log(error);
                });
                */

                /** config.js의 greeting 배열(인사말의 정보)를 랜덤으로 가져온다 */
                $scope.greeting = config.greeting[Math.floor(Math.random() * config.greeting.length)];
            };

            refreshMirrorData();
            $interval(refreshMirrorData, 3600000);

            if (navigator.geolocation) navigator.geolocation.getCurrentPosition(onPositionUpdate);

            function onPositionUpdate(position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true";
                $http.get(url)
                    .then(function(result) {
                        var address = result.data.results[2].formatted_address;
                        console.log(address);
                        $scope.address = address;
                    });
            }



        };

        _this.init();

    }

    angular.module('home', [])
        .controller('HomeCtrl', HomeCtrl);


}(window.angular));
/**
 * Created by admin on 2016-11-17.
 */
