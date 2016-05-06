'use strict';


app
    .controller('WidgetsCtrl', WidgetsCtrl);

WidgetsCtrl.$inject = ['$scope'];

function WidgetsCtrl($scope) {
    $scope.page = {
        title: 'Widgets',
        subtitle: 'Place subtitle here...'
    }
}


app.controller('TodoWidgetCtrl', TodoWidgetCtrl);

TodoWidgetCtrl.$inject = ['$scope'];
function TodoWidgetCtrl($scope) {
    $scope.todos = [
        {
            text: 'Release update',
            completed: false
        },
        {
            text: 'Make a backup',
            completed: false
        },
        {
            text: 'Send e-mail to Ici',
            completed: true
        },
        {
            text: 'Buy tickets',
            completed: false
        },
        {
            text: 'Resolve issues',
            completed: false
        },
        {
            text: 'Compile new version',
            completed: false
        }
    ];

    var todos = $scope.todos;

    $scope.addTodo = function () {
        $scope.todos.push({
            text: $scope.todo,
            completed: false
        });
        $scope.todo = '';
    };

    $scope.removeTodo = function (todo) {
        todos.splice(todos.indexOf(todo), 1);
    };

    $scope.editTodo = function (todo) {
        $scope.editedTodo = todo;
        // Clone the original todo to restore it on demand.
        $scope.originalTodo = angular.extend({}, todo);
    };

    $scope.doneEditing = function (todo) {
        $scope.editedTodo = null;

        todo.text = todo.text.trim();

        if (!todo.text) {
            $scope.removeTodo(todo);
        }
    };

    $scope.revertEditing = function (todo) {
        todos[todos.indexOf(todo)] = $scope.originalTodo;
        $scope.doneEditing($scope.originalTodo);
    };

}

app.controller('CalendarWidgetCtrl', CalendarWidgetCtrl);
CalendarWidgetCtrl.$inject = ['$scope'];
function CalendarWidgetCtrl($scope) {

    $scope.today = function () {
        $scope.dt = new Date();
    };

    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1,
        'class': 'datepicker'
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
}

app.controller('MessageWidgetCtrl', MessageWidgetCtrl);
MessageWidgetCtrl.$inject = ['$scope'];
function MessageWidgetCtrl($scope) {
    $scope.availableRecipients = ['RLake@nec.gov', 'RBastian@lacus.io', 'VMonroe@orci.ly', 'YMckenzie@mattis.gov', 'VMcmyne@molestie.org', 'BKliban@aliquam.gov', 'HHellems@tincidunt.org', 'KAngell@sollicitudin.ly'];
    $scope.recipients = {};
    $scope.recipients.emails = ['RLake@nec.gov', 'VMonroe@orci.ly'];

    $scope.messageContent = '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p>';
}

app.controller('AppointmentsWidgetCtrl', AppointmentsWidgetCtrl);
AppointmentsWidgetCtrl.$inject = ['$scope'];
function AppointmentsWidgetCtrl($scope) {
    $scope.date = new Date();
}