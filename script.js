// Base de datos de usuarios
const USUARIOS_DB = [
    { user: "27433769", pass: "63864", nombre: "SKIEBACK, Jose Marcelo" },
    { user: "33142786", pass: "74118", nombre: "MAMAN ORFALI, Cristian" },
    { user: "30819237", pass: "88908", nombre: "FAID, Claudia Yamil" },
    { user: "35564716", pass: "102529", nombre: "ORDOÑE, Maria Florencia" },
    { user: "33959981", pass: "109236", nombre: "RABBIA, Romina Soledad" },
    { user: "32559315", pass: "70965", nombre: "PEDERNERA, German Andres" },
    { user: "43207906", pass: "108872", nombre: "CORONEL, Brisa Nerea" },
    { user: "43452851", pass: "109403", nombre: "ROLON, Facundo Nahuel" },
    { user: "43633792", pass: "113099", nombre: "VERA, Ramiro Alejandro" },
    { user: "31846298", pass: "80764", nombre: "MEDRANO, Pablo Martin" },
    { user: "32557567", pass: "72512", nombre: "CABALLERO, Ramon Rodolfo" },
    { user: "40516063", pass: "109419", nombre: "SOTO, Enzo Gaston" }
];

// Configuración de montos
const MONTO_NOV = 40000;
const MONTO_GRAL = 20000;
const FONDO_JULIO = 60000;
const INGRESO_EX_SOCIOS = 40000;
const GASTO_REGALO = 130000;
const GASTO_CENA = 407000;

const MESES = {
    "ENERO": 1, "FEBRERO": 2, "MARZO": 3, "ABRIL": 4, "MAYO": 5, "JUNIO": 6,
    "JULIO": 7, "AGOSTO": 8, "SEPTIEMBRE": 9, "OCTUBRE": 10, "NOVIEMBRE": 11, "DICIEMBRE": 12
};

const socios = [
    { grado: "CTE PR", nombre: "SKIEBACK JOSE MARCELO", nov: true, dic: true, ene: true, cumple: "26 ABRIL 1979" },
    { grado: "2DO CTE", nombre: "MAMAN ORFALI CRISTIAN", nov: true, dic: true, ene: true, cumple: "14 JUNIO 1987" },
    { grado: "2DO CTE", nombre: "FAIAD CLAUDIA YAMIL", nov: true, dic: true, ene: true, cumple: "05 MARZO 1984" },
    { grado: "2DO CTE", nombre: "ORDOÑEZ MARÍA FLORENCIA", nov: true, dic: true, ene: true, cumple: "13 DICIEMBRE 1990" },
    { grado: "1ER ALF", nombre: "MEDRANO PABLO MARTIN", nov: true, dic: true, ene: false, cumple: "19 MARZO 1986" },
    { grado: "1ER ALF", nombre: "CABALLERO RAMON RODOLFO", nov: false, dic: true, ene: true, cumple: "27 JUNIO 1987" },
    { grado: "1ER ALF", nombre: "RAMIREZ PEDERNERA GERMAN", nov: true, dic: true, ene: true, cumple: "12 SEPTIEMBRE 1986" },
    { grado: "1ER ALF", nombre: "RABBIA ROMINA SOLEDAD", nov: true, dic: true, ene: true, cumple: "01 ABRIL 1989" },
    { grado: "ALF", nombre: "CORONEL BRISA NEREA", nov: true, dic: true, ene: false, cumple: "21 ENERO 2001" },
    { grado: "SUBALF", nombre: "SOTO ENZO GASTON", nov: true, dic: true, ene: false, cumple: "24 AGOSTO 1997" },
    { grado: "SUBALF", nombre: "ROLON FACUNDO NAHUEL", nov: true, dic: true, ene: true, cumple: "26 ABRIL 2001" },
    { grado: "SUBALF", nombre: "VERA RAMIRO ALEJANDRO", nov: false, dic: false, ene: false, cumple: "08 FEBRERO 2002" }
];

