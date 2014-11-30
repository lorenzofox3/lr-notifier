# lrNotifier

[![Build Status](https://travis-ci.org/lorenzofox3/lr-notifier.svg?branch=master)](https://travis-ci.org/lorenzofox3/lr-notifier)

lrNotifier is a notification module for Angularjs. It is lightweight and very simple (less 75 lines of code) and has no dependency on any third party
 library other than angular framework itself. you can easily customise your notification template and define different channels on the application.

## getting started

include the module in your application.
```javascript
angular.module('myApp',['lrNotifier']);
```

Use the directive in your markup to define a container for a given notification channel and the template of your notifications. The stack container directive create a controller so you can access
its variable within the html as `lrNotifierCtrl` or extend it from a sub directive

```markup
<div lr-notification-stack-container="channelName">
    <ul>
        <li ng-class="notification.level" ng-repeat="notification in lrNotifierCtrl.notifications" ng-click="lrNotifierCtrl.removeNotification(notification)">
          {{notification.message}}
        </li>
    </ul>
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


## Unit tests
You can run unit test using Karma
``gulp``

## Contributing

Before submitting a pull request make sure:
*the change keep the code simple
*to add test for your 'new feature'
*all tests are passing
*to update documentation

##Licence

Copyright (C) 2013 Laurent Renard.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



