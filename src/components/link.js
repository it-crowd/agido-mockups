(function ()
{
    function updateChildren(item, config)
    {
        var textChild = item.find(".text")[0];
        textChild.setText(item.getText());
        //noinspection JSUnresolvedFunction
        var color = "disabled" == item.getState() ? '#aaa' : config.color;
        //noinspection JSUnresolvedFunction
        textChild.setFill(color);
        var line = item.find(".line")[0];
        //noinspection JSUnresolvedFunction
        line.setPoints([
            {x: 0, y: textChild.getTextHeight()},
            {x: textChild.getWidth(), y: textChild.getTextHeight()}
        ]);
        //noinspection JSUnresolvedFunction
        line.setStroke(color);
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
            this.add(new Kinetic.Text(AgidoMockups.extend(config, {name: "text", x: 0, y: 0, draggable: false, fill: config.color, stroke: null})));
            this.add(new Kinetic.Line(AgidoMockups.extend(config, {name: "line", x: 0, y: 0, draggable: false, stroke: config.color})));
            var propertyChangeListener = function (event)
            {
                if (event.newVal != event.oldVal) {
                    updateChildren(this, config);
                }
            };
            this.on("textChange", propertyChangeListener);
            this.on("stateChange", propertyChangeListener);
            updateChildren(this, config);
        },
        toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }
    };
    Kinetic.Util.extend(Kinetic.Link, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.Link, 'state', "normal");
    Kinetic.Factory.addGetterSetter(Kinetic.Link, 'text', "The link");
})();
