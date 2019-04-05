var inputHashtag = document.querySelector("#hashtag");
var copyButton = document.querySelector("#copy");
var emailButton = document.querySelector("#email");
var openBrowserButton = document.querySelector("#open-browser");
var hashtagForm = document.querySelector("#form");

var hashtag = storage.getRoom() || "helloattach";
var avatar = storage.getAvatar() || "";

// Add listeneres
window.addEventListener("hashchange", onHashtagChange, false);
inputHashtag.addEventListener("input", onHashtagInput);
hashtagForm.addEventListener("submit", onHashtagChange);
copyButton.addEventListener("click", onCopy);
emailButton.addEventListener("click", initEmail);
openBrowserButton.addEventListener("click", openTab);

// Upload a new avatar
new UploadFile({
  onChange: updateAvatar,
  initialValue: avatar
});

// Set a hashtag
setHashTag(inputHashtag);

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
