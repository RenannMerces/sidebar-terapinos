//* --------------Função hamburguer ----------------------//

function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("expanded");
}

// * ------------- Função dropdawn/modal -----------------//
document.addEventListener("DOMContentLoaded", function () {
    const transactionBtn = document.getElementById("transaction-btn") || document.querySelector(".transaction-btn");
    const transactionModal = document.getElementById("transaction-modal") || document.querySelector(".transaction-mini-modal");

    function toggleModal(event) {
        event.preventDefault();

        if (transactionModal.classList.contains("show")) {
            transactionModal.classList.remove("show");
            setTimeout(() => (transactionModal.style.display = "none"), 200);
            transactionBtn.classList.remove("open");
        } else {
            transactionModal.style.display = "block";
            setTimeout(() => transactionModal.classList.add("show"), 10);
            transactionBtn.classList.add("open");
        }
    }

    if (transactionBtn && transactionModal) {
        transactionBtn.addEventListener("click", toggleModal);
    }
    
    document.addEventListener("click", function (event) {
        if (
            transactionModal &&
            transactionBtn &&
            !event.target.closest("#transaction-modal") &&
            !event.target.closest("#transaction-btn") &&
            !event.target.closest(".transaction-mini-modal")
        ) {
            transactionModal.classList.remove("show");
            setTimeout(() => (transactionModal.style.display = "none"), 200);
            transactionBtn.classList.remove("open");
        }
    });

    // ---- MINI MENU MOBILE ----
    const mobileMenuBtn = document.querySelector(".transaction-btn");
    const mobileMenu = document.querySelector(".transaction-mini-modal");

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", function (event) {
            event.preventDefault();
            mobileMenu.classList.toggle("show");
        });

        document.addEventListener("click", function (event) {
            if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.remove("show");
            }
        });
    }
});

//* ------ Truncate (aparecer o nome do coiso ao passar o mouse)-----------------//

document.addEventListener("DOMContentLoaded", function() {
    function aplicarTooltip() {
        document.querySelectorAll(".truncate").forEach(function(element) {
            element.removeAttribute("title");
            if (element.offsetWidth < element.scrollWidth) {
                element.setAttribute("title", element.textContent.trim());
            }
        });
    }
    aplicarTooltip();
    window.addEventListener("resize", aplicarTooltip);
});

//* ----------------- Botões de ação tabela -----------------//

document.addEventListener("DOMContentLoaded", () => {
    const tabela = document.querySelector(".custom-table tbody");

    if (!tabela) return;

    const iconesAcoes = `
        <td class="actions">
            <i class="fas fa-pencil-alt text-warning"></i>
            <i class="fas fa-trash text-danger"></i>
            <i class="fas fa-dollar-sign text-success"></i>
            <i class="fas fa-file-alt text-primary"></i>
        </td>
    `;

    const adicionarAcoes = (linha) => {
        if (!linha.querySelector(".actions")) linha.insertAdjacentHTML("beforeend", iconesAcoes);
    };

    tabela.querySelectorAll("tr").forEach(adicionarAcoes);

    new MutationObserver((mutacoes) => {
        mutacoes.forEach((mutacao) => {
            mutacao.addedNodes.forEach((node) => {
                if (node.nodeType === 1 && node.tagName === "TR") adicionarAcoes(node);
            });
        });
    }).observe(tabela, { childList: true });
});

//! --------------------Side Direita Mobile ------------------

document.addEventListener("DOMContentLoaded", function () {
    const aside = document.querySelector(".custom-aside");
    const toggleButton = document.getElementById("toggleAside");

    toggleButton.addEventListener("click", function () {
        if (aside.style.display === "none" || aside.style.display === "") {
            aside.style.display = "flex"; 
        } else {
            aside.style.display = "none"; 
        }
    });

    function checkScreenSize() {
        if (window.innerWidth <= 900) {
            aside.style.display = "none"; 
        } else {
            aside.style.display = "flex"; 
        }
    }

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
});

