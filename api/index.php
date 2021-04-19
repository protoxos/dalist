<?php

    session_start();

    require_once('cfg.php');
    require_once('functions.php');
    require_once('db.php');    

    $RequestData = json_decode(file_get_contents('php://input'), true);

    $action = $RequestData['action'];
    $load = @$_GET['load'];

    if($action == 'create_acount')
        require_once('./modules/create_account.php');

    elseif($action == 'get_logged_user') 
        require_once('./modules/get_logged_user.php');

    elseif($action == 'logout') 
        require_once('./modules/logout.php');

    elseif($action == 'login') 
        require_once('./modules/login.php');

    elseif($action == 'create_list') 
        require_once('./modules/lists/create_list.php');

    elseif($action == 'add_item') 
        require_once('./modules/lists/create_list.php');

    elseif($action == 'get_user_lists') 
        require_once('./modules/lists/get_user_lists.php');
    
    elseif($load >= 1) 
        require_once('./modules/lists/load_list.php');

    else
        service_end(Status::Error, 'No se pudo completar su petición');


    // $list_hash = service_match_param('list_hash', '');
    // $item = service_match_param('item', '');
    // $orders = service_match_param('orders', '');

    // // Si el hash no es valido, terminamos
    // if(!ctype_xdigit($list_hash))
    //     service_end(Status::Error, 'No se puede procesar tu solicitud. Hash corrupto.');

    // // Obtenemos el id del hash
    // $list_id = service_db_select(
    //     'SELECT id FROM listy_list WHERE hash = :hash',
    //     [ 'hash' => $list_hash ]
    // );

    // if( $list_id != null && count($list_id) >= 1 )
    //     $list_id = $list_id[0]['id'];

    // //  Si no existe el hash, lo creamos...
    // else {
    //     service_db_insert(
    //         'INSERT INTO listy_list(hash) VALUES(:hash)',
    //         [ 'hash' => $list_hash ]
    //     );

    //     $list_id = service_db_select(
    //         'SELECT id FROM listy_list WHERE hash = :hash',
    //         [ 'hash' => $list_hash ]
    //     );


    //     if( $list_id != null && count($list_id) >= 1 )
    //         $list_id = $list_id[0]['id'];
    //     else
    //         service_end(Status::Error, 'No se puede procesar tu solicitud' . service_db_error()[2]);
    // }

    // if($action == 'list') {
        
    //     $result = service_db_select(
    //         'SELECT 
    //             id,
    //             name,
    //             quantity,
    //             price,
    //             `order`,
    //             `check`
    //         FROM
    //             listy_items
    //         WHERE list_id = :list_id
    //         ORDER BY `check` ASC, `order` ASC',
    //         [ 'list_id' => $list_id ]
    //     );

    //     service_end(Status::Success, !empty($result) ? $result : []);

    // } 
    // else if($action == 'save' && $item != '') {
    //     $item = json_decode($item);

    //     $exists = service_db_select(
    //         'SELECT id
    //         FROM
    //             listy_items
    //         WHERE
    //             list_id = :list_id
    //             AND id = :id',
    //         [ 
    //             'list_id' => $list_id,
    //             'id' => $item->id
    //         ]
    //     );

    //     if( $exists != null && count( $exists ) >= 1 )
    //         service_db_insert(
    //             'UPDATE listy_items 
    //             SET
    //                 name = :name,
    //                 quantity = :quantity,
    //                 price = :price,
    //                 `check` = :check
    //             WHERE
    //                 id = :id',
    //             [ 
    //                 'id' => $item->id,
    //                 'name' => $item->name,
    //                 'quantity' => $item->quantity,
    //                 'price' => $item->price,
    //                 'check' => $item->check
    //             ]
    //         );
    //     else
    //         service_db_insert(
    //             'INSERT listy_items(name, list_id, quantity, price, creation_time)
    //             VALUES(:name, :list_id, :quantity, :price, :ct)',
    //             [ 
    //                 'name' => $item->name,
    //                 'list_id' => $list_id,
    //                 'quantity' => $item->quantity,
    //                 'price' => $item->price,
    //                 'ct' => time()
    //             ]
    //         );
    //     $item_id = service_db_select(
    //         'SELECT LAST_INSERT_ID() AS id'
    //     )[0]['id'];

    //     service_end(Status::Success, $item_id);
    // }

    // else if($action == 'remove' && $item != '') {
    //     $item = json_decode($item);

    //     service_db_insert(
    //         'DELETE FROM listy_items
    //         WHERE
    //             list_id = :list_id
    //             AND id = :id',
    //         [ 
    //             'list_id' => $list_id,
    //             'id' => $item->id
    //         ]
    //     );

    //     $exists = service_db_select(
    //         'SELECT id
    //         FROM
    //             listy_items
    //         WHERE
    //             list_id = :list_id
    //             AND id = :id',
    //         [ 
    //             'list_id' => $list_id,
    //             'id' => $item->id
    //         ]
    //     );

    //     service_end(Status::Success, !($exists != null && count($exists) >= 1) );
    // }

    // else if($action == 'order' && $orders != '') {

    //     $orders = json_decode($orders, true);        
    //     foreach($orders as $o){
    //         service_db_insert(
    //             'UPDATE listy_items 
    //             SET `order` = :order
    //             WHERE
    //                 list_id = :list_id
    //                 AND id = :id',
    //             [ 
    //                 'list_id' => $list_id,
    //                 'order' => $o['order'],
    //                 'id' => $o['id']
    //             ]
    //         );
    //     }
    //     service_end(Status::Success, true);
    // }