(function ()
{
    function updateChildren(item)
    {
        item.destroyChildren();
        var lines = item.getText().split("\n");
        var height = 0, maxWidth;
        for (var i = 0; i < lines.length; i++) {
            var match = lines[i].match(/^\s*(-?)\s*\[\s*(x)?\s*\]\s*(.*)/);
            var component;
            if (match) {
                var disabled = "-" == match[1];
                var selected = "x" == match[2];
                var text = match[3];
                component = new Kinetic.Checkbox({text: text, color: '#000', fontSize: 14, selected: selected, y: height, disabled: disabled});
            } else {
                component = new Kinetic.Text({text: lines[i], fill: '#000', fontSize: 14, y: height});
            }
            component.setFontFamily(item.getFontFamily());
            component.setFontStyle(item.getFontStyle());
            component.setFontSize(item.getFontSize());
            item.add(component);
            //noinspection JSUnusedAssignment
            if (undefined == maxWidth || maxWidth < component.getWidth()) {
                maxWidth = component.getWidth();
            }
            height += component.getHeight();
        }
        item.setHeight(height);
        item.setWidth(maxWidth);
    }

    Kinetic.CheckboxGroup = function (config)
    {
        this.____init(config);
    };
    Kinetic.CheckboxGroup.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, config);
            this.className = "CheckboxGroup";
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
    Kinetic.Util.extend(Kinetic.CheckboxGroup, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.CheckboxGroup, 'fontFamily', "Arial");
    Kinetic.Factory.addGetterSetter(Kinetic.CheckboxGroup, 'fontSize', 18);
    Kinetic.Factory.addGetterSetter(Kinetic.CheckboxGroup, 'fontStyle', "normal");
    Kinetic.Factory.addGetterSetter(Kinetic.CheckboxGroup, 'text', "[] Checkbox A\n[x] Checkbox B\n-[] Checkbox C\n-[x] Checkbox D\nFree text");
})();
