$(function () {
      var name_error=false;
      var pwd_error=false;

    $('#txtUsername').blur(function() {  /*失去焦点执行*/
		check_user_name();
	});

	$('#txtPassword').blur(function() {
		check_password();
	});
    function check_user_name() {

        if($('#txtUsername').val().length == 0) {
            $('#login_username').html('用户名不能为空').show();
             name_error=true;
        }else {
              $('#login_username').hide();
              name_error=false;
          }
    }
     function check_password() {
         if ($('#txtPassword').val().length == 0) {
             $('#login_password_error').html('密码不能为空').show();
             pwd_error = true;
         } else {
             $('#login_username').hide();
             pwd_error = false;
         }
     }

     $('#submintLoginBtn').click(function () {
            check_user_name();
            check_password();


          if(name_error == false && pwd_error == false)
          {
             $('#login_form').submit();
              console.log('提交成功');
              return true;
          }
          else
          {
             console.log('输入有误');
             return false;
          }
      })



});
