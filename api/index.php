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
    $resArr = [];

    for ($i = 1; $i <= count($ascii); $i++) {
      if ($ascii[$i] < 208) {
        array_push($resArr, $ascii[$i]);
      }
    }
    // echo implode(',',$resArr);

    for ($i = 0; $i < count($resArr); $i++) {
      if (65 <= $resArr[$i] && $resArr[$i] <= 122) {
        $eng ++;
        array_push($engPos, $i); 
      } elseif (128 < $resArr[$i] && $resArr[$i] <= 191) {
        $rus ++;
        array_push($rusPos, $i); 
      }
    }

    // если гарантируется, что в (англ/русс) тексте встречаются только буквы одинковые по написанию,
    // т.е. в английском тексте мы не встретим "й", "ъ" и т.д.
    // то дальше можем не проверять, в ином случае данные буквы тоже будут выделены.

    if ($eng > $rus) {
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
