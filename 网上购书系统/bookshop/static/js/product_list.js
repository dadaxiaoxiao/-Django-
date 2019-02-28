$(document).ready(function () {
  var imgll= $("#img")[0].src.split("##")[0];
  $("#img").attr('src',imgll);
});