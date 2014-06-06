define(['jquery'], function ($) {
    var hostCommunicator = {
        iFrameIndex: undefined,
        allPubsubs: [],
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

            //################### @TODO - make this generic

            window.addEventListener('message', function (event) {
                if (event.data.announcement === 'newsspec_iframe--number') {
                    externalHostCommunicator.iframeIndex = event.data.details;
                }
            }, false);

            var originalEmitFunction = $.fn.emit;
            $.fn.extend({
                emit: function() {
                    // original behavior - use function.apply to preserve context
                    var extended = originalEmitFunction.apply(this, arguments),
                        announcement = arguments[0],
                        details = arguments[1];

                    console.log('yes, the emit event has been overridden');
                    // @TODO 
                    if (!$.inArray(announcement, externalHostCommunicator.allPubsubs)) {
                        externalHostCommunicator.push(announcement);
                        $.on(announcement, function () {
                            externalHostCommunicator.forwardPubsubToHost(announcement, details);
                        });
                    }

                    // preserve return value
                    return extended;
                }
            });

        },

        forwardPubsubToHost: function (announcement, details) {
            externalHostCommunicator.sendDataByPostMessage({
                pubsub: {
                    originator:   externalHostCommunicator.iframeIndex,
                    announcement: announcement,
                    details:      details
                }
            });
        },

        //###################

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
        // ############################################################################ decoupled this from just the istats
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