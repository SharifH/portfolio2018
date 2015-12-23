(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $(".dropdown-button").dropdown();
    $('.slider').slider({
        full_width: true,
        //height: 1200
    });



    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - 200
          }, 2000);
          return false;
        }
      }
    });


    $('body').progressTracker({

// Allows for navigating between content sections
      linking: true,

// "constant" = always visiable
// "hover" = shows on mouse hover
      tooltip: "hover",

// The number specified is added to the default value at which the tracker changes to the next section.
      positiveTolerance: 0,

// The number specified is subtracted from the default value at which the tracker changes to the next section.
      negativeTolerance: 0,

// Only displays the progress tracker when the user is between the top of the first section and the bottom of the last;
// It is only shown when the tracker sections are in view.
// Specify false if you want the tracker to always show.
      displayWhenActive: false,

// Specify the value (in pixels) that you wish the progress tracker to be hidden when it is below that.
      disableBelow: 0,

// Specifies what the plugin takes into account when deciding when to switch to the next section.
// "tracker" or "viewport"
      tracking: "viewport"

    });



      /* Preloader */

      setTimeout(function(){
          jQuery('body').addClass('loaded');
          jQuery('h1').css('color','#222222');
      }, 3000);




  }); // end of document ready
})(jQuery); // end of jQuery name space



// Youtube embed

(function() {
  var v = document.getElementsByClassName("youtube-player");
  for (var n = 0; n < v.length; n++) {
    var p = document.createElement("div");
    p.innerHTML = labnolThumb(v[n].dataset.id);
    p.onclick = labnolIframe;
    v[n].appendChild(p);
  }
})();

function labnolThumb(id) {
  return '<img class="youtube-thumb" src="https://img.youtube.com/vi/' + id + '/maxresdefault.jpg"><div class="play-button"></div>';
}

function labnolIframe() {
  var iframe = document.createElement("iframe");
  iframe.setAttribute("src", "https://www.youtube.com/embed/" + this.parentNode.dataset.id + "?autoplay=1&autohide=2&border=0&wmode=opaque&enablejsapi=1&controls=0&showinfo=0");
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("id", "youtube-iframe");
  this.parentNode.replaceChild(iframe, this);
}

