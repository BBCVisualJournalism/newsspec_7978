define(['lib/news_special/bootstrap', 'lib/news_special/share_tools/controller'], function (news, shareTools) {

    return {
        init: function (storyPageUrl) {

            // news.pubsub.emit('istats', ['app-initiated', 'newsspec-nonuser', true]);
            // setTimeout(function () {
            //     news.pubsub.emit('istats', ['panel-clicked', 'newsspec-interaction', 3]);
            // }, 500);
            // setTimeout(function () {
            //     news.pubsub.emit('istats', ['quiz-end', 'newsspec-interaction', true]);
            // }, 2000);

            news.$('.change_color').on('click', function () {
                news.pubsub.emit('frame2:changeColor');
            });

            news.pubsub.on('frame2:changeColor', function () {
                news.$('.frame2').css('background', 'red');
            });
        }
    };

});
