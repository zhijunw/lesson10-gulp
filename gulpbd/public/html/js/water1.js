$(window).on("load", function() {
    var dataInt = { 'data': [{ 'src': '1.jpg' }, { 'src': '2.jpg' }, { 'src': '3.jpg' }, { 'src': '4.jpg' }, { 'src': '5.jpg' }, { 'src': '6.jpg' }, { 'src': '7.jpg' }, { 'src': '8.jpg' }] };
    window.onscroll = function() {
        if (checkscroll()) {
            $.each(dataInt.data, function(index, value) {
                var $oPin = $('<div>').addClass('pin').appendTo($("#main"));
                var $oBox = $('<div>').addClass('box').appendTo($oPin);
                $('<img>').attr('src', './images/' + $(value).attr('src')).appendTo($oBox);
            });
            waterfull();
        };
    }
    window.onresize = function() {
        waterfull();
    }
     waterfull();
})

function waterfull() {
    var $pin = $(".pin"); //找到盒子
    var pinW = $pin.eq(0).outerWidth(); //得到每个盒子的宽度
    var cols = Math.floor($(window).width() / pinW); //得到列数
    // console.log(cols);
    //由于这里css没设置宽度，所以在这里设置
    $("#main").width(pinW * cols).css("margin", "0 auto")
    var Harr = [] //这里是存储高度

    $pin.each(function(index, value) {
        //index是索引值，value是具体元素

        var pinH = $pin.eq(index).outerHeight(); //得到每个盒子的高度
        if (index < cols) {
            Harr[index] = pinH;
            // console.log(Harr)
             $(value).css({
                    "position": "absolute",
                    "top": 0,
                    "left": pinW *index + "px"
                })
        } else {
            //找到最小高度
            var minH = Math.min.apply(null, Harr);
            // console.log(minH)
            //找到最小高度的位置
            var minHindex = $.inArray(minH, Harr);
            // console.log(minHindex);
            //因为value是DOM对象，这里需要换成JQ对象
            $(value).css({
                    "position": "absolute",
                    "top": minH + "px",
                    "left": pinW * minHindex + "px"
                })
                //该变最小高度的高度
            Harr[minHindex] += $pin.eq(index).outerHeight();
        }
    })
}

function checkscroll() {
    var $pin = $(".pin");
    //得到最后一张图片距离顶部的高度
    var lastPinH = $pin.last().offset().top + Math.floor($pin.last().height() / 2);
    // console.log(lastPinH);
    //得到滚动的高度
    var scrollTop = $(window).scrollTop();
    var documentH = $(window).height();
    //如果大于则返回true，小于则返回false
    return (lastPinH < scrollTop + documentH) ? true : false; //到达指定高度后 返回true，触发waterfall()函数

}
