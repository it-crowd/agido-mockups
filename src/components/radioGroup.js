(function ()
{
    function updateChildren(item)
    {
        item.removeChildren();
        var lines = item.getText().split("\n");
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
            //noinspection JSUnresolvedFunction
            component.setFontFamily(item.getFontFamily());
            //noinspection JSUnresolvedFunction
            component.setFontStyle(item.getFontStyle());
            //noinspection JSUnresolvedFunction
            component.setFontSize(item.getFontSize());
            Kinetic.Group.prototype.add.call(item, component);
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
            var propertyChangeListener = function (event)
            {
                if (event.newVal != event.oldVal) {
                    updateChildren(this);
                }
            };
            this.on("fontFamilyChange", propertyChangeListener);
            this.on("fontSizeChange", propertyChangeListener);
            this.on("fontStyleChange", propertyChangeListener);
            this.on("textChange", propertyChangeListener);
            updateChildren(this);
        }, toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }
    };
    Kinetic.Util.extend(Kinetic.RadioGroup, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.RadioGroup, 'fontFamily', "Arial");
    Kinetic.Factory.addGetterSetter(Kinetic.RadioGroup, 'fontSize', 18);
    Kinetic.Factory.addGetterSetter(Kinetic.RadioGroup, 'fontStyle', "normal");
    Kinetic.Factory.addGetterSetter(Kinetic.RadioGroup, 'text', "() Radio item A\n(o) Radio item B");
})();
