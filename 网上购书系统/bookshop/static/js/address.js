$(document).ready(function () {
    var $distpicker = $('#distpicker');
    $.ajax({
        url: '/user/getaddress/',
        success: function (res) {
            $distpicker.distpicker({
                province: res.data.address.province,
                city: res.data.address.city,
                district: res.data.address.district
            });
        }
    });
$('#address_btn').click(function () {

        var phone = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/g
        if ($('#getname').val() === "") {
            alert('收件人不能为空！');
        } else if (!phone.test($('#getphone').val())) {
            alert('手机号码格式不正确！');
        } else if ($('#getcode').val().toString().length!=6) {
            alert('邮政编码格式不正确！');
        } else if ($('#adddetail').val() == "") {
            alert('详细地址不能为空！');
        }else {
             $('#reFrom').submit();
    }
    });
   $('#a_adress')[0].style.color="red";








});
