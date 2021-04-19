<?php

    $user = service_get_param('Username', Param::Post, '');
    $pass = service_get_param('Password', Param::Post, '');
    $fname = service_get_param('Firstname', Param::Post, '');
    $lname = service_get_param('Lastname', Param::Post, '');
    $email = service_get_param('Email', Param::Post, '');

    if(!empty($user) && !empty($pass)) {

        $uinfo = service_db_select('SELECT * FROM Users WHERE Username = :user', [
            'user' => $user
        ]);

        if(count($uinfo) > 0)
            service_end(Status::Error, 'El usuario ' . $user . ' ya está en uso');

        else {
            
            $insertQuery = 'INSERT INTO Users (Username, Firstname, Lastname, Password, Email) VALUES (:Username, :Firstname, :Lastname, :Password, :Email)';
            $insertParams = [ 'Username' => $user, 'Firstname' => $fname, 'Lastname' => $lname, 'Password' => password_hash( $pass, PASSWORD_BCRYPT ), 'Email' => $email ];

            if(service_db_insert($insertQuery, $insertParams)) {
                $uinfo = service_db_select('SELECT Id, Username, Firstname, Lastname, Email FROM Users WHERE Username = :user', [
                    'user' => $user
                ]);

                #   Cerramos la sesión actual
                unset($_SESSION['user-id']);

                service_end(Status::Success, $uinfo);
            }

            else
                service_end(Status::Error, 'No se pudo crear el usuario, intente mas tarde...');
        }
    }

    else
        service_end(Status::Error, 'Ingrese los campos requeridos');