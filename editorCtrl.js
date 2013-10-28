//noinspection JSUnusedGlobalSymbols
function EditorCtrl($scope)
{
    $scope.selectedComponent = null;

    var components = {
        "Link": {constructor: Kinetic.Link,
            options: {
                color: '#000',
                draggable: true
            },
            multilineSource: false
        },
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


    function applyComponentSource(source)
    {
        if (null != source && "" != source.trim()) {
            $scope.selectedComponent.setText(source);
            $scope.stage.draw();
            return true;
        }
        return false;
    }

    $scope.saveSource = function (source)
    {
        return applyComponentSource(source);

    };

    $scope.mockupComponentSelected = function (component)
    {
        $scope.selectedComponent = component;
        $scope.componentSource = $scope.selectedComponent.getText();
    };

    $scope.stageClicked = function (source)
    {
        if (null != $scope.selectedComponent) {
            if ($scope.selectedComponent.mockupComponent.multilineSource) {
                applyComponentSource(source);
            }
        }
    };

    $scope.isMockupComponent = function (comopnent)
    {
        return comopnent.mockupComponent != null;
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