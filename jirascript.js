function addCSS(id, css) {
    var head = document.getElementsByTagName('head')[0];
    var s = document.createElement('style');
 
    s.setAttribute('type', 'text/css');
    s.setAttribute('id', id);
    if (s.styleSheet) {   // IE
        s.styleSheet.cssText = css;
    } else {                // the world
        s.appendChild(document.createTextNode(css));
    }
 
    head.appendChild(s);
}

function removeElement(id){
    var trash = document.getElementById(id);
    trash.parentNode.removeChild(trash);
}
 
function toggleColumnFromEvent(event) {		
	var columnId = parseInt(event.target.getAttribute("col"));
	toggleColumn(columnId);
}

function toggleColumn(columnId){	
    var column = document.querySelectorAll("li[data-column-id='"+columnId+"']")[0];
	var columnTarget = document.querySelectorAll("div[data-column-id='"+columnId+"']")[0];
	var childId = columnId+1;
    
	var css = '.ghx-zone-overlay-column:nth-child(' + childId + '), .ghx-column:nth-child(' + childId + ') { display: none; }' 
    + '.column-toggle:nth-child(' + childId + ') {background: #656060 none repeat scroll 0% 0%; color: silver; }'; 
    
	if(document.getElementById('hidden-column-' + columnId)) { 
        removeElement('hidden-column-' + columnId);
		localStorage.setItem("jiracolumn_hide_"+boardId+"_"+columnId, "false");
    } else {
        addCSS('hidden-column-' + columnId, css);
		localStorage.setItem("jiracolumn_hide_"+boardId+"_"+columnId, "true");
    }       
}

 
function createDropDownAndHideColumns() {
    var text = "textContent" in document.body ? "textContent" : "innerText"; 
	
    var columnNames = document.querySelectorAll('.ghx-column-headers h2');

	var dropdown = '<div class="ghx-view-section "><button class="aui-button aui-dropdown2-trigger" aria-controls="columns-dropdown">Columns</button></div>';
	$(dropdown).appendTo("#ghx-view-pluggable");
	
	var dropdownMenu = '<aui-dropdown-menu id="columns-dropdown">';
	
    for (var i = 0; i < columnNames.length; i++) {
        var columnName = columnNames[i][text];
		var checked = "checked";		
		
		if(localStorage.getItem("jiracolumn_hide_"+boardId+"_"+i)=="true"){		
			checked = "";
			toggleColumn(i);
		}
		dropdownMenu += '<aui-item-checkbox id="toggle" col='+i+' interactive '+checked+'>'+columnName+'</aui-item-checkbox>';
	}

	dropdownMenu += '</aui-dropdown-menu>';
	
	$(dropdownMenu).appendTo("#jira");	
	$(document).on('change', '#toggle', toggleColumnFromEvent);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var boardId = getParameterByName('rapidView');
var checkExist = setInterval(function() {
   if (document.getElementById('ghx-column-headers')) {
      clearInterval(checkExist);
	  createDropDownAndHideColumns();
   }
   console.log("checking");
}, 100); 
