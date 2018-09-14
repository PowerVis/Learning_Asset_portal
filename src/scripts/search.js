$(document).ready(function () {



    $(".sidebar").accordion({
        heightStyle: "content",
        header: ".accordion",
        collapsible: true
    });

//    var filtergroopstitle = $('.filtergroops .title');
//
//    filtergroopstitle.on('click', function (e) {
//        $('.filtergroops').find('.filterwrap').hide();
//        filtergroopstitle.removeClass('activefilter');
//        if (!$(this).parents().eq(1).hasClass('ui-accordion-content-active')) {
//            $('.ui-accordion-header-active').trigger("click");
//        }
//
//        $(this).addClass('activefilter')
//                .parent().find('.filterwrap').css({left: 200, opacity: 0}).show()
//                .animate({left: 264, opacity: 1}, 400, 'easeOutBack');
//
//    });
//
//    $('.filterwrapoclose, .greybg2').on('click', function (e) {
//        $(this).parent().fadeOut();
//        filtergroopstitle.removeClass('activefilter');
//    });



    var fieldset = $('fieldset');

    var AppliedFiltersOBJ = {};

    $('.filterwrapp input').on('click', function (e) {
        $('.appyedfilters').empty().slideDown();
        AppliedFiltersOBJ = {};
        fieldset.each(function (i) {
            var fieldsetname = $(this).parents('.filtergroops').find('.title').text();
            var fieldsetID = $(this).attr('id');
            if ($(this).find('input').is(":checked")) {
                if ($('.clearall').length > 0) {
                } else {
                    $('.appyedfilters').append('<div class="clearall">CLEAR ALL FILTERS</div>');
                }
                $('.appyedfilters').append('<div class="' + fieldsetID + '">'
                        + '<div class="fieldsetname">' + fieldsetname + ': </div></div>');
                var Obj = [];
                $(this).find('input:checked').each(function (j) {
                    var fieldvalue = $(this).attr('value');
                    $('.' + fieldsetID).append('<span>' + fieldvalue + '</span>');
                    Obj.push(fieldvalue);
                });
                AppliedFiltersOBJ[fieldsetID] = Obj;
            }
        });

        WhriteTOStorage($('body').attr('class'));

        $('.clearall').on('click', function (e) {
            $('fieldset input:checked').each(function (j) {
                $(this).trigger("click");
            });
        });

        $('.appyedfilters span').on('click', function (e) {
            var fieldvalue = $(this).text();
            var fieldsetname = $(this).parent().attr('class');
            $('#' + fieldsetname).find('input[value="' + fieldvalue + '"]').trigger("click");
        });
    });



//store filters that you cheked 


    $('input:checked').each(function () {
        $(this).attr('checked', false);
    });

    function WhriteTOStorage(classname) {
        // Put the object into storage
        localStorage.setItem(classname + 'AppliedFilters', JSON.stringify(AppliedFiltersOBJ));
    }

    function ReadFromStorage(classname) {
        // Retrieve the object from storage 
        var retrievedObject = localStorage.getItem(classname + 'AppliedFilters');
        var parsed = JSON.parse(retrievedObject);

        $.each(parsed, function (key, data) {
            $(data).each(function () {
                $('#' + key).find('input[value="' + this + '"]').trigger("click");
            });
        });
    }

    setTimeout(function () {
        ReadFromStorage($('body').attr('class'));
    }, 200);


    var Searchfields = ['Title', 'Learning_x0020_objectives'];
    var Ajax = function (url) {
        return $.ajax({
            url: url,
            headers: {"Accept": "application/json; odata=nometadata"},
            async: true,
            dataType: "json",
            crossDomain: true,
            xhrFields: {withCredentials: true}
        }).fail(function (xhr) {
//            console.log('fail fetch' + xhr);
        });
    };
    var Next = function (url) {
        $.when(Ajax(url)).then(function (data) {


            console.dir(data)
            var afterFilter = function (result, jQ) {

//                 console.dir(jQ);

                $('#total').text(result.length);
                $('.counter').remove();

//                $("fieldset").each(function () {
//                    var IDes = $(this).attr('id');
//
//                    $(this).find('input').each(function () {
//                        var c = $(this);
//                        var count = 0;
//                        var ob = {};
//
//                        ob[IDes] = c.val();
//
//                        if (jQ.where(ob).count) {
//                            count = jQ.where(ob).count;
//                            c.parent().find('span').append('<span class="counter"> (' + count + ')</span>')
//                        }
//
////                        c.next().html(c.val() + '<span class="counter"> (' + count + ')</span>');
//                    });
//                });

            };

            var afterAddRecords = function (result, jQ) {

            };


            var FJS = FilterJS(data.value, '#movies', {
                template: '#courses',
                filter_on_init: true,
//                search: {ele: '#searchbox'},
                search: {ele: '#searchbox', fields: Searchfields}, // With specific fields
                //  search: {ele: '#searchbox2', fields: ['Learning_x0020_objectives']}, // With specific fields

                callbacks: {
                    afterFilter: afterFilter,
                    afterAddRecords: afterAddRecords
                },
                pagination: {
                    container: '.pag',
                    visiblePages: 5,
                    perPage: {
                        values: [20, 50, 100],
                        container: '.per_page'
                    }
                }
            });

            FJS.addCriteria({field: 'Region', ele: '#Region input:checkbox'});
            FJS.addCriteria({field: 'Topic', ele: '#Topic input:checkbox'});
            FJS.addCriteria({field: 'Service_x0020_Line', ele: '#Serviceline input:checkbox'});
            FJS.addCriteria({field: 'Length', ele: '#Length input:checkbox'});


            window.FJS = FJS;
        });
    };



    $("#changesearch").change(function () {
        if (document.getElementById("changesearch").value === 'SearchTitle') {
            $('#searchbox').val('');
            Searchfields = ['Title', 'Learning_x0020_objectives'];
            Next(sourseUrl);

        } else if (document.getElementById("changesearch").value === 'SearchCreds') {
            $('#searchbox').val('');
            Searchfields = ['Length'];
            Next(sourseUrl);
        } else {


        }
    });



//
//    $('#two').on('click', function () {
//        Searchfields = ['Length'];
//        FJS.setTemplate('#courses', true);
//        Next(sourseUrl);
//    });

    Next(sourseUrl);

});


