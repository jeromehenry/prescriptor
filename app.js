var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('/',{
        url: '/',
            templateUrl:'patient/patientDetails.html',
            controller: 'patientsCtrl',
    })
    .state('medicine',{
        url: '/medicine',
            templateUrl:'medicine/medicineDetails.html',
            
    });
})

