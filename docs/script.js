let data;

const getJSON = (url) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = () => {
            if(xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
                resolve(data);
            } else {
                reject (Error(xhr.statusText));
            }
        };
        xhr.onerror = () => reject(Error('Error'));
        xhr.send();
    });
};

const generateUsers = () => {
    data.map(user => {
        document.querySelector('.user-container').insertAdjacentHTML('beforeend', `
            <div class="user-card">
                <h3>${user.username}</h3>
                <p>${user.name}</p>
                <p>${user.email}</p>
                <p>${user.address.suite} ${user.address.street} ${user.address.city} ${user.address.zipcode}</p>
                <button id="user${user.id}">${user.username}'s Posts</button>
            </div>
        `);

        document.querySelector(`#user${user.id}`).addEventListener('click', ()=>{generatePosts(user.id)});
    });
}

const generatePosts = (id) =>{
    getJSON("https://jsonplaceholder.typicode.com/posts")
        .then(value => {
            let userPostsArr = [];
            for(let i = 0; i < value.length; i++){
                if(value[i].userId === id){
                    userPostsArr.push(value[i]);
                }
            }
            console.log(value);
            userPostsArr.map(userPost =>{
                document.querySelector(`#user${userPost.userId}`).insertAdjacentHTML('afterend', `
                    <h4>Post #${userPost.id}</h4>
                    <div class="user-post-card">
                        <h5>${userPost.title}</h5>
                        <p>${userPost.body}</p>
                    </div>
                `)
            })
        })
}

getJSON("https://jsonplaceholder.typicode.com/users")
    .then(generateUsers)

