angular.module('app').controller('patientsCtrl', ['$scope', '$http', function($scope, $http){
    //$scope.patient = "Jerome";
    initFn();
    function initFn(){
        //$http.get('https://reqres.in/api/users?page=2').then(successCallback, errorCallback);
    	$http.get('http://localhost:1111/api/v1/patient/getPatients').then(successCallback, errorCallback);
        function successCallback(response){
            $scope.formatData(response);
        }
        function errorCallback(error){
            console.log(error);
        }   
    }

    $scope.getPatientByID=function(){
    	if($scope.id==""){
    		initFn();
    	}
    	else{
    	var url='http://localhost:1111/api/v1/patient/getPatient?id='+$scope.id;
    	$http.get(url).then(successCallback, errorCallback);
        function successCallback(response){
        	$scope.patData = [];
        	$scope.patData.push(response.data.data)
            //$scope.formatData(response);
        }
        function errorCallback(error){
            console.log(error);
        }   
        }
    }
    	
    
    $scope.formatData = function(response){
    	$scope.patData = [];
    	angular.forEach(response.data.data,function(data){
        	$scope.patData.push(data);
        	//$scope.patData['firstName']=data.patFirstName;
        	//$scope.patData['lastName']=data.patLastName;
        	//$scope.patID.push(data.patID);
        	//$scope.firstName.push(data.patFirstName);
            //$scope.lastName.push(data.patLastName);
        })
    }

            
    function formatDate(d){
    	var date= d.getDate();
    	var month=d.getMonth()+1;
    	var year=d.getFullYear();
    	if (date<10){
    		date="0"+date;
    	}
    	if (month<10){
    		month="0"+month;
    	}
    	
    	return date+"-"+month+"-"+year;
    }
    
    
    $scope.createPatient = function(data){
        /*var dataObj = {
            "name": "morpheus",
            "job": "leader"
        };*/
    	
    	
    	$scope.form.patDOB=formatDate($scope.form.patDOB);
    	$scope.form.patFirstVisit=formatDate($scope.form.patFirstVisit);
        var dataObj = angular.toJson($scope.form);
        
        //$http.post("https://reqres.in/api/users", dataObj).then(successCallback, errorCallback);
        $http.post("http://localhost:1111/api/v1/patient/addPatient", dataObj).then(successCallback, errorCallback);
        function successCallback(response){
            console.log(response);
        }
        function errorCallback(error){
            console.log(error);
        }
    }

   /* var acc = document.getElementsByClassName("accordion");
    var i;
    for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
        panel.style.display = "none";
        } else {
        panel.style.display = "block";
        }
    });
    }
   */ 
}]);