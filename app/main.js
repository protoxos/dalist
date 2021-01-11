Vue.use(VueDraggable.default);
Vue.use(Toasted);

const app = new Vue({
    el: '#listy-app',
    data() {
        return {
            title: 'Listas'
        }
    },
    computed: {
        canShare: {
            get() {
                if(navigator.share) return true;
                return false;
            }
        }
    },
    methods: {
        share() {
            if (navigator.share) { 
                navigator.share({
                    title: 'Share list',
                    url: currentUrl()
                })
                .then(() => {})
                .catch(console.error);
            } else {
                shareDialog.classList.add('is-open');
            }
        },
        renew() {
            location.href = 'index.php';
        }
    }
});

