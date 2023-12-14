let btn = document.querySelector('#btn');
let task = document.querySelector('#task');
let taskList = document.querySelector('.taskList');

function updateList(tasks){
    // dom manipulation: clicking a button

    // har ek chiz new add krne pr 
    taskList.innerHTML = '';
    tasks.forEach((t)=>{
        let li = document.createElement('li');
        li.classList.add('taskListItem');

        li.innerHTML = `
            <span class="taskName">${t}</span>
            <button class="deleteBtn btn">❌</button>
            <button class="downBtn btn">↓</button>
            <button class="upBtn btn">↑</button>
        `
        taskList.appendChild(li);
    })   
}

//  After click sbse phle (script.js)initialise list  se jaayega -->
// then wo backend mai jaayega axios se (app.js mai)-->
// waha se data.data se update list krega (dom manipulation)--->
// 

function initialiseList(){
    axios.get(`/gettasks`)
    // jb hmara promise pura hojaega 
    // array fetch kr rha hai 
    .then((data)=>{
        data = data.data;
        updateList(data);
    })
    .catch(err=>{
        alert(err);
    })
}

initialiseList();

btn.addEventListener('click',(ev)=>{
    // agar hm koi bhi new acivity daalte hai array mai ye uski avlue uthaega
    axios.get(`/addtask?task=${task.value}`)
        .then((data)=>{
            data = data.data;
            updateList(data);
        })
        .catch(err=>{
            alert(err);
        })
})
// ajax request basically page refresh na ho
taskList.addEventListener('click',(ev)=>{
    // console.log(ev.target.classList);
    if(ev.target.classList.contains('deleteBtn')){
        let taskName = ev.target.previousElementSibling.innerText;
        axios.get(`/deletetask?task=${taskName}`)
            .then((data)=>{
                data = data.data;
                updateList(data);
            })
            .catch(err=>{
                alert(err);
            })
    }
    else if(ev.target.classList.contains('upBtn')){
        let taskName = ev.target.parentElement.children[0].innerText;
        console.log(taskName);
        axios.get(`/increasepriority?name=${taskName}`)
            .then((data)=>{
                data = data.data;
                updateList(data);
            })
            .catch(err=>{
                alert(err);
            })

            // @s ye backend se TODO wali list se data lekr--->
            // aage index.html mai bhejegi
    }
    else if(ev.target.classList.contains('downBtn')){
        let taskName = ev.target.parentElement.children[0].innerText;
        console.log(taskName);
        axios.get(`/decreasepriority?name=${taskName}`)
            .then((data)=>{
                data = data.data;
                updateList(data);
            })
            .catch(err=>{
                alert(err);
            })
    }

})