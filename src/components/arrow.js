(function ()
{
    Kinetic.Arrow = function (config)
    {
        this.____init(config);
    };
    Kinetic.Arrow.prototype = {
        ____init: function (config)
        {
            Kinetic.Shape.call(this, config);
            this.className = "Arrow";
        },
        drawFunc: function (context)
        {
            this.setStrokeWidth(5);
            context.beginPath();
            var height = this.getHeight();
            var width = this.getWidth();
            if (this.getLeftDown()) {
                context.moveTo(0, 0);
                context.quadraticCurveTo(width * 3 / 4, height / 4, width, height);
                context.moveTo(width, height * 3 / 4);
                context.lineTo(width, height);
                context.lineTo(width * 3 / 4, height);
                context.moveTo(0, height / 4);
                context.lineTo(0, 0);
                context.lineTo(width / 4, 0);
            } else {
                context.moveTo(0, height);
                context.quadraticCurveTo(width / 4, height / 4, width, 0);
                context.moveTo(0, height * 3 / 4);
                context.lineTo(0, height);
                context.lineTo(width / 4, height);
                context.moveTo(width, height / 4);
                context.lineTo(width, 0);
                context.lineTo(width * 3 / 4, 0);
            }
            context.strokeShape(this);
        },
        toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }
    };
    Kinetic.Util.extend(Kinetic.Arrow, Kinetic.Shape);
    Kinetic.Factory.addGetterSetter(Kinetic.Arrow, 'leftDown', true);
    Kinetic.Factory.addGetterSetter(Kinetic.Arrow, 'height', 100);
    Kinetic.Factory.addGetterSetter(Kinetic.Arrow, 'width', 100);
})();
