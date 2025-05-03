(function($) {
    "use strict";
    // Header

    var menu = [];

    $(document).ready(function() {
        var $body = $("body");
        var $burgTrigger = $(".burg-trigger");
        var $burgMenu = $(".burg-menu");
        var $burgCurtain = $(".burg-curtain");

        $burgTrigger.click(() => {
            if ($body.hasClass("carrusel-open")) return;

            $burgTrigger.toggleClass("open");
            $body.toggleClass("burg-open");
            $burgMenu.toggleClass("open");
            $burgCurtain.toggleClass("open");

            if ($burgMenu.hasClass("open")) {
                window.smoothScroller.paused(true);
                gsap.to(".burg-curtain-item", {
                    top: "0%",
                    duration: 0.5,
                    stagger: 0.1,
                });
                gsap.to($burgMenu, {
                    top: "0%",
                    duration: 0.5,
                    delay: 0.5
                });
                gsap.to("#smooth-wrapper", {
                    marginTop: "100vh",
                    duration: 1,
                    delay: 0.1,
                    ease: "power1.in",
                    onComplete: () => {
                        gsap.to('.footer-header', {
                            opacity: 1,
                            duration: .5,
                        });
                    }
                });

            } else {
                window.smoothScroller.paused(false);
                gsap.to(".burg-curtain-item", {
                    top: "-100%",
                    duration: 0.5,
                    delay: 0.3,
                    stagger: 0.1,
                });
                gsap.to($burgMenu, {
                    top: "-100%",
                    duration: 1,
                    ease: "power1.inOut",
                });
                gsap.to("#smooth-wrapper", {
                    marginTop: "0vh",
                    duration: 1
                });

                gsap.to('.footer-header', {
                    opacity: 0,
                    duration: .2,
                });
            }
        });

        // $burgTrigger.click();

        var curtainNumber = !window.isMobile ? 7 : 3;
        for (let i = 0; i < curtainNumber; i++) {
            $burgCurtain.append($("<div></div>").addClass("burg-curtain-item"));
        }

        gsap.set(".burg-curtain-item", {
            top: "-100%"
        });

        // Burger Menu
        gsap.set(".burg-images-container > img", {
            opacity: 0,
            zIndex: 1,
            y: "0%",
            x: "0%",
            translate: "-50% -50%",
            width: "25.521vw",
            height: "30.99vw",
            filter: "blur(4px)",
        });

        $(".burg-images-container > img").each((i, e) => {
            var $image = $(e);
            var $menuItem = $(
                `.burg-menu-items .menu-item-${$image.data("id")}`
            );

            menu.push({
                image: $image,
                menuItem: $menuItem,
                index: i,
                active: i == 0 ? true : false,
            });

            $menuItem.on("mouseenter", () => {
                if ($burgMenu.hasClass("open")) {
                    $(".burg-menu-items .menu-item").removeClass("active");
                    changeImage(i);
                    $menuItem.addClass("active");
                }
            });
        });

        changeImage(0);
    });

    function changeImage(index) {
        var $active = active();

        var $next = next($active.index);
        var $current = menu[index];
        var $prev = prev($active.index);
        var duration = 0.8;

        menu.forEach((item, i) => {
            if (
                item.index != next($next.index).index &&
                item.index != prev($prev.index).index &&
                item.index != $current.index &&
                item.index != $next.index &&
                item.index != $prev.index
            ) {
                gsap.to(item.image[0], {
                    opacity: 0,
                    zIndex: 1,
                    duration: 0.2,
                });
            }
        });

        // Remove old
        gsap.to(next($next.index).image[0], {
            opacity: 0,
            zIndex: 1,
            y: "-100%",
            x: "-100%",
            duration: duration,
        });

        gsap.to(prev($prev.index).image[0], {
            opacity: 0,
            zIndex: 1,
            y: "100%",
            x: "100%",
            duration: duration,
        });

        gsap.to($active.image[0], {
            opacity: 1,
            zIndex: 3,
            y: "0%",
            x: "0%",
            filter: "blur(0px)",
            width: "25.521vw",
            height: "30.99vw",
            duration: duration,
        });

        gsap.to($next.image[0], {
            opacity: 1,
            zIndex: 2,
            y: "-30%",
            x: "-30%",
            filter: "blur(4px)",
            width: "22.813vw",
            height: "22.448vw",
            duration: duration,
        });

        gsap.to($prev.image[0], {
            opacity: 1,
            zIndex: 2,
            y: "50%",
            x: "50%",
            filter: "blur(4px)",
            width: "19.219vw",
            height: "17.5vw",
            duration: duration,
        });

        if ($current.active == false) {
            if ($active.index < $current.index) {
                $active.active = false;
                $next.active = true;
            } else {
                $active.active = false;
                $prev.active = true;
            }

            changeImage(index);
        }
    }

    function next(index) {
        if (index == menu.length - 1) {
            return menu[0];
        } else {
            return menu[index + 1];
        }
    }

    function prev(index) {
        if (index == 0) {
            return menu[menu.length - 1];
        } else {
            return menu[index - 1];
        }
    }

    function active() {
        var itemReturn = null;
        menu.forEach((item, i) => {
            if (item.active) itemReturn = item;
        });

        return itemReturn;
    }
})(jQuery);