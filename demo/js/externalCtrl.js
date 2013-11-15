angular.module("CustomApp", ["AgidoMockups"], null).controller("ExternalCtrl", ["$scope", "$timeout", "$window", function ($scope, $timeout, $window)
{
    var mockupSource = '[{"attrs":{"width":141,"height":100,"color":"#000","draggable":true,"componentName":"Comment","rotation":0.05235987755982989,"x":1132,"y":232,"text":"Isn\'t this wonderful"},"className":"Comment"},'
            + '{"attrs":{"draggable":true,"componentName":"Window","x":20,"y":20,"text":"A Web Page\\nhttp://itcrowd.pl","width":1036,"height":586},"className":"Window"},'
            + '{"attrs":{"stroke":"#000","draggable":true,"width":200,"height":50,"componentName":"Arrow","x":967,"y":209,"strokeWidth":5},"className":"Arrow"},'
            + '{"attrs":{"color":"#000","draggable":true,"componentName":"Checkbox","width":100,"height":18,"x":40,"y":100},"className":"Checkbox"},'
            + '{"attrs":{"color":"#000","draggable":true,"componentName":"CheckboxGroup","height":90,"width":118,"x":40,"y":160},"className":"CheckboxGroup"},'
            + '{"attrs":{"color":"#000","draggable":true,"componentName":"RadioItem","height":18,"width":127,"x":220,"y":100},"className":"RadioItem"},'
            + '{"attrs":{"color":"#000","draggable":true,"componentName":"RadioGroup","height":90,"width":115,"x":220,"y":160},"className":"RadioGroup"},'
            + '{"attrs":{"width":150,"color":"#000","draggable":true,"componentName":"Datepicker","height":28,"x":120,"y":280},"className":"Datepicker"},'
            + '{"attrs":{"width":80,"height":80,"draggable":true,"componentName":"ImageItem","clipX":0,"clipY":0,"clipWidth":80,"clipHeight":80,"x":380,"y":100,"text":"Some image"},"className":"ImageItem"},'
            + '{"attrs":{"text":"Label","fill":"#000","draggable":true,"componentName":"Label","width":"auto","height":"auto","x":40,"y":300},"className":"Text"},'
            + '{"attrs":{"draggable":true,"componentName":"Menu","height":170,"width":250,"x":720,"y":120},"className":"Menu"},'
            + '{"attrs":{"width":300,"draggable":true,"componentName":"MenuBar","height":28,"x":720,"y":100},"className":"MenuBar"},'
            + '{"attrs":{"draggable":true,"componentName":"Pagination","width":160,"height":20,"x":820,"y":560},"className":"Pagination"},'
            + '{"attrs":{"width":146,"height":136,"draggable":true,"componentName":"Panel","x":40,"y":320},"className":"Panel"},'
            + '{"attrs":{"color":"#5df","draggable":true,"componentName":"Link","width":64,"height":18,"x":60,"y":360},"className":"Link"},'
            + '{"attrs":{"color":"#000","draggable":true,"componentName":"Button","width":92,"height":28,"x":60,"y":400},"className":"Button"},'
            + '{"attrs":{"draggable":true,"componentName":"Paragraph","height":36,"width":166,"x":380,"y":340},"className":"Paragraph"},'
            + '{"attrs":{"width":150,"color":"#000","draggable":true,"componentName":"Select","height":79,"x":200,"y":320,"opened":true,"text":"Select\\nOption 1\\nOption 2"},"className":"Select"},'
            + '{"attrs":{"fontSize":32,"text":"Subtitle","fill":"#000","draggable":true,"componentName":"Subtitle","width":"auto","height":"auto","x":500,"y":220},"className":"Text"},'
            + '{"attrs":{"draggable":true,"componentName":"Table","x":560,"y":300},"className":"Table"},'
            + '{"attrs":{"width":200,"height":100,"color":"#000","draggable":true,"componentName":"TextArea","x":200,"y":420},"className":"TextArea"},'
            + '{"attrs":{"fontSize":48,"text":"Title","fill":"#000","draggable":true,"componentName":"Title","width":"auto","height":"auto","x":500,"y":160},"className":"Text"}]';
    /**
     * Here we may have call to some DAO to grab mockup source from server or something like that.
     * External controller communicates with AgioMockups.EditorCtrl by broadcasting and listeting to events.
     */
    $timeout(function ()
    {
        $scope.$broadcast("AgidoMockups.sourceReady", mockupSource);
    }, 500);
    //noinspection JSUnusedLocalSymbols
    $scope.$on("AgidoMockups.save", function (event, json)
    {
        $window.alert("Mockup saved!");
        /**
         * Your controller could do something like this:
         */
//        ScreenDAO.persistScreen($scope.screen, function ()
//        {
//            MessageFactory.info("Screen saved successfully");
//        });
    });

    //noinspection JSUnusedLocalSymbols
    $scope.$on("AgidoMockups.saveImage", function (event, image)
    {
        $window.open(image);
        /**
         * If you want to send base64 encoded image you need to strip initial characters ("data:image/png;base64,")
         */
//        ScreenDAO.uploadImage($scope.screen.id, image.replace(/data:image\/\w+;base64,/, ""), function ()
//        {
//            MessageFactory.info("Screen image saved successfully");
//        });
    });

}]);
