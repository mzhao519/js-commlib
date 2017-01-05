/**
 * jquery plugin menu animation icon
 * @author Simon Zhao
 * 
 */

/*global define */
;(function(plugin){
	//AMD support
	
	if(typeof define === 'function' && define.amd)
	{
		define(['jquery'], plugin);
	}
	else
	{
		plugin(jQuery);
	}
	
}(function($){
	
	$.fn.menuAnimationIcon = function(options){
		options = options ? options: {};
		var defaults = {
			animation: true,
			bgColor:'#000000', 		  // icon background
			width:40,          		  // icon width
			height:40,		  		  // icon height
			borderColor:'#000000',    // icon border color
			borderWidth:0,            // icon border with
			speed:400,          	  // animation speed
			menuColor:'#FFFFFF',      // menu color
			crossColor:'#CB3837',     // close icon color
			lineWidth:'20px',         // width of delimiter line in menu
			lineHeight:'3px',         // height of delimiter line in menu
			lineMargin:'7px',         // margin of delimiter line in menu
			cursor:'pointer',         // cursor
			menuEvent:function(){},   // click event
			crossEvent:function(){}   // close event
		};
		
		var opt = $.extend(defaults, options);
		
		return this.each(function(){
			var $this = $(this);
			var status = status? 'cross':'menu';
			var setWrapper = function(){ 
				$this.css({
					'cursor':opt.cursor,
					'background':opt.bgColor,
					'width':opt.width,
					'height':opt.height,
					'border-color':opt.borderColor,
					'border-width':opt.borderWidth,
					'position':'relative',
					'display':'inline-block',
					'border-style':'solid',
				});
			};
			var lineHeight = parseInt(opt.lineHeight);
			var lineMargin = parseInt(opt.lineMargin);
			var secondMarginTop = -lineHeight/2;
			var firstMarginTop = secondMarginTop - lineMargin;
			var thirdMarginTop = secondMarginTop + lineMargin;
			
			var createIcon = function(){
				
				$('<div class="first-line"></div>').css({
					'margin-left':'-10px',
					'margin-top':firstMarginTop
				}).appendTo($this);
				
				$('<div class="second-line"></div>').css({
					'margin-left':'-10px',
					'margin-top':secondMarginTop
				}).appendTo($this);
				
				$('<div class="third-line"></div>').css({
					'margin-left':'-10px',
					'margin-top':thirdMarginTop
				}).appendTo($this);
				
				$('div',$this).css({
					'position':'absolute',
					'left':'50%',
					'top':'50%',
					'width':opt.lineWidth,
					'height':opt.lineHeight,
					'background':opt.menuColor
				});
			};
			
			var setCrossColor = function(){
				$('div',$this).css({'background':opt.crossColor});
			};
			
			var setMenuColor = function(){ 
				$('div',$this).css({'background':opt.menuColor});
			};
			
			// menu transfrom to cross
			var menuToCross = function(){
				
				$('.first-line',$this).stop().animate(
					{'margin-top':secondMarginTop},
					{duration:opt.speed, complete:function(){
						$(this).css({'transform':'rotate3d(0, 0, 1, -45deg)'});
						setCrossColor(); 
						opt.menuEvent();
				}});
				
				$('.third-line',$this).stop().animate(
					{'margin-top':secondMarginTop},
					{duration:opt.speed, complete:function(){
						$(this).css({'transform':'rotate3d(0, 0, 1, 45deg)'});
				}});
				
				$('.second-line', $this).hide();
				
				status = 'cross';
			};
			
			// cross transform to menu
			var crossToMenu = function(){
				
				$('.second-line', $this).show();
				$('.first-line', $this).stop()
					.css({'margin-top':secondMarginTop,'transform':'rotate3d(0, 0, 1, 0deg)'})
					.animate(
						{'margin-top':firstMarginTop},
						{duration:opt.speed,complete:function(){
						   setMenuColor();
						   opt.crossEvent();
				}});
				$('.third-line', $this).stop()
					.css({'margin-top':secondMarginTop,'transform':'rotate3d(0, 0, 1, 0deg)'})
					.animate(
						{'margin-top':thirdMarginTop},
						{duration:opt.speed,complete:function(){
				}});
				
				status = 'menu';
			};
			
			var init = function(){
				setWrapper();
				createIcon();
			};
			
			init();
			
			$this.on('click',function(){
				if(opt.animation === true)
				{
					if(status === 'menu')
					{
						menuToCross();
					}
					else
					{
						crossToMenu();
					}
				}
				else{
					if(status === 'menu')
					{
						opt.menuEvent();
					}
					else
					{
						opt.crossEvent();
					}
				}
				
			});
				
		});
		
	};
	
	
	var $menuAnimationIcon = $.menuAnimationIcon = function(options){
		$('.menuIcon').menuAnimationIcon(options);
	};

	return $menuAnimationIcon;   // AMD requirement
	
}));
