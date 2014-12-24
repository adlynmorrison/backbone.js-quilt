/*
URL to get videos from the Staff Picks channel:
http://vimeo.com/api/v2/channel/staffpicks/videos.json

URL to get video embed code
http://vimeo.com/api/oembed.json?width=500&height=281

To allow outside scripts to access pieces of our sandbox, we need
to give it a name. This name should be something you're pretty
sure wont be used by any other script you might include on your site.
*/
//how the ouside world knows how to find our sand box
var Oemiv = (function($){
	'use strict'
	
	var $video_title = $('#video-title');
	var $video_embed = $('#video-embed');
	var $video_description = $('#video-description');

	//private stuff use an underscore
	var _vimeo_channel_url = 'http://vimeo.com/api/v2/channel/staffpicks/videos.json';
	
	var _vimeo_video_url = 'http://vimeo.com/api/oembed.json?width=500&height=281';
	
	//private function only available inside our sandbox
	var _setup_event_listener = function(){
		$('#video-list').on('click', 'a', function(e){
			e.preventDefault();
			
			//remove all selected class in <a> tags at video list
			$('#video-list .selected').removeClass('selected');
			
			//add selected class to the <a> that was clicked
			$(this).addClass('selected');
			
			//load the video that was clicked
			Oemiv.get_video(this.href);
		})
	};
	
	//create our metephorical stations anything in the return statement is like a door to the outside world. 
	//Everything here is public
	//Oemiv is a self executing function
	//with the return we are giving our var functions
	return {
		get_video: function(url){
		//make a ajax request to vimeo url
			$.getScript(_vimeo_video_url + '&url=' + url + '&callback=Oemiv.display_video');
		},
		
		//make the display_video function
		display_video: function(video){
				$('#video-title').text(video.title);
				$('#video-embed').html(video.html);
				$('#video-description').text(video.description);
		},		
		//the name 'initialize' is an abitary. The name could be anything.
		initialize: function(){
			//start jsonp request
			//getScripts is a shorthand way of doing ajax
			//tell it what door vimeo can come though
			//?call is not abitrary, it is required for vimeo
			$.getScript(_vimeo_channel_url + '?callback=Oemiv.list_videos');
			_setup_event_listener();
		},
		//ask vimeo for it's videos
		list_videos: function(videos){
			var $li;
			//when thumbnail is clicked
			var $a;
			//load the video
			var $img;
			
			for(var i = 0; i < videos.length; i++){
				//make a new <li>
				$li = $('<li>');
				//make a new <a?
				$a = $('<a>');
				//make a new <img>
				$img = $('<img>');
				
				//set the 'href' of the <a>
				$a.attr('href', videos[i].url);
				
				//set the <img>
				$img.attr('src', videos[i].thumbnail_small);
				
				//create a class on this image
				$img.addClass('thumb');
				
				//append the img to the <a>
				$a.append($img);
				
				//append the <a> to the <li>
				$li.append($a);
				
				//append the <li> ti the container
				$('#video-list').append($li);						
			}
		}
		
	};
})(window.jQuery);

//kickstart our sandbox
//parenthesis tell out function to execute
Oemiv.initialize();