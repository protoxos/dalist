<?php
abstract class Param
{
    const Get = 0;
    const Post = 1;
    const Cookie = 2; 
    const Session = 3;
}
abstract class Status
{
    const Error = 0;
    const Success = 1;
    const Warning = 2;
    const Unknow = 3;
}


function service_end($status, $data)
{
    if( !is_int( $status ) )
        throw new Exception("El estado debe ser un numero entero", 1);
    
    header('Content-Type: application/json; charset=utf-8', true);
    die ( json_encode( [ 'status' => $status, 'data' => $data ] ) );
}
function service_match_param($name, $default = false)
{
    $val = service_get_param($name, Param::Get, false);
    $val = $val ?: service_get_param($name, Param::Post, false);
    $val = $val ?: service_get_param($name, Param::Cookie, false);
    $val = $val ?: service_get_param($name, Param::Session, false);

    return $val ?: $default;
}
function service_get_param($name, $type = Param::Get, $default = false)
{
    $val = $default;
    
    switch( $type )
    {
        case Param::Get:
            if( !empty( @$_GET[ $name ] ) )
                $val = $_GET[ $name ];
        
        case Param::Post:
            if( !empty( @$_POST[ $name ] ) )
                $val = $_POST[ $name ];
        
        case Param::Cookie:
            if( !empty( @$_COOKIE[ $name ] ) )
                $val = $_COOKIE[ $name ];
        
        case Param::Session:
            if( !empty( @$_SESSION[ $name ] ) )
                $val = $_SESSION[ $name ];
                
    }

    return $val;
}

function service_get_ip($full = false) {
    
    $ipaddress = '';
    if($full)
    {
        $ipaddress = @$_SERVER['HTTP_CLIENT_IP'] . ';' .
        $ipaddress .= @$_SERVER['HTTP_X_FORWARDED_FOR'] . ';' .
        $ipaddress .= @$_SERVER['REMOTE_ADDR'] . ';';
        $ipaddress .= @$_SERVER['HTTP_X_FORWARDED'] . ';';
        $ipaddress .= @$_SERVER['HTTP_FORWARDED_FOR'] . ';';
        $ipaddress .= @$_SERVER['HTTP_FORWARDED'];
    }
    else 
    {
        if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
        else if (isset($_SERVER['HTTP_CLIENT_IP']))
            $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
        else if(isset($_SERVER['HTTP_X_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
        else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
        else if(isset($_SERVER['HTTP_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_FORWARDED'];
        else if(isset($_SERVER['REMOTE_ADDR']))
            $ipaddress = $_SERVER['REMOTE_ADDR'];
    }
    return $ipaddress;
}