let intress = [
    {
      id: '1', 
      firstName: 'Tora',
      lastName: 'Svensson',
      email: 'ToraS@mail.com',
    },
    {
      id: '2', 
      firstName: 'Wilhelm',
      lastName: 'Ljungqvist',
      email: 'Wilhelm@mail.com',
    },
]
  
const form = document.querySelector('#regForm');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const output = document.querySelector('#intress');  
let savedId;

// VALIDERAR FÖR OCH EFTERNAMN
const validateNames = (names) => {
    let input = document.querySelector(names);

    if(input.value.trim() === '') {                                                         //KOLLAR OM INMATNINGEN ÄR TOM
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

  //VALIDERAR EFTERNAMN
const validateEmail = (_email) => {
    if(_email.value.trim() === ''){                                                         //KOLLAR OM INMATNINGEN ÄR TOM
        _email.classList.remove('is-valid');
        _email.classList.add('is-invalid');
        document.getElementById("emailError").innerHTML = "Email can not be empty";
        _email.focus();
        return false;
    }
    else if(/^\w+@[a-zA-Z]+?\.[a-zA-Z-]{2,}$/.test(_email.value)) {                         //KOLLAR OM INMATNINGEN HAR GODKÄNDA SYMBOLER
        for(i=0; i<intress.length; i++){
            if(_email.value === intress[i].email){
                _email.classList.remove('is-valid');
                _email.classList.add('is-invalid');
                document.getElementById("emailError").innerHTML = "Email has to be unique";
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
        document.getElementById("emailError").innerHTML = "Please enter a valid email";
        _email.focus();
        return false;
    }
}

const listIntress = () => {                                                                 //SKAPAR HTML KOD AV OBJEKTEN I ARRAYEN
    output.innerHTML = '';
    intress.forEach(intress => {
        output.innerHTML += `
        <div id="${intress.id}" class="border rounded bg-white p-2 d-flex justify-content-between align-items-center mb-2">
            <div>
                <h3>${intress.firstName} ${intress.lastName}</h3>
                <small>${intress.email}</small>
            </div>
            <div>
                <button class="btn btn-default btn-sm btn-edit">Edit</button>
                <button class="btn btn-danger">X</button>
            </div>
        </div>
      `
    })
}
listIntress();
  
  
regForm.addEventListener('click', e => {
    e.preventDefault();
    let tempValiEmail = false;

    if(e.target.parentNode.innerText === 'Submit'){                                                 //KOLLAR OM TEXTEN PÅ KNAPPEN ÄR "SUBMIT"
        validateNames('#firstName');
        validateNames('#lastName');
        validateEmail(email);

        if(validateEmail(email) && validateNames('#firstName') && validateNames('#lastName')) {     //KONTROLLERAR ALL INMATNING OCH SKAPAR ISF ETT NYTT OBJEKT
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
        else{
            return
        }
    }
    else if(e.target.parentNode.innerText === 'Save'){                                              //KOLLAR OM TEXTEN PÅ KNAPPEN ÄR "SAVE"
        validateNames('#firstName');
        validateNames('#lastName');
        for(i=0; i<intress.length; i++){
            if(intress[i].id === savedId){                                                          //LOOPAR IGENOM OCH KOLLAR SÅ EMAILEN ÄR UNIK OCH VALIBEL
                if(email.value !== intress[i].email){
                    tempValiEmail = validateEmail(email);
                    i = intress.length;
                }
                else{
                    tempValiEmail = true;
                    email.classList.add('is-valid');
                    email.classList.remove('is-invalid');
                    i = intress.length;
                }
            }
            
        }
    
        if(tempValiEmail && validateNames('#firstName') && validateNames('#lastName')) {            //KONTROLLERAR ALLA VÄRDEN OCH SPARAR OBJEKTET MED SAMMA ID SOM TIDIGARE
            let editIntress = { 
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
            }
            for(i=0; i<intress.length; i++){
                if(intress[i].id === savedId){
                    intress[i].firstName = editIntress.firstName;
                    intress[i].lastName = editIntress.lastName;
                    intress[i].email = editIntress.email;
                    i = intress.length;
                }
            }
            listIntress();

            firstName.value = '';
            lastName.value = '';
            email.value = '';
            tempValiEmail = false;
            document.getElementById("submitSave").innerHTML = "Submit";
        }
    }
    
})
  
output.addEventListener('click', e => {
    if(e.target.classList.contains('btn-edit')) {                                                   // KOLLAR OM KNAPPTRYCKNINGEN ÄR PÅ EDIT
        document.getElementById("submitSave").innerHTML = "Save";                                   // ÄNDRAR SUBMITSAVE-KNAPPEN TILL SAVE

        for(i=0; i<intress.length; i++){
            if(intress[i].id === e.target.parentNode.parentNode.id){
                firstName.value = intress[i].firstName;
                lastName.value = intress[i].lastName;
                email.value = intress[i].email;
                savedId = intress[i].id;
            }
        }
    }
})


output.addEventListener('click', e => {                                                             // TAR BORT OBJEKT FRÅN ARRAYEN
    if(e.target.classList.contains('btn-danger')) {
        intress = intress.filter(newIntress => newIntress.id !== e.target.parentNode.parentNode.id)
        listIntress();
    }
})

