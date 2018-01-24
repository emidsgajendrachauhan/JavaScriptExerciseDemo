//Global Variables
let node = 0;
let tasksList = new Array();

class BaseElementUpdater {
    constructor() { }

    LoadDashboard(inputKey, inputValue) {
        //Creating li element
        let li = document.createElement("li");
        li.className = "list-group-item list-group-item-info";
        li.id = `${inputKey}`;

        //Adding Label with Checkbox
        let lbl = document.createElement('label');
        lbl.className = "check col-sm-1";
        let checkbox = document.createElement('input');
        checkbox.type = "checkbox"
        checkbox.id = `chk_${inputKey}`;
        lbl.appendChild(checkbox);

        //Adding Label with Input value
        let lbl1 = document.createElement('label');
        lbl1.className = "col-sm-9";
        lbl1.id = `lbl_${inputKey}`;
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
            let hideParentNode = document.getElementById(btn1.path[0].id).parentNode;
            hideParentNode.style.display = 'none';
            let showParentNode = document.getElementById(btn1Edit.id).parentNode;
            showParentNode.style.display = '';
        });
        btn2.addEventListener('click', function (btn2) {
            //Deleting row from HTML
            let removeChileRow = document.getElementById(btn2.path[0].id).parentNode;
            let ul = removeChileRow.parentNode;
            ul.removeChild(removeChileRow);
            //Removing Edit elements for deleted row
            ul.removeChild(document.getElementById(removeChileRow.id))

            //Deleting record from Global list
            tasksList.splice(tasksList.findIndex(index => index.key === parseInt(removeChileRow.id)), 1);
        });

        //Appending HTML dynamically to li node
        li.appendChild(lbl);
        li.appendChild(lbl1);
        li.appendChild(btn1);
        li.appendChild(btn2);

        //Adding row to the dashboard
        document.getElementById("myUL").appendChild(li);

        //Create HTML elements to Edit row
        let liEdit = document.createElement("li");
        liEdit.className = "list-group-item list-group-item-info";
        liEdit.id = `${inputKey}`;
        let txtBoxEdit = document.createElement('input');
        txtBoxEdit.className = "col-sm-10";
        txtBoxEdit.type = "text";
        txtBoxEdit.id = `editedText_${inputKey}`;
        txtBoxEdit.value = inputValue;
        let btn1Edit = document.createElement('button');
        let btn2Edit = document.createElement('button');
        btn1Edit.className = "btn btn-info";
        btn2Edit.className = "btn btn-info";
        btn1Edit.id = `editSaveBtn_${inputKey}`;
        btn2Edit.id = `editCancelBtn_${inputKey}`;
        btn1Edit.innerHTML = "Save";
        btn2Edit.innerHTML = "Cancel";
        btn1Edit.addEventListener('click', function (btn1Edit) {
            let editedTxt = document.getElementById(`editedText_${inputKey}`).value;
            if (editedTxt) {
                document.getElementById(`lbl_${inputKey}`).innerHTML = editedTxt;

                let editList = ({
                    'key': inputKey,
                    'value': editedTxt
                });
                tasksList = tasksList.map(x => x.key == inputKey ? editList : x);

                this.parentNode.style.display = 'none';
                let hideParentNode = document.getElementById(btn1.id).parentNode;
                hideParentNode.style.display = '';
            }
            else {
                alert("You must write something!");
            }
        });
        btn2Edit.addEventListener('click', function (btn2Edit) {
            let showParentNode = document.getElementById(btn1Edit.id).parentNode;
            showParentNode.style.display = 'none';
            let hideParentNode = document.getElementById(btn1.id).parentNode;
            hideParentNode.style.display = '';
        });
        liEdit.appendChild(txtBoxEdit);
        liEdit.appendChild(btn1Edit);
        liEdit.appendChild(btn2Edit);
        liEdit.style.display = "none";
        document.getElementById("myUL").appendChild(liEdit);
    }

    //Loading all the tasks
    Load(tasksListVar) {
        document.getElementById('myUL').innerHTML = "";
        for (let item of tasksListVar) {
            this.LoadDashboard(item.key, item.value);
        }
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

            super.Load(tasksList);
            node++;
        }
        document.getElementById("addNewTask").value = '';
    }

    //Filter functionality
    FilterData() {
        let filter, ul, li, a, i;
        filter = document.getElementById("searchTask").value.toUpperCase();
        ul = document.getElementById("myUL");
        li = ul.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("label")[1];
            if (a != null && a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            }
            else {
                li[i].style.display = "none";
            }
        }
    }

    //Delete functionality
    RemoveSelectedData() {
        let needToRemove = new Array();
        for (let item of tasksList) {
            if (document.querySelector(`#chk_${item.key}`).checked) {
                needToRemove.push(tasksList.findIndex(index => index.key === parseInt(item.key)));
            }
        }
        //Removing data from list in reverse fashion as in forward mode not able to get the last index
        for (let itemRemove of needToRemove.reverse()) {
            tasksList.splice(itemRemove, 1);
        }
        super.Load(tasksList);
    }

}