'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseElementUpdater = function () {
    function BaseElementUpdater() {
        _classCallCheck(this, BaseElementUpdater);
    }

    _createClass(BaseElementUpdater, [{
        key: 'update',
        value: function update(msg) {
            document.getElementById('test').innerHTML = msg;
        }
    }]);

    return BaseElementUpdater;
}();

var ElementUpdate = function (_BaseElementUpdater) {
    _inherits(ElementUpdate, _BaseElementUpdater);

    function ElementUpdate(document) {
        _classCallCheck(this, ElementUpdate);

        return _possibleConstructorReturn(this, (ElementUpdate.__proto__ || Object.getPrototypeOf(ElementUpdate)).call(this, document));
    }

    _createClass(ElementUpdate, [{
        key: 'updateElement',
        value: function updateElement(msg) {
            _get(ElementUpdate.prototype.__proto__ || Object.getPrototypeOf(ElementUpdate.prototype), 'update', this).call(this, msg + '\r\n');
        }
    }]);

    return ElementUpdate;
}(BaseElementUpdater);

var AddingNewTask = function () {
    function AddingNewTask(document) {
        _classCallCheck(this, AddingNewTask);
    }

    _createClass(AddingNewTask, [{
        key: 'AddNewTask',
        value: function AddNewTask(task) {
            console.log(task);
        }
    }]);

    return AddingNewTask;
}();
//# sourceMappingURL=app.js.map