//& -------------------------------------------------------------- CALENDÁRIO ----------------------------------------------------------- //

document.addEventListener("DOMContentLoaded", () => {
    const calendarDays = document.getElementById("calendarDays");
    const currentMonthYear = document.getElementById("currentMonthYear");
    const prevMonthBtn = document.getElementById("prevMonth");
    const nextMonthBtn = document.getElementById("nextMonth");
    const accordionContainer = document.querySelector(".accordion-container");

    let currentDate = new Date();
    let selectedDate = new Date(); // Sempre começa no dia atual
    const today = new Date();
    
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"];

    // Simulando dados de agendamentos com múltiplos profissionais no mesmo dia
    const agendamentos = {
        "08/03/2025": [
            { nome: "Dr. João da Silva", horario: "16:00", procedimento: "Exame", paciente: "Pedro Lima", status: "Pendente" },
            { nome: "Dra. Fernanda Costa", horario: "17:00", procedimento: "Consulta", paciente: "Lucas Souza", status: "Confirmado" },
            { nome: "Dra. Fernanda Costa", horario: "17:00", procedimento: "Consulta", paciente: "Lucas Souza", status: "Confirmado" },
            { nome: "Dra. Fernanda Costa", horario: "17:00", procedimento: "Consulta", paciente: "Lucas Souza", status: "Confirmado" },
            { nome: "Dra. Fernanda Costa", horario: "17:00", procedimento: "Consulta", paciente: "Lucas Souza", status: "Confirmado" },
            { nome: "Dra. Fernanda Costa", horario: "17:00", procedimento: "Consulta", paciente: "Lucas Souza", status: "Confirmado" },
            { nome: "Dra. Fernanda Costa", horario: "17:00", procedimento: "Consulta", paciente: "Lucas Souza", status: "Confirmado" },
            { nome: "Dra. Fernanda Costa", horario: "17:00", procedimento: "Consulta", paciente: "Lucas Souza", status: "Confirmado" },
            { nome: "Dra. Fernanda Costa", horario: "17:00", procedimento: "Consulta", paciente: "Lucas Souza", status: "Confirmado" },
            { nome: "Dra. Fernanda Costa", horario: "17:00", procedimento: "Consulta", paciente: "Lucas Souza", status: "Confirmado" },
            { nome: "Dra. Fernanda Costa", horario: "17:00", procedimento: "Consulta", paciente: "Lucas Souza", status: "Confirmado" },
            { nome: "Dra. Fernanda Costa", horario: "17:00", procedimento: "Consulta", paciente: "Lucas Souza", status: "Confirmado" },
            
        ],
        "10/03/2025": [
            { nome: "Dra. Maria Oliveira", horario: "14:00", procedimento: "Consulta", paciente: "Ana Souza", status: "Confirmado" }
        ]
    };

    // Renderiza o calendário
    const renderCalendar = () => {
        calendarDays.innerHTML = "";
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        const lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

        currentMonthYear.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

        // Adiciona os nomes dos dias da semana
        daysOfWeek.forEach(day => {
            const dayName = document.createElement("div");
            dayName.textContent = day;
            dayName.classList.add("day-name");
            calendarDays.appendChild(dayName);
        });

        // Preenche os dias em branco antes do início do mês
        [...Array(firstDay)].forEach(() => calendarDays.appendChild(document.createElement("div")));

        // Adiciona os dias do mês
        [...Array(lastDate)].forEach((_, i) => {
            const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1);
            const formattedDate = formatDate(dayDate);
            const dayElement = document.createElement("div");
            dayElement.textContent = i + 1;

            // Marca o dia de hoje
            if (isToday(dayDate)) dayElement.classList.add("today");

            // Marca o dia selecionado
            if (isSameDay(selectedDate, dayDate)) dayElement.classList.add("selected-day");

            // Marca o mês atual
            if (isCurrentMonth(dayDate)) dayElement.classList.add("current-month");

            // Adiciona evento de clique para atualizar os agendamentos
            dayElement.addEventListener("click", () => {
                selectedDate = dayDate;
                renderCalendar();
                updateAgendamentos(formattedDate);
            });

            calendarDays.appendChild(dayElement);
        });

        // Atualiza os agendamentos do dia atual ao iniciar
        if (!selectedDate || isToday(selectedDate)) {
            selectedDate = new Date();
            updateAgendamentos(formatDate(selectedDate));
        }
    };

    // Atualiza os acordeões de acordo com a data selecionada
    const updateAgendamentos = (date) => {
        accordionContainer.innerHTML = ""; // Limpa o conteúdo anterior

        if (agendamentos[date]) {
            const accordion = document.createElement("div");
            accordion.classList.add("accordion", "custom-accordion");
            accordion.id = "accordionAgendamentos";

            agendamentos[date].forEach((profissional, index) => {
                const accordionItem = document.createElement("div");
                accordionItem.classList.add("accordion-item");

                accordionItem.innerHTML = `
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#profissional${index}">
                            <span class="truncate">${profissional.nome}</span>
                        </button>
                    </h2>
                    <div id="profissional${index}" class="accordion-collapse collapse" data-bs-parent="#accordionAgendamentos">
                        <div class="accordion-body">
                            <div class="table-container">
                                <table class="table custom-table">
                                    <thead>
                                        <tr>
                                            <th>Hora</th>
                                            <th>Data</th>
                                            <th>Procedimento</th>
                                            <th>Paciente</th>
                                            <th>Status</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>${profissional.horario}</td>
                                            <td>${date}</td>
                                            <td>${profissional.procedimento}</td>
                                            <td>${profissional.paciente}</td>
                                            <td><span class="badge bg-warning text-dark">${profissional.status}</span></td>
                                            <td class="actions">
                                                <button onclick="editAgendamento(event, ${index}, '${date}')"><i class="fas fa-pencil-alt text-warning"></i></button>
                                                <button><i class="fas fa-trash text-danger"></i></button>
                                                <button><i class="fas fa-dollar-sign text-success"></i></button>
                                                <button><i class="fas fa-file-alt text-primary"></i></button>
                                            </td>
                                        </tr>  
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `;

                accordion.appendChild(accordionItem);
            });

            accordionContainer.appendChild(accordion);
        } else {
            accordionContainer.innerHTML = "<p class='text-center mt-3'>Nenhum agendamento para esta data.</p>";
        }
    };

    // Formata a data para o padrão dd/mm/yyyy
    const formatDate = (date) => {
        let day = date.getDate().toString().padStart(2, "0");
        let month = (date.getMonth() + 1).toString().padStart(2, "0");
        let year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Verifica se a data fornecida é o dia de hoje
    const isToday = (date) => date.toDateString() === today.toDateString();

    // Verifica se duas datas são o mesmo dia
    const isSameDay = (date1, date2) => date1.toDateString() === date2.toDateString();

    // Verifica se a data pertence ao mês atual
    const isCurrentMonth = (date) => date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear();

    // Navega para o mês anterior
    prevMonthBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    // Navega para o próximo mês
    nextMonthBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // Inicializa o calendário já mostrando os agendamentos do dia atual
    renderCalendar();
});


