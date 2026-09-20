/**
 * Cinematic 3D Workstation Desk Scene — Scrollytelling
 * Procedural Three.js workstation with architectural acoustic slat wall,
 * floating backlit bookshelf, designer articulated desk lamp, and smooth camera journey.
 */

(function initScene() {
  if (typeof THREE === 'undefined' || typeof gsap === 'undefined') {
    setTimeout(initScene, 50);
    return;
  }

  const canvas = document.getElementById('webgl-canvas');
  if (!canvas) return;

  /* ──────────────────────────────────────────────
     RENDERER & SCENE SETUP
  ────────────────────────────────────────────── */
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0c16, 0.028);

  const camera = new THREE.PerspectiveCamera(44, window.innerWidth / window.innerHeight, 0.1, 100);
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.18;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  /* ──────────────────────────────────────────────
     PROCEDURAL TEXTURE GENERATORS
  ────────────────────────────────────────────── */

  // 1. Name Card Texture
  function createNameCardTexture() {
    const cvs = document.createElement('canvas');
    cvs.width = 1024;
    cvs.height = 600;
    const ctx = cvs.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 1024, 600);
    grad.addColorStop(0, '#151728');
    grad.addColorStop(1, '#0e101d');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 600);

    ctx.strokeStyle = 'rgba(253, 126, 20, 0.7)';
    ctx.lineWidth = 14;
    ctx.strokeRect(24, 24, 976, 552);

    ctx.strokeStyle = 'rgba(32, 201, 151, 0.5)';
    ctx.lineWidth = 3;
    ctx.strokeRect(36, 36, 952, 528);

    ctx.fillStyle = 'rgba(253, 126, 20, 0.15)';
    ctx.beginPath();
    ctx.arc(140, 150, 60, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fd7e14';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = '#fd7e14';
    ctx.font = 'bold 44px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('JS', 140, 165);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 54px Inter, sans-serif';
    ctx.fillText('LOH JUN SIANG', 230, 145);

    ctx.fillStyle = '#20c997';
    ctx.font = '600 28px Inter, sans-serif';
    ctx.fillText('DATA & BUSINESS ANALYST', 230, 190);

    const divGrad = ctx.createLinearGradient(80, 0, 944, 0);
    divGrad.addColorStop(0, '#fd7e14');
    divGrad.addColorStop(1, '#20c997');
    ctx.fillStyle = divGrad;
    ctx.fillRect(80, 260, 864, 4);

    ctx.font = '500 24px Inter, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('• Python & SQL Analytics', 100, 330);
    ctx.fillText('• LLM & Agentic Workflows (LangGraph)', 100, 380);
    ctx.fillText('• Simulation & Mathematical Optimization', 100, 430);
    ctx.fillText('• Operations Research (SUTD ESD Honours)', 100, 480);

    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '22px Inter, sans-serif';
    ctx.fillText('juns26.github.io/Portfolio', 944, 530);

    const tex = new THREE.CanvasTexture(cvs);
    tex.anisotropy = 8;
    return tex;
  }

  // 2. Resume Paper Texture (Clean document without solid block)
  function createResumeTexture() {
    const cvs = document.createElement('canvas');
    cvs.width = 1000;
    cvs.height = 1400;
    const ctx = cvs.getContext('2d');

    // Clean off-white paper
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, 1000, 1400);

    // Clean header text
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 46px Inter, sans-serif';
    ctx.fillText('LOH JUN SIANG', 80, 105);

    ctx.fillStyle = '#fd7e14';
    ctx.font = '600 22px Inter, sans-serif';
    ctx.fillText('CURRICULUM VITAE & PROFESSIONAL EXPERIENCE', 80, 145);

    // Elegant divider rule
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(80, 175);
    ctx.lineTo(920, 175);
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 28px Inter, sans-serif';
    ctx.fillText('WORK EXPERIENCE', 80, 240);
    ctx.fillStyle = '#fd7e14';
    ctx.fillRect(80, 250, 840, 3);

    const roles = [
      { title: 'Technology Development Programme', org: 'UOB', date: '2026 – Present', desc: 'Contact Centre analytics, automation and data-driven systems.' },
      { title: 'UIUX & Data Engineer Intern', org: 'Singapore Medical Group', date: 'Sept 2025 – Dec 2025', desc: 'Patient metrics validation with MySQL across 30+ clinics.' },
      { title: 'Business Partner Intern', org: 'Singapore Exchange', date: 'Jun 2025 – Sept 2025', desc: 'Snowflake & SAP financial pipelines, Power Query.' },
      { title: 'Business Development Intern', org: 'Shopee', date: 'Aug 2024 – Dec 2024', desc: 'ArcGIS geospatial optimization for drop-off points.' },
      { title: 'Research Assistant', org: 'SUTD', date: 'May 2023 – Dec 2023', desc: 'Metasurfaces optics simulation, Physical Review Letters paper.' }
    ];

    let y = 295;
    roles.forEach(r => {
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 22px Inter, sans-serif';
      ctx.fillText(r.title + ' — ' + r.org, 90, y);

      ctx.fillStyle = '#64748b';
      ctx.font = '600 18px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(r.date, 920, y);
      ctx.textAlign = 'left';

      ctx.fillStyle = '#334155';
      ctx.font = '19px Inter, sans-serif';
      ctx.fillText(r.desc, 90, y + 28);
      y += 85;
    });

    const tex = new THREE.CanvasTexture(cvs);
    tex.anisotropy = 8;
    return tex;
  }

  // Helper for drawing keyboard keys
  function drawKeyCap(ctx, x, y, w, h, label, col, fontSize) {
    ctx.fillStyle = '#0a0c14';
    ctx.beginPath();
    ctx.roundRect(x + 1, y + 2, w - 2, h - 2, 5);
    ctx.fill();

    const keyGrad = ctx.createLinearGradient(x, y, x, y + h);
    keyGrad.addColorStop(0, '#222736');
    keyGrad.addColorStop(1, '#161a25');
    ctx.fillStyle = keyGrad;
    ctx.beginPath();
    ctx.roundRect(x, y, w - 2, h - 2, 5);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.stroke();

    if (label) {
      ctx.fillStyle = col;
      ctx.font = `600 ${fontSize}px Inter, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, x + (w - 2) / 2, y + (h - 2) / 2);
    }
  }

  // Detailed MacBook Pro-style Keyboard Texture (Keys, backlighting & speakers)
  function createKeyboardTexture() {
    const cvs = document.createElement('canvas');
    cvs.width = 1280;
    cvs.height = 540;
    const ctx = cvs.getContext('2d');

    // Dark keyboard well
    ctx.fillStyle = '#0b0e17';
    ctx.fillRect(0, 0, 1280, 540);

    // Left and Right Perforated Speaker Grilles
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    for (let gx = 22; gx < 75; gx += 5) {
      for (let gy = 25; gy < 515; gy += 6) {
        ctx.fillRect(gx, gy, 2, 2);
      }
    }
    for (let gx = 1205; gx < 1258; gx += 5) {
      for (let gy = 25; gy < 515; gy += 6) {
        ctx.fillRect(gx, gy, 2, 2);
      }
    }

    const kX = 95;
    const kW = 1090;
    const kY = 22;

    // Row 1: Function Keys (14 keys)
    const fKeys = ['esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', '⌽'];
    const fKeyW = (kW - 13 * 6) / 14;
    fKeys.forEach((k, i) => {
      drawKeyCap(ctx, kX + i * (fKeyW + 6), kY, fKeyW, 55, k, '#94a3b8', 14);
    });

    // Row 2: Number row (14 keys)
    const numKeys = ['~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'delete'];
    const r2Y = kY + 63;
    const numKeyW = (kW - 13 * 6) / 14;
    numKeys.forEach((k, i) => {
      drawKeyCap(ctx, kX + i * (numKeyW + 6), r2Y, numKeyW, 70, k, '#f8fafc', 17);
    });

    // Row 3: QWERTY row (14 keys)
    const qKeys = ['tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'];
    const r3Y = r2Y + 78;
    const qKeyW = (kW - 13 * 6) / 14;
    qKeys.forEach((k, i) => {
      drawKeyCap(ctx, kX + i * (qKeyW + 6), r3Y, qKeyW, 70, k, '#f8fafc', 17);
    });

    // Row 4: ASDF row (13 keys)
    const aKeys = ['caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'return'];
    const r4Y = r3Y + 78;
    const aKeyW = (kW - 12 * 6) / 13;
    aKeys.forEach((k, i) => {
      drawKeyCap(ctx, kX + i * (aKeyW + 6), r4Y, aKeyW, 70, k, '#f8fafc', 17);
    });

    // Row 5: ZXCV row (12 keys)
    const zKeys = ['shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'shift'];
    const r5Y = r4Y + 78;
    const zKeyW = (kW - 11 * 6) / 12;
    zKeys.forEach((k, i) => {
      drawKeyCap(ctx, kX + i * (zKeyW + 6), r5Y, zKeyW, 70, k, '#f8fafc', 17);
    });

    // Row 6: Bottom row with Spacebar & Arrow keys
    const r6Y = r5Y + 78;
    drawKeyCap(ctx, kX, r6Y, 70, 75, 'fn', '#94a3b8', 14);
    drawKeyCap(ctx, kX + 76, r6Y, 70, 75, 'control', '#94a3b8', 13);
    drawKeyCap(ctx, kX + 152, r6Y, 75, 75, 'option', '#94a3b8', 13);
    drawKeyCap(ctx, kX + 233, r6Y, 92, 75, 'command', '#94a3b8', 13);
    // Spacebar
    drawKeyCap(ctx, kX + 331, r6Y, 416, 75, '', '#f8fafc', 14);
    drawKeyCap(ctx, kX + 753, r6Y, 92, 75, 'command', '#94a3b8', 13);
    drawKeyCap(ctx, kX + 851, r6Y, 75, 75, 'option', '#94a3b8', 13);
    drawKeyCap(ctx, kX + 932, r6Y, 48, 75, '◄', '#94a3b8', 16);
    drawKeyCap(ctx, kX + 986, r6Y, 48, 35, '▲', '#94a3b8', 12);
    drawKeyCap(ctx, kX + 986, r6Y + 40, 48, 35, '▼', '#94a3b8', 12);
    drawKeyCap(ctx, kX + 1040, r6Y, 48, 75, '►', '#94a3b8', 16);

    const tex = new THREE.CanvasTexture(cvs);
    tex.anisotropy = 8;
    return tex;
  }

  // 3. Framed Certificate Texture
  function createCertificateTexture() {
    const cvs = document.createElement('canvas');
    cvs.width = 1200;
    cvs.height = 850;
    const ctx = cvs.getContext('2d');

    ctx.fillStyle = '#fffdf7';
    ctx.fillRect(0, 0, 1200, 850);

    ctx.strokeStyle = '#c5a059';
    ctx.lineWidth = 14;
    ctx.strokeRect(30, 30, 1140, 790);

    ctx.strokeStyle = '#292524';
    ctx.lineWidth = 3;
    ctx.strokeRect(48, 48, 1104, 754);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#991b1b';
    ctx.font = 'bold 36px Georgia, serif';
    ctx.fillText('SINGAPORE UNIVERSITY OF TECHNOLOGY AND DESIGN', 600, 140);

    ctx.fillStyle = '#78716c';
    ctx.font = 'italic 24px Georgia, serif';
    ctx.fillText('This is to certify that', 600, 210);

    ctx.fillStyle = '#1c1917';
    ctx.font = 'bold 56px Georgia, serif';
    ctx.fillText('LOH JUN SIANG', 600, 290);

    ctx.fillStyle = '#78716c';
    ctx.font = '22px Georgia, serif';
    ctx.fillText('has been admitted to the Degree of', 600, 350);

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 38px Georgia, serif';
    ctx.fillText('BACHELOR OF ENGINEERING', 600, 410);

    ctx.fillStyle = '#c5a059';
    ctx.font = 'bold 30px Georgia, serif';
    ctx.fillText('HONOURS (HIGHEST DISTINCTION)', 600, 465);

    ctx.fillStyle = '#44403c';
    ctx.font = '22px Georgia, serif';
    ctx.fillText('Engineering Systems and Design — Business Analytics & Minor in Computer Science', 600, 520);

    ctx.save();
    ctx.translate(600, 660);
    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.arc(0, 0, 60, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px Inter, sans-serif';
    ctx.fillText('SUTD', 0, -8);
    ctx.font = '14px Inter, sans-serif';
    ctx.fillText('SCHOLAR', 0, 14);
    ctx.restore();

    const tex = new THREE.CanvasTexture(cvs);
    tex.anisotropy = 8;
    return tex;
  }

  // 4. Laptop Screen Texture
  function createLaptopScreenTexture() {
    const cvs = document.createElement('canvas');
    cvs.width = 1280;
    cvs.height = 800;
    const ctx = cvs.getContext('2d');

    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, 1280, 800);

    ctx.fillStyle = '#131b2e';
    ctx.fillRect(0, 0, 1280, 45);

    const dots = [['#ff5f56', 30], ['#ffbd2e', 55], ['#27c93f', 80]];
    dots.forEach(([col, x]) => {
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(x, 22, 7, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.fillStyle = '#64748b';
    ctx.font = '16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('junsiang@portfolio-terminal: ~/contact', 640, 28);
    ctx.textAlign = 'left';

    ctx.fillStyle = '#20c997';
    ctx.font = '24px "Fira Code", monospace';
    ctx.fillText('$ ./connect_with_jun_siang.sh --all', 50, 100);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '20px "Fira Code", monospace';
    ctx.fillText('Initializing channels... [OK]', 50, 140);
    ctx.fillText('Establishing secure handshake... [CONNECTED]', 50, 175);

    const drawTerminalCard = (y, label, val, color) => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(50, y, 1180, 80);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(50, y, 1180, 80);

      ctx.fillStyle = color;
      ctx.font = 'bold 24px "Fira Code", monospace';
      ctx.fillText(`[ ${label} ]`, 80, y + 48);

      ctx.fillStyle = '#f8fafc';
      ctx.font = '22px "Fira Code", monospace';
      ctx.fillText(val, 340, y + 48);
    };

    drawTerminalCard(220, 'EMAIL', 'lohjunsiang26@gmail.com', '#fd7e14');
    drawTerminalCard(330, 'LINKEDIN', 'linkedin.com/in/loh-jun-siang-928a0122b', '#38bdf8');
    drawTerminalCard(440, 'GITHUB', 'github.com/Juns26', '#a78bfa');

    ctx.fillStyle = '#34d399';
    ctx.font = '20px "Fira Code", monospace';
    ctx.fillText('● Ready to build data & AI solutions. Let\'s get in touch!', 50, 580);

    const tex = new THREE.CanvasTexture(cvs);
    tex.anisotropy = 8;
    return tex;
  }

  // 5. Cork Board Texture (Populated with the 7 Project Cards)
  function createCorkTexture() {
    const cvs = document.createElement('canvas');
    cvs.width = 1600;
    cvs.height = 900;
    const ctx = cvs.getContext('2d');

    // Rich warm cork surface
    ctx.fillStyle = '#b78754';
    ctx.fillRect(0, 0, 1600, 900);

    // Procedural cork pores and specks
    for (let i = 0; i < 28000; i++) {
      const rx = Math.random() * 1600;
      const ry = Math.random() * 900;
      const rSize = Math.random() * 3 + 1;
      const dark = Math.random() > 0.45;
      ctx.fillStyle = dark ? 'rgba(84, 52, 26, 0.28)' : 'rgba(238, 198, 148, 0.22)';
      ctx.fillRect(rx, ry, rSize, rSize);
    }

    // Top Pinned Title Banner on Corkboard
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 4;
    ctx.fillStyle = '#111726';
    ctx.fillRect(520, 30, 560, 60);
    ctx.strokeStyle = '#fd7e14';
    ctx.lineWidth = 3;
    ctx.strokeRect(520, 30, 560, 60);

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 26px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('📌 FEATURED PROJECT SHOWCASE', 800, 70);
    ctx.restore();

    // 7 Project cards populated on the corkboard (4 top row, 3 bottom row)
    const projects = [
      // Top Row
      { x: 90,  y: 130, w: 320, h: 320, grad: ['#a18cd1', '#fbc2eb'], icon: '🎙️', title: 'OdioCheck', tag: 'Deepfake Audio Detection', rot: -0.025, pin: '#ef4444' },
      { x: 450, y: 135, w: 320, h: 320, grad: ['#84fab0', '#8fd3f4'], icon: '✈️', title: 'Airport CAST Sim', tag: 'Single Runway Optimization', rot: 0.02, pin: '#3b82f6' },
      { x: 810, y: 130, w: 320, h: 320, grad: ['#fccb90', '#d57eeb'], icon: '📈', title: 'ThetaPilot AI', tag: 'Agentic Options Workflow', rot: -0.015, pin: '#ef4444' },
      { x: 1170, y: 135, w: 320, h: 320, grad: ['#e0c3fc', '#8ec5fc'], icon: '🔋', title: 'EV City Sim', tag: 'Agent-Based Adoption Model', rot: 0.03, pin: '#f59e0b' },
      // Bottom Row
      { x: 230, y: 490, w: 340, h: 340, grad: ['#4facfe', '#00f2fe'], icon: '📊', title: 'R Shiny PM App', tag: 'CPM, Gantt & Resource Tool', rot: 0.02, pin: '#ef4444' },
      { x: 630, y: 495, w: 340, h: 340, grad: ['#ff0844', '#ffb199'], icon: '📉', title: 'Health365 Study', tag: 'Youth UX Data Analytics', rot: -0.02, pin: '#10b981' },
      { x: 1030, y: 490, w: 340, h: 340, grad: ['#43e97b', '#38f9d7'], icon: '🔬', title: 'Metasurfaces', tag: 'SUTD Optics Research (PRL)', rot: 0.025, pin: '#ef4444' }
    ];

    projects.forEach(p => {
      ctx.save();
      const cx = p.x + p.w / 2;
      const cy = p.y + p.h / 2;
      ctx.translate(cx, cy);
      ctx.rotate(p.rot);

      // Card Drop Shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 16;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 8;

      // Card Background
      ctx.fillStyle = '#0f1422';
      ctx.beginPath();
      ctx.roundRect(-p.w / 2, -p.h / 2, p.w, p.h, 14);
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(p.rot);

      // Card Gradient Banner
      const bannerHeight = 110;
      const bGrad = ctx.createLinearGradient(-p.w / 2, -p.h / 2, p.w / 2, -p.h / 2 + bannerHeight);
      bGrad.addColorStop(0, p.grad[0]);
      bGrad.addColorStop(1, p.grad[1]);

      ctx.fillStyle = bGrad;
      ctx.beginPath();
      ctx.roundRect(-p.w / 2, -p.h / 2, p.w, bannerHeight, [14, 14, 0, 0]);
      ctx.fill();

      // Icon on Banner
      ctx.font = '46px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(p.icon, 0, -p.h / 2 + 75);

      // Card Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 25px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(p.title, 0, -p.h / 2 + 165);

      // Card Tagline (Concise)
      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 17px Inter, sans-serif';
      ctx.fillText(p.tag, 0, -p.h / 2 + 205);

      // Mini Pill Tag
      ctx.fillStyle = 'rgba(253, 126, 20, 0.15)';
      ctx.beginPath();
      ctx.roundRect(-75, -p.h / 2 + 235, 150, 32, 16);
      ctx.fill();
      ctx.strokeStyle = 'rgba(253, 126, 20, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#fd7e14';
      ctx.font = '600 13px Inter, sans-serif';
      ctx.fillText('VIEW PROJECT ▸', 0, -p.h / 2 + 256);

      // Pushpin with shiny spherical head
      ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 4;
      ctx.beginPath();
      ctx.arc(0, -p.h / 2 + 15, 11, 0, Math.PI * 2);
      ctx.fillStyle = p.pin;
      ctx.fill();
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Pushpin highlight
      ctx.beginPath();
      ctx.arc(-3, -p.h / 2 + 12, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fill();

      ctx.restore();
    });

    const tex = new THREE.CanvasTexture(cvs);
    tex.anisotropy = 8;
    return tex;
  }

  /* ──────────────────────────────────────────────
     SCENE OBJECT BUILDER — HIGH QUALITY WORKSTATION
  ────────────────────────────────────────────── */
  const deskGroup = new THREE.Group();
  scene.add(deskGroup);

  // 1. Back Wall (Smooth modern studio wall)
  const wallGeo = new THREE.PlaneGeometry(36, 24);
  const wallMat = new THREE.MeshStandardMaterial({
    color: 0x101320,
    roughness: 0.85,
    metalness: 0.1
  });
  const wall = new THREE.Mesh(wallGeo, wallMat);
  wall.position.set(0, 7, -3.2);
  wall.receiveShadow = true;
  deskGroup.add(wall);

  // Floating Bookshelf above desk (left/upper wall)
  const shelfGroup = new THREE.Group();
  shelfGroup.position.set(-3.2, 5.8, -2.85);
  deskGroup.add(shelfGroup);

  const shelfMat = new THREE.MeshStandardMaterial({ color: 0x241710, roughness: 0.4 });
  const shelfMesh = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.14, 0.9), shelfMat);
  shelfMesh.castShadow = true;
  shelfMesh.receiveShadow = true;
  shelfGroup.add(shelfMesh);

  // Under-shelf warm LED strip
  const shelfLight = new THREE.PointLight(0xffbe5c, 1.8, 6.5);
  shelfLight.position.set(0, -0.2, 0.2);
  shelfGroup.add(shelfLight);

  // Books on shelf
  const bookColors = [0x1e3a8a, 0x047857, 0x991b1b, 0xd97706, 0x334155, 0x475569, 0x1e293b, 0x0284c7];
  for (let b = 0; b < 10; b++) {
    const bHeight = 0.55 + Math.random() * 0.25;
    const bWidth = 0.08 + Math.random() * 0.04;
    const bMat = new THREE.MeshStandardMaterial({ color: bookColors[b % bookColors.length], roughness: 0.4 });
    const book = new THREE.Mesh(new THREE.BoxGeometry(bWidth, bHeight, 0.55), bMat);
    book.position.set(-2.4 + b * 0.16, 0.07 + bHeight / 2, 0);
    book.castShadow = true;
    shelfGroup.add(book);
  }

  // Trailing plant on shelf corner
  const shelfPot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.24, 0.18, 0.35, 16),
    new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.3 })
  );
  shelfPot.position.set(2.4, 0.24, 0);
  shelfGroup.add(shelfPot);

  const shelfPlantMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.4 });
  for (let p = 0; p < 8; p++) {
    const vine = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.7, 8), shelfPlantMat);
    vine.position.set(2.4 + (Math.random() - 0.5) * 0.2, 0.1 - Math.random() * 0.4, 0.18 + Math.random() * 0.1);
    vine.rotation.z = (Math.random() - 0.5) * 0.4;
    shelfGroup.add(vine);
  }

  // Floor
  const floorGeo = new THREE.PlaneGeometry(36, 24);
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x090b14,
    roughness: 0.5,
    metalness: 0.2
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, -3.2, 2);
  floor.receiveShadow = true;
  deskGroup.add(floor);

  // 2. Large Wooden Desk Surface
  const deskTopGeo = new THREE.BoxGeometry(13.8, 0.34, 6.4);
  const deskTopMat = new THREE.MeshStandardMaterial({
    color: 0x1f140e, // Deep dark walnut
    roughness: 0.32,
    metalness: 0.08
  });
  const deskTop = new THREE.Mesh(deskTopGeo, deskTopMat);
  deskTop.position.set(0, 0, 0.4);
  deskTop.castShadow = true;
  deskTop.receiveShadow = true;
  deskGroup.add(deskTop);

  // Rear Desk Ambient Glow Strip
  const glowStripGeo = new THREE.BoxGeometry(13.6, 0.04, 0.04);
  const glowStripMat = new THREE.MeshBasicMaterial({ color: 0xfd7e14 });
  const glowStrip = new THREE.Mesh(glowStripGeo, glowStripMat);
  glowStrip.position.set(0, 0.18, -2.65);
  deskGroup.add(glowStrip);

  const deskBackLight = new THREE.PointLight(0xfd7e14, 1.4, 8);
  deskBackLight.position.set(0, 0.6, -2.6);
  deskGroup.add(deskBackLight);

  // Desk legs
  const legMat = new THREE.MeshStandardMaterial({ color: 0x161618, roughness: 0.4, metalness: 0.8 });
  const legGeo = new THREE.CylinderGeometry(0.12, 0.12, 3.2, 16);
  [[-6.3, -1.6, -2.1], [6.3, -1.6, -2.1], [-6.3, -1.6, 2.9], [6.3, -1.6, 2.9]].forEach(([lx, ly, lz]) => {
    const leg = new THREE.Mesh(legGeo, legMat);
    leg.position.set(lx, ly, lz);
    leg.castShadow = true;
    deskGroup.add(leg);
  });

  // Leather Desk Mat
  const matGeo = new THREE.BoxGeometry(6.6, 0.02, 2.9);
  const matMat = new THREE.MeshStandardMaterial({ color: 0x12141f, roughness: 0.7 });
  const deskMat = new THREE.Mesh(matGeo, matMat);
  deskMat.position.set(0, 0.18, 0.5);
  deskMat.receiveShadow = true;
  deskGroup.add(deskMat);

  // 3. Cork Board Mounted on Wall
  const corkFrameGeo = new THREE.BoxGeometry(10.2, 5.2, 0.18);
  const corkFrameMat = new THREE.MeshStandardMaterial({ color: 0x7a4e27, roughness: 0.5 });
  const corkFrame = new THREE.Mesh(corkFrameGeo, corkFrameMat);
  corkFrame.position.set(0, 3.2, -3.02);
  deskGroup.add(corkFrame);

  const corkBoardGeo = new THREE.PlaneGeometry(9.8, 4.8);
  const corkBoardMat = new THREE.MeshStandardMaterial({
    map: createCorkTexture(),
    roughness: 0.85
  });
  const corkBoard = new THREE.Mesh(corkBoardGeo, corkBoardMat);
  corkBoard.position.set(0, 3.2, -2.91);
  deskGroup.add(corkBoard);

  // 4. Laptop (High-Detail Industrial Design)
  const laptopGroup = new THREE.Group();
  laptopGroup.position.set(0, 0.19, 0.45);
  deskGroup.add(laptopGroup);

  const laptopMat = new THREE.MeshStandardMaterial({ color: 0x222632, metalness: 0.88, roughness: 0.22 });
  const laptopBaseGeo = new THREE.BoxGeometry(2.9, 0.06, 1.95);
  const laptopBase = new THREE.Mesh(laptopBaseGeo, laptopMat);
  laptopBase.castShadow = true;
  laptopBase.receiveShadow = true;
  laptopGroup.add(laptopBase);

  // Front Thumb Opening Notch
  const notchGeo = new THREE.BoxGeometry(0.5, 0.02, 0.03);
  const notchMat = new THREE.MeshStandardMaterial({ color: 0x141722, roughness: 0.5 });
  const notch = new THREE.Mesh(notchGeo, notchMat);
  notch.position.set(0, 0.022, 0.97);
  laptopGroup.add(notch);

  // Detailed 6-Row Backlit Keyboard Tray
  const kbGeo = new THREE.PlaneGeometry(2.54, 1.08);
  const kbMat = new THREE.MeshStandardMaterial({
    map: createKeyboardTexture(),
    roughness: 0.35,
    metalness: 0.15
  });
  const keyboardMesh = new THREE.Mesh(kbGeo, kbMat);
  keyboardMesh.rotation.x = -Math.PI / 2;
  keyboardMesh.position.set(0, 0.032, -0.26);
  laptopGroup.add(keyboardMesh);

  // Large Precision Glass Trackpad
  const tpGeo = new THREE.BoxGeometry(0.96, 0.012, 0.62);
  const tpMat = new THREE.MeshStandardMaterial({
    color: 0x1d222e,
    metalness: 0.75,
    roughness: 0.22
  });
  const trackpad = new THREE.Mesh(tpGeo, tpMat);
  trackpad.position.set(0, 0.032, 0.52);
  laptopGroup.add(trackpad);

  // Trackpad fine hairline border
  const tpBorderGeo = new THREE.PlaneGeometry(0.97, 0.63);
  const tpBorderMat = new THREE.MeshBasicMaterial({ color: 0x384156, wireframe: true });
  const tpBorder = new THREE.Mesh(tpBorderGeo, tpBorderMat);
  tpBorder.rotation.x = -Math.PI / 2;
  tpBorder.position.set(0, 0.034, 0.52);
  laptopGroup.add(tpBorder);

  // Display Hinge
  const hingeGeo = new THREE.CylinderGeometry(0.04, 0.04, 2.6, 16);
  const hingeMat = new THREE.MeshStandardMaterial({ color: 0x12151e, metalness: 0.9, roughness: 0.3 });
  const hingeMesh = new THREE.Mesh(hingeGeo, hingeMat);
  hingeMesh.rotation.z = Math.PI / 2;
  hingeMesh.position.set(0, 0.03, -0.96);
  laptopGroup.add(hingeMesh);

  const screenHinge = new THREE.Group();
  screenHinge.position.set(0, 0.03, -0.95);
  screenHinge.rotation.x = THREE.MathUtils.degToRad(-15);
  laptopGroup.add(screenHinge);

  const lidGeo = new THREE.BoxGeometry(2.9, 1.85, 0.05);
  const lid = new THREE.Mesh(lidGeo, laptopMat);
  lid.position.set(0, 0.92, 0);
  lid.castShadow = true;
  screenHinge.add(lid);

  const screenGeo = new THREE.PlaneGeometry(2.76, 1.72);
  const screenMat = new THREE.MeshBasicMaterial({
    map: createLaptopScreenTexture()
  });
  const screenMesh = new THREE.Mesh(screenGeo, screenMat);
  screenMesh.position.set(0, 0.92, 0.028);
  screenHinge.add(screenMesh);

  const screenLight = new THREE.PointLight(0x38bdf8, 2.2, 4.5);
  screenLight.position.set(0, 1.1, 0.5);
  laptopGroup.add(screenLight);

  // Wireless Mouse
  const mouseGeo = new THREE.BoxGeometry(0.48, 0.15, 0.85);
  const mouse = new THREE.Mesh(mouseGeo, laptopMat);
  mouse.position.set(1.95, 0.25, 0.7);
  mouse.rotation.y = -0.15;
  deskGroup.add(mouse);

  // 5. Name Card (Left Desk)
  const nameCardGroup = new THREE.Group();
  nameCardGroup.position.set(-2.85, 0.18, 1.1);
  nameCardGroup.rotation.y = 0.22;
  deskGroup.add(nameCardGroup);

  const standGeo = new THREE.BoxGeometry(1.6, 0.03, 1.05);
  const standMat = new THREE.MeshStandardMaterial({ color: 0x181a26, metalness: 0.6, roughness: 0.3 });
  const stand = new THREE.Mesh(standGeo, standMat);
  stand.position.set(0, 0.015, 0);
  stand.receiveShadow = true;
  nameCardGroup.add(stand);

  const cardGeo = new THREE.BoxGeometry(1.5, 0.015, 0.9);
  const cardMat = new THREE.MeshStandardMaterial({
    map: createNameCardTexture(),
    roughness: 0.35,
    metalness: 0.15
  });
  const cardMesh = new THREE.Mesh(cardGeo, cardMat);
  cardMesh.position.set(0, 0.03, 0);
  cardMesh.castShadow = true;
  nameCardGroup.add(cardMesh);

  // 6. Resume Paper Stack (Right Desk)
  const resumeGroup = new THREE.Group();
  resumeGroup.position.set(2.65, 0.18, 0.95);
  resumeGroup.rotation.y = -0.18;
  deskGroup.add(resumeGroup);

  const paperStackGeo = new THREE.BoxGeometry(1.55, 0.04, 2.15);
  const paperStackMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.6 });
  const paperStack = new THREE.Mesh(paperStackGeo, paperStackMat);
  paperStack.position.set(0, 0.02, 0);
  paperStack.castShadow = true;
  paperStack.receiveShadow = true;
  resumeGroup.add(paperStack);

  const paperTopGeo = new THREE.PlaneGeometry(1.52, 2.12);
  const paperTopMat = new THREE.MeshStandardMaterial({
    map: createResumeTexture(),
    roughness: 0.6
  });
  const paperTop = new THREE.Mesh(paperTopGeo, paperTopMat);
  paperTop.rotation.x = -Math.PI / 2;
  paperTop.position.set(0, 0.045, 0);
  resumeGroup.add(paperTop);

  // Pen next to resume
  const penGroup = new THREE.Group();
  penGroup.position.set(1.0, 0.04, 0);
  penGroup.rotation.y = 0.1;
  resumeGroup.add(penGroup);

  const penGeo = new THREE.CylinderGeometry(0.025, 0.025, 1.4, 16);
  const penMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.85, roughness: 0.2 });
  const penMesh = new THREE.Mesh(penGeo, penMat);
  penMesh.rotation.x = Math.PI / 2;
  penGroup.add(penMesh);

  // 7. Certificate on Easel Stand (Right rear desk)
  const certGroup = new THREE.Group();
  certGroup.position.set(3.6, 0.19, -0.6);
  certGroup.rotation.y = -0.4;
  deskGroup.add(certGroup);

  const easelMat = new THREE.MeshStandardMaterial({ color: 0x3d271d, roughness: 0.6 });
  const easelLegGeo = new THREE.BoxGeometry(0.06, 1.6, 0.06);

  const legL = new THREE.Mesh(easelLegGeo, easelMat);
  legL.position.set(-0.55, 0.75, 0);
  legL.rotation.z = -0.12;
  certGroup.add(legL);

  const legR = new THREE.Mesh(easelLegGeo, easelMat);
  legR.position.set(0.55, 0.75, 0);
  legR.rotation.z = 0.12;
  certGroup.add(legR);

  const legBack = new THREE.Mesh(easelLegGeo, easelMat);
  legBack.position.set(0, 0.75, -0.45);
  legBack.rotation.x = -0.35;
  certGroup.add(legBack);

  const ledgeGeo = new THREE.BoxGeometry(1.7, 0.08, 0.14);
  const ledge = new THREE.Mesh(ledgeGeo, easelMat);
  ledge.position.set(0, 0.35, 0.05);
  certGroup.add(ledge);

  const frameGroup = new THREE.Group();
  frameGroup.position.set(0, 0.95, 0.02);
  frameGroup.rotation.x = -0.15;
  certGroup.add(frameGroup);

  const certFrameGeo = new THREE.BoxGeometry(1.65, 1.25, 0.06);
  const certFrameMat = new THREE.MeshStandardMaterial({ color: 0x1f1610, roughness: 0.4 });
  const certFrame = new THREE.Mesh(certFrameGeo, certFrameMat);
  certFrame.castShadow = true;
  frameGroup.add(certFrame);

  const certFaceGeo = new THREE.PlaneGeometry(1.52, 1.12);
  const certFaceMat = new THREE.MeshStandardMaterial({
    map: createCertificateTexture(),
    roughness: 0.4
  });
  const certFace = new THREE.Mesh(certFaceGeo, certFaceMat);
  certFace.position.z = 0.032;
  frameGroup.add(certFace);

  // 8. Overhead Soft Studio Lighting (Clean, open desk without lamp clutter)
  const warmDeskLight = new THREE.SpotLight(0xffecd1, 3.4, 16, Math.PI / 3, 0.55, 1.2);
  warmDeskLight.position.set(-2.0, 7.5, 3.5);
  warmDeskLight.target.position.set(-1.5, 0.2, 0.5);
  warmDeskLight.castShadow = true;
  scene.add(warmDeskLight);
  scene.add(warmDeskLight.target);

  // 9. Extra Props: Coffee Mug + Plant
  const mugGroup = new THREE.Group();
  mugGroup.position.set(-1.8, 0.18, -0.5);
  deskGroup.add(mugGroup);

  const mugMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.2 });
  const mugGeo = new THREE.CylinderGeometry(0.24, 0.22, 0.55, 24);
  const mug = new THREE.Mesh(mugGeo, mugMat);
  mug.position.y = 0.28;
  mug.castShadow = true;
  mugGroup.add(mug);

  const coffeeGeo = new THREE.CylinderGeometry(0.21, 0.21, 0.05, 24);
  const coffeeMat = new THREE.MeshStandardMaterial({ color: 0x3d2012, roughness: 0.1 });
  const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
  coffee.position.y = 0.52;
  mugGroup.add(coffee);

  const plantGroup = new THREE.Group();
  plantGroup.position.set(1.65, 0.18, -1.0);
  deskGroup.add(plantGroup);

  const potGeo = new THREE.CylinderGeometry(0.35, 0.26, 0.5, 16);
  const potMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.5 });
  const pot = new THREE.Mesh(potGeo, potMat);
  pot.position.y = 0.25;
  pot.castShadow = true;
  plantGroup.add(pot);

  const leafMat = new THREE.MeshStandardMaterial({ color: 0x2e7d32, roughness: 0.4 });
  for (let i = 0; i < 7; i++) {
    const leafGeo = new THREE.ConeGeometry(0.12, 0.45, 8);
    const leaf = new THREE.Mesh(leafGeo, leafMat);
    const angle = (i / 7) * Math.PI * 2;
    leaf.position.set(Math.cos(angle) * 0.15, 0.55, Math.sin(angle) * 0.15);
    leaf.rotation.x = Math.sin(angle) * 0.45;
    leaf.rotation.z = -Math.cos(angle) * 0.45;
    plantGroup.add(leaf);
  }

  // 10. Ambient Floating Dust Motes
  const dustCount = 180;
  const dustGeo = new THREE.BufferGeometry();
  const dustPositions = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount * 3; i += 3) {
    dustPositions[i] = (Math.random() - 0.5) * 14;
    dustPositions[i + 1] = Math.random() * 5 + 0.5;
    dustPositions[i + 2] = (Math.random() - 0.5) * 8;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
  const dustMat = new THREE.PointsMaterial({
    color: 0xffe8c8,
    size: 0.045,
    transparent: true,
    opacity: 0.45
  });
  const dustParticles = new THREE.Points(dustGeo, dustMat);
  scene.add(dustParticles);

  /* ──────────────────────────────────────────────
     LIGHTING & ENVIRONMENT
  ────────────────────────────────────────────── */
  const ambLight = new THREE.AmbientLight(0xdde5f5, 0.65);
  scene.add(ambLight);

  const overheadLight = new THREE.DirectionalLight(0xfff7ed, 1.8);
  overheadLight.position.set(2, 8, 6);
  overheadLight.castShadow = true;
  overheadLight.shadow.mapSize.width = 2048;
  overheadLight.shadow.mapSize.height = 2048;
  overheadLight.shadow.bias = -0.0005;
  scene.add(overheadLight);

  const orangeRim = new THREE.DirectionalLight(0xfd7e14, 1.3);
  orangeRim.position.set(-8, 3, -4);
  scene.add(orangeRim);

  const tealRim = new THREE.DirectionalLight(0x20c997, 1.4);
  tealRim.position.set(8, 4, 3);
  scene.add(tealRim);

  /* ──────────────────────────────────────────────
     CAMERA SCROLL JOURNEY WAYPOINTS
  ────────────────────────────────────────────── */
  const waypoints = [
    { p: 0.00, cam: [0, 4.4, 7.8],    look: [0, 1.2, 0] },
    { p: 0.08, cam: [-0.9, 2.8, 5.0], look: [-1.2, 0.7, 0.6] },
    { p: 0.16, cam: [-1.6, 2.0, 3.4], look: [-2.4, 0.4, 1.2] },    // Home (Name Card)
    { p: 0.26, cam: [0, 4.2, 7.4],    look: [0, 1.4, 0] },          // Pull back
    { p: 0.38, cam: [0, 3.2, 4.4],    look: [0, 3.2, -2.94] },      // Projects (Cork Board)
    { p: 0.48, cam: [0, 4.2, 7.4],    look: [0, 1.4, 0] },          // Pull back
    { p: 0.60, cam: [1.6, 2.1, 3.4],  look: [2.3, 0.4, 0.95] },     // Experience (Resume)
    { p: 0.70, cam: [0, 4.2, 7.4],    look: [0, 1.4, 0] },          // Pull back
    { p: 0.80, cam: [2.4, 1.8, 2.4],  look: [3.3, 1.1, -0.6] },     // Education (Certificate)
    { p: 0.90, cam: [0, 3.2, 5.6],    look: [0, 1.2, 0] },          // Pull back
    { p: 1.00, cam: [0, 1.35, 1.75],  look: [0, 1.15, -0.1] }       // Contact (Laptop)
  ];

  function getCameraState(t) {
    const clampedT = Math.max(0, Math.min(1, t));

    let idx = 0;
    for (let i = 0; i < waypoints.length - 1; i++) {
      if (clampedT >= waypoints[i].p && clampedT <= waypoints[i + 1].p) {
        idx = i;
        break;
      }
    }

    const w0 = waypoints[idx];
    const w1 = waypoints[idx + 1];
    const segmentT = (clampedT - w0.p) / (w1.p - w0.p);
    const easedT = segmentT * segmentT * (3 - 2 * segmentT);

    const cx = THREE.MathUtils.lerp(w0.cam[0], w1.cam[0], easedT);
    const cy = THREE.MathUtils.lerp(w0.cam[1], w1.cam[1], easedT);
    const cz = THREE.MathUtils.lerp(w0.cam[2], w1.cam[2], easedT);

    const lx = THREE.MathUtils.lerp(w0.look[0], w1.look[0], easedT);
    const ly = THREE.MathUtils.lerp(w0.look[1], w1.look[1], easedT);
    const lz = THREE.MathUtils.lerp(w0.look[2], w1.look[2], easedT);

    return { cam: [cx, cy, cz], look: [lx, ly, lz] };
  }

  let currentCamPos = new THREE.Vector3(0, 4.4, 7.8);
  let currentLookAt = new THREE.Vector3(0, 1.2, 0);
  let targetCamPos  = new THREE.Vector3(0, 4.4, 7.8);
  let targetLookAt  = new THREE.Vector3(0, 1.2, 0);

  let mouseX = 0;
  let mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 0.35;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.25;
  });

  /* ──────────────────────────────────────────────
     SCROLL SYNCHRONIZATION & SECTION OVERLAYS
  ────────────────────────────────────────────── */
  const sectionIds = ['intro', 'home', 'projects', 'experience', 'education', 'contact'];

  function getGlobalScrollProgress() {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return 0;
    return window.scrollY / totalHeight;
  }

  function updateActiveOverlays(progress) {
    const windowMid = window.innerHeight / 2;

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const isCentered = rect.top <= windowMid + 140 && rect.bottom >= windowMid - 140;

      if (isCentered) {
        el.classList.add('in-view');
      } else {
        el.classList.remove('in-view');
      }
    });

    const introEl = document.getElementById('intro');
    if (introEl) {
      if (window.scrollY < 120) {
        introEl.classList.add('in-view');
      } else {
        introEl.classList.remove('in-view');
      }
    }

    const navLinks = document.querySelectorAll('nav a');
    let activeId = 'home';
    if (progress < 0.06) activeId = 'intro';
    else if (progress <= 0.26) activeId = 'home';
    else if (progress <= 0.48) activeId = 'projects';
    else if (progress <= 0.70) activeId = 'experience';
    else if (progress <= 0.88) activeId = 'education';
    else activeId = 'contact';

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', () => {
    const prog = getGlobalScrollProgress();
    const st = getCameraState(prog);

    targetCamPos.set(st.cam[0], st.cam[1], st.cam[2]);
    targetLookAt.set(st.look[0], st.look[1], st.look[2]);

    updateActiveOverlays(prog);
  }, { passive: true });

  /* ──────────────────────────────────────────────
     SMOOTH NAV LINK CLICK HANDLER
     Handles clicking the top-right nav links (Home, Projects, etc.)
     or logo so it brings the user smoothly to the top of the content!
  ────────────────────────────────────────────── */
  function setupNavLinks() {
    const selector = 'nav a, .logo, .scroll-indicator, a[href^="#intro"], a[href^="#home"], a[href^="#projects"], a[href^="#experience"], a[href^="#education"], a[href^="#contact"]';
    document.querySelectorAll(selector).forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;

        // If clicking Home, Logo, or Intro: smoothly go directly to the top of the content!
        if (href === '#home' || href === '#intro' || href === '') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          // Scroll so the top of the section aligns comfortably below the fixed navbar
          const headerHeight = document.querySelector('header')?.offsetHeight || 75;
          const targetY = targetEl.offsetTop - headerHeight - 15;
          window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupNavLinks);
  } else {
    setupNavLinks();
  }

  // Initial trigger
  setTimeout(() => {
    const prog = getGlobalScrollProgress();
    const st = getCameraState(prog);
    currentCamPos.set(st.cam[0], st.cam[1], st.cam[2]);
    currentLookAt.set(st.look[0], st.look[1], st.look[2]);
    targetCamPos.copy(currentCamPos);
    targetLookAt.copy(currentLookAt);
    updateActiveOverlays(prog);
  }, 100);

  /* ──────────────────────────────────────────────
     ANIMATION LOOP
  ────────────────────────────────────────────── */
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsed = clock.getElapsedTime();

    currentCamPos.lerp(targetCamPos, 0.065);
    currentLookAt.lerp(targetLookAt, 0.065);

    const swayX = Math.sin(elapsed * 0.8) * 0.035;
    const swayY = Math.cos(elapsed * 0.6) * 0.025;

    camera.position.set(
      currentCamPos.x + mouseX + swayX,
      currentCamPos.y - mouseY + swayY,
      currentCamPos.z
    );
    camera.lookAt(currentLookAt);

    const posAttr = dustGeo.attributes.position;
    for (let i = 0; i < dustCount; i++) {
      let py = posAttr.getY(i);
      py -= 0.003;
      if (py < 0.2) py = 5.0;
      posAttr.setY(i, py);
    }
    posAttr.needsUpdate = true;

    screenLight.intensity = 2.2 + Math.sin(elapsed * 4) * 0.15;

    renderer.render(scene, camera);
  }

  animate();

  /* ──────────────────────────────────────────────
     RESIZE LISTENER
  ────────────────────────────────────────────── */
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.fov = window.innerWidth < 768 ? 58 : 44;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

})();
