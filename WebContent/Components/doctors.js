$(document).ready(function() 
{  
	if ($("#alertSuccess").text().trim() == "")  
	{   
		$("#alertSuccess").hide();  
	}  
	$("#alertError").hide(); }); 
 
// SAVE ============================================ 
$(document).on("click", "#btnSave", function(event) 
{  
	// Clear alerts---------------------  
	$("#alertSuccess").text("");  
	$("#alertSuccess").hide();  
	$("#alertError").text("");  
	$("#alertError").hide(); 
 
	// Form validation-------------------  
	var status = validateDoctorForm();  
	if (status != true)  
	{   
		$("#alertError").text(status);   
		$("#alertError").show();   
		return;  
	} 
 
	// If valid------------------------  
	var type = ($("#hidDoctorIDSave").val() == "") ? "POST" : "PUT"; 
	
	$.ajax( 
	{  
		url : "DoctorsAPI",  
		type : type,  
		data : $("#formDoctor").serialize(),  
		dataType : "text",  
		complete : function(response, status)  
		{   
			onDoctorSaveComplete(response.responseText, status);  
		} 
	}); 
}); 

function onDoctorSaveComplete(response, status) 
{  
	if (status == "success")  
	{   
		var resultSet = JSON.parse(response); 

		if (resultSet.status.trim() == "success")   
		{    
			$("#alertSuccess").text("Successfully saved.");    
			$("#alertSuccess").show(); 

			$("#divDoctorsGrid").html(resultSet.data);   
		} else if (resultSet.status.trim() == "error")   
		{    
			$("#alertError").text(resultSet.data);    
			$("#alertError").show();   
		} 

	} else if (status == "error")  
	{   
		$("#alertError").text("Error while saving.");   
		$("#alertError").show();  
	} else  
	{   
		$("#alertError").text("Unknown error while saving..");   
		$("#alertError").show();  
	} 

	$("#hidDoctorIDSave").val("");  
	$("#formDoctor")[0].reset(); 
} 
 
// UPDATE========================================== 
$(document).on("click", ".btnUpdate", function(event) 
{     
	$("#hidDoctorIDSave").val($(this).closest("tr").find('#hidDoctorIDUpdate').val());         
	$("#fdname").val($(this).closest("tr").find('td:eq(0)').text()); 
	$("#ldname").val($(this).closest("tr").find('td:eq(1)').text());
	$("#phone").val($(this).closest("tr").find('td:eq(3)').text());
	$("#charges").val($(this).closest("tr").find('td:eq(2)').text());  
	$("#hid").val($(this).closest("tr").find('td:eq(4)').text());
	$("#uid").val($(this).closest("tr").find('td:eq(5)').text());
	$("#speciality").val($(this).closest("tr").find('td:eq(6)').text());
 
}); 

//REMOVE===========================================
$(document).on("click", ".btnRemove", function(event) 
{  
	$.ajax(  
	{   
		url : "DoctorsAPI",   
		type : "DELETE",   
		data : "doctorID=" + $(this).data("doctorid"),   
		dataType : "text",   
		complete : function(response, status)   
		{    
			onDoctorDeleteComplete(response.responseText, status);   
		}  
	}); 
}); 

function onDoctorDeleteComplete(response, status) 
{  
	if (status == "success")  
	{   
		var resultSet = JSON.parse(response); 

		if (resultSet.status.trim() == "success")   
		{    
			$("#alertSuccess").text("Successfully deleted.");    
			$("#alertSuccess").show(); 
		
			$("#divDoctorGrid").html(resultSet.data);   
		} else if (resultSet.status.trim() == "error")   
		{    
			$("#alertError").text(resultSet.data);    
			$("#alertError").show();   
		}

	} else if (status == "error")  
	{   
		$("#alertError").text("Error while deleting.");   
		$("#alertError").show();  
	} else  
	{   
		$("#alertError").text("Unknown error while deleting..");   
		$("#alertError").show();  
	}
}
 
// CLIENT-MODEL========================================================================= 
function validateDoctorForm() 
{  
	// DOCTOR ID  
	if ($("#doctorID").val().trim() == "")  
	{   
		return "Insert Doctor ID.";  
	} 
 
	// FIRST NAME  
	if ($("#fdname").val().trim() == "")  
	{   
		return "Insert First Name.";  
	} 
	
	// LAST NAME  
	if ($("#ldname").val().trim() == "")  
	{   
		return "Insert Last Name.";  
	}
	
	// MOBILE NUMBER  
	if ($("#phone").val().trim() == "")  
	{   
		return "Insert Mobile Number.";  
	}
	
	//CHARGES-------------------------------  
	if ($("#charges").val().trim() == "")  
	{   
		return "Insert Charges.";  
	} 

	// is numerical value  
	var tmpcharges = $("#charges").val().trim();  
	if (!$.isNumeric(tmpcharges))  
	{   
		return "Insert a numerical value for Doctor Price.";  
	} 

	// convert to decimal price  
	$("#charges").val(parseFloat(tmpcharges).toFixed(2)); 

	// HOSPITAL ID 
	if ($("#hid").val().trim() == "")  
	{   
		return "Insert Hospital ID.";  
	} 
	
	// USER ID 
	if ($("#uid").val().trim() == "")  
	{   
		return "Insert User ID.";  
	} 
	
	// SPECIALITY 
	if ($("#speciality").val().trim() == "")  
	{   
		return "Insert Your Speciality.";  
	} 
	

	return true; 
}