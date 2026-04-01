// ============================================================
// FashionHub – Main JavaScript  (Assignment 2 – P5/P6/M4/D2)
// ============================================================

// ══════════════════════════════════════════════════════════
//  1. localStorage HELPERS
// ══════════════════════════════════════════════════════════
const getStorage = (key) => {
    try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
};
const setStorage = (key, val) => localStorage.setItem(key, JSON.stringify(val));

// Initialise keys on first visit
['registeredAccounts','fashionCart','purchaseHistory','fashionMessages'].forEach(k => {
    if (!localStorage.getItem(k)) setStorage(k, []);
});
if (!localStorage.getItem('currentUser')) setStorage('currentUser', null);

// Shortcut getters
const getUser    = () => getStorage('currentUser');
const getCart    = () => getStorage('fashionCart')  || [];
const getHistory = () => getStorage('purchaseHistory') || [];

// ══════════════════════════════════════════════════════════
//  2. PRODUCT CATALOGUE
// ══════════════════════════════════════════════════════════
const PRODUCTS = [
    { id:1,  name:'Satin Slip Midi Dress',       price:129, originalPrice:189, rating:4.8, tag:'Sale', categories:['dress','silk'],   img:'https://lh3.googleusercontent.com/aida-public/AB6AXuCHiF_BI0XXui4SMyQnzhuB92T9Iyl6olfEMVxqzFW5nityWLda9P4WlWoEsHEJTHcOV1crempk5_DeLnHpezBOqWXKPa9HFMl51JYqikgnVMbRQNmy_GLtUIeWoQ23GHGIPpFN5Nd3QPTiWzjOJUbBljGiInerZgB3cOLNHHZmqaEO8ihRCZ5ie42LL2jQPG_rVNIzCpjdKPswNaMbcDUv5xUsCooByYmpeuTxmd3ju32caIVeKk0HDoew7pn0Bz_nzN3Tn3S9lVw' },
    { id:2,  name:'Floral Resort Set',            price:85,  originalPrice:null,rating:4.6, tag:null,   categories:['dress'],          img:'https://lh3.googleusercontent.com/aida-public/AB6AXuD94MOQRP8UBbwodTjvgABs3vNhO4bcaAHXvh9dTYOERxhFhAuI1q8_XtkThiTToA4PHoxjA2IkKQSCDb4TDhqL_qWvBAKUXQP-uRDl0Qb7nktOoE5Sf6RyW6Piw6aysbg7y4VwKA-wNMzkL41HvLevLQGrvVlFqwBIE3pa43w0qEMndB2Tez4luOPdOtarWiRSApcOS6O9S-y-bTRCDqM-AkZUloVGHS52KNm09VGcFKCL5qe_hZBjFLYwY0WL35MrL6Lu4dTAgRI' },
    { id:3,  name:'Signature Tailored Blazer',    price:210, originalPrice:null,rating:4.9, tag:'New',  categories:['blazer'],         img:'https://lh3.googleusercontent.com/aida-public/AB6AXuCugeNj_QgSPDb4n45W2ymfnlx-jJkkoCwslV6DjpXU6rBC8SiotcrVuY1oGq8drntWEW59Pq4TJHiaPjPwqWEonkQPuY0svtnwrEt3XsKXgHokEKqM-pGN0cjD-w8v2m1DIA6Q94eupRmxRzAQAjBZI6A0cQFOoOUtVfdZlBB-4YD6l-ETj5tzXDPro16PjF53De5NMJLXX75BBCpQ07Q5coYzMPs7cOShy2MTmMV0huiejU3N-ZdbeLr5tIufq9Q7BX-gE2P0sYI' },
    { id:4,  name:'Azure Linen Jumpsuit',         price:95,  originalPrice:140, rating:4.5, tag:'Sale', categories:['linen'],          img:'https://lh3.googleusercontent.com/aida-public/AB6AXuD-fFCClV-zn3z3MUCf4l9I2HlA9Gs0MgBrETl0dtgdXuNYEDD3RMFqzh-5iYhvVPKMLlh93h7D9MXGZiXqRxHykY2glNZiiONaFf_84hP5UOqxSuMwOwP_eut1FcRUtnKI5lcZgzLms6f6GHRTRmhKLDUSfvFTJ-fgNSDgYKgJwQ6QGE3AOS4Lr1CxpdANE-0TE4buV3VHh8VViLowFh8k3bfYoyWOpblMUv86u3VCv7n42m2h_oNiKld--NXfiXL_WggMNxemBvI' },
    { id:5,  name:'Cashmere Knit Turtleneck',     price:175, originalPrice:null,rating:4.7, tag:null,   categories:[],                 img:'https://lh3.googleusercontent.com/aida-public/AB6AXuBfaJV1-IsTqEfcSkK8oPKFKz0rMZ6OPlHLDFr6KpGynO1H8ewW_i_ApSMeJuYOovPElwB9ubB7I8w022oRiHDjm5myUrO0LDL1nJH1QyCi_nLA6MH1dJ1zUj6ajZdDwqdt2QbQxG370Mmb5umpCuf3W20VTWt_W_5TR7Cze45M92wMyjFuE8-HGI0X7M80cRGnY0aZ1qRYzQsbWYe2k7JaDKey8-jfU03Bq00RYdq-iBwQPfSLLz4z_LkgzjcCQ8PJiRrrM2uIuFs' },
    { id:6,  name:'Silk Cascade Gown',            price:320, originalPrice:450, rating:4.9, tag:'Sale', categories:['dress','silk'],   img:'https://lh3.googleusercontent.com/aida-public/AB6AXuBfaJV1-IsTqEfcSkK8oPKFKz0rMZ6OPlHLDFr6KpGynO1H8ewW_i_ApSMeJuYOovPElwB9ubB7I8w022oRiHDjm5myUrO0LDL1nJH1QyCi_nLA6MH1dJ1zUj6ajZdDwqdt2QbQxG370Mmb5umpCuf3W20VTWt_W_5TR7Cze45M92wMyjFuE8-HGI0X7M80cRGnY0aZ1qRYzQsbWYe2k7JaDKey8-jfU03Bq00RYdq-iBwQPfSLLz4z_LkgzjcCQ8PJiRrrM2uIuFs' },
    { id:7,  name:'Structured Wool Blazer',       price:265, originalPrice:null,rating:4.8, tag:'New',  categories:['blazer'],         img:'https://lh3.googleusercontent.com/aida-public/AB6AXuAWheRWs7iyA0V_Gc4tvwCgv7t3GdLrU6XtuoIzZFIxVrgwqCULkHZmH79qPhJSi4hrByaN76QQa1mVYdLpJFzkuJtHMoHTNMazuMGjEnk9fh2ti4mGVnZavW5-lmgdl2RmV4oItgXdN_xShw8pSELSYtuLoFBiI8fsGnEfhxEhcmG7auuzkP9mDoKfnNj6dYpEbTZkRn5l-4jkmG28cRKlpaFnwMB-yVS5wDnRnwmpU8YtsI_3DavZnYCdKDYWQ8rZ2FEbN6hXZQY' },
    { id:8,  name:'Pearl Embellished Blouse',     price:115, originalPrice:null,rating:4.6, tag:null,   categories:['silk'],           img:'https://lh3.googleusercontent.com/aida-public/AB6AXuAvSqTt_tMuYrY_y6TCqEqfqyFDuZ9aniQoxbshhfqgXw6uQ_uaUHq9Ouri-lqUPXrdCxgcEk6uxTuRcH_GRt9XbTsjaC2HPy3rJWyK2NvgkXPqC1X6S8P_jzU8VgRgDFosBEW_R3BiI1dlrxH6UFpUzbpjV6XAxf2BG_b-WqgaUQr5rNCzKO2-z_CQZWY3Lp49iINyPLhXrAOK2xd9OWYu1DYNSvfSKQvmI5xcxm7t4mUbl-GY79Ow01olMZNT_p5Ida75DXeTHyc' },
    { id:9,  name:'Velvet Wrap Coat',             price:295, originalPrice:380, rating:4.7, tag:'Sale', categories:['coat'],           img:'https://lh3.googleusercontent.com/aida-public/AB6AXuCTRr_t5u_eQa2oKpEkKUgv0tDSSELFizzuTkb5pFn1JvWRYZDIkvl_ET_zVCuU3M2xrzQIUyei6Gv399cXBTEOqw1mtmm05Rg8YJmRqATkUeFhsFEoIF9451fK-FAlVoPvHvBQF5oI5s-aSJtwdFH8l7TgnOmgjgdfJklcQTOEJIGP_QRUZsbRJ0Gf463o7eczpBKIAmn_ijDq2rGMxqFH7m59myinF4H7vJDtK-9c7gIKPnVoU0itPEV5EGPBLF1F21k3_U9rjck' },
    { id:10, name:'High-Waist Tailored Trousers', price:145, originalPrice:null,rating:4.5, tag:null,   categories:[],                 img:'https://lh3.googleusercontent.com/aida-public/AB6AXuCugeNj_QgSPDb4n45W2ymfnlx-jJkkoCwslV6DjpXU6rBC8SiotcrVuY1oGq8drntWEW59Pq4TJHiaPjPwqWEonkQPuY0svtnwrEt3XsKXgHokEKqM-pGN0cjD-w8v2m1DIA6Q94eupRmxRzAQAjBZI6A0cQFOoOUtVfdZlBB-4YD6l-ETj5tzXDPro16PjF53De5NMJLXX75BBCpQ07Q5coYzMPs7cOShy2MTmMV0huiejU3N-ZdbeLr5tIufq9Q7BX-gE2P0sYI' },
    { id:11, name:'Floral Midi Skirt',            price:89,  originalPrice:null,rating:4.4, tag:null,   categories:['dress'],          img:'https://lh3.googleusercontent.com/aida-public/AB6AXuD94MOQRP8UBbwodTjvgABs3vNhO4bcaAHXvh9dTYOERxhFhAuI1q8_XtkThiTToA4PHoxjA2IkKQSCDb4TDhqL_qWvBAKUXQP-uRDl0Qb7nktOoE5Sf6RyW6Piw6aysbg7y4VwKA-wNMzkL41HvLevLQGrvVlFqwBIE3pa43w0qEMndB2Tez4luOPdOtarWiRSApcOS6O9S-y-bTRCDqM-AkZUloVGHS52KNm09VGcFKCL5qe_hZBjFLYwY0WL35MrL6Lu4dTAgRI' },
    { id:12, name:'Oversized Linen Shirt',        price:79,  originalPrice:null,rating:4.3, tag:'New',  categories:['linen'],          img:'https://lh3.googleusercontent.com/aida-public/AB6AXuCHiF_BI0XXui4SMyQnzhuB92T9Iyl6olfEMVxqzFW5nityWLda9P4WlWoEsHEJTHcOV1crempk5_DeLnHpezBOqWXKPa9HFMl51JYqikgnVMbRQNmy_GLtUIeWoQ23GHGIPpFN5Nd3QPTiWzjOJUbBljGiInerZgB3cOLNHHZmqaEO8ihRCZ5ie42LL2jQPG_rVNIzCpjdKPswNaMbcDUv5xUsCooByYmpeuTxmd3ju32caIVeKk0HDoew7pn0Bz_nzN3Tn3S9lVw' },
];

