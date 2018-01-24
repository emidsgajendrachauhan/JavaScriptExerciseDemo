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
        });
        btn2.addEventListener('click', function (btn2) {
            //Deleting row from HTML
            let removeChileRow = document.getElementById(btn2.path[0].id).parentNode;
            let ul = removeChileRow.parentNode;
            ul.removeChild(removeChileRow);

            //tasksList.splice(removeChileRow.id, 1);
            tasksList.splice(tasksList.findIndex(index => index.key === parseInt(removeChileRow.id)), 1); //Deleting record from Global list
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