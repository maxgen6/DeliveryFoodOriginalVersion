const sendForm = () => {
    const errorMessage = 'Что-то пошло не так',
        loadMessage = 'Загрузка...',
        succesMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const form = document.querySelector('.form'),
        statusMessage = document.createElement('div');
    
    statusMessage.style.cssText = 'font-size: 2rem; color: black;';

    const validate = () => {
        let formName = document.querySelector('.form-name'),
            formMail = document.querySelector ('.form-email'),
            formPhone = document.querySelector('.form-phone');
        
        formName.addEventListener('input', () => {
            formName.value = formName.value.replace(/\w/gi, '');
        });
        formMail.addEventListener('input', () => {
            formMail.value = formMail.value.replace(/\w/gi, '');
        });
        formPhone.addEventListener('input', () => {
            formPhone.value = formPhone.value.replace(/\D/g,'');
        });
    };
    // validate();
     
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        form.appendChild(statusMessage);
        statusMessage.textContent  = loadMessage;

        const formData = new FormData(form);

        let body = {};

        formData.forEach((val, key) => {
            body[key] = val;
        });
        postData(body)
            .then((response) => {
                if(response.status === 405){
                    throw new Error('status network not 200');
                }
                statusMessage.textContent = succesMessage;
            })
            .catch((error) => {
                statusMessage.textContent = errorMessage;
                console.log(error);
            });
    });

    const postData = (body) => {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
            credentials: 'include'
        });
    }


};
sendForm();