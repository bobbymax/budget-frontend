import $ from 'jquery'

$(function(){

    // The code below is for demo purposes only.
    // For you to not be confused, please refer to
    // Off-Canvas starter template in Collections

    $('.off-canvas-menu').on('click', function(e){
      e.preventDefault();
      var target = $(this).attr('href');
      $(target).addClass('show');
    });


    $('.off-canvas .close').on('click', function(e){
      e.preventDefault();
      $(this).closest('.off-canvas').removeClass('show');
    })

    $(document).on('click touchstart', function(e){
      e.stopPropagation();

      // closing of sidebar menu when clicking outside of it
      if(!$(e.target).closest('.off-canvas-menu').length) {
        var offCanvas = $(e.target).closest('.off-canvas').length;
        if(!offCanvas) {
          $('.off-canvas.show').removeClass('show');
        }
      }
    });

  })