// ══════════════════════════════════════════════════════════
//  3. TOAST NOTIFICATION
// ══════════════════════════════════════════════════════════
const showToast = (msg, type = 'success') => {
    let box = document.getElementById('fh-toast-box');
    if (!box) {
        box = document.createElement('div');
        box.id = 'fh-toast-box';
        box.style.cssText = 'position:fixed;top:90px;right:18px;z-index:99999;display:flex;flex-direction:column;gap:10px;pointer-events:none;';
        document.body.appendChild(box);
    }
    const bg = type === 'error' ? '#ba1a1a' : type === 'info' ? '#545f73' : 'linear-gradient(135deg,#b80035,#e11d48)';
    const t  = document.createElement('div');
    t.style.cssText = `background:${bg};color:#fff;padding:13px 20px;border-radius:14px;font-family:Inter,sans-serif;font-size:14px;font-weight:600;box-shadow:0 8px 28px rgba(0,0,0,.18);max-width:320px;pointer-events:auto;opacity:0;transform:translateX(24px);transition:all .28s cubic-bezier(.4,0,.2,1);`;
    t.textContent = msg;
    box.appendChild(t);
    requestAnimationFrame(() => { t.style.opacity = '1'; t.style.transform = 'translateX(0)'; });
    setTimeout(() => {
        t.style.opacity = '0'; t.style.transform = 'translateX(24px)';
        setTimeout(() => t.remove(), 300);
    }, 3500);
};

