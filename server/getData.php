<?php
header('Content-Type: application/json'); // Set response type to JSON

$servername = "localhost";
$username = "root"; // Your MySQL username
$password = ""; // Your MySQL password
$dbname = "bimascoredb"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM mytable";
$result = $conn->query($sql);

$data = array();

if ($result->num_rows > 0) {
    // Fetch all rows
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data); // Send the data as JSON response
} else {
    echo json_encode(array("message" => "No records found"));
}

$conn->close();
?>
