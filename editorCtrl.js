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
        component.on("click", function (event)
        {
            $scope.selectedComponent = getComponent(event);
            if (null != $scope.selectedComponent) {
                $timeout(function ()
                {
                    $scope.editSource = true;
                    $scope.componentSource = $scope.selectedComponent.getText();
                    $scope.editorStyle = {position: "absolute", top: $scope.selectedComponent.getAttr('y') + 'px', left: $scope.selectedComponent.getAttr('x') + 'px'};
                });
            }

        });
        $scope.stage.getLayers()[0].add(component);
        $scope.stage.draw();
    };

    $scope.$watch("componentSource", function (newValue)
    {
        if (undefined != $scope.selectedComponent) {
            $scope.selectedComponent.setText(newValue);
            $scope.stage.draw();
        }
    });

    function getComponent(event)
    {
        var node = event.targetNode;
        while (null != node.getParent()) {
            if (node.mockupComponent != null) {
                break;
            }
            node = node.getParent();
        }
        return node.mockupComponent ? node : null;
    }
}