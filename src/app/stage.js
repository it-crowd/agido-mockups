agidoMockups.directive('stage', [ "$timeout", "$window", function ($timeout, $window)
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
        return isMockupComponent({component: node}) ? node : null;
    }

    function cancelBubble(event)
    {
        event.cancelBubble = true;
    }

    function isEditorialShape(node)
    {
        return  true === node.attrs.selectionGroup || node.attrs.resizeAnchor === true || node.attrs.name == "editorSelectionBorder";
    }

    function ungroup(node)
    {
        if (node instanceof Kinetic.Group && node.attrs.selectionGroup === true) {
            var children = [];
            var nodeZIndex = node.getZIndex();
            while (node.getChildren().length > 0) {
                var child = node.getChildren()[0];
                if (isEditorialShape(child)) {
                    child.destroy();
                } else {
                    child.remove();
                    child.setX((child.getX() || 0) + node.getX());
                    child.setY((child.getY() || 0) + node.getY());
                    child.setAttr("draggable", true);
                    node.getParent().add(child);
                    children.push(child);
                    child.originalZIndex = Math.max(0, child.originalZIndex + nodeZIndex - node.originalZIndex);
                }
            }
            node.destroy();
            Kinetic.Collection.toCollection(children).each(function (child)
            {
                child.setZIndex(child.originalZIndex);
                delete child.originalZIndex;
            });
        }
    }

    function startSelection(selectionRect, componentsLayer, isComponentResizable, event)
    {
        var startX = event.layerX, startY = event.layerY;
        var selectionLayer = selectionRect.getLayer();
        var stage = selectionRect.getStage();
        selectionRect.setX(startX);
        selectionRect.setY(startY);
        selectionRect.setWidth(0);
        selectionRect.setHeight(0);
        selectionRect.show();
        function mousemoveHandler(event)
        {
            selectionRect.setWidth(event.layerX - startX);
            selectionRect.setHeight(event.layerY - startY);
            selectionLayer.draw();
        }

        function mouseupHandler()
        {
            /**
             * No need to listen to mouse up or mousemove anymore
             */
            stage.off("mousemove");
            stage.off("mouseup");
            selectionRect.off("mousemove");
            selectionRect.off("mouseup");
            /**
             * If there has any selection been created, let's unselect it so that we operate on mockup components rather than groups.
             */
            componentsLayer.getChildren().each(ungroup);
            /**
             * Calculate which components to include in selection and actual selection boundries.
             */
            var sx = selectionRect.getX();
            var sy = selectionRect.getY();
            var ex = sx + selectionRect.getWidth();
            var ey = sy + selectionRect.getHeight();
            var tmpxy;
            if (sx > ex) {
                tmpxy = ex;
                ex = sx;
                sx = tmpxy;
            }
            if (sy > ey) {
                tmpxy = ey;
                ey = sy;
                sy = tmpxy;
            }
            var minx = undefined, miny = undefined, maxx = undefined, maxy = undefined;
            var selectedComponents = [];
            componentsLayer.getChildren().each(function (node)
            {
                var nsx = node.getX();
                var nsy = node.getY();
                var nex = nsx + node.getWidth();
                var ney = nsy + node.getHeight();
                if (sx <= nsx && nsx <= ex && sy <= nsy && nsy <= ey) {
                    if (sx <= nex && nex <= ex && sy <= ney && ney <= ey) {
                        selectedComponents.push(node);
                        if (undefined == minx || minx > nsx) {
                            minx = nsx;
                        }
                        if (undefined == miny || miny > nsy) {
                            miny = nsy;
                        }
                        if (undefined == maxx || maxx < nex) {
                            maxx = nex;
                        }
                        if (undefined == maxy || maxy < ney) {
                            maxy = ney;
                        }
                    }
                }
            });

            if (1 == selectedComponents.length) {
                select(selectedComponents[0], isComponentResizable({component: selectedComponents[0]}));
            } else if (undefined != minx && undefined != miny && undefined != maxx && undefined != maxy) {
                //noinspection JSValidateTypes
                /**
                 * Create selection group and move all selected components inside it for better performance when dragging group.
                 */
                var selectionGroup = new Kinetic.Group({draggable: true, x: minx, y: miny, selectionGroup: true});
                var selectedComponentsCollection = Kinetic.Collection.toCollection(selectedComponents);
                selectedComponentsCollection.each(function (node)
                {
                    node.originalZIndex = node.getZIndex();
                });
                selectedComponentsCollection.each(function (node)
                {
                    node.remove();
                    node.setAttr("draggable", false);
                    node.setX(node.getX() - minx);
                    node.setY(node.getY() - miny);
                    selectionGroup.add(node);
                });
                selectionGroup.add(selectionRect.clone({x: 0, y: 0, width: maxx - minx, height: maxy - miny, draggable: false, name: "editorSelectionBorder"}));
                componentsLayer.add(selectionGroup);
                selectionGroup.originalZIndex = selectionGroup.getZIndex();
                componentsLayer.fire("nodeGroupSelected", selectionGroup, true);
            }
            selectionRect.hide();
            selectionLayer.getParent().draw();
            $timeout(function ()
            {
            });
        }

        stage.on("mousemove", mousemoveHandler);
        selectionRect.on("mousemove", mousemoveHandler);
        stage.on("mouseup", mouseupHandler);
        selectionRect.on("mouseup", mouseupHandler);
    }

    function select(node, resizable)
    {
        var componentsLayer = node.getLayer();
        componentsLayer.getChildren().each(ungroup);
        function update(activeAnchor)
        {
            var group = activeAnchor.getParent();

            var topLeft = group.get('.topLeft')[0];
            var topRight = group.get('.topRight')[0];
            var bottomRight = group.get('.bottomRight')[0];
            var bottomLeft = group.get('.bottomLeft')[0];

            var anchorX = activeAnchor.getX();
            var anchorY = activeAnchor.getY();

            // update anchor positions
            //noinspection JSCheckFunctionSignatures
            switch (activeAnchor.getName()) {
                case 'topLeft':
                    topRight.setY(anchorY);
                    bottomLeft.setX(anchorX);
                    break;
                case 'topRight':
                    topLeft.setY(anchorY);
                    bottomRight.setX(anchorX);
                    break;
                case 'bottomRight':
                    bottomLeft.setY(anchorY);
                    topRight.setX(anchorX);
                    break;
                case 'bottomLeft':
                    bottomRight.setY(anchorY);
                    topLeft.setX(anchorX);
                    break;
            }

            group.mainComponent.setPosition(topLeft.getPosition());
            var selectionBorder = group.find(".editorSelectionBorder")[0];
            selectionBorder.setPosition(topLeft.getPosition());

            var width = topRight.getX() - topLeft.getX();
            var height = bottomLeft.getY() - topLeft.getY();
            if (width && height) {
                group.mainComponent.setSize(width, height);
                selectionBorder.setSize(width, height);
            }
            group.getStage().draw()
        }

        function addAnchor(group, x, y, name)
        {
            var layer = group.getLayer();
            var anchor = new Kinetic.Circle({
                x: x,
                y: y,
                stroke: '#777',
                fill: '#ddd',
                strokeWidth: 2,
                radius: 8,
                name: name,
                draggable: true,
                dragOnTop: false,
                resizeAnchor: true
            });
            anchor.on('dragmove', function ()
            {
                update(this);
                layer.draw();
            });
            anchor.on('mousedown touchstart', function ()
            {
                //noinspection JSValidateTypes
                group.setDraggable(false);
                this.moveToTop();
            });
            anchor.on('dragend', function ()
            {
                //noinspection JSValidateTypes
                group.setDraggable(true);
                layer.draw();
            });
            // add hover styling
            anchor.on('mouseover', function ()
            {
                var layer = this.getLayer();
                $window.document.body.style.cursor = 'pointer';
                this.setStrokeWidth(4);
                layer.draw();
            });
            anchor.on('mouseout', function ()
            {
                var layer = this.getLayer();
                $window.document.body.style.cursor = 'default';
                this.setStrokeWidth(2);
                layer.draw();
            });
            group.add(anchor);
        }

        if (!(node.getParent() instanceof Kinetic.Group)) {
            var selectionGroup = new Kinetic.Group({draggable: true, x: node.getX(), y: node.getY(), selectionGroup: true});
            selectionGroup.mainComponent = node;
            node.originalZIndex = node.getZIndex();
            node.remove();
            node.setAttr("draggable", false);
            node.setX(0);
            node.setY(0);
            selectionGroup.add(node);
            componentsLayer.add(selectionGroup);
            selectionGroup.setZIndex(node.originalZIndex);
            selectionGroup.originalZIndex = selectionGroup.getZIndex();
            if (resizable) {
                addAnchor(selectionGroup, 0, 0, 'topLeft');
                addAnchor(selectionGroup, node.getWidth(), 0, 'topRight');
                addAnchor(selectionGroup, node.getWidth(), node.getHeight(), 'bottomRight');
                addAnchor(selectionGroup, 0, node.getHeight(), 'bottomLeft');
            }
            var selectionBorder = new Kinetic.Rect({name: "editorSelectionBorder", stroke: "#f00", width: node.getWidth(), height: node.getHeight()});
            selectionGroup.add(selectionBorder);
            selectionBorder.on("click", function (event)
            {
                cancelBubble(event);
                node.fire("click", {targetNode: node}, true);
            });
            selectionBorder.on("dblclick", function (event)
            {
                cancelBubble(event);
                node.fire("dblclick", {targetNode: node}, true);
            });
        }
        componentsLayer.draw();
        node.fire("nodeSelected", node, true);
    }

    return {
        restrict: 'E',
        scope: {
            stage: '=',
            editingSource: '=',
            hasText: '&',
            isMockupComponent: '&',
            isComponentResizable: '&',
            saveSource: '&',
            stageClicked: '&',
            mockupComponentSelected: '&',
            mockupComponentGroupSelected: '&',
            selectedComponent: '='
        },
        template: '<div class="stageContainer"><div class="stage"></div><form ng-submit = "saveSource()" ng-hide="selectedComponent.mockupComponent.noSource"><input type="text" ng-model="componentSource" ng-show="editingSource && !selectedComponent.mockupComponent.multilineSource" class="form-control" ng-style="editorStyle" ng-keyup="onComponentSourceKeyPress($event)"/><textarea ng-model="componentSource" ng-show="editingSource && selectedComponent.mockupComponent.multilineSource" class="form-control" ng-style="editorStyle" ng-keyup="onComponentSourceKeyPress($event)" rows="5" cols="50"></textarea></form></div>',
        replace: true,
        link: function (scope, element)
        {
            var stage = new Kinetic.Stage({
                container: element[0].firstChild,
                width: $window.document.body.offsetWidth,
                height: 700
            });

            var $stage = angular.element(element[0].firstChild);

            var windowResizeHandler = scope.$apply.bind(scope, function ()
            {
                stage.setWidth($window.document.body.offsetWidth);
                grid.setSize(stage.getWidth(), stage.getHeight());
            });
            angular.element($window).bind("resize", windowResizeHandler);

            scope.$on("$destroy", function ()
            {
                angular.element($window).unbind("resize", windowResizeHandler);
            });
            var backgroundLayer = new Kinetic.Layer({});
            stage.add(backgroundLayer);
            var backgroundRect = new Kinetic.Rect({fill: "#fff", width: stage.getWidth(), height: stage.getHeight()});
            backgroundLayer.add(backgroundRect);
            var grid = new Kinetic.Grid({width: stage.getWidth(), height: stage.getHeight(), stroke: "#00f", strokeWidth: 0.5, opacity: .2});
            backgroundLayer.add(grid);
            var componentsLayer = new Kinetic.Layer({name: "componentsLayer"});
            stage.add(componentsLayer);
            var selectionLayer = new Kinetic.Layer({});
            stage.add(selectionLayer);
            var selectionRect = new Kinetic.Rect({stroke: "#f00", draggable: true, visible: false});
            selectionLayer.add(selectionRect);
            stage.draw();

            backgroundRect.on("mousedown", startSelection.bind(null, selectionRect, componentsLayer, scope.isComponentResizable));

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
             * Invoke mockupComponentSelected callback when mockup element gets clicked or stageClicked
             */
            stage.on("click", function (event)
            {
                var component = getComponent(event, scope.isMockupComponent);
                if (null != component) {
                    if (component != scope.selectedComponent) {
                        select(component, scope.isComponentResizable({component: component}));
                    }
                } else {
                    scope.editingSource = false;
                    scope.stageClicked({source: scope.componentSource});
                }
                scope.$apply();
            });
            stage.on("nodeSelected", function (node)
            {
                scope.mockupComponentSelected({component: node});
                scope.editorStyle = {position: "absolute", top: ($stage.offset().top + node.getParent().getY()) + 'px', left: node.getParent().getX() + 'px'};
                scope.editingSource = false;
                if (scope.hasText({component: node})) {
                    scope.componentSource = node.getText();
                }
            });
            stage.on("dblclick", function ()
            {
                var selectedComponent = scope.selectedComponent;
                if (null != selectedComponent) {
                    scope.editingSource = true;
                    $timeout(function ()
                    {
                        if (selectedComponent.mockupComponent.multilineSource) {
                            sourceTextearea[0].focus();
                            sourceTextearea[0].select(sourceTextearea[0]);
                        } else {
                            sourceInput[0].focus();
                            sourceInput[0].select(sourceInput[0]);
                        }
                    });
                }
            });
            stage.on("nodeGroupSelected", function (node)
            {
                scope.mockupComponentGroupSelected({component: node});
            });
            /**
             * Handle Escape and Enter keys.
             */
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
            var snapToGrid = false;

            function snapToGridEnforcer()
            {
                var spacing = grid.getSpacing();
                this.setX(parseInt(this.attrs.x / spacing) * spacing);
                this.setY(parseInt(this.attrs.y / spacing) * spacing);
            }

            componentsLayer.on("add", function (event)
            {
                if (snapToGrid) {
                    event.child.on("dragmove.snapToGrid", snapToGridEnforcer);
                }
            });

            /**
             * Expose stage proxy. We do not want external controllers to mess with stage internals directly.
             */
            scope.stage = {
                getHeight: stage.getHeight.bind(stage),
                getWidth: stage.getWidth.bind(stage),
                draw: stage.draw.bind(stage),
                add: function (node)
                {
                    componentsLayer.add(node);
                    select(node, scope.isComponentResizable({component: node}));
                },
                clear: function ()
                {
                    scope.editingSource = false;
                    componentsLayer.destroyChildren();
                    componentsLayer.draw();
                },
                toggleGrid: function ()
                {
                    if (grid.isVisible()) {
                        grid.hide();
                    } else {
                        grid.show();
                    }
                    grid.getLayer().draw();
                },
                toggleSnapToGrid: function ()
                {
                    snapToGrid = !snapToGrid;
                    componentsLayer.getChildren().each(function (node)
                    {
                        if (snapToGrid) {
                            node.on("dragmove.snapToGrid", snapToGridEnforcer);
                        } else {
                            node.off("dragmove.snapToGrid");
                        }
                    });
                },
                decreaseGridDensity: function ()
                {
                    grid.setSpacing(grid.getSpacing() * 2);
                    grid.getLayer().draw();
                },
                increaseGridDensity: function ()
                {
                    grid.setSpacing(Math.max(5, grid.getSpacing() / 2));
                    grid.getLayer().draw();
                }, toDataURL: stage.toDataURL.bind(stage),
                toJSON: function ()
                {
                    var children = [];
                    var groupedChildren = new Kinetic.Collection();
                    componentsLayer.getChildren().each(function (node)
                    {
                        if (isEditorialShape(node)) {
                            var nodeX = node.getX();
                            var nodeY = node.getY();
                            node.getChildren().each(function (child)
                            {
                                if (!isEditorialShape(child)) {
                                    var object = child.toObject();
                                    object.attrs.x = (object.attrs.x || 0) + nodeX;
                                    object.attrs.y = (object.attrs.y || 0) + nodeY;
                                    object.originalZIndex = child.originalZIndex;
                                    groupedChildren.push(object);
                                }
                            });
                        } else {
                            children.push(node.toObject());
                        }
                    });
                    groupedChildren.each(function (child)
                    {
                        children.splice(child.originalZIndex, 0, child);
                        delete child.originalZIndex;
                    });
                    return JSON.stringify(children);
                },
                select: function (component)
                {
                    select(component, scope.isComponentResizable({component: component}));
                }
            };
        }
    }
}]);
