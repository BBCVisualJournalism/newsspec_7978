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
                var colors = ['#CF0000', 'yellow', 'lime'];
                news.pubsub.emit('frames:changeColor', [colors]);
            });

        },

        subscribeToEvents: function () {

            var iFrameTester = this;

            news.pubsub.on('item:clicked', function (number) {
                iFrameTester.highlightFace(number);
                news.$('.fixedFrame').html('You chose face number ' + number);
            });

            news.pubsub.on('frames:changeColor', function (colors) {
                news.$('.mainFrame').css('background', iFrameTester.getRandomColor(colors));
                news.$('.fixedFrame').css('background', iFrameTester.getRandomColor(colors));
                news.$('.extraFrame').css('background', iFrameTester.getRandomColor(colors));
            });
        },

        highlightFace: function (faceNumber) {
            var face = news.$('.mainFrame .facewall_item[data-face-number="' + faceNumber + '"]');
            news.$('.facewall_item').removeClass('facewall_item--selected');
            face.addClass('facewall_item--selected');
        },

        getRandomColor: function (colors) {
            return colors[Math.floor(Math.random() * colors.length)];
        }
    };

});
