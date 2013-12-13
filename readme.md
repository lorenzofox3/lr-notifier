# lrNotifier

lrNotifier is a notification module for Angularjs. It is lightweight and very simple (less 75 lines of code) and has no dependency on any third party
 library other than angular framework itself. you can easily customise your notification template and define different channels on the application.

## getting started

include the module in your application.
```javascript
angular.module('myApp',['lrNotifier']);
```

Use the directive in your markup to define a container for a given notification channel and the template of your notifications

```markup
<div lr-notification-stack-container="channelName">
    <p>This is a very simple template: here is your message....<br/>
    {{notification.message}}</p>
</div>
```

Then anywhere in your application (directive, controller, service) push notification on you channel using one the following methods

```javascript
app.controller('myCtrl',['lrNotifier',function(notifier){

    var channel=notifier('channelName');

    //push a notification object on the channel
    channel.pushNotification({message:'hello channel', otherProp:'other'});

    channel.info('a great message');
    //is equivalent to pushNotification({level:'info',message:'a great message')

    channel.warn('a great message');
    //is equivalent to pushNotification({level:'warn',message:'a great message')

    channel.error('a great message');
    //is equivalent to pushNotification({level:'error',message:'a great message')
}]);
```

note the level is also used to assign a class to the notification so you can easily change the style with css

##life cycle of a notification

Once a notification has been pushed, the user will be able to remove it from the stack by clicking on it.
Otherwise it will disappear by itself after 3s.

You can change the time at configuration phase, using the provider

```javascript

app.config(function(lrNotifierProvider){
    lrNotifierProvider.setTimer(5000); //in ms
});

```

##animations

If you are using angular >= 1.2.0 you can use animation as for any ng-repeat directive.

//todo complete here

## Unit tests
You can run unit test using Karma
``karma start karma.conf.js``

## Contributing

Before submitting a pull request make sure:
*the change keep the code simple
*to add test for your 'new feature'
*all tests are passing
*to update documentation

##Licence

MIT License



