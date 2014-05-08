# lrNotifier

[![Build Status](https://travis-ci.org/lorenzofox3/lr-notifier.svg?branch=master)](https://travis-ci.org/lorenzofox3/lr-notifier)

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
The class name of the items is ``notification-item``

```css
/*
  We're using CSS transitions for when
  the enter and move events are triggered
  for the element that has the .notification-item
  class
*/
.notification-item.ng-enter, .notification-item.ng-move {
    -webkit-transition:0.5s linear all;
    -moz-transition:0.5s linear all;
    -o-transition:0.5s linear all;
    transition:0.5s linear all;
    opacity:0;
}

/*
 The ng-enter-active and ng-move-active
 are where the transition destination properties
 are set so that the animation knows what to
 animate.
*/
.notification-item.ng-enter.ng-enter-active,
.notification-item.ng-move.ng-move-active {
    opacity:1;
}

/*
  We're using CSS keyframe animations for when
  the leave event is triggered for the element
  that has the .notification-item class
*/
.notification-item.ng-leave {
    -webkit-animation:0.5s my_animation;
    -moz-animation:0.5s my_animation;
    -o-animation:0.5s my_animation;
    animation:0.5s my_animation;
}

@keyframes my_animation {
    from { opacity:1; }
    to { opacity:0; }
}

/*
  Unfortunately each browser vendor requires
  its own definition of keyframe animation code...
*/
@-webkit-keyframes my_animation {
    from { opacity:1; }
    to { opacity:0; }
}

@-moz-keyframes my_animation {
    from { opacity:1; }
    to { opacity:0; }
}

@-o-keyframes my_animation {
    from { opacity:1; }
    to { opacity:0; }
}
```

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

Copyright (C) 2013 Laurent Renard.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



