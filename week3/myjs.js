list_group_item = {
    "thongtinsinhvien": 0
}
authen = "Lương Hữu Quang Minh _ MSSV: 20200400\n"
kieu = {
    ITEM: 0,
    GROUP: 1,
}
/* lưu cặp key_value với key = id của group + id của item, value mảng các value tùy chọn của input */
value_of_input = {
}
var isInput = false
// khi không muốn thay đổi input của item đang được chọn nữa thì lưu lại item này và khi sang item mới phải swap lại oldListInput và isChosoenInput
var isChoosenInput = null
var oldListInput = null

/* lưu cặp key_value với key = id của group + id của item, value là object input */
type_of_item_input = {
}

type_input = [
    "checkbox",
    "radio",
    "text",
    "select",
    "date"
]
list_input = document.createElement("select")
list_input.style.width = "200px"
for (let i = 0; i < type_input.length; i++) {
    var new_option = document.createElement("option")
    new_option.value = type_input[i]
    new_option.text = type_input[i]
    list_input.appendChild(new_option)
}

function create_input(typeOfInput) {
    if (typeOfInput === "select") {
        var newInput = document.createElement("select")
        return newInput
    }
    var newInput = document.createElement("input")
    newInput.type = typeOfInput
    if (typeOfInput === "text") {
        newInput.value = ""
    }
    return newInput
}

function create_button_add_value_to_input(name) {
    var button = document.createElement("button")
    button.className = "fa-solid fa-plus"
    button.addEventListener("click", function () {
        var value = prompt(authen + "Điền tên của thông tin thêm vào input:")
        if (value !== null)
        {
            if (name in value_of_input) {
                value_of_input[name].push(value)
            }
            else {
                value_of_input[name] = []
                value_of_input[name].push(value)
            }
        }
        console.log(name, value_of_input[name])
    })
    return button

}

group_count = 1
function handleClick() {
    return confirm(authen + "Chuyển sang thay đổi input của item này?")
}
function changeTypeOfInput(group_id, infovalue) {
    console.log(isInput)
    if (isInput === true) {
        return;
    }
    name_of_info = group_id + infovalue.id
    if (isChoosenInput !== null) {
        if (handleClick()) {
            oldListInput.parentNode.replaceChild(isChoosenInput, oldListInput);
        }
        else {
            return
        }
    }
    isChoosenInput = infovalue
    oldListInput = list_input.cloneNode(true);
    infovalue.parentNode.replaceChild(oldListInput, infovalue);
    oldListInput.addEventListener("keydown", function (event) {
        let maininfo = oldListInput.parentNode;
        let selectButton = maininfo.getElementsByClassName("fa-solid fa-plus");
        if (event.key === "Enter") {
            var result = confirm(authen +
                "Chắc chắn muốn chọn input của item này");
            if (result === true) {
                if (oldListInput.value !== "text" && oldListInput.value !== "date") {
                    if (selectButton.length === 0) {
                        maininfo.appendChild(create_button_add_value_to_input(name_of_info))
                    }
                    type_of_item_input[name_of_info] = create_input(oldListInput.value)
                }
                else {
                    type_of_item_input[name_of_info] = create_input(oldListInput.value)
                    if (selectButton.length !== 0) {
                        selectButton[0].remove()
                    }
                }
                delete(value_of_input[name_of_info])
            }
        }
        oldListInput.parentNode.replaceChild(infovalue, oldListInput);
        isChoosenInput = null
        oldListInput = null
    })
}

// tạo input mới để thay thế trường value trong item cho người dùng chọn value. Sau đó swap lại
function create_input_value(group_id, infovalue) {
    var name_of_info = group_id + infovalue.id;
    var newinput = type_of_item_input[name_of_info];
    newinput.className = "input_type"
    if (newinput.type === "text") {
        newinput.placeholder = infovalue.innerText
        return newinput
    }
    if (newinput.type === "date") {
        return newinput
    }
    if (!(name_of_info in value_of_input)) {
        return null
    }
    if (newinput.type === "radio" || newinput.type === "checkbox") {
        let maininput = document.createElement("div")
        maininput.className = "center"
        for (let i = 0; i < value_of_input[name_of_info].length; i++) {
            label = document.createElement("label")
            label.className = "information_select"
            input_value = document.createElement("input")
            input_value.id = "value" + i
            input_value.value = value_of_input[name_of_info][i]
            input_value.type = newinput.type
            label.appendChild(input_value)
            span = document.createElement("span")
            span.innerText = value_of_input[name_of_info][i]
            label.appendChild(span)
            maininput.appendChild(label)
        }
        return maininput
    }
    if (newinput.type === "select-one") {
        let maininput = document.createElement("div")
        select = document.createElement("select")
        select.style.width = "300px"
        maininput.className = ""
        for (let i = 0; i < value_of_input[name_of_info].length; i++) {
            optioni = document.createElement("option")
            optioni.value = value_of_input[name_of_info][i]
            optioni.innerText = value_of_input[name_of_info][i]
            select.appendChild(optioni)
        }
        maininput.appendChild(select)
        return maininput
    }

}
function changeValue(group_id, infovalue) {
    var name_of_info = group_id + infovalue.id;
    var type = type_of_item_input[name_of_info].type
    if (type === "select-one")
        type = "select"
    var newinput = create_input_value(group_id, infovalue)
    if (newinput === null) {
        alert(authen + "input này chưa có các giá trị để chọn, click vào button hình dấu cộng để thêm giá trị")
        return
    }
    //console.log(newinput)
    isInput = true
    infovalue.parentNode.replaceChild(newinput, infovalue);
    newinput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            isInput = false
            if (type === "radio") {
                let checkedRadio = newinput.querySelector('input[type="radio"]:checked');
                infovalue.innerText = checkedRadio.value;
            }
            if (type === "checkbox") {
                let checkedCheckBox = newinput.querySelectorAll('input[type="checkbox"]');
                var result = "";
                checkedCheckBox.forEach(function(checkbox) {
                    if (checkbox.checked) {
                        result += checkbox.value + ", "
                    }
                });
                infovalue.innerText = result.slice(0, -1);
            }
            if (type === "select") {
                let selected = newinput.querySelector("select").value;
                infovalue.innerText = selected
            }
            if (type === "text" || type === "date") {
                type_of_item_input[name_of_info].placeholder = newinput.value
                infovalue.innerText = newinput.value;
            }
            newinput.parentNode.replaceChild(infovalue, newinput);
        } else if (event.key === 'Escape') {
            isInput = false
            newinput.parentNode.replaceChild(infovalue, newinput);
        }
    })
}

