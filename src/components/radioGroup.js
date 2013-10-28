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
