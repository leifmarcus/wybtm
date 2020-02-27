<?php
include_once(__DIR__.'/../header.php');
include_once(__DIR__.'/../utils/location.php');

$ip = get_client_ip();

echo json_encode(array('ip' => $ip));