function changeName(infoname, type) {
    var newinput = document.createElement("input");
    newinput.value = ""
    newinput.placeholder = infoname.innerText
    infoname.parentNode.replaceChild(newinput, infoname);
    newinput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            if (type === kieu["ITEM"]) {
                if (newinput.value.charAt(newinput.value.length - 1) !== ':') {
                    newinput.value += ':';
                }
            }
            else {
                if (newinput.value.indexOf("_20200400") === -1) {
                    newinput.value += "_20200400"
                }
            }
            infoname.innerText = newinput.value;
            newinput.parentNode.replaceChild(infoname, newinput);
        } else if (event.key === 'Escape') {
            console.log(infoname)
            newinput.parentNode.replaceChild(infoname, newinput);
        }
    })
}

function deleteInfo(button) {
    button.parentElement.remove();
}
function addInfo(group_item, cnt) {
    var maininfo = document.createElement("div");
    maininfo.className = "center main_info";
    maininfo.id = "maininfo" + cnt;
    var nameinfo = document.createElement("i");
    nameinfo.className = "normalText";
    nameinfo.id = "nameinfo" + cnt;
    nameinfo.textContent = "Item Info Name: ";
    var valueinfo = document.createElement("b");
    valueinfo.className = "normalText";
    valueinfo.id = "valueinfo" + cnt;
    valueinfo.textContent = "Chưa có thông tin";
    type_of_item_input[group_item.parentNode.id + valueinfo.id] = create_input("text")
    maininfo.appendChild(nameinfo);
    maininfo.appendChild(valueinfo);
    group_item.appendChild(maininfo);
    var button = document.createElement("button");
    button.className = "fa-regular fa-trash-can";
    maininfo.appendChild(button);

    var buttonChangeType = document.createElement("button")
    buttonChangeType.className = "fa-regular fa-pen-to-square";
    maininfo.appendChild(buttonChangeType)
    buttonChangeType.addEventListener("click", function () {
        changeTypeOfInput(group_item.parentNode.id, valueinfo)
    })
    button.addEventListener("click", function () {
        deleteInfo(button)
    })
    nameinfo.addEventListener("dblclick", function () {
        changeName(nameinfo, 0)
    })
    valueinfo.addEventListener("dblclick", function () {
        changeValue(group_item.parentNode.id, valueinfo)
    })
}

function addInfoItem(idgroup) {
    var group = document.getElementById(idgroup)
    var group_item = group.querySelector("#group_item")
    list_group_item[idgroup]++
    addInfo(group_item, list_group_item[idgroup])
}

function deleteGroupItem(group) {
    var result = confirm(authen +
                        "Bạn có chắc chắn muốn xóa group này?");
    if (result === true) {
        delete list_group_item[group.id]
        group.remove()
    }
}

function addGroupItem() {
    group_count++
    const name = "group" + group_count
    var group = document.createElement("div")
    group.id = name
    group.className = "group col-md-6"
    list_group_item[name] = 0
    var span = document.createElement("span")
    span.className = "Title"
    span.innerText = "Group Item_20200400"
    span.addEventListener("dblclick", function () {
        changeName(span, 1)
    })
    var button1 = document.createElement("button")
    button1.className = "item_button"
    button1.innerText = "Add info item"
    button1.onclick =  function () {
        addInfoItem(name)
    }
    var button2 = document.createElement("button")
    button2.className = "item_button"
    button2.innerText = "Add group item"
    button2.onclick = function () {
        addGroupItem()
    }
    var group_item = document.createElement("div")
    group_item.className = "group_item"
    group_item.id = "group_item"
    buttonDelete = document.createElement("button")
    buttonDelete.className = "fa-regular fa-trash-can delete_button"
    group.appendChild(span)
    group.appendChild(buttonDelete)
    group.appendChild(button1)
    group.appendChild(button2)
    group.appendChild(group_item)
    buttonDelete.addEventListener("click", function () {
        deleteGroupItem(group)
    })
    const mainContent = document.getElementById("MainContent")
    mainContent.appendChild(group)
}