// ══════════════════════════════════════════════════════════
//  4. FORM VALIDATION HELPERS
// ══════════════════════════════════════════════════════════
const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

const setErr = (input, msg) => {
    clearErr(input);
    input.style.outline = '2px solid #ba1a1a';
    input.style.background = '#fff5f5';
    const p = document.createElement('p');
    p.className = 'fh-err';
    p.style.cssText = 'color:#ba1a1a;font-size:12px;font-weight:600;margin-top:5px;padding-left:4px;';
    p.textContent = msg;
    input.parentElement.appendChild(p);
};
const clearErr = (input) => {
    input.parentElement.querySelectorAll('.fh-err').forEach(e => e.remove());
    input.style.outline = '';
    input.style.background = '';
};

// ══════════════════════════════════════════════════════════
//  5. CART BADGE (shared)
// ══════════════════════════════════════════════════════════
const updateCartBadge = () => {
    const total = getCart().reduce((s, i) => s + (i.quantity || 1), 0);
    document.querySelectorAll('.cart-badge').forEach(b => {
        b.textContent = total;
        b.style.display = total > 0 ? 'flex' : 'none';
    });
};

// ══════════════════════════════════════════════════════════
//  6. NAVBAR  – runs on every page
// ══════════════════════════════════════════════════════════
const setupNavbar = () => {
    const nav = document.querySelector('nav');
    if (!nav) return;

    const user        = getUser();
    const authLink    = nav.querySelector('[data-role="auth-link"]');
    const profileLink = nav.querySelector('[data-role="profile-link"]');
    const logoutBtn   = nav.querySelector('[data-role="logout-btn"]');
    const currentPage = window.location.pathname.toLowerCase();

    if (user) {
        if (authLink)    authLink.style.display    = 'none';
        if (profileLink) { profileLink.style.display = ''; profileLink.textContent = `👤 ${user.fullName.split(' ')[0]}`; }
        if (logoutBtn)   logoutBtn.style.display   = '';
    } else {
        if (authLink)    authLink.style.display    = '';
        if (profileLink) profileLink.style.display = 'none';
        if (logoutBtn)   logoutBtn.style.display   = 'none';
    }

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', e => {
            e.preventDefault();
            setStorage('currentUser', null);
            setStorage('fashionCart', []);
            showToast('Logged out. See you soon! 👋', 'info');
            setTimeout(() => window.location.href = 'index.html', 900);
        });
    }

    // Icon buttons → navigate
    nav.querySelectorAll('.material-symbols-outlined').forEach(icon => {
        const txt = icon.textContent.trim();
        const btn = icon.closest('button');
        if (!btn) return;
        btn.style.cursor = 'pointer';
        if (txt === 'person')       btn.addEventListener('click', () => window.location.href = user ? 'profile.html' : 'login.html');
        if (txt === 'shopping_bag' && !currentPage.includes('cart')) btn.addEventListener('click', () => window.location.href = 'cart.html');
        if (txt === 'mail'         && !currentPage.includes('contact')) btn.addEventListener('click', () => window.location.href = 'contact.html');
    });

    updateCartBadge();
};

