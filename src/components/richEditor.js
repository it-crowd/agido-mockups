(function ()
{
    function updateChildren(item)
    {
        var frame = item.find(".frame")[0];
        var toolbarGroup = item.find(".toolbarGroup")[0];
        var toolbarBorder = item.find(".toolbarBorder")[0];
        var text = item.find(".text")[0];
        var color = item.getDisabled() ? '#aaa' : item.getColor();
        var iconOpacity = item.getDisabled() ? 0.6 : 1;
        var itemWidth = item.getWidth();
        var itemHeight = item.getHeight();
        frame.setAttr("width", itemWidth);
        frame.setAttr("height", itemHeight);
        frame.setStroke(color);
        var toolbarIcons = toolbarGroup.getChildren();
        const iconMargin = 4;
        var icon;
        var toolbarWidth = iconMargin;
        for (var i = 0; i < toolbarIcons.length; i++) {
            icon = toolbarIcons[i];
            icon.setX(toolbarWidth);
            icon.setY(iconMargin);
            icon.setOpacity(iconOpacity);
            toolbarWidth += icon.getWidth() + iconMargin;
        }
        var toolbarHeight = toolbarIcons[0].getHeight() + 2 * iconMargin;
        var frameStrokeWidth = frame.getStrokeWidth();
        toolbarBorder.setPoints([frameStrokeWidth, toolbarHeight, frame.getWidth() - frameStrokeWidth, toolbarHeight]);
        toolbarBorder.setStroke(color);
        text.setX(frameStrokeWidth);
        text.setY(toolbarHeight + frameStrokeWidth);
        text.setWidth(itemWidth - 2 * frameStrokeWidth);
        text.setHeight(itemHeight - 2 * frameStrokeWidth);
        text.setText(item.getText());
        text.setFill(color);
        text.setFontFamily(item.getFontFamily());
        text.setFontStyle(item.getFontStyle());
        text.setFontSize(item.getFontSize());
        item.setClip(0, 0, itemWidth, itemHeight);
    }

    Kinetic.RichEditor = function (config)
    {
        this.____init(config);
    };
    Kinetic.RichEditor.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, AgidoMockups.extend({width: 395, height: 200}, config));
            this.className = "RichEditor";
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "frame", x: 0, y: 0, draggable: false, fill: '#fff', stroke: '#000', strokeWidth: 1.5})));
            var toolbarGroup = new Kinetic.Group({name: "toolbarGroup", x: 0, y: 0, draggable: false});
            const iconHeight = 20;
            const iconPadding = 4;
            toolbarGroup.add(AgidoMockups.borderedIcon(AgidoMockups.icons.folder.clone(), iconHeight, iconPadding));
            toolbarGroup.add(AgidoMockups.borderedIcon(AgidoMockups.icons.undo.clone(), iconHeight, iconPadding));
            toolbarGroup.add(AgidoMockups.borderedIcon(AgidoMockups.icons.redo.clone(), iconHeight, iconPadding));
            toolbarGroup.add(AgidoMockups.borderedIcon(AgidoMockups.icons.comboBox.clone(), iconHeight, iconPadding));
            toolbarGroup.add(AgidoMockups.borderedIcon(AgidoMockups.icons.bold.clone(), iconHeight, iconPadding));
            toolbarGroup.add(AgidoMockups.borderedIcon(AgidoMockups.icons.italic.clone(), iconHeight, iconPadding));
            toolbarGroup.add(AgidoMockups.borderedIcon(AgidoMockups.icons.underline.clone(), iconHeight, iconPadding));
            toolbarGroup.add(AgidoMockups.borderedIcon(AgidoMockups.icons.alignLeft.clone(), iconHeight, iconPadding));
            toolbarGroup.add(AgidoMockups.borderedIcon(AgidoMockups.icons.alignCenter.clone(), iconHeight, iconPadding));
            toolbarGroup.add(AgidoMockups.borderedIcon(AgidoMockups.icons.alignRight.clone(), iconHeight, iconPadding));
            toolbarGroup.add(AgidoMockups.borderedIcon(AgidoMockups.icons.justify.clone(), iconHeight, iconPadding));
            toolbarGroup.add(AgidoMockups.borderedIcon(AgidoMockups.icons.bulletList.clone(), iconHeight, iconPadding));
            toolbarGroup.add(AgidoMockups.borderedIcon(AgidoMockups.icons.numberedList.clone(), iconHeight, iconPadding));
            toolbarGroup.add(AgidoMockups.borderedIcon(AgidoMockups.icons.image.clone(), iconHeight, iconPadding));
            this.add(toolbarGroup);
            this.add(new Kinetic.Line(AgidoMockups.extend(config, {name: "toolbarBorder", x: 0, y: 0, draggable: false, stroke: '#000', strokeWidth: 1.5})));
            this.add(new Kinetic.Text(AgidoMockups.extend(config,
                    {name: "text", x: 0, y: 0, width: "auto", height: "auto", padding: 5, draggable: false, fill: '#000', stroke: null, fontFamily: 'Comic Sans MS'})));
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
            this.on("disabledChange", propertyChangeListener);
            this.on("colorChange", propertyChangeListener);
            this.on("widthChange", propertyChangeListener);
            this.on("heightChange", propertyChangeListener);
            updateChildren(this);
        },
        toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }
    };
    Kinetic.Util.extend(Kinetic.RichEditor, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.RichEditor, 'fontFamily', "Arial");
    Kinetic.Factory.addGetterSetter(Kinetic.RichEditor, 'fontSize', 18);
    Kinetic.Factory.addGetterSetter(Kinetic.RichEditor, 'fontStyle', "normal");
    Kinetic.Factory.addGetterSetter(Kinetic.RichEditor, 'text', "");
    Kinetic.Factory.addGetterSetter(Kinetic.RichEditor, 'disabled', false);
    Kinetic.Factory.addColorGetterSetter(Kinetic.RichEditor, 'color');
})();
