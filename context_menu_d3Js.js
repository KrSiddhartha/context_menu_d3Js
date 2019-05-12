setTimeout(function(){ 
    d3.contextMenu = function (menu, openCallback) {
		
		// create the div element that will hold the context menu
    	d3.selectAll('.d3-context-menu').data([1])
    		.enter()
    		.append('div')
    		.attr('class', 'd3-context-menu');
    
    	// close menu
    	d3.select('body').on('click.d3-context-menu', function() {
    		d3.select('.d3-context-menu').style('display', 'none');
    	});
    
    	// this gets executed when a contextmenu event occurs
    	return function(data, index) {	
    		var elm = this;
			
			
    		d3.selectAll('.d3-context-menu').html('');
    		var list = d3.selectAll('.d3-context-menu').append('ul');
    		list.selectAll('li').data(menu).enter()
    			.append('li')
    			.html(function(d) {
    				return d.title;
    			})
				.on('click', function(d, i) {
    				d.action(elm, data, index);
    				d3.select('.d3-context-menu').style('display', 'none');
					Shiny.onInputChange("file_name", d);
					d3.select(elm).text(function(d){
						console.log(d.data.name);
						Shiny.onInputChange('node_name', d.data.name);
					});
					
					//Shiny.onInputChange("node_name", node_name);
    			});
    
    		// the openCallback allows an action to fire before the menu is displayed
    		// an example usage would be closing a tooltip
    		if (openCallback) openCallback(data, index);
    
    		// display context menu
    		d3.select('.d3-context-menu')
    			.style('left', (d3.event.pageX - 2) + 'px')
    			.style('top', (d3.event.pageY - 2) + 'px')
    			.style('display', 'block');
    
    		d3.event.preventDefault();
    	};
    };
    
    var menu = [{
          title: 'Account',
          action: function(elm, d, i) {
			  console.log('Item #1 clicked!');
			  console.log('The data for this circle is: ' + d);
          }
        }, {
          title: 'Summary',
          action: function(elm, d, i) {
            console.log('You have clicked the second item!');
            console.log('The data for this circle is: ' + d);
          }
        }, {
          title: 'Inquiry',
          action: function(elm, d, i) {
            console.log('You have clicked the second item!');
            console.log('The data for this circle is: ' + d);
          }
        }, {
          title: 'IOI',
          action: function(elm, d, i) {
            console.log('You have clicked the second item!');
            console.log('The data for this circle is: ' + d);
          }
        }]
    
    d3.selectAll('circle').on('contextmenu', d3.contextMenu(menu));
  
}, 500)