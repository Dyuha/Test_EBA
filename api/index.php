<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
  case "POST":
    $data = file_get_contents("php://input");
    $ascii = unpack("C*", $data);
    $summ = array_sum($ascii);
    $engPos = [];
    $rusPos = [];
    $eng = 0;
    $rus = 0;
    $arrUnset = [208, 209];
    $resArr = array_diff($ascii, $arrUnset);

    for ($i = 1; $i <= count($resArr); $i++) {
      if (65 <= $resArr[$i] && $resArr[$i] <= 122) {
        $eng ++;
        array_push($engPos, $i-1); 
      } elseif (128 < $resArr[$i] && $resArr[$i] <= 191) {
        $rus ++;
        array_push($rusPos, $i-1); 
      }
    }
    if ($eng > $rus) {
      $lang = 'eng';
    } else {
      $lang = 'rus';
    }
    
    if ($lang == 'eng'){
      echo json_encode($rusPos);
    } else {
      echo json_encode($engPos);
    }

    break;
  case "GET":
    echo "Get";
    break;    
};
?>
