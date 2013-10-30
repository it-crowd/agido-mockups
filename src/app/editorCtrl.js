agidoMockups.controller("EditorCtrl", function ($scope)
{
    $scope.selectedComponent = null;
    $scope.editingSource = false;

    var clipboard;
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
        "Label": {constructor: Kinetic.Text,
            options: {
                text: "Label",
                fill: '#000',
                draggable: true
            },
            multilineSource: false,
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
            properties: fontProperties.concat(dimensionProperties)
        },
        "Link": {constructor: Kinetic.Link,
            options: {
                color: '#000',
                draggable: true
            },
            multilineSource: false,
            properties: fontProperties.concat(dimensionProperties, [
                {name: "disabled", type: "boolean"}
            ])
        },
        "RadioItem": {
            constructor: Kinetic.RadioItem, options: {
                color: '#000', draggable: true
            },
            multilineSource: false,
            properties: fontProperties.concat(dimensionProperties, [
                {name: "selected", type: "boolean"}
            ])
        },
        "RadioGroup": {
            constructor: Kinetic.RadioGroup, options: {
                color: '#000', draggable: true
            },
            multilineSource: true,
            properties: fontProperties.concat(dimensionProperties)
        },
        "Input": {constructor: Kinetic.Input,
            options: {
                color: '#000',
                draggable: true
            },
            multilineSource: false,
            properties: fontProperties.concat(dimensionProperties, [
                {name: "disabled", type: "boolean"},
                {name: "datepicker", type: "boolean"}
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
        }
    };

    function addToStage(component)
    {
        $scope.stage.getLayers()[0].add(component);
        $scope.stage.draw();
    }

    $scope.addToStage = function (type)
    {
        var scheme = components[type];
        if (null == scheme) {
            throw new Error("Unsupported type: " + type);
        }
        var component = new scheme.constructor(scheme.options);
        component.mockupComponent = scheme;
        addToStage(component);
    };


    function applyComponentSource(source)
    {
        if (null != $scope.selectedComponent && null != source && "" != source.trim()) {
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
//        TODO implement this method
        alert("Not implemented yet");
    };

    $scope.redo = function ()
    {
//        TODO implement this method
        alert("Not implemented yet");
    };

    $scope.duplicate = function ()
    {
        if (null != $scope.selectedComponent) {
            //noinspection JSValidateTypes
            var clone = new $scope.selectedComponent.mockupComponent.constructor($scope.selectedComponent.attrs);
            clone.setAttr("x", clone.getAttr("x") + 15);
            clone.setAttr("y", clone.getAttr("y") + 15);
            clone.mockupComponent = $scope.selectedComponent.mockupComponent;
            $scope.selectedComponent = clone;
            addToStage(clone);
        }
    };

    $scope.cut = function ()
    {
        if (null != $scope.selectedComponent) {
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
            $scope.selectedComponent.remove();
            $scope.selectedComponent = null;
            $scope.editingSource = false;
            $scope.stage.draw();
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
            $scope.selectedComponent.moveToTop();
            $scope.stage.draw();
        }
    };

    $scope.moveUp = function ()
    {
        if (null != $scope.selectedComponent) {
            $scope.selectedComponent.moveUp();
            $scope.stage.draw();
        }
    };

    $scope.moveDown = function ()
    {
        if (null != $scope.selectedComponent) {
            $scope.selectedComponent.moveDown();
            $scope.stage.draw();
        }
    };

    $scope.moveToBottom = function ()
    {
        if (null != $scope.selectedComponent) {
            $scope.selectedComponent.moveToBottom();
            $scope.stage.draw();
        }
    };

});
