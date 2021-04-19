<?php
    if(!isset($RequestData)) die(json_encode(['state' => 0, 'data' => 'Invalid accesss...']));

    require_once('./index.php');

    $time = time();
    $userId = $_SESSION['user-id'];
    $userId = $userId >= 1 ? $userId : 0;

    $listInfo = $RequestData['ListInfo'];
    $listInfo['UserId'] = $userId;
    $listInfo['CreationTime'] = $time;
    $listInfo['Name'] = $listInfo['Name'] == '' ? 'Sin nombre' : $listInfo['Name'];

    $sql = 'INSERT INTO List (UserId, Name, CreationTime, Protected) VALUES(:UserId, :Name, :CreationTime, :Protected)';

    if(service_db_insert($sql, $listInfo) > 0) {
        $list = GetListByTime($time);

        if($list != null)
            service_end(Status::Success, $list);
    }
    else
        service_end(Status::Error, 'No se pudo crear la lista');
        

