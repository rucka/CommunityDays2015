describe('on main controller', function () {
    it('should be created with landing default page', function () {
        var controller = window.controllers.mainController[1];
        var $scope = {};
        $scope.$on = function () { };
        controller($scope);
        expect($scope.template).toBe($scope.templates[0]);
    });

    it('should be change template on realtime button push', function () {
        var controller = window.controllers.mainController[1];
        var $scope = {};
        $scope.$on = function () { };
        controller($scope);
        $scope.realtime();
        expect($scope.template).toBe($scope.templates[1]);

    });
});


//describe('grunt-karma', function () {
//    describe('one', function () {
//        it('should be awesome', function () {
//            console.log('one');
//            expect('foo').toEqual(jasmine.any(String));
//        });
//    });

//    describe('two', function () {
//        it('should be equally awesome', function () {
//            console.log('two');
//            expect('woot').toEqual(jasmine.any(String));
//        });
//    });

//    describe('controllers', function () {
//        it('', function () {
//            var main
//            console.log(window.controllers);
//        });
//    });
//    //describe('headless', function () {
//    //    it('should be found a button into webpage', function () {
//    //        var page = require('webpage').create();
//    //        page.open('http://localhost:8901/home.html', function (status) {
//    //            var title = page.evaluate(function () {
//    //                console.log(title);
//    //                return document.title;
//    //            });
//    //        });
//    //    });
//    //});
//});