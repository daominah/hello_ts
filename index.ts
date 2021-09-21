console.log("hello ts");

function ToISOStringZoneVN(t: Date): string {
    let time7 = new Date("2006-01-02T15:04:05+07:00");
    let tzOffset = time7.getTimezoneOffset() * 60000;
    return (new Date(t.getTime() - tzOffset)).toISOString()
        .slice(0, -1) + "+07:00";
}

let data = JSON.parse(`{
    "bankCode":"01309001",
    "createdAt":"2002-01-01T10:22:33+06:00",
    "PaymentCreatedAt": "2006-01-02T20:04:05.000Z",
    "TxAmount": 1000000,
    "ZeroTime": "1970-01-01T00:00:00Z"
}`);

for (let k in data) {
    if (!data.hasOwnProperty(k)) {
        continue
    }
    let t = new Date(data[k]);
    if (isNaN(t.getTime())) {
        continue
    }
    if (t.getTime() < 999000000000) { // ignore time before year 2002
        console.log("huh", t.getTime());
        continue
    }
    console.log(k, ToISOStringZoneVN(t), t.getTime())
}
