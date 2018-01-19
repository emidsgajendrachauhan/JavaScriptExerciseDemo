class BaseElementUpdater {
    constructor() {}

    update(msg) {
        document.getElementById('test').innerHTML = msg;
    }
}

class ElementUpdate extends BaseElementUpdater {

    constructor(document) {
        super(document);
    }
    updateElement(msg) {
        super.update(msg + '\r\n');
    }
}
//# sourceMappingURL=app.js.map
