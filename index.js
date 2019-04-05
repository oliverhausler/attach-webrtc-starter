var inputHashtag = document.querySelector("#hashtag");
var copyButton = document.querySelector("#copy");
var emailButton = document.querySelector("#email");
var openBrowserButton = document.querySelector("#open-browser");
var hashtagForm = document.querySelector("#form");

var hashtag = window.localStorage.getRoom("identifier") || "helloattach";
var avatar = window.localStorage.getRoom("avatar") || "";

// Add listeneres
window.addEventListener("hashchange", onHashtagChange, false);
inputHashtag.addEventListener("input", onHashtagInput);
hashtagForm.addEventListener("submit", onSubmit);
copyButton.addEventListener("click", onCopy);
emailButton.addEventListener("click", initEmail);
openBrowserButton.addEventListener("click", openTab);

// Upload a new avatar
new UploadFile({
  onChange: updateAvatar,
  initialValue: avatar
});

// Set a hashtag
if (window.location.hash) {
  hashtag = window.location.hash.substring(1) || hashtag;
} else {
  window.location.hash = "#" + hashtag;
}

inputHashtag.value = hashtag;

// Enter a room
// Pass an object to set multiple properties at once.
attachSdk.setProperty("attach:room", {
  provider: "twitter",
  type: "hashtag",
  identifier: hashtag
});

// Set the avatar URL if present
if (avatar) {
  attachSdk.setProperty("attach:user:avatar", avatar);
}
