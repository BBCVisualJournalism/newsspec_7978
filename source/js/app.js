define(['lib/news_special/bootstrap', 'lib/news_special/share_tools/controller', 'lib/news_special/iframemanager__communicator'], function (news, shareTools) {

    return {
        init: function (storyPageUrl) {

            // news.pubsub.emit('istats', ['app-initiated', 'newsspec-nonuser', true]);
            // setTimeout(function () {
            //     news.pubsub.emit('istats', ['panel-clicked', 'newsspec-interaction', 3]);
            // }, 500);
            // setTimeout(function () {
            //     news.pubsub.emit('istats', ['quiz-end', 'newsspec-interaction', true]);
            // }, 2000);

            news.$('.change_color_of_all_frames').on('click', function () {
                news.pubsub.emit('frames:changeColor');
            });

            news.$('.change_color_of_frame_2').on('click', function () {
                news.pubsub.emit('frame2:changeColor');
            });

            news.$('.change_color_of_frame_3').on('click', function () {
                news.pubsub.emit('frame3:changeColor');
            });

            news.pubsub.on('ext:frames:changeColor', function (color) {
                news.$('.main').css('background', color);
            });

            news.pubsub.on('ext:frame2:changeColor', function (color) {
                news.$('.frame2').css('background', color);
            });

            news.pubsub.on('ext:frame3:changeColor', function (color) {
                news.$('.frame3').css('background', color);
            });
        }
    };

});
