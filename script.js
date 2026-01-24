// Constantes de montos
const MONTO_NOV = 40000;
const MONTO_GRAL = 20000;
const FONDO_JULIO = 60000;
const INGRESO_EX_SOCIOS = 40000;
const GASTO_REGALO = 130000;
const GASTO_CENA = 407000;

// Mapeo de meses para ordenamiento
const MESES = {
    "ENERO": 1, "FEBRERO": 2, "MARZO": 3, "ABRIL": 4, "MAYO": 5, "JUNIO": 6,
    "JULIO": 7, "AGOSTO": 8, "SEPTIEMBRE": 9, "OCTUBRE": 10, "NOVIEMBRE": 11, "DICIEMBRE": 12
};

// Lista de socios con fecha de nacimiento para el calendario
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

    // Lógica para la Tabla de Rendición (dashboard.html)
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
        
        renderChart([tNov, tDic, tEne]);
    }

    // Lógica para el Calendario de Cumpleaños (cumpleanos.html)
    if (cuerpoCumpleanos) {
        const sociosOrdenados = [...socios].sort((a, b) => {
            const partesA = a.cumple.split(" ");
            const partesB = b.cumple.split(" ");
            const diaA = parseInt(partesA[0]);
            const mesA = MESES[partesA[1].toUpperCase()];
            const diaB = parseInt(partesB[0]);
            const mesB = MESES[partesB[1].toUpperCase()];

            if (mesA !== mesB) return mesA - mesB;
            return diaA - diaB;
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

// Funciones Globales
function toggleMenu() { document.getElementById('sidebar').classList.toggle('active'); }
function abrirModal() { document.getElementById("modalGrafico").style.display = "flex"; }
function cerrarModal() { document.getElementById("modalGrafico").style.display = "none"; }
function abrirModalTransf() { document.getElementById("modalTransf").style.display = "flex"; }
function cerrarModalTransf() { document.getElementById("modalTransf").style.display = "none"; }
function cerrarSiClickFuera(event) { if (event.target.classList.contains('modal-overlay')) event.target.style.display = 'none'; }

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