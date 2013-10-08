﻿(function () {
    var bookstore = angular.module('BookstoreApp', ['ngResource', 'ngRoute']);

    bookstore.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/Scripts/Views/books.html',
                controller: 'BookCtrl',
            })
            .when('/Book/:bookId', {
                templateUrl: '/Scripts/Views/book.html',
                controller: 'PurchaseCtrl',
            })
            .when('/Cart', {
                templateUrl: '/Scripts/Views/cart.html'
            }).otherwise({ redirectTo: '/' });

    }]);

    bookstore.factory('Book', ['$resource', function ($resource) {
        var book = $resource('/Home/Books', null, {
            'getAll': { method: 'GET', isArray: true }
        });
        return book;
    }]);

    bookstore.factory('AlsoPurchased', ['$resource', function ($resource) {
        return $resource('/Purchase/Index', null, {           
           'get': {method: 'GET', isArray: true } 
        });
    }]);

    bookstore.factory('Cart', ['$resource', function ($resource) {
        var cart = $resource('/Cart/Index', null, {
            'getContents': { method: 'GET', isArray: true },
            'addToCart': { method: 'PUT', isArray: true },
            'checkout': { method: 'POST' }
        });
        return cart;
    }]);

    bookstore.controller('StoreCtrl', ['$scope', 'Cart', '$location', function ($scope, Cart, $location) {
        $scope.cart = Cart.getContents();
        $scope.getCartItemCount = function () {
            return _.reduce($scope.cart, function (memo, item) {
                return memo + item.quantity;
            }, 0);
        };

        $scope.addToCart = function (bookId) {
            Cart.addToCart({ bookId: bookId }, function (contents){
                $scope.cart = contents;
            });
        };
        $scope.getSubTotalInOere = function () {
            return _.reduce($scope.cart, function (memo, item) {
                return memo + item.sumTotalInOere;
            }, 0);
        };
        
        $scope.checkout = function () {
            Cart.checkout(function () {
                $scope.cart = [];
                $location.path('#/');
            });
        };
    }]);
    
    bookstore.controller('BookCtrl', ['$scope', 'Book', function ($scope, Book) {
        $scope.books = Book.getAll();
    }]);

    bookstore.controller('PurchaseCtrl', ['$scope', '$routeParams', 'AlsoPurchased', 'Book', function ($scope, $routeParams, AlsoPurchased, Book) {
        $scope.selectedBook = Book.get({ bookId: $routeParams.bookId });
        $scope.alsoPurchased = AlsoPurchased.get({ bookId: $routeParams.bookId });
    }]);
    
    bookstore.directive('book', function () {
        return {
            restrict: 'E',
            scope: '@',
            templateUrl: '/Scripts/Views/templates/book-template.html'
        };
    });
})();