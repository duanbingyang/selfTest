$.event.special.valuechange = {
    teardown: function(namespaces) {
        $(this).off('valuechange');
    },

    handler: function(e) {
        $.event.special.valuechange.triggerChanged($(this));
    },

    add: function(obj) {
        $(this).on('keyup.valuechange cut.valuechange paste.valuechange input.valuechange', obj.selector, $.event.special.valuechange.handler)
    },

    triggerChanged: function(element) {
        var current = element[0].contentEditable === 'true' ? element.html() : element.val(),
            previous = typeof element.data('previous') === 'undefined' ? element[0].defaultValue : element.data('previous')
        if (current !== previous) {
            element.trigger('valuechange', [element.data('previous')])
            element.data('previous', current)
        }
    }
}
//previous 修改之前的值
//current 修改之后的值
$('body').on('valuechange', '#kw', function(e, previous) {
    $('body').append('previous: ' + previous + '  --  current: ' + $(this).val() + '<br />')
});