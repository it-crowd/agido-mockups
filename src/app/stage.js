agidoMockups.directive('stage', function ($timeout)
{
    function getComponent(event, isMockupComponent)
    {
        var node = event.targetNode;
        while (null != node.getParent()) {
            if (isMockupComponent({component: node})) {
                return node;
            }
            node = node.getParent();
        }
        return isMockupComponent(node) ? node : null;
    }

    function cancelBubble(event)
    {
        event.cancelBubble = true;
    }

    return {
        restrict: 'E',
        scope: {
            width: '@',
            height: '@',
            stage: '=',
            editingSource: '=',
            hasText: '&',
            isMockupComponent: '&',
            saveSource: '&',
            stageClicked: '&',
            mockupComponentSelected: '&',
            selectedComponent: '='
        },
        template: '<div class="stageContainer"><div class="stage"></div><form ng-submit = "saveSource()"><input ng-model="componentSource" ng-show="editingSource && !selectedComponent.mockupComponent.multilineSource" ng-style="editorStyle" ng-keyup="onComponentSourceKeyPress($event)"/><textarea ng-model="componentSource" ng-show="editingSource && selectedComponent.mockupComponent.multilineSource" ng-style="editorStyle" ng-keyup="onComponentSourceKeyPress($event)"></textarea></form></div>',
        replace: true,
        link: function (scope, element)
        {
            scope.stage = new Kinetic.Stage({
                container: element[0].firstChild,
                width: scope["width"],
                height: scope["height"]
            });
            scope.stage.add(new Kinetic.Layer({}));

            /**
             * Invoke stageClicked callback if stage is clicked in editingSource mode
             */
//            TODO this is getting in the way of kinetic.click; introduce new layer with white rectangle so that clicking can be fully serviced by kinetic
            element.bind("click", scope.$apply.bind(scope, function ()
            {
                if (scope.editingSource) {
                    scope.editingSource = false;
                    scope.stageClicked({source: scope.componentSource});
                }
            }));

            var sourceTextearea = element.find("textarea");
            var sourceInput = element.find("input");
            /**
             * Do not allow stage.click (thus stageClicked callback) in source inputs are clicked
             */
            sourceTextearea.bind("click", cancelBubble);
            sourceInput.bind("click", cancelBubble);

            /**
             * Focus source textarea on show
             */
            scope.$watch("editingSource && selectedComponent.mockupComponent.multilineSource", function (newValue)
            {
                if (newValue) {
                    sourceTextearea[0].focus();
                    sourceTextearea[0].select(sourceTextearea[0]);
                }
            }, true);
            /**
             * Focus source input on show
             */
            scope.$watch("editingSource && !selectedComponent.mockupComponent.multilineSource", function (newValue)
            {
                if (newValue) {
                    sourceInput[0].focus();
                    sourceInput[0].select(sourceInput[0]);
                }
            }, true);

            /**
             * Invoke mockupComponentSelected callback when mockup element gets clicked
             */
            scope.stage.on("click", function (event)
            {
                var component = getComponent(event, scope.isMockupComponent);
                if (null != component) {
                    scope.mockupComponentSelected({component: component});
                    scope.editorStyle = {position: "absolute", top: component.getAttr('y') + 'px', left: component.getAttr('x') + 'px'};
                    if (scope.hasText({component: component})) {
                        scope.componentSource = component.getText();
                        $timeout(function ()
                        {
                            scope.editingSource = true;
                        });
                    }
                    scope.$apply();
                }
            });
            var KEY_ENTER = 13;
            var KEY_ESC = 27;
            scope.onComponentSourceKeyPress = function (event)
            {
                if (KEY_ENTER == event.keyCode) {
                    if (null != scope.selectedComponent && !scope.selectedComponent.mockupComponent.multilineSource) {
                        if (scope.saveSource({source: scope.componentSource})) {
                            scope.editingSource = false;
                        }
                    }
                } else if (KEY_ESC == event.keyCode) {
                    scope.editingSource = false;
                }
            };
        }
    }
});

