define(['jquery'], function ($) {
    var hostCommunicator = {
        iFrameIndex: undefined,
        postMessageAvailable: (window.postMessage ? true : false),
        init: function () {
            var externalHostCommunicator = this;
            this.setHeight();
            this.startWatching();
            if (this.postMessageAvailable) {
                this.setupPostMessage();
            }
            else {
                this.setupIframeBridge();
            }
            $.on('istats', function (actionType, actionName, viewLabel) {
                externalHostCommunicator.setHeight();
                externalHostCommunicator.registerIstatsCall(actionType, actionName, viewLabel);
            });

            //################### start

            $.on('event_to_send_to_host', function (announcement, details) {
                externalHostCommunicator.forwardPubsubToHost(announcement, details);
            });

            window.addEventListener('message', externalHostCommunicator.setIFrameIndex, false);

            externalHostCommunicator.sendDataByPostMessage({
                iFrameReady: true
            });
        },

        forwardPubsubToHost: function (announcement, details) {
            this.sendDataByPostMessage({
                pubsub: {
                    originator:   this.iFrameIndex,
                    announcement: announcement,
                    details:      details
                }
            });
        },

        setIFrameIndex: function (event) {
            if (event.data.announcement === 'newsspec_iframe::setting_index_from_host') {
                hostCommunicator.iFrameIndex = event.data.details;
                // only need to set the iframe index once
                window.removeEventListener('message', hostCommunicator.setIFrameIndex, false);
            }
        },

        //################### end

        height: 0,
        registerIstatsCall: function (actionType, actionName, viewLabel) {
            var istatsData = {
                'actionType': actionType,
                'actionName': actionName,
                'viewLabel':  viewLabel
            };
            if (this.postMessageAvailable) {
                this.sendDataByPostMessage(istatsData);
            }
            else {
                window.istatsQueue.push(istatsData);
            }
        },
        setupPostMessage: function () {
            window.setInterval(this.sendDataByPostMessage, 32);
        },
        sendDataByPostMessage: function (additionalMessage) {
            var talker_uid = window.location.pathname,
                message = {
                    height:           this.height,
                    hostPageCallback: hostCommunicator.hostPageCallback
                };

            $.extend(message, additionalMessage || {});

            window.parent.postMessage(talker_uid + '::' + JSON.stringify(message), '*');
        },
        setupIframeBridge: function () {
            window.setInterval(this.sendDataByIframeBridge, 100);
            window.istatsQueue = [];
        },
        sendDataByIframeBridge: function () {
            window.iframeBridge = {
                height:           this.height,
                hostPageCallback: this.hostPageCallback
            };
        },
        startWatching: function () {
            window.setInterval(this.setHeight, 32);
        },
        staticHeight: null,
        setStaticHeight: function (newStaticHeight) {
            this.staticHeight = newStaticHeight;
        },
        setHeight: function () {
            var heightValues = [this.staticHeight || 0];
            if ($('.main').length > 0) {
                heightValues.push($('.main')[0].scrollHeight);
            }
            this.height = Math.max.apply(Math, heightValues);
        },
        hostPageCallback: false,
        setHostPageInitialization: function (callback) {
            hostCommunicator.hostPageCallback = callback.toString();
        }
    };
    return hostCommunicator;
});