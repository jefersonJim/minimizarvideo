function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

$(function(){
	setTimeout(addBtn, 500);

	function addBtn(){
		let isYoutube = (document.location.href.indexOf('youtube.com') !== -1)
		var imgURL = chrome.runtime.getURL("minimize.png");
		document.querySelectorAll('video').forEach(function(video,index){
			var video_top = getOffset(video).top;
			var video_left = getOffset(video).left;

			var  minus  = 60;

			var ajust = (video.offsetWidth/2)-minus;


			var container = $(`
				<div id="_v_`+index+`" class="_mv_container">
					<div class="_mv_button-container" style="z-index:999999999999999;">
						<div class="_mv_custom-button-wrapper">
							<div class="_mv_custom-button" id="video-detach-button" aria-label="Detach button">
								<div class="_mv_custom-button-contents _mv_custom-button-image">
									<div class="_mv_image" data-video="`+index+`">
										<img style="width: 14px; margin-top:-15px;" src="`+imgURL+`"/>
									</div>
								</div>
								<div class="_mv_custom-button-contents _mv_custom-button-text"></div>
							</div>
						</div>
					</div>
				</div>
			`);

			$("body").append(container);
			$("#_v_"+index).css({"top":video_top+"px", "left":video_left+ajust+"px"});

			$( video ).hover(function() {
					let ajustTop = (isYoutube ? 5 : 50);
					var video_top = getOffset(video).top+ajustTop;
					var video_left = getOffset(video).left;
					var ajust = (video.offsetWidth/2)-minus;
					$("#_v_"+index).css({"top":video_top+"px", "left":video_left+ajust+"px"});
					$("#_v_"+index+" ._mv_button-container").addClass("visible");
			},function() {
					$("#_v_"+index+" ._mv_button-container").removeClass("visible");
			});

			$("#_v_"+index+" ._mv_button-container").hover(function() {
				let ajustTop = (isYoutube ? 5 : 50);
				var video_top = getOffset(video).top+ajustTop;
				var video_left = getOffset(video).left;
				var ajust = (video.offsetWidth/2)-minus;
				$("#_v_"+index).css({"top":video_top+"px", "left":video_left+ajust+"px"});
				$("#_v_"+index+" ._mv_button-container").addClass("visible");
			});

			$("#_v_"+index+" ._mv_button-container").click(function(){
				video.requestPictureInPicture();
			})
		});
	}
});