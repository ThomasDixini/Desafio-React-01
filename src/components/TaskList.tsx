import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'
import { Key, ReactChild, ReactFragment, ReactPortal } from 'react';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {

    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.


    if (!newTaskTitle) return;  // Caso o input esteja vazio, a função não cria uma nova Task

    const newTasks = {
      id: Math.random(),        // Criei uma nova const para adicionar um id aleatório com Math.Random(), e em 
      title: newTaskTitle,      // title, passei o newTaskTitle que é aonde está atribuido o valor do input da task.
      isComplete: false,
    }

    setTasks(previousState => [...previousState,newTasks])    // seta todas as tasks que já tinha e mais uma nova, que no caso é a const newTasks.
    
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    const newArray = tasks.map(task => task.id == id ? {            // Isso vai mapear cada task do meu tasks[] e me retornar um valor.
      ...task,                                                      // E como parametro do .map() ele vai pegar um item do meu array tasks, e comparar se o 
      isComplete: !task.isComplete,                                 // task.id é igual ao id que foi passado na função e caso seja, me retorna o que ja tinha,
    } : task)                                                       // e sobrescreve a propriedade isComplete: do item negada

    setTasks(newArray)

  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID


    const filtro = tasks.filter(task => task.id !== id)   // O .filter() vai pegar todas as tasks que não tenham ID = ao parâmetro da função handleRemoveTask.
    setTasks(filtro)                                      // E como ele pega as tasks diferentes, a setTasks() vai colocar todas as tasks menos a que tenha o ID igual.
                                                          // Ou seja vai ser a mesma coisa que remover.

  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task: Task) => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}