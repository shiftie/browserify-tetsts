$(document).ready(function() {

  if(!($('.content-view').hasClass('four-oh-four-page'))) {
    updateScrollStyle();

    $(window).scroll(updateScrollStyle);
    $(window).resize(updateScrollStyle);

    updateScroller();

    setInterval(updateScroller, 5000);
  }

  $('.goto').on("click", function(){
    goToByScroll($(this).data('goto'));
    return false;
  });

  $("#backToTop").on("click", function() {
    $('html,body').animate({
        scrollTop: 0
    }, 'fast');
  });

  $('form[id*="-form"]')
    .on('keyup', 'input.required', function(){
      if ($(this).attr('data-state') === 'active') {
        target = $(this);

        if (window.timer) {
          window.clearTimeout(timer);
        }

        window.timer = setTimeout(function() {
        validateField(target);
      }, 800);
      }
    })
    .on('blur', 'input.required', function(){
      if ($(this).attr('data-state') != 'active') {
        $(this).attr('data-state', 'active');
      }
      validateField($(this));
    });
});

function checkIfValid(formID) {
  var valid = false;
  $(formID + ' input.required').each(function() {
    $input = $(this);
    if ($input.val() !== '') {
      valid = true;
    }
    if($input.attr('type') === 'email' && !webutils.isValidEmail($input.val())) {
      valid = false;
    }
  });
  return valid;
}

function goToByScroll(id){
  var scrollPos = $("#"+id).offset().top - 200;
  $('html,body').animate({
      scrollTop: scrollPos
  }, 'slow');
}

function updateScrollStyle() {
  var narrow = window.innerWidth < 700
    , $contentHeader = $(".sticky-subnav").length > 0 ? $(".sticky-subnav") : $('.content-header'),
    itemOffsetTop = $contentHeader.offset().top;


  if(!narrow) {
    $contentHeader.find('section').removeClass('narrow');
    if($(window).scrollTop() <= itemOffsetTop) {
      $contentHeader.find('section').removeClass('scrolled').find('img');
      $contentHeader.find('.col-1000 ul.menu-main');
    } else {
      $contentHeader.find('section').addClass('scrolled').find('img');
      $contentHeader.find('.col-1000 ul.menu-main');
    }
  }
}

function updateScroller() {
  var containers = $('.content-header section .scroll_container');

  for (var i = 0; i < containers.length; i++) {
    if ($(containers[i]).position().top == 0) {
      $(containers[i]).css('top', -$($(containers[i]).children()[0]).outerHeight() );
    } else {
      $(containers[i]).css('top', 0);
    }
  }
}
