let form = document.getElementById('form-data');

form.addEventListener('submit',addToCrud);

function fetchData(){
    return axios.get('https://crudcrud.com/api/17293b050e394eb09bfb91ca9f713f3b/eCommerce')
    .then(response => response.data)
    .catch(err => console.log(err));
}

function displayData(response,ElectronicDiv,FoodDiv,SkinDiv){
    var ulE = document.createElement('ul');
    var ulF = document.createElement('ul');
    var ulS = document.createElement('ul');

    response.forEach(record => {
        var li = document.createElement('li');
        li.textContent = 'price: ' + record.price + ', product: ' + record.product + ', category: ' + record.categories;

        var deleteButton = document.createElement('button');

        var deleteButton = document.createElement('button');

        deleteButton.textContent = 'Delete';

        deleteButton.addEventListener('click', () => delBun(record._id));

        function delBun(recordId) {
            axios.delete(`https://crudcrud.com/api/17293b050e394eb09bfb91ca9f713f3b/eCommerce/${recordId}`)
                .then(response => {
                    alert('Record deleted successfully!');
                })
                .catch(error => {
                    console.error(error);
                    alert('Error deleting record.');
                });
        }

        li.appendChild(deleteButton);

        if (record.categories === 'Electronics') {
            ulE.appendChild(li);
        } else if (record.categories === 'Food') {
            ulF.appendChild(li)
        } else if (record.categories === 'Skin Care') {
            ulS.appendChild(li)
        }

    });

    ElectronicDiv.appendChild(ulE);
    FoodDiv.appendChild(ulF);
    SkinDiv.appendChild(ulS);
}

var ElectronicDiv = document.getElementById('Electronics');
var FoodDiv = document.getElementById('Food');
var SkinDiv = document.getElementById('Skin');

fetchData()
.then(response => displayData(response,ElectronicDiv,FoodDiv,SkinDiv))

function addToCrud(e){
    e.preventDefault();

    let price=document.getElementById('price').value;
    let product=document.getElementById('product').value;
    let categories=document.getElementById('categories').value;

    console.log(price);
    console.log(product);
    console.log(categories);

    axios.post('https://crudcrud.com/api/17293b050e394eb09bfb91ca9f713f3b/eCommerce',{
        price:price,
        product:product,
        categories:categories,
        completed:false
    })
    .then(alert('User Data Succesfully stored'))
    .catch(err => console.log(err));

    
}




