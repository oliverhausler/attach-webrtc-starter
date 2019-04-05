var submitButton = document.querySelector("#submit");
var tooltip = document.querySelector("#tooltip");
var inputHashtag = document.querySelector("#hashtag");

function initEmail() {
  const hashtag = cleanHashtag(window.location.hash.substring(1));
  window.location.href =
    "mailto:subject=Join me for WebRTC video on #" +
    hashtag +
    "&body=" +
    getUrl();
}

function onCopy() {
  copyToClipboard(getUrl());
  tooltip.classList.remove("hidden");
  setTimeout(function() {
    tooltip.classList.add("hidden");
  }, 1500);
}

function onHashtagChange() {
  const hashtag = cleanHashtag(window.location.hash.substring(1));
  inputHashtag.value = hashtag;
  window.localStorage.setRoom("identifier", hashtag);

  // update room identifier to reflect new hashtag
  attachSdk.setProperty("attach:room:identifier", hashtag);
}

function onHashtagInput(e) {
  if (!e.target.value) {
    submitButton.classList.add("disabled");
  } else {
    submitButton.classList.remove("disabled");
  }
}

function onSubmit(e) {
  e.preventDefault();
  if (inputHashtag.value) {
    submitButton.classList.add("disabled");
  }
  var inputValue = cleanHashtag(inputHashtag.value);
  try {
    var url = new URL(inputValue);
    inputValue = url.hash.substring(1);
  } catch (e) {}

  inputHashtag.value = inputValue;
  window.location.hash = "#" + inputValue;
  window.localStorage.setRoom("identifier", inputValue);

  // update room identifier to reflect new hashtag
  attachSdk.setProperty("attach:room:identifier", inputValue);
}

function openTab() {
  window.open(getUrl(), "_blank");
}

function updateAvatar(imageUrl) {
  window.localStorage.setRoom("avatar", imageUrl);

  // set user avatar
  attachSdk.setProperty("attach:user:avatar", imageUrl);
}
