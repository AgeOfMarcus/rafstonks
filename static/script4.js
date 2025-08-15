
//showAnalytics();

document.addEventListener('swiped-right', function(e) {
    opensidebar();
});
document.addEventListener('swiped-left', function(e) {
    closesidebar();
});
function opensidebar() {
    $('.sidebar').css('transform', 'translateX(0%)');
    $('.sidebtn').prop("onclick", null).off("click");
    $('.sidebtn').on('click', (e) => {
        closesidebar();
    })
}
function closesidebar() {
    $('.sidebar').css('transform', 'translateX(-100%)');
    $('.sidebtn').prop("onclick", null).off("click");
    $('.sidebtn').on('click', (e) => {
        opensidebar();
    })
}



// chat
function message(txt) {
    $('.chat').text(`${$('.chat').text()}\n${txt}`);

    var elem = $('.chat');
    elem.scrollTop(elem.prop("scrollHeight"))
}



// https://stackoverflow.com/a/9964945/8291579
$.fn.enterKey = function (fnc) {
    return this.each(function () {
        $(this).keypress(function (ev) {
            var keycode = (ev.keyCode ? ev.keyCode : ev.which);
            if (keycode == '13') {
                fnc.call(this, ev);
            }
        })
    })
}






function cancelbtn() {
    $('.bet').css({'background-color': '#ff3c41', 'font-size': '18px'});
    $('.bet').text('cancel');
    $(".bet").prop("onclick", null).off("click");
    $('.bet').on('click', (e) => {
        cancelBet();
    })
}
function betbtn() {
    $('.bet').css({'background-color': '#3273a8', 'font-size': '24px'});
    $('.bet').text('bet');
    $(".bet").prop("onclick", null).off("click");
    $('.bet').on('click', (e) => {
        placeBet($('#amount').val());
    })
}
function cashoutbtn() {
    $('.bet').css({'background-color': '#329630', 'font-size': '16px'});
    $('.bet').text('cashout');
    $(".bet").prop("onclick", null).off("click");
    $('.bet').on('click', (e) => {
        cashoutBet();
    })
}
function wonbtn(amount) {
    $('.bet').css({'background-color': '#2c732a', 'font-size': '16px'});
    $('.bet').html('won:<br>$' + displayNumber(amount));
    $(".bet").prop("onclick", null).off("click");
}
function lostbtn(text) {
    $('.bet').css({'background-color': '#959695', 'font-size': '16px'});
    $('.bet').html('lost:<br>$' + displayNumber(text));
    $(".bet").prop("onclick", null).off("click");
}
function skippedbtn() {
    $('.bet').css({'background-color': '#959695', 'font-size': '16px'});
    $('.bet').text('skipped');
    $(".bet").prop("onclick", null).off("click");
}
function waitingbtn(txt='placing<br>bet...') {
    $('.bet').css({'background-color': '#8027c4', 'font-size': '16px'});
    $('.bet').html(txt);
    $(".bet").prop("onclick", null).off("click");
}




function error(txt, color='red') {
    $('.error').text(txt);
    $('.error').addClass('animate');
    $('.error').css('color', color);
    setTimeout(() => {
        $('.error').removeClass('animate');
    }, 2500)
}

function changebet(plus=true) {
    var tmp = parseFloat($('#amount').val());
    var newbet;
    if (plus) {
        newbet = tmp + parseFloat(tmp/4);
    }
    else {
        newbet = tmp - parseFloat(tmp/4);
    }
    newbet = parseInt(newbet*100)/100;
    $('#amount').val(newbet);
}


//- Explosion
//- adapted from "Anchor Click Canvas Animation" by Nick Sheffield
//- https://codepen.io/nicksheffield/pen/NNEoLg/


// explosion construction
function explode(x, y) {
  var particles = 15
    // explosion container and its reference to be able to delete it on animation end
    explosion = $('<div class="explosion"></div>');

  // put the explosion container into the body to be able to get it's size
  $('body').append(explosion);

  // position the container to be centered on click
  explosion.css('left', x - explosion.width() / 2);
  explosion.css('top', y - explosion.height() / 2);

  for (var i = 0; i < particles; i++) {
    // positioning x,y of the particle on the circle (little randomized radius)
    var x = (explosion.width() / 2) + rand(80, 150) * Math.cos(2 * Math.PI * i / rand(particles - 10, particles + 10)),
      y = (explosion.height() / 2) + rand(80, 150) * Math.sin(2 * Math.PI * i / rand(particles - 10, particles + 10)),
      color = rand(0, 255) + ', ' + rand(0, 255) + ', ' + rand(0, 255), // randomize the color rgb
        // particle element creation (could be anything other than div)
      elm = $('<div class="particle" style="' +
        'background-color: rgb(' + color + ') ;' +
        'top: ' + y + 'px; ' +
        'left: ' + x + 'px"></div>');

    if (i == 0) { // no need to add the listener on all generated elements
      // css3 animation end detection
      elm.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
        explosion.remove(); // remove this explosion container when animation ended
      });
    }
    explosion.append(elm);
  }
}

// get random number between min and max value
function rand(min, max) {
  return Math.floor(Math.random() * (max + 1)) + min;
}

function explodeRocket() {
    var el = $('.cont')[0].getBoundingClientRect()
    explode(el.left + 25, el.top + 25);
    $('.cont').css('visibility', 'hidden');
    $('.rain').css('visibility', 'hidden');
}
    


(function(window, $) {

  $(function() {

    $('.ripple').on('click', function(event) {
      event.preventDefault();
      var $btn = $(this),
        $div = $('<div/>'),
        btnOffset = $btn.offset(),
        xPos = event.pageX - btnOffset.left,
        yPos = event.pageY - btnOffset.top;

      $div.addClass('ripple-effect');
      $div
        .css({
          height: $btn.height(),
          width: $btn.height(),
          top: yPos - ($div.height() / 2),
          left: xPos - ($div.width() / 2),
          background: $btn.data("ripple-color") || "#fff"
        });
      $btn.append($div);

      window.setTimeout(function() {
        $div.remove();
      }, 2000);
    });

  });

})(window, jQuery);