// ══════════════════════════════════════════════════════════
//  7. HOME PAGE  – product grid + search + filter
// ══════════════════════════════════════════════════════════
const setupHome = () => {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    const user = getUser();

    // ── Render products (filtered) ────────────────────────
    const renderProducts = (keyword = '', category = 'all') => {
        grid.querySelectorAll('.product-card').forEach(c => c.remove());
        const kw = keyword.trim().toLowerCase();

        const list = PRODUCTS.filter(p => {
            const matchKw  = !kw || p.name.toLowerCase().includes(kw)
                || (p.tag||'').toLowerCase().includes(kw)
                || (p.categories||[]).some(c => c.includes(kw));
            const matchCat = category === 'all'
                || (category === 'sale' && p.tag === 'Sale')
                || (category === 'new'  && p.tag === 'New')
                || (p.categories||[]).includes(category);
            return matchKw && matchCat;
        });

        const noRes  = document.getElementById('no-results');
        const cntEl  = document.getElementById('search-result-count');
        if (noRes) noRes.style.display = list.length === 0 ? 'block' : 'none';
        if (cntEl) {
            cntEl.style.display = (kw || category !== 'all') ? 'block' : 'none';
            cntEl.textContent   = `${list.length} product${list.length !== 1 ? 's' : ''} found`;
        }

        list.forEach(p => {
            const tagHtml  = p.tag ? `<span style="position:absolute;top:16px;left:16px;z-index:10;padding:3px 10px;background:${p.tag==='Sale'?'#b80035':'#38635c'};color:#fff;font-size:10px;font-weight:700;text-transform:uppercase;border-radius:999px;">${p.tag}</span>` : '';
            const origHtml = p.originalPrice ? `<span style="color:#b80035;font-size:13px;font-weight:700;text-decoration:line-through;opacity:.5;">$${p.originalPrice}.00</span>` : '';
            const stars    = '★'.repeat(Math.floor(p.rating)) + (p.rating % 1 >= .5 ? '½' : '');
            const btnLabel = user ? 'Add to Cart' : 'Login to Buy';

            const card = document.createElement('div');
            card.className = 'product-card group bg-white rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2';
            card.style.boxShadow = '0 4px 20px rgba(92,63,64,.08)';
            card.innerHTML = `
                <div style="position:relative;overflow:hidden;aspect-ratio:3/4;">
                    ${tagHtml}
                    <img src="${p.img}" alt="${p.name}" loading="lazy" style="width:100%;height:100%;object-fit:cover;transition:transform .5s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"/>
                </div>
                <div style="padding:24px;">
                    <h3 style="font-family:Manrope,sans-serif;font-weight:700;font-size:15px;color:#191c1e;margin-bottom:4px;">${p.name}</h3>
                    <div style="color:#f59e0b;font-size:13px;margin-bottom:4px;">${stars} <span style="color:#5c3f40;font-size:12px;">(${p.rating})</span></div>
                    <div style="display:flex;justify-content:space-between;align-items:center;margin:8px 0 20px;">
                        <span style="color:#5c3f40;font-weight:600;">$${p.price}.00</span>
                        ${origHtml}
                    </div>
                    <button class="add-to-cart-btn" data-id="${p.id}"
                        style="width:100%;padding:12px;background:linear-gradient(135deg,#b80035,#e11d48);color:#fff;border:none;border-radius:10px;font-weight:700;font-size:13px;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;transition:opacity .2s,transform .15s;">
                        ${btnLabel}
                    </button>
                </div>`;
            grid.appendChild(card);
        });

        // Wire buttons
        grid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => btn.style.opacity = '.88');
            btn.addEventListener('mouseleave', () => btn.style.opacity = '1');
            btn.addEventListener('click', () => addToCart(parseInt(btn.dataset.id)));
        });
    };

    // Expose for the "Show All" inline button in HTML
    window.renderProducts = renderProducts;
    renderProducts();

    // ── Search ────────────────────────────────────────────
    const searchInput = document.getElementById('product-search');
    const clearBtn    = document.getElementById('search-clear');
    let   activeCat   = 'all';
    let   debounce;

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const v = searchInput.value;
            if (clearBtn) clearBtn.style.display = v ? 'block' : 'none';
            clearTimeout(debounce);
            debounce = setTimeout(() => renderProducts(v, activeCat), 200);
        });
        searchInput.addEventListener('search', () => {
            if (clearBtn) clearBtn.style.display = 'none';
            renderProducts('', activeCat);
        });
    }
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            clearBtn.style.display = 'none';
            renderProducts('', activeCat);
            if (searchInput) searchInput.focus();
        });
    }

    // ── Filter pills ──────────────────────────────────────
    document.querySelectorAll('.filter-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            activeCat = pill.dataset.filter || 'all';
            renderProducts(searchInput ? searchInput.value : '', activeCat);
        });
    });
};

