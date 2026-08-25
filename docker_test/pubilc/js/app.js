/**
 * IT NSTVC - Interactive Application Engine
 * Includes Particle System, Web Audio FX, Student Management Hub,
 * GPA Calculator, AI Chatbot, 3D Card Tilt, Themes, and Toast Alerts
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeEngine();
  initSoundEngine();
  initParticleBackground();
  initScrollEffects();
  initCounterAnimations();
  initCurriculumTabs();
  initTeachersSection();
  initFacilitiesSection();
  initStudentsHub();
  initGpaCalculator();
  initEventsSection();
  initContactForm();
  initChatbot();
});

/* ==========================================================================
   1. THEME ENGINE (Cyber Dark, Clean Light, Neon Aurora)
   ========================================================================== */
function initThemeEngine() {
  const themeBtn = document.getElementById('themeToggleBtn');
  const themes = ['dark', 'light', 'aurora'];
  let currentTheme = localStorage.getItem('it_nstvc_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      playSound('click');
      const nextIndex = (themes.indexOf(currentTheme) + 1) % themes.length;
      currentTheme = themes[nextIndex];
      document.documentElement.setAttribute('data-theme', currentTheme);
      localStorage.setItem('it_nstvc_theme', currentTheme);
      updateThemeIcon(currentTheme);
      showToast('เปลี่ยนธีมสำเร็จ', `ใช้งานธีม: ${getThemeName(currentTheme)}`, 'info');
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#themeToggleBtn i');
  if (!icon) return;
  if (theme === 'light') {
    icon.className = 'fa-solid fa-sun';
  } else if (theme === 'aurora') {
    icon.className = 'fa-solid fa-wand-magic-sparkles';
  } else {
    icon.className = 'fa-solid fa-moon';
  }
}

function getThemeName(theme) {
  switch (theme) {
    case 'light': return 'Clean Light Mode';
    case 'aurora': return 'Neon Aurora Cyber';
    default: return 'Cyber Dark Mode';
  }
}

/* ==========================================================================
   2. WEB AUDIO SOUND FX ENGINE (Synthesized UI Feedback)
   ========================================================================== */
let audioCtx = null;
let soundEnabled = true;

function initSoundEngine() {
  const soundBtn = document.getElementById('soundToggleBtn');
  soundEnabled = localStorage.getItem('it_nstvc_sound') !== 'disabled';
  updateSoundIcon();

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      localStorage.setItem('it_nstvc_sound', soundEnabled ? 'enabled' : 'disabled');
      updateSoundIcon();
      if (soundEnabled) {
        playSound('success');
        showToast('เปิดเสียงเอฟเฟกต์', 'ระบบเสียง UI Interactive เปิดใช้งานแล้ว', 'success');
      } else {
        showToast('ปิดเสียงเอฟเฟกต์', 'ระบบเสียง UI Interactive ปิดอยู่', 'info');
      }
    });
  }
}

function updateSoundIcon() {
  const icon = document.querySelector('#soundToggleBtn i');
  if (!icon) return;
  icon.className = soundEnabled ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
}

function playSound(type) {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'error') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(250, now);
      osc.frequency.linearRampToValueAtTime(150, now + 0.15);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);
    } else if (type === 'pop') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    }
  } catch (e) {
    console.debug('Audio error:', e);
  }
}

/* ==========================================================================
   3. PARTICLE CANVAS BACKGROUND
   ========================================================================== */
