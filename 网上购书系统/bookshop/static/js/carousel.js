$(document).ready(function () {
    // 删除轮播图
    var cookieop = new cookieOperate();
    var csrf = cookieop.getCookie('csrftoken');
    $('.fa-trash').click(function () {
        var cid = $(this).parents('tr').attr('cid');
        swal({
            title: "是否删除当前轮播图？",
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
                url: "/admin/carouseldelete/",
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
    // 向上交换轮播图
    $('.fa-level-up').click(function () {
        var self = $(this);
        if($(this).parents('tr').prev().length!==0) {
            var thiscid = $(this).parents('tr').attr('cid');
            var tocid = $(this).parents('tr').prev().attr('cid');
            $.ajax({
                cache: false,
                type: "post",
                data: {
                    sid: thiscid,
                    tid: tocid
                },
                dataType: 'json',
                url: "/admin/carouselchange/",
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
    // 向下交换轮播图
    $('.fa-level-down').click(function () {
        var self = $(this);
        if($(this).parents('tr').next().length!==0) {
            var thiscid = $(this).parents('tr').attr('cid');
            var tocid = $(this).parents('tr').next().attr('cid');
            $.ajax({
                cache: false,
                type: "post",
                data: {
                    sid: thiscid,
                    tid: tocid
                },
                dataType: 'json',
                url: "/admin/carouselchange/",
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