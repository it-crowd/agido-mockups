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
            this.add(new Kinetic.Text(AgidoMockups.extend(config, {id: "text", x: 0, y: 0, draggable: false, fill: config.color, stroke: null})));
            this.add(new Kinetic.Line(AgidoMockups.extend(config, {id: "line", x: 0, y: 0, draggable: false, stroke: config.color})));
            //noinspection JSUnusedLocalSymbols
            this.add = function (ignore)
            {
                throw new Error("Cannot add children to Link");
            }
        }, drawScene: function (canvas)
        {
            var textChild = this.find("#text")[0];
            textChild.setText(this.getText());
            //noinspection JSUnresolvedFunction
            this.find("#line")[0].setPoints([
                {x: 0, y: textChild.getTextHeight()},
                {x: textChild.getWidth(), y: textChild.getTextHeight()}
            ]);
            return Kinetic.Container.prototype.drawScene.call(this, canvas);
        }, toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }
    };
    Kinetic.Util.extend(Kinetic.Link, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.Link, 'text', "The link");
})();