document.addEventListener("DOMContentLoaded", () => {
    const cuerpoRendicion = document.getElementById("cuerpo-tabla");
    const cuerpoCumpleanos = document.getElementById("cuerpo-cumpleanos");

    // Renderizado de Rendición Contable
    if (cuerpoRendicion) {
        let tNov = 0, tDic = 0, tEne = 0;
        socios.forEach((s, index) => {
            const n = s.nov ? MONTO_NOV : 0;
            const d = s.dic ? MONTO_GRAL : 0;
            const e = s.ene ? MONTO_GRAL : 0;
            tNov += n; tDic += d; tEne += e;

            cuerpoRendicion.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td><strong>${s.grado}</strong></td>
                    <td>${s.nombre}</td>
                    <td class="text-center ${n > 0 ? 'monto-pos' : ''}">${n === 0 ? "---" : `$${n.toLocaleString('es-AR')}`}</td>
                    <td class="text-center ${d > 0 ? 'monto-pos' : ''}">${d === 0 ? "---" : `$${d.toLocaleString('es-AR')}`}</td>
                    <td class="text-center ${e > 0 ? 'monto-pos' : ''}">${e === 0 ? "---" : `$${e.toLocaleString('es-AR')}`}</td>
                </tr>`;
        });

        const totalAportes = tNov + tDic + tEne;
        const saldoFinal = (totalAportes + FONDO_JULIO + INGRESO_EX_SOCIOS) - (GASTO_REGALO + GASTO_CENA);

        document.getElementById("pie-tabla").innerHTML = `<tr class="row-total-final"><td colspan="3">TOTAL ACUMULADO</td><td colspan="3" class="text-center">$${totalAportes.toLocaleString('es-AR')}</td></tr>`;
        
        document.getElementById("cuerpo-contable").innerHTML = `
            <tr><td>Aportes Socios Activos</td><td class="text-center monto-pos">$${totalAportes.toLocaleString('es-AR')}</td><td>-</td></tr>
            <tr><td>Fondo inicial (Julio 2025)</td><td class="text-center monto-pos">$${FONDO_JULIO.toLocaleString('es-AR')}</td><td>-</td></tr>
            <tr><td>Ex-Socios Casino de SSOO</td><td class="text-center monto-pos">$${INGRESO_EX_SOCIOS.toLocaleString('es-AR')}</td><td>-</td></tr>
            <tr><td>Regalos Cambio de Destino</td><td>-</td><td class="text-center monto-neg">$${GASTO_REGALO.toLocaleString('es-AR')}</td></tr>
            <tr><td>Cena Camaradería</td><td>-</td><td class="text-center monto-neg">$${GASTO_CENA.toLocaleString('es-AR')}</td></tr>`;
        
        document.getElementById("pie-contable").innerHTML = `<tr class="row-total-final"><td>SALDO FINAL (NETO)</td><td colspan="2" class="text-center">$${saldoFinal.toLocaleString('es-AR')}</td></tr>`;
        
        if (typeof Chart !== 'undefined') renderChart([tNov, tDic, tEne]);
    }

    // Renderizado de Cumpleaños
    if (cuerpoCumpleanos) {
        const sociosOrdenados = [...socios].sort((a, b) => {
            const partesA = a.cumple.split(" ");
            const partesB = b.cumple.split(" ");
            const mesA = MESES[partesA[1].toUpperCase()];
            const mesB = MESES[partesB[1].toUpperCase()];
            if (mesA !== mesB) return mesA - mesB;
            return parseInt(partesA[0]) - parseInt(partesB[0]);
        });

        sociosOrdenados.forEach((s, index) => {
            cuerpoCumpleanos.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td><strong>${s.grado}</strong></td>
                    <td>${s.nombre}</td>
                    <td class="text-center" style="color: #64748b; font-weight: 500;">${s.cumple}</td>
                </tr>`;
        });
    }
});

