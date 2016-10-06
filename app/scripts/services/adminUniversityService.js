(function () {

    'use strict';

    app
        .factory('universityService', universityService);

    universityService.$inject=['SERVER_CONSTANT','UNIVERSITY_CONSTANT','apiService'];

    function universityService(SERVER_CONSTANT,UNIVERSITY_CONSTANT,apiService) {

        return {
            getUniversitiesForAutocomplete : _getUniversitiesForAutocomplete,
//            getUniversitiesNameForAutocomplete : _getUniversitiesNameForAutocomplete,
            getSearchUniversities: _getSearchUniversities,
            saveUpdatedUniversityDataAdmin: _saveUpdatedUniversityDataAdmin,
            saveNewUniversities: _saveNewUniversities,
            deleteUniversity: _deleteUniversity,
            getAllNonApprovedUniversities:_getAllNonApprovedUniversities,
            getAllActivatedUniversities:_getAllActivatedUniversities,
            getAllDeactivatedUniversities:_getAllDeactivatedUniversities
        };

//        function _getUniversitiesNameForAutocomplete(query){
//            return apiService.post(SERVER_CONSTANT.HOST+UNIVERSITY_CONSTANT.AUTOCOMPLETE_NAME_SEARCH_LIST+"?access_token="+query.access_token,query);
//        }
        function _getUniversitiesForAutocomplete(query){
            return apiService.post(SERVER_CONSTANT.HOST+UNIVERSITY_CONSTANT.AUTOCOMPLETE_SEARCH_LIST,query);
        }
        function _saveUpdatedUniversityDataAdmin(access_token,data){
            return apiService.post(SERVER_CONSTANT.HOST+UNIVERSITY_CONSTANT.UPDATE_UNIVERSITY+"?access_token="+access_token,data);
        }
        function _getSearchUniversities(access_token, data){
            return apiService.post(SERVER_CONSTANT.HOST+UNIVERSITY_CONSTANT.LIST_BY_SEARCH_UNIVERSITY+"?access_token="+access_token,data);
        }
        function _saveNewUniversities(data){
            return apiService.post(SERVER_CONSTANT.HOST+UNIVERSITY_CONSTANT.SAVE_NEW_UNIVERSITY,data);
        }
        function _deleteUniversity(access_token,data){
            return apiService.post(SERVER_CONSTANT.HOST+UNIVERSITY_CONSTANT.DELETE_UNIVERSITY+"?access_token="+access_token,data);
        }
        function _getAllNonApprovedUniversities(access_token,data){
            return apiService.post(SERVER_CONSTANT.HOST+UNIVERSITY_CONSTANT.GET_ALL_NON_APPROVED_UNIVERSITIES+"?access_token="+access_token,data);
        }
        function _getAllActivatedUniversities(access_token,data){
            return apiService.post(SERVER_CONSTANT.HOST+UNIVERSITY_CONSTANT.GET_ALL_ACTIVATED_UNIVERSITIES+"?access_token="+access_token,data);
        }
        function _getAllDeactivatedUniversities(access_token,data){
            return apiService.post(SERVER_CONSTANT.HOST+UNIVERSITY_CONSTANT.GET_ALL_DEACTIVATED_UNIVERSITIES+"?access_token="+access_token,data);
        }

    }

})();
