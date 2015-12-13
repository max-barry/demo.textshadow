$(function() {
	/**
	Heavily modified from this:
	https://github.com/codrops/ImageTiltEffect/blob/master/js/tiltfx.js
	*/	

	var _windowW, _windowH,
		_pageX, _pageY,
		shadowVal, shadowStyle,
		shX, shY, res,
		rotateVal, rotateStyle,
		_maxBound,
		sf = 0.2,
		col;

	var $h = $("h1"),
		hw = $h.width(), hh = $h.height();

	var _calcVals = function(pagePos, winDim, elemDim) {
			_maxBound = (winDim - elemDim) / 2;
			res = -1 * (pagePos - (winDim / 2));
			res = Math.min(Math.max(res, -_maxBound), _maxBound);

			return Math.ceil(res * sf);
	};

	window.relativeShadow = function(e) {
		var _evt = e || window.event;

		requestAnimationFrame(function(){

			_windowW = window.innerWidth;
			_windowH = window.innerHeight;
			_pageX = _evt.pageX;
			_pageY = _evt.pageY;


			shX = _calcVals(_pageX, _windowW, hw);
			shY = _calcVals(_pageY, _windowH, hh);

			shadowVal = shX/2 + "px " + shY/2 + "px 0px rgb(61, 224, 187)," + shX + "px " + shY + "px 0px rgb(245, 0, 87)";
			shadowStyle = "text-shadow: " + shadowVal;

			rotateVal = "rotate3d(1, 0, 0, " + shY/4 + "deg) rotate3d(0, 1, 0, " + (-shX/4) + "deg)";
			rotateStyle = "-webkit-transform: " + rotateVal + "; transform: " + rotateVal + ";";

			$h.attr("style", rotateStyle + shadowStyle);

		});
	};


	// $()
	// this.tiltWrapper.addEventListener('mousemove', function(ev) {
	// 		requestAnimationFrame(function() {
	// 				// mouse position relative to the document.
	// 			var mousepos = getMousePos(ev),
	// 				// document scrolls.
	// 				docScrolls = {left : document.body.scrollLeft + document.documentElement.scrollLeft, top : document.body.scrollTop + document.documentElement.scrollTop},
	// 				bounds = self.tiltWrapper.getBoundingClientRect(),
	// 				// mouse position relative to the main element (tiltWrapper).
	// 				relmousepos = {
	// 					x : mousepos.x - bounds.left - docScrolls.left,
	// 					y : mousepos.y - bounds.top - docScrolls.top
	// 				};

	// 			// configure the movement for each image element.
	// 			for(var i = 0, len = self.imgElems.length; i < len; ++i) {
	// 				var el = self.imgElems[i],
	// 					rotX = moveOpts.rotateX ? 2 * ((i+1)*moveOpts.rotateX/self.options.extraImgs) / self.view.height * relmousepos.y - ((i+1)*moveOpts.rotateX/self.options.extraImgs) : 0,
	// 					rotY = moveOpts.rotateY ? 2 * ((i+1)*moveOpts.rotateY/self.options.extraImgs) / self.view.width * relmousepos.x - ((i+1)*moveOpts.rotateY/self.options.extraImgs) : 0,
	// 					rotZ = moveOpts.rotateZ ? 2 * ((i+1)*moveOpts.rotateZ/self.options.extraImgs) / self.view.width * relmousepos.x - ((i+1)*moveOpts.rotateZ/self.options.extraImgs) : 0,
	// 					transX = moveOpts.translateX ? 2 * ((i+1)*moveOpts.translateX/self.options.extraImgs) / self.view.width * relmousepos.x - ((i+1)*moveOpts.translateX/self.options.extraImgs) : 0,
	// 					transY = moveOpts.translateY ? 2 * ((i+1)*moveOpts.translateY/self.options.extraImgs) / self.view.height * relmousepos.y - ((i+1)*moveOpts.translateY/self.options.extraImgs) : 0,
	// 					transZ = moveOpts.translateZ ? 2 * ((i+1)*moveOpts.translateZ/self.options.extraImgs) / self.view.height * relmousepos.y - ((i+1)*moveOpts.translateZ/self.options.extraImgs) : 0;

	// 				el.style.WebkitTransform = 'perspective(' + moveOpts.perspective + 'px) translate3d(' + transX + 'px,' + transY + 'px,' + transZ + 'px) rotate3d(1,0,0,' + rotX + 'deg) rotate3d(0,1,0,' + rotY + 'deg) rotate3d(0,0,1,' + rotZ + 'deg)';
	// 				el.style.transform = 'perspective(' + moveOpts.perspective + 'px) translate3d(' + transX + 'px,' + transY + 'px,' + transZ + 'px) rotate3d(1,0,0,' + rotX + 'deg) rotate3d(0,1,0,' + rotY + 'deg) rotate3d(0,0,1,' + rotZ + 'deg)';
	// 			}
	// 		});
	// 	});	
});