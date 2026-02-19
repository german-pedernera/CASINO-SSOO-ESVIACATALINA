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

const MONTO_NOV = 40000;
const MONTO_GRAL = 20000;
const FONDO_JULIO = 60000;
const INGRESO_EX_SOCIOS = 40000;
const GASTO_REGALO = 130000;
const GASTO_CENA = 407000;

const MESES = { "ENERO": 1, "FEBRERO": 2, "MARZO": 3, "ABRIL": 4, "MAYO": 5, "JUNIO": 6, "JULIO": 7, "AGOSTO": 8, "SEPTIEMBRE": 9, "OCTUBRE": 10, "NOVIEMBRE": 11, "DICIEMBRE": 12 };

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

    if (cuerpoRendicion) {
        let tNov = 0, tDic = 0, tEne = 0;
        socios.forEach((s, index) => {
            const n = s.nov ? MONTO_NOV : 0;
            const d = s.dic ? MONTO_GRAL : 0;
            const e = s.ene ? MONTO_GRAL : 0;
            tNov += n; tDic += d; tEne += e;
            cuerpoRendicion.innerHTML += `<tr><td>${index+1}</td><td>${s.grado}</td><td>${s.nombre}</td><td class="text-center monto-pos">${n > 0 ? '$'+n.toLocaleString() : '---'}</td><td class="text-center monto-pos">${d > 0 ? '$'+d.toLocaleString() : '---'}</td><td class="text-center monto-pos">${e > 0 ? '$'+e.toLocaleString() : '---'}</td></tr>`;
        });
        const totalAportes = tNov + tDic + tEne;
        const saldoFinal = (totalAportes + FONDO_JULIO + INGRESO_EX_SOCIOS) - (GASTO_REGALO + GASTO_CENA);
        document.getElementById("pie-tabla").innerHTML = `<tr style="background:#f1f5f9; font-weight:bold;"><td colspan="3">TOTAL ACUMULADO</td><td colspan="3" class="text-center">$${totalAportes.toLocaleString()}</td></tr>`;
        document.getElementById("balance-caja").innerText = `Saldo: $${saldoFinal.toLocaleString()}`;
        document.getElementById("cuerpo-contable").innerHTML = `
            <tr><td>Aportes Socios Activos</td><td class="text-center monto-pos">$${totalAportes.toLocaleString()}</td><td>-</td></tr>
            <tr><td>Fondo inicial / Ex-Socios</td><td class="text-center monto-pos">$${(FONDO_JULIO+INGRESO_EX_SOCIOS).toLocaleString()}</td><td>-</td></tr>
            <tr><td>Gastos (Cena/Regalos)</td><td>-</td><td class="text-center monto-neg">$${(GASTO_REGALO+GASTO_CENA).toLocaleString()}</td></tr>`;
    }

    if (cuerpoCumpleanos) {
        const ordenados = [...socios].sort((a, b) => {
            const mA = MESES[a.cumple.split(" ")[1]];
            const mB = MESES[b.cumple.split(" ")[1]];
            return mA !== mB ? mA - mB : parseInt(a.cumple) - parseInt(b.cumple);
        });
        ordenados.forEach((s, i) => {
            cuerpoCumpleanos.innerHTML += `<tr><td>${i+1}</td><td>${s.grado}</td><td>${s.nombre}</td><td class="text-center">${s.cumple}</td></tr>`;
        });
    }
});

function validarAcceso() {
    const u = document.getElementById('user-input').value;
    const p = document.getElementById('pass-input').value;
    const found = USUARIOS_DB.find(x => x.user === u && x.pass === p);
    if (found) { window.location.href = 'dashboard.html'; } 
    else { document.getElementById('error-msg').style.display = 'block'; }
}

function validarAccesoAdmin() {
    const p = prompt("Password de Gestión:");
    if (p === "2026") { document.getElementById('modalAdmin').style.display = 'flex'; }
    else { alert("Acceso denegado"); }
}

function cerrarModal(id) { document.getElementById(id).style.display = 'none'; }
function cerrarSesion() { if(confirm("¿Cerrar sesión?")) window.location.href = 'index.html'; }

let miGrafico; // Variable global para controlar la instancia del gráfico

function abrirModalGrafico() {
    const modal = document.getElementById('modalGrafico');
    modal.style.display = 'flex';

    // Esperar un momento a que el DOM se procese para renderizar el gráfico
    setTimeout(() => {
        generarGrafico();
    }, 100);
}

function cerrarModal(id) {
    document.getElementById(id).style.display = 'none';
}

