
function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}
var imgURL = chrome.runtime.getURL("minimize.png");


var times = 0;

var interval = setInterval(function(){
  times += 1
  if(document.querySelectorAll('video').length != 0){
  	clearInterval(interval);
  	addBtn();
  }else if(times == 30){
  	clearInterval(interval);
  }
},100)

	
function addBtn(){
	document.querySelectorAll('video').forEach(function(video,index){
		var video_top = getOffset(video).top;
		var video_left = getOffset(video).left;
		console.log("teste")

		var  minus  = 60;

		var ajust = (video.offsetWidth/2)-minus;


		var container = $(`
			<div id="_v_`+index+`" class="container">
				<div class="button-container" style="z-index:999999999999999;">
					<div class="custom-button-wrapper">
						<div class="custom-button" id="video-detach-button" aria-label="Detach button">
							<div class="custom-button-contents custom-button-image">
								<div class="image" data-video="`+index+`">
									<img style="width: 17px;" src="`+imgURL+`"/>
								</div>
							</div>
							<div class="custom-button-contents custom-button-text"></div>
						</div>
					</div>
				</div>
			</div>
		`);

		$("body").append(container);
		$("#_v_"+index).css({"top":video_top+"px", "left":video_left+ajust+"px"});

		$( video ).hover(function() {
		    var video_top = getOffset(video).top;
		    var video_left = getOffset(video).left;
			var ajust = (video.offsetWidth/2)-minus;
			$("#_v_"+index).css({"top":video_top+"px", "left":video_left+ajust+"px"});
		    $("#_v_"+index+" .button-container").addClass("visible");
		},function() {
		  $("#_v_"+index+" .button-container").removeClass("visible");
		});

		$("#_v_"+index+" .button-container").hover(function() {
		  var video_top = getOffset(video).top;
		  var video_left = getOffset(video).left;
		  var ajust = (video.offsetWidth/2)-minus;
		  $("#_v_"+index).css({"top":video_top+"px", "left":video_left+ajust+"px"});
		  $("#_v_"+index+" .button-container").addClass("visible");
		});

		$("#_v_"+index+" .button-container").click(function(){
			video.requestPictureInPicture();
		})
	});
}
