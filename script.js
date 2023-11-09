let form = document.getElementById('form-data');

form.addEventListener('submit', addToCrud);

async function fetchData() {
    try {
        const response = await axios.get('https://crudcrud.com/api/789ccd1fc94d4ca4b0b0f7d44de20a23/eCommerce');
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

async function displayData(response, ElectronicDiv, FoodDiv, SkinDiv) {
    ElectronicDiv.innerHTML = '';
    FoodDiv.innerHTML = '';
    SkinDiv.innerHTML = '';

    const groupedData = {
        Electronics: [],
        Food: [],
        'Skin Care': []
    };

    response.forEach(record => {
        groupedData[record.categories].push(record);
    });

    for (const category in groupedData) {
        const ul = document.createElement('ul');

        if (groupedData[category].length > 0) {
            groupedData[category].forEach(record => {
                const li = document.createElement('li');
                li.textContent = 'price: ' + record.price + ', product: ' + record.product + ', category: ' + record.categories;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', (event) => {
                    
                    event.preventDefault(); 
                    delBun(record._id);
                });

                function delBun(recordId) {
                    axios.delete(`https://crudcrud.com/api/789ccd1fc94d4ca4b0b0f7d44de20a23/eCommerce/${recordId}`)
                        .then(response => {
                            alert('Record deleted successfully!');
                            fetchData().then(newData => displayData(newData, ElectronicDiv, FoodDiv, SkinDiv));
                        })
                        .catch(error => {
                            console.error(error);
                            alert('Error deleting record.');
                        });
                }

                li.appendChild(deleteButton);
                ul.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = 'No data available';
            ul.appendChild(li);
        }

        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = category;

        if (category === 'Electronics') {
            ElectronicDiv.appendChild(categoryTitle);
            ElectronicDiv.appendChild(ul);
        } else if (category === 'Food') {
            FoodDiv.appendChild(categoryTitle);
            FoodDiv.appendChild(ul);
        } else if (category === 'Skin Care') {
            SkinDiv.appendChild(categoryTitle);
            SkinDiv.appendChild(ul);
        }
    }
}

var ElectronicDiv = document.getElementById('Electronics');
var FoodDiv = document.getElementById('Food');
var SkinDiv = document.getElementById('Skin');

fetchData().then(response => displayData(response, ElectronicDiv, FoodDiv, SkinDiv));

async function addToCrud(e) {
    e.preventDefault();

    let price = document.getElementById('price').value;
    let product = document.getElementById('product').value;
    let categories = document.getElementById('categories').value;

    console.log(price);
    console.log(product);
    console.log(categories);

    try {
        await axios.post('https://crudcrud.com/api/789ccd1fc94d4ca4b0b0f7d44de20a23/eCommerce', {
            price: price,
            product: product,
            categories: categories,
            completed: false
        });
        alert('User Data Successfully stored');

        const newData = await fetchData();
        displayData(newData, ElectronicDiv, FoodDiv, SkinDiv);
    } catch (err) {
        console.error(err);
    }
}
