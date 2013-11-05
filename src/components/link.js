(function ()
{
    function updateChildren(item, config)
    {
        var textChild = item.find(".text")[0];
        textChild.setText(item.getText());
        textChild.setFontFamily(item.getFontFamily());
        textChild.setFontStyle(item.getFontStyle());
        textChild.setFontSize(item.getFontSize());
        var color = true === item.getDisabled() ? '#aaa' : item.color;
        textChild.setFill(color);
        var line = item.find(".line")[0];
        line.setPoints([
            {x: 0, y: textChild.getTextHeight()},
            {x: textChild.getWidth(), y: textChild.getTextHeight()}
        ]);
        line.setStroke(color);
        item.setWidth(textChild.getWidth());
        item.setHeight(textChild.getHeight());
    }

    Kinetic.Link = function (config)
    {
        this.____init(config);
    };
    Kinetic.Link.prototype = {
        ____init: function (config)
        {
            this.className = "Link";
            Kinetic.Group.call(this, config);
            this.add(new Kinetic.Text(AgidoMockups.extend(config,
                    {name: "text", x: 0, y: 0, width: "auto", height: "auto", draggable: false, fill: config.color, stroke: null})));
            this.add(new Kinetic.Line(AgidoMockups.extend(config, {name: "line", x: 0, y: 0, draggable: false, stroke: config.color})));
            var propertyChangeListener = function (event)
            {
                if (event.newVal != event.oldVal) {
                    updateChildren(this, config);
                }
            };
            this.on("fontFamilyChange", propertyChangeListener);
            this.on("fontSizeChange", propertyChangeListener);
            this.on("fontStyleChange", propertyChangeListener);
            this.on("disabledChange", propertyChangeListener);
            this.on("textChange", propertyChangeListener);
            updateChildren(this, config);
        },
        toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }
    };
    Kinetic.Util.extend(Kinetic.Link, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.Link, 'fontFamily', "Arial");
    Kinetic.Factory.addGetterSetter(Kinetic.Link, 'fontSize', 18);
    Kinetic.Factory.addGetterSetter(Kinetic.Link, 'fontStyle', "normal");
    Kinetic.Factory.addGetterSetter(Kinetic.Link, 'disabled', false);
    Kinetic.Factory.addGetterSetter(Kinetic.Link, 'text', "The link");
})();
