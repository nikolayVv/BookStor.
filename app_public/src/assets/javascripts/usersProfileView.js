const rating = document.getElementById("input-9");
const table = document.querySelector("#commentsList");
const lastField = document.querySelector("#lastField");

var comments = document.querySelectorAll('.comment');
var showMoreButton = comments.length > 3 ? document.querySelector("#showMoreButton") : undefined;
var currentlyShownComments = 0;

const showMore = () => {
   let quit = false;
   if (showMoreButton.innerText === "Show more") {
      for (let i = currentlyShownComments; i < currentlyShownComments + 3; i++) {
         if (i >= comments.length) {
            quit = true;
            showMoreButton.innerText = "Show less";
            break;
         }
         table.appendChild(comments[i]);
      }
      table.appendChild(lastField);
      if (!quit)
         currentlyShownComments += 3;
   } else if (showMoreButton.innerText === "Show less") {
         for (let i = comments.length - 1; i > 2; i--) {
            table.removeChild(comments[i]);
         }
         showMoreButton.innerText = "Show more";
         table.appendChild(lastField);
         currentlyShownComments = 3;
   }
};

if (showMoreButton) {
   showMoreButton.addEventListener("click", showMore);
}


window.addEventListener('load', (e) => {
   comments = [].slice.call(comments).sort((comment1, comment2) => {
      comment1 = comment1.querySelector("h1").innerText;
      comment2 = comment2.querySelector("h1").innerText;
      if (comment1 > comment2)
         return -1;
      if (comment1 < comment2)
         return 1;
      return 0;
   });
   $('#input-9').rating();
      comments.forEach(comment => {
         table.removeChild(comment);
      })
      table.removeChild(lastField);
   if (showMoreButton) {
      showMore();
   } else {
      for (let i = 0; i < 3; i++) {
         if (i >= comments.length) {
            break;
         }
         table.appendChild(comments[i]);
      }
      table.appendChild(lastField);
   }
});
