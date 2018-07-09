$(function () {
    highlightCurrentPage();
    makeImagesResponsive();
    alignImageGrid();
});

function highlightCurrentPage() {
  $("a[href='" + location.href + "']").addClass("active");
}

function makeImagesResponsive() {
    $("img").addClass("img-responsive");
}

function alignImageGrid() {
  if( $('#article, #about').length ) {

    $(window).on('load', function() {

      $('.content-column-content p').each( function(i){
        var cont = $(this);

        if( cont.has('img').length ) {
          cont.addClass('content-post');
          var num = cont.find('img').length;
          var ratios = new Array('1');
          var sum = 0;

          cont.find('img').each( function(j){
            var img = $(this);
            var src = img.attr('src');

            ratios[j] = (img[0].naturalWidth+10) / (img[0].naturalHeight+10);   // width plus padding
            sum += ratios[j];

            img.wrap('<a href="'+src+'" />').parent().fluidbox({
                stackIndex: 100,
                viewportFill: 0.9
            });

            if(j >= num-1) {
              $.each(ratios, function(k, val) {
                cont.find('a:eq('+k+')').width( (ratios[k] / sum * 100)+'%' );
              });
            }
          });

        } else {


        }

      });

    });

  }  
}


function initGrid() {
  var gridCont = $('.portfolio-container');
  
  grid = new Muuri('.portfolio-container', {
    items: '.item'
  });
  
  
  // generate grid filter links
  var itemSeen = {};
  gridCont.find('.item').map(function() {
      var itemType = $(this).attr('data-type');

      if(itemSeen.hasOwnProperty(itemType) || itemType == null) {
        
      } else {
        itemSeen[itemType] = true;
        gridCont.find('.item.filter .card-filter').append('<a href="#" data-filter="'+itemType+'">'+itemType+'</a>');
      };
  });
  
  gridCont.imagesLoaded().progress( function( instance, image ) {
    $( image.img ).css('opacity', 1);
  }).done( function(instance) {    
    grid.refreshItems();
    grid.layout();
  });
  
    gridCont.on('click', '.card-filter a', function(e){
    e.preventDefault();
    
    var filter = $(this).attr('data-filter');
    
    if( $(this).hasClass('active') ) {
      $(this).removeClass('active');
      grid.filter('.item');
    } else {
      $('.portfolio-container .card-filter a.active').removeClass('active');
      $(this).addClass('active');
      grid.filter('.filter, .'+filter);
    }
    
  });
}
var grid;
if( $('#portfolio').length ) {
  initGrid();
}