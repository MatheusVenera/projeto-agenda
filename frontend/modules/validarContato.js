import validator from 'validator';

export default class Contato {
    constructor(formClass) {
        this.form = document.querySelector(formClass)
    };

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', e=> {
            e.preventDefault();
            this.validate(e);
        })
    }

    validate(e) {
        const el = e.target;
        const nomeInput = el.querySelector('input[name="nome"]');
        const sobrenomeInput = el.querySelector('input[name="sobrenome"]');
        const emailInput = el.querySelector('input[name="email"]');
        const telefoneInput = el.querySelector('input[name="telefone"]');
        let error = false;

        if(nomeInput.value === '') {
            alert('Você precisa digitar um nome para seu contato');
            error = true;
        }

        if(emailInput.value === '' && telefoneInput.value === '') {
            alert('Insira ao menos um contato, ou telefone ou email');
            error = true;
        }

        if((!emailInput.value === '') && !validator.isEmail(emailInput.value)) {
            alert('E-mail inválido');
            error = true;
        }
        if (String(telefoneInput.value).match(/[A-Za-z]/)) {
            alert('O telefone não pode contar letras');
            error = true;
        }

        if(!error) el.submit();
    }
};