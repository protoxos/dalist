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
                this.copyUrl();

                Vue.toasted.show( 'Url copiada', {
                    position: "top-right", 
                    duration : 2000,
                    action : [
                        {
                            text : 'x',
                            onClick : (e, toastObject) => {
                                toastObject.goAway(0);
                            }
                        }
                    ]
                });
            }
        },
        renew() {
            location.href = 'index.php';
        },
        copyUrl() {
            const el = document.createElement('textarea');
            el.value = window.location.href;
            el.setAttribute('readonly', '');
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            const selected =  document.getSelection().rangeCount > 0  ? document.getSelection().getRangeAt(0) : false;
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            if (selected) {
              document.getSelection().removeAllRanges();
              document.getSelection().addRange(selected);
            }
        }
    }
});

