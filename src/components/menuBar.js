(function ()
{
    function updateChildren(item)
    {
        var border = item.find(".border")[0];
        var itemsGroup = item.find(".itemsGroup")[0];
        var itemXOffset = 15;
        var itemYOffset = 5;

        itemsGroup.destroyChildren();
        var component;
        var totalBarWidth = 0;
        var borderHeight = 0;
        var items = item.getText().split(",");
        for (var i = 0; i < items.length; i++) {
            totalBarWidth += itemXOffset;
            component = new Kinetic.Text({text: items[i], fill: '#000', fontSize: 18, x: totalBarWidth, y: itemYOffset});
            component.setFontFamily(item.getFontFamily());
            component.setFontStyle(item.getFontStyle());
            component.setFontSize(item.getFontSize());
            itemsGroup.add(component);
            totalBarWidth += component.getWidth() + itemXOffset;
            borderHeight = component.getHeight() + 2 * itemYOffset;
        }
        border.setWidth(item.getWidth());
        border.setHeight(borderHeight);
        item.setHeight(borderHeight);
        if (totalBarWidth > item.getWidth()) {
            item.setWidth(totalBarWidth);
        }
    }

    Kinetic.MenuBar = function (config)
    {
        this.____init(config);
    };
    Kinetic.MenuBar.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, AgidoMockups.extend({width: 300}, config));
            this.className = "MenuBar";
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "border", x: 0, y: 0, draggable: false, fill: 'white', stroke: '#000', strokeWidth: 2})));
            this.add(new Kinetic.Group(AgidoMockups.extend(config, {name: "itemsGroup", x: 0, y: 0, draggable: false})));
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
            this.on("widthChange", propertyChangeListener);
            updateChildren(this);
        },
        toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }
    };
    Kinetic.Util.extend(Kinetic.MenuBar, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.MenuBar, 'fontFamily', "Arial");
    Kinetic.Factory.addGetterSetter(Kinetic.MenuBar, 'fontSize', 18);
    Kinetic.Factory.addGetterSetter(Kinetic.MenuBar, 'fontStyle', "normal");
    Kinetic.Factory.addGetterSetter(Kinetic.MenuBar, 'text', "File,Edit,View,Help");
})();
