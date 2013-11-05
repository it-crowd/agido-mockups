(function ()
{
    function updateChildren(item)
    {
        var border = item.find(".border")[0];
        var text = item.find(".text")[0];
        var color = item.getDisabled() ? '#aaa' : item.getColor();
        text.setWidth(item.getWidth());
        text.setText(item.getText());
        text.setFill(color);
        border.setWidth(item.getWidth());
        border.setHeight(item.getHeight());
        border.setStroke(color);
    }

    Kinetic.TextArea = function (config)
    {
        this.____init(config);
    };
    Kinetic.TextArea.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, AgidoMockups.extend({width: 200, height: 100}, config));
            this.className = "TextArea";
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "border", x: 0, y: 0, draggable: false, fill: 'white', stroke: config.color, strokeWidth: 2})));
            this.add(new Kinetic.Text(AgidoMockups.extend(config, {name: "text", x: 0, y: 0, width: "auto", height: "auto", padding: 5, draggable: false})));
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
            this.on("colorChange", propertyChangeListener);
            this.on("widthChange", propertyChangeListener);
            this.on("heightChange", propertyChangeListener);
            updateChildren(this);
        },
        toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }
    };
    Kinetic.Util.extend(Kinetic.TextArea, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.TextArea, 'fontFamily', "Arial");
    Kinetic.Factory.addGetterSetter(Kinetic.TextArea, 'fontSize', 18);
    Kinetic.Factory.addGetterSetter(Kinetic.TextArea, 'fontStyle', "normal");
    Kinetic.Factory.addGetterSetter(Kinetic.TextArea, 'text', "Textarea");
    Kinetic.Factory.addGetterSetter(Kinetic.TextArea, 'disabled', false);
    Kinetic.Factory.addColorGetterSetter(Kinetic.TextArea, 'color');
})();
