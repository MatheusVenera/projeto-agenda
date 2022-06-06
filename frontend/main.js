import 'core-js/stable';
import 'regenerator-runtime/runtime'
// import './assets/css/style.css';
import Login from './modules/validarLogin'
import Contato from './modules/validarContato'

const login = new Login('.form-login')
const cadastro = new Login('.form-cadastro')
login.init();
cadastro.init();

const cadastroContato = new Contato('.form-edit')
const editarContato = new Contato('.form-register')
cadastroContato.init();
editarContato.init();

