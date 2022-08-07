let todoInput = document.querySelector(".todo-input");
let addButton = document.querySelector(".add-button");
let todoList = document.querySelector(".todo-list");
let todoSelect = document.querySelector(".select-todo")
let todoForm = document.querySelector(".todo-form");

let todosBase = [];
let classBase = [];
let todosId = 0;
let todosId2 = 0;


function CreateObject (todoText, todoId) {
    this.todoText = todoText;
    this.todoId = todoId;
}

function remover(id) {
    document.querySelector(`#todo-li-${id}`).remove()


    for(let i = 0; i < todosBase.length; i++) {
        console.log(id)
        if(todosBase[i].todoId === id) {
            todosBase.splice(i, 1)
        }
    }

    let base;

    if(localStorage.getItem("todos") === null) {
        base = []
    } else {
        base = JSON.parse(localStorage.getItem("todos"))
    }
   
    for(let i = 0; i < base.length; i++) {
        console.log(id)
        if(base[i].todoId === id) {
            base.splice(i, 1)
        }
    }

    localStorage.setItem("todos" , JSON.stringify(base))

   

    
}


function updater(val, id) {
    for(let i = 0; i < todosBase.length; i++) {
        console.log(id)
        if(todosBase[i].todoId === id) {
            todosBase.splice(i, 1)
        }
    }

    todosBase.push(new CreateObject(val, id))

    let base = JSON.parse(localStorage.getItem("todos"))
    for(let i = 0; i < base.length; i++) {
        console.log(id)
        console.log(base[i].todoId)
        if(base[i].todoId === id) {
            base.splice(i, 1)
        }
    }

    base.push(new CreateObject(val, id))
    localStorage.setItem("todos" , JSON.stringify(base))
    

    
}

function creaetHTML(text, id) {
    

   

    if(text.length > 0) {
        const newDiv = document.createElement("div");
    newDiv.style.display = "flex";
    newDiv.style.alignItems = "center";
    newDiv.style.justifyContent = "space-between";


    const newInput = document.createElement("input");
    newInput.style.border = "none";
    newInput.style.outline = "none";
    newInput.style.background = "transparent";
    newInput.classList.add("form-control", "me-3");
    newInput.setAttribute("disabled", "true");
    
    newInput.value = text;
  

    const newTodo = document.createElement("li")
   
    newTodo.classList.add("list-group-item");
    newTodo.setAttribute("id", `todo-li-${id}`)
    newTodo.style.display = "flex";
    newTodo.style.alignItems = "center";
    newTodo.style.justifyContent = "space-between";


    todoList.appendChild(newTodo);
    newTodo.appendChild(newInput);

   

    const completedButton = document.createElement("button");
    completedButton.innerText = "Complete";
    completedButton.classList.add("btn", "btn-outline-success", "me-3");

    
    newDiv.appendChild(completedButton);

    completedButton.addEventListener("click", (e) => {
        newTodo.classList.toggle("list-group-item-success")


        if(newTodo.classList.contains("list-group-item-success")) {
            classBase.push(newTodo.id)
            let clsBase;
            if(localStorage.getItem("cls") === null) {
                clsBase = []
            } else {
                clsBase = JSON.parse(localStorage.getItem("cls"))
            }
            clsBase.push(newTodo.id)


            localStorage.setItem("cls", JSON.stringify(clsBase));
            // newTodo.classList.add("list-group-item-success")
    } else {
        for(let i = 0; i < classBase.length; i++) {
           
            if(classBase[i] === newTodo.id) {
                classBase.splice(i, 1)
                
            }
        }

        let clsBase;


        if(localStorage.getItem("cls") === null) {
            clsBase = []
        } else {
            clsBase = JSON.parse(localStorage.getItem("cls"))
        }

        

        for(let i = 0; i < clsBase.length; i++) {
            console.log(newTodo.id)
            if(clsBase[i] === newTodo.id) {
                clsBase.splice(i, 1)
            }
        }

        localStorage.setItem("cls", JSON.stringify(clsBase))
    }

    })


    newTodo.appendChild(newDiv);

    const updateButton = document.createElement("button");
    updateButton.innerText = "Edit";
    updateButton.classList.add("btn", "btn-outline-primary", "me-3");

    newDiv.appendChild(updateButton);

    updateButton.addEventListener("click", (e) => {
        e.preventDefault;
        newInput.disabled = false
        newInput.focus()

    


        

    })

    newInput.addEventListener("keypress", (e) => {
        if(e.key === "Enter") {
            newInput.disabled = true
            updater(newInput.value, id)
        }
    })


    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("btn", "btn-outline-danger");


    
    newDiv.appendChild(deleteButton);

    deleteButton.addEventListener("click", (e) => {
        e.preventDefault();

        remover(id)
        for(let i = 0; i < classBase.length; i++) {
            
            if(classBase[i] === newTodo.id) {
                classBase.splice(i, 1)
            }
        }


        let clsBase;

        if(localStorage.getItem("cls") === null) {
            clsBase = []
        } else {
            clsBase = JSON.parse(localStorage.getItem("cls"))
        }


       

            for(let i = 0; i < clsBase.length; i++) {
                console.log(newTodo.id)
                if(clsBase[i] === newTodo.id) {
                    clsBase.splice(i, 1)
                }
            }

            localStorage.setItem("cls", JSON.stringify(clsBase))

    })
}

    

}


