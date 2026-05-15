// ==================== 供应商管理 ====================
function renderSuppliers() {
    const container = document.getElementById('suppliers-list');
    if (!container) return;
    container.innerHTML = '';

    data.suppliers.forEach(s => {
        const div = document.createElement('div');
        div.className = 'border rounded-2xl p-5 hover:shadow-md';
        div.innerHTML = `
            <div class="font-semibold text-lg">${s.name}</div>
            <div class="text-sm text-slate-500 mt-1">生产许可证号：${s.licenseNo || '-'}</div>
            <div class="text-xs text-slate-400 mt-2">生产地址：${s.address || '-'}</div>
            <div class="mt-4 flex gap-x-2">
                <button onclick="editSupplier(${s.id})" class="text-sky-600 text-xs px-3 py-1 border rounded-lg">编辑</button>
                <button onclick="deleteSupplier(${s.id})" class="text-red-500 text-xs px-3 py-1 border rounded-lg">删除</button>
            </div>
        `;
        container.appendChild(div);
    });
}

function showAddSupplierModal() {
    const html = `
        <div class="p-8">
            <h3 class="text-2xl font-bold mb-7">新增供应商</h3>
            <div class="space-y-5">
                <div><label class="block text-sm mb-2">供应商名称</label><input id="s-name" class="w-full border rounded-2xl px-5 py-3.5"></div>
                <div><label class="block text-sm mb-2">生产许可证号</label><input id="s-license" class="w-full border rounded-2xl px-5 py-3.5"></div>
                <div><label class="block text-sm mb-2">生产地址</label><input id="s-address" class="w-full border rounded-2xl px-5 py-3.5"></div>
            </div>
            <div class="flex gap-x-4 mt-9">
                <button onclick="hideModal()" class="flex-1 py-3.5 border rounded-2xl">取消</button>
                <button onclick="addSupplier()" class="flex-1 py-3.5 bg-amber-600 text-white rounded-2xl">保存</button>
            </div>
        </div>
    `;
    document.getElementById('modal-content').innerHTML = html;
    document.getElementById('modal').classList.remove('hidden');
    document.getElementById('modal').classList.add('flex');
}

function addSupplier() {
    const s = {
        id: Date.now(),
        name: document.getElementById('s-name').value || '新供应商',
        licenseNo: document.getElementById('s-license').value || '-',
        address: document.getElementById('s-address').value || '-'
    };
    data.suppliers.push(s);
    saveData();
    hideModal();
    renderSuppliers();
}

function editSupplier(id) {
    const s = data.suppliers.find(x => x.id === id);
    if (!s) return;

    const html = `
        <div class="p-8">
            <h3 class="text-2xl font-bold mb-7">编辑供应商</h3>
            <div class="space-y-5">
                <div><label class="block text-sm mb-2">供应商名称</label><input id="s-name" class="w-full border rounded-2xl px-5 py-3.5" value="${s.name}"></div>
                <div><label class="block text-sm mb-2">生产许可证号</label><input id="s-license" class="w-full border rounded-2xl px-5 py-3.5" value="${s.licenseNo || ''}"></div>
                <div><label class="block text-sm mb-2">生产地址</label><input id="s-address" class="w-full border rounded-2xl px-5 py-3.5" value="${s.address || ''}"></div>
            </div>
            <div class="flex gap-x-4 mt-9">
                <button onclick="hideModal()" class="flex-1 py-3.5 border rounded-2xl">取消</button>
                <button onclick="updateSupplier(${id})" class="flex-1 py-3.5 bg-amber-600 text-white rounded-2xl">保存修改</button>
            </div>
        </div>
    `;
    document.getElementById('modal-content').innerHTML = html;
    document.getElementById('modal').classList.remove('hidden');
    document.getElementById('modal').classList.add('flex');
}

function updateSupplier(id) {
    const s = data.suppliers.find(x => x.id === id);
    if (!s) return;

    s.name = document.getElementById('s-name').value;
    s.licenseNo = document.getElementById('s-license').value;
    s.address = document.getElementById('s-address').value;

    saveData();
    hideModal();
    renderSuppliers();
}

function deleteSupplier(id) {
    if (!confirm('确定删除这个供应商吗？')) return;
    data.suppliers = data.suppliers.filter(x => x.id !== id);
    saveData();
    renderSuppliers();
}