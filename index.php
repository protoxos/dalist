<?php require_once('core/init.php'); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Listas</title>
    <link rel="stylesheet" href="app/main.css">
    <link rel="stylesheet" href="vendor/fontawesome-6/css/all.min.css">
    <link rel="icon" type="image/png" href="favicon.png">
    <?php Renders::CSSComponents(); ?>    
</head>
<body>
    
    <div id="listy-app"> 
        <h1>
            <span>{{title}}</span>
            <span v-on:click="share()" :class="'fas ' + (canShare ? 'fa-share-alt' : 'fa-copy') + ' icon'"></span>
            <span v-on:click="renew()" class="fas fa-plus add"></span>
        </h1>
        <list-component></list-component>
    </div>

    <script>

        function currentUrl() {
            return '<?=(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"?>'
        }
        function currentHash() {
            return '<?=@$_GET['list']?>';
        }
        function post(url, data, callback) {
            const xhttp = new XMLHttpRequest();

            // data = Object.keys(data).map(function(k) {
            //     return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            // }).join('&')

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200)
                    if(typeof(callback) == 'function')
                        callback(JSON.parse(this.responseText));
            };
            xhttp.open('POST', url, true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.send(JSON.stringify(data));
        }
    </script>
    
    <script src="vendor/vue.min.js"></script>
    <script src="vendor/vue-draggable.js"></script>
    <script src="vendor/vue-toasted.min.js"></script>
    <!-- <script src="vendor/vuedraggable.umd.min.js"></script>-->
    <script src="vendor/jquery-3.5.1.min.js"></script>
    <script>
        <?php Renders::JSTemplateComponentsVar(); ?>
    </script>
    <?php Renders::JSComponents(); ?>
    <script src="app/main.js"></script>

    
</body>
</html>