// ── Add to Cart (also used from other places) ─────────────
const addToCart = (productId) => {
    const user = getUser();
    if (!user) {
        showToast('Please login to add items to your bag 🔒', 'error');
        setTimeout(() => window.location.href = 'login.html', 1200);
        return;
    }
    const p = PRODUCTS.find(x => x.id === productId);
    if (!p) return;

    const cart = getCart();
    const ex   = cart.find(i => i.id === productId);
    if (ex) { ex.quantity = (ex.quantity || 1) + 1; }
    else    { cart.push({ id: p.id, name: p.name, price: p.price, img: p.img, quantity: 1 }); }

    setStorage('fashionCart', cart);
    updateCartBadge();
    showToast(`"${p.name}" added to your bag! 🛍️`);
};

// ══════════════════════════════════════════════════════════
//  8. REGISTER PAGE
// ══════════════════════════════════════════════════════════
const setupRegister = () => {
    const form = document.getElementById('register-form');
    if (!form) return;

    // Already logged in → go home
    if (getUser()) { window.location.href = 'index.html'; return; }

    const fName    = document.getElementById('reg-name');
    const fEmail   = document.getElementById('reg-email');
    const fPhone   = document.getElementById('reg-phone');
    const fPass    = document.getElementById('reg-password');
    const fConfirm = document.getElementById('reg-confirm');
    const terms    = document.getElementById('terms');
    const bars     = form.querySelectorAll('.strength-bar');
    const label    = document.getElementById('strength-label');

    // Password strength meter
    if (fPass) {
        fPass.addEventListener('input', () => {
            const v  = fPass.value;
            let score = 0;
            if (v.length >= 8) score++;
            if (/[A-Z]/.test(v) && /[a-z]/.test(v)) score++;
            if (/[0-9!@#$%^&*]/.test(v)) score++;
            const colors = ['#ba1a1a', '#f59e0b', '#16a34a'];
            const names  = ['Weak', 'Medium', 'Strong'];
            bars.forEach((b, i) => b.style.background = i < score ? colors[score-1] : '#e5bdbe');
            if (label) { label.textContent = score ? names[score-1] : ''; label.style.color = colors[score-1] || '#906f70'; }
        });
    }

    // Confirm match on blur
    if (fConfirm) {
        fConfirm.addEventListener('input', () => {
            if (fConfirm.value && fConfirm.value !== fPass.value) setErr(fConfirm, 'Passwords do not match');
            else clearErr(fConfirm);
        });
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
        let ok = true;

        const name    = fName.value.trim();
        const email   = fEmail.value.trim();
        const phone   = fPhone ? fPhone.value.trim() : '';
        const pass    = fPass.value;
        const confirm = fConfirm.value;

        if (name.length < 3)      { setErr(fName, 'Name must be at least 3 characters'); ok = false; } else clearErr(fName);
        if (!isValidEmail(email)) { setErr(fEmail, 'Enter a valid email address'); ok = false; }        else clearErr(fEmail);
        if (phone && !/^[\d\s+\-()]{7,15}$/.test(phone)) { setErr(fPhone, 'Invalid phone number'); ok = false; } else if (fPhone) clearErr(fPhone);
        if (pass.length < 8)      { setErr(fPass, 'Password must be at least 8 characters'); ok = false; } else clearErr(fPass);
        if (pass !== confirm)     { setErr(fConfirm, 'Passwords do not match'); ok = false; }           else clearErr(fConfirm);
        if (terms && !terms.checked) { showToast('Please accept the Terms and Conditions', 'error'); ok = false; }
        if (!ok) return;

        const accounts = getStorage('registeredAccounts') || [];
        if (accounts.some(a => a.email.toLowerCase() === email.toLowerCase())) {
            setErr(fEmail, 'This email is already registered'); return;
        }

        accounts.push({ fullName: name, email, phone, password: pass });
        setStorage('registeredAccounts', accounts);
        showToast('Account created! Redirecting to login… ✨');
        const btn = form.querySelector('[type="submit"]');
        if (btn) { btn.textContent = 'Account Created ✓'; btn.disabled = true; }
        setTimeout(() => window.location.href = 'login.html', 1400);
    });
};

// ══════════════════════════════════════════════════════════
//  9. LOGIN PAGE
// ══════════════════════════════════════════════════════════
const setupLogin = () => {
    const form = document.getElementById('login-form');
    if (!form) return;

    if (getUser()) { window.location.href = 'index.html'; return; }

    const fEmail    = document.getElementById('email');
    const fPass     = document.getElementById('password');
    const toggleBtn = document.getElementById('toggle-password');
    const remember  = document.getElementById('remember-me');

    // Pre-fill remembered email
    const saved = localStorage.getItem('fh_remember');
    if (saved && fEmail) { fEmail.value = saved; if (remember) remember.checked = true; }

    // Toggle password visibility
    if (toggleBtn && fPass) {
        toggleBtn.addEventListener('click', () => {
            const show = fPass.type === 'password';
            fPass.type = show ? 'text' : 'password';
            const icon = toggleBtn.querySelector('.material-symbols-outlined');
            if (icon) icon.textContent = show ? 'visibility_off' : 'visibility';
        });
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
        let ok = true;

        const email = fEmail ? fEmail.value.trim() : '';
        const pass  = fPass  ? fPass.value          : '';

        if (!email)            { setErr(fEmail, 'Email is required'); ok = false; }
        else if (!isValidEmail(email)) { setErr(fEmail, 'Invalid email format'); ok = false; }
        else clearErr(fEmail);

        if (!pass) { setErr(fPass, 'Password is required'); ok = false; }
        else clearErr(fPass);

        if (!ok) return;

        const accounts = getStorage('registeredAccounts') || [];
        const user = accounts.find(a => a.email.toLowerCase() === email.toLowerCase() && a.password === pass);

        if (!user) {
            setErr(fEmail, 'Invalid email or password');
            setErr(fPass,  'Invalid email or password');
            showToast('Incorrect credentials. Please try again.', 'error');
            return;
        }

        if (remember && remember.checked) localStorage.setItem('fh_remember', email);
        else localStorage.removeItem('fh_remember');

        setStorage('currentUser', user);
        showToast(`Welcome back, ${user.fullName.split(' ')[0]}! ✨`);
        const btn = form.querySelector('[type="submit"]');
        if (btn) { btn.textContent = 'Welcome Back ✓'; btn.disabled = true; }
        setTimeout(() => window.location.href = 'index.html', 1000);
    });
};

