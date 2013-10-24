//(function ()
//{
//    Kinetic.Link = function (config)
//    {
//        this.____init(config);
//    };
//    Kinetic.Link.prototype = {
//        ____init: function (config)
//        {
//            // call super constructor
//            Kinetic.Text.call(this, config);
//            this.className = 'Link';
//        },
//        drawFunc: function (context)
//        {
//            Kinetic.Text.prototype.drawFunc.call(this, context);
//            var y = this.getLineHeight() * this.getTextHeight();
//            context.beginPath();
//            context.moveTo(0, y);
//            context.lineTo(this.getWidth(), y);
//            context.stroke(this);
//        }
//    };
//    Kinetic.Util.extend(Kinetic.Link, Kinetic.Text);
//
//})();
myExtend = function ()
{
    var c = {};
    for (var i in arguments) {
        if (arguments.hasOwnProperty(i)) {
            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    c[key] = arguments[i][key];
                }
            }
        }
    }
    return c;
};
(function ()
{
    Kinetic.Link = function (config)
    {
        this.____init(config);
    };
    Kinetic.Link.prototype = {
        ____init: function (config)
        {
            this.className = "Link";
            Kinetic.Group.call(this, config);
            this.add(new Kinetic.Text(myExtend(config, {id: "text", x: 0, y: 0, draggable: false, fill: config.color, stroke: null})));
            this.add(new Kinetic.Line(myExtend(config, {id: "line", x: 0, y: 0, draggable: false, stroke: config.color})));
        }, drawScene: function (canvas)
        {
            var textChild = this.find("#text")[0];
            textChild.setText(this.getText());
            this.find("#line")[0].setPoints([
                {x: 0, y: textChild.getTextHeight()},
                {x: textChild.getWidth(), y: textChild.getTextHeight()}
            ]);
            return Kinetic.Container.prototype.drawScene.call(this, canvas);
        }
    };
    Kinetic.Util.extend(Kinetic.Link, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.Link, 'text', "The link");
})();