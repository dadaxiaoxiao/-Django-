$(document).ready(function () {
    var cookieop = new cookieOperate();
    var csrf = cookieop.getCookie('csrftoken');
    // 修改为发货
    $('.send-btn').click(function () {
        var oid = $(this).parents('tr').attr('oid');
        swal({
            title: "是否修改当前订单状态？",
            text: "是否修改当前订单状态",
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
                    oid: oid,
                    status: '已发货'
                },
                dataType: 'json',
                url: "/admin/modorderstatus/",
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
    // 修改为取消
    $('.cancel-btn').click(function () {
        var oid = $(this).parents('tr').attr('oid');
        swal({
            title: "是否修改当前订单状态？",
            text: "是否修改当前订单状态",
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
                    oid: oid,
                    status: '已取消'
                },
                dataType: 'json',
                url: "/admin/modorderstatus/",
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
    // 搜索按钮
    $('.prosrc').click(function () {
        // 获取搜索内容
        var ordernum = $('input[name="ordername"]').val();
        var username = $('input[name="username"]').val();
        var orderstatus = $('select[name="orderstatus"]').val();

        // 搜索参数
        ordernum = ordernum == "" ? "" : "ordernum=" + ordernum;
        username = username == "" ? "" : "username=" + username;
        orderstatus = orderstatus == "" ? "" : "orderstatus=" + orderstatus;

        var fsearch = [];
        var search = [ordernum, username, orderstatus];
        for (var i=0; i<search.length; i++) {
            if (search[i]!="") {
                fsearch.push(search[i]);
            }
        }
        fsearch = "?" + fsearch.join("&");
        window.location = window.location.origin + window.location.pathname + fsearch;
    });
});