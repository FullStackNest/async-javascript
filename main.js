
// console.log(1);
// console.log(2);


// setTimeout(() => {
//     console.log('From setTimeout : after 2s');
// }, 2000); // 1s = 1000ms

// console.log('hii');

// function fetchData() {
//     fetch('https://fakestoreapi.com/products')
//         .then(res => res.json())
//         .then(json => console.log(json))

//     fetch('https://jsonplaceholder.typicode.com/users')
//         .then(resposnse => resposnse.json())
//         .then(data => console.log(data))
// }

// fetchData();



// setTimeout(() => {
//     console.log('From setTimeout : after 5s');
// }, 5000); // 1s = 1000ms


// setTimeout(() => {
//     console.log('From setTimeout : after 0.5s');
// }, 500); // 1s = 1000ms



/**
 * Representational State Transfer (REST) is a software architecture that imposes conditions on how an API should work. REST was initially created as a guideline to manage communication on a complex network like the internet.
 * 
 * 
 * GET > You take the information from the API/3rd party links : Downword towards your system
 * POST > You are publishing your info. > Upwards from your system
 * UPDATE 1) PUT : // more bandwidth consumption. as it updates or refreshes every field
 *         2) PATCH : // less bandwidth consumption., it updates only the required field
 * 
 * DELETE: 
 * 
 * API LINKS OR ENDPOINTS
 * 
 */


// parameterized API calling
// async function fetchData(endpoint) { // parameter
//     return fetch(endpoint)
//         .then(resposnse => resposnse.json())
//         .then(data => data)
//         .catch(err => err)
// }

async function fetchData(endpoint) { // parameter
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
}

// const fetchData = async (endpoint) => { // parameter
//     return fetch(endpoint)
//         .then(resposnse => resposnse.json())
//         .then(data => data)
//         .catch(err => err)
// }

function renderError(message) {
    return `
        <div class="alert alert-danger" role="alert">
            Something went wrong! ${message}
        </div>
        `
}

function showLoading() {
    return `
    <div class="progress" style="width: 90vw; height: 2rem; font-size: 1.2rem;">
        <div class="progress-bar" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">Loading...</div>
    </div>
    `
}

function renderCardHTML(product) {
    const rate = product.rating.rate;
    return `
        <div class="card" style="width: 15rem;">
            <img src="${product.image}" class="card-img-top small-img" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.description}</p>
                    <a href="#" class="btn btn-${rate > 3.5 ? "primary" : "danger"}">Rating ${rate}</a>
                </div>
        </div>
        `;
}

function renderUserHTML(user) {
    const address = `${user.address.street}, ${user.address.suite} -  ${user.address.city}`;
    return `
       <div class="card" style="width: 15rem;">
            <h6>${user.name}</h6>
            <div class="card-body">
                <h5 class="card-title"><b>Email: </b>${user.email}</h5>
                <p class="card-text"><b>Address: </b>${address}</p>
                
            </div>
       </div>
    `
}


const productsDiv = document.querySelector('#products');
const loader = document.querySelector('#loader');

document.getElementById('fetch-btn')
    .addEventListener('click', () => {
        let productsCard = ``;
        productsDiv.innerHTML = null;
        loader.innerHTML = showLoading();
        fetchData('https://fakestoreapi.com/products')
            .then(products => {

                products.forEach(product => {

                    productsCard += renderCardHTML(product)
                })
                productsDiv.insertAdjacentHTML('afterbegin', productsCard)

            }).catch(() => {
                productsDiv.insertAdjacentHTML('afterbegin', renderError('Products API has issue'))
            }).finally(() => {
                loader.innerHTML = null;
                console.log('Products fetching done');
            })
    });


document.getElementById('user-btn').addEventListener('click', async () => {
    try {
        let userCard = ``;
        productsDiv.innerHTML = null;
        loader.innerHTML = showLoading();
        const users = await fetchData('https://jsonplaceholder.typicode.com/users');
        users.forEach(user => {
            userCard += renderUserHTML(user);
        })
        productsDiv.insertAdjacentHTML('afterbegin', userCard)
    } catch (error) {
        productsDiv.insertAdjacentHTML('afterbegin', renderError('Users API has issue'))
    } finally {
        loader.innerHTML = null;
    }

})


async function callApiByDependency(prodApi) {
    const prodRes = await fetch(prodApi);
    const prodData = await prodRes.json();
    const { id } = await prodData;

    // const userRes = await fetch('https://jsonplaceholder.typicode.com/users/'+id)
    const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const userData = await userRes.json();
    // console.log(prodData, userData);
    return {
        product: prodData,
        user: userData,
    }

}

async function callApiByDependency(prodApi) {
    return fetch(prodApi)
        .then(prodRes => prodRes.json())
        .then(async (prodData) => {
            const { id } = prodData;
            return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
                .then(userRes => userRes.json())
                .then(userData => {
                    return {
                        product: prodData,
                        user: userData,
                    }
                })
        })

}


document.getElementById('both-api').addEventListener('click', () => {
    const apiId = document.getElementById('apiId').value;
    callApiByDependency('https://fakestoreapi.com/products/' + apiId)
        .then(data => {
            console.log(data);
            productsDiv.innerHTML = null;
            productsDiv.insertAdjacentHTML('afterbegin', renderCardHTML(data.product))
            productsDiv.insertAdjacentHTML('afterbegin', renderUserHTML(data.user))
        })
})


// document.getElementById('user-btn').addEventListener('click', () => {
//     let userCard = ``;
//     productsDiv.innerHTML = null;
//     loader.innerHTML = showLoading();
//     fetchData('https://jsonplaceholder.typicode.com/users')
//         .then(users => {
//             users.forEach(user => {
//                 userCard += renderUserHTML(user);

//             })

//             productsDiv.insertAdjacentHTML('afterbegin', userCard)
//         }).catch(() => {
//             productsDiv.insertAdjacentHTML('afterbegin', renderError('Users API has issue'))
//         }).finally(() => {
//             loader.innerHTML = null;
//         })
// })

// document.getElementById('fetch-btn')
//     .addEventListener('click', () => {
//         fetchData('https://fakestoreapi.com/products'); // arguments

//         fetchData('https://jsonplaceholder.typicode.com/users');
//     })

