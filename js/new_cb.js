



//############################################//
/* callbacks */
//############################################//

function awpSetupDone(instance, instanceName){
	/* called when component is ready to use public API. Returns player instance, sound id. */
	//console.log('awpSetupDone: ', instanceName);

	var isIE = AWPUtils.isIE(), settings = instance.getSettings();

	 if(instanceName == 'fixed_bottom3' || instanceName == 'wall2'){

		instance.find('.awp-info-toggle').on('click',function(e){
			instance.find('.awp-info-bar').toggle();
		}).on('mouseenter',function(e){
			instance.overControls(e);
		}).on('mouseleave',function(e){
			instance.outControls(e);
		});

		instance.find('.awp-info-close').on('click',function(e){
			instance.find('.awp-info-bar').hide();
		}).on('mouseenter',function(e){
			instance.overControls(e);
		}).on('mouseleave',function(e){
			instance.outControls(e);
		});

		instance.find('.awp-playlist-toggle').on('click',function(e){
			if(instance.find('.awp-playlist-holder').is(':visible')){
				instance.find('.awp-playlist-holder').hide();
			}else{
				instance.find('.awp-playlist-holder').show();
			}
		});

	}
	else if(instanceName == 'poster'){

		instance.find('.awp-share-toggle').on('mouseenter',function(e){
			instance.find('.awp-share-holder').show();
		}).on('mouseleave',function(e){
			if(!isIE){
				instance.find('.awp-share-holder').hide();
			}else{
				var rt = e.toElement || e.relatedTarget;
				if(jQuery(rt).hasClass('awp-tooltip') || jQuery(rt).hasClass('awp-tooltip-inner')) return;
		        instance.find('.awp-share-holder').hide();
			}
		});

	}

}
function awpPlaylistEnd(instance, instanceName){
	/* called when current playlists reaches end. Returns player instance, sound id. */
	//console.log('awpPlaylistEnd: ');
} 
function awpMediaStart(instance, instanceName, counter){
	/* called when media starts. Returns player instance, instanceName, media counter. */
	//console.log('awpMediaStart: ', counter);
}
function awpMediaPlay(instance, instanceName, counter){
	/* called when media is played. Returns player instance, instanceName, media counter. */
	//console.log('awpMediaPlay: ', instanceName);

	if(typeof awp_mediaArr != undefined && awp_mediaArr.length && awp_mediaArr.length > 1){
		var i, len = awp_mediaArr.length;
		for(i=0;i<len;i++){
			if(instance != awp_mediaArr[i].inst){
				awp_mediaArr[i].inst.checkMedia('pause');
			}
		}
	}
}
function awpMediaPause(instance, instanceName, counter){
	/* called when media is paused. Returns player instance, instanceName, media counter. */
	//console.log('awpMediaPause: ', instanceName);
}
function awpMediaEnd(instance, instanceName, counter){
	/* called when media ends. Returns player instance, instanceName, media counter. */
	//console.log('awpMediaEnd: ', counter);
}
function awpPlaylistStartLoad(instance, instanceName){
	/* called when playlist load starts. Returns player instance, instanceName. */
	//console.log('awpPlaylistStartLoad: ', instanceName);
}
function awpPlaylistEndLoad(instance, instanceName, playlistContent){
	/* called when playlist load ends. Returns player instance, instanceName. */
	//console.log('awpPlaylistEndLoad: ', instanceName);

	var settings = instance.getSettings(),
	sourcePath = settings.sourcePath;
	
	if(instanceName == 'wall2' || instanceName == 'wall4'){

		if(instanceName == 'wall2'){
			playlistItems = instance.getPlaylistItems();
        	playlistLength = instance.getPlaylistLength();

			var grid = playlistContent.masonry({
			    itemSelector: '.awp-playlist-item',
			    columnWidth: '.awp-grid-sizer'
			});

			grid.imagesLoaded(function(){
					if(typeof doneResizing !== 'undefined')doneResizing();
					grid.masonry('layout');
				}).progress(function() {
			    grid.masonry('layout');
			});

			playlistContent.find('.awp-playlist-non-selected, .awp-playlist-selected').each(function(){
				var item = $(this);
				if(item.find('.awp-wall-preview').length == 0){
					item.find('.awp-playlist-thumb').after(jQuery('<div class="awp-wall-preview"/>'));
				}
				if(item.find('.awp-wall-overlay').length == 0){
					item.find('.awp-playlist-thumb').after(jQuery('<div class="awp-wall-overlay"></div>'));
				}
			});	

		}
		else if(instanceName == 'wall4'){
			playlistContent.find('.awp-playlist-non-selected, .awp-playlist-selected').each(function(){
				var item = $(this);
				if(item.find('.awp-wall-overlay').length == 0){
					item.find('.awp-playlist-thumb').after(jQuery('<div class="awp-wall-overlay"></div>'));
				}
			});
		}
		
	}
	
}