// -------------------- Função de editar tabela ------------------
// Função auxiliar para criar um campo de input
const createInputField = (type, value) => {
    const input = document.createElement("input");
    input.type = type;
    input.value = value;
    input.classList.add("form-control");
    return input;
};

// Função auxiliar para criar um select com opções
const createSelectField = (options, selectedValue) => {
    const select = document.createElement("select");
    options.forEach(optionValue => {
        const option = document.createElement("option");
        option.value = option.textContent = optionValue;
        if (optionValue === selectedValue) {
            option.selected = true;
        }
        select.appendChild(option);
    });
    select.classList.add("form-control");
    return select;
};

// Função que permite editar os campos do agendamento
const editAgendamento = (event, index, date) => {
    const row = event.target.closest("tr"); // Obtém a linha do item da tabela
    const cells = row.querySelectorAll("td"); // Obtém todas as células da linha

    // Mapeamento de campos para edição com tipos de input
    const inputConfig = [
        { index: 0, type: 'time' }, 
        { index: 1, type: 'date' },
        { index: 2, type: 'select', options: ["Consulta", "Exame", "Cirurgia", "Tratamento"] }, 
        { index: 3, type: 'text' }, 
        { index: 4, type: 'select', options: ["Confirmado", "Pendente", "Cancelado"] } 
    ];

    inputConfig.forEach(config => {
        const cell = cells[config.index];
        const currentText = cell.textContent.trim();

        // Armazena o valor original antes de substituir
        cell.setAttribute("data-original", currentText);

        let input;
        if (config.type === 'time') {
            input = createInputField('time', currentText);
        } else if (config.type === 'date') {
            input = createInputField('date', formatDateToInput(currentText));
        } else if (config.type === 'select') {
            input = createSelectField(config.options, currentText);
        } else {
            input = createInputField(config.type, currentText);
        }

        cell.innerHTML = "";  // Limpa o conteúdo da célula
        cell.appendChild(input);  // Adiciona o campo de input
    });

    // Altera o botão para permitir a confirmação da edição
    const actionsCell = row.querySelector(".actions");
    actionsCell.innerHTML = `
        <button class="save-btn"><i class="fas fa-check text-success"></i></button>
        <button class="cancel-btn"><i class="fas fa-times text-danger"></i></button>
    `;

    // Adiciona o comportamento de salvar e cancelar
    row.querySelector(".save-btn").addEventListener("click", () => saveEdits(row, index, date));
    row.querySelector(".cancel-btn").addEventListener("click", () => cancelEdits(row));
};

