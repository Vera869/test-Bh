const postBoxElement = document.getElementById('posts-box');

async function postsRender ({postBoxElement}) {

      return fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
         return response.json();
      })
      .then((responseData) => {
         console.log(responseData);
         const posts = responseData;
         console.log(posts);
         const postsHtml = posts.map((post) => {
            return  ` <tr class="posts-box__row" key=${post.id}">
                        <td class="posts-box__row__title">${post.title}</td>
                        <td class="posts-box__row__body">${post.body}</td>
                     </tr>`;
         }).join("");
         postBoxElement.innerHTML = postsHtml;
      })

 }
 postsRender({postBoxElement});