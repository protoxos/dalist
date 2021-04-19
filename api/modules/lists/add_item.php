<?php
    if(!isset($RequestData)) die(json_encode(['state' => 0, 'data' => 'Invalid accesss...']));

    require_once('./index.php');

    $time = time();
    $userId = $_SESSION['user-id'];
    $userId = $userId >= 1 ? $userId : 0;

    $ListId = $RequestData['ListId'];
    $ItemInfo = $RequestData['ItemInfo'];
    $ItemInfo['AddedTime'] = $time;
    $ItemInfo['ListId'] = $ListId;

    $sql = 'INSERT INTO Items (ListId, Name, Price, Quantity, Checked, AddedTime) VALUES(:ListId, :Name, :Price, :Quantity, :Checked, :AddedTime)';

    if(service_db_insert($sql, $ItemInfo) > 0) {
        $item = GetItemByTime($time);
        
        if ($item != null)
            service_end(Status::Success, $item);
    }
    
    service_end(Status::Error, 'No se pudo crear la lista');