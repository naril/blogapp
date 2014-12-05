<?php

require 'vendor/autoload.php';

define("SERVER_NAME","wm76.wedos.net");
define("USER_NAME","w84394_7528bec");
define("PASSWORD","pxbh5bH8");
define("MY_DB","d84394_7528bec");

$app = new \Slim\Slim();

//snaha DI, zatim vraci null , proc ?
$app->container->singleton('db', function () {
                return new mysqli(SERVER_NAME, USER_NAME, PASSWORD, MY_DB);
});

$app->add(new \Slim\Middleware\ContentTypes());

$app->get('/clanky', function () use ($app) {
  
    //vraci vsechny clanky
    $res = array();

    $data = mysqli_query($app->db,"SELECT * from clanky");
    while($row = mysqli_fetch_array($data, MYSQL_ASSOC)) {
            array_push($res,json_encode($row));
    }

    $app->response->headers->set('Content-Type', 'application/json');
    $app->response->body(json_encode($res));
}); 

$app->get('/clanky/:pocet', function ($pocet) use ($app) {
    //vraci urcity pocet clanku
    $res = array();
    $querry = "SELECT * from clanky LIMIT ". $pocet;
    $data = mysqli_query($app->db,$querry);
    while($row = mysqli_fetch_array($data, MYSQL_ASSOC)) {
            array_push($res,json_encode($row));
    }

    $app->response->headers->set('Content-Type', 'application/json');
    $app->response->body(json_encode($res));
});

$app->get('/clanky/clanek/:id', function ($id) use ($app) {
    //vraci clanek :id
    $res = array();
    $querry = "SELECT * from clanky WHERE id='". $id . "'";
    $data = mysqli_query($app->db,$querry);
    while($row = mysqli_fetch_array($data, MYSQL_ASSOC)) {
            array_push($res,json_encode($row));
    }

    $app->response->headers->set('Content-Type', 'application/json');
    $app->response->body(json_encode($res));
});

$app->get('/clanky/clanek/:id/komentare', function ($id) use($app) {
    //vraci komentare k clanku :id
    $res = array();
    $querry = "SELECT * from komentare WHERE id_clanku='". $id . "'";
    $data = mysqli_query($app->db,$querry);
    while($row = mysqli_fetch_array($data, MYSQL_ASSOC)) {
            array_push($res,json_encode($row));
    }

    $app->response->headers->set('Content-Type', 'application/json');
    $app->response->body(json_encode($res));
});

$app->get('/section/:name', function ($name) use($app) {
    //vraci urcitou sekci
    $res = array();
    $querry = "SELECT * from sekce WHERE name='". $name . "'";
    $data = mysqli_query($app->db,$querry);
    while($row = mysqli_fetch_array($data, MYSQL_ASSOC)) {
            array_push($res,json_encode($row));
    }

    $app->response->headers->set('Content-Type', 'application/json');
    $app->response->body(json_encode($res));
});

$app->post('/clanky/clanek/:id/komentare/add', function ($id) use($app) {
    //pridava komentar ke clanku
    $data = $app->request->getBody();
    $querry = "INSERT INTO komentare(`id_clanku`,`jmeno`,`text`) VALUES('". $id . "','". $data["jmeno"] ."','". $data["text"] ."')";
    $data = mysqli_query($app->db,$querry);
});

$app->run();
