let intress = [
    {
      id: '1', 
      firstName: 'Max',
      lastName: 'Forsberg',
      email: 'max@mail.com',
    },
    {
      id: '2', 
      firstName: 'Henric',
      lastName: 'Forsberg',
      email: 'henric@mail.com',
    },
    {
      id: '3', 
      firstName: 'Monica',
      lastName: 'Forsberg',
      email: 'monica@mail.com',
    },
    
]
  
const form = document.querySelector('#regForm');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const output = document.querySelector('#intress');
  

const validateNames = (names) => {
    let input = document.querySelector(names);

    if(input.value.trim() === '') {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
    
        input.focus();
        return false;
    
    } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        return true;
    }
  }

const validateEmail = (_email) => {
  
    if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(_email.value)) {
        for(i=0; i<intress.length; i++){
            if(_email.value === intress[i].email){
                _email.classList.remove('is-valid');
                _email.classList.add('is-invalid');
                _email.focus();
                return false;
            }
        }
        _email.classList.add('is-valid');
        _email.classList.remove('is-invalid');
        return true;
    }
    else {
        _email.classList.remove('is-valid');
        _email.classList.add('is-invalid');
        _email.focus();
        return false;
    }
}

const listIntress = () => {
    output.innerHTML = '';
  
    intress.forEach(intress => {
        output.innerHTML += `
        <div id="${intress.id}" class="border rounded bg-white p-2 d-flex justify-content-between align-items-center mb-2">
            <div>
                <h3>${intress.firstName} ${intress.lastName}</h3>
                <h4>${intress.email}</h4>
            </div>
            <button class="btn btn-default btn-sm btn-edit"><span class="glyphicon glyphicon-edit"></span>Edit</button>
            <button class="btn btn-danger">X</button>
        </div>
      `
    })
}
  
  listIntress();
  
  
regForm.addEventListener('submit', e => {
    e.preventDefault();
  
    validateNames('#firstName');
    validateNames('#lastName');
    validateEmail(email);

    if(validateEmail(email) && validateNames('#firstName') && validateNames('#lastName')) {
        
        let newIntress = {
            id: Date.now().toString(), 
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
        }
    
        intress.push(newIntress);
    
        listIntress();
    
        firstName.value = '';
        lastName.value = '';
        email.value = '';
    }
})
  
output.addEventListener('click', e => {
    if(e.target.classList.contains('btn-edit')) {
        // firstName.value = newIntress.firstName;
        // lastName.value = newIntress.lastName;
        // email.value = newIntress.email;
        // console.log(intress.findIndex(newIntress => e.target.parentNode.id))
        let a = intress.indexOf()
        console.log(a)
        

    }
})

output.addEventListener('click', e => {
    if(e.target.classList.contains('btn-danger')) {
        intress = intress.filter(newIntress => newIntress.id !== e.target.parentNode.id)
        listIntress();
    }
})