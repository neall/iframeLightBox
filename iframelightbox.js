var lightBoxLinks = function lightBoxLinks(userOptions){

    // set options
    var options = {
	classname: 'lightbox',
	preload: true
    };
    if (typeof userOptions == 'string') {
	options.classname = userOptions;
    } else {
	for (var key in userOptions) {
	    if (userOptions.hasOwnProperty(key)) {
		options[key] = userOptions[key];
	    }
	}
    }

    var softEquality = function softEquality(val1, val2) {
	return (val1 == val2);
    }

    var arrayContains = function arrayContains(value, test) {
	test = ((typeof test == 'function') ? test : softEquality);
	for (var i = 0; i < this.length; i++) {
	    if (test(value, this[i])) {
		return (this[i] ? this[i] : true);
	    }
	}
	return false;
    }

    var getElementsByClass = function getElementsByClass(classname, tagname) {
	tagname = (tagname ? tagname : '*');
	var parentNode = ((this === window) ? document : this);
	var allElements = parentNode.getElementsByTagName(tagname);
	var elements = [];
	var elementClasses;
	for (var i = 0; i < allElements.length; i++) {
	    elementClasses = allElements[i].className.split(' ');
	    if (arrayContains.apply(elementClasses, [classname])) {
		elements.push(allElements[i]);
	    }
	}
	return elements;
    }
    
    var stripClasses = function stripClasses(collection) {
	for (var i = 0; i < collection.length; i++) {
	    collection[i].className = '';
	}
    }

    var lightBoxAnchors, lightBoxContainer, frameTabs;
    
    var showLightBox = function showLightbox() {
	lightBoxContainer.style.display = 'block';
    }
    
    var hideLightBox = function hideLightbox() {
	lightBoxContainer.style.display = 'none';
    }

    lightBoxContainer = document.createElement('div');
    lightBoxContainer.className = 'iframelightbox';
    lightBoxContainer.onclick = hideLightBox;
    var lightBoxWindow = document.createElement('div');
    lightBoxWindow.className = 'iframelightbox_window';
    lightBoxContainer.appendChild(lightBoxWindow);
    var ul = document.createElement('ul');
    lightBoxWindow.appendChild(ul);
    var closeButton = document.createElement('div');
    closeButton.className = 'iframelightbox_closebutton';
    lightBoxWindow.appendChild(closeButton);
    var container = document.createElement('div');
    container.className = 'iframelightbox_iframecontainer';
    lightBoxWindow.appendChild(container);

    frameTabs = [];
    lightBoxAnchors = getElementsByClass(options.classname, 'a');
    var hrefMatch = function hrefMatch(href, obj) {
	return (obj.url == href);
    }
    var newTab = function newTab(anchor) {
	var existing = arrayContains(anchor.href, hrefMatch);
	if (! existing) {
	    var iframe = document.createElement('iframe');
	    if (options.preload) { iframe.src = anchor.href; }
	    container.appendChild(iframe);
	    var li = document.createElement('li');
	    ul.appendChild(li);
	    li.appendChild(document.createTextNode(anchor.textContent ? anchor.textContent : anchor.innerText));
	    existing = {
		iframe: iframe,
		li: li,
		url: anchor.href,
		activate: function(e) {
		    if (e) { e.stopPropagation(); }
		    if (window.event) { window.event.cancelBubble = true; }
		    if (iframe.src != anchor.href) { iframe.src = anchor.href; }
		    stripClasses(lightBoxContainer.getElementsByTagName('li'));
		    stripClasses(lightBoxContainer.getElementsByTagName('iframe'));
		    iframe.className = 'iframelightbox_current';
		    li.className = 'iframelightbox_current';
		    showLightBox();
		    return false;
		}
	    }
	    li.onclick = existing.activate;
	    frameTabs.push(existing);
	}
	anchor.onclick = existing.activate;
    }
    for (var i = 0; i < lightBoxAnchors.length; i++) {
	newTab(lightBoxAnchors[i]);
    }

    document.getElementsByTagName('body')[0].appendChild(lightBoxContainer);
}
