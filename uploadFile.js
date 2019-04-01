function updateClass(element, className, shouldAdd) {
  if (shouldAdd) {
    element.classList.add(className);
  } else {
    element.classList.remove(className);
  }
}

var UploadFile = function(options) {
  var imageUrl;
  var uploading = false;
  var error;
  var errorElement = document.querySelector("#error-upload");
  var inputFile = document.querySelector("#input-file");
  var uploadFileButton = document.querySelector("#upload-file");

  function render() {
    updateClass(errorElement, "show", error);
    errorElement.innerText = error;

    updateClass(uploadFileButton, "uploading", uploading);

    uploadFileButton.innerText = imageUrl || uploading ? "" : "upload";
    uploadFileButton.style.backgroundImage = imageUrl
      ? "url('" + imageUrl + "')"
      : "";
    window.localStorage.setItem("avatar", imageUrl);
  }

  function upload(file) {
    if (uploading || !file) return;
    error = "";
    uploading = true;
    render();
    var formData = new FormData();
    formData.append("attach-upload-file", file);
    fetch("https://dev-upload.attach.live/files/upload/attach-chat-starter", {
      credentials: "include",
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(body => {
        uploading = false;
        if (body.error) {
          error = body.error;
        } else {
          error = "";
          imageUrl = body.url;
          options.onChange(body.url);
        }
        render();
      })
      .catch(() => {
        uploading = false;
        error = "Something went wrong";
        render();
      });
  }

  inputFile.addEventListener("change", function(event) {
    upload(event.target.files[0]);
  });
  uploadFileButton.addEventListener("dragover", function(e) {
    e.preventDefault();
  });
  uploadFileButton.addEventListener("drop", function(e) {
    e.preventDefault();
    upload(e.dataTransfer.files[0]);
  });
  uploadFileButton.addEventListener("click", function() {
    if (!uploading) {
      inputFile.click();
    }
  });
};
