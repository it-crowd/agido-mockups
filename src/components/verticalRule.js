(function ()
{
    function updateChildren(item)
    {
        var line = item.find(".line")[0];
        var lineX = (item.getWidth() - line.getStrokeWidth()) / 2;
        line.setPoints([
            {x: lineX, y: 0},
            {x: lineX, y: item.getHeight()}
        ]);
    }

    Kinetic.VerticalRule = function (config)
    {
        this.____init(config);
    };
    Kinetic.VerticalRule.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, AgidoMockups.extend({width: 10, height: 200}, config));
            this.className = "VerticalRule";
            this.add(new Kinetic.Line(AgidoMockups.extend(config, {name: "line", stroke: config.color, strokeWidth: 2})));
            var propertyChangeListener = function (event)
            {
                if (event.newVal != event.oldVal) {
                    updateChildren(this);
                }
            };
            this.on("heightChange", propertyChangeListener);
            updateChildren(this);
        },
        toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }
    };
    Kinetic.Util.extend(Kinetic.VerticalRule, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.VerticalRule, 'text', "");
})();
