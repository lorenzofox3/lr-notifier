describe('notifier module', function () {

    beforeEach(module('lrNotifier'));

    describe('notifier service', function () {
        var
            notifier,
            testChannel;

        beforeEach(inject(function (lrNotifier) {
            notifier = lrNotifier;
            testChannel = notifier('test');
        }));

        it('should get an empty channel ie an array of zero element', function () {
            expect(testChannel.getChannel().length).toBe(0);
        });

        it('should have the same instance of the channel notifications', function () {
            var channelBis = notifier('test');
            expect(channelBis.getChannel()).toBe(testChannel.getChannel());
        });


        it('should push a new item to the channel', function () {
            var channel = testChannel.getChannel();
            var notification = {message: 'hello'};
            expect(channel.length).toBe(0);
            testChannel.pushNotification(notification);
            expect(channel.length).toBe(1);
            expect(channel[0]).toEqual(notification);
        });

        it('should remove the notification after timeout', inject(function ($timeout) {
            var channel = testChannel.getChannel();
            var notification = {message: 'hello'};
            expect(channel.length).toBe(0);
            testChannel.pushNotification(notification);
            expect(channel.length).toBe(1);
            $timeout.flush();
            expect(channel.length).toBe(0);
        }));


        it('should remove a given notification from a given channel', function () {
            var channel = testChannel.getChannel();
            testChannel.pushNotification({message: 'hello1'});
            testChannel.pushNotification({message: 'hello2'});
            testChannel.pushNotification({message: 'hello3'});
            expect(channel.length).toBe(3);
            testChannel.removeNotification(channel[1]);
            expect(channel.length).toBe(2);
            expect(channel).toEqual([
                {message: 'hello1'},
                {message: 'hello3'}
            ]);
        });

        it('should push a notification with the message and a "info" level and return it', function () {
            var channel = testChannel.getChannel();
            var notif = testChannel.info('an info message');
            expect(channel.length).toEqual(1);
            expect(notif).toEqual({message: 'an info message', level: 'info'});
            expect(notif).toBe(channel[0]);
        });

        it('should push a notification with the message and a "warn" level', function () {
            var channel = testChannel.getChannel();
            var notif = testChannel.warn('an warn message');
            expect(channel.length).toEqual(1);
            expect(notif).toEqual({message: 'an warn message', level: 'warn'});
            expect(notif).toBe(channel[0]);
        });

        it('should push a notification with the message and a "error" level', function () {
            var channel = testChannel.getChannel('channel');
            var notif = testChannel.error('an error message');
            expect(channel.length).toEqual(1);
            expect(notif).toEqual({message: 'an error message', level: 'error'});
            expect(notif).toBe(channel[0]);
        });

        it('should push a notification with the message and a "success" level', function () {
            var channel = testChannel.getChannel('channel');
            var notif = testChannel.success('a success message');
            expect(channel.length).toEqual(1);
            expect(notif).toEqual({message: 'a success message', level: 'success'});
            expect(notif).toBe(channel[0]);
        });
    });

    describe('notifications stack container', function () {
        var element, scope, notifier, testChannel, notifs;
        beforeEach(inject(function ($rootScope, $compile, lrNotifier) {
            var link = $compile('<div lr-notification-stack-container="test"><ul><li ng-click="lrNotifierCtrl.removeNotification(notification)" class="notification-item" ng-repeat="notification in lrNotifierCtrl.notifications">{{ notification.message }}</li></ul></div>');
            scope = $rootScope;
            element = link(scope);
            notifier = lrNotifier;
            testChannel = notifier('test');
        }));

        it('should not have any notification yet', function () {
            var notifs = element.find('li.notification-item');
            expect(notifs.length).toBe(0);
        });

        it('should add a notification item when any other component push a notification', function () {
            testChannel.pushNotification({message: 'hello'});
            scope.$digest();
            notifs = element.find('LI');
            expect(notifs.length).toBe(1);
            expect(angular.element(notifs[0]).text()).toEqual('hello');
        });

        it('should only react to the channel name specified', function () {
            var whateverChannel = notifier('whatever');
            testChannel.pushNotification({message: 'hello'});
            whateverChannel.pushNotification({message: 'd'});
            scope.$digest();
            notifs = element.find('LI');
            expect(notifs.length).toBe(1);
        });

        it('should remove the notification from the list when clicked', function () {
            testChannel.info('hello');
            scope.$digest();
            notifs = element.find('LI');
            expect(notifs.length).toBe(1);
            angular.element(notifs[0]).triggerHandler('click');
            scope.$digest();
            notifs = element.find('LI');
            expect(notifs.length).toBe(0);
        });

    });
});
