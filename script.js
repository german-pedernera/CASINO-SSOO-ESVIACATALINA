const MONTO_NOV = 40000;
const MONTO_GRAL = 20000;
const FONDO_JULIO = 60000;
const INGRESO_EX_SOCIOS = 40000;
const GASTO_REGALO = 130000;
const GASTO_CENA = 407000;

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

const getMontoClass = (valor) => (valor <= 0 ? 'monto-neg' : 'monto-pos');

document.addEventListener("DOMContentLoaded", () => {
    let tNov = 0, tDic = 0, tEne = 0;
    const cuerpo = document.getElementById("cuerpo-tabla");

    if(cuerpo) {
        socios.forEach((s, index) => {
            const n = s.nov ? MONTO_NOV : 0;
            const d = s.dic ? MONTO_GRAL : 0;
            const e = s.ene ? MONTO_GRAL : 0;
            tNov += n; tDic += d; tEne += e;
            
            // Lógica para mostrar "---" si es $0 en los meses solicitados
            const txtNov = n === 0 ? "---" : `$${n.toLocaleString('es-AR')}`;
            const clsNov = n === 0 ? "" : getMontoClass(n);
            
            const txtDic = d === 0 ? "---" : `$${d.toLocaleString('es-AR')}`;
            const clsDic = d === 0 ? "" : getMontoClass(d);

            cuerpo.innerHTML += `
                <tr>
                    <td class="text-left">${index + 1}</td>
                    <td class="text-left"><strong>${s.grado}</strong></td>
                    <td class="text-left">${s.nombre}</td>
                    <td class="text-center ${clsNov}">${txtNov}</td>
                    <td class="text-center ${clsDic}">${txtDic}</td>
                    <td class="text-center ${getMontoClass(e)}">$${e.toLocaleString('es-AR')}</td>
                </tr>`;
        });

        const totalAportesSocios = tNov + tDic + tEne;
        const pieTabla = document.getElementById("pie-tabla");
        if(pieTabla) {
            pieTabla.innerHTML = `
                <tr class="row-subtotal">
                    <td colspan="3" class="text-left">SUBTOTALES</td>
                    <td class="text-center">$${tNov.toLocaleString('es-AR')}</td>
                    <td class="text-center">$${tDic.toLocaleString('es-AR')}</td>
                    <td class="text-center">$${tEne.toLocaleString('es-AR')}</td>
                </tr>
                <tr class="row-total-final">
                    <td colspan="3" class="text-left">TOTAL INGRESOS ACUMULADOS</td>
                    <td colspan="3" class="text-center">$${totalAportesSocios.toLocaleString('es-AR')}</td>
                </tr>`;
        }

        const totalDebe = totalAportesSocios + FONDO_JULIO + INGRESO_EX_SOCIOS;
        const totalHaber = GASTO_REGALO + GASTO_CENA;
        const saldoFinal = totalDebe - totalHaber;
        
        const cuerpoContable = document.getElementById("cuerpo-contable");
        if(cuerpoContable) {
            cuerpoContable.innerHTML = `
                <tr><td class="text-left">Aportes Totales Recaudados</td><td class="text-center monto-pos">$${totalAportesSocios.toLocaleString('es-AR')}</td><td>-</td></tr>
                <tr><td class="text-left">Fondo casino (Julio 2025)</td><td class="text-center monto-pos">$${FONDO_JULIO.toLocaleString('es-AR')}</td><td>-</td></tr>
                <tr>
                    <td class="text-left">Ex-Socios Casino de SSOO</td>
                    <td class="text-center monto-pos">$${INGRESO_EX_SOCIOS.toLocaleString('es-AR')}</td>
                    <td>-</td>
                </tr>
                <tr><td class="text-left">Regalo cambio de destino</td><td>-</td><td class="text-center monto-neg">$${GASTO_REGALO.toLocaleString('es-AR')}</td></tr>
                <tr><td class="text-left">Cena de despedida</td><td>-</td><td class="text-center monto-neg">$${GASTO_CENA.toLocaleString('es-AR')}</td></tr>`;
        }

        const pieContable = document.getElementById("pie-contable");
        if(pieContable) {
            pieContable.innerHTML = `
                <tr class="row-subtotal"><td class="text-left">SUBTOTALES</td><td class="text-center">$${totalDebe.toLocaleString('es-AR')}</td><td class="text-center">$${totalHaber.toLocaleString('es-AR')}</td></tr>
                <tr class="row-total-final"><td class="text-left">SALDO FINAL (BALANCE NETO)</td><td colspan="2" class="text-center monto-blanco-total">$${saldoFinal.toLocaleString('es-AR')}</td></tr>`;
        }

        const chartCanvas = document.getElementById('aportesChart');
        if(chartCanvas) {
            const ctx = chartCanvas.getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Oct/Nov 2025', 'Dic 2025', 'Ene 2026'],
                    datasets: [{ label: 'Ingresos Mensuales', data: [tNov, tDic, tEne], backgroundColor: '#1b4332' }]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });
        }
    }
});

function abrirModal() { document.getElementById("modalGrafico").style.display = "flex"; }
function cerrarModal() { document.getElementById("modalGrafico").style.display = "none"; }
function abrirModalTransf() { document.getElementById("modalTransf").style.display = "flex"; }
function cerrarModalTransf() { document.getElementById("modalTransf").style.display = "none"; }

window.onclick = (e) => { 
    if(e.target == document.getElementById("modalGrafico")) cerrarModal(); 
    if(e.target == document.getElementById("modalTransf")) cerrarModalTransf(); 
}