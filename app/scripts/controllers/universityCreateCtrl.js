(function () {

    'use strict';

    app
        .controller('UniversityCreateCtrl', UniversityCreateCtrl);

    UniversityCreateCtrl.$inject = ['$scope','$state','referralService','identityService','countryService','stateService','universityService'];

    function UniversityCreateCtrl($scope,$state,referralService,identityService,countryService,stateService,universityService) {

        $scope.states=null;
        $scope.addNewUniversity = _addNewUniversity;
        $scope.removeUniversity = _removeUniversity;
        $scope.saveNewUniversities = _saveNewUniversities;
        $scope.cancelSavingUniversity = _cancelSavingUniversity;
        $scope.addNewCampus = _addNewCampus;
        $scope.removeCampus = _removeCampus;
        $scope.fetchStates= _fetchStates;

        referralService.getReferralList(identityService.getAccessToken()).then(function(response){
            $scope.referrals  = response.data;
        });
        countryService.getCountryList(identityService.getAccessToken()).then(function(response){
            $scope.countries  = response.data;
        })

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


        function _addNewUniversity() {
            console.log($scope.referrals);
            if($scope.universities.length>0){
                var newUniversityNo = ($scope.universities[$scope.universities.length-1].universityId)+1;
            }else{
                var newUniversityNo = 0;
            }

            $scope.universities.push({
                universityId: newUniversityNo,
                campuses:
                    [
                        {
                            campusId:0
                        }
                    ],
                campusRemove:false
            });
        }

        function _removeUniversity(university){

            for(var i in $scope.universities) {
                if($scope.universities[i].universityId == university.universityId) {
                    $scope.universities.splice(i,1);
                }
            }

        }

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
            stateService.getStateListByCountry(identityService.getAccessToken(),data).then(function(response){
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

        function _cancelSavingUniversity(){
            $state.go('admin.university');
        }

        function _saveNewUniversities(){
            universityService.saveNewUniversities(identityService.getAccessToken(),$scope.universities).then(setResponseDataTOView);
        }

        function setResponseDataTOView(response){

//            var success_counter=0;

            for(var i in response.data) {
                $scope.universities[i].response = true;

                if(response.data[i].success!=undefined){
//                    $scope.$parent.universities.push($scope.universities[i]);
                    $scope.universities[i].university_message=response.data[i].success;
                    $scope.universities[i].university_message_class = "text-greensea";

                    $scope.universities[i].university_name_message="";
                    $scope.universities[i].university_url_message="";
                    $scope.universities[i].university_referral_message="";

                    for(var j in $scope.universities[i].campuses){
                        $scope.universities[i].campuses[j].response = false;
                    }


                }else if(response.data[i].children!=undefined){

                    if(response.data[i].children.universityName.errors!=undefined){
                        $scope.universities[i].university_name_message=response.data[i].children.universityName.errors[0];
                        $scope.universities[i].university_name_message_class = "text-hotpink";
                    }else{
                        $scope.universities[i].university_name_message="";
                    }
                    if(response.data[i].children.universityUrl.errors!=undefined){
                        $scope.universities[i].university_url_message=response.data[i].children.universityUrl.errors[0];
                        $scope.universities[i].university_url_message_class = "text-hotpink";
                    }else{
                        $scope.universities[i].university_url_message="";
                    }
                    if(response.data[i].children.referral.errors!=undefined){
                        $scope.universities[i].university_referral_message=response.data[i].children.referral.errors[0];
                        $scope.universities[i].university_referral_message_class = "text-hotpink";
                    }else{
                        $scope.universities[i].university_referral_message="";
                    }

                    for(var j in response.data[i].children.campuses.children){
                        $scope.universities[i].campuses[j].response = true;
                        if(response.data[i].children.campuses.children[j].children.campusName.errors!=undefined){
                            $scope.universities[i].campuses[j].university_campus_message =response.data[i].children.campuses.children[j].children.campusName.errors[0];
                            $scope.universities[i].campuses[j].university_campus_message_class = "text-hotpink";
                        }else{
                            $scope.universities[i].campuses[j].university_campus_message ="";
                        }
                        if(response.data[i].children.campuses.children[j].children.state.errors!=undefined){
                            $scope.universities[i].campuses[j].university_state_message =response.data[i].children.campuses.children[j].children.state.errors[0];
                            $scope.universities[i].campuses[j].university_state_message_class = "text-hotpink";
                        }else{
                            $scope.universities[i].campuses[j].university_state_message ="";
                        }
                    }

                }
            }



        }

    }


})();


