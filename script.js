const MONTO_NOV = 40000;
const MONTO_GRAL = 20000;
const FONDO_JULIO = 60000;
const INGRESO_EX_SOCIOS = 40000;
const GASTO_REGALO = 130000;
const GASTO_CENA = 407000;

// Lista de socios corregida (Sin Ayala)
const socios = [
    { grado: "CTE", nombre: "SKIEBACK JOSE MARCELO", nov: true, dic: true, ene: true },
    { grado: "2DO CTE", nombre: "MAMAN ORFALI CRISTIAN", nov: true, dic: true, ene: true },
    { grado: "2DO CTE", nombre: "FAIAD CLAUDIA YAMIL", nov: true, dic: true, ene: true },
    { grado: "2DO CTE", nombre: "ORDOÑEZ MARÍA FLORENCIA", nov: true, dic: true, ene: true },
    { grado: "1ER ALF", nombre: "MEDRANO PABLO MARTIN", nov: true, dic: true, ene: false },
    { grado: "1ER ALF", nombre: "CABALLERO RAMON RODOLFO", nov: false, dic: true, ene: true },
    { grado: "1ER ALF", nombre: "RAMIREZ PEDERNERA GERMAN", nov: true, dic: true, ene: true },
    { grado: "1ER ALF", nombre: "RABBIA ROMINA SOLEDAD", nov: true, dic: true, ene: true },
    { grado: "ALF", nombre: "CORONEL BRISA NEREA", nov: true, dic: true, ene: false },
    { grado: "SUBALF", nombre: "SOTO ENZO GASTON", nov: true, dic: true, ene: false },
    { grado: "SUBALF", nombre: "ROLON FACUNDO NAHUEL", nov: true, dic: true, ene: true },
    { grado: "SUBALF", nombre: "VERA RAMIRO ALEJANDRO", nov: false, dic: false, ene: false }
];

document.addEventListener("DOMContentLoaded", () => {
    let tNov = 0, tDic = 0, tEne = 0;
    const cuerpo = document.getElementById("cuerpo-tabla");

    if(cuerpo) {
        socios.forEach((s, index) => {
            const n = s.nov ? MONTO_NOV : 0;
            const d = s.dic ? MONTO_GRAL : 0;
            const e = s.ene ? MONTO_GRAL : 0;
            tNov += n; tDic += d; tEne += e;
            
            // Visualización de montos con "---" si es 0
            const displayNov = n === 0 ? "---" : `$${n.toLocaleString('es-AR')}`;
            const displayDic = d === 0 ? "---" : `$${d.toLocaleString('es-AR')}`;
            const displayEne = e === 0 ? "---" : `$${e.toLocaleString('es-AR')}`;

            cuerpo.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td><strong>${s.grado}</strong></td>
                    <td>${s.nombre}</td>
                    <td class="text-center ${n > 0 ? 'monto-pos' : ''}">${displayNov}</td>
                    <td class="text-center ${d > 0 ? 'monto-pos' : ''}">${displayDic}</td>
                    <td class="text-center ${e > 0 ? 'monto-pos' : ''}">${displayEne}</td>
                </tr>`;
        });

        // Totales y Balance
        const totalAportes = tNov + tDic + tEne;
        const totalDebe = totalAportes + FONDO_JULIO + INGRESO_EX_SOCIOS;
        const totalHaber = GASTO_REGALO + GASTO_CENA;
        const saldoFinal = totalDebe - totalHaber;

        document.getElementById("pie-tabla").innerHTML = `
            <tr class="row-total-final">
                <td colspan="3">TOTAL ACUMULADO</td>
                <td colspan="3" class="text-center">$${totalAportes.toLocaleString('es-AR')}</td>
            </tr>`;

        document.getElementById("cuerpo-contable").innerHTML = `
            <tr><td>Aportes Socios Activos</td><td class="text-center monto-pos">$${totalAportes.toLocaleString('es-AR')}</td><td>-</td></tr>
            <tr><td>Fondo inicial (Julio 2025)</td><td class="text-center monto-pos">$${FONDO_JULIO.toLocaleString('es-AR')}</td><td>-</td></tr>
            <tr><td>Ex-Socios Casino de SSOO</td><td class="text-center monto-pos">$${INGRESO_EX_SOCIOS.toLocaleString('es-AR')}</td><td>-</td></tr>
            <tr><td>Regalos Cambio de Destino</td><td>-</td><td class="text-center monto-neg">$${GASTO_REGALO.toLocaleString('es-AR')}</td></tr>
            <tr><td>Cena Camaradería</td><td>-</td><td class="text-center monto-neg">$${GASTO_CENA.toLocaleString('es-AR')}</td></tr>`;

        document.getElementById("pie-contable").innerHTML = `
            <tr class="row-total-final">
                <td>SALDO FINAL (NETO)</td>
                <td colspan="2" class="text-center">$${saldoFinal.toLocaleString('es-AR')}</td>
            </tr>`;

        renderChart([tNov, tDic, tEne]);
    }
});

// Funciones UI
function toggleMenu() { document.getElementById('sidebar').classList.toggle('active'); }
function abrirModal() { document.getElementById("modalGrafico").style.display = "flex"; }
function cerrarModal() { document.getElementById("modalGrafico").style.display = "none"; }
function abrirModalTransf() { document.getElementById("modalTransf").style.display = "flex"; }
function cerrarModalTransf() { document.getElementById("modalTransf").style.display = "none"; }

function renderChart(data) {
    const ctx = document.getElementById('aportesChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Oct/Nov', 'Diciembre', 'Enero'],
            datasets: [{ label: 'Ingresos $', data: data, backgroundColor: '#1b4332' }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

/* LÓGICA DE MODALES Y NAVEGACIÓN */

function toggleMenu() { 
    document.getElementById('sidebar').classList.toggle('active'); 
}

// Abrir Modales
function abrirModal() {
    document.getElementById('modalGrafico').style.display = 'flex';
}

function abrirModalTransf() {
    document.getElementById('modalTransf').style.display = 'flex';
}

// Cerrar Modales (Botón X)
function cerrarModal() {
    document.getElementById('modalGrafico').style.display = 'none';
}

function cerrarModalTransf() {
    document.getElementById('modalTransf').style.display = 'none';
}

// Función para cerrar al hacer clic en el fondo oscuro (overlay)
function cerrarSiClickFuera(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.style.display = 'none';
    }
}

// Soporte para cerrar con la tecla Escape
window.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        const modalG = document.getElementById('modalGrafico');
        const modalT = document.getElementById('modalTransf');
        if (modalG) modalG.style.display = 'none';
        if (modalT) modalT.style.display = 'none';
    }
});