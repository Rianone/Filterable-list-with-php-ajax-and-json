<?php
header("Content-Type: application/json; charset=UTF-8");

if($_GET["x"]=="add")
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

else if ( $_GET["x"]=="update" ){
   $file = fopen("contacts.json","r");

   $content = fread($file,1000);

   $array = json_decode($content);
   
   $new = [];
   $new_obj = [
      "name"=> $_GET["name_up"],
      "number"=>$_GET["num_up"]
   ];
   foreach ($array as $key => $value) {
      
      foreach($value as $cle => $val)
      {
         
         if($val== $_GET["name_init"])
        {}
        else if($val == $_GET["num_init"])
        {}
        else
        {
            array_push($new,$value);
        }
      }
   }
   array_push($new,$new_obj);
   $new = json_encode($new);
   fclose($file);
   $write = fopen("contacts.json","w");
   fwrite($write,$new);
   echo $new;

}

else if  ( $_GET["x"]=="delete"){
   $file = fopen("contacts.json","r");
   $content = fread($file,1000);
   $array = json_decode($content);
   
   $new = [];
   foreach ($array as $key => $value) {
      
      foreach($value as $cle => $val)
      {
         
         if($val== $_GET["name_init"])
        {
        
        }
        else if($val == $_GET["num_init"])
        {
           $val = $_GET["num_up"];
        }
        else
        {
            array_push($new,$value);
        }
      }
   }
   $new = json_encode($new);
   fclose($file);
   $write = fopen("contacts.json","w");
   fwrite($write,$new);
   echo $new;
}

else{
   $write = fopen("contacts.json","w");
   fwrite($write,"[]");
   echo "";
}