
//var sourseUrl = "src.json";

var sourseUrl = "https://sites.ey.com/sites/digitalassets/_api/web/Lists/getByTitle('database')/items?$top=2000";
//
//
//  var sourseUrl = "https://sites.ey.com/sites/digitalassets/_api/web/Lists/getByTitle('database')/items?$top=2000&$expand=AttachmentFiles";
//var sourseUrl = "https://sites.ey.com/sites/digitalassets/_api/web/Lists/getByTitle('database')/items?$top=2000&$expand=AttachmentFiles";

jQuery(document).ready(function ($) {

    $('.carousel').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
    });
});