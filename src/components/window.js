(function ()
{
    function updateChildren(item)
    {
        var frame = item.find(".frame")[0];
        var toolbar = item.find(".toolbar")[0];
        var toolbarBorder = item.find(".toolbarBorder")[0];
        var statusbar = item.find(".statusbar")[0];
        var statusbarBorder = item.find(".statusbarBorder")[0];
        var title = item.find(".title")[0];
        var url = item.find(".url")[0];
        var search = item.find(".search")[0];
        var searchIcon = item.find(".searchIcon")[0];
        frame.setAttr("width", item.getWidth());
        frame.setAttr("height", item.getHeight());
        var frameStrokeWidth = frame.getStrokeWidth();
        toolbar.setX(frameStrokeWidth);
        toolbar.setY(frameStrokeWidth);
        toolbar.setAttr("width", item.getWidth() - frameStrokeWidth * 2);
        toolbar.setAttr("height", 60);

        toolbarBorder.setPoints([toolbar.getX(), toolbar.getAttr("y") + toolbar.getHeight(), toolbar.getX() + toolbar.getWidth(),
            toolbar.getAttr("y") + toolbar.getHeight()]);

        statusbar.setX(frameStrokeWidth);
        statusbar.setY(item.getHeight() - 20 - frameStrokeWidth);
        statusbar.setAttr("width", item.getWidth() - frameStrokeWidth * 2);
        statusbar.setAttr("height", 20);

        statusbarBorder.setPoints([statusbar.getX(), statusbar.getAttr("y") , statusbar.getX() + statusbar.getWidth(), statusbar.getAttr("y")]);

        var lines = item.getText().split("\n");
        title.setText(lines[0]);
        title.setX(frameStrokeWidth + (toolbar.getWidth() - title.getWidth()) / 2);
        title.setY(0);

        var controlPadding = 20;
        var searchX = toolbar.getWidth() - 50 - controlPadding;
        var searchY = frameStrokeWidth + title.getHeight();
        search.setX(searchX - 5);
        search.setY(searchY);
        searchIcon.setX(searchX);
        searchIcon.setY(searchY + 9);

        var urlX = frameStrokeWidth + 110;
        url.setX(urlX);
        url.setY(frameStrokeWidth + title.getHeight());

        url.setText(lines.length > 0 ? lines[1] : "");
        url.setWidth(searchX - urlX - controlPadding);
        url.setHeight(frameStrokeWidth + title.getHeight());
    }

    Kinetic.Window = function (config)
    {
        this.____init(config);
    };
    Kinetic.Window.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, config);
            this.className = "Window";
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "frame", x: 0, y: 0, draggable: false, fill: '#fff', stroke: '#000', strokeWidth: 1})));
            this.add(new Kinetic.Rect(AgidoMockups.extend(config, {name: "toolbar", draggable: false, fill: '#aaa', stroke: null})));
            this.add(new Kinetic.Rect(AgidoMockups.extend(config, {name: "statusbar", draggable: false, fill: '#aaa', stroke: null})));
            this.add(new Kinetic.Blob(AgidoMockups.extend(config, {name: "search", draggable: false, fill: '#fff', stroke: '#000', points: [
                {x: 0, y: 0},
                {x: 50, y: 0},
                {x: 50, y: 20},
                {x: 0, y: 20}
            ], tension: .3})));
            this.add(AgidoMockups.icons.search.clone());
            this.add(AgidoMockups.icons.backButton.clone({x: 20, y: 20}));
            this.add(AgidoMockups.icons.nextButton.clone({x: 50, y: 20}));
            this.add(AgidoMockups.icons.home.clone({x: 80, y: 20}));
            this.add(new Kinetic.Text(AgidoMockups.extend(config,
                    {name: "title", x: 0, y: 0, width: "auto", height: "auto", padding: 5, draggable: false, fill: '#000', stroke: null, fontFamily: 'Comic Sans MS'})));
            this.add(new Kinetic.Input(AgidoMockups.extend(config, {name: "url", draggable: false, color: '#000', fontFamily: 'Comic Sans MS', fontSize: 10})));
            this.add(new Kinetic.Line(AgidoMockups.extend(config, {name: "toolbarBorder", x: 0, y: 0, draggable: false, stroke: '#000'})));
            this.add(new Kinetic.Line(AgidoMockups.extend(config, {name: "statusbarBorder", x: 0, y: 0, draggable: false, stroke: '#000'})));
            var propertyChangeListener = function (event)
            {
                if (event.newVal != event.oldVal) {
                    updateChildren(this);
                }
            };
            this.on("textChange", propertyChangeListener);
            this.on("widthChange", propertyChangeListener);
            this.on("heightChange", propertyChangeListener);
            updateChildren(this);
        },
        toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }
    };
    Kinetic.Util.extend(Kinetic.Window, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.Window, 'text', "A Web Page\nhttp://");
    Kinetic.Factory.addGetterSetter(Kinetic.Window, 'height', 400);
    Kinetic.Factory.addGetterSetter(Kinetic.Window, 'width', 400);
})();
