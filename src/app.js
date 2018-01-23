//Global Variables
let node = 0;
let tasksList = new Array();

class BaseElementUpdater {
    constructor() { }

    LoadDashboard(inputKey, inputValue) {
        //Creating li element
        let li = document.createElement("li");
        li.className = "list-group-item list-group-item-info";
        li.id = `nodeElement_${inputKey}`;

        //Adding Label with Checkbox
        let lbl = document.createElement('label');
        lbl.className = "check col-sm-1";
        let checkbox = document.createElement('input');
        checkbox.type = "checkbox"
        lbl.appendChild(checkbox);

        //Adding Label with Input value
        let lbl1 = document.createElement('label');
        lbl1.className = "col-sm-9";
        let t = document.createTextNode(inputValue);
        lbl1.appendChild(t);

        //Adding Edit and Cancel buttons
        let btn1 = document.createElement('button');
        let btn2 = document.createElement('button');
        btn1.className = "btn btn-info";
        btn2.className = "btn btn-info";
        btn1.id = `editBtn_${inputKey}`;
        btn2.id = `removeBtn_${inputKey}`;
        btn1.innerHTML = "Edit";
        btn2.innerHTML = "Remove";

        btn1.addEventListener('click', function (btn1) {
            document.getElementById(btn1.path[0].id);
        })
        btn2.addEventListener('click', function (btn2) {
            console.log(btn2.path[0].id);
            //Deleting row from HTML
            let removeChileRow = document.getElementById(btn2.path[0].id).parentNode;
            let ul = removeChileRow.parentNode;
            ul.removeChild(removeChileRow);

            tasksList.splice(inputKey, 1); //Deleting record from Global list
        })

        //Appending HTML dynamically to li node
        li.appendChild(lbl);
        li.appendChild(lbl1);
        li.appendChild(btn1);
        li.appendChild(btn2);

        //Adding row to the dashboard
        document.getElementById("myUL").appendChild(li);
    }
}

class AddNewRecord extends BaseElementUpdater {
    constructor() { super(); }

    AddNewRow() {
        let inputValue = document.getElementById("addNewTask").value;

        if (inputValue === '') {
            alert("You must write something!");
        }
        else {
            tasksList.push({
                'key': node,
                'value': inputValue
            });//Storing value to global variable

            document.getElementById('myUL').innerHTML = "";
            for (var item of tasksList) {
                console.log(`${item.key}, ${item.value}`);
                super.LoadDashboard(item.key, item.value);
            }
            node++;
        }
        document.getElementById("addNewTask").value = '';
    }

}