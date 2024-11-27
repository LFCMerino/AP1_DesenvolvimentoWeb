document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('messageError').textContent = '';

    let isValid = true;

   
    const name = document.getElementById('name').value.trim();
    if (name === '') {
      document.getElementById('nameError').textContent = 'O nome é obrigatório.';
      isValid = false;
    }

    
    const email = document.getElementById('email').value.trim();
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (email === '') {
      document.getElementById('emailError').textContent = 'O e-mail é obrigatório.';
      isValid = false;
    } else if (!emailPattern.test(email)) {
      document.getElementById('emailError').textContent = 'Por favor, insira um e-mail válido.';
      isValid = false;
    }

    
    const message = document.getElementById('message').value.trim();
    if (message === '') {
      document.getElementById('messageError').textContent = 'A mensagem é obrigatória.';
      isValid = false;
    }

    
    if (isValid) {
      alert('Formulário enviado com sucesso!');
      
      document.getElementById('contactForm').reset(); 
    }
  });