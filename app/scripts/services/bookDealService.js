(function () {

    'use strict';

    app
        .factory('contactService', contactService);

    contactService.$inject=['SERVER_CONSTANT','CONTACT_CONSTANT','apiService'];

    function contactService(SERVER_CONSTANT,CONTACT_CONSTANT,apiService) {

        return {
            addContact:_addContact

        };


        function _addContact(data){
            if(data.access_token!=null){
                return apiService.post(SERVER_CONSTANT.HOST+CONTACT_CONSTANT.ADD_CONTACT_API+"?access_token="+data.access_token,data);
            }else{
                return apiService.post(SERVER_CONSTANT.HOST+CONTACT_CONSTANT.ADD_CONTACT,data);
            }

        }

    }

})();
