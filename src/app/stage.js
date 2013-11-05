agidoMockups.directive('stage', function ($timeout, $window)
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

    function ungroup(node)
    {
        if (node instanceof Kinetic.Group && node.attrs.selectionGroup === true) {
            var children = [];
            var nodeZIndex = node.getZIndex();
            while (node.getChildren().length > 0) {
                var child = node.getChildren()[0];
                if (child.attrs.selectionBorder === true || child.attrs.resizeAnchor === true) {
                    child.destroy();
                } else {
                    child.remove();
                    child.setAttr("x", (child.getAttr("x") || 0) + node.getAttr("x"));
                    child.setAttr("y", (child.getAttr("y") || 0) + node.getAttr("y"));
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

    function startSelection(selectionRect, componentsLayer, event)
    {
        var startX = event.layerX, startY = event.layerY;
        var selectionLayer = selectionRect.getLayer();
        var stage = selectionRect.getStage();
        selectionRect.setAttr("x", startX);
        selectionRect.setAttr("y", startY);
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
            var sx = selectionRect.getAttr("x");
            var sy = selectionRect.getAttr("y");
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
                var nsx = node.getAttr("x");
                var nsy = node.getAttr("y");
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
                select(selectedComponents[0]);
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
                    node.setAttr("x", node.getAttr("x") - minx);
                    node.setAttr("y", node.getAttr("y") - miny);
                    selectionGroup.add(node);
                });
                selectionGroup.add(selectionRect.clone({x: 0, y: 0, width: maxx - minx, height: maxy - miny, draggable: false, selectionBorder: true}));
                selectionGroup.originalZIndex = selectionGroup.getZIndex();
                componentsLayer.add(selectionGroup);
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

            var width = topRight.getX() - topLeft.getX();
            var height = bottomLeft.getY() - topLeft.getY();
            if (width && height) {
                group.mainComponent.setSize(width, height);
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
            var selectionGroup = new Kinetic.Group({draggable: true, x: node.getAttr("x"), y: node.getAttr("y"), selectionGroup: true});
            selectionGroup.mainComponent = node;
            node.originalZIndex = node.getZIndex();
            node.remove();
            node.setAttr("draggable", false);
            node.setAttr("x", 0);
            node.setAttr("y", 0);
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
            selectedComponent: '='
        },
        template: '<div class="stageContainer"><div class="stage"></div><form ng-submit = "saveSource()"><input ng-model="componentSource" ng-show="editingSource && !selectedComponent.mockupComponent.multilineSource" ng-style="editorStyle" ng-keyup="onComponentSourceKeyPress($event)"/><textarea ng-model="componentSource" ng-show="editingSource && selectedComponent.mockupComponent.multilineSource" ng-style="editorStyle" ng-keyup="onComponentSourceKeyPress($event)" rows="5" cols="50"></textarea></form></div>',
        replace: true,
        link: function (scope, element)
        {
            var stage = new Kinetic.Stage({
                container: element[0].firstChild,
                width: $window.document.body.offsetWidth,
                height: 700
            });

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

            backgroundRect.on("mousedown", startSelection.bind(null, selectionRect, componentsLayer));

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
                    select(component, scope.isComponentResizable({component: component}));
                } else if (scope.editingSource) {
                    scope.editingSource = false;
                    scope.stageClicked({source: scope.componentSource});
                }
                scope.$apply();
            });
            stage.on("nodeSelected", function (node)
            {
                scope.mockupComponentSelected({component: node});
                scope.editorStyle = {position: "absolute", top: node.getParent().getAttr('y') + 'px', left: node.getParent().getAttr('x') + 'px'};
                if (scope.hasText({component: node})) {
                    scope.componentSource = node.getText();
                    $timeout(function ()
                    {
                        scope.editingSource = true;
                    });
                }
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
                this.setAttr("x", parseInt(this.attrs.x / spacing) * spacing);
                this.setAttr("y", parseInt(this.attrs.y / spacing) * spacing);
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
                draw: stage.draw.bind(stage),
                add: function (node)
                {
                    componentsLayer.add(node);
                    select(node, scope.isComponentResizable({component: node}));
                },
                unselectAll: function ()
                {
                    componentsLayer.getChildren().each(ungroup);
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
                    return JSON.stringify(componentsLayer.toObject().children);
                }
            }
        }
    }
});
