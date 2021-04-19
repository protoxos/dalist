<?php

    $id = service_get_param('user-id', Param::Session, '');

    $uinfo = service_db_select('SELECT Username, Firstname, Lastname, Email FROM Users WHERE Id = :Id', ['Id' => $id]);

    if (count($uinfo) > 0)
        service_end(Status::Success, $uinfo);
    else
        service_end(Status::Warning, 'No hay sesión iniciada');