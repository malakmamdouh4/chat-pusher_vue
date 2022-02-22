/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
import { createApp   } from "vue";

import ExampleComponent from './components/ExampleComponent.vue' ;
import ChatMessages from './components/ChatMessages.vue' ;
import ChatForm from './components/ChatForm.vue' ;


 const app = createApp({
    components: {
        ExampleComponent , ChatMessages , ChatForm
    }
}).mount('#app');


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

app.component('example-component', require('./components/ExampleComponent.vue').default);
app.component('chat-messages', require('./components/ChatMessages.vue').default);
app.component('chat-form', require('./components/ChatForm.vue').default);




/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

new Vue({
    el: '#app',
    data: {
        messages: []
    },
    created() {
        this.fetchMessages();
        window.Echo.private('chat')
            .listen('.App.Events.MessageSent', (e) => {
                this.messages.push({
                    message: e.message.message,
                    user: e.user
                });
            });
    },
    methods: {
        fetchMessages() {
            axios.get('/messages').then(response => {
                this.messages = response.data;
            });
        },
        addMessage(message) {
            this.messages.push(message);
            axios.post('/messages', message).then(response => {
                console.log(response.data);
            });
        }
    }
});
