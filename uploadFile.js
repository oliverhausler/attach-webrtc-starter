var UploadFile = function(options) {
	var errorElement = document.querySelector('#error-upload')
	var inputFile = document.querySelector('#input-file')
	var uploadFileButton = document.querySelector('#upload-file')
	var uploadSpan = uploadFileButton.querySelector('span')
	var isUploading = false

	uploadSpan.innerText = options.initialValue ? '' : 'upload'
	setBackground(uploadFileButton, options.initialValue)

	function render(imageUrl, uploading, error) {
		isUploading = uploading

		updateClass(errorElement, 'show', error)
		updateClass(uploadFileButton, 'uploading', uploading)

		errorElement.innerText = error

		uploadSpan.innerText = imageUrl || uploading ? '' : 'upload'
		setBackground(uploadFileButton, imageUrl)
	}

	function upload(file) {
		if (isUploading || !file) return

		render(null, true, null)

		var formData = new FormData()
		formData.append('attach-upload-file', file)

		fetch('https://upload.attach.live/files/upload/attach-chat-starter', {
			credentials: 'include',
			method: 'POST',
			body: formData,
		})
			.then(response => response.json())
			.then(body => {
				if (body.url) {
					options.onChange(body.url)
				}
				render(body.url, false, body.error || '')
			})
			.catch(() => {
				render(null, false, 'Something went wrong.')
			})
	}

	inputFile.addEventListener('change', function(event) {
		upload(event.target.files[0])
	})

	uploadFileButton.addEventListener('dragover', function(e) {
		e.preventDefault()
	})

	uploadFileButton.addEventListener('drop', function(e) {
		e.preventDefault()
		upload(e.dataTransfer.files[0])
	})

	uploadFileButton.addEventListener('click', function() {
		if (!isUploading) inputFile.click()
	})
}
