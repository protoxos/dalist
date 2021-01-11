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
                        // Una pachequez para limpiar los 0s demas en el precio y cantidad...
                        this.items = res.data.map(m => {
                            m.quantity = this.ToSelfFixed(m.quantity);
                            m.price = this.ToSelfFixed(m.price);
                            return m;
                        });
                    }
                }
            });
        },
        ToSelfFixed(num) {
            if(num.toString().indexOf('.') == -1)
                return num;
                
            // con la update, nos llegan 0.0000
            let toIndex = 4;
            let end = false;
            let deci = num.toString().split('.');

            deci[1]
                .split('')
                .reverse()
                .forEach(v => {
                    if(v == '0' && end == false)
                        toIndex--;
                    else
                        end = true;
                });
            deci[1] = deci[1].substring(0, toIndex);
            num = deci[0] + (deci.length > 0 ? '.' + deci[1] : '');

            return num * 1;
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
        
        checkItem(id) {
            this._save(id, true);
        },
        setPrice(id) {
            this.items.forEach((f, i) => {
                if(f.id == id) {
                    this.items[i].price = f.price / f.quantity;
                }
            });

            this._save(id);
        },
        _save(id, isChecking) {
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
                    },
                    success: data => {
                        //  Si todo sale bien...
                        if(data.status == 1 && isChecking) {
                            //  Si es asi, topeguay! lo ordenamos
                            let currentIndex = -1;
                            let newIndex = -1;
                            let reord = false;
                            
                            //  Conseguimos el item actual y el primer marcado
                            this.items.forEach((f, i) => {
                                // busco el item actual
                                if(f.id == item.id)
                                    currentIndex = i;

                                else if(f.check && newIndex == -1) {
                                    if(i > 0)
                                        newIndex = i - 1;
                                }
                            });

                            // Checamos el estatus del check de item
                            if(item.check) {
                                //  Si lo marcaron, lo colocamos al principio de los marcados...
                                if(currentIndex > -1) {

                                    if( newIndex == -1 ) newIndex = this.items.length - 1;

                                    const ci = this.items[currentIndex];
                                    
                                    this.items.splice(currentIndex, 1);
                                    this.items.splice(newIndex, 0, ci);
                                    reord = true;
                                }
                            } else {

                                const ci = this.items[currentIndex];
                                this.items.splice(currentIndex, 1);
                                this.items.unshift(ci);
                                reord = true;

                            }

                            //  Si se cambió el orden, lo guardamos.
                            if(reord)
                                this.saveOrder();

                        }
                    }
                });

            }, 

            //  Si se esta unicamente checkeando, no se espera nada...
            isChecking === true ? 0 : 1000);
        }
    },
    computed: {
        totalcheck: {
            get() {
                let total = 0;
                this.items.forEach(item => {
                    if(item.check)
                        total += item.quantity * item.price;
                });
                return this.ToSelfFixed(total);
            }
        },
        totalall: {
            get() {
                let total = 0;
                this.items.forEach(item => {
                    total += item.quantity * item.price;
                });
                return this.ToSelfFixed(total);
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