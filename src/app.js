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

class AddNewRecord{
    constructor(){}

    AddNewRow(){
        let li = document.createElement("li");
        let inputValue = document.getElementById("addNewTask").value;
        let t = document.createTextNode(inputValue);
        li.className = "list-group-item list-group-item-info";
        li.appendChild(t);

        if(inputValue === ''){
            alert("You must write something!");
        }
        else{
            document.getElementById("myUL").appendChild(li);
        }
    }
}