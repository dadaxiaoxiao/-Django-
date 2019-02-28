$(document).ready(function () {
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    $('#imgfile').change(function () {
        var data = new FormData($('#imglist')[0]);
        var cookieop = new cookieOperate();
        var csrf = cookieop.getCookie('csrftoken');
        $.ajax({
            type: 'POST',
            url: '/admin_user/imageupload/',
            beforeSend: function (request) {
                request.setRequestHeader("X-CSRFToken", csrf);
            },
            dataType: 'json',
            data: data,
            contentType: false,
            processData: false,
            success: function (data) {
                window.location = window.location;
            },
            error: function () {
                console("失败")
            }
        });
    });



    // page
    $('.footable-page a').click(function () {
        window.location = window.location.origin + window.location.pathname + '?page=' + $(this).attr('data-page');
    });
    // prev
    $('a[data-page="prev"]').click(function () {
        var this_page = getQueryString('page');
        window.location = window.location.origin + window.location.pathname + '?page=' + (parseInt(this_page) - 1);
    });
    // first
    $('a[data-page="first"]').click(function () {
        window.location = window.location.origin + window.location.pathname + '?page=' + 1;
    });
    // next
    $('a[data-page="next"]').click(function () {
        var this_page = getQueryString('page');
        window.location = window.location.origin + window.location.pathname + '?page=' + (parseInt(this_page) + 1);
    });
    // last
    $('a[data-page="last"]').click(function () {
        window.location = window.location.origin + window.location.pathname + '?page=' + $(this).parents('.footable').attr('data-page-size');
    });
    //copy
    $("body")
      .on("copy", ".fa.fa-copy", function(e) {
        e.clipboardData.clearData();
        e.clipboardData.setData("text/plain", $(this).parents(".file-box").find('img').attr('src'));
        e.preventDefault();
        alert('复制成功');
      });
});