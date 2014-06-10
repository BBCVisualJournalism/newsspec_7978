# Newsspec-7978

Exploring the communication between two iFrames.

## Ideology

I didn't want the developer to have to change their workflow - JS modules should still communicate via pubsub in the same way they already do. Devs should be able to emit custom events from one iFrame and subscribe to them from another iFrame.

## How it works

I've made changes to pubsub.js, iframemanager__host.js and iframemanager__frame.js.

When the iFrame is instantiated (in iframemanager__host), a reference to it is stored in a global JavaScript array `newsspec_iframes_subscribed`.

iframemanager__frame.js sends JSON back to the host in a setTimeout loop calling the function `sendDataByPostMessage`. When the application has instantiated, the frame notifies the host through this function. The host then sends a post message to the iFrame telling it what index iFrame it is.

As the application runs, if an event is emitted it is picked up in pubsub.js and forwarded to the host (via the frame). The host then forwards to all of the other iFrames on the page (using the index to not send the event back to the original iframe, which would cause an infinite loop).

## iFrame scaffold

This project was built using the iFrame scaffold v1.4.1

## License
Copyright (c) 2014 BBC