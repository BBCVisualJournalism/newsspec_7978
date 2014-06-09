# Newsspec-7978

Exploring the communication between two iFrames.

## Ideology

I didn't want the developer to have to change their workflow - JS modules should still communicate via pubsub in the same way they already do. Something in the scaffold would need to listen for a standard pubsub emission from an iFrame then forward that emission to the other iFrames. It is up to the module in the other iFrame to subscribe to any events which may emit from another iFrame.

news.pubsub.emit

## iFrame scaffold

This project was built using the iFrame scaffold v1.4

## License
Copyright (c) 2014 BBC