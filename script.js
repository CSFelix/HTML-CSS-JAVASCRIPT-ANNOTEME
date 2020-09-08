const container = document.querySelector('.listaTarefas');
var inputValue = document.querySelector('.campoInserir');
const add = document.querySelector('.adicionar');

// Adiciona as tarefas no armazenamento local do navegador
if(window.localStorage.getItem("todos") == undefined) {
     var todos = [];
     window.localStorage.setItem("todos", JSON.stringify(todos));
}

var todosEX = window.localStorage.getItem("todos");
var todos = JSON.parse(todosEX);
    
class item {
	/* 
	 * Classe responsável por armazenar as descrições de cada tarefa
	 * Setá extinta após atomatização de armazenamento
	 *  */
	constructor(name) { this.createItem(name); }

    // cria itens
    createItem(name) {
        //  cria novo campo para alocar o item
    	var itemBox = document.createElement('div');
        itemBox.classList.add('item');

        // cria campo de input dentro da alocação para usuário
        // poder alterar e remover a tarefa
    	var input = document.createElement('input');
    	input.type = "text";
    	input.disabled = true;
    	input.value = name;
    	input.classList.add('item_input');

        // adiciona botão de edição da tarefa
    	var edit = document.createElement('button');
    	edit.classList.add('edit');
    	edit.innerHTML = "Editar";
    	edit.addEventListener('click', () => this.edit(input, name));

        // adiciona botão de exclusão da tarefa
    	var remove = document.createElement('button');
    	remove.classList.add('remove');
    	remove.innerHTML = "Remover";
    	remove.addEventListener('click', () => this.remove(itemBox, name));

        // adiciona alocação na divisória agrupadora de itens
    	container.appendChild(itemBox);
        itemBox.appendChild(input);
        itemBox.appendChild(edit);
        itemBox.appendChild(remove);

    }

    // editar tarefa
    edit(input, name){
        if(input.disabled == true){
           input.disabled = !input.disabled;
        }
    	else{
            input.disabled = !input.disabled;
            let indexof = todos.indexOf(name);
            todos[indexof] = input.value;
            window.localStorage.setItem("todos", JSON.stringify(todos));
        }
    }

    // remover tarefa
    remove(itemBox, name){
        itemBox.parentNode.removeChild(itemBox);
        let index = todos.indexOf(name);
        todos.splice(index, 1);
        window.localStorage.setItem("todos", JSON.stringify(todos));
    }
}

// checa se o usuário apertou 'enter'
// se caso apertou, um novo item é adicionado
add.addEventListener('click', check);
window.addEventListener('keydown', (e) => {
	if(e.which == 13){
		check();
	}
})

// processo de adicionamento do item
function check(){
	if(inputValue.value != ""){
		new item(inputValue.value);
        todos.push(inputValue.value);
        window.localStorage.setItem("todos", JSON.stringify(todos));
		inputValue.value = "";
	}
}

// lista as tarefas
for (var v = 0 ; v < todos.length ; v++){
    new item(todos[v]);
}

// adiciona itens via programação '-'
//new item("sport");