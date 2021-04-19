<?php
    if(!isset($RequestData)) die(json_encode(['state' => 0, 'data' => 'Invalid accesss...']));

    require_once('./index.php');

    service_end(Status::Success, GetUserLists());