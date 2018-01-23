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

var node = 0;

var AddNewRecord = function () {
    function AddNewRecord() {
        _classCallCheck(this, AddNewRecord);
    }

    _createClass(AddNewRecord, [{
        key: 'AddNewRow',
        value: function AddNewRow() {
            node++;

            //Creating li element
            var li = document.createElement("li");
            li.className = "list-group-item list-group-item-info";
            li.id = 'nodeElement' + node;

            //Adding Label with Checkbox
            var lbl = document.createElement('label');
            lbl.className = "check col-sm-1";
            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = "optcheck";
            lbl.appendChild(checkbox);

            //Adding Label with Input value
            var lbl1 = document.createElement('label');
            lbl1.className = "col-sm-9";
            var inputValue = document.getElementById("addNewTask").value;
            var t = document.createTextNode(inputValue);
            lbl1.appendChild(t);

            //Adding Edit and Cancel buttons
            var btn1 = document.createElement('button');
            var btn2 = document.createElement('button');
            btn1.className = "btn btn-info";
            btn2.className = "btn btn-info";
            btn1.id = "btnOneId";
            btn2.id = "btnTwoId";
            btn1.innerHTML = "Edit";
            btn2.innerHTML = "Remove";

            //Appending HTML dynamically to li node
            li.appendChild(lbl);
            li.appendChild(lbl1);
            li.appendChild(btn1);
            li.appendChild(btn2);

            if (inputValue === '') {
                alert("You must write something!");
            } else {
                document.getElementById("myUL").appendChild(li);
            }
            document.getElementById("addNewTask").value = '';
        }
    }]);

    return AddNewRecord;
}();
//# sourceMappingURL=app.js.map
