class TaskManager {
  constructor() {
    this.tasks = [];
    this.taskIdCounter = 1;
    this.currentFilter = "all";
    this.currentSort = "date";

    this.initializeElements();
    this.attachEventListeners();
    this.updateUI();
  }

  initializeElements() {
    this.taskForm = document.getElementById("taskForm");
    this.taskList = document.getElementById("taskList");
    this.taskCount = document.getElementById("taskCount");
    this.errorMessage = document.getElementById("errorMessage");
    this.taskTitleInput = document.getElementById("taskTitle");
    this.taskDescriptionInput = document.getElementById("taskDescription");
    this.priorityInputs = document.querySelectorAll('input[name="priority"]');
    this.showAllBtn = document.getElementById("showAll");
    this.showCompletedBtn = document.getElementById("showCompleted");
    this.showPendingBtn = document.getElementById("showPending");
    this.sortSelect = document.getElementById("sortBy");
  }

  attachEventListeners() {
    this.taskForm.addEventListener("submit", (e) => this.handleFormSubmit(e));
    this.showAllBtn.addEventListener("click", () => this.setFilter("all"));
    this.showCompletedBtn.addEventListener("click", () =>
      this.setFilter("completed")
    );
    this.showPendingBtn.addEventListener("click", () =>
      this.setFilter("pending")
    );
    this.sortSelect.addEventListener("change", (e) =>
      this.setSorting(e.target.value)
    );
    this.taskList.addEventListener("click", (e) => this.handleTaskActions(e));
  }

  handleFormSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    try {
      const taskData = this.getFormData();
      const validation = this.validateTaskData(taskData);
      if (!validation.isValid) {
        this.showError(validation.errors.join("<br>"));
        return;
      }
      const newTask = this.createTask(taskData);
      this.addTask(newTask);
      this.clearForm();
      this.hideError();
      this.updateUI();
      this.showSuccessMessage("Görev başarıyla eklendi!");
    } catch (error) {
      console.error("Görev ekleme hatası:", error);
      this.showError("Beklenmedik bir hata oluştu. Lütfen tekrar deneyin.");
    }
  }

  getFormData() {
    const selectedPriority = document.querySelector(
      'input[name="priority"]:checked'
    );

    return {
      title: this.taskTitleInput.value.trim(),
      description: this.taskDescriptionInput.value.trim(),
      priority: selectedPriority ? selectedPriority.value : null,
    };
  }

  validateTaskData(data) {
    const errors = [];

    if (!data.title) {
      errors.push("Görev başlığı zorunludur.");
      this.markFieldError(this.taskTitleInput);
    } else {
      this.clearFieldError(this.taskTitleInput);
    }

    if (!data.priority) {
      errors.push("Lütfen bir öncelik seviyesi seçin.");
      this.markPriorityError();
    } else {
      this.clearPriorityError();
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  markFieldError(field) {
    field.classList.add("error");
  }

  clearFieldError(field) {
    field.classList.remove("error");
  }

  markPriorityError() {
    document.querySelector(".priority-options").style.border =
      "2px solid #e53e3e";
  }

  clearPriorityError() {
    document.querySelector(".priority-options").style.border = "none";
  }

  createTask(data) {
    return {
      id: this.taskIdCounter++,
      title: data.title,
      description: data.description,
      priority: data.priority,
      completed: false,
      createdAt: new Date(),
      completedAt: null,
    };
  }

  addTask(task) {
    this.tasks.push(task);
  }

  clearForm() {
    this.taskForm.reset();
    this.clearFieldError(this.taskTitleInput);
    this.clearFieldError(this.taskDescriptionInput);
    this.clearPriorityError();
  }

  handleTaskActions(e) {
    e.stopPropagation();

    const taskId = parseInt(
      e.target.dataset.taskId ||
        e.target.closest("[data-task-id]")?.dataset.taskId
    );

    if (!taskId) return;

    try {
      if (
        e.target.classList.contains("complete-btn") ||
        e.target.closest(".complete-btn")
      ) {
        this.toggleTaskCompletion(taskId);
      } else if (
        e.target.classList.contains("delete-btn") ||
        e.target.closest(".delete-btn")
      ) {
        this.deleteTask(taskId);
      }
    } catch (error) {
      console.error("Görev işlemi hatası:", error);
      this.showError("İşlem gerçekleştirilemedi. Lütfen tekrar deneyin.");
    }
  }

  toggleTaskCompletion(taskId) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      task.completedAt = task.completed ? new Date() : null;
      this.updateUI();

      const message = task.completed
        ? "Görev tamamlandı!"
        : "Görev tekrar aktif hale getirildi!";
      this.showSuccessMessage(message);
    }
  }

  deleteTask(taskId) {
    const taskIndex = this.tasks.findIndex((t) => t.id === taskId);
    if (taskIndex > -1) {
      const task = this.tasks[taskIndex];

      if (
        confirm(`"${task.title}" görevini silmek istediğinizden emin misiniz?`)
      ) {
        this.tasks.splice(taskIndex, 1);
        this.updateUI();
        this.showSuccessMessage("Görev silindi!");
      }
    }
  }

  setFilter(filter) {
    this.currentFilter = filter;

    document.querySelectorAll(".filter-controls .btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    switch (filter) {
      case "all":
        this.showAllBtn.classList.add("active");
        break;
      case "completed":
        this.showCompletedBtn.classList.add("active");
        break;
      case "pending":
        this.showPendingBtn.classList.add("active");
        break;
    }

    this.updateUI();
  }

  setSorting(sortBy) {
    this.currentSort = sortBy;
    this.updateUI();
  }

  getFilteredTasks() {
    let filteredTasks = [...this.tasks];

    switch (this.currentFilter) {
      case "completed":
        filteredTasks = filteredTasks.filter((task) => task.completed);
        break;
      case "pending":
        filteredTasks = filteredTasks.filter((task) => !task.completed);
        break;
    }

    switch (this.currentSort) {
      case "date":
        filteredTasks.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "priority":
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        filteredTasks.sort(
          (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
        );
        break;
      case "title":
        filteredTasks.sort((a, b) => a.title.localeCompare(b.title, "tr"));
        break;
    }

    return filteredTasks;
  }

  updateUI() {
    this.renderTasks();
    this.updateTaskCount();
  }

  renderTasks() {
    const filteredTasks = this.getFilteredTasks();

    if (filteredTasks.length === 0) {
      this.taskList.innerHTML = this.getEmptyStateHTML();
      return;
    }

    const tasksHTML = filteredTasks
      .map((task) => this.generateTaskHTML(task))
      .join("");
    this.taskList.innerHTML = tasksHTML;
  }

  getEmptyStateHTML() {
    let message = "";
    switch (this.currentFilter) {
      case "completed":
        message =
          this.tasks.length === 0
            ? "Henüz hiç görev yok"
            : "Henüz tamamlanmış görev yok";
        break;
      case "pending":
        message =
          this.tasks.length === 0
            ? "Henüz hiç görev yok"
            : "Tüm görevler tamamlanmış!";
        break;
      default:
        message = "Henüz görev yok";
    }

    return `
            <div class="empty-state">
                <i class="fas fa-clipboard-list"></i>
                <h3>${message}</h3>
                <p>Yukarıdaki formu kullanarak ilk görevinizi ekleyin</p>
            </div>
        `;
  }

  generateTaskHTML(task) {
    const priorityText = {
      low: "Düşük",
      medium: "Orta",
      high: "Yüksek",
    };

    const formattedDate = this.formatDate(task.createdAt);
    const completedClass = task.completed ? "completed" : "";

    const completeButtonText = task.completed
      ? '<i class="fas fa-undo"></i> Geri Al'
      : '<i class="fas fa-check"></i> Tamamla';

    const completeButtonClass = task.completed ? "uncomplete" : "complete";

    return `
            <div class="task-item ${completedClass}" data-task-id="${task.id}">
                <div class="task-header">
                    <div class="task-info">
                        <h3 class="task-title">${this.escapeHtml(
                          task.title
                        )}</h3>
                        ${
                          task.description
                            ? `<p class="task-description">${this.escapeHtml(
                                task.description
                              )}</p>`
                            : ""
                        }
                        <div class="task-meta">
                            <span class="task-priority ${task.priority}">${
      priorityText[task.priority]
    }</span>
                            <span class="task-date">
                                <i class="fas fa-calendar-alt"></i> ${formattedDate}
                            </span>
                        </div>
                    </div>
                    <div class="task-actions">
                        <button class="task-btn ${completeButtonClass} complete-btn" data-task-id="${
      task.id
    }">
                            ${completeButtonText}
                        </button>
                        <button class="task-btn delete delete-btn" data-task-id="${
                          task.id
                        }">
                            <i class="fas fa-trash"></i> Sil
                        </button>
                    </div>
                </div>
            </div>
        `;
  }

  updateTaskCount() {
    const filteredTasks = this.getFilteredTasks();
    const totalTasks = this.tasks.length;
    const completedTasks = this.tasks.filter((t) => t.completed).length;

    let countText = "";
    switch (this.currentFilter) {
      case "completed":
        countText = `${completedTasks} tamamlanmış görev`;
        break;
      case "pending":
        countText = `${totalTasks - completedTasks} bekleyen görev`;
        break;
      default:
        countText = `${totalTasks} görev`;
    }

    this.taskCount.textContent = countText;
  }

  formatDate(date) {
    return new Intl.DateTimeFormat("tr-TR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  }

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  showError(message) {
    this.errorMessage.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
    this.errorMessage.style.display = "block";

    this.errorMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });

    setTimeout(() => this.hideError(), 5000);
  }

  hideError() {
    this.errorMessage.style.display = "none";
  }

  showSuccessMessage(message) {
    const successDiv = document.createElement("div");
    successDiv.className = "success-message";
    successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #48bb78;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 500;
            animation: slideIn 0.3s ease;
        `;

    document.body.appendChild(successDiv);

    setTimeout(() => {
      successDiv.style.animation = "slideOut 0.3s ease";
      setTimeout(() => successDiv.remove(), 300);
    }, 3000);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  try {
    const taskManager = new TaskManager();

    window.taskManager = taskManager;

    console.log("Görev Yönetimi Uygulaması başlatıldı!");
  } catch (error) {
    console.error("Uygulama başlatılırken hata oluştu:", error);

    const errorDiv = document.createElement("div");
    errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #fed7d7;
            border: 2px solid #fc8181;
            color: #c53030;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            z-index: 2000;
            max-width: 400px;
        `;
    errorDiv.innerHTML = `
            <h3>Uygulama Hatası</h3>
            <p>Uygulama başlatılırken bir hata oluştu. Lütfen sayfayı yenileyin.</p>
            <button onclick="location.reload()" style="
                background: #c53030;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 10px;
            ">Sayfayı Yenile</button>
        `;
    document.body.appendChild(errorDiv);
  }
});
const additionalStyles = `
    <style>
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
    </style>
`;
document.head.insertAdjacentHTML("beforeend", additionalStyles);
