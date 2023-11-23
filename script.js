let form = document.getElementById('form-data');

form.addEventListener('submit', addToDb);

async function addToDb(e) {
    e.preventDefault();

    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    let email = document.getElementById('email').value;

    try {
        const response = await axios.post('http://localhost:4000/user', {
            name: name,
            phone: phone,
            email: email,
            completed: false
        });

        document.getElementById('name').value = "";
        document.getElementById('phone').value = "";
        document.getElementById('email').value = "";

        const newData = await fetchData();
        displayData(newData);
    } catch (err) {
        console.error(err);
        alert("Failed to store data");
    }
}

async function fetchData() {
    try {
        const response = await axios.get('http://localhost:4000/userDetails');
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

function displayData(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';

    users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = `Name: ${user.name}, Phone: ${user.phone}, Email: ${user.email}`;
        userList.appendChild(listItem);
    });
}

fetchData()
    .then(response => displayData(response))
    .catch(err => {
        console.log(err);
    });
