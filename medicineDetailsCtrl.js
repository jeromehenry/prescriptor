angular.module('app').controller('medicineCtrl', ['$scope', '$http', function($scope, $http){
	initFn();
	var editFlag=false;
	var medRecd={};
    function initFn(){
        //$http.get('https://reqres.in/api/users?page=2').then(successCallback, errorCallback);
    	$http.get('http://localhost:1111/api/v1/medicine/getMedicines').then(successCallback, errorCallback);
        function successCallback(response){
            $scope.formatMedData(response);
        }
        function errorCallback(error){
            console.log(error);
        }   
    }

    $scope.getMedicineByID=function(){
    	if($scope.id==""){
    		initFn();
    	}
    	else{
    	var url='http://localhost:1111/api/v1/medicine/getMedicine?id='+$scope.id;
    	$http.get(url).then(successCallback, errorCallback);
        function successCallback(response){
        	$scope.medData = [];
        	$scope.medData.push(response.data.data)
            //$scope.formatData(response);
        }
        function errorCallback(error){
            console.log(error);
        }   
        }
    }
    
    //In case of edit Medicine, populate form with medicine data
    $scope.editMedicine = function(medRecd){
    	console.log(medRecd);
        $scope.form.drugName = medRecd.drugName;
        $scope.form.drugDescription = medRecd.drugDescription;
        $scope.form.drugManufacturer = medRecd.drugManufacturer;
        $scope.editFlag=true;
     }
    
    $scope.formatMedData = function(response){
    	$scope.medData = [];
    	angular.forEach(response.data.data,function(data){
        	$scope.medData.push(data);
        })
    }

    $scope.createMedicine = function(data){
        
    	var dataObj = angular.toJson($scope.form);
    	if($scope.editFlag==true){
    		$http.post("http://localhost:1111/api/v1/medicine/updateMedicine", dataObj).then(successCallback, errorCallback);
    		editFlag=false;
    	}else{
    		$http.post("http://localhost:1111/api/v1/medicine/addMedicine", dataObj).then(successCallback, errorCallback);	
    	}
        
        function successCallback(response){
            console.log(response);
        }
        function errorCallback(error){
            console.log(error);
        }
    }

    

}]);