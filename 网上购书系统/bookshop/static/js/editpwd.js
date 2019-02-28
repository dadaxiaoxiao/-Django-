$(function () {
    var oldpassword=false;
    var newpassword=false;
    var newpassword2=false;


    $('#oldpassword').blur(function() {  /*失去焦点执行*/
        check_oldpassword();
    });
    $('#newpassword').blur(function() {  /*失去焦点执行*/
       check_newpassword();
    });
    $('#newpassword2').blur(function() {  /*失去焦点执行*/
       check_newpassword2();
    });
    $('#oldpassword').focus(function() {  /*失去焦点执行*/
        $('#oldpassword_tips').hide();
    });
    $('#newpassword').focus(function() {  /*失去焦点执行*/
        $('#newpassword_tips').hide();
    });
    $('#newpassword2').focus(function() {  /*失去焦点执行*/
        $('#newpassword2_tips').hide();
    });




    function check_oldpassword() {
        var len = $('#oldpassword').val().length;
        if(len==0){
            $('#oldpassword_tips').html('旧密码不能为空!').show();
            oldpassword = true;
        }
        else
        {
            $('#oldpassword_tips').hide();
            oldpassword= false;
        }
    }
    function check_newpassword() {
        var len = $('#newpassword').val().length;
        if(len<8||len>20){
            $('#newpassword_tips').html('密码最少8位，最长20位!').show();
            newpassword = true;
        }
        else
        {
            $('#newpassword_tips').hide();
            newpassword= false;
        }
    }

    function check_newpassword2() {

        var pass = $('#newpassword').val();
        var cpass = $('#newpassword2').val();

        if (pass != cpass) {
            $('#newpassword2_tips').html('密码两次不一样!').show();
            newpassword2= false;
        }
        else {
            $('#newpassword2_tips').hide();
            newpassword2= false;

        }
    }

     $('#address_btn').click(function () {
           check_oldpassword();
           check_newpassword()
           check_newpassword2()


          if(oldpassword == false && newpassword == false && newpassword2 == false)
          {
             $('#reFrom').submit();
              console.log('提交成功');
              return true;
          }
          else
          {
             console.log('输入有误');
             return false;
          }
      })

     $('#a_eidpwd')[0].style.color="red";




});
