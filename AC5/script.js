const form = document.getElementById('contactForm');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const validarNome = document.getElementById('name');
    if (validarNome.value === ''){
        alert('Preencha o campo Nome!');
        validarNome.focus();
        return false;
    }
    const validarEmail = document.getElementById('email');
    if (validarEmail.value === ''){
        alert('Preencha o campo Email!');
        return false;
    }
    const validarMensagem = document.getElementById('message');
    if (validarMensagem.value === ''){
        alert('Preencha o campo Mensagem!');
        return false;
    }

    form.submit();

});

