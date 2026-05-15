/* ============================================================
   personas-charts.js
   Gráficos y lógica interactiva de personas.html
   Requiere Chart.js 4.x cargado antes de este script.
   ============================================================ */

(function () {
  'use strict';

  /* ─── Colores fijos (no dependen de CSS vars, Chart.js no las soporta) ── */
  const ACCENT   = '#3e4a3d';
  const SECONDARY = '#8c7851';
  const GREEN    = '#2a7d5e';
  const MUTED    = '#9e9d96';
  const BG       = '#f4f4f2';
  const BORDER   = '#c4c4bc';

  /* ─── Helpers de escala ─────────────────────────────────────── */
  const gridColor = 'rgba(62,74,61,0.07)';
  const tickColor = '#9e9d96';

  const baseScaleX = {
    grid: { display: false },
    ticks: { color: tickColor, font: { size: 11, family: "'Jost', sans-serif" } }
  };
  const baseScaleY = {
    grid: { color: gridColor },
    ticks: { color: tickColor, font: { size: 11, family: "'Jost', sans-serif" } }
  };

  /* ─── 1. GRÁFICO DE RENDIMIENTOS (barras) ────────────────────── */
  (function initRendimientos() {
    const ctx = document.getElementById('chart-rendimientos');
    if (!ctx) return;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Caja de ahorro USD', 'FCI Dólar / ON', 'S&P 500 (ETF)'],
        datasets: [{
          label: 'Rendimiento anual %',
          data: [1.5, 9, 11],
          backgroundColor: [MUTED, GREEN, ACCENT],
          borderRadius: 3,
          borderSkipped: false,
          barPercentage: 0.55,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => '  ' + ctx.parsed.y + '% anual'
            }
          }
        },
        scales: {
          x: {
            ...baseScaleX,
            ticks: {
              ...baseScaleX.ticks,
              font: { size: 12, family: "'Jost', sans-serif" }
            }
          },
          y: {
            ...baseScaleY,
            max: 14,
            ticks: {
              ...baseScaleY.ticks,
              callback: v => v + '%'
            }
          }
        }
      }
    });
  })();


  /* ─── 2. GRÁFICO DE INTERÉS COMPUESTO (línea interactiva) ───── */
  (function initCompuesto() {
    const ctx = document.getElementById('chart-compuesto');
    if (!ctx) return;

    const initial = 10000;
    const years = Array.from({ length: 31 }, (_, i) => i);

    function calcCI(rate, y) {
      return Math.round(initial * Math.pow(1 + rate / 100, y));
    }

    function fmtUSD(n) {
      return 'US$' + n.toLocaleString('es-AR');
    }

    function updateCards(rate) {
      const el10 = document.getElementById('ci-10');
      const el20 = document.getElementById('ci-20');
      const el30 = document.getElementById('ci-30');
      if (el10) el10.textContent = fmtUSD(calcCI(rate, 10));
      if (el20) el20.textContent = fmtUSD(calcCI(rate, 20));
      if (el30) el30.textContent = fmtUSD(calcCI(rate, 30));
    }

    function getLineData(rate) {
      return years.map(y => calcCI(rate, y));
    }

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: years.map(y => y === 0 ? 'Hoy' : 'Año ' + y),
        datasets: [
          {
            label: 'Capital + rendimiento',
            data: getLineData(7),
            borderColor: ACCENT,
            backgroundColor: 'rgba(62,74,61,0.07)',
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: ACCENT,
            borderWidth: 2,
          },
          {
            label: 'Capital inicial',
            data: Array(31).fill(initial),
            borderColor: BORDER,
            borderDash: [6, 4],
            fill: false,
            tension: 0,
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 1.5,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => '  ' + fmtUSD(ctx.parsed.y)
            }
          }
        },
        scales: {
          x: {
            ...baseScaleX,
            ticks: {
              ...baseScaleX.ticks,
              maxTicksLimit: 7,
              autoSkip: true
            }
          },
          y: {
            ...baseScaleY,
            ticks: {
              ...baseScaleY.ticks,
              callback: v => 'US$' + Math.round(v / 1000) + 'k'
            }
          }
        }
      }
    });

    /* Tabs interactivos */
    const tabsContainer = document.getElementById('rate-tabs');
    if (tabsContainer) {
      tabsContainer.addEventListener('click', function (e) {
        const btn = e.target.closest('.rate-tab');
        if (!btn) return;
        tabsContainer.querySelectorAll('.rate-tab').forEach(b => b.classList.remove('rate-tab--active'));
        btn.classList.add('rate-tab--active');
        const rate = parseInt(btn.dataset.rate, 10);
        updateCards(rate);
        chart.data.datasets[0].data = getLineData(rate);
        chart.update();
      });
    }

    /* Inicializar tarjetas con tasa por defecto */
    updateCards(7);
  })();


  /* ─── 3. GRÁFICO RADAR (Departamento vs ON) ──────────────────── */
  (function initRadar() {
    const ctx = document.getElementById('chart-radar');
    if (!ctx) return;

    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Rentabilidad', 'Liquidez', 'Accesibilidad', 'Bajo mantenimiento', 'Diversificación'],
        datasets: [
          {
            label: 'Departamento',
            data: [38, 15, 18, 22, 20],
            borderColor: MUTED,
            backgroundColor: 'rgba(158,157,150,0.12)',
            borderWidth: 2,
            borderDash: [5, 3],
            pointBackgroundColor: MUTED,
            pointRadius: 4,
          },
          {
            label: 'ON / FCI Dólar',
            data: [80, 85, 90, 92, 82],
            borderColor: ACCENT,
            backgroundColor: 'rgba(62,74,61,0.1)',
            borderWidth: 2,
            pointBackgroundColor: ACCENT,
            pointRadius: 4,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            grid:         { color: gridColor },
            angleLines:   { color: gridColor },
            ticks:        { display: false, stepSize: 25 },
            pointLabels:  {
              color: tickColor,
              font: { size: 12, family: "'Jost', sans-serif" }
            }
          }
        }
      }
    });
  })();


  /* ─── 4. GRÁFICOS DE CARTERA (donut por perfil) ──────────────── */
  function makeDonut(id, data, colors, labels) {
    const ctx = document.getElementById(id);
    if (!ctx) return;

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors,
          borderColor: BG,
          borderWidth: 3,
          hoverOffset: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '62%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => '  ' + ctx.label + ': ' + ctx.parsed + '%'
            }
          }
        }
      }
    });
  }

  /* Conservador */
  makeDonut(
    'chart-cartera-c',
    [50, 30, 15, 5],
    ['#2a7d5e', '#5caa86', '#9fd3bc', '#c8e8df'],
    ['Money Market', 'ON grado inversión', 'Lecap / Lebac', 'Cedears defensivos']
  );

  /* Moderado */
  makeDonut(
    'chart-cartera-m',
    [35, 25, 25, 15],
    [ACCENT, '#5a6b59', '#8fa08e', '#c0cbbf'],
    ['ON corporativas', 'FCI Dólar', 'Cedears diversificados', 'ETFs globales']
  );

  /* Agresivo */
  makeDonut(
    'chart-cartera-a',
    [50, 25, 15, 10],
    [SECONDARY, '#b09a71', '#c8b592', '#dfd0b3'],
    ['Cedears tecnológicos', 'ETFs S&P 500 / Nasdaq', 'Acciones locales', 'ON high yield']
  );

})();
