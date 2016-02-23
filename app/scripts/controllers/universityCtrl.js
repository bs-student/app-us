(function () {

    'use strict';

    app
        .controller('UniversityCtrl', UniversityCtrl);

    UniversityCtrl.$inject = ['$scope', 'referralService', 'countryService', 'identityService', 'stateService', 'universityService','toastr'];

    function UniversityCtrl($scope, referralService, countryService, identityService, stateService, universityService,toastr) {


        var accessToken = null;
        $scope.states=null;
        $scope.saveNewUniversities = _saveNewUniversities;
        $scope.addNewCampus = _addNewCampus;
        $scope.removeCampus = _removeCampus;
        $scope.fetchStates= _fetchStates;
        $scope.clearLastToast = _clearLastToast;
        $scope.clearToasts = _clearToasts;
        var openedToasts = [];
        $scope.toast = {
            colors: [
                {name:'success'},
                {name:'error'}
            ]
        };
        $scope.options = {
            position: 'toast-top-right',
            type: 'success',
            iconClass: $scope.toast.colors[0],
            timeout: '5000',
            extendedTimeout: '2000',
            html: false,
            closeButton: true,
            tapToDismiss: true,
            closeHtml: '<i class="fa fa-times"></i>'
        };
        function _clearLastToast(){
            var toast = openedToasts.pop();
            toastr.clear(toast);
        }

        function _clearToasts () {
            toastr.clear();
        }

        identityService.getClientCredentialAccessToken().then(function(tokenResponse){
            accessToken = tokenResponse.data.access_token;
            referralService.getReferralList(accessToken).then(function(response){
                $scope.referrals  = response.data;
            });
            countryService.getCountryList(accessToken).then(function(response){
                $scope.countries  = response.data;
            });
        });



        $scope.universities =
            [
                {
                    universityId: 0,
                    campuses:
                        [
                            {
                                campusId:0,
                                stateList:null
                            }
                        ],
                    campusRemove:false
                }
            ];


        function _addNewCampus(university) {

            for(var i in $scope.universities) {
                if($scope.universities[i].universityId == university.universityId) {
                    if(university.campuses.length>0){
                        var newCampusNo = (university.campuses[university.campuses.length-1].campusId)+1;
                    }else{
                        var newCampusNo= 0;
                    }

                    university.campuses.push({'campusId':newCampusNo});
                    university.campusRemove = true;
                }
            }

            console.log(university);
        }

        function _removeCampus(university,campus){
            for(var i in $scope.universities){
                if($scope.universities[i].universityId == university.universityId) {
                    for(var j in $scope.universities[i].campuses){
                        if($scope.universities[i].campuses[j].campusId == campus.campusId) {
                            $scope.universities[i].campuses.splice(j,1);
                            if($scope.universities[i].campuses.length==1){
                                $scope.universities[i].campusRemove = false;
                            }
                        }
                    }
                }
            }
        }

        function _fetchStates(university,campus){

            var data = {'countryId':campus.country}
            stateService.getStateListByCountry(accessToken,data).then(function(response){
                for(var i in $scope.universities){
                    if($scope.universities[i].universityId == university.universityId) {
                        for(var j in $scope.universities[i].campuses){
                            if($scope.universities[i].campuses[j].campusId == campus.campusId) {
                                $scope.universities[i].campuses[j].stateList = response.data;
                            }
                        }
                    }
                }
                console.log(university);
            });



        }

        function _saveNewUniversities(){
            universityService.saveNewUniversities(accessToken,$scope.universities).then(setResponseDataTOView);
        }

        function setResponseDataTOView(response){

            for(var i in response.data){
                if(response.data[i].success!=undefined){
                    var toast = toastr[$scope.options.type]("University is created and you can find it now on registration page", response.data[i].success, {
                        iconClass: 'toast-success'+' ' + 'bg-success'
                    });
                    openedToasts.push(toast);

                }else{
                    var toast = toastr[$scope.options.type]("Sorry, some data may be invalid or missing.", "Could not create university", {
                        iconClass: 'toast-error'+' ' + 'bg-error'
                    });
                    openedToasts.push(toast);
                }
            }





        }


    }


})();