// --- Funciones Globales ---
function validarAcceso() {
    const userIn = document.getElementById('user-input').value.trim();
    const passIn = document.getElementById('pass-input').value.trim();
    const errorMsg = document.getElementById('error-msg');
    const usuarioEncontrado = USUARIOS_DB.find(u => u.user === userIn && u.pass === passIn);

    if (usuarioEncontrado) {
        localStorage.setItem('sesionActiva', usuarioEncontrado.nombre);
        window.location.href = 'dashboard.html';
    } else {
        errorMsg.style.display = 'block';
    }
}

function cerrarSesion() {
    localStorage.removeItem('sesionActiva');
    const modal = document.getElementById('modalCierre');
    if (modal) {
        modal.style.display = 'flex';
        modal.style.opacity = "1";
        setTimeout(() => { window.location.href = 'index.html'; }, 2500);
    } else {
        window.location.href = 'index.html';
    }
}

function abrirModal() {
    const modal = document.getElementById("modalGrafico");
    modal.style.display = "flex";
    setTimeout(() => modal.style.opacity = "1", 10);
}

function cerrarModal() {
    const modal = document.getElementById("modalGrafico");
    modal.style.opacity = "0";
    setTimeout(() => modal.style.display = "none", 400);
}

function abrirModalTransf() {
    const modal = document.getElementById("modalTransf");
    modal.style.display = "flex";
    setTimeout(() => modal.style.opacity = "1", 10);
}

function cerrarModalTransf() {
    const modal = document.getElementById("modalTransf");
    modal.style.opacity = "0";
    setTimeout(() => modal.style.display = "none", 400);
}

function toggleMenu() { document.getElementById('sidebar').classList.toggle('active'); }

function renderChart(data) {
    const canvas = document.getElementById('aportesChart');
    if (!canvas) return;
    new Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Oct/Nov', 'Diciembre', 'Enero'],
            datasets: [{ label: 'Ingresos $', data: data, backgroundColor: '#1b4332' }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}
// Configuración de Seguridad
const ADMIN_KEY = "122023";

function abrirModalAdmin() {
    document.getElementById('modalAdminAuth').style.display = 'flex';
    document.getElementById('admin-pass').value = '';
}

function cerrarModalAdmin() {
    document.getElementById('modalAdminAuth').style.display = 'none';
}

function verificarAdmin() {
    const pass = document.getElementById('admin-pass').value;
    if (pass === ADMIN_KEY) {
        cerrarModalAdmin();
        document.getElementById('panelControlAdmin').style.display = 'flex';
    } else {
        alert("❌ Clave incorrecta");
    }
}

function cerrarPanelAdmin() {
    document.getElementById('panelControlAdmin').style.display = 'none';
}

// Funciones de Manipulación de Planilla
function activarEdicion() {
    // Hace que todas las celdas de las tablas sean editables
    const tablas = document.querySelectorAll('.data-table');
    tablas.forEach(tabla => {
        tabla.contentEditable = "true";
        tabla.style.border = "2px dashed var(--verde-claro)";
    });
    alert("📝 Modo edición activado. Puede escribir directamente en las celdas.");
    cerrarPanelAdmin();
}

function agregarFila() {
    const tablaActiva = document.querySelector('.data-table'); // Selecciona la primera visible
    const newRow = tablaActiva.insertRow(-1);
    const colCount = tablaActiva.rows[0].cells.length;
    for(let i=0; i<colCount; i++) {
        let cell = newRow.insertCell(i);
        cell.innerHTML = "-";
    }
}

function agregarColumna() {
    const tablas = document.querySelectorAll('.data-table');
    tablas.forEach(tabla => {
        for (let i = 0; i < tabla.rows.length; i++) {
            let cell = tabla.rows[i].insertCell(-1);
            cell.innerHTML = i === 0 ? "Nueva Col" : "-";
        }
    });
}

function borrarFila() {
    const tablaActiva = document.querySelector('.data-table');
    if (tablaActiva.rows.length > 2) { // Evita borrar el encabezado
        tablaActiva.deleteRow(-1);
    }
}

function guardarCambios() {
    const tablas = document.querySelectorAll('.data-table');
    tablas.forEach(tabla => {
        tabla.contentEditable = "false";
        tabla.style.border = "none";
    });
    
    // Aquí podrías agregar la lógica para enviar a Firebase/LocalStorage
    alert("✅ Cambios guardados localmente");
    cerrarPanelAdmin();
}
// Funciones de Control del Panel Admin
function abrirPanelAdmin() {
    document.getElementById('modalAdmin').style.display = 'flex';
}

function cerrarPanelAdmin() {
    document.getElementById('modalAdmin').style.display = 'none';
}

function activarEdicion() {
    const tablas = document.querySelectorAll('.data-table');
    tablas.forEach(tabla => {
        tabla.contentEditable = "true";
        tabla.style.border = "2px dashed var(--verde-claro)";
    });
    alert("📝 Modo edición activado. Puede escribir directamente en las celdas.");
    cerrarPanelAdmin();
}

function agregarFila() {
    const tabla = document.querySelector('.data-table');
    if (!tabla) return;
    const newRow = tabla.insertRow(-1);
    const colCount = tabla.rows[0].cells.length;
    for(let i=0; i<colCount; i++) {
        let cell = newRow.insertCell(i);
        cell.innerHTML = "-";
    }
}

function borrarFila() {
    const tabla = document.querySelector('.data-table');
    if (tabla && tabla.rows.length > 2) { 
        tabla.deleteRow(-1);
    }
}

function agregarColumna() {
    const tabla = document.querySelector('.data-table');
    if (!tabla) return;
    for (let i = 0; i < tabla.rows.length; i++) {
        let cell = tabla.rows[i].insertCell(-1);
        cell.innerHTML = i === 0 ? "Nueva Col" : "-";
    }
}

function guardarCambios() {
    const tablas = document.querySelectorAll('.data-table');
    tablas.forEach(tabla => {
        tabla.contentEditable = "false";
        tabla.style.border = "none";
    });
    // Aquí podrías agregar la lógica para persistir en LocalStorage o base de datos
    alert("✅ Cambios guardados localmente.");
    cerrarPanelAdmin();
}
function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    } else {
        // Si no existe sidebar (como en el index), podrías redirigir o ignorar
        console.log("Menú lateral no encontrado en esta página.");
    }
}

