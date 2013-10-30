(function ()
{
    function updateChildren(item, config)
    {
        var text = item.find(".text")[0];
        var border = item.find(".border")[0];
        var shadow = item.find(".shadow")[0];
        text.setText(item.getText());
        //noinspection JSUnresolvedFunction
        text.setFontFamily(item.getFontFamily());
        //noinspection JSUnresolvedFunction
        text.setFontStyle(item.getFontStyle());
        //noinspection JSUnresolvedFunction
        text.setFontSize(item.getFontSize());
        //noinspection JSUnresolvedFunction
        var color = item.getDisabled() ? '#aaa' : config.color;
        var textWidth = text.getWidth();
        var textWidthWithOffset = textWidth + 10;
        //noinspection JSUnresolvedFunction
        border.setWidth(textWidthWithOffset < 150 ? 150 : textWidthWithOffset);
        border.setHeight(text.getHeight() + 10);
        //noinspection JSUnresolvedFunction
        border.setStroke(color);
        var borderWidth = border.getWidth();
        var textX = (borderWidth - textWidth) / 2;
        text.setAttr("x", textX);
        //noinspection JSUnresolvedFunction
        text.setFill(color);
        shadow.setWidth(borderWidth);
        shadow.setHeight(border.getHeight());
        //noinspection JSUnresolvedFunction
        shadow.setFill(color);
    }

    Kinetic.Button = function (config)
    {
        this.____init(config);
    };
    Kinetic.Button.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, config);
            this.className = "Button";
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "shadow", x: 5, y: 5, draggable: false, fill: 'black', stroke: null})));
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "border", x: 0, y: 0, draggable: false, fill: 'white', stroke: config.color, strokeWidth: 2})));
            this.add(new Kinetic.Text(AgidoMockups.extend(config, {name: "text", x: 0, y: 5, draggable: false, fill: config.color, stroke: null})));
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
            updateChildren(this, config);
        },
        toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }, getHeight: function ()
        {
            return this.find(".border")[0].getHeight() + 4;
        }
    };
    Kinetic.Util.extend(Kinetic.Button, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.Button, 'fontFamily', "Arial");
    Kinetic.Factory.addGetterSetter(Kinetic.Button, 'fontSize', 18);
    Kinetic.Factory.addGetterSetter(Kinetic.Button, 'fontStyle', "normal");
    Kinetic.Factory.addGetterSetter(Kinetic.Button, 'text', "Button");
    Kinetic.Factory.addGetterSetter(Kinetic.Button, 'disabled', false);
})();
