define(['lib/news_special/bootstrap', 'lib/news_special/share_tools/controller'], function (news, shareTools) {

    return {
        init: function (storyPageUrl) {
            this.listenForButtonClicks();
            this.subscribeToEvents();
        },

        listenForButtonClicks: function () {

            news.$('.facewall_item').on('click', function () {
                var itemNumber = news.$(this).attr('data-face-number');
                news.pubsub.emit('item:clicked', [itemNumber]);
            });

            news.$('.change_color_of_all_frames').on('click', function () {
                var colors = ['#CF0000', 'yellow', 'lime', 'cyan', 'gold'];
                news.pubsub.emit('frames:changeColor', [colors]);
            });

        },

        subscribeToEvents: function () {

            var iFrameTester = this;

            news.pubsub.on('item:clicked', function (number) {
                var displayText = iFrameTester.getPersonalMessage(number);
                iFrameTester.highlightFace(number);
                iFrameTester.updateResultText(displayText);
            });

            news.pubsub.on('frames:changeColor', function (colors) {
                iFrameTester.explainHowAwesomeThisCodeIs();
                news.$('.mainFrame').css('background', iFrameTester.getRandomColor(colors));
                news.$('.fixedFrame').css('background', iFrameTester.getRandomColor(colors));
                news.$('.extraFrame').css('background', iFrameTester.getRandomColor(colors));
            });
        },

        updateResultText: function (html) {
            news.$('.fixedFrame').html(html);
        },

        highlightFace: function (faceNumber) {
            var face = news.$('.mainFrame .facewall_item[data-face-number="' + faceNumber + '"]');
            news.$('.facewall_item').removeClass('facewall_item--selected');
            face.addClass('facewall_item--selected');
        },

        getPersonalMessage: function (number) {
            var html = '<h2>Face #' + number + '</h2>',
                personalMessage;

            if (number < 100) {
                personalMessage = 'Try clicking further down the page.';
            }
            else if (number < 300) {
                personalMessage = 'Pretty awesome, huh? This iFrame is still fixed on the right. Designers should be happy.';
            }
            else if (number < 600) {
                personalMessage = 'Still fixed. I\'m not going anywhere.';
            }
            else if (number < 900) {
                personalMessage = 'If I had a pound for every tile on this page...';
            }
            else {
                personalMessage = 'Look at the bottom of the page. We have a third iFrame. Still haven\'t broken anything!';
            }

            html += '<p>' + personalMessage + '</p>';

            return html;
        },

        explainHowAwesomeThisCodeIs: function () {

            var html = '<h2>Woop!</h2>';

            html += '<p>';
            html += 'Not only have we got some pretty colors, this is also an example of one pubsub being forwarded to multiple iFrames.';
            html += '</p>';

            this.updateResultText(html);
        },

        getRandomColor: function (colors) {
            return colors[Math.floor(Math.random() * colors.length)];
        }
    };

});