// ══════════════════════════════════════════════════════════
//  10. CART PAGE
// ══════════════════════════════════════════════════════════
const setupCart = () => {
    // Protected route
    if (!getUser()) { window.location.href = 'login.html'; return; }

    const container  = document.getElementById('cart-items');
    const emptyState = document.getElementById('cart-empty');
    const section    = document.getElementById('cart-section');
    const subtotalEl = document.getElementById('cart-subtotal');
    const shippingEl = document.getElementById('cart-shipping');
    const taxEl      = document.getElementById('cart-tax');
    const totalEl    = document.getElementById('cart-total');
    const countEl    = document.getElementById('cart-item-count');
    const checkoutBtn= document.getElementById('checkout-btn');

    const SHIPPING = 5;
    const TAX_RATE = 0.10;

    // ── Update order summary numbers ──────────────────────
    const updateSummary = () => {
        const cart     = getCart();
        const subtotal = cart.reduce((s, i) => s + i.price * (i.quantity || 1), 0);
        const shipping = cart.length > 0 ? SHIPPING : 0;
        const tax      = subtotal * TAX_RATE;
        const total    = subtotal + shipping + tax;
        if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        if (shippingEl) shippingEl.textContent = `$${shipping.toFixed(2)}`;
        if (taxEl)      taxEl.textContent      = `$${tax.toFixed(2)}`;
        if (totalEl)    totalEl.textContent    = `$${total.toFixed(2)}`;
    };

    // ── Render cart items ─────────────────────────────────
    const renderCart = () => {
        const cart = getCart();

        // Item count header
        if (countEl) countEl.textContent = `${cart.length} item${cart.length !== 1 ? 's' : ''}`;

        // Toggle empty / filled views
        if (cart.length === 0) {
            if (emptyState) emptyState.style.display   = '';
            if (section)    section.style.display      = 'none';
            return;
        }
        if (emptyState)  emptyState.style.display  = 'none';
        if (section)     section.style.display     = '';   // grid is set via Tailwind class

        if (!container) return;
        container.innerHTML = '';

        cart.forEach((item, idx) => {
            const row = document.createElement('div');
            row.style.cssText = 'display:flex;gap:20px;align-items:flex-start;flex-wrap:wrap;padding:24px 0;border-bottom:1px solid #e5bdbe40;';
            row.innerHTML = `
                <div style="width:96px;height:120px;border-radius:12px;overflow:hidden;flex-shrink:0;">
                    <img src="${item.img}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;">
                </div>
                <div style="flex:1;min-width:160px;">
                    <h3 style="font-family:Manrope,sans-serif;font-size:17px;font-weight:700;color:#191c1e;margin-bottom:4px;">${item.name}</h3>
                    <p style="font-size:13px;color:#5c3f40;margin-bottom:16px;">Unit price: <strong>$${item.price.toFixed(2)}</strong></p>
                    <div style="display:flex;flex-wrap:wrap;align-items:center;gap:16px;">
                        <div style="display:flex;align-items:center;background:#f2f4f6;border-radius:999px;border:1px solid #e5bdbe;">
                            <button class="qty-btn" data-action="minus" data-idx="${idx}" style="width:36px;height:36px;background:none;border:none;cursor:pointer;font-size:20px;color:#5c3f40;line-height:1;display:flex;align-items:center;justify-content:center;">−</button>
                            <span style="width:40px;text-align:center;font-weight:700;font-size:14px;">${item.quantity || 1}</span>
                            <button class="qty-btn" data-action="plus"  data-idx="${idx}" style="width:36px;height:36px;background:none;border:none;cursor:pointer;font-size:20px;color:#5c3f40;line-height:1;display:flex;align-items:center;justify-content:center;">+</button>
                        </div>
                        <span style="font-family:Manrope,sans-serif;font-weight:800;font-size:18px;color:#b80035;">$${((item.quantity||1)*item.price).toFixed(2)}</span>
                        <button class="remove-btn" data-idx="${idx}" style="background:none;border:none;cursor:pointer;color:#906f70;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;display:flex;align-items:center;gap:4px;">
                            <span class="material-symbols-outlined" style="font-size:16px;font-variation-settings:'FILL' 0,'wght' 400;">delete</span> Remove
                        </button>
                    </div>
                </div>`;
            container.appendChild(row);
        });

        // Quantity buttons
        container.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const c   = getCart();
                const i   = parseInt(btn.dataset.idx);
                const act = btn.dataset.action;
                if (act === 'plus') {
                    c[i].quantity = (c[i].quantity || 1) + 1;
                } else {
                    if ((c[i].quantity || 1) > 1) c[i].quantity -= 1;
                    else { c.splice(i, 1); }
                }
                setStorage('fashionCart', c);
                updateCartBadge();
                renderCart();
                updateSummary();
            });
        });

        // Remove buttons
        container.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const c = getCart();
                const i = parseInt(btn.dataset.idx);
                const n = c[i].name;
                c.splice(i, 1);
                setStorage('fashionCart', c);
                updateCartBadge();
                showToast(`"${n}" removed from your bag`);
                renderCart();
                updateSummary();
            });
        });

        updateSummary();
    };

    // ── Checkout ──────────────────────────────────────────
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const cart = getCart();
            if (cart.length === 0) { showToast('Your bag is empty!', 'error'); return; }

            const subtotal = cart.reduce((s, i) => s + i.price * (i.quantity || 1), 0);
            const total    = subtotal + SHIPPING + subtotal * TAX_RATE;

            const history = getHistory();
            history.unshift({
                id:     'FH-' + Math.random().toString(36).substr(2,6).toUpperCase(),
                date:   new Date().toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' }),
                items:  cart.map(i => ({ name: i.name, qty: i.quantity || 1, price: i.price })),
                total:  total.toFixed(2),
                status: 'Processing'
            });
            setStorage('purchaseHistory', history);
            setStorage('fashionCart', []);
            updateCartBadge();

            // Visual feedback on button
            checkoutBtn.textContent = '✓ Order Placed!';
            checkoutBtn.disabled = true;
            checkoutBtn.style.background = '#16a34a';

            showToast('Order placed successfully! Thank you 🎉');
            setTimeout(() => window.location.href = 'profile.html', 1800);
        });
    }

    renderCart();
};

