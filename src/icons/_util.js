window.AgidoMockups = window.AgidoMockups || {};

AgidoMockups.rescaleIcon = function (icon, targetHeight)
{
    var iconScale = targetHeight / icon.getHeight();
    icon.setScale(iconScale);
    icon.setWidth(icon.getWidth() * iconScale);
    icon.setHeight(icon.getHeight() * iconScale);
    return icon;
};

AgidoMockups.borderedIcon = function (icon, targetHeight, paddingTopBottom)
{
    AgidoMockups.rescaleIcon(icon, targetHeight - 2 * paddingTopBottom);
    var rescaledIconWidth = icon.getWidth();
    var rescaledIconWidthWithPadding = rescaledIconWidth + 2 * paddingTopBottom;
    var targetWidth = rescaledIconWidthWithPadding > targetHeight ? rescaledIconWidthWithPadding : targetHeight;

    var borderedIconGroup = new Kinetic.Group({name: icon.getName(), width: targetWidth, height: targetHeight});
    var border = new Kinetic.Rect({width: targetWidth, height: targetHeight, stroke: '#000', strokeWidth: 1});
    borderedIconGroup.add(border);
    icon.setX((targetWidth - rescaledIconWidth) / 2);
    icon.setY(paddingTopBottom);
    borderedIconGroup.add(icon);
    return borderedIconGroup;
};
