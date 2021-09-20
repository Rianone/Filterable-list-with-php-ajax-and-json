<?php
header("Content-Type: application/json; charset=UTF-8");

if(isset($_GET["name"]) && isset($_GET["number"]))
{

   $file = fopen("contacts.json","r+");

   $content = fread($file,1000);
   $new_obj = [
      "name"=> $_GET["name"],
      "number"=>$_GET["number"]
   ];

   $array = json_decode($content);
   array_push($array,$new_obj);

   $input = json_encode($array);
   fclose($file);
   $write = fopen("contacts.json","w");
   fwrite($write,$input);
   echo $input;
}
else{
   $write = fopen("contacts.json","w");
   fwrite($write,"[]");
   echo "";
}