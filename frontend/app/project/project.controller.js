
(function(){
    var app = angular.module('app');
    app.controller('ProjectController',ProjectController);
    ProjectController.$inject = ['$scope','$http', '$rootScope'];
    console.log("login cont outside");


    function ProjectController($scope,$http, $rootScope){

        
        // $('.btn-expand-collapse').click(function(e) {
        //     $('.navbar-primary').toggleClass('collapsed');
        // }

      $scope.initialize = function(){
          $scope.activeSchemaTab = 1;
        $scope.entity = {}
        $scope.entity.entityName = "";
        $scope.entity.attributes = [{}];
        $scope.entityNames = [];
        $scope.primaryCols = ['INTEGER', 'VARCHAR(500)', 'timestamp'];
        $scope.primary = [{'value':'INTEGER', 'text': 'Integer'}, {'value':'VARCHAR(500)', 'text':'String'}, {'value':'timestamp','text':'Date'}];
        $scope.related = [];
        $scope.dataTypes = $scope.primary;

        
        $http.get(configData.url+"getTableColumnMapping")
            .then(function successCallback(response){
                if(response.data != null){   
                    response.data.forEach(ele => {
                        if(!ele.isEventTable){
                            $scope.related.push({'value': ele.entityName, 'text':ele.entityName})
                        }
                        $scope.entityNames.push(ele.entityName);
                        ele.full = true;
                        
                    });     
                    $rootScope.allEntityDetails = response.data;           
                    console.log(response);
                }else{
                    //$scope.error = "Unable to fetch posts";
                }

            }, function errorCallback(response){
                console.log("Error updating views");
                //$scope.error = "Unable to fetch posts";
                
            });


      }

      $scope.addNewAttribute = function(){
        var temp = {
          };
        $scope.entity.attributes.push(temp);
      }

      $scope.removeAttribute = function(index){
        //$scope.entity.attributes
      }

      $scope.submit = function(){
          $scope.entity.attributes.forEach((item) => {
              if (!$scope.primaryCols.includes(item.dataType)) {
                  item.isObject = true;
                  item.name = item.dataType;
              }
          })
        $http.post(configData.url + 'objectSchema', $scope.entity)
            .then(function successCallback(response){
                if(response.data != null){                    
                    console.log(response);
                }else{
                    //$scope.error = "Unable to fetch posts";
                }

            }, function errorCallback(response){
                console.log("Error updating views");
                //$scope.error = "Unable to fetch posts";
                
            });
      }

      $scope.updateOptions = function(tab) {
        if(tab == 1 && $scope.dataTypes.length > 3) {
          $scope.dataTypes.splice(3); 
        } else if (tab == 2) {
          $scope.dataTypes = $scope.dataTypes.concat($scope.related);
        }
      }
      /// end of main all fns before this
      
    }

})();

