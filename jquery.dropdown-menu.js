/**jQuery plugin dropdown menu 
 * @author Simon Zhao
 */

;(function($){
	
	$.fn.dropdownMenu = function(options){
		
		var options = options ? options : {};
		// default config
		var defaults = {
			speed: 80,
			smooth:false
		};
		var current_item = null;  // item which is active
		
		var opts = $.extend(defaults, options);
		
		// show animation
		var showMenuAnimate = function($menuObj){
				var $menuItem = $('li',$menuObj);
				
				displayMenu(0,$menuItem, opts.speed);
									
				function displayMenu(index, $menuItem, speed){
					current_item = $menuItem[index];
					var len = $menuItem.length;
					if(index > len-1)
					{
						return function(){};
					}
					else
					{
						return $($menuItem[index++]).fadeIn(speed,function(){
							displayMenu(index,$menuItem,speed);
						});
					}
				}
		};
		
		// hide animation
		var hideMenuAnimate = function($menuObj){
				var $menuItem = $('li',$menuObj);
				var $menuItemArray = [];
				$.each($menuItem,function(index,value){
					$menuItemArray.push(value);
				});
				
				$menuItemArray.reverse();
				
				hideMenu(0,$menuItemArray, opts.speed,function(){
					//$menuObj.hide();
				});
				
				function hideMenu(index,$menuItemArray,speed,callback){
					current_item = $menuItemArray[index];
					var len = $menuItemArray.length;
					if(index > len-1)
					{
						return callback();
					}
					else
					{
						return $($menuItemArray[index++]).fadeOut(speed,function(){
							hideMenu(index,$menuItemArray,speed,callback);
						});
					}
				}
		};
		
		return this.each(function(){
			
			//add events for every item
			$('li>a',this).on('mouseenter',function(){
				if(opts.smooth === true) // smooth slide
				{
					$(this).siblings().stop(true,true).slideDown(opts.speed);
					
				}
				else
				{
					if($(current_item).is(':animated'))
					{
						$(current_item).clearQueue().stop(true,true);
					}
					
					showMenuAnimate(this);
				}
				
				
			});
			
			$('li',this).on('mouseleave',function(){
				
				if(opts.smooth === true) // smooth slide
				{
					$('ul',this).stop(true,true).slideUp(opts.speed);
					
				}
				else
				{
					if($(current_item).is(':animated'))  
					{
						$(current_item).clearQueue().stop(true,true);
					}
				
					hideMenuAnimate(this); 
				}
				
			});
			
		});
	};
})(jQuery);
