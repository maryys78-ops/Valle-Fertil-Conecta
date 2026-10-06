// Datos de prueba iniciales
const solicitudesIniciales = [
  {
    id: 1,
    nombre: 'Daniel Sánchez',
    categoria: 'Retiro de Documentación',
    lugar: 'Centro Cívico (Planta Baja)',
    descripcion: 'Necesito retirar una certificación firmada en la oficina de Mesa de Entradas.',
    remuneracion: 4000,
    estado: 'Pendiente',
    fecha: '03/09/2026'
  },
  {
    id: 2,
    nombre: 'Antonia Quiroga',
    categoria: 'Compras por Encargo',
    lugar: 'Peatonal Tucumán',
    descripcion: 'Comprar un repuesto técnico en la casa de electrónica que no se consigue en Valle Fértil.',
    remuneracion: 5000,
    estado: 'Pendiente',
    fecha: '03/09/2026'
  }
];

let solicitudes = JSON.parse(localStorage.getItem('valle_conecta_datos')) || solicitudesIniciales;

function guardarEnLocalStorage() {
  localStorage.setItem('valle_conecta_datos', JSON.stringify(solicitudes));
}

function cambiarVista(vista) {
  const vistaPublicar = document.getElementById('vista-publicar');
  const vistaSolicitudes = document.getElementById('vista-solicitudes');

  if (vista === 'publicar') {
    vistaPublicar.classList.remove('hidden');
    vistaSolicitudes.classList.add('hidden');
  } else {
    vistaPublicar.classList.add('hidden');
    vistaSolicitudes.classList.remove('hidden');
    renderizarSolicitudes();
  }
}

function guardarSolicitud(e) {
  e.preventDefault();

  const nuevaSolicitud = {
    id: Date.now(),
    nombre: document.getElementById('nombre').value,
    categoria: document.getElementById('categoria').value,
    remuneracion: document.getElementById('remuneracion').value,
    lugar: document.getElementById('lugar').value,
    descripcion: document.getElementById('descripcion').value,
    estado: 'Pendiente',
    fecha: new Date().toLocaleDateString('es-AR')
  };

  solicitudes.unshift(nuevaSolicitud);
  guardarEnLocalStorage();
  document.getElementById('form-solicitud').reset();
  alert('¡Solicitud publicada con éxito!');
  cambiarVista('ver-solicitudes');
}

function tomarGestion(id) {
  const index = solicitudes.findIndex((s) => s.id === id);
  if (index !== -1) {
    solicitudes[index].estado = 'Aceptado';
    guardarEnLocalStorage();
    renderizarSolicitudes();
    alert('¡Has aceptado esta gestión! Se enviará una notificación al solicitante para coordinar.');
  }
}

function renderizarSolicitudes() {
  const contenedor = document.getElementById('contenedor-tarjetas');
  const contador = document.getElementById('contador-pedidos');
  contenedor.innerHTML = '';

  contador.innerText = `${solicitudes.length} Pedido(s)`;

  if (solicitudes.length === 0) {
    contenedor.innerHTML = '<p class="text-gray-500 col-span-3 text-center py-8">No hay solicitudes activas por el momento.</p>';
    return;
  }

  solicitudes.forEach((item) => {
    const esPendiente = item.estado === 'Pendiente';
    const tarjetaHtml = `
      <div class="card bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col justify-between">
        <div class="p-5">
          <div class="flex justify-between items-start mb-3">
            <span class="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded">${item.categoria}</span>
            <span class="text-xs text-gray-400"><i class="fa-regular fa-clock mr-1"></i>${item.fecha}</span>
          </div>
          <h3 class="font-bold text-lg text-gray-800 mb-1">${item.descripcion}</h3>
          <p class="text-sm text-gray-600 mb-2"><i class="fa-solid fa-location-dot text-red-500 mr-1"></i> <strong>Lugar:</strong> ${item.lugar}</p>
          <p class="text-sm text-gray-600 mb-4"><i class="fa-solid fa-user text-emerald-600 mr-1"></i> <strong>Solicitado por:</strong> ${item.nombre}</p>
        </div>
        <div class="bg-gray-50 px-5 py-3 border-t flex justify-between items-center mt-auto">
          <div>
            <span class="text-xs text-gray-500 block">Pago propuesto</span>
            <span class="text-lg font-bold text-emerald-700">$${item.remuneracion} ARS</span>
          </div>
          ${esPendiente ? `
            <button onclick="tomarGestion(${item.id})" class="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow transition">
              Tomar Trabajo
            </button>
          ` : `
            <span class="bg-gray-200 text-gray-700 text-xs font-bold px-3 py-1 rounded-full">
              <i class="fa-solid fa-check mr-1"></i> Aceptado
            </span>
          `}
        </div>
      </div>
    `;
    contenedor.innerHTML += tarjetaHtml;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderizarSolicitudes();
});

window.cambiarVista = cambiarVista;
window.guardarSolicitud = guardarSolicitud;
window.tomarGestion = tomarGestion;
