class BaseElementUpdater {
    constructor() { }

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
let node = 0;
let tasksList = new Array();
class AddNewRecord {
    constructor() { }

    AddNewRow() {
        node++;

        //Creating li element
        let li = document.createElement("li");
        li.className = "list-group-item list-group-item-info";
        li.id = `nodeElement${node}`;

        //Adding Label with Checkbox
        let lbl = document.createElement('label');
        lbl.className = "check col-sm-1";
        let checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "optcheck";
        lbl.appendChild(checkbox);

        //Adding Label with Input value
        let lbl1 = document.createElement('label');
        lbl1.className = "col-sm-9";
        let inputValue = document.getElementById("addNewTask").value;
        let t = document.createTextNode(inputValue);
        lbl1.appendChild(t);

        //Adding Edit and Cancel buttons
        let btn1 = document.createElement('button');
        let btn2 = document.createElement('button');
        btn1.className = "btn btn-info";
        btn2.className = "btn btn-info";
        btn1.id = `btnOneId${node}`;
        btn2.id = `btnTwoId${node}`;
        btn1.innerHTML = "Edit";
        btn2.innerHTML = "Remove";

        btn1.addEventListener('click',function(btn1){
            console.log(btn1.path[0].id);
            document.getElementById(btn1.path[0].id);
        })
        btn2.addEventListener('click',function(btn2){
            console.log(btn2.path[0].id);
            let removeChileRow = document.getElementById(btn2.path[0].id).parentNode;
            let ul = removeChileRow.parentNode;
            ul.removeChild(removeChileRow);
        })

        //Appending HTML dynamically to li node
        li.appendChild(lbl);
        li.appendChild(lbl1);
        li.appendChild(btn1);
        li.appendChild(btn2);

        if (inputValue === '') {
            alert("You must write something!");
        }
        else {
            tasksList.push(inputValue);//Storing value to global variable.
            document.getElementById("myUL").appendChild(li);
        }
        document.getElementById("addNewTask").value = '';
    }
    
}