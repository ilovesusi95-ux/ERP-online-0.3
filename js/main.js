// ==================== 全局数据和公用函数 ====================
let data = { products: [], salesOrders: [], customers: [], suppliers: [], certificates: [], inboundOrders: [] };

function loadData() {
    const saved = localStorage.getItem('erp_v0.3_multifile');
    if (saved) {
        data = JSON.parse(saved);
    } else {
        // 初始化模拟数据
        data.products = [
            {id:1, name:"\u533b\u7528\u5916\u79d1\u53e3\u7f69", category:"\u9632\u62a4\u8017\u6750", spec:"50\u53ea/\u76d2", price:28.5, stock:1250, safetyStock:300},
            {id:2, name:"\u4e00\u6b21\u6027\u4e01\u8148\u624b\u5957", category:"\u9632\u62a4\u8017\u6750", spec:"100\u53ea/\u76d2", price:45, stock:890, safetyStock:200},
            {id:3, name:"\u533b\u7528\u6ce8\u5c04\u5668 5ml", category:"\u624b\u672f\u8017\u6750", spec:"100\u652f/\u76d2", price:32, stock:2100, safetyStock:500}
        ];
        data.customers = [{id:1, name:"\u5317\u4eac\u534f\u548c\u533b\u9662", contact:"\u674e\u4e3b\u4efb", phone:"010-6915xxxx", address:"\u5317\u4eac\u5e02\u4e1c\u57ce\u533a"}];
        data.suppliers = [{id:1, name:"\u6c5f\u82cf\u533b\u7597\u6750\u6599\u6709\u9650\u516c\u53f8", contact:"\u9648\u7ecf\u7406", phone:"0512-8888xxxx"}];
        data.certificates = [{id:1, certNo:"\u56fd\u68b0\u6ce8\u51c620263000001", holder:"\u534e\u5eb7\u533b\u7597\u8017\u6750\u6709\u9650\u516c\u53f8", validityMonths:24, models:[{name:"\u666e\u901a\u578b", specs:["\u533b\u7528\u5916\u79d1\u53e3\u7f69"], configs:[{name:"\u914d\u7f6e\u4e00", values:["\u65e0\u83cc","\u975e\u65e0\u83cc"]}]}]}];
        saveData();
    }
}

function saveData() {
    localStorage.setItem('erp_v0.3_multifile', JSON.stringify(data));
}

function showSection(section) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(section).classList.add('active');
    
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('nav-active'));
    const nav = document.getElementById('nav-' + section);
    if (nav) nav.classList.add('nav-active');

    // 根据模块调用对应渲染函数
    if (section === 'products' && typeof renderProducts === 'function') renderProducts();
    if (section === 'inventory' && typeof renderInventory === 'function') renderInventory();
    if (section === 'sales' && typeof renderSalesOrders === 'function') renderSalesOrders();
    if (section === 'certificates' && typeof renderCertificates === 'function') renderCertificates();
    if (section === 'suppliers' && typeof renderSuppliers === 'function') renderSuppliers();
    if (section === 'customers' && typeof renderCustomers === 'function') renderCustomers();
    if (section === 'reports' && typeof renderReports === 'function') renderReports();
    if (section === 'inbound' && typeof showInboundTab === 'function') showInboundTab('procurement');
}

function hideModal() {
    const m = document.getElementById('modal');
    m.classList.remove('flex');
    m.classList.add('hidden');
}

function showUserMenu() {
    alert('\u7528\u6237\u83dc\u5355\uff08\u6f14\u793a\uff09\n• \u5207\u6362\u7528\u6237\n• \u4fee\u6539\u5bc6\u7801\n• \u9000\u51fa\u767b\u5f55');
}

function initTailwind() {
    tailwind.config = {
        theme: {
            extend: {
                fontFamily: {
                    'sans': ['Inter', 'Noto Sans SC', 'system-ui']
                }
            }
        }
    };
}

function initERP() {
    initTailwind();
    loadData();
    showSection('dashboard');
    if (typeof initCharts === 'function') initCharts();
    if (typeof updateKPIs === 'function') updateKPIs();
    console.log('%c[ERP-online 0.3] 多文件版本已加载', 'color:#0ea5e9');
}

window.onload = initERP;