angular.module('furbMobile', ['ionic', 'ngOpenFB', 'ngCordova', 'ngMap'])
    //angular.module('furbMobile', ['ionic', 'ionic.service.core', 'ionic.service.push', 'ngOpenFB'])

    //    .run(function ($ionicPush, $ionicPlatform, $ionicPopup, ngFB) {
    .run(function ($ionicPlatform, ngFB) {
            ngFB.init({
                appId: '252117715125830',
                status: true,
                cookie: true,
                xfbml: true,
                accessToken: localStorage.getItem('fbAccessToken')
            });

        $ionicPlatform.ready(function () {
            // $ionicPush.init({
            //     "debug": true,
            //     "onNotification": function (notification) {

            //         $ionicPopup.alert({
            //             title: notification.title,
            //             template: notification.text
            //         }).then();
            //     },
            //     "onRegister": function (data) {
            //         localStorage.setItem("tokenIonic", data.token);
            //     },
            //     "pluginConfig": {
            //         "ios": {
            //             "badge": true,
            //             "sound": true
            //         },
            //         "android": {
            //             "iconColor": "#343434"
            //         }
            //     }
            // });

            // var push = new Ionic.Push();
            // var callback = function (token) {
            //     push.saveToken(token, { 'ignore_user': true });
            // }

            // $ionicPush.register(callback);

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    });