(function ()
{
    function updateChildren(item)
    {
        var text = item.find(".text")[0];
        var border = item.find(".border")[0];
        text.setText(item.getText());
        text.setFontFamily(item.getFontFamily());
        text.setFontStyle(item.getFontStyle());
        text.setFontSize(item.getFontSize());
        var color = item.getDisabled() ? '#aaa' : item.getColor();
        text.setFill(color);
        var borderHeight = text.getHeight() + 10;
        border.setWidth(item.getWidth());
        border.setHeight(borderHeight);
        border.setStroke(color);
        item.setHeight(borderHeight);
    }

    Kinetic.Input = function (config)
    {
        this.____init(config);
    };
    Kinetic.Input.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, AgidoMockups.extend({width: 150}, config));
            this.className = "Input";
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "border", x: 0, y: 0, draggable: false, fill: 'white', stroke: config.color, strokeWidth: 2})));
            this.add(new Kinetic.Text(AgidoMockups.extend(config,
                    {name: "text", x: 5, y: 5, width: "auto", height: "auto", draggable: false, fill: config.color, stroke: null})));
            var propertyChangeListener = function (event)
            {
                if (event.newVal != event.oldVal) {
                    updateChildren(this);
                }
            };
            this.on("fontFamilyChange", propertyChangeListener);
            this.on("fontSizeChange", propertyChangeListener);
            this.on("fontStyleChange", propertyChangeListener);
            this.on("textChange", propertyChangeListener);
            this.on("disabledChange", propertyChangeListener);
            this.on("widthChange", propertyChangeListener);
            this.on("heightChange", propertyChangeListener);
            updateChildren(this);
        },
        toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }
    };
    Kinetic.Util.extend(Kinetic.Input, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.Input, 'fontFamily', "Arial");
    Kinetic.Factory.addGetterSetter(Kinetic.Input, 'fontSize', 18);
    Kinetic.Factory.addGetterSetter(Kinetic.Input, 'fontStyle', "normal");
    Kinetic.Factory.addGetterSetter(Kinetic.Input, 'text', "");
    Kinetic.Factory.addGetterSetter(Kinetic.Input, 'disabled', false);
    Kinetic.Factory.addColorGetterSetter(Kinetic.Input, 'color');
})();
