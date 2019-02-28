$(document).ready(function () {

    var cookieop = new cookieOperate();
    var csrf = cookieop.getCookie('csrftoken');
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    $('.standard-tag .close-icon').unbind().click(function () {
        $(this).parent().remove();
        $('.standard').val('');
    });

    $('.image-list-wrp .close-icon').unbind().click(function () {
        $(this).parent().remove();
        $('input[name="imglink"]').val('');
    });
    // 添加图片
    $('.new-imgurl').click(function () {
        var imgurl = $('input[name="imglink"]').val();
        if ($('.image-list-wrp .new-img-preview').length > 3) {
            alert('不允许添加超过4张产品图片');
        } else if (imgurl == "") {
            alert('图片链接不允许为空');
        } else {
            $('input[name="imglink"]').val('');
            $('.image-list-wrp').append('<span class="new-img-preview"><img src="' + imgurl + '"/><i class="close-icon">×</i></span>');
            $('.image-list-wrp .close-icon').unbind().click(function () {
                $(this).parent().remove();
                $('input[name="imglink"]').val('');
            });
        }
    });
    // 修改产品
    $('.new-pro').click(function () {
        var p_id = getQueryString('p_id'); //获取URL中参数值
        swal({
            title: '是否修改产品?',
            text: "是否修改产品",
            type: "info",
            showCancelButton: true,
            confirmButtonColor: "#1ab394",
            confirmButtonText: "是的",
            cancelButtonText: '取消',
            closeOnConfirm: true
        }, function () {
            var standard = [];
            var imglink = [];
            $('.standard-tag .btn-primary').each(function (i, e) {
                standard.push($(e).text().replace('×', ''));
            });
            standard = standard.join('|');
            for (var i = 0; i < $('.new-img-preview img').length; i++) {
                imglink.push($('.new-img-preview img').eq(i).attr('src').replace(/#/g, ''));
            }
            $.ajax({
                cache: false,
                type: "post",
                data: {
                    first: $('.f-sec-type').val(),

                    proname: $('input[name="proname"]').val(),
                    proprice: $('input[name="proprice"]').val(),
                    discount: $('input[name="discount"]').val(),
                    imglink: imglink,
                    pdInfo:$('input[name="pdInfo"]').val(),
                },
                dataType: 'json',
                url: "/admin/modproductdata/?p_id=" + p_id,
                beforeSend: function (request) {
                    request.setRequestHeader("X-CSRFToken", csrf);
                },
                success: function (res) {
                    if (res.recode) {
                        window.location = window.location;    // 返回当前页面
                    } else {
                        alert(res.remsg)
                    }
                }
            });
        });
    });

});