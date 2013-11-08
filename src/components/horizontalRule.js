(function ()
{
    function updateChildren(item)
    {
        var line = item.find(".line")[0];
        var lineY = (item.getHeight() - line.getStrokeWidth()) / 2;
        line.setPoints([
            {x: 0, y: lineY},
            {x: item.getWidth(), y: lineY}
        ]);
    }

    Kinetic.HorizontalRule = function (config)
    {
        this.____init(config);
    };
    Kinetic.HorizontalRule.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, AgidoMockups.extend({width: 200, height: 10}, config));
            this.className = "HorizontalRule";
            this.add(new Kinetic.Line(AgidoMockups.extend(config, {name: "line", stroke: config.color, strokeWidth: 2})));
            var propertyChangeListener = function (event)
            {
                if (event.newVal != event.oldVal) {
                    updateChildren(this);
                }
            };
            this.on("widthChange", propertyChangeListener);
            updateChildren(this);
        },
        toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }
    };
    Kinetic.Util.extend(Kinetic.HorizontalRule, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.HorizontalRule, 'text', "");
})();
