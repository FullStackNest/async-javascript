
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
async function fetchData(endpoint) { // parameter
    return fetch(endpoint)
        .then(resposnse => resposnse.json())
        .then(data => data)
        .catch(err => err)
}

function renderError(message) {
    return `
        <div class="alert alert-danger" role="alert">
            Something went wrong! ${message}
        </div>
        `
}


const productsDiv = document.querySelector('#products');

document.getElementById('fetch-btn')
    .addEventListener('click', () => {
        let productsCard = ``;
        fetchData('https://fakestoreapi.com/products')
            .then(products => {

                products.forEach(product => {
                    const rate = product.rating.rate;
                    productsCard += `
                    <div class="card" style="width: 15rem;">
                        <img src="${product.image}" class="card-img-top small-img" alt="${product.title}">
                            <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text">${product.description}</p>
                                <a href="#" class="btn btn-${rate > 3.5 ? "primary" : "danger"}">Rating ${rate}</a>
                            </div>
                    </div>
                    `
                })
                // productsDiv.innerHTML = productsCard;
                productsDiv.insertAdjacentHTML('afterbegin', productsCard)

            }).catch(() => {

                productsDiv.insertAdjacentHTML('afterbegin', renderError('Products API has issue'))
            })



        // fetchData('https://jsonplaceholder.typicode.com/users');
    });


document.getElementById('user-btn').addEventListener('click', () => {
    fetchData('https://jsonplaceholder.typicode.com/users')
        .then(users => {
            users.forEach(user => console.log(user))
        }).catch(() => {
            productsDiv.insertAdjacentHTML('afterbegin', renderError('Users API has issue'))
        })
})

// document.getElementById('fetch-btn')
//     .addEventListener('click', () => {
//         fetchData('https://fakestoreapi.com/products'); // arguments

//         fetchData('https://jsonplaceholder.typicode.com/users');
//     })

