"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { taskService } from "@/services/taskService";
import { Task, TaskDTO, TaskStatus } from "@/types";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";

export default function Dashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  // Estados para tarefas
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Estados para nova tarefa
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskDescription, setNewTaskDescription] = useState("");

  // Estados para edição
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingDescription, setEditingDescription] = useState("");

  // Filtro de status
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "ALL">("ALL");

  // Redirecionar se não estiver autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  // Carregar tarefas do usuário
  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

  const loadTasks = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const userTasks = await taskService.getTasksByUser(user.id);
      setTasks(userTasks);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
      setError("Erro ao carregar tarefas");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleAddTask = async () => {
    if (!user || !newTaskDescription.trim()) return;

    try {
      const taskData: TaskDTO = {
        description: newTaskDescription.trim(),
        userId: user.id,
        status: TaskStatus.PENDENTE,
      };

      await taskService.createTask(taskData);
      setNewTaskDescription("");
      setIsAddingTask(false);
      await loadTasks();
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      setError("Erro ao adicionar tarefa");
    }
  };

  const handleUpdateTaskStatus = async (
    taskId: number,
    newStatus: TaskStatus
  ) => {
    try {
      await taskService.updateTaskStatus(taskId, newStatus);
      await loadTasks();
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      setError("Erro ao atualizar status");
    }
  };

  const handleEditTask = async (taskId: number) => {
    if (!user || !editingDescription.trim()) return;

    try {
      const taskData: TaskDTO = {
        description: editingDescription.trim(),
        userId: user.id,
      };

      await taskService.updateTask(taskId, taskData);
      setEditingTaskId(null);
      setEditingDescription("");
      await loadTasks();
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
      setError("Erro ao editar tarefa");
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
      try {
        await taskService.deleteTask(taskId);
        await loadTasks();
      } catch (error) {
        console.error("Erro ao deletar tarefa:", error);
        setError("Erro ao deletar tarefa");
      }
    }
  };

  const startEditing = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingDescription(task.description);
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditingDescription("");
  };

  const getFilteredTasks = () => {
    if (statusFilter === "ALL") return tasks;
    return tasks.filter((task) => task.status === statusFilter);
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.PENDENTE:
        return "bg-yellow-600";
      case TaskStatus.EM_ANDAMENTO:
        return "bg-blue-600";
      case TaskStatus.CONCLUIDA:
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  const getStatusText = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.PENDENTE:
        return "Pendente";
      case TaskStatus.EM_ANDAMENTO:
        return "Em Andamento";
      case TaskStatus.CONCLUIDA:
        return "Concluída";
      default:
        return status;
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  const filteredTasks = getFilteredTasks();
  const taskCounts = {
    total: tasks.length,
    pendente: tasks.filter((t) => t.status === TaskStatus.PENDENTE).length,
    emAndamento: tasks.filter((t) => t.status === TaskStatus.EM_ANDAMENTO)
      .length,
    concluida: tasks.filter((t) => t.status === TaskStatus.CONCLUIDA).length,
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Cabeçalho */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Dashboard de Tarefas</h1>
            <p className="text-gray-400">Bem-vindo, {user.name}!</p>
          </div>
          <button
            onClick={handleLogout}
            className=" hover:bg-red-700 px-4 py-2 rounded text-white transition-colors duration-200"
          >
            <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Conteudo principal */}
      <main className="p-6 max-w-6xl mx-auto">
        {/* Status */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold">Total</h3>
            <p className="text-2xl font-bold text-blue-400">
              {taskCounts.total}
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold">Pendentes</h3>
            <p className="text-2xl font-bold text-yellow-400">
              {taskCounts.pendente}
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold">Em Andamento</h3>
            <p className="text-2xl font-bold text-blue-400">
              {taskCounts.emAndamento}
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold">Concluídas</h3>
            <p className="text-2xl font-bold text-green-400">
              {taskCounts.concluida}
            </p>
          </div>
        </div>

        {/* Mensagem de erro */}
        {error && (
          <div className="transition-all duration-300 ease-in-out mb-4 p-3 bg-red-600 bg-opacity-20 border border-red-500 rounded text-red-300">
            {error}
            <button
              onClick={() => setError("")}
              className="float-right text-red-300 hover:text-red-100"
            >
              ×
            </button>
          </div>
        )}

        {/* Ações */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Add Task */}
          {!isAddingTask ? (
            <button
              onClick={() => setIsAddingTask(true)}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white transition-colors duration-200"
            >
              + Nova Tarefa
            </button>
          ) : (
            <div className="flex gap-2 flex-1">
              <input
                type="text"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                placeholder="Descrição da nova tarefa"
                className="transition-all duration-300 ease-in-out flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-100 focus:border-blue-500 focus:outline-none"
                onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
                autoFocus
              />
              <button
                onClick={handleAddTask}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white transition-colors duration-200"
              >
                Salvar
              </button>
              <button
                onClick={() => {
                  setIsAddingTask(false);
                  setNewTaskDescription("");
                }}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white transition-colors duration-200"
              >
                Cancelar
              </button>
            </div>
          )}

          {/* Filtro */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as TaskStatus | "ALL")
            }
            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-100 focus:border-blue-500 focus:outline-none"
          >
            <option value="ALL">Todas</option>
            <option value={TaskStatus.PENDENTE}>Pendentes</option>
            <option value={TaskStatus.EM_ANDAMENTO}>Em Andamento</option>
            <option value={TaskStatus.CONCLUIDA}>Concluídas</option>
          </select>
        </div>

        {/* Cabeçalho da lista de tarefas */}
        <div className="grid grid-cols-3 gap-4 px-4 py-2 text-sm font-semibold text-gray-400 border-b border-gray-700">
          <div>Status</div>
          <div>Tarefa</div>
          <div className="text-right">Ações</div>
        </div>

        {/* Tasks List */}
        {loading ? (
          <div className="text-center py-8">
            <div className="text-gray-400">Carregando tarefas...</div>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400">
              {statusFilter === "ALL"
                ? "Nenhuma tarefa encontrada. Crie sua primeira tarefa!"
                : `Nenhuma tarefa ${getStatusText(
                    statusFilter as TaskStatus
                  ).toLowerCase()} encontrada.`}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="transition-all duration-300 ease-in-out bg-gray-800 border border-gray-700 rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                      task.status
                    )} shadow-sm`}
                  >
                    {getStatusText(task.status)}
                  </span>

                  {editingTaskId === task.id ? (
                    <input
                      type="text"
                      value={editingDescription}
                      onChange={(e) => setEditingDescription(e.target.value)}
                      className="flex-1 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-gray-100 focus:border-blue-500 focus:outline-none"
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleEditTask(task.id)
                      }
                      autoFocus
                    />
                  ) : (
                    <span className="flex-1">{task.description}</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {editingTaskId === task.id ? (
                    <>
                      <button
                        onClick={() => handleEditTask(task.id)}
                        className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-white text-sm transition-colors duration-200"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded text-white text-sm transition-colors duration-200"
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Botões de status */}
                      <select
                        value={task.status}
                        onChange={(e) =>
                          handleUpdateTaskStatus(
                            task.id,
                            e.target.value as TaskStatus
                          )
                        }
                        className="bg-gray-700 text-white text-xs px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        title="Alterar status"
                      >
                        <option value={TaskStatus.PENDENTE}>Pendente</option>
                        <option value={TaskStatus.EM_ANDAMENTO}>
                          Em Andamento
                        </option>
                        <option value={TaskStatus.CONCLUIDA}>Concluída</option>
                      </select>

                      <button
                        onClick={() => startEditing(task)}
                        className="p-2 rounded text-blue-400 hover:text-blue-600 transition-colors duration-200"
                        title="Editar"
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>

                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-2 rounded text-red-400 hover:text-red-600 transition-colors duration-200"
                        title="Excluir"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
