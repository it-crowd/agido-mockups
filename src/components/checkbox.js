(function ()
{
    function updateChildren(item, config)
    {
        var label = item.find(".label")[0];
        var outerRect = item.find(".outerRect")[0];
        var innerRect = item.find(".innerRect")[0];
        var color = true === item.getDisabled() ? '#aaa' : config.color;
        label.setText(item.getText());
        label.setFontFamily(item.getFontFamily());
        label.setFontStyle(item.getFontStyle());
        label.setFontSize(item.getFontSize());
        label.setFill(color);
        var strokeWidth = 1;
        var outerSize = (label.getHeight() - 4 * strokeWidth);
        outerRect.setWidth(outerSize);
        outerRect.setHeight(outerSize);
        outerRect.setX(0 + strokeWidth);
        outerRect.setY(0 + strokeWidth);
        outerRect.setStroke(color);

        label.setX(outerSize * 1.5);

        innerRect.setFill(color);
        if (item.getSelected()) {
            innerRect.show();
            var innerSize = outerSize * .6;
            innerRect.setWidth(innerSize);
            innerRect.setHeight(innerSize);
            innerRect.setX((outerSize - innerSize) / 2 + strokeWidth);
            innerRect.setY((outerSize - innerSize) / 2 + strokeWidth);
        } else {
            innerRect.hide();
        }
        item.setWidth(label.getX() + label.getWidth());
        item.setHeight(label.getHeight());
    }

    Kinetic.Checkbox = function (config)
    {
        this.____init(config);
    };
    Kinetic.Checkbox.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, config);
            this.className = "Checkbox";
            this.add(new Kinetic.Text(AgidoMockups.extend(config,
                    {name: "label", x: 0, y: 0, width: "auto", height: "auto", draggable: false, fill: config.color, stroke: null})));
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "outerRect", x: 0, y: 0, draggable: false, fill: null, stroke: config.color, strokeWidth: .5})));
            this.add(new Kinetic.Rect(AgidoMockups.extend(config, {name: "innerRect", x: 0, y: 0, draggable: false, fill: config.color, stroke: null})));
            var propertyChangeListener = function (event)
            {
                if (event.newVal != event.oldVal) {
                    updateChildren(this, config);
                }
            };
            this.on("fontFamilyChange", propertyChangeListener);
            this.on("fontSizeChange", propertyChangeListener);
            this.on("fontStyleChange", propertyChangeListener);
            this.on("textChange", propertyChangeListener);
            this.on("disabledChange", propertyChangeListener);
            this.on("selectedChange", propertyChangeListener);
            updateChildren(this, config);
        },
        toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }
    };
    Kinetic.Util.extend(Kinetic.Checkbox, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.Checkbox, 'fontFamily', "Arial");
    Kinetic.Factory.addGetterSetter(Kinetic.Checkbox, 'fontSize', 18);
    Kinetic.Factory.addGetterSetter(Kinetic.Checkbox, 'fontStyle', "normal");
    Kinetic.Factory.addGetterSetter(Kinetic.Checkbox, 'text', "Checkbox");
    Kinetic.Factory.addGetterSetter(Kinetic.Checkbox, 'disabled', false);
    Kinetic.Factory.addGetterSetter(Kinetic.Checkbox, 'selected', false);
})();
