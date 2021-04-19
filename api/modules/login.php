<?php

    $user = $RequestData['Username'];
    $pass = $RequestData['Password'];

    if(!empty($user) && !empty($pass)) {

        $uinfo = service_db_select('SELECT Id, Username, Password, Firstname, Lastname, Email FROM Users WHERE Username = :user', [
            'user' => $user
        ])[0];

        if(password_verify($pass, $uinfo['Password'])) {
            $_SESSION['user-id'] = $uinfo['Id'];
            unset($uinfo['Password']);
            service_end(Status::Success, $uinfo);
        }
    }
    
    service_end(Status::Error, 'Datos incorrectos');