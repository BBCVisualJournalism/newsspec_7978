define(['jquery', 'lib/news_special/iframemanager__frame'], function ($, iframemanager__frame) {

    IFrameCommunicator = {

        init: function () {
            var externalIFrameCommunicator = this;

            if (iframemanager__frame.postMessageAvailable) {
                window.addEventListener('message', externalIFrameCommunicator.messageReceivedFromHost, false);
            }
        },

        emittedFromHost: false,

        forwardToHost: function (announcement, details) {

            if (!IFrameCommunicator.emittedFromHost && announcement !== 'event_to_send_to_host') {
                $.emit('event_to_send_to_host', [announcement, details]);
            }

            IFrameCommunicator.emittedFromHost = false;
        },

        messageReceivedFromHost: function (event) {
            var data = iframemanager__frame.parseJSONData(event.data);

            IFrameCommunicator.emittedFromHost = true;

            // shouldn't need this conditional, but PhantomJS/Jasmine complains otherwise.
            if (data.announcement) {
                $.emit(data.announcement, data.details);
            }
        }
    };

    IFrameCommunicator.init();

    return IFrameCommunicator;
});