<?php 
if(@$_GET['list'] != '') {
    require_once('renders.php');
} else {
    $id = 'Location: index.php?list=' . uniqid() . bin2hex(random_bytes(10));
    header($id);
    exit();
}
