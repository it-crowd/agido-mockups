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
(function ()
{
    function updateChildren(item)
    {
        var label = item.find(".label")[0];
        var outerCircle = item.find(".outerCircle")[0];
        var innerCircle = item.find(".innerCircle")[0];
        label.setText(item.getText());
        var strokeWidth = 1;
        var outerRadius = (label.getHeight() - 2 * strokeWidth) / 4;
        //noinspection JSUnresolvedFunction
        outerCircle.setRadius(outerRadius);
        outerCircle.setAttr("x", outerRadius + strokeWidth);
        outerCircle.setAttr("y", outerRadius * 2 + strokeWidth);

        label.setAttr("x", outerRadius * 3);

        //noinspection JSUnresolvedFunction
        if (item.getSelected()) {
            innerCircle.show();
            var innerRadius = outerRadius * .6;
            //noinspection JSUnresolvedFunction
            innerCircle.setRadius(innerRadius);
            innerCircle.setAttr("x", outerRadius + strokeWidth);
            innerCircle.setAttr("y", outerRadius * 2 + strokeWidth);
        } else {
            innerCircle.hide();
        }
    }

    Kinetic.RadioItem = function (config)
    {
        this.____init(config);
    };
    Kinetic.RadioItem.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, config);
            this.className = "RadioItem";
            this.add(new Kinetic.Text(myExtend(config, {name: "label", x: 0, y: 0, draggable: false, fill: config.color, stroke: null})));
            this.add(new Kinetic.Circle(myExtend(config,
                    {name: "outerCircle", x: 0, y: 0, draggable: false, fill: null, stroke: config.color, strokeWidth: .5})));
            this.add(new Kinetic.Circle(myExtend(config, {name: "innerCircle", x: 0, y: 0, draggable: false, fill: config.color, stroke: null})));
            //noinspection JSUnusedLocalSymbols
            this.add = function (ignore)
            {
                throw new Error("Cannot add children to RadioItem");
            };
            this.on("textChange", function (event)
            {
                if (event.newVal != event.oldVal) {
                    updateChildren(this);
                }
            });
            this.on("selectedChange", function (event)
            {
                if (event.newVal != event.oldVal) {
                    updateChildren(this);
                }
            });
            updateChildren(this);
        },
        toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }, getHeight: function ()
        {
            return this.find(".label")[0].getHeight();
        }
    };
    Kinetic.Util.extend(Kinetic.RadioItem, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.RadioItem, 'text', "The radio item");
    Kinetic.Factory.addGetterSetter(Kinetic.RadioItem, 'selected', false);
})();
(function ()
{
    function updateChildren(group)
    {
        group.removeChildren();
        var lines = group.getText().split("\n");
        var height = 0;
        for (var i = 0; i < lines.length; i++) {
            var match = lines[i].match(/^\s*\(\s*(o|-)?\s*\)\s*(.*)/);
            var component;
            if (match) {
                var selected = "o" == match[1];
                var text = match[2];
                component = new Kinetic.RadioItem({text: text, color: '#000', fontSize: 14, selected: selected, y: height});
            } else {
                component = new Kinetic.Text({text: lines[i], fill: '#000', fontSize: 14, y: height});
            }
            Kinetic.Group.prototype.add.call(group, component);
            height += component.getHeight()
        }
    }

    Kinetic.RadioGroup = function (config)
    {
        this.____init(config);
    };
    Kinetic.RadioGroup.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, config);
            this.className = "RadioGroup";
            //noinspection JSUnusedLocalSymbols
            this.add = function (ignore)
            {
                throw new Error("Cannot add children to RadioGroup");
            };
            this.on("textChange", function (event)
            {
                if (event.newVal != event.oldVal) {
                    updateChildren(this);
                }
            });
            updateChildren(this);
        }, toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }
    };
    Kinetic.Util.extend(Kinetic.RadioGroup, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.RadioGroup, 'text', "() Radio item A\n(o) Radio item B");
})();