// Função para salvar as edições feitas
// Função para salvar as edições feitas
const saveEdits = (row, index, date) => {
    const inputs = row.querySelectorAll("input, select");

    // Obtém os valores editados
    const updatedValues = [
        inputs[0].value,  // Horário
        inputs[1].value,  // Data
        inputs[2].value,  // Procedimento
        inputs[3].value,  // Paciente
        inputs[4].value   // Status
    ];

    // Atualiza a célula da tabela com os novos valores
    row.querySelectorAll("td").forEach((cell, i) => {
        if (i < 5) { // Atualiza apenas as 5 primeiras células (evita a de ações)
            if (i === 4) { 
                cell.innerHTML = `<span class="badge bg-warning text-dark">${updatedValues[i]}</span>`; // Formata status como badge
            } else {
                cell.textContent = updatedValues[i];
            }
        }
    });

    // Restaura os botões de ação originais
    row.querySelector(".actions").innerHTML = `
        <button onclick="editAgendamento(event, ${index}, '${date}')"><i class="fas fa-pencil-alt text-warning"></i></button>
        <button><i class="fas fa-trash text-danger"></i></button>
        <button><i class="fas fa-dollar-sign text-success"></i></button>
        <button><i class="fas fa-file-alt text-primary"></i></button>
    `;
};



// Função para cancelar a edição
const cancelEdits = (row) => {
    const cells = row.querySelectorAll("td");

    // Reverte os valores para os originais armazenados
    cells.forEach(cell => {
        const originalValue = cell.getAttribute("data-original");
        if (originalValue !== null) {
            cell.textContent = originalValue;
        }
    });

    // Restaura os botões de ação originais
    row.querySelector(".actions").innerHTML = `
        <button onclick="editAgendamento(event, 0, '')"><i class="fas fa-pencil-alt text-warning"></i></button>
        <button><i class="fas fa-trash text-danger"></i></button>
        <button><i class="fas fa-dollar-sign text-success"></i></button>
        <button><i class="fas fa-file-alt text-primary"></i></button>
    `;
};

// Função auxiliar para formatar a data para o formato aceito pelo input do tipo "date"
const formatDateToInput = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
};
