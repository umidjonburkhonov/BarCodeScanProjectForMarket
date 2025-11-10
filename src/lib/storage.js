const KEY = "products:v1";

export function getAll() {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
}

export function saveAll(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
}

export function upsert(product) {
    const list = getAll();
    const idx = list.findIndex(p => p.id === product.id);
    if (idx >= 0) list[idx] = product;
    else list.unshift(product);
    saveAll(list);
    return product;
}

export function removeById(id) {
    const list = getAll().filter(p => p.id !== id);
    saveAll(list);
}

export function findByBarcode(code) {
    return getAll().find(p => p.barcode === code);
}

export function search({ q = "", category = "ALL" }) {
    const list = getAll();
    const qq = q.trim().toLowerCase();
    return list.filter(p => {
        const byCat = category === "ALL" ? true : p.category === category;
        const byText =
            !qq ||
            p.title.toLowerCase().includes(qq) ||
            p.description.toLowerCase().includes(qq) ||
            p.barcode.includes(qq);
        return byCat && byText;
    });
}
