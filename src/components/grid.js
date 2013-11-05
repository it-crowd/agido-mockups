(function ()
{

    Kinetic.Grid = function (config)
    {
        this.____init(config);
    };
    Kinetic.Grid.prototype = {
        ____init: function (config)
        {
            Kinetic.Shape.call(this, config);
            this.className = "Grid";
        },
        drawFunc: function (context)
        {
            var height = this.getHeight();
            var width = this.getWidth();
            var spacing = Math.max(5, this.getSpacing());

            context.beginPath();
            for (var x = spacing + .5; x < width; x += spacing) {
                context.moveTo(x, 0);
                context.lineTo(x, height);
            }
            for (var y = spacing + .5; y < height; y += spacing) {
                context.moveTo(0, y);
                context.lineTo(width, y);
            }

            context.strokeShape(this);
        }
    };
    Kinetic.Util.extend(Kinetic.Grid, Kinetic.Shape);
    Kinetic.Factory.addGetterSetter(Kinetic.Grid, "spacing", 20);
})();
