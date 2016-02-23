(function () {

    'use strict';

    app
        .factory('campusService', campusService);

    campusService.$inject=['SERVER_CONSTANT','CAMPUS_CONSTANT','apiService'];

    function campusService(SERVER_CONSTANT,CAMPUS_CONSTANT,apiService) {

        return {
//            getUniversitiesForAutocomplete : _getUniversitiesForAutocomplete,
//            getUniversitiesNameForAutocomplete : _getUniversitiesNameForAutocomplete,
//            getSearchUniversities: _getSearchUniversities,
//            saveUpdatedUniversityDataAdmin: _saveUpdatedUniversityDataAdmin,
//            saveNewUniversities: _saveNewUniversities,
//            deleteUniversity: _deleteUniversity
            getCampusesByUniversity:_getCampusesByUniversity,
            updateCampus:_updateCampus
        }

//        function _getUniversitiesNameForAutocomplete(query){
//            return apiService.post(SERVER_CONSTANT.HOST+UNIVERSITY_CONSTANT.AUTOCOMPLETE_NAME_SEARCH_LIST+"?access_token="+query.access_token,query);
//        }
//        function _getUniversitiesForAutocomplete(query){
//            return apiService.post(SERVER_CONSTANT.HOST+UNIVERSITY_CONSTANT.AUTOCOMPLETE_SEARCH_LIST+"?access_token="+query.access_token,query);
//        }

//        function _saveUpdatedUniversityDataAdmin(access_token,data){
//            return apiService.post(SERVER_CONSTANT.HOST+UNIVERSITY_CONSTANT.UPDATE_UNIVERSITY+"?access_token="+access_token,data);
//        }
//        function _getSearchUniversities(access_token, data){
//            return apiService.post(SERVER_CONSTANT.HOST+UNIVERSITY_CONSTANT.LIST_BY_SEARCH_UNIVERSITY+"?access_token="+access_token,data);
//        }
//        function _saveNewUniversities(access_token,data){
//            return apiService.post(SERVER_CONSTANT.HOST+UNIVERSITY_CONSTANT.SAVE_NEW_UNIVERSITY+"?access_token="+access_token,data);
//        }
//        function _deleteUniversity(access_token,data){
//            return apiService.post(SERVER_CONSTANT.HOST+UNIVERSITY_CONSTANT.DELETE_UNIVERSITY+"?access_token="+access_token,data);
//        }

        function _getCampusesByUniversity(access_token,data){
            return apiService.post(SERVER_CONSTANT.HOST+CAMPUS_CONSTANT.CAMPUS_LIST_BY_UNIVERSITY+"?access_token="+access_token,data);
        }
        function _updateCampus(access_token,data){
            return apiService.post(SERVER_CONSTANT.HOST+CAMPUS_CONSTANT.UPDATE_CAMPUS+"?access_token="+access_token,data);
        }

    }

})();
