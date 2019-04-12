var myApp = angular.module('myApp', []);
myApp.controller('MyCtrl', function ($scope, $http) {

    //Input Labels
    $scope.welcomeText = "Image Annotation Tool";
    $scope.widthLabel = "Width";
    $scope.heightLabel = "Height";
    $scope.image = "Image";
    $scope.annotation = "Annotation Text";
    //Input Labels

    $scope.images = []; //Array to store images
    $scope.count = 0;
    $scope.request = []; //Request for the DB
    $scope.index = 0;

    $scope.imageUpload = function (event) { //Image Upload
        $scope.count = 0;
        $scope.images = [];
        var files = event.target.files; //FileList object
        $scope.fileName = [];
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            $scope.fileName.push(file.name);
            $scope.index = i;
            var reader = new FileReader();
            reader.onload = $scope.imageIsLoaded;
            reader.readAsDataURL(file);
        }
    }

    $scope.imageIsLoaded = function (e) {
        $scope.$apply(function () {
            var obj = {
                'id': $scope.count,
                'fileName': e.target.result,
                'width': $scope.count + 249,
                'height': $scope.count + 249
            }
            $scope.images.push(obj);
        });
        $scope.count = $scope.count + 1;
    }

    $scope.submitImage = function () { //Post Request to the DB
        for (var i = 0; i < $scope.images.length; i++) {
            var obj = {
                'fileName': $scope.fileName[i],
                'annotation_text': document.getElementById('image' + i).value
            }
            $scope.request.push(obj);
        }
        $http({
            url: 'http://localhost:8081/createImage',
            method: "POST",
            data: $scope.request
        })
            .then(function (response) {
                // success
                console.log(response);
                if (response.data.success === 'Success') {
                    location.reload();
                    $scope.images = [];
                }

            });
    }

    /**
     * Canvas to draw on the image
     * Todo
     */

    // $scope.mouseDown = function(e) {
    //     rect.startX = e.pageX - this.offsetLeft;
    //     rect.startY = e.pageY - this.offsetTop;
    //     drag = true;
    // }

    // $scope.mouseUp = function() { drag = false; }

    // $scope.mouseMove = function(e) {
    //     if (drag) {
    //         ctx.clearRect(0, 0, 500, 500);
    //         ctx.drawImage(imageObj, 0, 0);
    //         rect.w = (e.pageX - this.offsetLeft) - rect.startX;
    //         rect.h = (e.pageY - this.offsetTop) - rect.startY;
    //         ctx.strokeStyle = 'red';
    //         ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
    //     }
    // }
});