const sviNaslovi = [
  "Urna et pharetra",
  "Odio ut sem",
  "Pretium lectus",
  "Faucibus in ornare",
  "Semper risus",
  "Quisque egestas diam in arcu cursus.",
  "Consectetur lorem donec massa",
  "Venenatis a condimentum vitae sapien",
  "Consectetur adipiscing",
  "Odio ut sem nulla pharetra",
  "amet dictum sit amet",
  "risus in hendrerit"
];

const sviOpisi = [
  "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
  "Urna et pharetra pharetra massa massa ultricies. Odio ut sem nulla pharetra diam sit amet.",
  "Leo duis ut diam quam nulla porttitor massa id neque. Consectetur lorem donec massa sapien faucibus et molestie ac feugiat.",
  "Faucibus scelerisque eleifend donec pretium vulputate sapien nec.",
  "Sit amet dictum sit amet justo donec enim diam vulputate.",
  "Semper risus in hendrerit gravida rutrum.",
  "Venenatis a condimentum vitae sapien. Quisque egestas diam in arcu cursus.",
  "Volutpat consequat mauris nunc congue nisi vitae.",
  "Pretium lectus quam id leo in vitae turpis massa.",
  "Volutpat ac tincidunt vitae semper.",
  "Consectetur adipiscing elit pellentesque habitant.",
  "Faucibus in ornare quam viverra orci sagittis eu volutpat."
];

for (let i = 1; i <= 30; i++) {
  if (Math.random()*10 < 5)
    continue;

  let naslovi = [];
  let opisi = [];
  let added = [];
  for (let m = 0; m < Math.round(Math.random() * 5); m++) {
    let toAdd = Math.round(Math.random() * 30);
    if (!added.includes(toAdd)) {
      added.push(toAdd);
      naslovi.push(sviNaslovi[Math.floor(Math.random() * 12)]);
      opisi.push(sviOpisi[Math.floor(Math.random() * 12)]);
    }
  }

  for (let j = 0; j < naslovi.length; j++) {
    let status = Math.random() * 10 < 5 ? 1 : (Math.random() * 10 < 2 ? 2 : 3);
    let cijena = Math.round(Math.random() * 1000);
    console.log(`INSERT INTO ponuda (naslov, opis, cijena, sif_servis, trenutak_stvaranja, trenutak_promjene, sif_status, sif_oglas) VALUES ('${naslovi[j]}', '${opisi[j]}', ${cijena}, ${i}, NOW()::TIMESTAMP, NOW()::TIMESTAMP, ${status}, ${added[j]});`);
  }
}