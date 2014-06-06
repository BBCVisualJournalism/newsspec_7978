define(['lib/news_special/bootstrap', 'lib/news_special/share_tools/controller'], function (news, shareTools) {

    var IFrameCommunicator = function () {
        window.addEventListener('message', this.messageReceived, false);
    };

    IFrameCommunicator.prototype =  {
        messageReceived: function (event) {
            console.log('message received from host', event);
            news.pubsub.emit('ext:' + event.data.announcement, [event.data.details]);
        }
    };

    return new IFrameCommunicator();
});