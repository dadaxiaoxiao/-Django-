$(document).ready(function () {

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

            }
        });
    });

});