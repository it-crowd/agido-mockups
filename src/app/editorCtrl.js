agidoMockups.controller("EditorCtrl", function ($scope, $window)
{
    $scope.selectedComponent = null;
    $scope.editingSource = false;

    var clipboard, undoStack = [], redoStack = [];
    var availableFonts = $scope.availableFonts =
            ["Arial", "Bigelow Rules", "Georgia", "Cherry Swash", "Comic Sans MS", "Helvetica", "Lucida Console", "Prosto One", "Stint Ultra Expanded",
                "Times New Roman"];
    var dimensionProperties = [
        {name: "x", hidden: true},
        {name: "y", hidden: true}  ,
        {name: "width", hidden: true},
        {name: "height", hidden: true}
    ];
    var fontProperties = [
        {name: "fontFamily", type: "enum", options: availableFonts},
        {name: "fontSize", type: "number", min: 8},
        {name: "fontStyle", type: "enum", options: ["normal", "bold", "italic"]}
    ];
    var components = {
        "Arrow": {
            constructor: Kinetic.Arrow, options: {
                stroke: '#000', draggable: true, width: 200, height: 50
            },
            hasText: false,
            properties: dimensionProperties.concat([
                {name: "leftDown", type: "boolean"}
            ])
        },
        "Checkbox": {
            constructor: Kinetic.Checkbox, options: {
                color: '#000', draggable: true
            },
            multilineSource: false,
            resizable: false,
            properties: fontProperties.concat(dimensionProperties, [
                {name: "selected", type: "boolean"},
                {name: "disabled", type: "boolean"}
            ])
        },
        "CheckboxGroup": {
            constructor: Kinetic.CheckboxGroup, options: {
                color: '#000', draggable: true
            },
            multilineSource: true,
            resizable: false,
            properties: fontProperties.concat(dimensionProperties)
        },
        "Label": {constructor: Kinetic.Text,
            options: {
                text: "Label",
                fill: '#000',
                draggable: true
            },
            multilineSource: false,
            resizable: false,
            properties: fontProperties.concat(dimensionProperties)
        },
        "Title": {constructor: Kinetic.Text,
            options: {
                fontSize: 48,
                text: "Title",
                fill: '#000',
                draggable: true
            },
            multilineSource: false,
            resizable: false,
            properties: fontProperties.concat(dimensionProperties)
        },
        "Subtitle": {constructor: Kinetic.Text,
            options: {
                fontSize: 32,
                text: "Subtitle",
                fill: '#000',
                draggable: true
            },
            multilineSource: false,
            resizable: false,
            properties: fontProperties.concat(dimensionProperties)
        },
        "Link": {constructor: Kinetic.Link,
            options: {
                color: '#5df',
                draggable: true
            },
            multilineSource: false,
            resizable: false,
            properties: fontProperties.concat(dimensionProperties, [
                {name: "disabled", type: "boolean"}
            ])
        },
        "Panel": {
            constructor: Kinetic.Panel, options: {
                draggable: true
            },
            multilineSource: false,
            properties: dimensionProperties
        },
        "Paragraph": {
            constructor: Kinetic.Paragraph, options: {
                draggable: true
            },
            multilineSource: true,
            resizable: false,
            properties: [
                {name: "fontFamily", type: "enum", options: availableFonts},
                {name: "fontSize", type: "number", min: 8}
            ].concat(dimensionProperties)
        },
        "Pagination": {
            constructor: Kinetic.Pagination, options: {
                draggable: true
            },
            hasText: false,
            resizable: false,
            properties: dimensionProperties
        },
        "RadioItem": {
            constructor: Kinetic.RadioItem, options: {
                color: '#000', draggable: true
            },
            multilineSource: false,
            resizable: false,
            properties: fontProperties.concat(dimensionProperties, [
                {name: "selected", type: "boolean"},
                {name: "disabled", type: "boolean"}
            ])
        },
        "RadioGroup": {
            constructor: Kinetic.RadioGroup, options: {
                color: '#000', draggable: true
            },
            multilineSource: true,
            resizable: false,
            properties: fontProperties.concat(dimensionProperties)
        },
        "Input": {constructor: Kinetic.Input,
            options: {
                color: '#000',
                draggable: true
            },
            multilineSource: false,
            properties: fontProperties.concat(dimensionProperties, [
                {name: "disabled", type: "boolean"}
            ])
        },
        "TextArea": {constructor: Kinetic.TextArea,
            options: {
                color: '#000',
                draggable: true
            },
            multilineSource: true,
            properties: fontProperties.concat(dimensionProperties, [
                {name: "disabled", type: "boolean"}
            ])
        },
        "Button": {constructor: Kinetic.Button,
            options: {
                color: '#000',
                draggable: true
            },
            multilineSource: false,
            properties: fontProperties.concat(dimensionProperties, [
                {name: "disabled", type: "boolean"}
            ])
        },
        "Comment": {constructor: Kinetic.Comment,
            options: {
                color: '#000',
                draggable: true
            },
            multilineSource: true,
            properties: fontProperties.concat(dimensionProperties)
        },
        "Select": {constructor: Kinetic.Select,
            options: {
                color: '#000',
                draggable: true
            },
            multilineSource: true,
            properties: fontProperties.concat(dimensionProperties, [
                {name: "disabled", type: "boolean"},
                {name: "opened", type: "boolean"}
            ])
        },
        "Window": {
            constructor: Kinetic.Window, options: {
                draggable: true
            },
            multilineSource: true,
            properties: dimensionProperties
        },
        "Datepicker": {constructor: Kinetic.Datepicker,
            options: {
                color: '#000',
                draggable: true
            },
            multilineSource: false,
            properties: fontProperties.concat(dimensionProperties, [
                {name: "disabled", type: "boolean"},
                {name: "inline", type: "boolean"}
            ])
        },
        "ImageItem": {constructor: Kinetic.ImageItem,
            options: {
                draggable: true
            },
            multilineSource: false,
            properties: dimensionProperties
        },
        "MenuBar": {constructor: Kinetic.MenuBar,
            options: {
                draggable: true
            },
            multilineSource: false,
            properties: fontProperties.concat(dimensionProperties)
        },
        "Table": {constructor: Kinetic.Table,
            options: {
                draggable: true
            },
            multilineSource: true,
            properties: fontProperties.concat(dimensionProperties, [
                {name: "showHeader", type: "boolean"},
                {name: "padding", type: "number"}
            ])
        },
        "Menu": {constructor: Kinetic.Menu,
            options: {
                draggable: true
            },
            multilineSource: true,
            resizable: false,
            properties: fontProperties.concat(dimensionProperties)
        }
    };

    for (var key in components) {
        if (components.hasOwnProperty(key)) {
            components[key].options.componentName = key;
        }
    }

    function markForUndo()
    {
        $scope.exportToJSON();
        undoStack.push($scope.stageSource);
        redoStack.length = 0;
        while (undoStack.length > 30) {
            undoStack.shift();
        }
    }

    function addToStage(component, isAtomic)
    {
        if (isAtomic) {
            markForUndo();
        }
        $scope.stage.add(component);
    }

    $scope.addToStage = function (type)
    {
        var scheme = components[type];
        if (null == scheme) {
            throw new Error("Unsupported type: " + type);
        }
        var component = new scheme.constructor(scheme.options);
        component.mockupComponent = scheme;
        addToStage(component, true);
    };


    function applyComponentSource(source)
    {
        if (null != $scope.selectedComponent && null != source && "" != source.trim()) {
            markForUndo();
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
        $scope.selectedComponentProperties = {};
        if (null != component) {
            var properties = component.mockupComponent.properties;
            for (var i = 0; null != properties && i < properties.length; i++) {
                var property = properties[i];
                $scope.selectedComponentProperties.__defineGetter__(property.name, function (propertyName)
                {
                    return null == $scope.selectedComponent ? null : $scope.selectedComponent["get" + Kinetic.Util._capitalize(propertyName)]();
                }.bind(null, property.name));
                $scope.selectedComponentProperties.__defineSetter__(property.name, function (property, value)
                {
                    if (null != $scope.selectedComponent) {
                        if ("number" == property.type && property.min && property.min > value) {
                            return;
                        }
                        markForUndo();
                        $scope.selectedComponent["set" + Kinetic.Util._capitalize(property.name)](value);
                    }
                    $scope.stage.draw();
                }.bind(null, property));
            }
        }
    };

    $scope.stageClicked = function (source)
    {
        if (null != $scope.selectedComponent) {
            if ($scope.selectedComponent.mockupComponent.multilineSource) {
                applyComponentSource(source);
            }
            $scope.selectedComponent = null
        }
    };

    $scope.isComponentResizable = function (component)
    {
        return component.mockupComponent.resizable !== false;
    };

    $scope.isMockupComponent = function (component)
    {
        return component.mockupComponent != null;
    };

    $scope.hasSource = function (component)
    {
        return null != component.mockupComponent && !(component.mockupComponent.hasText === false);
    };

    $scope.downloadImage = function ()
    {
//        TODO export only part of stage
        $scope.stage.toDataURL({callback: function (data)
        {
            var pom = document.createElement('a');
            pom.setAttribute('href', data);
            pom.setAttribute('download', "AgidoMockup.png");
            pom.click();
        }})
    };

    $scope.importJSON = function (json)
    {
        var deserializedObjects = JSON.parse(json);
        for (var i = 0; i < deserializedObjects.length; i++) {
            var component = Kinetic.Node.create(JSON.stringify(deserializedObjects[i]));
            component.mockupComponent = components[component.attrs.componentName];
            addToStage(component);
        }
    };

    $scope.exportToJSON = function ()
    {
        $scope.stage.unselectAll();
        $scope.stageSource = $scope.stage.toJSON();
    };

    $scope.toggleGrid = function ()
    {
        $scope.stage.toggleGrid();
    };

    $scope.toggleSnapToGrid = function ()
    {
        $scope.stage.toggleSnapToGrid();
    };

    $scope.decreaseGridDensity = function ()
    {
        $scope.stage.decreaseGridDensity();
    };

    $scope.increaseGridDensity = function ()
    {
        $scope.stage.increaseGridDensity();
    };

    $scope.getComponentType = function (component)
    {
        return null == component ? null : component.className;
    };

    $scope.getProperties = function (component)
    {
        return null == component ? null : component.mockupComponent.properties;
    };

    $scope.undo = function ()
    {
        if (undoStack.length > 0) {
            $scope.exportToJSON();
            redoStack.push($scope.stageSource);
            $scope.stage.clear();
            $scope.importJSON(undoStack.pop());
        }
    };

    $scope.isUndoAvailable = function ()
    {
        return undoStack.length > 0;
    };

    $scope.redo = function ()
    {
        if (redoStack.length > 0) {
            $scope.exportToJSON();
            undoStack.push($scope.stageSource);
            $scope.stage.clear();
            $scope.importJSON(redoStack.pop());
        }
    };

    $scope.isRedoAvailable = function ()
    {
        return redoStack.length > 0;
    };

    $scope.duplicate = function ()
    {
        if (null != $scope.selectedComponent) {
            //noinspection JSValidateTypes
            var clone = new $scope.selectedComponent.mockupComponent.constructor($scope.selectedComponent.attrs);
            if ($scope.selectedComponent.getParent() instanceof Kinetic.Layer) {
                clone.setAttr("x", clone.getAttr("x") + 15);
                clone.setAttr("y", clone.getAttr("y") + 15);
            } else {
                clone.setAttr("x", $scope.selectedComponent.getParent().getAttr("x") + 15);
                clone.setAttr("y", $scope.selectedComponent.getParent().getAttr("y") + 15);
            }
            clone.mockupComponent = $scope.selectedComponent.mockupComponent;
            $scope.selectedComponent = clone;
            addToStage(clone, true);
        }
    };

    $scope.cut = function ()
    {
        if (null != $scope.selectedComponent) {
            markForUndo();
            clipboard = $scope.selectedComponent;
            clipboard.remove();
            $scope.selectedComponent = null;
            $scope.editingSource = false;
            $scope.stage.draw();
        }
    };

    $scope.isClipboardEmpty = function ()
    {
        return null == clipboard;
    };

    $scope.paste = function ()
    {
        if (null != clipboard) {
            $scope.selectedComponent = clipboard;
            $scope.duplicate();
        }
    };

    $scope.delete = function ()
    {
        if (null != $scope.selectedComponent) {
            markForUndo();
            if ($scope.selectedComponent.getParent() instanceof Kinetic.Layer) {
                $scope.selectedComponent.destroy();
            } else {
                $scope.selectedComponent.getParent().destroy();
            }
            $scope.selectedComponent = null;
            $scope.editingSource = false;
            $scope.stage.draw();
        }
    };

    $scope.clearStage = function ()
    {
        if ($window.confirm("Are you sure you want to clear stage?")) {
            markForUndo();
            $scope.stage.clear();
        }
    };

    $scope.lock = function ()
    {
//        TODO implement this method
        alert("Not implemented yet");
    };

    $scope.moveToTop = function ()
    {
        if (null != $scope.selectedComponent) {
            markForUndo();
            $scope.selectedComponent.getParent().moveToTop();
            $scope.stage.draw();
        }
    };

    $scope.moveUp = function ()
    {
        if (null != $scope.selectedComponent) {
            markForUndo();
            $scope.selectedComponent.getParent().moveUp();
            $scope.stage.draw();
        }
    };

    $scope.moveDown = function ()
    {
        if (null != $scope.selectedComponent) {
            markForUndo();
            $scope.selectedComponent.getParent().moveDown();
            $scope.stage.draw();
        }
    };

    $scope.moveToBottom = function ()
    {
        if (null != $scope.selectedComponent) {
            markForUndo();
            $scope.selectedComponent.getParent().moveToBottom();
            $scope.stage.draw();
        }
    };

});
