FirstApp.controller('OrderController',
  [
    '$scope',
    'crudService',
    '$routeParams',
    'toaster',
    function ($scope, crudService, $routeParams, toaster) {
      var service = crudService('order_items');
      $scope.totalPayment = 0;
      $scope.entities = service.query({}, function(){
        for(var i = 0; i < $scope.entities.length; i++){
          $scope.totalPayment+= $scope.entities[i].book.price;
        }
      });




      if ($routeParams.id) {
        $scope.entity = service.get({
          id: $routeParams.id
        });
      } else {
        $scope.entity = {};
      }

      $scope.edit = function (id) {
        $scope.entity = service.get({
          id: id
        });
      };

      $scope.save = function () {
        service.save($scope.entity, function (data) {
          $scope.entity = {};
          $scope.entities = service.query();
        });
      };

      $scope.remove = function (id) {
        service
          .remove(
          {
            id: id
          },
          function () {
            $scope.entities = service
              .query();
          },
          function (res) {
            if (res.status == 500) {
              // alert('ne moze da se
              // izbrise!');
              toaster
                .pop(
                'error',
                'Deleting error',
                "Ne moze da se izbrise objektot. Postoi drug objekt so nadvoresen kluc koj pokazuva kon nego!");
            }
          });

      };

    }]);
