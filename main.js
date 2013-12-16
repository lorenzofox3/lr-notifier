angular.module('myApp', ['lrNotifier','ngAnimate']).controller('mainCtrl', ['$scope', 'lrNotifier', function (scope, notifier) {

    var channels = [];
    channels.push(notifier('channel1'));
    channels.push(notifier('channel2'));
    channels.push(notifier('channel3'));

    scope.notification = {level: 'free'};

    scope.push = function (channelIndex) {
        channels[channelIndex].pushNotification(angular.copy(scope.notification));
    };
}]);