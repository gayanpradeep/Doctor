<%@ page import="model.Doctor"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Doctor Management</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.4.1.min.js"></script>
<script src="Components/doctors.js"></script>
</head>
<body>

	<div class="container">
		<div class="row">
			<div class="col-6">
				<h1>DOCTORS MANAGEMENT</h1>
				<form id="formDoctor" name="formDoctor" method="post"
					action="doctors.jsp">

					<br> Doctor First Name: <input id="fdname" name="fdname"
						type="text" class="form-control form-control-sm"> <br>
					Doctor Last Name: <input id="ldname" name="ldname" type="text"
						class="form-control form-control-sm"> <br> Doctor
					Mobile Number: <input id="phone" name="phone" type="text"
						class="form-control form-control-sm"> <br> Doctor
					Charges: <input id="charges" name="charges" type="text"
						class="form-control form-control-sm"> <br> Doctor
					Hospital ID: <input id="hid" name="hid" type="text"
						class="form-control form-control-sm"> <br> Doctor
					UserID: <input id="uid" name="uid" type="text"
						class="form-control form-control-sm"> <br> Doctor
					Speciality: <input id="speciality" name="speciality" type="text"
						class="form-control form-control-sm"> <br> <input
						id="btnSave" name="btnSave" type="button" value="Save"
						class="btn btn-primary"> <input type="hidden"
						id="hidDoctorIDSave" name="hidDoctorIDSave" value="">
				</form>

				<div id="alertSuccess" class="alert alert-success">
					<%
						out.print(session.getAttribute("statusMsg"));
					%>
				</div>
				<div id="alertError" class="alert alert-danger"></div>

				<br>
				<div id="divDoctorsGrid">
					<%
						Doctor doctorObj = new Doctor();
						out.print(doctorObj.readDoctors());
					%>
				</div>


			</div>
		</div>
	</div>



</body>
</html>