function awpItemTriggered(instance, instanceName, counter){
	/* called when new sound is triggered. Returns player instance, instanceName, media counter. */
	//console.log('awpItemTriggered: ', instanceName, counter);

	var data = instance.getPlaylistData()[counter].data;

	if(instanceName == 'default' || instanceName == 'default2' || instanceName == 'default3' ||  instanceName == 'default4' || instanceName == 'poster' || instanceName == 'multi1' || instanceName == 'multi2'){

		var playerThumb = instance.find('.awp-player-thumb'),
			thumb = data.thumb || data.thumbDefault;

		if(playerThumb.length && typeof thumb !== 'undefined'){
			var img = new Image();
			img.className = "awp-hidden";
			img.onload = function () {
			   this.className = "awp-visible";
			}
			img.src = thumb;
			playerThumb[0].appendChild(img);
		}

		if(instanceName == 'default3' || instanceName == 'poster'){
			instance.find('.awp-player-title').html(data.title);
			instance.find('.awp-player-artist').html(data.artist);
		}

	}
	else if(instanceName == 'fixed_bottom3' || instanceName == 'wall2'){
		instance.find('.awp-player-title').html(instance.getTitle(instance.getActiveItemId()));
		if(data.description && !AWPUtils.isEmpty(data.description))instance.find('.awp-player-desc').html(data.description);
	}
}
function awpPlaylistItemEnabled(instance, instanceName, item, id){
	/* called on playlist item enable. Returns player instance, instanceName, playlist item, playlist item id (playlist items have data-id attributes starting from 0). */
	//console.log('awpPlaylistItemEnabled: ');
	if(instanceName == 'wall2' || instanceName == 'wall4'){
		item.removeClass('awp-active');
	}
}
function awpPlaylistItemDisabled(instance, instanceName, item, id){
	/* called on playlist item disable. Returns player instance, instanceName, playlist item, playlist item id (playlist items have data-id attributes starting from 0). */
	//console.log('awpPlaylistItemDisabled: ');
	if(instanceName == 'wall2' || instanceName == 'wall4'){
		item.addClass('awp-active');
	}
}
function awpPlaylistItemClick(instance, instanceName, target, counter){
	/* called on playlist item click. Returns player instance, instanceName, playlist item (target), media counter. */
	//console.log('awpPlaylistItemClick: ', counter);
}
function awpPlaylistItemRollover(instance, instanceName, target, id){
	/* called on playlist item mouseenter. Returns player instance, instanceName, playlist item (target), playlist item id (playlist items have data-id attributes starting from 0). */
	//console.log('awpPlaylistItemRollover: ', id);
}
function awpPlaylistItemRollout(instance, instanceName, target, id, active){
	/* called on playlist item mouseleave. Returns player instance, instanceName, playlist item (target), playlist item id (playlist items have data-id attributes starting from 0), active (is active playlist item, boolean). */
	//console.log('awpPlaylistItemRollout: ', id);
}
function awpMediaEmpty(instance, instanceName){
	/* called when active media is removed from the playlist. Returns player instance, instanceName. */
	//console.log('awpMediaEmpty: ', instanceName);
}
function awpPlaylistEmpty(instance, instanceName, playlistContent){
	/* called when playlist becomes empty (no items in playlist after new playlist has been created or last playlist item removed from playlist, NOT after destroyPlaylist!). Returns player instance, instanceName. */
	//console.log('awpPlaylistEmpty: ', instanceName);
}
function awpCleanMedia(instance, instanceName){
	/* called when active media is destroyed. Returns player instance, instanceName. */
	//console.log('awpCleanMedia: ', instanceName);
}
function awpDestroyPlaylist(instance, instanceName, playlistContent){
	/* called when active playlist is destroyed. Returns player instance, instanceName. */
	//console.log('awpDestroyPlaylist: ', instanceName);
	if(instanceName == 'wall2'){
		playlistContent.masonry('destroy');
	}
}
function awpVolumeChange(instance, instanceName, volume){
	/* called on volume change. Returns player instance, instanceName, volume. */
}
function awpFilterChange(instance, instanceName, playlistContent){
	/* called after filter playlist items. Returns player instance, instanceName. */
	if(instanceName == 'wall2'){
		playlistContent.masonry('layout');
	}
}


/* END PLAYER CALLBACKS */

	

