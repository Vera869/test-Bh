const postBoxElement = document.getElementById('posts-box');
const buttonSearch = document.getElementById('search-button');
const buttonClear = document.getElementById('clear-button');
const inputSearch = document.getElementById('search-input');
const titleColumn = document.getElementById('title-column');
const bodyColumn = document.getElementById('body-column');
const loader = document.getElementById('loader');
const linkForModal = document.getElementById('main__link-modal');
const modalWindow = document.getElementById('modal-window');
cancelButton = document.getElementById('cancel-button')
// 

let clickBodyColumnCounter = 0;
let clickTitleColumnCounter = 0;

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

 // создаёт элементы таблицы
const iterrPosts = (res) => {
   res.forEach(post => {
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
   });
}
// очищает таблицу, убирает loader, заполняет таблицу
const renderPosts = () => {
   postBoxElement.innerHTML = "";
   loader.style.display = 'none';
   iterrPosts(posts);
}

// отрисовывает таблицу на странице
 const showPosts = async () => {
   await getPosts();
   renderPosts();
  }

 showPosts();

 buttonSearch.addEventListener('click', (e) => {
   e.stopPropagation();
   // валидация value input
   if(inputSearch.value.length < 3) {
     alert("Укажите не менее 3 символов для поиска.");
     return;
   } else {
      // фильтрация постов (поиск)
      const filteredPosts = async () => {
         postBoxElement.innerHTML = "";
         posts = posts.filter(post =>
             post.title.toLowerCase().includes(inputSearch.value.toLowerCase()));
         iterrPosts(posts);
      }
      filteredPosts();
   }
});

// очищает value input
buttonClear.addEventListener('click', (e) => {
   e.stopPropagation();
   inputSearch.value = "";
   showPosts();
})

// Открывает модальное окно
linkForModal.addEventListener('click', () => {
   modalWindow.style.display = 'block';
})
// Закрывает модальное окно
 cancelButton.addEventListener('click', () => {
   modalWindow.style.display = 'none';
 })


titleColumn.addEventListener('click', () => {
   clickTitleColumnCounter++;

// Сортирует по возрастанию
   const sortTitlesUp = async () => {
      postBoxElement.innerHTML = "";
      titleColumn.style.backgroundColor = '#e5d9b8';
      posts = posts.sort(function (a, b) {
         return Object.values(b.title).length - Object.values(a.title).length;
       });
       iterrPosts(posts);
   }

// Сортирует по убыванию
   const sortTitlesDown = async () => {
      postBoxElement.innerHTML = "";
      titleColumn.style.backgroundColor = '#FDF6E3';
      posts = posts.sort(function (a, b) {
         return Object.values(a.title).length - Object.values(b.title).length;
       });
       iterrPosts(posts);
   }
   if(clickTitleColumnCounter % 2 === 0) sortTitlesDown();
   else sortTitlesUp();
})

bodyColumn.addEventListener('click', () => {
   clickBodyColumnCounter++;

// Сортирует по возрастанию
   const sortPostsUp = () => {
      postBoxElement.innerHTML = "";
      bodyColumn.style.backgroundColor = '#e5d9b8';
      posts.sort(function (a, b) {
         return Object.values(b.body).length - Object.values(a.body).length;});
       iterrPosts(posts);
   }

// Сортирует по убыванию
   function sortPostsDown() {
      postBoxElement.innerHTML = "";
      bodyColumn.style.backgroundColor = '#FDF6E3';
      posts.sort(function (a, b) {
         return Object.values(a.body).length - Object.values(b.body).length;});
       iterrPosts(posts);
   }
   if(clickBodyColumnCounter % 2 === 0) sortPostsDown();
   else sortPostsUp();
})
