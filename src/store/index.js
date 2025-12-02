import {createStore} from "vuex";
import forms from '../data/forms.json';
export default createStore({
    state(){
        return{

            forms: forms
        }
    },
    mutations:{
        saveForm(state, payload) {
            state.forms[payload.formName] = payload.formItems;
        }

    }
})