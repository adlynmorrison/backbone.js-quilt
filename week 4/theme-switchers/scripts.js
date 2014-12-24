;(function($) {
	'use strict';

	var $body = $('body');
	var $theme_list = $('#theme-list');
	var $theme_bar = $('#theme-bar');

	var themes = ['risky', 'rooftop', 'specter'];

	var current_theme = themes[0];

	var $theme_li, $theme_a;

	for (var i = 0; i < themes.length; i++) {
		$theme_li = $('<li>');
		$theme_li.addClass('inline-item');

		$theme_a = $('<a>');

		$theme_a.attr('href', '#');

		$theme_a.data('theme', themes[i]);

		$theme_a.addClass('theme-link');

		$theme_a.text(themes[i]);

		if (i === 0) {
			$theme_a.addClass('selected');
		}

		$theme_li.append($theme_a);

		$theme_list.append($theme_li);
	}
})(window.jQuery);