function initParticleBackground() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 22), 65);
  const mouse = { x: null, y: null, radius: 140 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.5 ? 'rgba(0, 240, 255,' : 'rgba(139, 92, 246,';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse proximity interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 2;
          this.y -= (dy / dist) * force * 2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${this.color} 0.7)`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const alpha = 1 - dist / 120;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha * 0.18})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   4. SCROLL EFFECTS & NAVBAR
   ========================================================================== */
function initScrollEffects() {
  const progressBar = document.getElementById('scrollProgress');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }
  });

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      playSound('click');
      const isVisible = navMenu.style.display === 'flex';
      navMenu.style.display = isVisible ? 'none' : 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '70px';
      navMenu.style.left = '20px';
      navMenu.style.right = '20px';
      navMenu.style.background = 'var(--surface-opaque)';
      navMenu.style.padding = '20px';
      navMenu.style.borderRadius = '16px';
      navMenu.style.border = '1px solid var(--border)';
    });
  }

  // Smooth scroll links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          playSound('click');
          targetEl.scrollIntoView({ behavior: 'smooth' });
          if (window.innerWidth <= 768 && navMenu) {
            navMenu.style.display = 'none';
          }
        }
      }
    });
  });
}

/* ==========================================================================
   5. COUNTER ANIMATIONS (Stats)
   ========================================================================== */
function initCounterAnimations() {
  const statNumbers = document.querySelectorAll('.count-up');
  let started = false;

  function countUp(el) {
    const target = parseInt(el.getAttribute('data-target'), 10) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    let current = 0;
    const duration = 1800;
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current) + suffix;
      }
    }, stepTime);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;
          statNumbers.forEach((el) => countUp(el));
        }
      });
    },
    { threshold: 0.2 }
  );

  const statsSection = document.getElementById('statsSection');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* ==========================================================================
   6. CURRICULUM EXPLORER (ปวช. & ปวส.)
   ========================================================================== */
let globalCoursesData = null;

async function initCurriculumTabs() {
  const tabs = document.querySelectorAll('.curriculum-tab-btn');
  const container = document.getElementById('coursesGrid');

  try {
    const res = await fetch('/api/courses');
    globalCoursesData = await res.json();
    renderCourses('pvs'); // Default show PVS
  } catch (e) {
    console.error('Error loading courses:', e);
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      playSound('click');
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const level = tab.getAttribute('data-level');
      renderCourses(level);
    });
  });
}

function renderCourses(level) {
  const container = document.getElementById('coursesGrid');
  if (!container || !globalCoursesData) return;

  const courses = globalCoursesData[level] || [];
  container.innerHTML = courses
    .map(
      (course) => `
    <div class="glass-panel course-card tilt-card">
      <div>
        <div class="course-code">${course.code}</div>
        <h3 class="course-title">${course.title}</h3>
        <p class="course-desc">${course.desc}</p>
      </div>
      <div class="course-footer">
        <span class="badge badge-secondary">${course.tag}</span>
        <span class="course-credits"><i class="fa-solid fa-clock-rotate-left"></i> ${course.credits}</span>
      </div>
    </div>
  `
    )
    .join('');

  apply3DTilt();
}

/* ==========================================================================
   7. TEACHERS & FACULTY SECTION
   ========================================================================== */
let globalTeachersData = [];

async function initTeachersSection() {
  const container = document.getElementById('teachersGrid');
  if (!container) return;

  try {
    const res = await fetch('/api/teachers');
    globalTeachersData = await res.json();
    renderTeachers(globalTeachersData);
  } catch (e) {
    console.error('Error loading teachers:', e);
  }
}

function renderTeachers(teachers) {
  const container = document.getElementById('teachersGrid');
  if (!container) return;

  container.innerHTML = teachers
    .map((t) => {
      const initials = t.full_name.substring(0, 3);
      return `
      <div class="glass-panel teacher-card tilt-card">
        <div class="teacher-avatar-box">
          <div class="teacher-avatar-inner">
            <i class="fa-solid fa-user-tie"></i>
          </div>
          <span class="teacher-badge">${t.badge}</span>
        </div>
        <div>
          <h3 class="teacher-name">${t.full_name}</h3>
          <div class="teacher-pos">${t.position}</div>
        </div>
        <p class="teacher-expertise">${t.expertise}</p>
        <div class="teacher-tags">
          ${(t.tags || []).map((tag) => `<span class="teacher-tag">${tag}</span>`).join('')}
        </div>
        <button class="btn btn-secondary btn-sm teacher-contact-btn" onclick="openTeacherModal(${t.id})">
          <i class="fa-solid fa-address-card"></i> ข้อมูล & ติดต่อ
        </button>
      </div>
    `;
    })
    .join('');

  apply3DTilt();
}

window.openTeacherModal = function (teacherId) {
  playSound('pop');
  const teacher = globalTeachersData.find((t) => t.id === teacherId);
  if (!teacher) return;

  const modalBody = document.getElementById('generalModalBody');
  const modalTitle = document.getElementById('generalModalTitle');
  if (!modalBody || !modalTitle) return;

  modalTitle.textContent = `ข้อมูลคณาจารย์ - ${teacher.full_name}`;
  modalBody.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; align-items: center; gap: 18px; padding-bottom: 16px; border-bottom: 1px solid var(--border);">
        <div style="width: 60px; height: 60px; border-radius: 16px; background: linear-gradient(135deg, var(--primary), var(--secondary)); display: grid; place-items: center; font-size: 1.8rem; color: #050b18;">
          <i class="fa-solid fa-user-graduate"></i>
        </div>
        <div>
          <h4 style="font-size: 1.2rem; margin-bottom: 4px;">${teacher.full_name}</h4>
          <span class="badge badge-primary">${teacher.position}</span>
        </div>
      </div>
      <div>
        <strong style="color: var(--primary); display: block; margin-bottom: 4px;">วุฒิการศึกษา:</strong>
        <p style="color: var(--text-muted);">${teacher.education}</p>
      </div>
      <div>
        <strong style="color: var(--primary); display: block; margin-bottom: 4px;">ความเชี่ยวชาญพิเศษ:</strong>
        <p style="color: var(--text-muted);">${teacher.expertise}</p>
      </div>
      <div>
        <strong style="color: var(--primary); display: block; margin-bottom: 4px;">ห้องพัก / สถานที่ติดต่อ:</strong>
        <p style="color: var(--text-muted);"><i class="fa-solid fa-location-dot"></i> ${teacher.room}</p>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 8px;">
        <div style="background: var(--surface-subtle); padding: 12px; border-radius: 10px; border: 1px solid var(--border);">
          <small style="color: var(--text-subtle); display: block;">อีเมลติดต่อ</small>
          <strong>${teacher.email}</strong>
        </div>
        <div style="background: var(--surface-subtle); padding: 12px; border-radius: 10px; border: 1px solid var(--border);">
          <small style="color: var(--text-subtle); display: block;">เบอร์โทรศัพท์</small>
          <strong>${teacher.phone}</strong>
        </div>
      </div>
      <div style="margin-top: 10px; display: flex; align-items: center; gap: 8px;">
        <span class="status-dot online"></span>
        <span style="font-size: 0.88rem; color: #34d399;">สถานะ: ${teacher.status}</span>
      </div>
    </div>
  `;

  openModal('generalModal');
};

