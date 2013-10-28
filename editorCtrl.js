//noinspection JSUnusedGlobalSymbols
function EditorCtrl($scope, $timeout)
{
    $scope.editSource = false;
    $scope.selectedComponent = null;
    $scope.componentSource = "";
    $scope.event = "";

    var components = {
        "RadioItem": {constructor: Kinetic.RadioItem,
            options: {
                color: '#000',
                draggable: true
            },
            multilineSource: false
        },
        "RadioGroup": {constructor: Kinetic.RadioGroup,
            options: {
                color: '#000',
                draggable: true
            },
            multilineSource: true
        }
    };

    $scope.addToStage = function (type)
    {
        var scheme = components[type];
        if (null == scheme) {
            throw new Error("Unsupported type: " + type);
        }
        var component = new scheme.constructor(scheme.options);
        component.mockupComponent = scheme;
        $scope.stage.getLayers()[0].add(component);
        $scope.stage.draw();
    };


    $scope.saveSource = function ()
    {
        if (applyComponentSource()) {
            $scope.editSource = false;
        }
    };

    $scope.$on("mockupComponentSelected", function (event, component)
    {
        $scope.selectedComponent = component;
        $timeout(function ()
        {
            $scope.editSource = true;
            $scope.componentSource = $scope.selectedComponent.getText();
            $scope.editorStyle = {position: "absolute", top: $scope.selectedComponent.getAttr('y') + 'px', left: $scope.selectedComponent.getAttr('x') + 'px'};
        });
    });
    function applyComponentSource()
    {
        if (null != $scope.componentSource && "" != $scope.componentSource.trim()) {
            $scope.selectedComponent.setText($scope.componentSource);
            $scope.stage.draw();
            return true;
        }
        return false;
    }

    $scope.$on("stageClicked", function ()
    {
        if ($scope.editSource && null != $scope.selectedComponent) {
            $scope.editSource = false;
            $scope.$apply();
            if ($scope.selectedComponent.mockupComponent.multilineSource) {
                applyComponentSource();
            }
        }
    });
    var KEY_ENTER = 13;
    var KEY_ESC = 27;
    $scope.onComponentSourceKeyPress = function (event)
    {
        if (KEY_ENTER == event.keyCode) {
            if (!$scope.selectedComponent.mockupComponent.multilineSource) {
                $scope.saveSource();
            }
        } else if (KEY_ESC == event.keyCode) {
            $scope.editSource = false;
        }
    };

    $scope.downloadImage = function ()
    {
        $scope.stage.toDataURL({callback: function (data)
        {
            var pom = document.createElement('a');
            pom.setAttribute('href', data);
            pom.setAttribute('download', "AgidoMockup.png");
            pom.click();
        }})
    };

}