function pusherToObj(text, id) {
    if(text.length > 0) {
        todosBase.push(new CreateObject(text, id))
        localStorage.setItem("todos" , JSON.stringify(todosBase))
        creaetHTML(todoInput.value, todosId2)
        todosId++
        todosId2++
        console.log(todosId, "-----------", todosId2)
    }
}


function filterFunc(e) {
    const todos = todoList.childNodes;



    todos.forEach((todo) => {
        console.log(todo)
        switch(e.target.value) {
            case "All": 
            todo.style.display = "flex"
             break;
            case "Completed": 
                if(todo.classList.contains("list-group-item-success")) {
                    todo.style.display = "flex"
                } else {
                   
                    todo.style.display = "none"
                }
            break;

            case "Uncompleted": 
                if(!todo.classList.contains("list-group-item-success")) {
                    todo.style.display = "flex"
                } else {
                    
                    todo.style.display = "none"
                }
            break;
        }
    })
}


function adderId() {
    let base = JSON.parse(localStorage.getItem("todos"))

   
        if(base) {

            let numbers = ""
            for(let i in base) {


                if(base.length === 1) {
                    todosId += base[i].todoId +1
                    todosId2 += base[i].todoId +1
                    console.log("if ishladiiiiiiiii")
                } else  {

                    numbers += base[i].todoId
                    
                    
                    console.log("else ishladiiiiiiiii")
                }
                
    
                
    
    
            }

          let changed = numbers.split("")

          let newNum =  changed[changed.length - 1]

          let newNum2 = +newNum
          
            console.log(newNum2)
        //    for(let i = 0, j = 1; i<numbers.length; i++ , j++) {

        //    }

            if(newNum2) {
                todosId += newNum2+1
                todosId2 += newNum2+1

                console.log("Yetdiiiiiiiiiiiiii")
            } 
            console.log(todosId, "-----------", todosId2)
        }
        console.log(base)

    localStorage.setItem("todos", JSON.stringify(base))
}


function adder() {
    let base;
    if(localStorage.getItem("todos") === null) {
      base = []
    } else {
        base = JSON.parse(localStorage.getItem("todos"))
    }

    for(let i in base) {
            todosBase.push(base[i])
    }

    localStorage.setItem("todos", JSON.stringify(todosBase))
}




