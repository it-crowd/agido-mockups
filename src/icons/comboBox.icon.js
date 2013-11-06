(function ()
{
    window.AgidoMockups = window.AgidoMockups || {};
    AgidoMockups.icons = AgidoMockups.icons || {};
    AgidoMockups.icons.comboBox = new Kinetic.Group({name: "comboBoxIcon", width: 100, height: 22});
    var border = new Kinetic.Shape({
        stroke: '#000',
        strokeWidth: 1,
        drawFunc: function (context)
        {
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(100, 0);
            context.lineTo(100, 22);
            context.lineTo(80, 22);
            context.lineTo(80, 0);
            context.moveTo(80, 22);
            context.lineTo(0, 22);
            context.lineTo(0, 0);
            context.fillStrokeShape(this);
        }
    });
    AgidoMockups.icons.comboBox.add(border);

    var arrow = new Kinetic.RegularPolygon({
        x: 90,
        y: 10,
        sides: 3,
        radius: 6,
        fill: '#000',
        stroke: null,
        rotationDeg: 180
    });
    AgidoMockups.icons.comboBox.add(arrow);
    AgidoMockups.icons.comboBox.add(new Kinetic.Text({text: "Select", x: 7, y: 4, fill: '#000', fontSize: 13, fontStyle: 'bold'}));
})();