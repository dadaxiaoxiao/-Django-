 $(function () {
      $('#jiahao').mousedown(function () {
          var num = $('#shuliang').val();
            if($('#shuliang').val() < 1000)
            {
              	$('#shuliang').val(function () {
                return num * 1 + 1;
            	});
			}
			var num1 = parseInt($('#shuliang').val());
		    var num2 = parseFloat($('#danjia').html());
			$('#zongjia').html(function () {
			    return ((num1*100)*(num2*100)/10000).toFixed(2);
			});
        });

      $('#jianhao').mousedown(function () {
            var num = $('#shuliang').val();
            if($('#shuliang').val() > 1)
            {
              	$('#shuliang').val(function () {
                return num * 1 - 1;
            	});
			}
			var num1 = parseInt($('#shuliang').val());
		    var num2 = parseFloat($('#danjia').html());
			$('#zongjia').html(function () {
			    return ((num1*100)*(num2*100)/10000).toFixed(2);
			});

        });


      $('#shuliang').change(function(){
		    $('#shuliang').val(function () {
				return parseInt($('#shuliang').val());
            });
		     jieguo();
		    if($('#shuliang').val()<1){
			    $('#shuliang').val(1);
				jieguo();
			}
			else if($('#shuliang').val() > 882){
			    $('#shuliang').val(882);
			    jieguo();
			}

		});

       function jieguo() {
		    var num1 = parseInt($('#shuliang').val());
		    var num2 = parseFloat($('#danjia').html());
			$('#zongjia').html(function () {
			    return ((num1*100)*(num2*100)/10000).toFixed(2);
			});
        }







   });