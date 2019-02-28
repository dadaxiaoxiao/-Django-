$(document).ready(function () {
    var cookieop = new cookieOperate();
    var csrf = cookieop.getCookie('csrftoken');
    // 删除类目
    $('.fa-trash').click(function () {
        var pid = $(this).parents('tr').attr('pid');
        swal({
            title: "是否删除当前产品？",
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
                    pid: pid
                },
                dataType: 'json',
                url: "/admin/productm/prodelete/",
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
        var first = $('.f-sec-type').val();
        var second = $('.s-sec-type').val();
        var proname = $('input[name="proname"]').val();
        var prostatus = $('select[name="pro-status"]').val();
        var protag = $('select[name="pro-tag"]').val();
        var ishow = $('select[name="is-show"]').val();

        // 搜索参数
        first = first == "" ? "" : "first=" + first;
        second = second == "" ? "" : "second=" + second;
        proname = proname == "" ? "" : "proname=" + proname;
        prostatus = prostatus == "" ? "" : "prostatus=" + prostatus;
        protag = protag == "" ? "" : "protag=" + protag;
        ishow = ishow == "" ? "" : "indexshow=" + ishow;

        var fsearch = [];
        var search = [first, second, proname, prostatus, protag, ishow];
        for (var i=0; i<search.length; i++) {
            if (search[i]!="") {
                fsearch.push(search[i]);
            }
        }
        fsearch = "?" + fsearch.join("&");
        window.location = window.location.origin + window.location.pathname + fsearch;
    });
    // 修改按钮
    $('.fa-pencil').click(function () {
        var pid = $(this).parents('tr').attr('pid');
        window.location = '/admin/productm/modproduct?pid=' + pid
    });
});