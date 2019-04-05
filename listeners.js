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

function onHashtagChange(e) {
  e.preventDefault();
  let hastag = "";

  if (e.type === "hashchange") {
    hashtag = cleanHashtag(e.target.location.hash.substring(1));
    inputHashtag.value = hashtag;
  } else if (e.type === "submit") {
    hashtag = e.target.hashtag.value;
    window.location.hash = "#" + hashtag;
  }

  window.localStorage.setItem("identifier", hashtag);
  // Update the room identifier to reflect the new hashtag
  // Provider and type are already set and do not need to be set again.
  attachSdk.setProperty("attach:room:identifier", hashtag);
}

function onHashtagInput(e) {
  if (!e.target.value) {
    submitButton.classList.add("disabled");
  } else {
    submitButton.classList.remove("disabled");
  }
}

function openTab() {
  window.open(getUrl(), "_blank");
}

// Update the user avatar
// Updating the avatar starts a new session. This is typically done when your user signs in or out of your website.
function updateAvatar(imageUrl) {
  window.localStorage.setItem("avatar", imageUrl);
  attachSdk.setProperty("attach:user:avatar", imageUrl);
}
