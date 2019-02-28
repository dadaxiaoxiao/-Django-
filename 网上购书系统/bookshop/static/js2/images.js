$(document).ready(function () {

     $('#imgfile').change(function () {
           var data = new FormData($('#imglist')[0]);   //因为new FormData需要的是一个HtmlElement类型的数据，而jquery拿到的是HtmlElement集合
           $.ajax({
            type: 'POST',
             url: '/admin/imageupload/',
            // beforeSend: function (request) {
            //     request.setRequestHeader("X-CSRFToken", csrf);
            // },

            dataType: 'json',
            data: data,
            contentType: false,   // 告诉jQuery不要去处理发送的数据
            processData: false,   // 告诉jQuery不要去设置Content-Type请求头
             success: function (data) {
                window.location = window.location;   //刷新
            },
            error: function () {
            }
        });



     });


});