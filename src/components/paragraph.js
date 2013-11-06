(function ()
{

    function updateChildren(item)
    {
        item.destroyChildren();
        var tokenizedLines = AgidoMockups.tokenizeFormattedText(item.getText());
        var height = 0, y = 0, maxRowWidth;
        for (var i = 0; i < tokenizedLines.length; i++) {
            var x = 0;
            var rowWidth = 0;
            for (var j = 0; j < tokenizedLines[i].length; j++) {
                var component;
                var token = tokenizedLines[i][j];
                var config = {text: token.text, y: y, x: x, fill: '#000', color: '#5df'};
                if (AgidoMockups.FORMATTED_TOKEN_TYPE_LINK == token.type) {
                    component = new Kinetic.Link(config);
                } else {
                    component = new Kinetic.Text(config);
                    if (AgidoMockups.FORMATTED_TOKEN_TYPE_BOLD == token.type) {
                        component.setFontStyle("bold");
                    } else if (AgidoMockups.FORMATTED_TOKEN_TYPE_ITALIC == token.type) {
                        component.setFontStyle("italic");
                    }
                }
                component.setFontFamily(item.getFontFamily());
                component.setFontSize(item.getFontSize());
                item.add(component);
                height = component.getHeight();
                rowWidth += component.getWidth();
                x += component.getWidth();
                if (AgidoMockups.FORMATTED_TOKEN_TYPE_STRIKETHROUGH == token.type) {
                    item.add(new Kinetic.Line({stroke: '#000', points: [
                        {x: config.x, y: y + height / 2},
                        {x: x, y: y + height / 2}
                    ]}));
                } else if (AgidoMockups.FORMATTED_TOKEN_TYPE_UNDERLINE == token.type) {
                    item.add(new Kinetic.Line({stroke: '#000', points: [
                        {x: config.x, y: y + height},
                        {x: x, y: y + height}
                    ]}));
                }
            }
            //noinspection JSValidateTypes
            maxRowWidth = Math.max(undefined == maxRowWidth ? rowWidth : maxRowWidth, rowWidth);
            y += height;
        }
        item.setHeight(y);
        item.setWidth(maxRowWidth);
    }

    Kinetic.Paragraph = function (config)
    {
        this.____init(config);
    };
    Kinetic.Paragraph.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, config);
            this.className = "Paragraph";
            var propertyChangeListener = function (event)
            {
                if (event.newVal != event.oldVal) {
                    updateChildren(this);
                }
            };
            this.on("fontFamilyChange", propertyChangeListener);
            this.on("fontSizeChange", propertyChangeListener);
            this.on("textChange", propertyChangeListener);
            updateChildren(this);
        }, toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }
    };
    Kinetic.Util.extend(Kinetic.Paragraph, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.Paragraph, 'fontFamily', "Arial");
    Kinetic.Factory.addGetterSetter(Kinetic.Paragraph, 'fontSize', 18);
    Kinetic.Factory.addGetterSetter(Kinetic.Paragraph, 'text', "A [paragraph] of *text*.\nA _second_ &row& of ~text~.");
})();
