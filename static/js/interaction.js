$(document).ready(() => {
    $('#sidebarCollapse').on('click', () => {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });
});

let btn = $('#back-to-top');

$(window).scroll(() => {if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', (e) => {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});