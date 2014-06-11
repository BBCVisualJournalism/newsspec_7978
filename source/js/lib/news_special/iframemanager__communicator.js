define(['jquery'], function ($) {

    var emittedFromHost = false;

    IFrameCommunicator = {

        init: function () {
            var externalIFrameCommunicator = this;
            window.addEventListener('message', externalIFrameCommunicator.messageReceivedFromHost, false);
        },

        //emittedFromHost: false,

        forwardToHost: function (announcement, details) {

            if (!emittedFromHost && announcement !== 'event_to_send_to_host') {
                $.emit('event_to_send_to_host', [announcement, details]);
            }

            emittedFromHost = false;
        },

        messageReceivedFromHost: function (event) {
            var data = JSON.parse(event.data.split('::')[1]);

            emittedFromHost = true;

            // shouldn't need this conditional, but PhantomJS/Jasmine complains otherwise.
            if (data.announcement) {
                $.emit(data.announcement, data.details);
            }
        }
    };

    IFrameCommunicator.init();

    return IFrameCommunicator;
});