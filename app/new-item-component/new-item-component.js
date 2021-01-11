Vue.component('new-item-component', {
    template: TemplateNewItemComponent,
    data() {
        return {
            item: {
                id: 0,
                name: '',
                quantity: 1,
                price: 0,
                order: 0
            }
        };
    },
    methods: {
        save() {
            if(!this.showAdditional)
                return;
            const that = this;

            let url = currentUrl();
            url = url.substring(0, url.indexOf('index.php?'));
            url += 'api/';

            const hash = currentHash();

            $.ajax({
                url,
                method: 'POST',
                data: { 
                    action: 'save',
                    list_hash: hash,
                    item: JSON.stringify(this.item)
                },
                success: res => {
                    if(res.status == 1) {
                        const item = Object.assign({}, that.item);
                        item.id = res.data;

                        that.item.name = '';
                        that.item.quantity = 1;
                        that.item.price = 0;

                        that.$emit('onCreateItem', item);

                        Vue.toasted.show( 'Producto agregado', {
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
                        })
                    }
                }
            });
        }
    },
    computed: {
        showAdditional: {
            get() {
                const textLen = this.item.name.length;
                if(textLen < 1) {
                    this.item.quantity = 1;
                    this.item.price = 0;
                }
                return textLen > 0;
            }
        }
    }
});