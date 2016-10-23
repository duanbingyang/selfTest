/**
 * Copyright (c) 2011 - 2015,social-touch Inc. All rights reserved.
 * @fileoverview social-touch  dialog整合插件
 * @author  weijialu | @social-touch.com
 * @version 1.0 | 2015-09-21
 * @param
 * @example
 */
define(function(require, exports, module) {

//    $.dialogFull = {
    var $dialogFull = {
        Pop: function(param) {
            var options = {
                    boxClass: '.DomPopClass',
                    title: '',//弹框标题
                    content: '',//弹框内容区
                    confirm: false,//是否显示“确定/取消”按钮，及只显示alert确定按钮
                    width: 600,
                    height: 300,
                    cover: true,//是否启用背景遮罩
                    coverHtml: false;//自定义遮罩层dom，必须是html闭合式标签！！！
                    coverClose: false,//其否启用点击遮罩关闭弹框
                    clear: true,//是否清楚之前弹框
                    cacheId: false, //开启必须使用唯一标示！！！
                    showCallback: function($thisBox){},
                    ajaxUrl: false,
                    ajaxType: 'get',
                    ajaxDataType: 'json',
                    jsonpCallback:'',
                    ajaxDate: '',//ajax参数
                    ajaxAccess: function(msg) {},
                    ajaxError: function(XMLHttpRequest, textStatus, errorThrown) {},
                    runDone: function($this, $thisBox, handClose) {},
                    runClose: function($this, $thisBox) {}
                },
                options = $.extend(options, param);
            //cache缓存隐藏dom start
            if (options.cacheId && $( '[cache = ' + options.cacheId + ']' ).length) {
                var dialogMainId = '#' + $( '[cache = ' + options.cacheId + ']' ).attr( 'id' ),
                    dialogCoverId = dialogMainId.replace( 'dialogMain', 'dialogCover' ),
                    dialogMainHeight = options.height == 'auto' ? $( dialogMainId ).height() : options.height;
                $(dialogCoverId).show();
                $(dialogMainId).css({
                    "height": 0,
                    "width": 0,
                    "marginTop": 0,
                    "marginLeft": 0
                }).show().animate({
                        "height": dialogMainHeight,
                        "width": options.width,
                        "marginTop": -dialogMainHeight / 2,
                        "marginLeft": -options.width / 2
                    },
                300);
                return;
            }
            //cache缓存隐藏dom end

            var main = '<div class="head"><a href="javascript:;" class="dialogFullClose">X</a></div><div class="content"></div>',
                confirm = '<div class="btn-confirm">\
                    <input type="button" value="确定" class="btn-Blue dialogFullDone">\
                    <input type="button" value="取消" class="btn-Grey dialogFullClose">\
                    </div>',
                time = (new Date()).getTime(),
                dialogMainId = '#dialogMain' + time,
                dialogCoverId = '#dialogCover' + time;

            if( options.confirm == 'alert' ){
                confirm = '<div class="btn-confirm">\
                    <input type="button" value="确定" class="btn-Blue dialogFullClose">\
                    </div>';
            }
            var $dom = $('<div />').addClass('dialogPopBox').attr( 'id', dialogMainId.substring(1) ).addClass(options.boxClass.substring(1));
            $dom.append(main).find('.head').append(options.title);
            $dom.width(options.width).height(options.height).find('.content').append(options.content);

            options.confirm ? $dom.append(confirm) : '';
//            options.cacheId ? $dom.attr( 'cache', options.cacheId ) : '';
            if( options.cacheId && !options.ajaxUrl ){
                $dom.attr( 'cache', options.cacheId );
            }
            options.clear ? $('.dialogPopBox, .bodyCover').remove() : '';

            if (options.cover) {
                if( options.coverHtml ){
                    var $coverDom = $( options.coverHtml ).addClass('bodyCover').attr('id', dialogCoverId.substring(1));
                }else{
                    var $coverDom = $( '<div />' ).addClass('bodyCover').attr('id', dialogCoverId.substring(1));
                }
                $('body').append($coverDom);
                $( dialogCoverId ).show();
            }

            $('body').append($dom);
            var dialogMainHeight = options.height == 'auto' ? $( dialogMainId ).height() : options.height;
            $( dialogMainId ).css({
                "height": 0,
                "width": 0,
                "marginTop": 0,
                "marginLeft": 0
            }).show().animate({
                    "height": dialogMainHeight,
                    "width": options.width,
                    "marginTop": -dialogMainHeight / 2,
                    "marginLeft": -options.width / 2
                },
            300);

            options.showCallback( $( dialogMainId ) );

            var dialogFullCloseDom = dialogMainId + ' .dialogFullClose',
                $contentBox = $(dialogMainId).find('.content');
            $(document).on('click', dialogFullCloseDom, function() {
                if (options.cacheId) {
                    $(dialogMainId).hide();
                    $(dialogCoverId).hide();
                } else {
                    $(dialogMainId).remove();
                    $(dialogCoverId).remove();
                    $(document).off( 'click', dialogFullCloseDom );
                }

                options.runClose( $( this ), $( dialogMainId ) );

            });

            //底部确定/取消按钮，点击时回调函数start
            if (options.confirm) {
                var dialogFullDoneDom = dialogMainId + ' .dialogFullDone';
                var handClose = function(delCache) {
                    $(dialogFullCloseDom).click();
                    if( delCache ){
                        $(dialogMainId).remove();
                        $(dialogCoverId).remove();
                        $(document).off( 'click', dialogFullDoneDom ).off( 'click', dialogFullCloseDom );                      
                    }
                };
                $(document).on('click', dialogFullDoneDom, function() {
                    options.runDone($(this), $( dialogMainId ), handClose);
                }).on('click', dialogFullCloseDom, function() {
                    options.runClose( $( this ), $( dialogMainId ) );
                    options.cacheId ? '' : $(document).off( 'click', dialogFullDoneDom ).off( 'click', dialogFullCloseDom );
                });
            }
            //底部确定/取消按钮，点击时回调函数end

            //点击遮罩关闭弹框 start
            if (options.coverClose) {
                $(document).on('click', dialogCoverId, function() {
                    $( dialogFullCloseDom ).click();
                });
            }
            //点击遮罩关闭弹框 end

            //ajax start
            if (options.ajaxUrl) {
                $.ajax({
                    type: options.ajaxType,
                    url: options.ajaxUrl,
                    dataType: options.ajaxDataType,
                    jsonpCallback: options.jsonpCallback,
                    data: options.ajaxDate,
                    success: function(msg) {
                        options.ajaxAccess(msg, $contentBox);
                        if (options.height == 'auto') {
                            setTimeout(function() {
                                $( dialogMainId ).css('height', 'auto').animate({
                                    'marginTop': -$( dialogMainId ).height() / 2
                                },200);
                            }, 300)
                        }
                        if( (options.cacheId && options.ajaxDataType == 'html') || (options.cacheId && msg.code == 0)  ){
                             $(dialogMainId).attr( 'cache', options.cacheId );
                        }
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        options.ajaxError(XMLHttpRequest, textStatus, errorThrown)
                    }
                });
            }
            //ajax end

        },
        Tips: function(param) {
            var options = {
                    box: '.DomTipsClass',
                    text: '消息提示',
                    status: true,
                    setTime: 5000
                },
                options = $.extend(options, param);
            var $dom = $('<div />').addClass( 'dialogTipsBox' ).addClass(options.box.substring(1)).html(options.text);
            $( '.dialogTipsBox' ).remove();
            $('body').append($dom);
            var $TipsMarginLeft = -$( '.dialogTipsBox' ).width() / 2;
            if (options.status) {
                $(options.box).css('marginLeft', $TipsMarginLeft).slideDown(200);
            } else {
                $(options.box).addClass('error').css('marginLeft', $TipsMarginLeft).slideDown(200);
            }
            if (options.setTime) {
                setTimeout(function() {
                    $( '.dialogTipsBox' ).slideUp(200, function() {
                        $( '.dialogTipsBox' ).remove();
                    })
                }, options.setTime);
            }
        },
        Alert: function(param) {
            var options = {
                title: '提示',
                content: '',
                width: 400,
                height: 'auto',
                clear: false,
                confirm: 'alert'
            };
            if (typeof param == 'string' || typeof param == 'number') {
                options.content = param;
            } else {
                options = $.extend(options, param);
            }
            this.Pop(options);
        }
    };
    //美化dialog end

    return $dialogFull;

});