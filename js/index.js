$(document).ready(function() {
  $('button').click(function() {
    $('#center-div').fadeOut();
    $('button').fadeOut();
    $('#blur').fadeOut();
    speedUp();
    setTimeout(function() {
      window.location.href = 'homepage.html';
    },1500);
  });
});

function speedUp() {
  trigger = 1;
  console.log(trigger);
}
