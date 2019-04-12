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
    $scope.isDisabled = true;

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

         /**
         * Canvas to draw on the image
         * Todo
         */
        //var canvas = document.getElementById('canvas');
        //console.log(canvas)
        // var ctx = canvas.getContext('2d');
        // var rect = {};
        // var drag = false;
        // var imageObj = null;
        // imageObj = new Image();
        // imageObj.onload = function () { ctx.drawImage(imageObj, 0, 0); };
        // imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';
        // canvas.addEventListener('mousedown', mouseDown, false);
        // canvas.addEventListener('mouseup', mouseUp, false);
        // canvas.addEventListener('mousemove', mouseMove, false);

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

    $scope.setText = function(){
        $scope.flag = true;
        for(var i=0; i< $scope.images.length; i++) {
            var a = document.getElementById('image' + i).value;
            if(a == null || a == "") {
                $scope.flag = true;
            } else {
                $scope.flag = false;
            }
        }
        if($scope.flag == false) {
            document.getElementById('isDisabled').disabled = false;
        } else {
            document.getElementById('isDisabled').disabled = true;
        }

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