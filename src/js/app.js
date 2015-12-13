$(function() {

	var swapState = function() {
		var _this = $(this);

		// Set active button state
		var activeButtonClass = "active";
		$("button").removeClass(activeButtonClass);
		_this.addClass(activeButtonClass);

		// Change wrap class
		var _wrap = $("#wrap"),
			state =  _this.data("state"),
			_body = $("body");


		_wrap.removeClass(function (index, css) {
		    return (css.match (/(^|\s)state-\S+/g) || []).join(' ');
		});
		_wrap.addClass(function(){
			return "state-" + state;
		});

		if (state === "tilt") {
			_body.on("mousemove", window.relativeShadow);
		} else {
			console.log("Removing styles");
			_body.off("mousemove", window.relativeShadow);
			$("h1").removeAttr("style");
		}

	};

	$("button").on("click", swapState);	

});