// Función para cerrar sesión (usada en tus archivos)
function cerrarSesion() {
    const modal = document.getElementById('modalCierre');
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }
}
// Funciones para el Administrador
function abrirPanelAdmin() {
    document.getElementById('modalAdmin').style.display = 'flex';
    document.getElementById('admin-pass').focus();
}

function cerrarPanelAdmin() {
    document.getElementById('modalAdmin').style.display = 'none';
    document.getElementById('admin-pass').value = '';
}

function verificarAdmin() {
    const pass = document.getElementById('admin-pass').value;
    
    // AQUÍ DEFINES TU CLAVE DE ADMINISTRADOR
    if (pass === "1234") { 
        cerrarPanelAdmin();
        document.getElementById('panelAccionesAdmin').style.display = 'flex';
        alert("✅ Acceso concedido. Panel de herramientas activado.");
    } else {
        alert("❌ Clave incorrecta");
    }
}

// Esta función hará que las tablas sean editables al hacer clic en "Editar"
function activarEdicion() {
    const tablas = document.querySelectorAll('.data-table');
    tablas.forEach(tabla => {
        tabla.contentEditable = "true";
        tabla.style.border = "2px dashed var(--verde-claro)";
    });
    alert("📝 Modo edición activado. Puede escribir directamente en las celdas.");
}

function guardarCambios() {
    const tablas = document.querySelectorAll('.data-table');
    tablas.forEach(tabla => {
        tabla.contentEditable = "false";
        tabla.style.border = "none";
    });
    alert("💾 Cambios guardados localmente (Para cambios permanentes se requiere base de datos).");
    document.getElementById('panelAccionesAdmin').style.display = 'none';
}