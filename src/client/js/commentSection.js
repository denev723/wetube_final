const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const videoComments = document.querySelector(".video__comments ul");
const commentList = videoComments.querySelector("li");
const commentDelBtn = document.querySelector(".delete--btn");

const addcomment = (text, id) => {
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.dataset.id = id;
  const left = document.createElement("div");
  left.className = "left";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = `${text}`;
  const delBtn = document.createElement("span");
  delBtn.className = "delete--btn";
  delBtn.innerText = " ❌";
  left.appendChild(icon);
  left.appendChild(span);
  newComment.appendChild(left);
  newComment.appendChild(delBtn);
  videoComments.prepend(newComment);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addcomment(text, newCommentId);
  }
};

const handleDelete = async () => {
  const commentId = commentList.dataset.id;
  await fetch(`/api/comment/${commentId}/delete`, {
    method: "DELETE",
  });
  commentList.remove();
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
if (commentList) {
  commentDelBtn.addEventListener("click", handleDelete);
}
