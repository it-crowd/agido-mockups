(function ()
{
    window.AgidoMockups = window.AgidoMockups || {};
    AgidoMockups.icons = AgidoMockups.icons || {};
    AgidoMockups.icons.calendar = new Kinetic.Group({name: "calendarIcon", width: 96, height: 96});
    var border = new Kinetic.Shape({
        stroke: '#000',
        strokeWidth: 2,
        drawFunc: function (context)
        {
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(96, 0);
            context.lineTo(96, 96);
            context.lineTo(0, 96);
            context.lineTo(0, 0);
            context.moveTo(0, 20);
            context.lineTo(96, 20);
            context.closePath();
            context.fillStrokeShape(this);
        }
    });
    AgidoMockups.icons.calendar.add(border);

    var arrowRight = new Kinetic.RegularPolygon({
        x: 86,
        y: 10,
        sides: 3,
        radius: 7,
        fill: '#000',
        stroke: null
    });
    arrowRight.setRotationDeg(90);
    AgidoMockups.icons.calendar.add(arrowRight);

    var arrowLeft = arrowRight.clone();
    arrowLeft.setX(10);
    arrowLeft.setRotationDeg(270);
    AgidoMockups.icons.calendar.add(arrowLeft);

    AgidoMockups.icons.calendar.add(new Kinetic.Text({text: "Jul 2013", x: 22, y: 4, fill: '#000', fontSize: 12, fontStyle: 'bold', fontFamily: 'Comic Sans MS'}));
    AgidoMockups.icons.calendar.add(new Kinetic.Text({text: "S M  T W T  F  S", x: 2, y: 25, fill: '#000', fontSize: 10, fontStyle: 'bold', fontFamily: 'Comic Sans MS'}));
    AgidoMockups.icons.calendar.add(new Kinetic.Text({text: "1   2   3   4   5  6   7", x: 2, y: 37, fill: '#000', fontSize: 8, fontStyle: 'bold', fontFamily: 'Comic Sans MS'}));
    AgidoMockups.icons.calendar.add(new Kinetic.Text({text: "8   9  10 11 12 13 14", x: 2, y: 49, fill: '#000', fontSize: 8, fontStyle: 'bold', fontFamily: 'Comic Sans MS'}));
    AgidoMockups.icons.calendar.add(new Kinetic.Text({text: "15 16 17 18 19 20 21", x: 2, y: 61, fill: '#000', fontSize: 8, fontStyle: 'bold', fontFamily: 'Comic Sans MS'}));
    AgidoMockups.icons.calendar.add(new Kinetic.Text({text: "22 23 24 25 26 27 28", x: 2, y: 73, fill: '#000', fontSize: 8, fontStyle: 'bold', fontFamily: 'Comic Sans MS'}));
    AgidoMockups.icons.calendar.add(new Kinetic.Text({text: "29 30 31", x: 2, y: 85, fill: '#000', fontSize: 8, fontStyle: 'bold', fontFamily: 'Comic Sans MS'}));
})();