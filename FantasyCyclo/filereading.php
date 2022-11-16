<?php
    $myfile = fopen("./assets/testing.txt", "r") or die("Unable to open file!");
    while(!feof($myfile)) {
        $position = fgets($myfile);
        $info = explode(" ", fgets($myfile));
        $team = fgetcsv($myfile);
    }
    fclose($myfile);
