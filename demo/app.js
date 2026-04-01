let currentStep = 0;

function nextStep(step) {
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    currentStep = step;
    document.getElementById(`step-${currentStep}`).classList.add('active');
    
    // Logic for specific steps
    if (step === 3) {
        startWaitingRoom();
    }
    if (step === 4) {
        startVideo();
    }
}

function prevStep(step) {
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    currentStep = step;
    document.getElementById(`step-${currentStep}`).classList.add('active');
}

function toggleSymptom(element) {
    document.querySelectorAll('.symptom-item').forEach(el => el.classList.remove('active'));
    element.classList.add('active');
}

function simulatePayment() {
    const btn = document.querySelector('#step-2 .btn-primary');
    btn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> Procesando...';
    lucide.createIcons();
    
    setTimeout(() => {
        nextStep(3);
    }, 2000);
}

function startWaitingRoom() {
    const progress = document.getElementById('waiting-progress');
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => nextStep(4), 500);
        } else {
            width += 1;
            progress.style.width = width + '%';
        }
    }, 50); // 5 seconds total
}

async function startVideo() {
    const video = document.getElementById('localVideo');
    const fallback = document.getElementById('patient-fallback');
    
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        video.srcObject = stream;
        fallback.style.display = 'none';
    } catch (err) {
        console.log("Cámara no disponible o denegada");
        fallback.style.display = 'flex';
    }
}

function downloadMock(type) {
    alert(`Descargando ${type === 'receta' ? 'Receta Digital' : 'Certificado Médico'}... (Simulación)`);
}

function resetDemo() {
    // Stop video stream if active
    const video = document.getElementById('localVideo');
    if (video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
    }
    nextStep(0);
}

// Global styles for icons animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    .spin { animation: spin 1s linear infinite; }
`;
document.head.appendChild(style);
