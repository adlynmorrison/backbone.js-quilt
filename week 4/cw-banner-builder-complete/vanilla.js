;(function() {
  // get a reference to the submit & clear buttons
  var $create_button = $('#create-banners');
  var $clear_button = $('#clear-banners');

  // get references to all the form fields
  var $f_text = $('#text');
  var $f_text_size = $('#text-size');
  var $f_text_color = $('#text-color');
  var $f_bg_color = $('#bg-color');
  var $f_banner_count = $('#banner-count');

  // get a reference to the banner container
  var $banner_display = $('#banner-display');

  /*
  function that does one of two things when a banner is clicked:
  1.  if the banner has the 'selected' class applied, remove it
  2.  if the banner does not have the 'selected' class applied,
      add it.
  */
  $banner_display.on('click', function(e) {
    // make sure a banner was clicked
    if (e.target.addClass.contains('banner')) {
      // if the banner has the 'selected' class, remove it
      if (e.target.addClass.contains('selected')) {
        // remove the banner
        banner_display.empty(e.target);
      } else {
        // add the 'selected' class to the banner
        e.target.addClass('selected');
      }
    }
  });

  // function that will create the banners
  var create_banners = function(banner_props) {
    // variables to hold banner elements
    var banner, text, banner_class;

    // create multiple banners
    for (var i = 0; i < banner_props.count; i++) {
      // create a div for the banner
      banner = $('div');

      // set the background & text color of the banner using inline styles
      banner.attr('style', 'background: ' + banner_props.bg_color + '; color: ' + banner_props.text_color);

      // set the class of the banner based on the selected text size
      banner.attr('class', 'banner banner-' + banner_props.text_size);

      // create a text node containing the user supplied text
      banner.text(banner_props.text);

      // add the banner element to the bottom of the list
      //banner_display.append(banner);

      // add the banner element to the *top* of the banner container
      banner_display.insertBefore(banner, banner_display.firstChild);
    }
  };

  // add an event listener on the click event of the submit button
  $create_button.on('click', function(e) {
    e.preventDefault();

    // create an object to hold all the banner properties
    var $banner_props = {};

    // get the values from each form field and add them to the banner_props object
    $banner_props.text = $f_text.val;
    $banner_props.text_size = $f_text_size.val;
    $banner_props.text_color = $f_text_color.val;
    $banner_props.bg_color = $f_bg_color.val;
    $banner_props.count = $f_banner_count.val;

    // call our function to create banners, passing in our object of properties
    create_banners($banner_props);
  });

  // add an event listener on the click event of the clear button
  $clear_button.on('click', function(e) {
    e.preventDefault();

    // clear out all existing banners
    //while ($banner_display.hasChildNodes()) {
      //banner_display.empty(banner_display.lastChild);
    //}
	
	$banner_display.empty()

    // reset form
    $f_text.val = '';
    $f_text_size.selectedIndex = 0;
    $f_text_color.val = '';
    $f_bg_color.val = '';
    $f_banner_count.val = '';
  });
})();
