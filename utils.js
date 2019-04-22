function addClass(element, className) {
	element.classList.add(className)
}

function removeClass(element, className) {
	element.classList.remove(className)
}

function updateClass(element, className, shouldAdd) {
	if (shouldAdd) {
		addClass(element, className)
	} else {
		removeClass(element, className)
	}
}

const storage = {
	set: function(name, item) {
		window.localStorage.setItem(name, item)
	},
	get: function(name) {
		return window.localStorage.getItem(name)
	},
	getRoom: function() {
		return this.get('identifier')
	},
	setRoom: function(identifier) {
		this.set('identifier', identifier)
	},
	getAvatar: function() {
		return this.get('avatar')
	},
	setAvatar: function(imageUrl) {
		this.set('avatar', imageUrl)
	},
}

function setBackground(element, imageUrl) {
	element.style.backgroundImage = imageUrl ? "url('" + imageUrl + "')" : ''
}

function setHashTag(input) {
	if (window.location.hash) {
		hashtag = window.location.hash.substring(1) || hashtag
	} else {
		window.location.hash = '#' + hashtag
	}
	input.value = hashtag
}

function getUrl() {
	return window.location.origin + window.location.pathname + '#' + hashtag
}

function cleanHashtag(value) {
	return decodeURIComponent(value).replace(new RegExp(' ', 'g'), '')
}

// https://stackoverflow.com/a/33928558
function copyToClipboard(text) {
	if (window.clipboardData && window.clipboardData.setData) {
		return clipboardData.setData('Text', text)
	} else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
		var textarea = document.createElement('textarea')
		textarea.textContent = text
		textarea.style.position = 'fixed'
		document.body.appendChild(textarea)
		textarea.select()
		try {
			return document.execCommand('copy')
		} catch (ex) {
			return false
		} finally {
			document.body.removeChild(textarea)
		}
	}
}
