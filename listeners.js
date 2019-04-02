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
  }, 500);
}

function onHashChange() {
  const hashtag = cleanHashtag(window.location.hash.substring(1));
  inputHashtag.value = hashtag;
  window.localStorage.setItem("identifier", hashtag);
  // update attach room identifier when hashtag is changed
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
  window.localStorage.setItem("identifier", inputValue);
  // update attach room identifier when hashtag input is changed
  attachSdk.setProperty("attach:room:identifier", inputValue);
}

function openTab() {
  window.open(getUrl(), "_blank");
}

function updateAttachAvatar(imageUrl) {
  //setting avatar to attach user
  attachSdk.setProperty("attach:user:avatar", imageUrl);
  window.localStorage.setItem("avatar", imageUrl);
}
