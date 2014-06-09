define(['lib/news_special/bootstrap', 'lib/news_special/share_tools/controller'], function (news, shareTools) {

    return {
        init: function (storyPageUrl) {
            this.listenForButtonClicks();
            this.subscribeToEvents();
        },

        listenForButtonClicks: function () {
            news.$('.change_color_of_all_frames').on('click', function () {
                news.pubsub.emit('frames:changeColor', 'cyan');
            });

            news.$('.change_color_of_frame_2').on('click', function () {
                news.pubsub.emit('frame2:changeColor', 'red');
            });

            news.$('.change_color_of_frame_3').on('click', function () {
                news.pubsub.emit('frame3:changeColor', 'blue');
            });
        },

        subscribeToEvents: function () {
            news.pubsub.on('frames:changeColor', function (color) {
                news.$('.main').css('background', color);
            });

            news.pubsub.on('frame2:changeColor', function (color) {
                news.$('.frame2').css('background', color);
            });

            news.pubsub.on('frame3:changeColor', function (color) {
                news.$('.frame3').css('background', color);
            });
        }
    };

});
