var app = angular.module('AgidoMockupsApp', []);
app.directive('stage', function ()
{
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

    return {
        restrict: 'C',
        link: function (scope, element, attrs)
        {
            scope.stage = new Kinetic.Stage({
                container: element[0],
//                TODO use scope attributes for width and height
                width: 578,
                height: 200
            });
            var layer = new Kinetic.Layer();
            scope.stage.add(layer);
            element.bind("click", function ()
            {
                scope.$emit("stageClicked");
            });
            scope.stage.on("click", function (event)
            {
                var component = getComponent(event);
                if (null != component) {
                    scope.$emit("mockupComponentSelected", component);
                }
            });
        }
    }
});

