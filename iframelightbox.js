var lightBoxLinks = function lightBoxLinks(classname){

    var arrayContains = function arrayContains(value) {
	for (var i = 0; i < this.length; i++) {
	    if (this[i] == value) {
		return true;
	    }
	}
	return false;
    }

    var getElementsByClass = function getElementsByClass(classname) {
	var parentNode = ((this === window) ? document : this);
	var allElements = parentNode.getElementsByTagName('*');
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

    var lightBoxAnchors = getElementsByClass(classname);
    var body = document.getElementsByTagName('body')[0];
    var fragment = document.createDocumentFragment();
    var iframeContainer = document.createElement('div');

    var showLightBox = function showLightbox() {
	iframeContainer.style.display = 'block';
    }

    var hideLightBox = function hideLightbox() {
	iframeContainer.style.display = 'none';
    }

    iframeContainer.style.display = 'none';
    iframeContainer.style.position = 'fixed';
    iframeContainer.style.top = 0;
    iframeContainer.style.bottom = 0;
    iframeContainer.style.left = 0;
    iframeContainer.style.right = 0;
    try {
	iframeContainer.style.background = 'rgba(0,0,0,0.3)';
    } catch (err) {
	// IE doesn't support rgba
	iframeContainer.style.background = 'url(dither.gif)';
    }
    iframeContainer.onclick = hideLightBox;
    var iframe = document.createElement('iframe');
    iframe.style.border = 'solid 3px #ddd';
    iframe.style.position = 'fixed';
    iframe.style.top = '15%';
    iframe.style.left = '15%';
    iframe.style.width = '70%';
    iframe.style.height = '70%';
    iframe.style.background = 'white';
    fragment.appendChild(iframeContainer);
    iframeContainer.appendChild(iframe);
    body.appendChild(fragment);

    var linkHandler = function linkHandler(e) {
	if (iframe.src != this.href) { iframe.src = this.href; }
	showLightBox();
	return false;
    }

    for (var i = 0; i < lightBoxAnchors.length; i++) {
	lightBoxAnchors[i].style.background = 'red';
	lightBoxAnchors[i].onclick = linkHandler;
    }
}
