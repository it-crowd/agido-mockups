(function ()
{
    window.AgidoMockups = window.AgidoMockups || {};
    AgidoMockups.icons = AgidoMockups.icons || {};
    AgidoMockups.icons.underline = new Kinetic.Group({name: "underlineIcon", width: 20, height: 20});
    AgidoMockups.icons.underline.add(new Kinetic.Text({text: "U", fill: '#000', fontSize: 19, fontStyle: 'normal'}));
    AgidoMockups.icons.underline.add(new Kinetic.Line({
        points: [1, 19, 11.5, 19],
        stroke: '#000',
        strokeWidth: 1
    }));
})();