(function() {
  var scrolling = false,
      curPage = 1,
      pages = document.querySelectorAll(".img-cont").length / 2,
      $left = document.querySelectorAll(".img-cont.left"),
      $right = document.querySelectorAll(".img-cont.right");
      $allmain = document.querySelectorAll(".main"),
  $mainleft = document.querySelectorAll(".main.left"),
     allPages = document.querySelectorAll(".img-cont").length,
     mobPage = 1,
      $mainright = document.querySelectorAll(".main.right");
    var isMobileDevice = false;
    if(window.innerWidth <=1025) {
      isMobileDevice = true;
    }

  function doMargins(paramPage) {
      scrolling = true;
      var _page = paramPage || curPage;
      if(!isMobileDevice) {
        $left.forEach(function(el) {
            var marginMult = parseInt(el.getAttribute("data-helper"), 10) + _page - 1;
            el.setAttribute("style", "margin-top: " + marginMult * 100 + "vh");
        });

        $right.forEach(function(el) {
            var marginMult = parseInt(el.getAttribute("data-helper"), 10) - _page + 1;
            el.setAttribute("style", "margin-top: " + marginMult * 100 + "vh");
        });
      }
      setTimeout(function() {
          scrolling = false;
      }, 1000);
  }

  function navigateUp() {
      if (!isMobileDevice && (curPage > 1)) {
          curPage--;
          pagination(curPage);
          doMargins();
      }
      else if(isMobileDevice && (mobPage > 1)) {
          mobPage--;
          pagination(mobPage);
          doMargins();
      }
  }

  function navigateDown() {
      if (!isMobileDevice && (curPage < pages)) {
          curPage++;
          pagination(curPage);
          doMargins();
      }
      else if(isMobileDevice && (mobPage < allPages)) {
          mobPage++;
          pagination(mobPage);
          doMargins();
      }
  }

  /*********Page change method****************** */
  function pagination(page) {
      var str ='';
      var $allSec = document.querySelectorAll('[data-sec]');
      let i = 0;
      var $allmain = document.querySelectorAll('[data-main]');
      var $allTtl = document.querySelectorAll('[data-page]');
      var $allmain = document.querySelectorAll('[data-main]');
      $allTtl.forEach(function(el) {
          el.classList.remove("animate");
          el.classList.remove("cnt-animate");
          el.classList.remove("mob-img-animate");
          el.classList.remove("mob-cnt-animate");
      });
      $allmain.forEach(function(el) {
        el.classList.remove("animate");
        el.classList.remove("mob-animate");
        el.classList.remove("mob-bg");
    });
      if(isMobileDevice) {
          if(mobPage ==  1) {
            str ='.one';
          } else if(mobPage ==  2) {
            str ='.two';
          } else if(mobPage ==  3) {
            str ='.three';
          } else if(mobPage ==  4) {
            str ='.four';
          }
          document.querySelector(str).classList.add("mob-animate");
      }

      $allSec.forEach(function(el) {
        if (i <= 1) {
          if (page == 1) {
              el.setAttribute("data-sec", "1");
          } else if (page == 2) {
              el.setAttribute("data-sec", "2");
          }
          el.classList.add("animate");
          if(isMobileDevice && i==0) {
            el.setAttribute("data-sec", mobPage);
            el.classList.add("mob-bg");
          }
        } else {
            return false;
        }
          i++;
      });
      var $allCnt = document.querySelectorAll('.cnt');
      setTimeout(function() {
          var $reqTtl = document.querySelectorAll("[data-page='" + page + "']");
          $reqTtl.forEach(function(el) {
              el.classList.add("animate");
          });
          $allSec.forEach(function(el) {
              el.classList.remove("animate");
              el.classList.remove("cnt-animate");
              el.classList.remove("mob-cnt-animate");
          });
      }, 1000);
      setTimeout(function() {
          $allCnt.forEach(function(el) {
              if (el.getAttribute("data-page") == page) {
                  el.classList.add("cnt-animate");
              }
              if(isMobileDevice) {
                $allmain.forEach(function(el) {
                  el.classList.remove("mob-bg");
                });
                var $allPages = document.querySelectorAll(".img-cont");
                $allPages.forEach(function(el) {
                  el.classList.remove("animate");
                  el.classList.remove("mob-img-animate");
                });
              }
          });
         
      }, 2000);
      if(isMobileDevice) {
        setTimeout(function() {
            var tmp ='';
            if(str ==  '.one') {
              tmp ='.cont-1';
            } else if(str ==  '.two') {
              tmp ='.cont-2';
            } else if(str ==  '.three') {
              tmp ='.cont-3';
            } else if(str ==  '.four'){
              tmp ='.cont-4';
            }
            document.querySelector(tmp).classList.add("mob-img-animate");
        }, 3000);
        setTimeout(function() {
          $allCnt.forEach(function(el) {
            el.classList.add("mob-cnt-animate");
          });
        }, 4000);
      }
      curPage = page;
  }

  /*********Page link event****************** */
  var elements = document.getElementsByClassName("page-lnk");
  Array.from(elements).forEach(function(el) {
      el.addEventListener('click', linkClick);
  });

  /*********Page link click event call****************** */
  function linkClick(el) {
      let selPage = el.target.getAttribute("data-page");
      if (selPage != curPage) {
          if (selPage == 1) {
              navigateUp();
          } else {
              navigateDown();
          }
      }
  }

  /*********Method to init page move****************** */
  function initScrolling(e) {
      if (!scrolling) {
          let direction = detectMouseWheelDirection();
          e = e || window.event;
         // if (e.wheelDelta > 0 || e.detail < 0) {
          if (direction=='up' || e.keyCode == '38') {
            navigateUp();
          }
          else if (direction=='down' || e.keyCode == '40') {
            navigateDown();
          }
      }
  }

  /*********Method to detect Mouse wheel direction****************** */
  function detectMouseWheelDirection(e) {
      var delta = null,
          direction = false;
      if (!e) {
          e = window.event;
      }
      if (e.wheelDelta) {
          delta = e.wheelDelta / 60;
      } else if (e.detail) {
          delta = -e.detail / 2;
      }
      if (delta !== null) {
          direction = delta > 0 ? 'up' : 'down';
      }

      return direction;
  }

  document.addEventListener('wheel', initScrolling);
  document.addEventListener('mousewheel', initScrolling);
  document.addEventListener('DOMMouseScroll', initScrolling);
  document.onkeydown = initScrolling;

  var isMobView = false;
  var isWebView = false;
  window.onresize = function(event) {
    if(window.innerWidth <=1025 && !isMobView) {
      isMobView = true;
      isMobileDevice = true;
      isWebView = false;
    }
    if(window.innerWidth > 1025 && !isWebView) {
      isWebView = true;
      isMobileDevice = false;
      isMobView = false;
    }
  };

  window.onresize = function(event) {
    if(window.innerWidth <=1025) {
      isMobileDevice = true;
    } else {
      isMobileDevice = false;
    }
    pagination(1);
  };

  /*********Animation on Page Load****************** */
  setTimeout(function() {
    pagination(1);
  }, 1000);

})();