/* ==========================================================================
   8. SMART FACILITIES & LABS SHOWCASE
   ========================================================================== */
let globalFacilities = [];

async function initFacilitiesSection() {
  const container = document.getElementById('facilitiesGrid');
  if (!container) return;

  try {
    const res = await fetch('/api/facilities');
    globalFacilities = await res.json();
    renderFacilities(globalFacilities);
  } catch (e) {
    console.error('Error loading facilities:', e);
  }
}

function renderFacilities(facilities) {
  const container = document.getElementById('facilitiesGrid');
  if (!container) return;

  container.innerHTML = facilities
    .map(
      (f) => `
    <div class="glass-panel facility-card tilt-card">
      <div>
        <div class="facility-header">
          <div class="facility-icon-box">
            <i class="fa-solid ${f.icon}"></i>
          </div>
          <span class="badge badge-primary">${f.tag}</span>
        </div>
        <h3 class="facility-name">${f.name}</h3>
        <div class="facility-room"><i class="fa-solid fa-door-open"></i> ${f.room} • ${f.seats}</div>
      </div>
      <div class="facility-specs-box">
        <strong style="color: var(--text-main); display: block; margin-bottom: 4px;"><i class="fa-solid fa-microchip"></i> สเปกอุปกรณ์:</strong>
        <span style="color: var(--text-muted);">${f.specs}</span>
        <strong style="color: var(--text-main); display: block; margin-top: 8px; margin-bottom: 4px;"><i class="fa-solid fa-code"></i> ซอฟต์แวร์:</strong>
        <span style="color: var(--text-muted);">${f.software}</span>
      </div>
      <button class="btn btn-outline-primary btn-sm" onclick="bookLabSimulator('${f.name}')">
        <i class="fa-solid fa-calendar-check"></i> จำลองจองเวลาใช้งานห้อง Lab
      </button>
    </div>
  `
    )
    .join('');

  apply3DTilt();
}

window.bookLabSimulator = function (labName) {
  playSound('success');
  createConfetti();
  showToast('จองห้อง Lab สำเร็จ (Simulation)', `ระบบบันทึกคำขอจอง ${labName} เรียบร้อยแล้ว`, 'success');
};

