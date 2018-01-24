"use strict";

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Global Variables
var node = 0;
var tasksList = new Array();

var BaseElementUpdater = function () {
    function BaseElementUpdater() {
        _classCallCheck(this, BaseElementUpdater);
    }

    _createClass(BaseElementUpdater, [{
        key: "LoadDashboard",
        value: function LoadDashboard(inputKey, inputValue) {
            //Creating li element
            var li = document.createElement("li");
            li.className = "list-group-item list-group-item-info";
            li.id = "" + inputKey;

            //Adding Label with Checkbox
            var lbl = document.createElement('label');
            lbl.className = "check col-sm-1";
            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.id = "chk_" + inputKey;
            lbl.appendChild(checkbox);

            //Adding Label with Input value
            var lbl1 = document.createElement('label');
            lbl1.className = "col-sm-9";
            var t = document.createTextNode(inputValue);
            lbl1.appendChild(t);

            //Adding Edit and Cancel buttons
            var btn1 = document.createElement('button');
            var btn2 = document.createElement('button');
            btn1.className = "btn btn-info";
            btn2.className = "btn btn-info";
            btn1.id = "editBtn_" + inputKey;
            btn2.id = "removeBtn_" + inputKey;
            btn1.innerHTML = "Edit";
            btn2.innerHTML = "Remove";

            btn1.addEventListener('click', function (btn1) {
                var hideParentNode = document.getElementById(btn1.path[0].id).parentNode;
                hideParentNode.style.display = 'none';
                var showParentNode = document.getElementById(btn1Edit.id).parentNode;
                showParentNode.style.display = '';
            });
            btn2.addEventListener('click', function (btn2) {
                //Deleting row from HTML
                var removeChileRow = document.getElementById(btn2.path[0].id).parentNode;
                var ul = removeChileRow.parentNode;
                ul.removeChild(removeChileRow);
                //Removing Edit elements for deleted row
                ul.removeChild(document.getElementById(removeChileRow.id));

                //Deleting record from Global list
                tasksList.splice(tasksList.findIndex(function (index) {
                    return index.key === parseInt(removeChileRow.id);
                }), 1);
            });

            //Appending HTML dynamically to li node
            li.appendChild(lbl);
            li.appendChild(lbl1);
            li.appendChild(btn1);
            li.appendChild(btn2);

            //Adding row to the dashboard
            document.getElementById("myUL").appendChild(li);

            //Create HTML elements to Edit row
            var liEdit = document.createElement("li");
            liEdit.className = "list-group-item list-group-item-info";
            liEdit.id = "" + inputKey;
            var txtBoxEdit = document.createElement('input');
            txtBoxEdit.className = "col-sm-10";
            txtBoxEdit.type = "text";
            txtBoxEdit.value = inputValue;
            var btn1Edit = document.createElement('button');
            var btn2Edit = document.createElement('button');
            btn1Edit.className = "btn btn-info";
            btn2Edit.className = "btn btn-info";
            btn1Edit.id = "editSaveBtn_" + inputKey;
            btn2Edit.id = "editCancelBtn_" + inputKey;
            btn1Edit.innerHTML = "Save";
            btn2Edit.innerHTML = "Cancel";
            btn1Edit.addEventListener('click', function (btn1Edit) {});
            btn2Edit.addEventListener('click', function (btn2Edit) {
                var showParentNode = document.getElementById(btn1Edit.id).parentNode;
                showParentNode.style.display = 'none';
                var hideParentNode = document.getElementById(btn1.id).parentNode;
                hideParentNode.style.display = '';
            });
            liEdit.appendChild(txtBoxEdit);
            liEdit.appendChild(btn1Edit);
            liEdit.appendChild(btn2Edit);
            liEdit.style.display = "none";
            document.getElementById("myUL").appendChild(liEdit);
        }

        //Loading all the tasks

    }, {
        key: "Load",
        value: function Load(tasksListVar) {
            document.getElementById('myUL').innerHTML = "";
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = tasksListVar[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    this.LoadDashboard(item.key, item.value);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }]);

    return BaseElementUpdater;
}();

var AddNewRecord = function (_BaseElementUpdater) {
    _inherits(AddNewRecord, _BaseElementUpdater);

    function AddNewRecord() {
        _classCallCheck(this, AddNewRecord);

        return _possibleConstructorReturn(this, (AddNewRecord.__proto__ || Object.getPrototypeOf(AddNewRecord)).call(this));
    }

    _createClass(AddNewRecord, [{
        key: "AddNewRow",
        value: function AddNewRow() {
            var inputValue = document.getElementById("addNewTask").value;

            if (inputValue === '') {
                alert("You must write something!");
            } else {
                tasksList.push({
                    'key': node,
                    'value': inputValue
                }); //Storing value to global variable

                _get(AddNewRecord.prototype.__proto__ || Object.getPrototypeOf(AddNewRecord.prototype), "Load", this).call(this, tasksList);
                node++;
            }
            document.getElementById("addNewTask").value = '';
        }

        //Filter functionality

    }, {
        key: "FilterData",
        value: function FilterData() {
            var filter = void 0,
                ul = void 0,
                li = void 0,
                a = void 0,
                i = void 0;
            filter = document.getElementById("searchTask").value.toUpperCase();
            ul = document.getElementById("myUL");
            li = ul.getElementsByTagName("li");
            for (i = 0; i < li.length; i++) {
                a = li[i].getElementsByTagName("label")[1];
                if (a != null && a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            }
        }

        //Delete functionality

    }, {
        key: "RemoveSelectedData",
        value: function RemoveSelectedData() {
            var needToRemove = new Array();
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                var _loop = function _loop() {
                    var item = _step2.value;

                    if (document.querySelector("#chk_" + item.key).checked) {
                        needToRemove.push(tasksList.findIndex(function (index) {
                            return index.key === parseInt(item.key);
                        }));
                    }
                };

                for (var _iterator2 = tasksList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    _loop();
                }
                //Removing data from list in reverse fashion as in forward mode not able to get the last index
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = needToRemove.reverse()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var itemRemove = _step3.value;

                    tasksList.splice(itemRemove, 1);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            _get(AddNewRecord.prototype.__proto__ || Object.getPrototypeOf(AddNewRecord.prototype), "Load", this).call(this, tasksList);
        }
    }]);

    return AddNewRecord;
}(BaseElementUpdater);
//# sourceMappingURL=app.js.map
