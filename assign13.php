<?php
if(isset($_POST['load'])) {
    if (file_exists('data/data.txt')) {
        $json_data = file_get_contents('data/data.txt');
        $str =  json_encode($json_data);
        print "\n $str \n";   //output the json string - The string is sent to the browser.    
    } 
}else if(isset($_POST['performance'])){
    $performance = $_POST['performance'];
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $student_id = $_POST['student_id'];
    $first_name_2 = $_POST['first_name_2'];
    $last_name_2 = $_POST['last_name_2'];
    $student_id_2 = $_POST['student_id_2'];

    $skills = $_POST['skills'];

    $instrument_selected = $_POST['instrument_selected'];
    $location = $_POST['location'];
    $room = $_POST['room'];
    $time = $_POST['time'];

    // $data = $performance . '-'. $first_name . '-' . $last_name . '-' . $student_id .'-'. $first_name_2 . '-' . $last_name_2 . '-' . $student_id_2  .'-' . $room . '-' . $time_slot . '-' . $skill. '-' . $instrument."\r\n";
    $data2 = array(
            $performance,
            $first_name, 
            $last_name, 
            $student_id, 
            $first_name_2, 
            $last_name_2, 
            $student_id_2, 
            $skills, 
            $instrument_selected, 
            $location, 
            $room,  
            $time,"\r\n"
        );
    $data = implode(', ', $data2);

    $ret = file_put_contents('data/data.txt', $data, FILE_APPEND | LOCK_EX);
    if($ret === false) {
        die('There was an error writing this file');
    }
    else {
        if (file_exists('data/data.txt')) {
            $json_data = file_get_contents('data/data.txt');
            $str =  json_encode($json_data);
            print "\n $str \n";   //output the json string - The string is sent to the browser.    
        }  
    }
}