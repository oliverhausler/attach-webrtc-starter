var inputHashtag = document.querySelector("#hashtag");
var copyButton = document.querySelector("#copy");
var emailButton = document.querySelector("#email");
var openBrowserButton = document.querySelector("#open-browser");
var hashtagForm = document.querySelector("#form");

var hashtag = window.localStorage.getItem("identifier") || "helloattach";
var avatar = window.localStorage.getItem("avatar") || "";

//add listeneres
window.addEventListener("hashchange", onHashChange, false);
inputHashtag.addEventListener("input", onHashtagInput);
hashtagForm.addEventListener("submit", onSubmit);
copyButton.addEventListener("click", onCopy);
emailButton.addEventListener("click", initEmail);
openBrowserButton.addEventListener("click", openTab);

//update attach avatar when uploaded new image
new UploadFile({
  onChange: updateAttachAvatar,
  initialValue: avatar
});

//init
if (window.location.hash) {
  hashtag = window.location.hash.substring(1) || hashtag;
} else {
  window.location.hash = "#" + hashtag;
}

// initialize hastag input
inputHashtag.value = hashtag;

//initialize attach room
attachSdk.setProperty("attach:room", {
  provider: "twitter",
  type: "hashtag",
  identifier: hashtag
});

if (avatar) {
  // if avatar present, set to attach user
  attachSdk.setProperty("attach:user:avatar", avatar);
}