/* ==========================================================================
   9. STUDENT & PERSONNEL MANAGEMENT HUB (CRUD)
   ========================================================================== */
let studentsList = [];
let editingStudentId = null;

async function initStudentsHub() {
  const searchInput = document.getElementById('studentSearchInput');
  const levelFilter = document.getElementById('studentLevelFilter');
  const addBtn = document.getElementById('addStudentBtn');
  const exportCsvBtn = document.getElementById('exportCsvBtn');
  const exportJsonBtn = document.getElementById('exportJsonBtn');
  const printBtn = document.getElementById('printListBtn');
  const studentForm = document.getElementById('studentForm');

  await fetchStudents();

  if (searchInput) {
    searchInput.addEventListener('input', () => filterAndRenderStudents());
  }

  if (levelFilter) {
    levelFilter.addEventListener('change', () => {
      playSound('click');
      filterAndRenderStudents();
    });
  }

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      playSound('pop');
      editingStudentId = null;
      document.getElementById('studentModalTitle').textContent = 'เพิ่มข้อมูลนักศึกษา / สมาชิกใหม่';
      if (studentForm) studentForm.reset();
      openModal('studentModal');
    });
  }

  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', () => exportStudentsCSV());
  }

  if (exportJsonBtn) {
    exportJsonBtn.addEventListener('click', () => exportStudentsJSON());
  }

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      playSound('click');
      window.print();
    });
  }

  if (studentForm) {
    studentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await handleStudentFormSubmit();
    });
  }
}

async function fetchStudents() {
  try {
    const res = await fetch('/api/users');
    studentsList = await res.json();
    filterAndRenderStudents();
  } catch (e) {
    console.error('Error fetching students:', e);
  }
}

