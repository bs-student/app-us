(function () {

    'use strict';

    app
        .factory('universityService', universityService);

    universityService.$inject=['SERVER_CONSTANT','UNIVERSITY_CONSTANT','apiService'];

    function universityService(SERVER_CONSTANT,UNIVERSITY_CONSTANT,apiService) {

        return {
            getUniversitiesForAutocomplete : _getUniversitiesForAutocomplete,
            getUniversitiesNameForAutocomplete : _getUniversitiesNameForAutocomplete,
            getSearchUniversities: _getSearchUniversities,
            saveUpdatedUniversityDataAdmin: _saveUpdatedUniversityDataAdmin,
            saveNewUniversities: _saveNewUniversities,
            deleteUniversity: _deleteUniversity
        }

        function _getUniversitiesNameForAutocomplete(query){
            return apiService.post(SERVER_CONSTANT.HOST+UNIVERSITY_CONSTANT.AUTOCOMPLETE_NAME_SEARCH_LIST+"?access_token="+query.access_token,query);
        }
        function _getUniversitiesForAutocomplete(query){
            return apiService.post(SERVER_CONSTANT.HOST+UNIVERSITY_CONSTANT.AUTOCOMPLETE_SEARCH_LIST+"?access_token="+query.access_token,query);
        }
        function _saveUpdatedUniversityDataAdmin(access_token,data){
            return apiService.post(SERVER_CONSTANT.HOST+UNIVERSITY_CONSTANT.UPDATE_UNIVERSITY+"?access_token="+access_token,data);
        }
        function _getSearchUniversities(access_token, data){
            return apiService.post(SERVER_CONSTANT.HOST+UNIVERSITY_CONSTANT.LIST_BY_SEARCH_UNIVERSITY+"?access_token="+access_token,data);
        }
        function _saveNewUniversities(access_token,data){
            return apiService.post(SERVER_CONSTANT.HOST+UNIVERSITY_CONSTANT.SAVE_NEW_UNIVERSITY+"?access_token="+access_token,data);
        }
        function _deleteUniversity(access_token,data){
            return apiService.post(SERVER_CONSTANT.HOST+UNIVERSITY_CONSTANT.DELETE_UNIVERSITY+"?access_token="+access_token,data);
        }

    }

})();
