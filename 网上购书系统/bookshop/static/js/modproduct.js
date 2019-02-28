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
    // 添加型号
    $('.addstandard').click(function () {
        var standardval = $('.standard').val();
        var reg = new RegExp(standardval, 'g');
        if (standardval == "") {
            alert('型号不能为空');
        }
        else if (reg.test($('.standard-tag').text())) {
            alert('已有此型号');
        } else {
            $('.standard').val('');
            $('.standard-tag').append('<span class="btn btn-primary">' + standardval + '<i class="close-icon">×</i></span>');
            $('.standard-tag .close-icon').unbind().click(function () {
                $(this).parent().remove();
                $('.standard').val('');
            });
        }
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
        var pid = getQueryString('pid');
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
                    second: $('.s-sec-type').val(),
                    proname: $('input[name="proname"]').val(),
                    proprice: $('input[name="proprice"]').val(),
                    discount: $('input[name="discount"]').val(),
                    imglink: imglink,
                    standard: standard,
                    traffic: $('input[name="traffic"]').val(),
                    introinfo: $('.note-editable').html(),
                    isshow: $('.is-show').val(),
                    protag: $('.protag').val(),
                    prostatus: $('.prostatus').val()
                },
                dataType: 'json',
                url: "/admin/productm/modproductdata/?pid=" + pid,
                beforeSend: function (request) {
                    request.setRequestHeader("X-CSRFToken", csrf);
                },
                success: function (res) {
                    if (res.recode) {
                        window.location = window.location;
                    } else {
                        alert(res.remsg)
                    }
                }
            });
        });
    });

});