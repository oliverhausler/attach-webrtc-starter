var hashtag = window.localStorage.getItem("identifier") || "helloattach";
var avatar = window.localStorage.getItem("avatar") || "";

var inputHashtag = document.querySelector("#hashtag");
var submitButton = document.querySelector("#submit");
inputHashtag.addEventListener("input", function(e) {
  if (!e.target.value) {
    submitButton.classList.add("disabled");
  } else {
    submitButton.classList.remove("disabled");
  }
});
document.querySelector("#form").addEventListener("submit", function(e) {
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
  updateAttach({ identifier: inputValue });
  window.localStorage.setItem("identifier", inputValue);
});

var copyButton = document.querySelector("#copy");
var emailButton = document.querySelector("#email");
var openBrowserButton = document.querySelector("#open-browser");

function getUrl() {
  return window.location.origin + window.location.pathname + "#" + hashtag;
}

function cleanHashtag(value) {
  return decodeURIComponent(value).replace(new RegExp(" ", "g"), "");
}

function initListeners() {
  window.addEventListener(
    "hashchange",
    function() {
      const hashtag = cleanHashtag(window.location.hash.substring(1));
      updateAttach({ identifier: hashtag });
      inputHashtag.value = hashtag;
    },
    false
  );

  var tooltip = document.querySelector("#tooltip");
  copyButton.addEventListener("click", function() {
    copyToClipboard(getUrl());
    tooltip.classList.remove("hidden");
    setTimeout(function() {
      tooltip.classList.add("hidden");
    }, 500);
  });

  emailButton.addEventListener("click", function() {
    window.location.href =
      "mailto:subject=Join me for WebRTC video on #" +
      hashtag +
      "&body=" +
      getUrl();
  });

  openBrowserButton.addEventListener("click", function() {
    window.open(getUrl(), "_blank");
  });

  new UploadFile({
    onChange: function(url) {
      updateAttach({ imageUrl: url });
    }
  });
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

function updateAttach({ identifier, imageUrl }) {
  if (identifier) {
    hashtag = identifier;
    attachSdk.setProperty("attach:room:identifier", hashtag);
    window.location.hash = "#" + identifier;
  }
  if (imageUrl) {
    avatar = imageUrl;
    attachSdk.setProperty("attach:user:avatar", imageUrl);
  }
}

//init
if (window.location.hash) {
  hashtag = window.location.hash.substring(1) || hashtag;
} else {
  window.location.hash = "#" + hashtag;
}

inputHashtag.value = hashtag;

attachSdk.setProperty("attach:room", {
  provider: "twitter",
  type: "hashtag",
  identifier: hashtag
});

if (avatar) {
  attachSdk.setProperty("attach:user:avatar", avatar);
  document.querySelector("#upload-file").style.backgroundImage =
    "url('" + avatar + "')";
}

initListeners();