function filterAndRenderStudents() {
  const searchVal = (document.getElementById('studentSearchInput')?.value || '').toLowerCase().trim();
  const levelVal = document.getElementById('studentLevelFilter')?.value || 'all';
  const tableBody = document.getElementById('studentTableBody');
  if (!tableBody) return;

  const filtered = studentsList.filter((s) => {
    const matchSearch =
      (s.full_name || '').toLowerCase().includes(searchVal) ||
      (s.student_id || '').toLowerCase().includes(searchVal) ||
      (s.email || '').toLowerCase().includes(searchVal) ||
      (s.track || '').toLowerCase().includes(searchVal);

    const matchLevel = levelVal === 'all' || (s.level || '').includes(levelVal);
    return matchSearch && matchLevel;
  });

  if (filtered.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 40px; color: var(--text-muted);">
          <i class="fa-solid fa-folder-open" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
          ไม่พบข้อมูลที่ค้นหา
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = filtered
    .map((s) => {
      const initials = (s.full_name || 'IT')
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('');
      const statusClass = getStatusDotClass(s.status);

      return `
      <tr>
        <td>
          <span style="font-family: var(--font-code); font-size: 0.85rem; color: var(--primary);">${s.student_id || '-'}</span>
        </td>
        <td>
          <div class="user-cell">
            <div class="user-avatar-mini">${initials}</div>
            <div>
              <strong>${s.full_name}</strong>
              <small style="display: block; color: var(--text-muted);">${s.email}</small>
            </div>
          </div>
        </td>
        <td><span class="badge badge-secondary">${s.level || 'ปวส.'}</span></td>
        <td><span style="color: var(--text-muted); font-size: 0.88rem;">${s.track || 'IT'}</span></td>
        <td><strong style="color: #fbbf24;">${s.gpa || '3.50'}</strong></td>
        <td>
          <button onclick="toggleStudentStatus(${s.id})" style="background: none; border: none; cursor: pointer; display: flex; align-items: center; gap: 6px;">
            <span class="status-dot ${statusClass}"></span>
            <span style="font-size: 0.82rem; color: var(--text-muted);">${s.status || 'ออนไลน์'}</span>
          </button>
        </td>
        <td>
          <div class="table-actions">
            <button class="action-icon-btn" title="แก้ไขข้อมูล" onclick="openEditStudentModal(${s.id})">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="action-icon-btn delete" title="ลบข้อมูล" onclick="deleteStudent(${s.id})">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
    })
    .join('');
}

function getStatusDotClass(status) {
  if (!status) return 'online';
  if (status.includes('ออนไลน์') || status.includes('พร้อม')) return 'online';
  if (status.includes('เรียน') || status.includes('สอน')) return 'in-class';
  if (status.includes('ไม่ว่าง') || status.includes('ธุระ')) return 'busy';
  return 'online';
}

window.toggleStudentStatus = async function (id) {
  playSound('click');
  const student = studentsList.find((s) => s.id === id);
  if (!student) return;

  const statuses = ['ออนไลน์', 'ติดเรียน Lab', 'ว่าง', 'พักเบรก'];
  const nextIdx = (statuses.indexOf(student.status) + 1) % statuses.length;
  student.status = statuses[nextIdx];

  try {
    await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: student.status })
    });
    filterAndRenderStudents();
    showToast('อัปเดตสถานะ', `${student.full_name} -> ${student.status}`, 'info');
  } catch (e) {
    console.error('Error updating status:', e);
  }
};

window.openEditStudentModal = function (id) {
  playSound('pop');
  const student = studentsList.find((s) => s.id === id);
  if (!student) return;

  editingStudentId = id;
  document.getElementById('studentModalTitle').textContent = 'แก้ไขข้อมูลนักศึกษา';
  document.getElementById('formFullName').value = student.full_name || '';
  document.getElementById('formStudentId').value = student.student_id || '';
  document.getElementById('formLevel').value = student.level || 'ปวส.1';
  document.getElementById('formTrack').value = student.track || '';
  document.getElementById('formEmail').value = student.email || '';
  document.getElementById('formPhone').value = student.phone || '';
  document.getElementById('formGpa').value = student.gpa || '';
  document.getElementById('formStatus').value = student.status || 'ออนไลน์';

  openModal('studentModal');
};

window.deleteStudent = async function (id) {
  playSound('click');
  const student = studentsList.find((s) => s.id === id);
  if (!student) return;

  if (confirm(`คุณต้องการลบข้อมูล "${student.full_name}" หรือไม่?`)) {
    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
      if (res.ok) {
        studentsList = studentsList.filter((s) => s.id !== id);
        filterAndRenderStudents();
        playSound('success');
        showToast('ลบข้อมูลสำเร็จ', `ลบ ${student.full_name} เรียบร้อยแล้ว`, 'success');
      }
    } catch (e) {
      playSound('error');
      showToast('เกิดข้อผิดพลาด', 'ไม่สามารถลบข้อมูลได้', 'error');
    }
  }
};

async function handleStudentFormSubmit() {
  const payload = {
    full_name: document.getElementById('formFullName').value,
    student_id: document.getElementById('formStudentId').value,
    level: document.getElementById('formLevel').value,
    track: document.getElementById('formTrack').value,
    email: document.getElementById('formEmail').value,
    phone: document.getElementById('formPhone').value,
    gpa: document.getElementById('formGpa').value,
    status: document.getElementById('formStatus').value
  };

  try {
    if (editingStudentId) {
      const res = await fetch(`/api/users/${editingStudentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const updated = await res.json();
      const idx = studentsList.findIndex((s) => s.id === editingStudentId);
      if (idx !== -1) studentsList[idx] = updated;
      showToast('บันทึกสำเร็จ', `อัปเดตข้อมูล ${updated.full_name} แล้ว`, 'success');
    } else {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const created = await res.json();
      studentsList.unshift(created);
      createConfetti();
      showToast('เพิ่มสำเร็จ', `เพิ่มนักศึกษาใหม่ ${created.full_name} แล้ว`, 'success');
    }

    playSound('success');
    closeModal('studentModal');
    filterAndRenderStudents();
  } catch (e) {
    playSound('error');
    showToast('เกิดข้อผิดพลาด', 'ไม่สามารถบันทึกข้อมูลได้', 'error');
  }
}

function exportStudentsCSV() {
  playSound('click');
  if (!studentsList.length) return;

  const headers = ['รหัสนักศึกษา', 'ชื่อ-นามสกุล', 'ระดับชั้น', 'สาขางาน', 'อีเมล', 'เบอร์โทร', 'เกรดเฉลี่ย', 'สถานะ'];
  const rows = studentsList.map((s) => [
    `"${s.student_id || ''}"`,
    `"${s.full_name || ''}"`,
    `"${s.level || ''}"`,
    `"${s.track || ''}"`,
    `"${s.email || ''}"`,
    `"${s.phone || ''}"`,
    `"${s.gpa || ''}"`,
    `"${s.status || ''}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `it_nstvc_students_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('ส่งออก CSV', 'ดาวน์โหลดไฟล์รายชื่อ CSV เรียบร้อยแล้ว', 'success');
}

function exportStudentsJSON() {
  playSound('click');
  if (!studentsList.length) return;

  const jsonContent = JSON.stringify(studentsList, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `it_nstvc_students_${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('ส่งออก JSON', 'ดาวน์โหลดไฟล์ JSON เรียบร้อยแล้ว', 'success');
}

/* ==========================================================================
   10. INTERACTIVE GPA & GPAX CALCULATOR TOOL
   ========================================================================== */
const gradePoints = {
  'A': 4.0,
  'B+': 3.5,
  'B': 3.0,
  'C+': 2.5,
  'C': 2.0,
  'D+': 1.5,
  'D': 1.0,
  'F': 0.0
};

function initGpaCalculator() {
  const addRowBtn = document.getElementById('addCourseRowBtn');
  const calcBtn = document.getElementById('calculateGpaBtn');
  const resetBtn = document.getElementById('resetGpaBtn');

  if (addRowBtn) {
    addRowBtn.addEventListener('click', () => {
      playSound('pop');
      addCalculatorRow();
    });
  }

  if (calcBtn) {
    calcBtn.addEventListener('click', () => calculateGPA());
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      playSound('click');
      resetCalculator();
    });
  }
}

function addCalculatorRow(name = '', credits = 3, grade = 'A') {
  const list = document.getElementById('calcCoursesList');
  if (!list) return;

  const row = document.createElement('div');
  row.className = 'calc-course-row';
  row.innerHTML = `
    <input type="text" class="calc-input course-name-input" placeholder="ชื่อรายวิชา (เช่น Web Dev, Network)" value="${name}">
    <select class="calc-input course-credit-select">
      <option value="1" ${credits === 1 ? 'selected' : ''}>1 หน่วยกิต</option>
      <option value="2" ${credits === 2 ? 'selected' : ''}>2 หน่วยกิต</option>
      <option value="3" ${credits === 3 ? 'selected' : ''}>3 หน่วยกิต</option>
      <option value="4" ${credits === 4 ? 'selected' : ''}>4 หน่วยกิต</option>
    </select>
    <select class="calc-input course-grade-select">
      <option value="A" ${grade === 'A' ? 'selected' : ''}>A (4.0)</option>
      <option value="B+" ${grade === 'B+' ? 'selected' : ''}>B+ (3.5)</option>
      <option value="B" ${grade === 'B' ? 'selected' : ''}>B (3.0)</option>
      <option value="C+" ${grade === 'C+' ? 'selected' : ''}>C+ (2.5)</option>
      <option value="C" ${grade === 'C' ? 'selected' : ''}>C (2.0)</option>
      <option value="D+" ${grade === 'D+' ? 'selected' : ''}>D+ (1.5)</option>
      <option value="D" ${grade === 'D' ? 'selected' : ''}>D (1.0)</option>
      <option value="F" ${grade === 'F' ? 'selected' : ''}>F (0.0)</option>
    </select>
    <button type="button" class="action-icon-btn delete" onclick="this.parentElement.remove(); playSound('click');">
      <i class="fa-solid fa-trash"></i>
    </button>
  `;
  list.appendChild(row);
}

function calculateGPA() {
  const rows = document.querySelectorAll('.calc-course-row');
  let totalCredits = 0;
  let totalWeightedPoints = 0;

  rows.forEach((row) => {
    const credits = parseFloat(row.querySelector('.course-credit-select').value) || 0;
    const grade = row.querySelector('.course-grade-select').value;
    const point = gradePoints[grade] !== undefined ? gradePoints[grade] : 0;

    totalCredits += credits;
    totalWeightedPoints += credits * point;
  });

  const gpa = totalCredits > 0 ? totalWeightedPoints / totalCredits : 0;
  const gpaFormatted = gpa.toFixed(2);

  const gpaValueText = document.getElementById('gpaValueText');
  const gpaGauge = document.getElementById('gpaGauge');
  const honorsBadge = document.getElementById('honorsBadge');

  if (gpaValueText) gpaValueText.textContent = gpaFormatted;

  if (gpaGauge) {
    const deg = (gpa / 4.0) * 360;
    gpaGauge.style.background = `conic-gradient(var(--primary) 0deg, var(--secondary) ${deg}deg, var(--border) ${deg}deg 360deg)`;
  }

  if (honorsBadge) {
    if (gpa >= 3.6) {
      honorsBadge.textContent = '🌟 เกียรตินิยมอันดับ 1 (First Class Honors)';
      honorsBadge.style.color = '#fbbf24';
      createConfetti();
      playSound('success');
    } else if (gpa >= 3.25) {
      honorsBadge.textContent = '✨ เกียรตินิยมอันดับ 2 (Second Class Honors)';
      honorsBadge.style.color = '#38bdf8';
      playSound('success');
    } else if (gpa >= 2.0) {
      honorsBadge.textContent = '👍 ผ่านเกณฑ์การสำเร็จการศึกษา';
      honorsBadge.style.color = '#34d399';
      playSound('pop');
    } else {
      honorsBadge.textContent = '⚠️ ต้องลงทะเบียนปรับปรุงผลการเรียน';
      honorsBadge.style.color = '#ef4444';
      playSound('error');
    }
  }

  showToast('คำนวณสำเร็จ', `เกรดเฉลี่ยสะสมคำนวณได้: ${gpaFormatted}`, 'info');
}

function resetCalculator() {
  const list = document.getElementById('calcCoursesList');
  if (!list) return;
  list.innerHTML = '';
  addCalculatorRow('Full-Stack Web Dev', 3, 'A');
  addCalculatorRow('Computer Network & Security', 3, 'A');
  addCalculatorRow('Database Architecture', 3, 'B+');
  addCalculatorRow('AI & IoT Studio', 3, 'A');
  calculateGPA();
}

/* ==========================================================================
   11. EVENTS SECTION & TIMELINE
   ========================================================================== */
async function initEventsSection() {
  const container = document.getElementById('eventsTimeline');
  if (!container) return;

  try {
    const res = await fetch('/api/events');
    const events = await res.json();

    container.innerHTML = events
      .map(
        (e) => `
      <div class="glass-panel event-card tilt-card">
        <div class="event-date-box">
          <span class="event-date">${e.date}</span>
          <span class="event-type">${e.type}</span>
        </div>
        <div class="event-info">
          <h4 class="event-title">${e.title}</h4>
          <div class="event-location"><i class="fa-solid fa-location-dot"></i> ${e.location}</div>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="saveEventReminder('${e.title}')">
          <i class="fa-regular fa-bell"></i> บันทึกเตือน
        </button>
      </div>
    `
      )
      .join('');

    apply3DTilt();
  } catch (err) {
    console.error('Error fetching events:', err);
  }
}

window.saveEventReminder = function (title) {
  playSound('success');
  showToast('บันทึกการแจ้งเตือน', `ระบบตั้งเตือนกิจกรรม "${title}" เรียบร้อยแล้ว`, 'success');
};

/* ==========================================================================
   12. CONTACT & ADMISSION FORM
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    playSound('pop');

    const payload = {
      name: document.getElementById('contactName').value,
      email: document.getElementById('contactEmail').value,
      phone: document.getElementById('contactPhone').value,
      topic: document.getElementById('contactTopic').value,
      message: document.getElementById('contactMessage').value
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      playSound('success');
      createConfetti();
      showToast('ส่งข้อความสำเร็จ!', data.message, 'success');
      form.reset();
    } catch (err) {
      playSound('error');
      showToast('ส่งข้อมูลไม่สำเร็จ', 'กรุณาลองใหม่อีกครั้ง', 'error');
    }
  });
}

/* ==========================================================================
   13. AI CHATBOT WIDGET ("น้อง IT-Bot")
   ========================================================================== */
function initChatbot() {
  const trigger = document.getElementById('chatbotTrigger');
  const windowEl = document.getElementById('chatbotWindow');
  const closeBtn = document.getElementById('chatbotCloseBtn');
  const sendBtn = document.getElementById('chatbotSendBtn');
  const inputEl = document.getElementById('chatbotInput');

  if (trigger && windowEl) {
    trigger.addEventListener('click', () => {
      playSound('pop');
      windowEl.classList.toggle('open');
      if (windowEl.classList.contains('open') && inputEl) {
        inputEl.focus();
      }
    });
  }

  if (closeBtn && windowEl) {
    closeBtn.addEventListener('click', () => {
      playSound('click');
      windowEl.classList.remove('open');
    });
  }

  if (sendBtn && inputEl) {
    sendBtn.addEventListener('click', () => handleSendChat());
    inputEl.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSendChat();
    });
  }

  // Quick chips
  document.querySelectorAll('.suggestion-chip').forEach((chip) => {
    chip.addEventListener('click', function () {
      const text = this.textContent;
      if (inputEl) inputEl.value = text;
      handleSendChat();
    });
  });
}

async function handleSendChat() {
  const inputEl = document.getElementById('chatbotInput');
  const messagesContainer = document.getElementById('chatbotMessages');
  if (!inputEl || !messagesContainer) return;

  const text = inputEl.value.trim();
  if (!text) return;

  // Add user bubble
  playSound('click');
  appendChatBubble('user', text);
  inputEl.value = '';

  // Add loading bubble
  const loadingBubble = appendChatBubble('bot', 'กำลังค้นหาคำตอบ...');

  try {
    const res = await fetch('/api/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    });
    const data = await res.json();
    loadingBubble.remove();
    appendChatBubble('bot', data.reply);
    playSound('pop');

    // Update suggestions if provided
    if (data.suggestions && data.suggestions.length) {
      updateChatSuggestions(data.suggestions);
    }
  } catch (e) {
    loadingBubble.remove();
    appendChatBubble('bot', 'ขออภัยครับ เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
    playSound('error');
  }
}

function appendChatBubble(sender, text) {
  const messagesContainer = document.getElementById('chatbotMessages');
  if (!messagesContainer) return null;

  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${sender}`;
  bubble.textContent = text;
  messagesContainer.appendChild(bubble);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  return bubble;
}

function updateChatSuggestions(suggestions) {
  const container = document.getElementById('chatbotSuggestions');
  if (!container) return;

  container.innerHTML = suggestions
    .map((s) => `<button type="button" class="suggestion-chip">${s}</button>`)
    .join('');

  container.querySelectorAll('.suggestion-chip').forEach((chip) => {
    chip.addEventListener('click', function () {
      const inputEl = document.getElementById('chatbotInput');
      if (inputEl) inputEl.value = this.textContent;
      handleSendChat();
    });
  });
}

/* ==========================================================================
   14. 3D CARD HOVER TILT CONTROLLER
   ========================================================================== */
function apply3DTilt() {
  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* ==========================================================================
   15. MODAL SYSTEM
   ========================================================================== */
window.openModal = function (modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
};

window.closeModal = function (modalId) {
  playSound('click');
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
};

// Close when clicking outside
document.querySelectorAll('.modal-overlay').forEach((overlay) => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
    }
  });
});

/* ==========================================================================
   16. TOAST NOTIFICATION SYSTEM
   ========================================================================== */
window.showToast = function (title, message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  let icon = 'fa-solid fa-circle-info';
  if (type === 'success') icon = 'fa-solid fa-circle-check';
  if (type === 'error') icon = 'fa-solid fa-triangle-exclamation';

  toast.innerHTML = `
    <i class="${icon} toast-icon"></i>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 50);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4200);
};

/* ==========================================================================
   17. CANVAS CONFETTI FX
   ========================================================================== */
function createConfetti() {
  const count = 75;
  const colors = ['#00f0ff', '#8b5cf6', '#ec4899', '#10b981', '#fbbf24'];

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.style.position = 'fixed';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.top = '-20px';
    piece.style.width = Math.random() * 10 + 6 + 'px';
    piece.style.height = Math.random() * 10 + 6 + 'px';
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    piece.style.zIndex = '9999';
    piece.style.pointerEvents = 'none';
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    piece.style.transition = `transform ${Math.random() * 2 + 1.5}s ease-out, top ${Math.random() * 2 + 1.5}s ease-out, opacity ${Math.random() * 2 + 1.5}s ease-out`;

    document.body.appendChild(piece);

    setTimeout(() => {
      piece.style.top = Math.random() * 80 + 20 + 'vh';
      piece.style.transform = `rotate(${Math.random() * 720}deg) scale(${Math.random() * 0.5 + 0.5})`;
      piece.style.opacity = '0';
    }, 20);

    setTimeout(() => piece.remove(), 3500);
  }
}
