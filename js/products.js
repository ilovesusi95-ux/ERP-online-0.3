// ==================== 产品管理 ====================
function renderProducts(filtered = null) {
    const tbody = document.getElementById('products-table');
    if (!tbody) return;
    tbody.innerHTML = '';
    const list = filtered || data.products;
    list.forEach(p => {
        const tr = document.createElement('tr');
        tr.className = 'medical-table';
        tr.innerHTML = `
            <td class="px-8 py-5 font-medium">${p.name}</td>
            <td class="px-8 py-5 text-slate-600">${p.spec}</td>
            <td class="px-8 py-5"><span class="px-3 py-1 text-xs rounded-full bg-sky-100 text-sky-700">${p.category}</span></td>
            <td class="px-8 py-5 text-right font-mono">¥${p.price}</td>
            <td class="px-8 py-5 text-right font-semibold ${p.stock < p.safetyStock ? 'text-red-600' : ''}">${p.stock}</td>
            <td class="px-8 py-5">
                <button onclick="editProduct(${p.id})" class="text-sky-600 text-xs px-4 py-2">编辑</button>
                <button onclick="deleteProduct(${p.id})" class="text-red-500 text-xs px-4 py-2">删除</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    const countEl = document.getElementById('product-count');
    if (countEl) countEl.textContent = data.products.length;
}

function filterProducts() {
    const kw = document.getElementById('product-search').value.toLowerCase();
    const cat = document.getElementById('category-filter').value;
    const filtered = data.products.filter(p => 
        (!kw || p.name.toLowerCase().includes(kw) || p.spec.toLowerCase().includes(kw)) && 
        (!cat || p.category === cat)
    );
    renderProducts(filtered);
}

function showAddProductModal() {
    const html = `
        <div class="p-8">
            <h3 class="text-2xl font-bold mb-7">新增产品</h3>
            <div class="space-y-5">
                <div><label class="block text-sm mb-2">产品名称</label><input id="p-name" class="w-full border rounded-2xl px-5 py-3.5"></div>
                <div class="grid grid-cols-2 gap-5">
                    <div><label class="block text-sm mb-2">品类</label><select id="p-cat" class="w-full border rounded-2xl px-5 py-3.5">
                        <option value="\u9632\u62a4\u8017\u6750">防\u62a4耗材</option>
                        <option value="\u624b术耗材">手术耗材</option>
                        <option value="\u8bca断试剂">诊断试剂</option>
                    </select></div>
                    <div><label class="block text-sm mb-2">规格</label><input id="p-spec" class="w-full border rounded-2xl px-5 py-3.5"></div>
                </div>
                <div class="grid grid-cols-3 gap-5">
                    <div><label class="block text-sm mb-2">单价</label><input id="p-price" type="number" step="0.1" value="25" class="w-full border rounded-2xl px-5 py-3.5"></div>
                    <div><label class="block text-sm mb-2">初始库存</label><input id="p-stock" type="number" value="500" class="w-full border rounded-2xl px-5 py-3.5"></div>
                    <div><label class="block text-sm mb-2">安全库存</label><input id="p-safety" type="number" value="100" class="w-full border rounded-2xl px-5 py-3.5"></div>
                </div>
            </div>
            <div class="flex gap-x-4 mt-9">
                <button onclick="hideModal()" class="flex-1 py-3.5 border rounded-2xl">取消</button>
                <button onclick="addProduct()" class="flex-1 py-3.5 bg-sky-600 text-white rounded-2xl">保存</button>
            </div>
        </div>
    `;
    document.getElementById('modal-content').innerHTML = html;
    document.getElementById('modal').classList.remove('hidden');
    document.getElementById('modal').classList.add('flex');
}

function addProduct() {
    const p = {
        id: Date.now(),
        name: document.getElementById('p-name').value || '新产品',
        category: document.getElementById('p-cat').value,
        spec: document.getElementById('p-spec').value || '标准',
        price: parseFloat(document.getElementById('p-price').value) || 10,
        stock: parseInt(document.getElementById('p-stock').value) || 100,
        safetyStock: parseInt(document.getElementById('p-safety').value) || 50
    };
    data.products.push(p);
    saveData();
    hideModal();
    renderProducts();
}

function editProduct(id) {
    const p = data.products.find(x => x.id === id);
    if (!p) return;
    // ... (编辑逻辑省略，后续补充)
    alert('编辑功能开发中...');
}

function deleteProduct(id) {
    if (!confirm('确定删除这个产品吗？')) return;
    data.products = data.products.filter(x => x.id !== id);
    saveData();
    renderProducts();
}