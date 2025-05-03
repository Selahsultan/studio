(function($) {
    'use strict';
    // Theme

    $(document).ready(function() {

        window.isMobile = innerWidth < 768;
        window.isTablet = innerWidth < 1200;

        var $body = $('body');

        // Create the scrollSmoother before your scrollTriggers
        ScrollTrigger.matchMedia({
            "(min-width: 768px)": function() {
                window.smoothScroller = ScrollSmoother.create({
                    smooth: 1,
                    effects: true,
                    smoothTouch: 0.1,
                });
            },
            "(max-width: 768px)": function() {
                window.smoothScroller = {
                    paused: () => {},
                    scrollTo: () => {}
                }

            },
        });


        // Background Color
        const boxes = gsap.utils.toArray('.change-color');

        if ($body.hasClass('home')) {
            gsap.set('body', {
                backgroundColor: "#212220"
            });
        } else {
            gsap.set('body', {
                backgroundColor: "#F6F4F1"
            });
            $body.addClass('bg-white');
        }

        var bodyBgAnim = null;

        boxes.forEach(box => {
            if (jQuery(box).hasClass('section-black')) {
                gsap.to('body', {
                    scrollTrigger: {
                        trigger: box,
                        start: "top center",
                        end: "bottom center",
                        scrub: 1,
                        markers: false,
                        onToggle: (self) => {
                            if (self.isActive == true) {
                                bodyBgAnim = gsap.to('body', {
                                    backgroundColor: "#212220",
                                    duration: .7,
                                });
                                $body.removeClass('bg-white');
                            }
                        },
                    }
                });
            } else {
                gsap.to('body', {
                    scrollTrigger: {
                        trigger: box,
                        start: "top center",
                        end: "bottom center",
                        scrub: 1,
                        markers: false,
                        onToggle: (self) => {
                            if (self.isActive == true) {
                                bodyBgAnim = gsap.to('body', {
                                    backgroundColor: "#F6F4F1",
                                    duration: .7,
                                });
                                $body.addClass('bg-white');
                            }
                        },
                    }
                });
            }
        });
    });

})(jQuery);