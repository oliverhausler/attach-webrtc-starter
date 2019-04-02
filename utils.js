function getUrl() {
  return window.location.origin + window.location.pathname + "#" + hashtag;
}

function cleanHashtag(value) {
  return decodeURIComponent(value).replace(new RegExp(" ", "g"), "");
}

//https://stackoverflow.com/a/33928558
function copyToClipboard(text) {
  if (window.clipboardData && window.clipboardData.setData) {
    return clipboardData.setData("Text", text);
  } else if (
    document.queryCommandSupported &&
    document.queryCommandSupported("copy")
  ) {
    var textarea = document.createElement("textarea");
    textarea.textContent = text;
    textarea.style.position = "fixed";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      return document.execCommand("copy");
    } catch (ex) {
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }
}

function updateClass(element, className, shouldAdd) {
  if (shouldAdd) {
    element.classList.add(className);
  } else {
    element.classList.remove(className);
  }
}

function setBackground(element, imageUrl) {
  element.style.backgroundImage = imageUrl ? "url('" + imageUrl + "')" : "";
}
