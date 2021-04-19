<?php
    if(!isset($RequestData)) die(json_encode(['state' => 0, 'data' => 'Invalid accesss...']));
    
    function GetListByTime($time) {

        $userId = @$_SESSION['user-id'];
        $userId = $userId >= 1 ? $userId : 0;
        $list = service_db_select('SELECT * FROM List WHERE CreationTime = :time AND UserId = :UserId', ['time' => $time, 'UserId' => $userId]);

        if (count($list) > 0) {
            $list = $list[0];
            $list['Items'] = GetItems($list['Id']);
        }

        else
            $list = null;
        
        return $list;
    }

    function GetUserLists() {
        $userId = @$_SESSION['user-id'];
        
        if($userId >= 1) {

            $lists = service_db_select('SELECT * FROM List WHERE UserId = :UserId', ['UserId' => $userId]);

            foreach($lists as &$list)
                $list['Items'] = GetItems($list['Id']);

            return $lists;
        }

        return [];
    }

    function GetListById($listId) {

        $userId = @$_SESSION['user-id'];
        $userId = $userId >= 1 ? $userId : 0;
        $list = service_db_select('SELECT * FROM List WHERE Id = :listId AND (UserId = :UserId OR UserId = 0)', ['listId' => $listId, 'UserId' => $userId]);

        if (count($list) > 0) {
            $list = $list[0];
            $list['Items'] = GetItems($list['Id']);
        }

        else
            $list = null;
        
        return $list;
    }

    function GetItems($listId) {
        return service_db_select('SELECT * FROM Items WHERE ListId = :ListId', ['ListId' => $listId]);
    }

    function GetItemByTime($time) {
        $item = service_db_select('SELECT * FROM Items WHERE AddedTime = :AddedTime', ['AddedTime' => $time]);
        if (count($item) >= 1)
            return $item[0];
            
        return null;
    }