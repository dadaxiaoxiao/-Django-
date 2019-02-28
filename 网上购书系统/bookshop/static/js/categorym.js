$(document).ready(function () {
    var cookieop = new cookieOperate();
    var csrf = cookieop.getCookie('csrftoken');
    // 一级栏目弹窗
    $('#myModal .btn-primary').click(function () {
        $.ajax({
            cache: false,
            type: "post",
            data: {
                'fcategory': $('#f-sec-type-text').val()
            },
            dataType: 'json',
            url: "/admin/newfcategory/",
            beforeSend: function (request) {
                request.setRequestHeader("X-CSRFToken", csrf);
            },
            success: function (res) {
                if (res.recode) {
                    window.location = window.location;
                } else {
                    alert(res.remsg);
                }
            }
        });
    });
    // 二级栏目弹窗
    $('#myModal1 .btn-primary').click(function () {
        $.ajax({
            cache: false,
            type: "post",
            data: {
                'fcategory': $('#myModal1 .f-sec-type').val(),
                'scategory': $('#s-sec-type-text').val()
            },
            dataType: 'json',
            url: "/admin/newscategory/",
            beforeSend: function (request) {
                request.setRequestHeader("X-CSRFToken", csrf);
            },
            success: function (res) {
                if (res.recode) {
                    window.location = window.location;
                } else {
                    alert(res.remsg);
                }
            }
        });
    });
    // 删除类目
    $('.fa-trash').click(function () {
        var cid = $(this).parents('tr').attr('cid');
        swal({
            title: "是否删除当前类目？",
            text: "删除操作不可逆",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1ab394",
            confirmButtonText: "是的",
            cancelButtonText: '取消',
            closeOnConfirm: true
        }, function () {
            $.ajax({
                cache: false,
                type: "post",
                data: {
                    cid: cid
                },
                dataType: 'json',
                url: "/admin/categorydelete/",
                beforeSend: function (request) {
                    request.setRequestHeader("X-CSRFToken", csrf);
                },
                success: function (res) {
                    if (res.recode) {
                        window.location = window.location;
                    }
                }
            });
        });
    });
});