// ══════════════════════════════════════════════════════════
//  11. PROFILE PAGE
// ══════════════════════════════════════════════════════════
const setupProfile = () => {
    // Protected route
    const user = getUser();
    if (!user) { window.location.href = 'login.html'; return; }

    // Fill display elements
    document.querySelectorAll('[data-profile="name"]').forEach(el  => el.textContent = user.fullName);
    document.querySelectorAll('[data-profile="email"]').forEach(el => el.textContent = user.email);

    // Populate form fields
    const fName  = document.getElementById('profile-name');
    const fEmail = document.getElementById('profile-email');
    const fPhone = document.getElementById('profile-phone');
    if (fName)  fName.value  = user.fullName || '';
    if (fEmail) fEmail.value = user.email    || '';
    if (fPhone) fPhone.value = user.phone    || '';

    // ── Save profile ──────────────────────────────────────
    const saveBtn = document.getElementById('save-profile-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const newName  = fName  ? fName.value.trim()  : user.fullName;
            const newEmail = fEmail ? fEmail.value.trim() : user.email;
            const newPhone = fPhone ? fPhone.value.trim() : user.phone;

            if (newName.length < 2)      { showToast('Name must be at least 2 characters', 'error'); return; }
            if (!isValidEmail(newEmail)) { showToast('Enter a valid email address', 'error'); return; }

            const accounts = getStorage('registeredAccounts') || [];
            const idx = accounts.findIndex(a => a.email.toLowerCase() === user.email.toLowerCase());
            const updated = { ...user, fullName: newName, email: newEmail, phone: newPhone };
            if (idx !== -1) { accounts[idx] = { ...accounts[idx], ...updated }; setStorage('registeredAccounts', accounts); }
            setStorage('currentUser', updated);

            document.querySelectorAll('[data-profile="name"]').forEach(el => el.textContent = newName);
            showToast('Profile updated successfully ✓');
        });
    }

    // ── Logout links (sidebar) ────────────────────────────
    document.querySelectorAll('[data-role="profile-logout"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            setStorage('currentUser', null);
            setStorage('fashionCart', []);
            showToast('Logged out. See you soon! 👋', 'info');
            setTimeout(() => window.location.href = 'index.html', 900);
        });
    });

    // ── Order history ─────────────────────────────────────
    const histContainer = document.getElementById('order-history');
    const histEmpty     = document.getElementById('orders-empty');
    if (!histContainer) return;

    const history = getHistory();
    if (history.length === 0) {
        histContainer.innerHTML = '';
        if (histEmpty) histEmpty.style.display = '';
        return;
    }
    if (histEmpty) histEmpty.style.display = 'none';

    const statusColor = { Processing:'#f59e0b', Shipped:'#16a34a', Delivered:'#0284c7', Cancelled:'#ba1a1a' };

    histContainer.innerHTML = history.map(order => `
        <div style="background:#fff;border-radius:14px;padding:20px 24px;margin-bottom:14px;box-shadow:0 2px 12px rgba(92,63,64,.07);border:1px solid #e5bdbe30;display:flex;flex-wrap:wrap;gap:16px;align-items:center;">
            <div style="flex:1;min-width:120px;">
                <p style="font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:#906f70;font-weight:700;margin-bottom:4px;">Date</p>
                <p style="font-size:14px;font-weight:600;color:#191c1e;">${order.date}</p>
            </div>
            <div style="flex:1;min-width:110px;">
                <p style="font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:#906f70;font-weight:700;margin-bottom:4px;">Order ID</p>
                <p style="font-size:14px;font-weight:600;color:#191c1e;">#${order.id}</p>
            </div>
            <div style="flex:2;min-width:180px;">
                <p style="font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:#906f70;font-weight:700;margin-bottom:4px;">Items</p>
                <p style="font-size:13px;color:#5c3f40;">${order.items ? order.items.map(i => `${i.name} ×${i.qty}`).join(', ') : 'N/A'}</p>
            </div>
            <div style="flex:1;min-width:90px;">
                <p style="font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:#906f70;font-weight:700;margin-bottom:4px;">Total</p>
                <p style="font-size:17px;font-weight:800;color:#b80035;">$${order.total}</p>
            </div>
            <div>
                <span style="background:${(statusColor[order.status]||'#906f70')}20;color:${statusColor[order.status]||'#906f70'};font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;padding:6px 14px;border-radius:999px;">${order.status}</span>
            </div>
        </div>`).join('');
};

