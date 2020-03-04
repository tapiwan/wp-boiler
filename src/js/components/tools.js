$$$THEME_JS_NAMESPACE$$$.tools = $$$THEME_JS_NAMESPACE$$$.tools || {
	responsiveSize: function() {
		// These :before Pseudo-Element on the body is set in theme/_breakpoints.scss
		return window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
	}
};
