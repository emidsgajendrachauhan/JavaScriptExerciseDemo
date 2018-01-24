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
                document.getElementById(btn1.path[0].id);
            });
            btn2.addEventListener('click', function (btn2) {
                //Deleting row from HTML
                var removeChileRow = document.getElementById(btn2.path[0].id).parentNode;
                var ul = removeChileRow.parentNode;
                ul.removeChild(removeChileRow);

                //tasksList.splice(removeChileRow.id, 1);
                tasksList.splice(tasksList.findIndex(function (index) {
                    return index.key === parseInt(removeChileRow.id);
                }), 1); //Deleting record from Global list
            });

            //Appending HTML dynamically to li node
            li.appendChild(lbl);
            li.appendChild(lbl1);
            li.appendChild(btn1);
            li.appendChild(btn2);

            //Adding row to the dashboard
            document.getElementById("myUL").appendChild(li);
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

        // RemoveSelected(){
        //     let checkedVal = document.querySelector('#chk_0').checked;
        // }

        //Filter functionality
        // FilterData() {
        //     let searchText = document.getElementById("searchTask").value;
        //     if (searchText) {
        //         let filteredList = new Array();
        //         for (let i = 0; i < tasksList.length; i++) {
        //             if (tasksList[i].value === searchText) {
        //                 filteredList.push({
        //                     'key': tasksList[i].key,
        //                     'value': tasksList[i].value
        //                 });
        //             }
        //         }
        //         super.Load(filteredList);
        //     }
        //     else{
        //         super.Load(tasksList);
        //     }
        // }

    }, {
        key: "FilterData",
        value: function FilterData() {
            var input, filter, ul, li, a, i;
            input = document.getElementById("searchTask");
            filter = input.value.toUpperCase();
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
    }]);

    return AddNewRecord;
}(BaseElementUpdater);
//# sourceMappingURL=app.js.map
