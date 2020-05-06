package model;

import model.Doctor;
import java.io.IOException; 
import java.util.HashMap; 
import java.util.Map; 
import java.util.Scanner;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * Servlet implementation class DoctorsAPI
 */
@WebServlet("/DoctorsAPI")
public class DoctorsAPI extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	Doctor doctorObj = new Doctor();
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DoctorsAPI() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		String output = doctorObj.insertDoctor(      
				request.getParameter("fdname"),     
				request.getParameter("ldname"),
				request.getParameter("phone"),
				request.getParameter("charges"),
				request.getParameter("hid"),
				request.getParameter("uid"),
				request.getParameter("speciality")); 
	 
	 response.getWriter().write(output); 
		
		
	}

	/**
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		Map paras = getParasMap(request); 
		 
		 String output = doctorObj.updateDoctor(paras.get("hidDoctorIDSave").toString(),     
				      
				 paras.get("fdname").toString(),
				 paras.get("ldname").toString(),
				 paras.get("phone").toString(),
				 paras.get("charges").toString(),
				 paras.get("hid").toString(), 
				 paras.get("uid").toString(),
				 paras.get("speciality").toString()); 
		 
		 response.getWriter().write(output);
	}

	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		
		Map paras = getParasMap(request); 
		 
		 String output = doctorObj.deleteDoctor(paras.get("doctorID").toString()); 
		 
		 response.getWriter().write(output);
	}

	
	// Convert request parameters to a Map 
		private static Map getParasMap(HttpServletRequest request) 
		{  
			Map<String, String> map = new HashMap<String, String>();  
			try  
			{   
				Scanner scanner = new Scanner(request.getInputStream(), "UTF-8");   
				String queryString = scanner.hasNext() ?          
						scanner.useDelimiter("\\A").next() : "";  
						scanner.close(); 
		 
		  String[] params = queryString.split("&");   
		  for (String param : params)   
		  { 

	 
		   String[] p = param.split("=");    
		   map.put(p[0], p[1]);   
		   }  
		  }  
			catch (Exception e)  
			{  
				
			}  return map; 
			
		}
}