function generarGrafico() {
    const ctx = document.getElementById('aportesChart').getContext('2d');
    
    // Si ya existe un gráfico, lo destruimos para que no se duplique al reabrir
    if (miGrafico) {
        miGrafico.destroy();
    }

    // Ejemplo de obtención de datos desde la tabla de resumen contable
    // Aquí puedes personalizar los nombres según lo que tengas en el HTML
    const ingresos = 50000; // Podrías obtenerlo con: document.getElementById('total-ingresos').innerText
    const egresos = 30000;  // Podrías obtenerlo con: document.getElementById('total-egresos').innerText

    miGrafico = new Chart(ctx, {
        type: 'doughnut', // Tipo de gráfico: circular (donut)
        data: {
            labels: ['Ingresos', 'Egresos'],
            datasets: [{
                data: [ingresos, egresos],
                backgroundColor: ['#2e7d32', '#c62828'], // Verde oscuro y Rojo
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}
let chartCajaInstance = null;
let chartSociosInstance = null;

function abrirModalGrafico() {
    document.getElementById('modalGrafico').style.display = 'flex';
    // Pequeña pausa para asegurar que el DOM esté listo antes de dibujar
    setTimeout(renderizarGraficos, 100);
}

function cerrarModal(id) {
    document.getElementById(id).style.display = 'none';
}

// Función para limpiar strings de moneda y convertirlos a números
function limpiarMoneda(texto) {
    if (!texto) return 0;
    return parseFloat(texto.replace(/[$.]/g, '').replace(',', '.')) || 0;
}

function renderizarGraficos() {
    // 1. EXTRAER DATOS DE RESUMEN DE CAJA
    let totalIngresos = 0;
    let totalEgresos = 0;
    const filasCaja = document.querySelectorAll("#cuerpo-contable tr");
    
    filasCaja.forEach(fila => {
        totalIngresos += limpiarMoneda(fila.cells[1]?.innerText);
        totalEgresos += limpiarMoneda(fila.cells[2]?.innerText);
    });

    // 2. EXTRAER DATOS DE SOCIOS (Aportes por Mes)
    let totalOctNov = 0;
    let totalDic = 0;
    let totalEne = 0;
    const filasSocios = document.querySelectorAll("#cuerpo-tabla tr");

    filasSocios.forEach(fila => {
        totalOctNov += limpiarMoneda(fila.cells[3]?.innerText);
        totalDic += limpiarMoneda(fila.cells[4]?.innerText);
        totalEne += limpiarMoneda(fila.cells[5]?.innerText);
    });

    // --- GRÁFICO 1: RESUMEN DE CAJA (Dona) ---
    const ctxCaja = document.getElementById('chartCaja').getContext('2d');
    if (chartCajaInstance) chartCajaInstance.destroy();
    
    chartCajaInstance = new Chart(ctxCaja, {
        type: 'doughnut',
        data: {
            labels: ['Ingresos', 'Egresos'],
            datasets: [{
                data: [totalIngresos, totalEgresos],
                backgroundColor: ['#2e7d32', '#c62828'], // Verde y Rojo
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } }
        }
    });

    // --- GRÁFICO 2: APORTES SOCIOS (Barras) ---
    const ctxSocios = document.getElementById('chartSocios').getContext('2d');
    if (chartSociosInstance) chartSociosInstance.destroy();

    chartSociosInstance = new Chart(ctxSocios, {
        type: 'bar',
        data: {
            labels: ['Oct/Nov', 'Dic', 'Ene'],
            datasets: [{
                label: 'Total Recaudado $',
                data: [totalOctNov, totalDic, totalEne],
                backgroundColor: '#4caf50',
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            },
            plugins: { legend: { display: false } }
        }
    });
}

// Configuración de Firebase (Asegúrate de tener esto al inicio de tu script.js)
// const db = firebase.database(); 

/**
 * Función para agregar un nuevo socio y guardarlo en Firebase
 */
function agregarFilaSocio() {
    const nombre = prompt("Ingrese el Grado y Nombre del nuevo socio:");
    if (!nombre) return;

    // 1. Obtener referencia a la tabla
    const tabla = document.getElementById('cuerpo-tabla');
    const nuevaFila = tabla.insertRow();
    const nroSocio = tabla.rows.length;

    // 2. Crear el objeto de datos para Firebase
    const nuevoSocio = {
        nro: nroSocio,
        nombre: nombre,
        aportes: {
            oct_nov: 0,
            dic: 0,
            ene: 0
        }
    };

    // 3. Guardar en Firebase en tiempo real
    db.ref('socios/' + nroSocio).set(nuevoSocio)
    .then(() => {
        alert("Socio guardado exitosamente en Firebase");
        renderizarTablaDesdeFirebase(); // Refresca la vista
    })
    .catch((error) => console.error("Error al guardar:", error));
    
    cerrarModal('modalAdmin');
}

/**
 * Función para agregar una nueva columna de mes
 */
function agregarColumnaMes() {
    const mes = prompt("Ingrese el nombre del nuevo mes (Ej: Feb):");
    if (!mes) return;

    // 1. Actualizar el encabezado en el HTML
    const headerRow = document.getElementById('header-row-socios');
    const th = document.createElement('th');
    th.className = "text-center";
    th.innerText = mes;
    headerRow.appendChild(th);

    // 2. Actualizar la estructura en Firebase para que todos los socios tengan ese mes
    db.ref('socios').once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const socioId = childSnapshot.key;
            db.ref(`socios/${socioId}/aportes/${mes.toLowerCase()}`).set(0);
        });
    });

    alert(`Columna de ${mes} añadida y sincronizada.`);
    cerrarModal('modalAdmin');
}

/**
 * Función para escuchar cambios en tiempo real y actualizar la tabla
 */
function sincronizarCambiosTiempoReal() {
    db.ref('socios').on('value', (snapshot) => {
        const data = snapshot.val();
        actualizarInterfaz(data);
    });
}// Variable para controlar si estamos editando
let modoEdicionActivo = false;

function activarModoEdicion() {
    modoEdicionActivo = true;
    const celdas = document.querySelectorAll('#cuerpo-tabla td, #cuerpo-contable td');
    
    celdas.forEach(celda => {
        // Hacemos las celdas editables excepto las de numeración
        if (!celda.classList.contains('no-editable')) {
            celda.contentEditable = "true";
            celda.style.backgroundColor = "#fff9c4"; // Color amarillo suave para indicar edición
            celda.style.border = "1px dashed #f39c12";
        }
    });

    document.getElementById('btnGuardarCambios').style.display = 'block';
    alert("Modo edición activado. Haz clic en cualquier valor de la tabla para modificarlo.");
    cerrarModal('modalAdmin');
}

function guardarCambiosEdicion() {
    // 1. Capturar datos de Socios
    const filasSocios = document.querySelectorAll('#cuerpo-tabla tr');
    let nuevosSocios = [];

    filasSocios.forEach(fila => {
        const celdas = fila.querySelectorAll('td');
        if (celdas.length > 0) {
            let socio = {
                grado: celdas[1].innerText,
                nombre: celdas[2].innerText,
                aportes: []
            };
            
            // Capturar todos los meses dinámicos
            for (let i = 3; i < celdas.length; i++) {
                socio.aportes.push(celdas[i].innerText.replace('$', '').trim());
            }
            nuevosSocios.push(socio);
        }
    });

    // 2. Capturar datos de Caja (Contabilidad)
    const filasCaja = document.querySelectorAll('#cuerpo-contable tr');
    let nuevaCaja = [];

    filasCaja.forEach(fila => {
        const celdas = fila.querySelectorAll('td');
        if (celdas.length > 0) {
            nuevaCaja.push({
                concepto: celdas[0].innerText,
                ingreso: parseFloat(celdas[1].innerText.replace('$', '').trim()) || 0,
                egreso: parseFloat(celdas[2].innerText.replace('$', '').trim()) || 0
            });
        }
    });

    // 3. Guardar en localStorage
    localStorage.setItem('socios', JSON.stringify(nuevosSocios));
    localStorage.setItem('movimientosCaja', JSON.stringify(nuevaCaja));

    // 4. Resetear UI
    modoEdicionActivo = false;
    alert("¡Cambios guardados exitosamente!");
    location.reload(); // Recargamos para refrescar cálculos y gráficos
}

/**
 * Crea una ventana modal personalizada en lugar de un alert tradicional
 * @param {string} titulo - El título de la alerta
 * @param {string} mensaje - El cuerpo del mensaje
 */
function mostrarAlerta(titulo, mensaje) {
    // Crear el contenedor de la modal
    const overlay = document.createElement('div');
    overlay.className = 'custom-alert-overlay';
    overlay.id = 'temp-alert';

    // Construir el contenido
    overlay.innerHTML = `
        <div class="custom-alert-card">
            <h3>${titulo}</h3>
            <p>${mensaje}</p>
            <button onclick="cerrarAlertaPersonalizada()" class="ws-btn" style="background: var(--verde-oscuro); width: 100%;">
                Entendido
            </button>
        </div>
    `;

    // Evitar duplicados
    const existing = document.getElementById('temp-alert');
    if (existing) existing.remove();

    document.body.appendChild(overlay);
}

function cerrarAlertaPersonalizada() {
    const alert = document.getElementById('temp-alert');
    if (alert) alert.remove();
}


function abrirModalGrafico() {
    document.getElementById('modalGrafico').style.display = 'flex';
    setTimeout(renderizarGraficos, 100);
}

function cerrarModal(id) {
    document.getElementById(id).style.display = 'none';
}

function limpiarMoneda(texto) {
    if (!texto || texto === '---') return 0;
    return parseFloat(texto.replace(/[$.]/g, '').replace(',', '.')) || 0;
}

function renderizarGraficos() {
    // 1. DATOS PARA GRÁFICO DE SOCIOS (Aportes totales por mes)
    let totalNov = 0, totalDic = 0, totalEne = 0;
    document.querySelectorAll("#cuerpo-tabla tr").forEach(fila => {
        totalNov += limpiarMoneda(fila.cells[3]?.innerText);
        totalDic += limpiarMoneda(fila.cells[4]?.innerText);
        totalEne += limpiarMoneda(fila.cells[5]?.innerText);
    });

    const ctxSocios = document.getElementById('chartSocios').getContext('2d');
    if (chartSociosInstance) chartSociosInstance.destroy();
    chartSociosInstance = new Chart(ctxSocios, {
        type: 'doughnut',
        data: {
            labels: ['Noviembre', 'Diciembre', 'Enero'],
            datasets: [{
                data: [totalNov, totalDic, totalEne],
                backgroundColor: ['#1b4332', '#2d6a4f', '#40916c'],
                hoverOffset: 10
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
    });

    // 2. DATOS PARA GRÁFICO DE CAJA (Resumen de cuenta)
    let ingresos = 0, egresos = 0;
    document.querySelectorAll("#cuerpo-contable tr").forEach(fila => {
        ingresos += limpiarMoneda(fila.cells[1]?.innerText);
        egresos += limpiarMoneda(fila.cells[2]?.innerText);
    });

    const ctxCaja = document.getElementById('chartCaja').getContext('2d');
    if (chartCajaInstance) chartCajaInstance.destroy();
    chartCajaInstance = new Chart(ctxCaja, {
        type: 'doughnut',
        data: {
            labels: ['Total Ingresos', 'Total Egresos'],
            datasets: [{
                data: [ingresos, egresos],
                backgroundColor: ['#2e7d32', '#c62828'],
                hoverOffset: 10
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
    });
}

// 1. Mejorar la función de agregar columna para permitir edición inmediata
function agregarColumnaMes() {
    const mes = prompt("Ingrese el nombre del nuevo mes (Ej: Febrero):");
    if (!mes) return;

    // Agregar encabezado
    const headerRow = document.getElementById('header-row-socios');
    const th = document.createElement('th');
    th.className = "text-center";
    th.innerText = mes;
    headerRow.appendChild(th);

    // Agregar celdas editables a cada fila de socio
    const filas = document.querySelectorAll("#cuerpo-tabla tr");
    filas.forEach(fila => {
        const nuevaCelda = fila.insertCell();
        nuevaCelda.className = "text-center monto-pos";
        nuevaCelda.innerText = "$0";
        // Si el modo edición ya estaba activo, la hacemos editable de inmediato
        if (modoEdicionActivo) {
            nuevaCelda.contentEditable = "true";
            nuevaCelda.style.backgroundColor = "#fff9c4";
            nuevaCelda.style.border = "1px dashed #f39c12";
        }
    });

    alert(`Columna de ${mes} añadida. Active 'Editar Planilla' para modificar los valores.`);
    cerrarModal('modalAdmin');
}

// 2. Actualizar guardado para capturar columnas dinámicas
function guardarCambiosEdicion() {
    const filasSocios = document.querySelectorAll('#cuerpo-tabla tr');
    let nuevosSocios = [];

    // Capturar encabezados actuales para saber qué meses existen
    const headers = document.querySelectorAll('#header-row-socios th');
    let nombresMeses = [];
    for (let i = 3; i < headers.length; i++) {
        nombresMeses.push(headers[i].innerText);
    }

    filasSocios.forEach(fila => {
        const celdas = fila.querySelectorAll('td');
        if (celdas.length > 0) {
            let socio = {
                nro: celdas[0].innerText,
                grado: celdas[1].innerText,
                nombre: celdas[2].innerText,
                aportes: {}
            };
            
            // Guardar cada mes dinámicamente en el objeto aportes
            nombresMeses.forEach((mes, index) => {
                socio.aportes[mes] = celdas[index + 3].innerText.replace('$', '').trim();
            });
            nuevosSocios.push(socio);
        }
    });

    // Guardar en LocalStorage (y podrías enviarlo a Firebase aquí)
    localStorage.setItem('socios_data_completa', JSON.stringify(nuevosSocios));
    
    // Guardar también la estructura de meses para reconstruir la tabla al recargar
    localStorage.setItem('columnas_meses', JSON.stringify(nombresMeses));

    modoEdicionActivo = false;
    alert("¡Todos los cambios y la nueva estructura han sido guardados!");
    location.reload(); 
}

// --- VARIABLES GLOBALES Y CARGA INICIAL ---


document.addEventListener('DOMContentLoaded', () => {
    cargarTablaSocios();
    cargarTablaContable(); // Esto mantendrá los movimientos como estaban
});

// --- GESTIÓN DE SOCIOS Y COLUMNAS ---

function cargarTablaSocios() {
    const cuerpo = document.getElementById('cuerpo-tabla');
    const headerRow = document.getElementById('header-row-socios');
    
    // 1. Recuperar meses guardados (o usar los por defecto)
    let meses = JSON.parse(localStorage.getItem('columnas_meses')) || ["Noviembre", "Diciembre", "Enero"];
    
    // Limpiar y reconstruir headers básicos
    headerRow.innerHTML = `<th>Nro</th><th>Grado</th><th>Nombre</th>`;
    meses.forEach(mes => {
        const th = document.createElement('th');
        th.className = "text-center";
        th.innerText = mes;
        headerRow.appendChild(th);
    });

    // 2. Recuperar datos de socios
    const datosSocios = JSON.parse(localStorage.getItem('socios_data_completa')) || [
        { nro: "1", grado: "Cte My", nombre: "SKIEBACK, Jose Marcelo", aportes: { "Noviembre": "0", "Diciembre": "0", "Enero": "0" } },
        // ... puedes dejar tus datos iniciales aquí
    ];

    cuerpo.innerHTML = "";
    datosSocios.forEach(socio => {
        const fila = document.createElement('tr');
        let htmlFila = `<td>${socio.nro}</td><td>${socio.grado}</td><td>${socio.nombre}</td>`;
        
        // Generar celdas según los meses actuales
        meses.forEach(mes => {
            const valor = socio.aportes[mes] || "0";
            htmlFila += `<td class="text-center monto-pos" ${modoEdicionActivo ? 'contenteditable="true" style="background:#fff9c4"' : ''}>$${valor}</td>`;
        });
        
        fila.innerHTML = htmlFila;
        cuerpo.appendChild(fila);
    });
}

function agregarColumnaMes() {
    const mes = prompt("Ingrese el nombre del nuevo mes:");
    if (!mes) return;

    // Obtener meses actuales y agregar el nuevo
    let meses = JSON.parse(localStorage.getItem('columnas_meses')) || ["Noviembre", "Diciembre", "Enero"];
    if (!meses.includes(mes)) {
        meses.push(mes);
        localStorage.setItem('columnas_meses', JSON.stringify(meses));
        
        // Recargar tabla para mostrar la nueva columna
        cargarTablaSocios();
        alert(`Columna ${mes} agregada. Ahora puede editar y guardar.`);
    }
    cerrarModal('modalAdmin');
}

function activarModoEdicion() {
    modoEdicionActivo = true;
    document.getElementById('btnGuardarCambios').style.display = 'block';
    cargarTablaSocios(); // Recarga la tabla habilitando contenteditable
}

function guardarCambiosEdicion() {
    const filas = document.querySelectorAll('#cuerpo-tabla tr');
    const headers = document.querySelectorAll('#header-row-socios th');
    let meses = [];
    for (let i = 3; i < headers.length; i++) {
        meses.push(headers[i].innerText);
    }

    let nuevosDatos = [];
    filas.forEach(fila => {
        const celdas = fila.querySelectorAll('td');
        let socio = {
            nro: celdas[0].innerText,
            grado: celdas[1].innerText,
            nombre: celdas[2].innerText,
            aportes: {}
        };
        
        meses.forEach((mes, index) => {
            // Guardamos solo el número, quitando el signo $
            socio.aportes[mes] = celdas[index + 3].innerText.replace('$', '').trim();
        });
        nuevosDatos.push(socio);
    });

    localStorage.setItem('socios_data_completa', JSON.stringify(nuevosDatos));
    localStorage.setItem('columnas_meses', JSON.stringify(meses));

    modoEdicionActivo = false;
    document.getElementById('btnGuardarCambios').style.display = 'none';
    alert("Planilla actualizada y guardada correctamente.");
    cargarTablaSocios(); 
}

// --- MOVIMIENTOS CONTABLES (Se mantiene igual para no modificar detalles) ---
function cargarTablaContable() {
    const cuerpo = document.getElementById('cuerpo-contable');
    // Aquí va tu lógica actual de movimientos...
    // Si usas datos estáticos o de Firebase, asegúrate de que se llamen aquí.
}

// --- FUNCIONES DE MODAL ---
function abrirModalGrafico() {
    document.getElementById('modalGrafico').style.display = 'flex';
    generarGraficos();
}

function cerrarModal(id) {
    document.getElementById(id).style.display = 'none';
}



document.addEventListener('DOMContentLoaded', () => {
    cargarTablaSocios();
});

// --- GESTIÓN DE TABLA DE SOCIOS ---

function cargarTablaSocios() {
    const cuerpo = document.getElementById('cuerpo-tabla');
    const headerRow = document.getElementById('header-row-socios');
    
    // Recuperar meses o usar valores por defecto
    let meses = JSON.parse(localStorage.getItem('columnas_meses')) || ["Noviembre", "Diciembre", "Enero"];
    
    // Reconstruir encabezados
    headerRow.innerHTML = `<th>Nro</th><th>Grado</th><th>Nombre</th>`;
    meses.forEach(mes => {
        const th = document.createElement('th');
        th.className = "text-center";
        th.innerText = mes;
        headerRow.appendChild(th);
    });

    // Recuperar datos de socios o usar iniciales
    const datosSocios = JSON.parse(localStorage.getItem('socios_data_completa')) || [
        { nro: "1", grado: "CTE PR", nombre: "SKIEBACK JOSE MARCELO", aportes: { "Noviembre": "40000", "Diciembre": "20000", "Enero": "20000" } }
    ];

    cuerpo.innerHTML = "";
    datosSocios.forEach((socio, index) => {
        const fila = document.createElement('tr');
        // El número se recalcula según el índice actual para mantener orden
        let htmlFila = `<td>${index + 1}</td><td>${socio.grado}</td><td>${socio.nombre}</td>`;
        
        meses.forEach(mes => {
            const valor = socio.aportes[mes] || "0";
            htmlFila += `<td class="text-center monto-pos" ${modoEdicionActivo ? 'contenteditable="true" style="background:#fff9c4"' : ''}>$${valor}</td>`;
        });
        
        fila.innerHTML = htmlFila;
        cuerpo.appendChild(fila);
    });
}

// --- FUNCIONES DE ELIMINACIÓN ---

function menuEliminar() {
    const opcion = prompt("¿Qué desea eliminar?\n1. Eliminar un Socio (Fila específica)\n2. Eliminar última Columna (Mes)");
    
    if (opcion === "1") {
        eliminarSocioPorNumero();
    } else if (opcion === "2") {
        eliminarUltimaColumna();
    }
}

function eliminarSocioPorNumero() {
    let datos = JSON.parse(localStorage.getItem('socios_data_completa')) || [];
    if (datos.length === 0) return alert("No hay socios para eliminar.");

    const lista = datos.map((s, i) => `${i+1}. ${s.nombre}`).join('\n');
    const num = prompt(`Ingrese el número del socio a eliminar:\n${lista}`);
    const index = parseInt(num) - 1;

    if (datos[index]) {
        if (confirm(`¿Eliminar a ${datos[index].nombre}?`)) {
            datos.splice(index, 1);
            localStorage.setItem('socios_data_completa', JSON.stringify(datos));
            location.reload();
        }
    } else {
        alert("Número inválido.");
    }
}

function eliminarUltimaColumna() {
    let meses = JSON.parse(localStorage.getItem('columnas_meses')) || ["Noviembre", "Diciembre", "Enero"];
    if (meses.length <= 1) return alert("Debe quedar al menos una columna.");

    const ultimoMes = meses[meses.length - 1];
    if (confirm(`¿Eliminar la columna de ${ultimoMes}?`)) {
        meses.pop();
        localStorage.setItem('columnas_meses', JSON.stringify(meses));

        let datos = JSON.parse(localStorage.getItem('socios_data_completa'));
        if (datos) {
            datos.forEach(s => delete s.aportes[ultimoMes]);
            localStorage.setItem('socios_data_completa', JSON.stringify(datos));
        }
        location.reload();
    }
}

// --- GESTIÓN DE MODALES Y EDICIÓN ---

function agregarFilaSocio() {
    const grado = prompt("Grado:");
    const nombre = prompt("Nombre completo:");
    if (!grado || !nombre) return;

    let datos = JSON.parse(localStorage.getItem('socios_data_completa')) || [];
    let meses = JSON.parse(localStorage.getItem('columnas_meses')) || ["Noviembre", "Diciembre", "Enero"];
    
    let nuevoSocio = { nro: (datos.length + 1).toString(), grado: grado, nombre: nombre, aportes: {} };
    meses.forEach(m => nuevoSocio.aportes[m] = "0");

    datos.push(nuevoSocio);
    localStorage.setItem('socios_data_completa', JSON.stringify(datos));
    location.reload();
}

function agregarColumnaMes() {
    const mes = prompt("Nombre del nuevo mes:");
    if (!mes) return;

    let meses = JSON.parse(localStorage.getItem('columnas_meses')) || ["Noviembre", "Diciembre", "Enero"];
    if (!meses.includes(mes)) {
        meses.push(mes);
        localStorage.setItem('columnas_meses', JSON.stringify(meses));
        location.reload();
    }
}

function activarModoEdicion() {
    modoEdicionActivo = true;
    document.getElementById('btnGuardarCambios').style.display = 'block';
    cargarTablaSocios();
    cerrarModal('modalAdmin');
}

function guardarCambiosEdicion() {
    const filas = document.querySelectorAll('#cuerpo-tabla tr');
    const headers = document.querySelectorAll('#header-row-socios th');
    let meses = [];
    for (let i = 3; i < headers.length; i++) meses.push(headers[i].innerText);

    let nuevosDatos = [];
    filas.forEach(fila => {
        const celdas = fila.querySelectorAll('td');
        let socio = { nro: celdas[0].innerText, grado: celdas[1].innerText, nombre: celdas[2].innerText, aportes: {} };
        meses.forEach((m, i) => socio.aportes[m] = celdas[i + 3].innerText.replace('$', '').trim());
        nuevosDatos.push(socio);
    });

    localStorage.setItem('socios_data_completa', JSON.stringify(nuevosDatos));
    modoEdicionActivo = false;
    location.reload();
}

function validarAccesoAdmin() {
    if (prompt("Password de Gestión:") === "2026") {
        document.getElementById('modalAdmin').style.display = 'flex';
    } else {
        alert("Acceso denegado");
    }
}

function cerrarModal(id) { document.getElementById(id).style.display = 'none'; }
function cerrarSesion() { if(confirm("¿Cerrar sesión?")) window.location.href = 'index.html'; }


document.addEventListener('DOMContentLoaded', () => {
    cargarTablaSocios();
});

// --- CARGA DE DATOS ---

function cargarTablaSocios() {
    const cuerpo = document.getElementById('cuerpo-tabla');
    const headerRow = document.getElementById('header-row-socios');
    
    let meses = JSON.parse(localStorage.getItem('columnas_meses')) || ["Noviembre", "Diciembre", "Enero"];
    
    headerRow.innerHTML = `<th>Nro</th><th>Grado</th><th>Nombre</th>`;
    meses.forEach(mes => {
        const th = document.createElement('th');
        th.className = "text-center";
        th.innerText = mes;
        headerRow.appendChild(th);
    });

    const datosSocios = JSON.parse(localStorage.getItem('socios_data_completa')) || [
        { grado: "CTE PR", nombre: "SKIEBACK JOSE MARCELO", aportes: { "Noviembre": "40000", "Diciembre": "20000", "Enero": "20000" } }
    ];

    cuerpo.innerHTML = "";
    datosSocios.forEach((socio, index) => {
        const fila = document.createElement('tr');
        let htmlFila = `<td>${index + 1}</td><td>${socio.grado}</td><td>${socio.nombre}</td>`;
        
        meses.forEach(mes => {
            const valor = socio.aportes[mes] || "0";
            htmlFila += `<td class="text-center monto-pos" ${modoEdicionActivo ? 'contenteditable="true" style="background:#fff9c4"' : ''}>$${valor}</td>`;
        });
        
        fila.innerHTML = htmlFila;
        cuerpo.appendChild(fila);
    });
}

// --- FUNCIONES DE ELIMINACIÓN ---

function menuEliminar() {
    const opcion = prompt("¿Qué desea eliminar?\n1. Eliminar un Socio (Fila específica)\n2. Eliminar última Columna (Mes)");
    
    if (opcion === "1") {
        eliminarSocioPorNumero();
    } else if (opcion === "2") {
        eliminarUltimaColumna();
    }
}

function eliminarSocioPorNumero() {
    let datos = JSON.parse(localStorage.getItem('socios_data_completa')) || [];
    if (datos.length === 0) return alert("No hay socios para eliminar.");

    const lista = datos.map((s, i) => `${i+1}. ${s.nombre}`).join('\n');
    const num = prompt(`Ingrese el número del socio a eliminar:\n${lista}`);
    const index = parseInt(num) - 1;

    if (datos[index]) {
        if (confirm(`¿Está seguro de eliminar a ${datos[index].nombre}?`)) {
            datos.splice(index, 1);
            localStorage.setItem('socios_data_completa', JSON.stringify(datos));
            location.reload();
        }
    } else if (num !== null) {
        alert("Número inválido.");
    }
}

function eliminarUltimaColumna() {
    let meses = JSON.parse(localStorage.getItem('columnas_meses')) || ["Noviembre", "Diciembre", "Enero"];
    if (meses.length <= 1) return alert("Debe quedar al menos una columna de aportes.");

    const ultimoMes = meses[meses.length - 1];
    if (confirm(`¿Está seguro de eliminar la columna de ${ultimoMes}?`)) {
        meses.pop();
        localStorage.setItem('columnas_meses', JSON.stringify(meses));

        let datos = JSON.parse(localStorage.getItem('socios_data_completa'));
        if (datos) {
            datos.forEach(s => delete s.aportes[ultimoMes]);
            localStorage.setItem('socios_data_completa', JSON.stringify(datos));
        }
        location.reload();
    }
}

// --- GESTIÓN DE PLANILLA ---

function agregarFilaSocio() {
    const grado = prompt("Ingrese el Grado:");
    const nombre = prompt("Ingrese Nombre completo:");
    if (!grado || !nombre) return;

    let datos = JSON.parse(localStorage.getItem('socios_data_completa')) || [];
    let meses = JSON.parse(localStorage.getItem('columnas_meses')) || ["Noviembre", "Diciembre", "Enero"];
    
    let nuevoSocio = { grado: grado, nombre: nombre, aportes: {} };
    meses.forEach(m => nuevoSocio.aportes[m] = "0");

    datos.push(nuevoSocio);
    localStorage.setItem('socios_data_completa', JSON.stringify(datos));
    location.reload();
}

function agregarColumnaMes() {
    const mes = prompt("Nombre del nuevo mes (Ej: Febrero):");
    if (!mes) return;

    let meses = JSON.parse(localStorage.getItem('columnas_meses')) || ["Noviembre", "Diciembre", "Enero"];
    if (!meses.includes(mes)) {
        meses.push(mes);
        localStorage.setItem('columnas_meses', JSON.stringify(meses));
        location.reload();
    }
}

function activarModoEdicion() {
    modoEdicionActivo = true;
    document.getElementById('btnGuardarCambios').style.display = 'block';
    cargarTablaSocios();
    cerrarModal('modalAdmin');
}

function guardarCambiosEdicion() {
    const filas = document.querySelectorAll('#cuerpo-tabla tr');
    const headers = document.querySelectorAll('#header-row-socios th');
    let meses = [];
    for (let i = 3; i < headers.length; i++) meses.push(headers[i].innerText);

    let nuevosDatos = [];
    filas.forEach(fila => {
        const celdas = fila.querySelectorAll('td');
        let socio = { grado: celdas[1].innerText, nombre: celdas[2].innerText, aportes: {} };
        meses.forEach((m, i) => socio.aportes[m] = celdas[i + 3].innerText.replace('$', '').trim());
        nuevosDatos.push(socio);
    });

    localStorage.setItem('socios_data_completa', JSON.stringify(nuevosDatos));
    location.reload();
}

function validarAccesoAdmin() {
    if (prompt("Password de Gestión:") === "2026") {
        document.getElementById('modalAdmin').style.display = 'flex';
    } else {
        alert("Acceso denegado");
    }
}

function cerrarModal(id) { document.getElementById(id).style.display = 'none'; }
function cerrarSesion() { if(confirm("¿Cerrar sesión?")) window.location.href = 'index.html'; }

// --- FUNCIONES PARA LIBRO DE CAJA ---

function agregarFilaCaja() {
    const detalle = prompt("Ingrese el detalle del movimiento:");
    if (!detalle) return;

    let movimientos = JSON.parse(localStorage.getItem('movimientosCaja')) || [
        { concepto: "Aportes Socios Activos", ingreso: 0, egreso: 0 },
        { concepto: "Fondo inicial / Ex-Socios", ingreso: 100000, egreso: 0 },
        { concepto: "Gastos (Cena/Regalos)", ingreso: 0, egreso: 537000 }
    ];

    movimientos.push({ concepto: detalle, ingreso: 0, egreso: 0 });
    localStorage.setItem('movimientosCaja', JSON.stringify(movimientos));
    actualizarVistaCompleta();
    cerrarModal('modalAdmin');
}

// --- CÁLCULO DE TOTALES ---

function calcularTotales() {
    // Totales Socios
    const filasSocios = document.querySelectorAll("#cuerpo-tabla tr");
    const numColumnas = document.querySelectorAll("#header-row-socios th").length;
    let sumaMeses = Array(numColumnas - 3).fill(0);

    filasSocios.forEach(fila => {
        for (let i = 3; i < numColumnas; i++) {
            sumaMeses[i-3] += limpiarMoneda(fila.cells[i]?.innerText);
        }
    });

    let htmlPieSocios = `<tr><td colspan="3" class="text-right">TOTALES:</td>`;
    sumaMeses.forEach(total => {
        htmlPieSocios += `<td class="text-center monto-pos">$${total.toLocaleString()}</td>`;
    });
    htmlPieSocios += `</tr>`;
    document.getElementById("pie-socios").innerHTML = htmlPieSocios;

    // Totales Caja
    const filasCaja = document.querySelectorAll("#cuerpo-contable tr");
    let tIngreso = 0, tEgreso = 0;

    filasCaja.forEach(fila => {
        tIngreso += limpiarMoneda(fila.cells[1]?.innerText);
        tEgreso += limpiarMoneda(fila.cells[2]?.innerText);
    });

    document.getElementById("pie-contable").innerHTML = `
        <tr>
            <td>TOTAL ACUMULADO</td>
            <td class="text-center monto-pos">$${tIngreso.toLocaleString()}</td>
            <td class="text-center monto-neg">$${tEgreso.toLocaleString()}</td>
            <td class="text-center" style="color: blue;">$${(tIngreso - tEgreso).toLocaleString()}</td>
        </tr>`;
}

// --- ACTUALIZACIÓN DE GRÁFICOS ---

function renderizarGraficos() {
    const ctxCaja = document.getElementById('chartCaja').getContext('2d');
    const ctxSocios = document.getElementById('chartSocios').getContext('2d');

    // Datos de Caja
    let ingresos = 0, egresos = 0;
    document.querySelectorAll("#cuerpo-contable tr").forEach(f => {
        ingresos += limpiarMoneda(f.cells[1]?.innerText);
        egresos += limpiarMoneda(f.cells[2]?.innerText);
    });

    if (window.chartCajaInstance) window.chartCajaInstance.destroy();
    window.chartCajaInstance = new Chart(ctxCaja, {
        type: 'bar',
        data: {
            labels: ['Ingresos Totales', 'Egresos Totales'],
            datasets: [{
                label: 'Pesos ($)',
                data: [ingresos, egresos],
                backgroundColor: ['#2e7d32', '#c62828']
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    // Datos de Socios por Mes
    const headers = document.querySelectorAll("#header-row-socios th");
    let etiquetasMeses = [];
    for (let i = 3; i < headers.length; i++) etiquetasMeses.push(headers[i].innerText);
    
    let datosAportes = etiquetasMeses.map((_, i) => {
        let suma = 0;
        document.querySelectorAll("#cuerpo-tabla tr").forEach(f => {
            suma += limpiarMoneda(f.cells[i + 3]?.innerText);
        });
        return suma;
    });

    if (window.chartSociosInstance) window.chartSociosInstance.destroy();
    window.chartSociosInstance = new Chart(ctxSocios, {
        type: 'line',
        data: {
            labels: etiquetasMeses,
            datasets: [{
                label: 'Recaudación Mensual',
                data: datosAportes,
                borderColor: '#40916c',
                fill: true,
                backgroundColor: 'rgba(64, 145, 108, 0.1)'
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

// Modificar el DOMContentLoaded para llamar a los totales
document.addEventListener('DOMContentLoaded', () => {
    cargarTablaSocios();
    cargarTablaContable();
    setTimeout(calcularTotales, 500); // Espera a que carguen los datos
});

// --- GESTIÓN LIBRO DE CAJA (Botones Gestión) ---

/**
 * Función para el botón "Agregar Fila" de la sección Gestión Libro de Caja
 */
function agregarFilaCaja() {
    const detalle = prompt("Ingrese el detalle o concepto del nuevo movimiento:");
    if (!detalle) return;

    // 1. Obtener los movimientos actuales de localStorage o iniciales
    let movimientos = JSON.parse(localStorage.getItem('movimientosCaja')) || [
        { concepto: "Aportes Socios Activos", ingreso: 0, egreso: 0 },
        { concepto: "Fondo inicial / Ex-Socios", ingreso: 100000, egreso: 0 },
        { concepto: "Gastos (Cena/Regalos)", ingreso: 0, egreso: 537000 }
    ];

    // 2. Añadir el nuevo movimiento con valores en cero
    movimientos.push({ concepto: detalle, ingreso: 0, egreso: 0 });

    // 3. Guardar y refrescar
    localStorage.setItem('movimientosCaja', JSON.stringify(movimientos));
    alert("Fila agregada al Libro de Caja. Use el botón 'Editar / Eliminar' para ingresar los montos.");
    location.reload(); 
}

/**
 * Función para el botón "Editar / Eliminar" de la sección Gestión Libro de Caja
 */
function activarModoEdicionCaja() {
    modoEdicionActivo = true;
    
    // Seleccionamos específicamente las celdas del cuerpo contable
    const celdasCaja = document.querySelectorAll('#cuerpo-contable td');
    
    celdasCaja.forEach(celda => {
        celda.contentEditable = "true";
        celda.style.backgroundColor = "#e3f2fd"; // Azul claro para distinguir del modo edición de socios
        celda.style.border = "1px dashed #2980b9";
    });

    // Mostrar botón de guardar si existe en el dashboard
    const btnGuardar = document.getElementById('btnGuardarCambios');
    if (btnGuardar) btnGuardar.style.display = 'block';

    alert("Modo edición de CAJA activado. Modifique los conceptos o montos directamente y luego presione 'Guardar Cambios'.");
    cerrarModal('modalAdmin');
}

/**
 * Nota: Asegúrate de que tu función guardarCambiosEdicion() 
 * incluya la captura de #cuerpo-contable (que ya la tiene en tu código original)
 */

// Datos iniciales si no existen en el almacenamiento
let movimientosCaja = JSON.parse(localStorage.getItem('movimientosCaja')) || [
    { concepto: "Saldo Anterior Mes Octubre", ingreso: 111100, egreso: 0 },
    { concepto: "Aportes Socios (Cena/Regalos)", ingreso: 425900, egreso: 0 },
    { concepto: "Gastos Varios (Cena/Regalos)", ingreso: 0, egreso: 537000 }
];

document.addEventListener('DOMContentLoaded', () => {
    renderizarCaja();
});

// 1. FUNCIÓN PARA MOSTRAR LOS DATOS Y CALCULAR TOTALES
function renderizarCaja() {
    const cuerpo = document.getElementById('cuerpo-contable');
    if (!cuerpo) return;

    cuerpo.innerHTML = '';
    let tIngresos = 0;
    let tEgresos = 0;

    movimientosCaja.forEach((mov, index) => {
        tIngresos += parseFloat(mov.ingreso) || 0;
        tEgresos += parseFloat(mov.egreso) || 0;

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td data-index="${index}" data-campo="concepto">${mov.concepto}</td>
            <td class="text-right" data-index="${index}" data-campo="ingreso">${parseFloat(mov.ingreso).toFixed(2)}</td>
            <td class="text-right" data-index="${index}" data-campo="egreso">${parseFloat(mov.egreso).toFixed(2)}</td>
        `;
        cuerpo.appendChild(fila);
    });

    // Actualizar sumatorias en el HTML
    document.getElementById('total-ingresos').innerText = `$ ${tIngresos.toLocaleString()}`;
    document.getElementById('total-egresos').innerText = `$ ${tEgresos.toLocaleString()}`;
    document.getElementById('saldo-final').innerText = `$ ${(tIngresos - tEgresos).toLocaleString()}`;
}

// 2. AGREGAR FILA
function agregarFilaCaja() {
    const detalle = prompt("Ingrese el concepto o detalle del movimiento:");
    if (detalle) {
        movimientosCaja.push({ concepto: detalle, ingreso: 0, egreso: 0 });
        actualizarLocalStorageCaja();
    }
}

// 3. ACTIVAR EDICIÓN
function activarModoEdicionCaja() {
    const celdas = document.querySelectorAll('#cuerpo-contable td');
    celdas.forEach(celda => {
        celda.contentEditable = "true";
        celda.style.backgroundColor = "#e3f2fd";
        celda.style.border = "1px dashed #2980b9";
    });
    document.getElementById('btnGuardarCambiosCaja').style.display = 'block';
    alert("Modo edición activo. Haga clic en los valores para modificarlos.");
}

// 4. GUARDAR CAMBIOS
function guardarCambiosCaja() {
    const celdas = document.querySelectorAll('#cuerpo-contable td');
    
    celdas.forEach(celda => {
        const index = celda.getAttribute('data-index');
        const campo = celda.getAttribute('data-campo');
        let valor = celda.innerText.trim();

        if (campo === 'ingreso' || campo === 'egreso') {
            movimientosCaja[index][campo] = parseFloat(valor) || 0;
        } else {
            movimientosCaja[index][campo] = valor;
        }
    });

    actualizarLocalStorageCaja();
    document.getElementById('btnGuardarCambiosCaja').style.display = 'none';
    alert("Cambios guardados con éxito.");
}

// 5. ELIMINAR FILA
function eliminarFilaCaja() {
    const indexStr = prompt("Ingrese el número de fila a eliminar (empezando desde 1):");
    const index = parseInt(indexStr) - 1;

    if (isNaN(index) || index < 0 || index >= movimientosCaja.length) {
        alert("Número de fila inválido.");
        return;
    }

    if (confirm(`¿Está seguro de eliminar: "${movimientosCaja[index].concepto}"?`)) {
        movimientosCaja.splice(index, 1);
        actualizarLocalStorageCaja();
    }
}

function actualizarLocalStorageCaja() {
    localStorage.setItem('movimientosCaja', JSON.stringify(movimientosCaja));
    renderizarCaja();
}

// Nueva función para gestionar las opciones de la caja
function menuGestionCaja() {
    const opcion = prompt("¿Qué desea hacer en el Libro de Caja?\n1. Activar modo edición (escribir en celdas)\n2. Eliminar una fila específica");
    
    if (opcion === "1") {
        activarModoEdicionCaja();
    } else if (opcion === "2") {
        eliminarFilaCaja();
    }
    cerrarModal('modalAdmin');
}

// Asegúrate de que tu función eliminarFilaCaja sea esta para que sea efectiva:
function eliminarFilaCaja() {
    // Recuperamos los movimientos actuales del localStorage
    let movimientos = JSON.parse(localStorage.getItem('movimientosCaja')) || [];
    
    if (movimientos.length === 0) return alert("No hay movimientos para eliminar.");

    // Mostramos la lista para elegir
    const lista = movimientos.map((m, i) => `${i + 1}. ${m.concepto}`).join('\n');
    const num = prompt(`Ingrese el número de la fila que desea borrar:\n${lista}`);
    const index = parseInt(num) - 1;

    if (movimientos[index]) {
        if (confirm(`¿Está seguro de eliminar: "${movimientos[index].concepto}"?`)) {
            movimientos.splice(index, 1);
            localStorage.setItem('movimientosCaja', JSON.stringify(movimientos));
            location.reload(); // Recargamos para actualizar tabla y totales
        }
    } else if (num !== null) {
        alert("Número no válido.");
    }
}

// Variable global para el estado


function cargarTablaSocios() {
    const cuerpo = document.getElementById('cuerpo-tabla');
    const headerRow = document.getElementById('header-row-socios');
    
    let meses = JSON.parse(localStorage.getItem('columnas_meses')) || ["Noviembre", "Diciembre", "Enero"];
    let datosSocios = JSON.parse(localStorage.getItem('socios_data_completa')) || [];

    // 1. Reconstruir Encabezados
    let htmlHeader = `<th>Nro</th><th>Grado</th><th>Nombre</th>`;
    meses.forEach(mes => htmlHeader += `<th class="text-center">${mes}</th>`);
    if (modoEdicionActivo) htmlHeader += `<th class="text-center">Acciones</th>`; // Nueva columna
    headerRow.innerHTML = htmlHeader;

    // 2. Renderizar Filas
    cuerpo.innerHTML = "";
    datosSocios.forEach((socio, index) => {
        const fila = document.createElement('tr');
        let htmlFila = `<td>${index + 1}</td>
                        <td ${modoEdicionActivo ? 'contenteditable="true"' : ''}>${socio.grado}</td>
                        <td ${modoEdicionActivo ? 'contenteditable="true"' : ''}>${socio.nombre}</td>`;
        
        meses.forEach(mes => {
            const valor = socio.aportes[mes] || "0";
            htmlFila += `<td class="text-center monto-pos" ${modoEdicionActivo ? 'contenteditable="true" style="background:#fff9c4"' : ''}>$${valor}</td>`;
        });

        if (modoEdicionActivo) {
            htmlFila += `<td class="text-center">
                            <button onclick="eliminarSocioDirecto(${index})" class="ws-btn" style="background:#e74c3c; padding:5px; width:35px">
                                <i class="fas fa-trash"></i>
                            </button>
                         </td>`;
        }
        
        fila.innerHTML = htmlFila;
        cuerpo.appendChild(fila);
    });
    
    // Recalcular totales siempre que se cargue la tabla
    setTimeout(calcularTotales, 100);
}

// Función para eliminar directamente desde la fila
function eliminarSocioDirecto(index) {
    let datos = JSON.parse(localStorage.getItem('socios_data_completa')) || [];
    if (confirm(`¿Eliminar permanentemente a ${datos[index].nombre}?`)) {
        datos.splice(index, 1);
        localStorage.setItem('socios_data_completa', JSON.stringify(datos));
        cargarTablaSocios(); // Recarga visual sin refrescar página completa
    }
}

// Variable para controlar si el modo eliminación de caja está activo
let modoEliminarCajaActivo = false;

function activarModoEliminacionCaja() {
    modoEliminarCajaActivo = !modoEliminarCajaActivo; // Alternar estado
    renderizarCaja(); // Volver a dibujar la tabla
    cerrarModal('modalAdmin');
    
    if(modoEliminarCajaActivo) {
        alert("Modo eliminación activado. Haz clic en el ícono rojo para borrar movimientos.");
    }
}

function renderizarCaja() {
    const cuerpo = document.getElementById('cuerpo-contable');
    const cabeceraCaja = cuerpo.closest('table').querySelector('thead tr');
    if (!cuerpo) return;

    // 1. Recuperar movimientos de localStorage
    let movimientos = JSON.parse(localStorage.getItem('movimientosCaja')) || [
        { concepto: "Saldo Anterior Mes Octubre", ingreso: 111100, egreso: 0 },
        { concepto: "Aportes Socios (Cena/Regalos)", ingreso: 425900, egreso: 0 },
        { concepto: "Gastos Varios (Cena/Regalos)", ingreso: 0, egreso: 537000 }
    ];

    // 2. Ajustar cabecera (agregar/quitar columna Acciones)
    if (modoEliminarCajaActivo && cabeceraCaja.cells.length === 4) {
        const th = document.createElement('th');
        th.className = "text-center";
        th.innerText = "Acción";
        cabeceraCaja.appendChild(th);
    } else if (!modoEliminarCajaActivo && cabeceraCaja.cells.length === 5) {
        cabeceraCaja.deleteCell(-1);
    }

    // 3. Limpiar y dibujar filas
    cuerpo.innerHTML = '';
    movimientos.forEach((mov, index) => {
        const fila = document.createElement('tr');
        
        let htmlFila = `
            <td>${mov.concepto}</td>
            <td class="text-center monto-pos">$${(parseFloat(mov.ingreso) || 0).toLocaleString()}</td>
            <td class="text-center monto-neg">$${(parseFloat(mov.egreso) || 0).toLocaleString()}</td>
            <td class="text-center">$${( (parseFloat(mov.ingreso)||0) - (parseFloat(mov.egreso)||0) ).toLocaleString()}</td>
        `;

        // Si el modo eliminación está activo, agregar el botón del tacho
        if (modoEliminarCajaActivo) {
            htmlFila += `
                <td class="text-center">
                    <button onclick="eliminarMovimientoDirecto(${index})" class="ws-btn" style="background:#e74c3c; padding:5px; width:35px; margin: 0 auto;">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>`;
        }

        fila.innerHTML = htmlFila;
        cuerpo.appendChild(fila);
    });

    // Recalcular totales después de renderizar
    if (typeof calcularTotales === "function") calcularTotales();
}

function eliminarMovimientoDirecto(index) {
    let movimientos = JSON.parse(localStorage.getItem('movimientosCaja')) || [];
    
    if (confirm(`¿Eliminar el movimiento: "${movimientos[index].concepto}"?`)) {
        movimientos.splice(index, 1);
        localStorage.setItem('movimientosCaja', JSON.stringify(movimientos));
        
        // Si no quedan movimientos, desactivamos el modo eliminar
        if (movimientos.length === 0) modoEliminarCajaActivo = false;
        
        renderizarCaja(); // Actualización visual inmediata
    }
}

function activarModoEliminacionCaja() {
    modoEliminarCajaActivo = true; // Activamos el modo
    renderizarCaja(); 
    cerrarModal('modalAdmin');
    mostrarAlerta("Modo Eliminar", "Haz clic en el ícono rojo para borrar el movimiento. Al terminar, la tabla volverá a la normalidad.");
}

function eliminarMovimientoDirecto(index) {
    let movimientos = JSON.parse(localStorage.getItem('movimientosCaja')) || [];
    
    if (confirm(`¿Eliminar permanentemente: "${movimientos[index].concepto}"?`)) {
        movimientos.splice(index, 1);
        localStorage.setItem('movimientosCaja', JSON.stringify(movimientos));
        
        // Desactivamos el modo automáticamente tras borrar
        modoEliminarCajaActivo = false; 
        
        renderizarCaja();
        if (typeof calcularTotales === "function") calcularTotales();
    }
}

/**
 * Captura los datos editados en la tabla de caja y los persiste en localStorage
 */
function guardarCambiosCaja() {
    const cuerpoCaja = document.getElementById('cuerpo-contable');
    const filas = cuerpoCaja.querySelectorAll('tr');
    let nuevosMovimientos = [];

    filas.forEach(fila => {
        const celdas = fila.querySelectorAll('td');
        
        // Solo procesamos filas que tengan los datos completos (Concepto, Ingreso, Egreso)
        if (celdas.length >= 3) {
            // Limpiamos los textos para obtener solo números
            const concepto = celdas[0].innerText.trim();
            const ingreso = limpiarMoneda(celdas[1].innerText);
            const egreso = limpiarMoneda(celdas[2].innerText);

            nuevosMovimientos.push({
                concepto: concepto,
                ingreso: ingreso,
                egreso: egreso
            });
        }
    });

    // 1. Guardar en localStorage
    localStorage.setItem('movimientosCaja', JSON.stringify(nuevosMovimientos));

    // 2. Desactivar el modo edición visualmente
    modoEdicionActivo = false;
    document.getElementById('btnGuardarCambiosCaja').style.display = 'none';
    
    // 3. Quitar los estilos de edición a las celdas
    const todasLasCeldas = cuerpoCaja.querySelectorAll('td');
    todasLasCeldas.forEach(celda => {
        celda.contentEditable = "false";
        celda.style.backgroundColor = "";
        celda.style.border = "";
    });

    // 4. Refrescar cálculos y gráficos
    alert("¡Libro de Caja actualizado con éxito!");
    renderizarCaja(); 
    if (typeof calcularTotales === "function") calcularTotales();
    if (typeof renderizarGraficos === "function") renderizarGraficos();
}

/**
 * Función auxiliar para convertir texto de moneda a número operable
 */
function limpiarMoneda(texto) {
    if (!texto || texto === '---' || texto === '$0') return 0;
    // Quita el signo $, puntos de miles y cambia coma por punto decimal
    let limpio = texto.replace(/[$. ]/g, '').replace(',', '.');
    return parseFloat(limpio) || 0;
}

/**
 * Reemplaza el alert() aburrido por una modal elegante
 */
function mostrarMensaje(titulo, mensaje, tipo = 'info') {
    const overlay = document.createElement('div');
    overlay.className = 'custom-alert-overlay';
    overlay.id = 'active-modal';

    const icono = tipo === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
    const colorIcono = tipo === 'error' ? '#e74c3c' : 'var(--verde-oscuro)';

    overlay.innerHTML = `
        <div class="custom-alert-card">
            <i class="fas ${icono}" style="font-size: 2.5rem; color: ${colorIcono}; margin-bottom: 15px;"></i>
            <h3 style="color: var(--verde-oscuro); margin-bottom: 10px;">${titulo}</h3>
            <p style="color: #666; margin-bottom: 20px; line-height: 1.5;">${mensaje}</p>
            <button onclick="cerrarMensaje()" class="ws-btn" style="background: var(--verde-oscuro);">
                ENTENDIDO
            </button>
        </div>
    `;

    document.body.appendChild(overlay);
}

function cerrarMensaje() {
    const modal = document.getElementById('active-modal');
    if (modal) modal.remove();
}

// EJEMPLO DE USO:
// En lugar de: alert("Acceso denegado");
// Usar: mostrarMensaje("Error", "Los datos ingresados no son válidos", "error");

// ... (Mantén tus constantes USUARIOS_DB, socios, etc. igual)

/**
 * Reemplaza el alert() por una modal elegante (Función base optimizada)
 */
function mostrarMensaje(titulo, mensaje, tipo = 'info') {
    const overlay = document.createElement('div');
    overlay.className = 'custom-alert-overlay';
    overlay.id = 'active-modal';

    const icono = tipo === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
    const colorIcono = tipo === 'error' ? '#e74c3c' : 'var(--verde-oscuro)';

    overlay.innerHTML = `
        <div class="custom-alert-card">
            <i class="fas ${icono}" style="font-size: 2.5rem; color: ${colorIcono}; margin-bottom: 15px;"></i>
            <h3 style="color: var(--verde-oscuro); margin-bottom: 10px;">${titulo}</h3>
            <p style="color: #666; margin-bottom: 20px; line-height: 1.5;">${mensaje}</p>
            <button onclick="cerrarMensaje()" class="ws-btn" style="background: var(--verde-oscuro); width: 100%;">
                ENTENDIDO
            </button>
        </div>
    `;
    document.body.appendChild(overlay);
}

function cerrarMensaje() {
    const modal = document.getElementById('active-modal');
    if (modal) modal.remove();
}

// --- ACTUALIZACIÓN DE FUNCIONES DE GESTIÓN ---

function validarAccesoAdmin() {
    const p = prompt("Password de Gestión:");
    if (p === "2026") { 
        document.getElementById('modalAdmin').style.display = 'flex'; 
    } else { 
        // Reemplazo de alert por modal
        mostrarMensaje("Acceso Denegado", "La contraseña de gestión es incorrecta.", "error"); 
    }
}

function agregarColumnaMes() {
    const mes = prompt("Ingrese el nombre del nuevo mes (Ej: Febrero):");
    if (!mes) return;

    let meses = JSON.parse(localStorage.getItem('columnas_meses')) || ["Noviembre", "Diciembre", "Enero"];
    if (!meses.includes(mes)) {
        meses.push(mes);
        localStorage.setItem('columnas_meses', JSON.stringify(meses));
        
        // Reemplazo de alert por modal
        mostrarMensaje("Mes Agregado", `Se ha creado la columna para ${mes} correctamente.`);
        setTimeout(() => location.reload(), 1500); 
    }
    cerrarModal('modalAdmin');
}

function guardarCambiosEdicion() {
    const filas = document.querySelectorAll('#cuerpo-tabla tr');
    const headers = document.querySelectorAll('#header-row-socios th');
    let meses = [];
    for (let i = 3; i < headers.length; i++) meses.push(headers[i].innerText);

    let nuevosDatos = [];
    filas.forEach(fila => {
        const celdas = fila.querySelectorAll('td');
        let socio = { grado: celdas[1].innerText, nombre: celdas[2].innerText, aportes: {} };
        meses.forEach((m, i) => socio.aportes[m] = celdas[i + 3].innerText.replace('$', '').trim());
        nuevosDatos.push(socio);
    });

    localStorage.setItem('socios_data_completa', JSON.stringify(nuevosDatos));
    
    // Reemplazo de alert por modal
    mostrarMensaje("Planilla Guardada", "Los cambios en los aportes de socios se han persistido con éxito.");
    setTimeout(() => location.reload(), 1500);
}

function guardarCambiosCaja() {
    const cuerpoCaja = document.getElementById('cuerpo-contable');
    const filas = cuerpoCaja.querySelectorAll('tr');
    let nuevosMovimientos = [];

    filas.forEach(fila => {
        const celdas = fila.querySelectorAll('td');
        if (celdas.length >= 3) {
            nuevosMovimientos.push({
                concepto: celdas[0].innerText.trim(),
                ingreso: limpiarMoneda(celdas[1].innerText),
                egreso: limpiarMoneda(celdas[2].innerText)
            });
        }
    });

    localStorage.setItem('movimientosCaja', JSON.stringify(nuevosMovimientos));
    
    // Reemplazo de alert por modal
    mostrarMensaje("Caja Actualizada", "El libro de caja ha sido actualizado correctamente.");
    setTimeout(() => location.reload(), 1500);
}

function eliminarSocioPorNumero() {
    let datos = JSON.parse(localStorage.getItem('socios_data_completa')) || [];
    if (datos.length === 0) {
        return mostrarMensaje("Atención", "No existen socios registrados para eliminar.", "error");
    }

    const lista = datos.map((s, i) => `${i+1}. ${s.nombre}`).join('\n');
    const num = prompt(`Ingrese el número del socio a eliminar:\n${lista}`);
    const index = parseInt(num) - 1;

    if (datos[index]) {
        if (confirm(`¿Eliminar a ${datos[index].nombre}?`)) {
            datos.splice(index, 1);
            localStorage.setItem('socios_data_completa', JSON.stringify(datos));
            mostrarMensaje("Socio Eliminado", "El registro ha sido removido de la base de datos.");
            setTimeout(() => location.reload(), 1500);
        }
    } else if (num !== null) {
        mostrarMensaje("Error", "El número de socio ingresado no es válido.", "error");
    }
}

/**
 * Abre la modal y dispara la renderización de los gráficos
 */
function abrirModalGrafico() {
    const modal = document.getElementById('modalGrafico');
    modal.style.display = 'flex';
    
    // Pequeña pausa para asegurar que el canvas sea visible antes de dibujar
    setTimeout(renderizarGraficosDashboard, 100);
}

/**
 * Extrae datos de las tablas y genera los gráficos con Chart.js
 */
function renderizarGraficosDashboard() {
    // --- 1. DATOS DE LIBRO DE CAJA ---
    let ingresos = 0;
    let egresos = 0;
    
    document.querySelectorAll("#cuerpo-contable tr").forEach(fila => {
        ingresos += limpiarMoneda(fila.cells[1]?.innerText);
        egresos += limpiarMoneda(fila.cells[2]?.innerText);
    });

    const ctxCaja = document.getElementById('chartCaja').getContext('2d');
    if (chartCajaInstance) chartCajaInstance.destroy();
    
    chartCajaInstance = new Chart(ctxCaja, {
        type: 'doughnut',
        data: {
            labels: ['Ingresos', 'Egresos'],
            datasets: [{
                data: [ingresos, egresos],
                backgroundColor: ['#1b4332', '#c62828'], // Verde oscuro y Rojo
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } }
        }
    });

    // --- 2. DATOS DE APORTES SOCIOS (Por Mes) ---
    const headers = document.querySelectorAll("#header-row-socios th");
    let etiquetasMeses = [];
    for (let i = 3; i < headers.length; i++) {
        etiquetasMeses.push(headers[i].innerText);
    }
    
    let datosAportes = etiquetasMeses.map((_, i) => {
        let suma = 0;
        document.querySelectorAll("#cuerpo-tabla tr").forEach(fila => {
            suma += limpiarMoneda(fila.cells[i + 3]?.innerText);
        });
        return suma;
    });

    const ctxSocios = document.getElementById('chartSocios').getContext('2d');
    if (chartSociosInstance) chartSociosInstance.destroy();

    chartSociosInstance = new Chart(ctxSocios, {
        type: 'bar',
        data: {
            labels: etiquetasMeses,
            datasets: [{
                label: 'Recaudación $',
                data: datosAportes,
                backgroundColor: '#40916c', // Verde claro
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true } },
            plugins: { legend: { display: false } }
        }
    });
}

/**
 * Auxiliar para limpiar símbolos de moneda y convertir a número
 */
function limpiarMoneda(texto) {
    if (!texto || texto === '---' || texto === '$0') return 0;
    return parseFloat(texto.replace(/[$. ]/g, '').replace(',', '.')) || 0;
}

function cerrarModal(id) {
    document.getElementById(id).style.display = 'none';
}

function cerrarSesion() {
    // Primero pedimos confirmación al usuario
    if (confirm("¿Está seguro que desea cerrar la sesión?")) {
        const modal = document.getElementById('modalCierre');
        if (modal) {
            // Mostramos la modal de cierre
            modal.style.display = 'flex';
            
            // Agregamos un retraso de 2 segundos para mostrar la animación antes de salir
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            // Si la modal no existe en el HTML, redirige directamente
            window.location.href = 'index.html';
        }
    }
}

/**
 * Guarda los datos de Socios y Caja en Firebase
 */
function guardarCambiosEdicion() {
    // 1. Capturar datos de Socios desde la tabla
    const filasSocios = document.querySelectorAll('#cuerpo-tabla tr');
    const headers = document.querySelectorAll('#header-row-socios th');
    let meses = [];
    for (let i = 3; i < headers.length; i++) meses.push(headers[i].innerText);

    let nuevosDatosSocios = [];
    filasSocios.forEach(fila => {
        const celdas = fila.querySelectorAll('td');
        let socio = { 
            grado: celdas[1].innerText, 
            nombre: celdas[2].innerText, 
            aportes: {} 
        };
        meses.forEach((m, i) => {
            socio.aportes[m] = celdas[i + 3].innerText.replace('$', '').trim();
        });
        nuevosDatosSocios.push(socio);
    });

    // 2. Capturar datos del Libro de Caja
    const filasCaja = document.querySelectorAll('#cuerpo-contable tr');
    let nuevosMovimientos = [];
    filasCaja.forEach(fila => {
        const celdas = fila.querySelectorAll('td');
        if (celdas.length >= 3) {
            nuevosMovimientos.push({
                concepto: celdas[0].innerText.trim(),
                ingreso: limpiarMoneda(celdas[1].innerText),
                egreso: limpiarMoneda(celdas[2].innerText)
            });
        }
    });

    // 3. ENVIAR A FIREBASE
    // Creamos un objeto que contenga toda la estructura
    const backupCompleto = {
        socios: nuevosDatosSocios,
        meses_activos: meses,
        caja: nuevosMovimientos,
        ultima_actualizacion: new Date().toLocaleString()
    };

    db.ref('contabilidad_escuadron').set(backupCompleto)
    .then(() => {
        // Usamos tu nueva modal de éxito en lugar de alert
        mostrarMensaje("Sincronización Exitosa", "Todos los datos han sido respaldados en Firebase correctamente.");
        
        // Actualizar localStorage como respaldo local
        localStorage.setItem('socios_data_completa', JSON.stringify(nuevosDatosSocios));
        localStorage.setItem('movimientosCaja', JSON.stringify(nuevosMovimientos));
        
        modoEdicionActivo = false;
        setTimeout(() => location.reload(), 1500);
    })
    .catch((error) => {
        mostrarMensaje("Error de Conexión", "No se pudo sincronizar con la nube: " + error.message, "error");
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Escuchar cambios en tiempo real desde Firebase
    db.ref('contabilidad_escuadron').on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            // Si hay datos en Firebase, actualizamos el localStorage para que
            // tus funciones de carga (cargarTablaSocios, etc.) los usen
            localStorage.setItem('socios_data_completa', JSON.stringify(data.socios));
            localStorage.setItem('columnas_meses', JSON.stringify(data.meses_activos));
            localStorage.setItem('movimientosCaja', JSON.stringify(data.caja));
            
            // Refrescar tablas visualmente sin recargar la página
            cargarTablaSocios();
            renderizarCaja();
            calcularTotales();
        }
    });
});

/**
 * FUNCIÓN PARA EDITAR: Habilita la escritura directa en las celdas de la tabla
 */
function activarModoEdicion() {
    modoEdicionActivo = true;
    document.getElementById('btnGuardarCambios').style.display = 'block';
    
    // Recargamos la tabla para que las celdas sean "contenteditable"
    if (typeof cargarTablaSocios === "function") {
        cargarTablaSocios();
    }
    
    cerrarModal('modalAdmin');
    mostrarMensaje("Modo Edición", "Ahora puede hacer clic y editar cualquier nombre o grado directamente en la tabla.");
}

/**
 * FUNCIÓN PARA BORRAR: Permite seleccionar un socio y eliminarlo definitivamente
 */
function eliminarSocioPorNumero() {
    let datos = JSON.parse(localStorage.getItem('socios_data_completa')) || [];
    
    if (datos.length === 0) {
        return mostrarMensaje("Atención", "No hay socios registrados para eliminar.", "error");
    }

    // Generamos la lista de socios para el prompt
    const lista = datos.map((s, i) => `${i + 1}. ${s.grado} ${s.nombre}`).join('\n');
    const num = prompt(`Ingrese el número del socio que desea eliminar:\n\n${lista}`);
    
    if (num === null) return; // Si cancela el prompt

    const index = parseInt(num) - 1;

    if (datos[index]) {
        if (confirm(`¿Está seguro de eliminar a: ${datos[index].nombre}?`)) {
            datos.splice(index, 1);
            
            // Guardamos localmente
            localStorage.setItem('socios_data_completa', JSON.stringify(datos));
            
            // Sincronizamos con Firebase si está configurado
            if (typeof db !== 'undefined') {
                db.ref('contabilidad_escuadron/socios').set(datos);
            }
            
            mostrarMensaje("Socio Eliminado", "La planilla se actualizará ahora.");
            setTimeout(() => location.reload(), 1500);
        }
    } else {
        mostrarMensaje("Error", "Número inválido.", "error");
    }
}

/**
 * CORRECCIÓN: Función para cargar la tabla permitiendo la edición de celdas existentes y nuevas
 */
function cargarTablaSocios() {
    const cuerpo = document.getElementById('cuerpo-tabla');
    const headerRow = document.getElementById('header-row-socios');
    
    if (!cuerpo || !headerRow) return;

    // 1. Recuperar la estructura de meses y datos de socios
    let meses = JSON.parse(localStorage.getItem('columnas_meses')) || ["Noviembre", "Diciembre", "Enero"];
    const datosSocios = JSON.parse(localStorage.getItem('socios_data_completa')) || [];

    // 2. Reconstruir encabezados para asegurar que las nuevas columnas aparezcan
    headerRow.innerHTML = `<th>Nro</th><th>Grado</th><th>Nombre</th>`;
    meses.forEach(mes => {
        const th = document.createElement('th');
        th.className = "text-center";
        th.innerText = mes;
        headerRow.appendChild(th);
    });

    // 3. Renderizar filas con habilitación de edición
    cuerpo.innerHTML = "";
    datosSocios.forEach((socio, index) => {
        const fila = document.createElement('tr');
        
        // Celdas base (Nro, Grado, Nombre)
        let htmlFila = `<td>${index + 1}</td>
                        <td ${modoEdicionActivo ? 'contenteditable="true" style="background:#fff9c4"' : ''}>${socio.grado}</td>
                        <td ${modoEdicionActivo ? 'contenteditable="true" style="background:#fff9c4"' : ''}>${socio.nombre}</td>`;
        
        // Celdas de meses: Se habilita 'contenteditable' si modoEdicionActivo es verdadero
        meses.forEach(mes => {
            const valor = (socio.aportes && socio.aportes[mes]) ? socio.aportes[mes] : "0";
            htmlFila += `<td class="text-center monto-pos" 
                            ${modoEdicionActivo ? 'contenteditable="true" style="background:#fff9c4; border: 1px dashed #f39c12;"' : ''}>
                            $${valor}
                         </td>`;
        });
        
        fila.innerHTML = htmlFila;
        cuerpo.appendChild(fila);
    });
    
    // Recalcular totales para reflejar cambios visuales
    if (typeof calcularTotales === "function") calcularTotales();
}

// 1. Activa el modo visual de edición
function activarModoEdicion() {
    modoEdicionActivo = true;
    
    // Seleccionamos las celdas de la tabla de socios
    const celdasSocios = document.querySelectorAll('#cuerpo-tabla td');
    
    celdasSocios.forEach(celda => {
        // No permitimos editar la primera columna (Nro)
        if (celda.cellIndex !== 0) {
            celda.contentEditable = "true";
            celda.style.backgroundColor = "#fff9c4"; // Amarillo suave
            celda.style.border = "1px dashed #f39c12";
        }
    });

    // Mostramos el botón de guardar específico de socios
    const btnGuardar = document.getElementById('btnGuardarCambios');
    if (btnGuardar) btnGuardar.style.display = 'block';

    cerrarModal('modalAdmin');
    mostrarMensaje("Modo Edición Activo", "Modifique los nombres, grados o montos de los socios y luego presione 'Guardar Planilla'.");
}

// 2. Captura los datos de la tabla y los guarda
function guardarCambiosEdicion() {
    const filas = document.querySelectorAll('#cuerpo-tabla tr');
    const headers = document.querySelectorAll('#header-row-socios th');
    
    // Identificamos qué meses existen actualmente en el encabezado
    let meses = [];
    for (let i = 3; i < headers.length; i++) {
        meses.push(headers[i].innerText);
    }

    let nuevosDatos = [];
    filas.forEach(fila => {
        const celdas = fila.querySelectorAll('td');
        if (celdas.length > 0) {
            let socio = {
                grado: celdas[1].innerText.trim(),
                nombre: celdas[2].innerText.trim(),
                aportes: {}
            };
            
            // Guardar los aportes de cada mes dinámicamente
            meses.forEach((mes, index) => {
                // Limpiamos el texto (quitamos $ y espacios)
                let valor = celdas[index + 3].innerText.replace('$', '').trim();
                socio.aportes[mes] = valor;
            });
            nuevosDatos.push(socio);
        }
    });

    // Persistencia
    localStorage.setItem('socios_data_completa', JSON.stringify(nuevosDatos));
    
    // Si usas Firebase, disparamos la sincronización
    if (typeof db !== 'undefined') {
        db.ref('contabilidad_escuadron/socios').set(nuevosDatos);
    }

    // Feedback al usuario
    modoEdicionActivo = false;
    document.getElementById('btnGuardarCambios').style.display = 'none';
    mostrarMensaje("Éxito", "Los datos de los socios han sido actualizados.", "info");
    
    // Recargamos para limpiar estilos de edición y actualizar totales
    setTimeout(() => location.reload(), 1000);
}

/**
 * Configura la escucha de eventos para actualizar totales mientras se escribe
 */
function activarCalculoEnVivo() {
    const tablaSocios = document.getElementById('cuerpo-tabla');
    
    // Escuchamos el evento 'input' que detecta cambios de texto en tiempo real
    tablaSocios.addEventListener('input', (e) => {
        if (e.target.tagName === 'TD') {
            // Cada vez que el usuario escribe, recalculamos todo
            calcularTotales();
            // Opcional: Actualizar gráficos en tiempo real si la modal está abierta
            if (document.getElementById('modalGrafico').style.display === 'flex') {
                renderizarGraficosDashboard();
            }
        }
    });
}

/**
 * Calcula la suma de todas las columnas de meses presentes en la tabla
 */
function calcularTotales() {
    const filasSocios = document.querySelectorAll("#cuerpo-tabla tr");
    const headers = document.querySelectorAll("#header-row-socios th");
    
    // Determinamos cuántas columnas de meses hay (empezando desde la cuarta columna)
    const numColumnasMeses = headers.length - 3;
    let sumaMeses = Array(numColumnasMeses).fill(0);
    let granTotalAportes = 0;

    filasSocios.forEach(fila => {
        for (let i = 0; i < numColumnasMeses; i++) {
            // Sumamos el valor de la celda (índice i + 3 para saltar Nro, Grado y Nombre)
            let valor = limpiarMoneda(fila.cells[i + 3]?.innerText);
            sumaMeses[i] += valor;
            granTotalAportes += valor;
        }
    });

    // 1. Actualizar el Pie de la Tabla de Socios
    let htmlPieSocios = `<tr><td colspan="3" style="text-align:right;">TOTALES MENSUALES:</td>`;
    sumaMeses.forEach(total => {
        htmlPieSocios += `<td class="text-center monto-pos">$${total.toLocaleString()}</td>`;
    });
    htmlPieSocios += `</tr>`;
    
    const pieSocios = document.getElementById("pie-socios");
    if (pieSocios) pieSocios.innerHTML = htmlPieSocios;

    // 2. Actualizar el Libro de Caja (Fila de Aportes Socios)
    // Buscamos la fila de aportes en la tabla contable para sincronizarla
    const filaAportesCaja = document.querySelector("#cuerpo-contable tr:first-child td:nth-child(2)");
    if (filaAportesCaja) {
        filaAportesCaja.innerText = `$${granTotalAportes.toLocaleString()}`;
    }

    // 3. Forzar el recálculo del saldo final en el Libro de Caja
    recalcularSaldoCajaFinal();
}

/**
 * Recalcula el saldo final del libro de caja basado en los nuevos totales
 */
function recalcularSaldoCajaFinal() {
    let tIngreso = 0;
    let tEgreso = 0;
    
    document.querySelectorAll("#cuerpo-contable tr").forEach(fila => {
        tIngreso += limpiarMoneda(fila.cells[1]?.innerText);
        tEgreso += limpiarMoneda(fila.cells[2]?.innerText);
    });

    const pieContable = document.getElementById("pie-contable");
    if (pieContable) {
        pieContable.innerHTML = `
            <tr>
                <td>TOTAL ACUMULADO ACTUALIZADO</td>
                <td class="text-center monto-pos">$${tIngreso.toLocaleString()}</td>
                <td class="text-center monto-neg">$${tEgreso.toLocaleString()}</td>
                <td class="text-center" style="color: blue; font-weight: bold;">$${(tIngreso - tEgreso).toLocaleString()}</td>
            </tr>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cargarTablaSocios();
    cargarTablaContable();
    activarCalculoEnVivo(); // <-- Activa la magia del tiempo real
    setTimeout(calcularTotales, 500); 
});
/**
 * Detecta cambios en la tabla y valida que solo se ingresen números
 */
function activarCalculoEnVivo() {
    const tablaSocios = document.getElementById('cuerpo-tabla');
    
    tablaSocios.addEventListener('input', (e) => {
        if (e.target.tagName === 'TD' && e.target.cellIndex >= 3) {
            // Validación: Eliminar cualquier carácter que no sea número o punto
            let valorLimpio = e.target.innerText.replace(/[^0-9.]/g, '');
            
            // Si el usuario borra todo, ponemos un 0 para evitar errores de cálculo
            if (e.target.innerText !== "$" + valorLimpio) {
                // Solo actualizamos si es necesario para no perder el foco del cursor
                // No agregamos el "$" aquí para dejar que el usuario escriba tranquilo
            }

            // Recalcular todo el sistema al instante
            calcularTotales();
        }
    });

    // Al salir de la celda (blur), le damos formato de moneda
    tablaSocios.addEventListener('focusout', (e) => {
        if (e.target.tagName === 'TD' && e.target.cellIndex >= 3) {
            let num = limpiarMoneda(e.target.innerText);
            e.target.innerText = "$" + num.toLocaleString();
        }
    });
}
/**
 * Suma todas las columnas de meses y actualiza el Libro de Caja
 */
function calcularTotales() {
    const filasSocios = document.querySelectorAll("#cuerpo-tabla tr");
    const headers = document.querySelectorAll("#header-row-socios th");
    
    // Calculamos cuántas columnas de aportes hay actualmente
    const numColumnasMeses = headers.length - 3;
    let sumaMeses = Array(numColumnasMeses).fill(0);
    let granTotalGeneral = 0;

    filasSocios.forEach(fila => {
        for (let i = 0; i < numColumnasMeses; i++) {
            let valor = limpiarMoneda(fila.cells[i + 3]?.innerText);
            sumaMeses[i] += valor;
            granTotalGeneral += valor;
        }
    });

    // 1. Actualizar fila de totales en la tabla de socios
    actualizarPieSocios(sumaMeses);

    // 2. Sincronizar con el Libro de Caja (Fila: Aportes Socios Activos)
    const filaAportesCaja = document.querySelector("#cuerpo-contable tr:first-child td:nth-child(2)");
    if (filaAportesCaja) {
        filaAportesCaja.innerText = "$" + granTotalGeneral.toLocaleString();
        filaAportesCaja.classList.add('monto-pos'); // Asegura el color verde
    }

    // 3. Recalcular el balance final del Escuadrón
    recalcularSaldoFinalCaja();
}

function actualizarPieSocios(sumas) {
    const pie = document.getElementById("pie-socios");
    if (!pie) return;
    
    let html = `<tr><td colspan="3" style="text-align:right; font-weight:bold;">TOTALES:</td>`;
    sumas.forEach(s => {
        html += `<td class="text-center monto-pos" style="background:#e8f5e9;">$${s.toLocaleString()}</td>`;
    });
    html += `</tr>`;
    pie.innerHTML = html;
}
/**
 * Verifica el estado del saldo y emite alertas visuales si es negativo
 */
function verificarSaludFinanciera(saldo) {
    const pieContable = document.getElementById("pie-contable");
    const celdaSaldo = pieContable.querySelector("td:last-child");

    if (saldo < 0) {
        // Cambia el color a rojo crítico y añade una animación de parpadeo
        celdaSaldo.style.color = "#ff0000";
        celdaSaldo.style.fontWeight = "900";
        celdaSaldo.innerHTML = `<i class="fas fa-exclamation-triangle"></i> $${saldo.toLocaleString()}`;
        
        // Opcional: Mostrar un mensaje de advertencia solo la primera vez que cae en negativo
        if (!window.alertaMostrada) {
            mostrarMensaje("Atención: Déficit", "Los egresos actuales superan los ingresos totales. Verifique los aportes o reduzca gastos.", "error");
            window.alertaMostrada = true;
        }
    } else {
        // Saldo saludable en azul o verde
        celdaSaldo.style.color = "blue";
        celdaSaldo.style.fontWeight = "bold";
        window.alertaMostrada = false;
    }
}

/**
 * Recalcula el saldo final del libro de caja basado en los nuevos totales de socios
 */
function recalcularSaldoFinalCaja() {
    let tIngreso = 0;
    let tEgreso = 0;
    
    document.querySelectorAll("#cuerpo-contable tr").forEach(fila => {
        tIngreso += limpiarMoneda(fila.cells[1]?.innerText);
        tEgreso += limpiarMoneda(fila.cells[2]?.innerText);
    });

    const saldoFinal = tIngreso - tEgreso;

    const pieContable = document.getElementById("pie-contable");
    if (pieContable) {
        pieContable.innerHTML = `
            <tr>
                <td>TOTAL ACUMULADO ACTUALIZADO</td>
                <td class="text-center monto-pos">$${tIngreso.toLocaleString()}</td>
                <td class="text-center monto-neg">$${tEgreso.toLocaleString()}</td>
                <td class="text-center">$${saldoFinal.toLocaleString()}</td>
            </tr>`;
        
        // Ejecutar la verificación de saldo
        verificarSaludFinanciera(saldoFinal);
    }
}

function guardarCambiosEdicion() {
    // 1. Obtener los datos de la tabla
    const datosSocios = []; // ... lógica para extraer datos de las celdas ...
    
    // 2. Guardar en Firebase
    db.ref('socios').set(datosSocios)
    .then(() => {
        alert("¡Datos guardados exitosamente en la nube!");
        document.getElementById('btnGuardarCambios').style.display = 'none';
    })
    .catch((error) => {
        console.error("Error al guardar:", error);
        alert("Hubo un error al sincronizar con Firebase.");
    });
}