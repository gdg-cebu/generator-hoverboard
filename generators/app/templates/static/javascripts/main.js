// Site Header Behavior
(function() {
  // navbar toggle behavior on mobile
  var navbar = $('.nav');
  var toggle = $('#nav-toggle');

  window.addEventListener('hashchange', function() {
    closeNavbar();
    setTimeout(showHeader, 25);
  });

  navbar.addEventListener('click', function(e) {
    var pattern = new RegExp(window.location.hash + '$');
    if (pattern.test(e.target.href)) {
      closeNavbar();
    }
  });

  function closeNavbar() {
    toggle.checked = false;
  }


  // auto-hiding navbar behavior
  var header = $('#site-header');
  var headerTop = 0;
  var headerHeight = header.getBoundingClientRect().height;
  var previous = (document.scrollingElement || document.body).scrollTop;

  if (isMobile()) {
    window.addEventListener('scroll', function(e) {
      var top = (document.scrollingElement || document.body).scrollTop;
      var direction = previous < top ? 'down' : 'up';
      var difference = top - previous;

      if (direction === 'down' && !toggle.checked) {
        headerTop = Math.max(headerTop - difference, -headerHeight);
      } else if (direction === 'up') {
        headerTop = Math.min(headerTop - difference, 0);
      }

      header.style.top = headerTop + 'px';
      previous = top;
    });

    window.addEventListener('resize', function() {
      headerHeight = header.getBoundingClientRect().height;
    });

    header.addEventListener('click', showHeader);
  }

  function showHeader() {
    headerTop = 0;
    header.style.transition = 'top 100ms ease';
    header.style.top = headerTop + 'px';
    setTimeout(function() {
      header.style.transition = '';
    }, 100);
  }

  function isMobile() {
    try {
      document.createEvent('TouchEvent');
      return true;
    } catch (e) {
      return false;
    }
  }
})();


// Speaker Section Carousel
(function() {
  var carousel = $('.carousel');
  if (!carousel) {
    return;
  }
  carousel.classList.add('carousel-active');

  var prevButton = $('.carousel-button.prev');
  var nextButton = $('.carousel-button.next');

  var speakers = Array.prototype.slice.call($$('.speaker'));

  var itemsPerSlide = 1;
  var index = 0;
  var maxIndex = speakers.length - 1;
  var margin = 0;
  updateValues();


  prevButton.addEventListener('click', function() {
    if (index <= 0) return;
    index--;
    updateCarousel();
  });

  nextButton.addEventListener('click', function() {
    if (index >= maxIndex) return;
    index++;
    updateCarousel();
  });

  window.addEventListener('resize', function() {
    updateValues();
    updateCarousel();
  });


  function updateCarousel() {
    speakers.forEach(function(speaker) {
      var translate = 'calc((' + ((index * 100) + '%') + ' + ' + ((index * 2 * margin) + 'rem') + ') * -1)';
      speaker.style.transform = 'translateX(' + translate + ')';
    });
  }


  function updateValues() {
    var width = window.innerWidth;
    if (width >= 800) {
      itemsPerSlide = 3;
      margin = 2;
    } else if (width >= 500) {
      itemsPerSlide = 2;
      margin = 1;
    } else {
      itemsPerSlide = 1;
      margin = 0;
    }
    maxIndex = speakers.length - itemsPerSlide;
    index = Math.min(index, maxIndex);
  }
})();


function $(selector, context) {
  return (context || document).querySelector(selector);
}


function $$(selector, context) {
  return (context || document).querySelectorAll(selector);
}
