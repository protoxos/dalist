<?php
    if(!isset($RequestData)) die('Invalid accesss...');

    unset($_SESSION['user-id']);

    service_end(Status::Success, 'Su sesión ha finalizado');