// ══════════════════════════════════════════════════════════
//  12. CONTACT PAGE
// ══════════════════════════════════════════════════════════
const setupContact = () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const fName    = document.getElementById('contact-name');
    const fEmail   = document.getElementById('contact-email');
    const fSubject = document.getElementById('contact-subject');
    const fMsg     = document.getElementById('contact-message');

    // Real-time hints on blur
    [fName, fEmail, fSubject, fMsg].forEach(f => {
        if (!f) return;
        f.addEventListener('blur', () => {
            if (!f.value.trim()) setErr(f, 'This field is required');
            else clearErr(f);
        });
        f.addEventListener('input', () => { if (f.value.trim()) clearErr(f); });
    });

    form.addEventListener('submit', e => {
        e.preventDefault();
        let ok = true;

        const name    = fName    ? fName.value.trim()    : '';
        const email   = fEmail   ? fEmail.value.trim()   : '';
        const subject = fSubject ? fSubject.value.trim() : '';
        const message = fMsg     ? fMsg.value.trim()     : '';

        if (name.length < 3)     { setErr(fName,    'Name must be at least 3 characters'); ok = false; }    else clearErr(fName);
        if (!isValidEmail(email)){ setErr(fEmail,   'Enter a valid email address'); ok = false; }           else clearErr(fEmail);
        if (subject.length < 3)  { setErr(fSubject, 'Subject must be at least 3 characters'); ok = false; } else clearErr(fSubject);
        if (message.length < 10) { setErr(fMsg,     'Message must be at least 10 characters'); ok = false; }else clearErr(fMsg);

        if (!ok) return;

        const msgs = getStorage('fashionMessages') || [];
        msgs.push({ date: new Date().toISOString(), name, email, subject, message });
        setStorage('fashionMessages', msgs);

        showToast("Message sent! We'll reply within 24 hours 💌");
        form.reset();
    });
};

// ══════════════════════════════════════════════════════════
//  13. ROUTER  –  boot on DOMContentLoaded
// ══════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    setupNavbar();

    const p = window.location.pathname.toLowerCase();
    if      (p.includes('register')) setupRegister();
    else if (p.includes('login'))    setupLogin();
    else if (p.includes('profile'))  setupProfile();
    else if (p.includes('cart'))     setupCart();
    else if (p.includes('contact'))  setupContact();
    else                             setupHome();
});
