(function ()
{
    window.AgidoMockups = window.AgidoMockups || {};
    AgidoMockups.icons = AgidoMockups.icons || {};
    AgidoMockups.icons.arrowUpDown = new Kinetic.Group({
        name: "arrowUpDown",
        width: 20,
        height: 20
    });
    AgidoMockups.icons.arrowUpDown.add(AgidoMockups.icons.arrowUp.clone());
    AgidoMockups.icons.arrowUpDown.add(AgidoMockups.icons.arrowDown.clone({y: 10}));
})();