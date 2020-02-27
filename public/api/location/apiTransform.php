<?php
include_once(__DIR__.'/../utils/ip.php');
include_once(__DIR__.'/../utils/request.php');

function getApi($ip) {
    $apiUrls = array(
        'ipinfo.io' => 'https://ipinfo.io/json',
        'geoiplookup.io' => "https://json.geoiplookup.io/{$ip}",
        'ip-api.com' => "http://ip-api.com/json/{$ip}?fields=status,message,continent,country,countryCode,region,regionName,city,zip,lat,lon,timezone,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query"
    );

    $randIndex = array_rand($apiUrls);

    return [$randIndex, $apiUrls[$randIndex]];
}

$apiTransformSchemas = array(
    'ipinfo.io' => array(
        "ip" => "ip",
        "city" => "city",
        "region" => "region",
        "country" => "contryCode",
        "loc" => "location",
        "org" => "org",
        "postal" => "zip",
        "timezone" => "timezone",
    ),
    'geoiplookup.io' => array(
        "ip" => "ip",
        "isp" => "isp",
        "org" => "org",
        "latitude" => "lat",
        "longitude" => "long",
        "postal_code" => "zip",
        "city" => "city",
        "country_code" => "contryCode",
        "country_name" => "contry",
        "continent_code" => "continentCode",
        "continent_name" => "continent",
        "timezone_name" => "timezone",
        "connection_type" => "connectionType",
        "currency_name" => "currency",
    ),
    'ip-api.com' => array(
        "query" => "ip",
        "isp" => "isp",
        "org" => "org",
        "latitude" => "lat",
        "longitude" => "long",
        "postal_code" => "zip",
        "city" => "city",
        "country_code" => "contryCode",
        "country_name" => "country",
        "continent" => "continent",
        "timezone_name" => "timezone",
        "connection_type" => "connectionType",
        "currency_name" => "currency",
        "region" => "region"
    ),
);

function transformApiResponse( $apiSchema, $response ) {
    $transformed = array();
    foreach ($apiSchema as $key => $transformedKey) {
        $transformed[$transformedKey] = $response[$key];
    }
    return $transformed;
}


function getLocationInfos () {
    global $apiTransformSchemas;

    $id = isset($_GET['ip']) ? $_GET['ip'] : get_client_ip();

    list($apiName, $apiURI) = getApi($id);

    $response = callAPI('GET', $apiURI);

    print_r($response);

    return transformApiResponse($apiTransformSchemas[$apiName], $response);
}
