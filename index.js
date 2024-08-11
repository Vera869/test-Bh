const postBoxElement = document.getElementById('posts-box');
const buttonSearch = document.getElementById('search-button');
const buttonClear = document.getElementById('clear-button');
const inputSearch = document.getElementById('search-input');
// const titleColumn = document.querySelectorAll('posts-box__row__title') || undefined;
// const bodyColumn = document.querySelectorAll('posts-box__row__body') || undefined;

let posts;

function checkFetch(response) {
   if(response.status === 500) {
      throw new Error("Сервер сломался");
    }
    if(response.status === 400) {
      throw new Error("Плохой запрос");
    }
    if(!navigator.onLine) {
      throw new Error("нет интернета")
   }
}
 const getPosts = async () => {
   posts = await fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json());
 }

 const showPosts = async () => {
   await getPosts();
   posts.forEach(post => {
      const row = document.createElement('tr');
      row.classList.add('posts-box__row');

      const title = document.createElement('td');
      title.innerText = post.title;
      title.classList.add('posts-box__row__title');

      const body = document.createElement('td');
      body.innerText = post.body;
      body.classList.add('posts-box__row__body');

      row.appendChild(title);
      row.appendChild(body);
      postBoxElement.appendChild(row);
   })
  }

 showPosts();

 buttonSearch.addEventListener('click', (e) => {
   e.stopPropagation();
   if(inputSearch.value.length < 3) {
     alert("Укажите не менее 3 символов для поиска.");
     return;
   } else {
      const showPosts = async () => {
         postBoxElement.innerHTML = "";
         posts.filter(post =>
             post.title.toLowerCase().includes(inputSearch.value.toLowerCase())
         ).forEach(post => {
            const row = document.createElement('tr');
            row.classList.add('posts-box__row');

            const title = document.createElement('td');
            title.innerText = post.title;
            title.classList.add('posts-box__row__title');

            const body = document.createElement('td');
            body.innerText = post.body;
            body.classList.add('posts-box__row__body');

            row.appendChild(title);
            row.appendChild(body);
            postBoxElement.appendChild(row);
         })
      }
      showPosts();
   }
});

buttonClear.addEventListener('click', (e) => {
   e.stopPropagation();
   inputSearch.value = "";
   showPosts();
})

// async function titleSort() {
//    setInterval(() => {
//       const titleColumn = document.querySelectorAll('posts-box__row__title');
//       const bodyColumn = document.querySelectorAll('posts-box__row__body');

//       titleColumn.addEventListener('click', (e) => {
//          e.stopPropagation();
//          const showPosts = async () => {
//             postBoxElement.innerHTML = "";
//             posts.sort(function (a, b) {
//                return Object.keys(b).length - Object.keys(a).length;
//              }).forEach(post => {
//                const row = document.createElement('tr');
//                row.classList.add('posts-box__row');

//                const title = document.createElement('td');
//                title.innerText = post.title;
//                title.classList.add('posts-box__row__title');

//                const body = document.createElement('td');
//                body.innerText = post.body;
//                body.classList.add('posts-box__row__body');

//                row.appendChild(title);
//                row.appendChild(body);
//                postBoxElement.appendChild(row);
//             })
//          }
//          showPosts();
//       })
//    },2000)



// }

// titleSort();

// bodyColumn.addEventListener('click', (e) => {
//    e.stopPropagation();
//    const showPosts = async () => {
//       postBoxElement.innerHTML = "";
//       posts.sort(function (a, b) {
//          return Object.keys(b).length - Object.keys(a).length;
//        }).forEach(post => {
//          const row = document.createElement('tr');
//          row.classList.add('posts-box__row');
// const title = document.createElement('td');
//          title.innerText = post.title;
//          title.classList.add('posts-box__row__title');

//          const body = document.createElement('td');
//          body.innerText = post.body;
//          body.classList.add('posts-box__row__body');

//          row.appendChild(title);
//          row.appendChild(body);
//          postBoxElement.appendChild(row);
//       })
//    }
//    showPosts();
// })


// async function postsRender (postBoxElement) {

//       return fetch('https://jsonplaceholder.typicode.com/posts')
//       .then((response) => {
//          checkFetch(response);
//          return response.json();
//       })
//       .then((responseData) => {
//          const posts = responseData;
//          const postsHtml = posts.map((post) => {
//             return  ` <tr class="posts-box__row" key=${post.id} ">
//                         <td class="posts-box__row__title">${post.title}</td>
//                         <td class="posts-box__row__body">${post.body}</td>
//                      </tr>`;
//          }).join("");
//          postBoxElement.innerHTML = postsHtml;

      //    buttonSearch.addEventListener('click', () => {
      //       if(inputSearch.value.length < 3) {
      //         alert("Укажите не менее 3 символов для поиска.");
      //         return;
      //       } else {
      //          posts.forEach(post => {
      //             post.title.include(inputSearch.value);
      //          });
      //       //  posts.insludes(inputSearch.value);
      //       }
      //    });
      // })


//  }
//  postsRender(postBoxElement);