function getFromStorage() {
    let base 

    if(localStorage.getItem('todos') === null) {
        base = []
    } else {
        base = JSON.parse(localStorage.getItem("todos"))
    }

    
    adder()
    adderId()
    

    base.forEach((todo) => {

        const newDiv = document.createElement("div");
        newDiv.style.display = "flex";
        newDiv.style.alignItems = "center";
        newDiv.style.justifyContent = "space-between";


        const newInput = document.createElement("input");
        newInput.style.border = "none";
        newInput.style.outline = "none";
        newInput.style.background = "transparent";
        newInput.classList.add("form-control", "me-3");
        newInput.setAttribute("disabled", "true");
        
        
        newInput.value = todo.todoText;

    
    
    
        const newTodo = document.createElement("li")
   
        newTodo.classList.add("list-group-item");
        newTodo.setAttribute("id", `todo-li-${todo.todoId}`)
        newTodo.style.display = "flex";
        newTodo.style.alignItems = "center";
        newTodo.style.justifyContent = "space-between";


        todoList.appendChild(newTodo);
        newTodo.appendChild(newInput);
        
    
        const completedButton = document.createElement("button");
        completedButton.innerText = "Complete";
        completedButton.classList.add("btn", "btn-outline-success", "me-3");

        
        newDiv.appendChild(completedButton);

        let clsBase;

            if(localStorage.getItem("cls") === null) {
                clsBase = []
            } else {
                clsBase = JSON.parse(localStorage.getItem("cls"))
            }

            for(let i = 0; i < clsBase.length; i++) {
                console.log(newTodo.id)
                if(newTodo.id === clsBase[i]) {
                    newTodo.classList.add("list-group-item-success")
                }
            }

        completedButton.addEventListener("click", (e) => {
            newTodo.classList.toggle("list-group-item-success")

            

            
            

            if(newTodo.classList.contains("list-group-item-success")) {
                    classBase.push(newTodo.id)
                    let clsBase;
                    if(localStorage.getItem("cls") === null) {
                        clsBase = []
                    } else {
                        clsBase = JSON.parse(localStorage.getItem("cls"))
                    }
                    clsBase.push(newTodo.id)


                    localStorage.setItem("cls", JSON.stringify(clsBase));
                    // newTodo.classList.add("list-group-item-success")
            } else {
                for(let i = 0; i < classBase.length; i++) {
                   
                    if(classBase[i] === newTodo.id) {
                        classBase.splice(i, 1)
                        
                    }
                }

                let clsBase;


                if(localStorage.getItem("cls") === null) {
                    clsBase = []
                } else {
                    clsBase = JSON.parse(localStorage.getItem("cls"))
                }

                

                for(let i = 0; i < clsBase.length; i++) {
                    console.log(newTodo.id)
                    if(clsBase[i] === newTodo.id) {
                        clsBase.splice(i, 1)
                    }
                }

                localStorage.setItem("cls", JSON.stringify(clsBase))
            }


            

        })

        newTodo.appendChild(newDiv);

        
        const updateButton = document.createElement("button");
        updateButton.innerText = "Edit";
        updateButton.classList.add("btn", "btn-outline-primary", "me-3");
    
        newDiv.appendChild(updateButton);
    
        updateButton.addEventListener("click", (e) => {
            e.preventDefault;
            newInput.disabled = false
            newInput.focus()
    
    
            // if(e.key === "Enter") {
            //     newInput.disabled = true
            // }
    
        })

        newInput.addEventListener("keypress", (e) => {
            if(e.key === "Enter") {
                newInput.disabled = true
                updater(newInput.value, todo.todoId)
            }
        })
    
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.classList.add("btn", "btn-outline-danger");
    
        
        newDiv.appendChild(deleteButton);

        deleteButton.addEventListener("click", (e) => {
            e.preventDefault();
    
            remover(todo.todoId)
            
            for(let i = 0; i < classBase.length; i++) {
            
                if(classBase[i] === newTodo.id) {
                    classBase.splice(i, 1)
                }
            }


            let clsBase;

            if(localStorage.getItem("cls") === null) {
                clsBase = []
            } else {
                clsBase = JSON.parse(localStorage.getItem("cls"))
            }


           

                for(let i = 0; i < clsBase.length; i++) {
                    console.log(newTodo.id)
                    if(clsBase[i] === newTodo.id) {
                        clsBase.splice(i, 1)
                    }
                }

                localStorage.setItem("cls", JSON.stringify(clsBase))

    
        })
        
       

        

    })


    

}




console.log(todosId, "-----------", todosId2)



todoForm.addEventListener("submit", function(e) {
    
    e.preventDefault();


    
    pusherToObj(todoInput.value, todosId)
    
    
   
    
    

    todoForm.reset()
})

console.log(todosId, "-----------", todosId2)
todoSelect.addEventListener("change", filterFunc)
document.addEventListener("DOMContentLoaded", getFromStorage)
console.log(todosId, "-----------", todosId2)