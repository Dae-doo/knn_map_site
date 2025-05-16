
fetch("knn_result.json")
  .then(response => response.json())
  .then(data => {
    const map = L.map("map").setView([37.5, 127], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    data.forEach(entry => {
      const t = entry.target;
      const marker = L.marker([t.y, t.x]).addTo(map);
      marker.bindPopup(`<b>예측 대상 ${t.index}</b><br>${t.address}`);

      entry.neighbors.forEach(n => {
        const popup = `
          <b>유사 거래</b><br>
          ${n.address}<br>
          거래일: ${n.date}<br>
          유사거리: ${n.distance}<br>
          실제거리: ${n.real_distance} m<br>
          사용승인년: ${n.const_yy}<br>
          건물면적: ${n.area}<br>
          토지면적: ${n.land}<br>
          공시가격단가: ${n.pnilp}<br>
          거래금액: ${n.amount}
        `;
        L.marker([n.y, n.x]).addTo(map).bindPopup(popup);
        L.polyline([[t.y, t.x], [n.y, n.x]], {color: "black"}).addTo(map);
      });
    });
  });
