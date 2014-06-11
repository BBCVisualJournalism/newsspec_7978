# Newsspec-7978

Exploring the communication between two iFrames.

## Ideology

I didn't want the developer to have to change their workflow - JS modules should still communicate via pubsub in the same way they already do. Devs should be able to emit custom events from one iFrame and subscribe to them from another iFrame.

## How it works

We have communication between the iFrame manager *host* and *frame* via a *communicator*.

### From the host's perspective

When an iFrame is instantiated in *the host* ("iframemanager__host.js"), a reference to it is stored in a global JavaScript array `newsspec_iframes_subscribed`.

If the iFrame emits a pubsub message, the pubsub bubbles its way up to the host (see how in the next section). The host then checks the global array of iFrames that have been added to the page and iterates through them, forwarding the pubsub to those iFrames. The host also has logic that prevents it forwarding pubsubs back to the iFrame that originally sent the message.

### From the iFrame's perspective

"pubsub.js" has been extended slightly to pull in *the iFrame communicator* ("iframemanager__communicator.js"). Whenever an event is emitted via pubsub, it is also passed to the communicator.

The communicator packages the pubsub into another pubsub, "event_to_send_to_host". It then emits this like a normal pubsub. The communicator has logic so that it doesn't forward "event_to_send_to_host" in an infinite loop.

*The frame* ("iframemanager__frame.js") listens for the "event_to_send_to_host" event and forwards it to the host. It also tells the host which iFrame it is, so that the host can avoid forwarding the pubsub back to the original iFrame.

The frame knows which iFrame it is because, on load, it informs the host it is ready to start receiving messages; the host then allocates it an index based on the number of iFrames already in the global array of iFrames. The frame passes this index back to the host along with the pubsubs that it forwards.

When the host forwards the pubsub to each iFrame, the pubsub is picked up by the communicator, which emits the pubsub to the other JS modules in the frame. The communicator contains logic to stop it emitting an "event_to_send_to_host" pubsub when it received the pubsub *from* the host.

## iFrame scaffold

This project was built using the iFrame scaffold v1.4.1

## License
Copyright (c) 2014 BBC