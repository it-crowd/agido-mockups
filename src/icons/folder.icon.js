(function ()
{
    window.AgidoMockups = window.AgidoMockups || {};
    AgidoMockups.icons = AgidoMockups.icons || {};
    AgidoMockups.icons.folder = new Kinetic.Group({name: "folderIcon", width: 22, height: 15});
    var tab = new Kinetic.Polygon({
        points: [1, 3, 3, 0, 11, 0, 13, 2, 20, 2, 21, 3],
        fill: '#000',
        stroke: null
    });
    AgidoMockups.icons.folder.add(tab);

    var body = new Kinetic.Polygon({
        points: [0, 4.5, 22, 4.5, 21, 15, 1, 15],
        fill: '#000',
        stroke: null
    });
    AgidoMockups.icons.folder.add(body);
})();