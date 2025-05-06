fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const gallery = document.getElementById('gallery');
    const calendar = document.getElementById('calendar');
    const overlay = document.getElementById('overlay');
    const overlayImg = document.getElementById('overlay-img');
    const overlayTitle = document.getElementById('overlay-title');
    const closeBtn = document.getElementById('close');

    const dates = Object.keys(data).sort().reverse();
    dates.forEach(date => {
      const item = data[date];
      const div = document.createElement('div');
      div.className = 'thumb';
      div.innerHTML = `
        <img src="photos/${date}.jpg" alt="${item.title}" />
        <div class="date">${date.replace(/-/g, '/')}</div>
        <div class="title">${item.title}</div>
      `;
      div.onclick = () => {
        overlay.style.display = 'flex';
        overlayImg.src = `photos/${date}.jpg`;
        overlayTitle.textContent = `${item.title} — ${date}`;
      };
      gallery.appendChild(div);
    });

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const table = document.createElement('table');
    let tr = document.createElement('tr');
    for (let i = 0; i < new Date(year, month, 1).getDay(); i++) {
      tr.appendChild(document.createElement('td'));
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const td = document.createElement('td');
      td.textContent = d;
      if (data[dateStr]) td.className = 'has-photo';
      tr.appendChild(td);
      if ((tr.children.length) % 7 === 0) {
        table.appendChild(tr);
        tr = document.createElement('tr');
      }
    }
    table.appendChild(tr);
    calendar.innerHTML = `<h3>${year}/${month + 1}</h3>`;
    calendar.appendChild(table);

    closeBtn.onclick = () => overlay.style.display = 'none';
    overlay.onclick = (e) => {
      if (e.target === overlay) overlay.style.display = 'none';
    };
  });
