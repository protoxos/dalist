Vue.component('list-component', {
    template: TemplateListComponent,
    data() {
        const that = this;
        return {
            items: [],
            debounce: null,
            options: {
                onDragend(event) {
                    setTimeout(() => {
                        that.saveOrder();
                    }, 300);
                }
            }
        };
    },
    methods: {
        onCreateItem(item) {
            item.order = this.items.length - 1;
            this.items.push(item);
        },
        remove(id) {
            const hash = currentHash();
            const item = this.items.find(f => f.id == id);
    
            $.ajax({
                url: this.url,
                method: 'POST',
                data: { 
                    action: 'remove',
                    list_hash: hash,
                    item: JSON.stringify(item)
                }, 
                success: res => {
                    if(res.status == 1 && res.data) {
                        let index = -1;
                        this.items.forEach((f, i) => {
                            if(f.id == id)
                                index = i;
                        });

                        if(index >= 0)
                            this.items.splice(index, 1);

                    }
                }
            });
        },
        getList() {
            const hash = currentHash();
    
            $.ajax({
                url: this.url,
                method: 'POST',
                data: { 
                    action: 'list',
                    list_hash: hash
                }, 
                success: res => {
                    if(res.status == 1) {
                        this.items = res.data;
                    }
                }
            });
        },
        save(id, e) {

            const keycode = e.keyCode;
            const valid = 
                (keycode > 47 && keycode < 58)   || // number keys
                keycode == 32 || keycode == 13 || keycode == 8   || // spacebar & return key(s) (if you want to allow carriage returns)
                (keycode > 64 && keycode < 91)   || // letter keys
                (keycode > 95 && keycode < 112)  || // numpad keys
                (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
                (keycode > 218 && keycode < 223);   // [\]' (in order)

            if(!valid) return;

            this._save(id);

        },
        saveOrder() {
            const hash = currentHash();

            const orders = document.querySelectorAll('[sortid]');
            const it = this.items.map(m => { 
                let o = 0;
                orders.forEach((f, i) => {
                    if(f.getAttribute('sortid') == m.id)
                        o = i;
                });
                return {
                    id: m.id,
                    name: m.name,
                    quantity: m.quantity,
                    price: m.price,
                    order: o
                };
            });

            $.ajax({
                url: this.url,
                method: 'POST',
                data: { 
                    action: 'order',
                    list_hash: hash,
                    orders: JSON.stringify(it)
                }
            });
        },
        change(id) {
            this._save(id);
        },
        setPrice(id) {
            this.items.forEach((f, i) => {
                if(f.id == id) {
                    this.items[i].price = f.price / f.quantity;
                }
            });

            this._save(id);
        },
        _save(id) {
            this.debounce = setTimeout(() => {

                const hash = currentHash();
                const item = this.items.find(f => f.id == id);
        
                $.ajax({
                    url: this.url,
                    method: 'POST',
                    data: { 
                        action: 'save',
                        list_hash: hash,
                        item: JSON.stringify(item)
                    }
                });

            }, 1000);
        }
    },
    computed: {
        total: {
            get() {
                let total = 0;
                this.items.forEach(item => {
                    total += item.quantity * item.price;
                });
                return total;
            }
        },
        url: {
            get() {
                let url = currentUrl();
                url = url.substring(0, url.indexOf('index.php?'));
                url += 'api/';

                return url;
            }
        }
    },

    created(){
        this.getList();
    }
});