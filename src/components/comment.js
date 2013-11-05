(function ()
{
    function updateChildren(item, config)
    {
        var text = item.find(".text")[0];
        var tape = item.find(".tape")[0];
        var card = item.find(".card")[0];
        text.setText(item.getText());
        text.setFontFamily(item.getFontFamily());
        text.setFontStyle(item.getFontStyle());
        text.setFontSize(item.getFontSize());
        text.setFill(config.color);
        text.setWidth(item.getWidth());
        card.setWidth(item.getWidth());
        card.setHeight(item.getHeight());
        tape.setX((card.getWidth() - tape.getWidth()) / 2);
        item.setRotationDeg(3);
    }

    Kinetic.Comment = function (config)
    {
        this.____init(config);
    };
    Kinetic.Comment.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, AgidoMockups.extend({width: 300, height: 200}, config));
            this.className = "Comment";
            this.add(new Kinetic.Rect(AgidoMockups.extend(config, {name: "card", x: 0, y: 10, draggable: false, fill: 'yellow', stroke: null})));
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "tape", x: 0, y: 0, rotationDeg: -1, width: 50, height: 20, draggable: false, fill: 'red', stroke: null})));
            this.add(new Kinetic.Text(AgidoMockups.extend(config,
                    {name: "text", x: 0, y: 10, width: "auto", height: "auto", padding: 30, draggable: false, fill: config.color, stroke: null})));
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
            this.on("widthChange", propertyChangeListener);
            this.on("heightChange", propertyChangeListener);
            updateChildren(this, config);
        },
        toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }
    };
    Kinetic.Util.extend(Kinetic.Comment, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.Comment, 'fontFamily', "Arial");
    Kinetic.Factory.addGetterSetter(Kinetic.Comment, 'fontSize', 18);
    Kinetic.Factory.addGetterSetter(Kinetic.Comment, 'fontStyle', "normal");
    Kinetic.Factory.addGetterSetter(Kinetic.Comment, 'text', "Comment");
})();
