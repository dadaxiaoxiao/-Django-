
$(document).ready(function () {


    var cookieop = new cookieOperate();
    var csrf = cookieop.getCookie('csrftoken');

    // 添加栏目
    $('.new-ishow').unbind().click(function () {
        $.ajax({
            cache: false,
            type: "post",
            data: $('#ishow-form').serialize(),
            dataType: 'json',
            url: "/admin/newblock/",
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
    // 删除模块
    $('.fa-trash').click(function () {
        var bid = $(this).parents('tr').attr('bid');
        swal({
            title: "是否删除当前首页模块？",
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
                    bid: bid
                },
                dataType: 'json',
                url: "/admin/blockdelete/",
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
    // 向上交换模块
    $('.fa-level-up').click(function () {
        var self = $(this);
        if($(this).parents('tr').prev().length!==0) {
            var thiscid = $(this).parents('tr').attr('bid');
            var tocid = $(this).parents('tr').prev().attr('bid');
            $.ajax({
                cache: false,
                type: "post",
                data: {
                    sid: thiscid,
                    tid: tocid
                },
                dataType: 'json',
                url: "/admin/blockchange/",
                beforeSend: function (request) {
                    request.setRequestHeader("X-CSRFToken", csrf);
                },
                success: function (res) {
                    console.log(res);
                    if (res.recode) {
                        var temalt = self.parents('tr').find('td').eq(1).text();
                        var temurl = self.parents('tr').find('td').eq(2).text();
                        var prourl = self.parents('tr').find('td').eq(3).text();
                        console.log(temalt, temurl, prourl);
                        self.parents('tr').find('td').eq(1).text(self.parents('tr').prev().find('td').eq(1).text());
                        self.parents('tr').find('td').eq(2).find('a').text(self.parents('tr').prev().find('td').eq(2).find('a').text()).attr('href', self.parents('tr').prev().find('td').eq(2).find('a').text());
                        self.parents('tr').find('td').eq(3).find('a').text(self.parents('tr').prev().find('td').eq(3).find('a').text()).attr('href', self.parents('tr').prev().find('td').eq(3).find('a').text());
                        self.parents('tr').prev().find('td').eq(1).text(temalt);
                        self.parents('tr').prev().find('td').eq(2).find('a').text(temurl).attr('href', temurl);
                        self.parents('tr').prev().find('td').eq(3).find('a').text(prourl).attr('href', prourl);
                    }
                }
            });
        } else {
            alert('已经到顶了');
        }
    });
    // 向下交换模块
    $('.fa-level-down').click(function () {
        var self = $(this);
        if($(this).parents('tr').next().length!==0) {
            var thiscid = $(this).parents('tr').attr('bid');
            var tocid = $(this).parents('tr').next().attr('bid');
            $.ajax({
                cache: false,
                type: "post",
                data: {
                    sid: thiscid,
                    tid: tocid
                },
                dataType: 'json',
                url: "/admin/blockchange/",
                beforeSend: function (request) {
                    request.setRequestHeader("X-CSRFToken", csrf);
                },
                success: function (res) {
                    if (res.recode) {
                        var temalt = self.parents('tr').find('td').eq(1).text();
                        var temurl = self.parents('tr').find('td').eq(2).text();
                        var prourl = self.parents('tr').find('td').eq(3).text();
                        self.parents('tr').find('td').eq(1).text(self.parents('tr').next().find('td').eq(1).text());
                        self.parents('tr').find('td').eq(2).find('a').text(self.parents('tr').next().find('td').eq(2).find('a').text()).attr('href', self.parents('tr').next().find('td').eq(2).find('a').text());
                        self.parents('tr').find('td').eq(3).find('a').text(self.parents('tr').next().find('td').eq(3).find('a').text()).attr('href', self.parents('tr').next().find('td').eq(3).find('a').text());
                        self.parents('tr').next().find('td').eq(1).text(temalt);
                        self.parents('tr').next().find('td').eq(2).find('a').text(temurl).attr('href', temurl);
                        self.parents('tr').next().find('td').eq(3).find('a').text(prourl).attr('href', prourl);
                    }
                }
            });
        } else {
            alert('已经到底了');
        }
    });
});