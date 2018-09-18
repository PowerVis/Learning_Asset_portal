
//var sourseUrl = "src.json";

 var sourseUrl = "https://sites.ey.com/sites/digitalassets/_api/web/Lists/getByTitle('database')/items?$top=2000";
//
//
//  var sourseUrl = "https://sites.ey.com/sites/digitalassets/_api/web/Lists/getByTitle('database')/items?$top=2000&$expand=AttachmentFiles";
//var sourseUrl = "https://sites.ey.com/sites/digitalassets/_api/web/Lists/getByTitle('database')/items?$top=2000&$expand=AttachmentFiles";


jQuery(document).ready(function ($) {



    $("#nav-icon").on('click', function () {
        ;
        $(this).toggleClass('open');
        $("#box").toggle();
    });


    var body = $('html, body');
    var downarrow = $(".scroll");

    downarrow.on("click", function (e) {
        e.preventDefault();
        body.stop(true, false).animate({
            scrollTop: pageheight - 115
        }, 500);
    });

    $(window).on("load scroll resize", function () {
        pageheight = $(window).height();
    });


    var immersionpopup = $('.immersionpopup');
    var lightbox = $(".lightbox, .close");
    var immersionpopupclick = $('.immersionpopupclick');

    immersionpopupclick.click(function (e) {
        e.preventDefault();
        lightbox.fadeIn(400);
        immersionpopup.show().animate({'top': 0, opacity: 1}, 400, "easeOutBack");
    });

    lightbox.click(function () {
        lightbox.fadeOut(400);
        immersionpopup.animate({'top': '-=300', opacity: 0}, 400, "easeInBack", function () {
            $(this).hide();
        });
    });

    var submenu = $('#submenu');

    $('#dropdown').mouseenter(function () {
        submenu.stop(true, true).fadeIn();
    }).mouseleave(function () {
        submenu.stop(true, true).fadeOut();
    });

    (function loop() {
        $('#scroll').delay(500).fadeTo(1000, 0.2).fadeTo(1000, 1, loop);
    })();






    $('.blended-togle input').on('click', function () {
        if ($(this).is(":checked")) {
            $('.capability').hide();
            $('.results').show();
            $('.activeradio input').removeAttr('checked');
            $('.capabilityitem').removeClass('activeradio');
            $('.previosslide').removeClass('previosslide');

            $('.capability').find('.hide').hide();
            $('.checkbox').css({"top": "", "opacity": ""});
            $('.selectareawrap').show();

        } else {
            $('.results').hide();
            $('.capability').show();
        }
    });


// learning journeys code



    $('.finish').on('click', function (e) {
        e.preventDefault();
        if ($(this).parent().find('.capabilityitem').hasClass('activeradio')) {
            sumary();
            $('.YOURSELECTIONSUMMARY').fadeIn();
            $('.capability').hide();
            $('.results').slideDown();

            var target = $(".results");
            var distance = (target.offset().top) - 115;
            $('html,body').stop(true, false).animate({
                scrollTop: distance
            }, 1500, 'easeInOutCubic');
        }
    });

    $('.reset').on('click', function (e) {
        e.preventDefault();
        $('.YOURSELECTIONSUMMARY').hide().find('.selectedfilters').empty();
        $('#total').empty();
        $('.checkbox').css({"top": "", "opacity": ""});
        $('.capability').show().find('.selectareawrap').show();
        $('.Account_Topics').show().find('.selectrankwrap').show();
        $('.activeradio input').removeAttr('checked');
        $('.capabilityitem').removeClass('activeradio');
        $('.results').hide();
        $('.previosslide').removeClass('previosslide');
    });

    $('.nextslide').on('click', function (e) {
        e.preventDefault();
//        $('.previosslide').removeClass('previosslide');
        if ($(this).parent().find('.capabilityitem').hasClass('activeradio')) {
            $(this).parent().addClass('previosslide');
            animatenext.call(this);
        }
    });

    $('.previous').on('click', function (e) {
        e.preventDefault();
        animateprew.call(this);
    });

    function sumary() {
        $('.activeradio').each(function () {
            var capabilityitem = $(this).clone();
            capabilityitem.find('input').remove();
            $('.YOURSELECTIONSUMMARY .selectedfilters').append(capabilityitem);
        });
    }

    function animateprew() {
        $(this).parent().find('.activeradio input').removeAttr('checked');
        $(this).parent().find('.capabilityitem').removeClass('activeradio');
        FJS.setTemplate('#list', true);

//        var dataattr = $(this).data("wrapname");
        var parent = $(this).parent();
        $.when(
                $(this).parent().find('.checkbox').each(function (i) {
            $(this).css({"top": 0, "opacity": 1, 'position': 'relative'}).delay((i++) * 100)
                    .animate({
                        top: -200,
                        opacity: 0
                    }, 400, "easeInOutBack");
        })).done(function () {
            parent.hide();
//            $('.' + dataattr).fadeIn().find('.checkbox').each(function (i) {
            $('.previosslide').last().fadeIn().find('.checkbox').each(function (i) {
                $(this).parents('.previosslide').removeClass('previosslide');
//                console.log($(this).find('.activeradio input'));
//                $(this).find('.activeradio input').trigger("click");
                $(this).css({"top": -200, "opacity": 0, 'position': 'relative'}).delay((i++) * 50)
                        .animate({
                            top: 0,
                            opacity: 1
                        }, 400, "easeInOutBack");
            });
        });
    }

    function animatenext() {
        var dataattr = $(this).parent().find('.activeradio > input').data("wrapname");
        var parent = $(this).parent();
        $.when(
                $(this).parent().find('.checkbox').each(function (i) {
            $(this).css({"top": 0, "opacity": 1, 'position': 'relative'}).delay((i++) * 100)
                    .animate({
                        top: -200,
                        opacity: 0
                    }, 400, "easeInOutBack");
        })).done(function () {
            parent.hide();
            $('.' + dataattr).fadeIn().find('.checkbox').each(function (i) {
                $(this).css({"top": -200, "opacity": 0, 'position': 'relative'}).delay((i++) * 50)
                        .animate({
                            top: 0,
                            opacity: 1
                        }, 400, "easeInOutBack");
            });
        });
    }

    $('.capabilityitem').on('click', function (e) {
        var parents = $(this).parents('fieldset');
        parents.find('.capabilityitem').removeClass('activeradio');
        var nextslide = parents.parent().find('.nextslide').addClass('animatenext');
        setTimeout(function () {
            nextslide.removeClass('animatenext');
        }, 400);
        $(this).addClass('activeradio');
    });
    $(function () {
        $(document).tooltip({
            track: true
        });
    });

});


