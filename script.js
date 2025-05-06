fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const calendar = document.getElementById('calendar');
    const photo = document.getElementById('photo');
    const title = document.getElementById('photo-title');
    const dateDisplay = document.getElementById('photo-date');

    Object.keys(data).sort().reverse().forEach(date => {
      const btn = document.createElement('button');
      btn.textContent = date;
      btn.onclick = () => {
        photo.src = `photos/${date}.jpg`;
        title.textContent = data[date].title;
        dateDisplay.textContent = date;
      };
      calendar.appendChild(btn);
    });

    // Show the latest photo on load
    const latestDate = Object.keys(data).sort().reverse()[0];
    photo.src = `photos/${latestDate}.jpg`;
    title.textContent = data[latestDate].title;
    dateDisplay.textContent = latestDate;
  });
