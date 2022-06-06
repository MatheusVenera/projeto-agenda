import validator from 'validator';

export default class Login {
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
        const emailInput = el.querySelector('input[name="email"]');
        const senhaInput = el.querySelector('input[name="senha"]');
        let error = false;

        if(!validator.isEmail(emailInput.value)) {
            alert('E-mail inválido');
            error = true;
        }
    
        if (senhaInput.length < 3 || senhaInput.length > 50) {
            alert('Senha inválida');
            error = true;
        };

        if(!error) el.submit();
    }
};