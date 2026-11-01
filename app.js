import { createClient } from '@supabase/supabase-js'

const config = {
  url: import.meta.env.VITE_SUPABASE_URL,
  key: import.meta.env.VITE_SUPABASE_ANON_KEY,
}
const supabase = config.url && config.key ? createClient(config.url, config.key) : null
const root = document.querySelector('#app')
const toast = document.querySelector('#toast')
const formatMoney = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 })
const languageNames = { en: 'English', ta: 'தமிழ்' }
const strings = {
  en: {
    app: 'ShopLedger', subtitle: 'A clearer picture of your shop.', login: 'Welcome back', loginHelp: 'Sign in to your private shop ledger.',
    signup: 'Create shop account', signupHelp: 'Your ledger is private to your shop and syncs across your devices.',
    email: 'Email address', password: 'Password', shopName: 'Shop name', signIn: 'Sign in', createAccount: 'Create account',
    forgot: 'Forgot password?', resetSent: 'Password reset link sent. Check your email.', setup: 'Cloud setup required',
    setupHelp: 'Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to the local .env file and GitHub Actions secrets, then apply the Supabase migration. The public site cannot connect until these are configured.',
    setupInstructions: 'Create a separate Supabase project, run',
    setupInstructionsEnd: ', and configure the local .env plus GitHub Actions secrets before enabling signup.',
    signOut: 'Sign out', overview: 'Overview', customers: 'Customers', recentActivity: 'Recent activity', search: 'Search customers or notes',
    totalDue: 'Total outstanding', owe: 'Customers owing', received: 'Payments this month', cashSales: 'Cash sales this month',
    addCustomer: 'Add customer', addEntry: 'Add entry', export: 'Export CSV', allCustomers: 'All customers', owing: 'Owing', advance: 'In advance',
    customer: 'Customer', phone: 'Phone number (optional)', balance: 'Balance', action: 'Action', noCustomers: 'No customers yet',
    startLedger: 'Add a customer to start your ledger.', noResults: 'No customers match your search.', noActivity: 'No transactions yet.',
    credit: 'Credit given', payment: 'Payment received', sale: 'Cash sale', name: 'Customer name', amount: 'Amount (₹)',
    note: 'Note (optional)', date: 'Date', save: 'Save entry', cancel: 'Cancel', saveCustomer: 'Save customer',
    edit: 'Edit', delete: 'Delete', reminder: 'WhatsApp reminder', voice: 'Speak an entry', listening: 'Listening…',
    voiceHint: 'Say, for example: “Ravi 200 credit” or “Ravi paid 200”. Confirm before saving.',
    confirmDelete: 'Delete this item? This cannot be undone.', invalid: 'Enter a customer and a valid amount greater than zero.',
    phoneHint: 'Use country code for WhatsApp, e.g. 919876543210.', language: 'Language', theme: 'Theme', light: 'Light', dark: 'Dark',
    welcome: 'Good to see you', emptyCustomer: 'Add your first customer', dueLabel: 'due', advanceLabel: 'advance',
    loading: 'Loading your private ledger…', saved: 'Saved and synced.', deleted: 'Deleted.', customerSaved: 'Customer saved.',
    entrySaved: 'Entry saved.', searchEmpty: 'Try another search.', syncLive: 'Live sync on', syncPaused: 'Reconnecting…',
    errorPrefix: 'Something went wrong: ', authError: 'Could not authenticate: ', microphoneUnavailable: 'Voice input is not supported in this browser.',
    speechNetwork: 'Voice recognition needs an internet connection. You can type the entry instead.',
    shareReminder: 'Hello {name}, your outstanding balance at {shop} is {amount}. Please settle it when convenient. Thank you!',
    chooseCustomer: 'Choose a customer', correct: 'Please enter a valid phone number with country code.',
    confirmDeleteEntry: 'Delete this transaction? This cannot be undone.', configureEmail: 'If signup confirmation is enabled, verify your address before signing in.',
    emptyShop: 'My Shop', back: 'Back to sign in', nameExists: 'A customer with this name may already exist.',
  },
  ta: {
    app: 'கடை கணக்கு', subtitle: 'உங்கள் கடை கணக்கு தெளிவாக.', login: 'மீண்டும் வருக', loginHelp: 'உங்கள் தனிப்பட்ட கடை கணக்கில் உள்நுழைக.',
    signup: 'கடை கணக்கு உருவாக்கு', signupHelp: 'உங்கள் கடைத் தகவல்கள் தனிப்பட்டவை; உங்கள் சாதனங்களில் ஒத்திசைக்கப்படும்.',
    email: 'மின்னஞ்சல்', password: 'கடவுச்சொல்', shopName: 'கடை பெயர்', signIn: 'உள்நுழை', createAccount: 'கணக்கு உருவாக்கு',
    forgot: 'கடவுச்சொல் மறந்துவிட்டதா?', resetSent: 'கடவுச்சொல் மீட்டமைப்பு இணைப்பு அனுப்பப்பட்டது. மின்னஞ்சலைப் பார்க்கவும்.',
    setup: 'கிளவுட் அமைப்பு தேவை', setupHelp: 'உள்ளூர் .env மற்றும் GitHub Actions secrets-ல் Supabase URL மற்றும் publishable key சேர்த்து migration-ஐ இயக்கவும்.',
    setupInstructions: 'தனியான Supabase திட்டத்தை உருவாக்கி, இந்த migration-ஐ இயக்கவும்:',
    setupInstructionsEnd: 'பதிவைத் திறப்பதற்கு முன் உள்ளூர் .env மற்றும் GitHub Actions secrets-ஐ அமைக்கவும்.',
    signOut: 'வெளியேறு', overview: 'சுருக்கம்', customers: 'வாடிக்கையாளர்கள்', recentActivity: 'சமீபத்திய பரிவர்த்தனைகள்',
    search: 'வாடிக்கையாளர் அல்லது குறிப்பைத் தேடு', totalDue: 'மொத்த நிலுவை', owe: 'பாக்கி உள்ளவர்கள்',
    received: 'இந்த மாதம் வசூல்', cashSales: 'இந்த மாதம் ரொக்க விற்பனை', addCustomer: 'வாடிக்கையாளர் சேர்',
    addEntry: 'பதிவு சேர்', export: 'CSV பதிவிறக்கு', allCustomers: 'அனைவரும்', owing: 'பாக்கி', advance: 'முன்பணம்',
    customer: 'வாடிக்கையாளர்', phone: 'தொலைபேசி (விருப்பம்)', balance: 'இருப்பு', action: 'செயல்',
    noCustomers: 'வாடிக்கையாளர்கள் இல்லை', startLedger: 'கணக்கைத் தொடங்க வாடிக்கையாளரைச் சேர்க்கவும்.',
    noResults: 'தேடலுக்கு வாடிக்கையாளர் இல்லை.', noActivity: 'பரிவர்த்தனைகள் இல்லை.', credit: 'கடன் கொடுத்தது',
    payment: 'பணம் பெற்றது', sale: 'ரொக்க விற்பனை', name: 'வாடிக்கையாளர் பெயர்', amount: 'தொகை (₹)',
    note: 'குறிப்பு (விருப்பம்)', date: 'தேதி', save: 'பதிவைச் சேமி', cancel: 'ரத்து', saveCustomer: 'சேமி',
    edit: 'திருத்து', delete: 'நீக்கு', reminder: 'WhatsApp நினைவூட்டல்', voice: 'பேசி பதிவு செய்',
    listening: 'கேட்கிறது…', voiceHint: 'உதாரணம்: “ரவி 200 கடன்” அல்லது “ரவி 200 கொடுத்தார்”. சேமிக்கும் முன் சரிபார்க்கவும்.',
    confirmDelete: 'நீக்கவா? இதை மீட்டெடுக்க முடியாது.', invalid: 'வாடிக்கையாளர் பெயரும் பூஜ்ஜியத்தை விட அதிகமான தொகையும் தேவை.',
    phoneHint: 'WhatsApp-க்கு நாட்டுக் குறியீட்டுடன் எண்ணை உள்ளிடவும்.', language: 'மொழி', theme: 'தோற்றம்',
    light: 'ஒளி', dark: 'இருள்', welcome: 'வணக்கம்', emptyCustomer: 'முதல் வாடிக்கையாளரைச் சேர்க்கவும்',
    dueLabel: 'பாக்கி', advanceLabel: 'முன்பணம்', loading: 'கணக்கு ஏற்றப்படுகிறது…', saved: 'சேமிக்கப்பட்டு ஒத்திசைக்கப்பட்டது.',
    deleted: 'நீக்கப்பட்டது.', customerSaved: 'வாடிக்கையாளர் சேமிக்கப்பட்டார்.', entrySaved: 'பதிவு சேமிக்கப்பட்டது.',
    searchEmpty: 'வேறு தேடலை முயற்சிக்கவும்.', syncLive: 'நேரடி ஒத்திசைவு இயங்குகிறது', syncPaused: 'மீண்டும் இணைகிறது…',
    errorPrefix: 'பிழை: ', authError: 'உள்நுழைவு தோல்வி: ', microphoneUnavailable: 'இந்த உலாவியில் குரல் உள்ளீடு இல்லை.',
    speechNetwork: 'குரல் அறிதலுக்கு இணையம் தேவை. அல்லது தட்டச்சு செய்யவும்.',
    shareReminder: 'வணக்கம் {name}, {shop} கடையில் உங்கள் பாக்கி {amount}. வசதியானபோது செலுத்துங்கள். நன்றி!',
    chooseCustomer: 'வாடிக்கையாளரைத் தேர்ந்தெடு', correct: 'நாட்டுக் குறியீட்டுடன் சரியான தொலைபேசி எண்ணை உள்ளிடவும்.',
    confirmDeleteEntry: 'இந்தப் பரிவர்த்தனையை நீக்கவா? இதை மீட்டெடுக்க முடியாது.',
    configureEmail: 'மின்னஞ்சல் உறுதிப்படுத்தல் இருந்தால், உள்நுழைவதற்கு முன் முகவரியைச் சரிபார்க்கவும்.',
    emptyShop: 'என் கடை', back: 'உள்நுழைவுக்குத் திரும்பு', nameExists: 'இந்தப் பெயரில் வாடிக்கையாளர் ஏற்கனவே இருக்கலாம்.',
  },
}

const state = {
  language: localStorage.getItem('shop-ledger-language') === 'ta' ? 'ta' : 'en',
  theme: localStorage.getItem('shop-ledger-theme') === 'light' ? 'light' : 'dark',
  session: null,
  profile: null,
  customers: [],
  entries: [],
  filter: 'all',
  search: '',
  selectedCustomer: '',
  authMode: 'signin',
  loading: false,
  channel: null,
  toastTimer: 0,
}
const t = (key) => strings[state.language][key] || strings.en[key] || key
const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]))
const money = (value) => formatMoney.format(Number(value) || 0)
const localDate = (value) => new Date(value).toLocaleDateString(state.language === 'ta' ? 'ta-IN' : 'en-IN', {
  day: 'numeric', month: 'short', year: 'numeric',
})
const balanceFor = (customerId) => state.entries.reduce((total, entry) => {
  if (entry.customer_id !== customerId) return total
  if (entry.kind === 'credit') return total + Number(entry.amount)
  if (entry.kind === 'payment') return total - Number(entry.amount)
  return total
}, 0)
const text = (key) => escapeHTML(t(key))

function showToast(message, error = false) {
  toast.textContent = message
  toast.classList.toggle('toast-error', error)
  toast.classList.add('toast-visible')
  window.clearTimeout(state.toastTimer)
  state.toastTimer = window.setTimeout(() => toast.classList.remove('toast-visible'), 3600)
}

function formatError(error) {
  if (error?.code === '23503') return 'This customer has ledger entries and cannot be removed.'
  if (error?.code === '23505') return t('nameExists')
  return error?.message || String(error)
}

function setTheme() {
  document.documentElement.dataset.theme = state.theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', state.theme === 'dark' ? '#0b1528' : '#f3f6fb')
}

function setLanguage(language) {
  state.language = language === 'ta' ? 'ta' : 'en'
  localStorage.setItem('shop-ledger-language', state.language)
  document.documentElement.lang = state.language
  render()
}

function renderSetup() {
  document.documentElement.lang = state.language
  setTheme()
  root.innerHTML = `
    <main class="setup-screen">
      <header class="brand-row"><a class="brand-mark" href="./" aria-label="${text('app')}"><span class="brand-icon">S</span><span>${text('app')}<small>${text('subtitle')}</small></span></a>${languageControl()}</header>
      <section class="setup-card">
        <span class="setup-icon">⚙</span><p class="eyebrow">${text('setup')}</p>
        <h1>${text('app')} ${text('customers')}</h1>
        <p>${text('setupHelp')}</p>
        <p class="setup-details">${text('setupInstructions')} <code>supabase/migrations/20251101000000_shop_ledger.sql</code>${text('setupInstructionsEnd')}</p>
      </section>
    </main>`
  bindLanguage()
}

function languageControl() {
  return `<label class="language-control"><span>${text('language')}</span><select class="language-select" aria-label="${text('language')}">
    <option value="en" ${state.language === 'en' ? 'selected' : ''}>English</option>
    <option value="ta" ${state.language === 'ta' ? 'selected' : ''}>தமிழ்</option>
  </select></label>`
}

function bindLanguage() {
  document.querySelectorAll('.language-select').forEach((select) => {
    select.addEventListener('change', (event) => setLanguage(event.target.value))
  })
}

function renderAuth() {
  document.documentElement.lang = state.language
  setTheme()
  const isSignup = state.authMode === 'signup'
  root.innerHTML = `
    <main class="auth-shell">
      <header class="brand-row"><a class="brand-mark" href="./"><span class="brand-icon">S</span><span>${text('app')}<small>${text('subtitle')}</small></span></a><div class="header-actions">${languageControl()}${themeControl()}</div></header>
      <section class="auth-layout">
        <aside class="auth-aside">
          <div class="auth-orbit"><span class="orbit-center">₹</span><i></i><b></b><em></em><span class="orbit-tag tag-one">+₹2,400</span><span class="orbit-tag tag-two">Paid ✓</span></div>
          <p class="eyebrow">YOUR SHOP. YOUR NUMBERS.</p><h1>Know what is owed.<br><span>Grow with confidence.</span></h1>
          <p>Keep customer credit and payments together, privately synced across your devices.</p>
          <div class="trust-line"><span>●</span> Private per-shop accounts <span>·</span> Live sync <span>·</span> Tamil voice entry</div>
        </aside>
        <section class="auth-card">
          <p class="eyebrow">${text(isSignup ? 'signup' : 'login')}</p><h2>${text(isSignup ? 'signup' : 'login')}</h2>
          <p class="auth-help">${text(isSignup ? 'signupHelp' : 'loginHelp')}</p>
          <form id="auth-form">
            ${isSignup ? `<label>${text('shopName')}<input name="shopName" autocomplete="organization" maxlength="80" required></label>` : ''}
            <label>${text('email')}<input name="email" type="email" autocomplete="email" required></label>
            <label>${text('password')}<input name="password" type="password" minlength="10" autocomplete="${isSignup ? 'new-password' : 'current-password'}" required></label>
            <p class="form-error" id="auth-error" role="alert"></p>
            <button class="button button-primary button-wide" type="submit" ${state.loading ? 'disabled' : ''}>${text(isSignup ? 'createAccount' : 'signIn')}<span aria-hidden="true">→</span></button>
          </form>
          <div class="auth-footer">
            ${isSignup
              ? `<button class="link-button" id="auth-switch">${text('back')}</button><p class="fine-print">${text('configureEmail')}</p>`
              : `<button class="link-button" id="forgot-password">${text('forgot')}</button><p>${text('signupHelp')}</p><button class="button button-secondary button-wide" id="auth-switch">${text('createAccount')}</button>`}
          </div>
        </section>
      </section>
      <footer class="auth-bottom"><span>🔒 Your shop data is isolated by secure access policies.</span><span>ShopLedger · English / தமிழ்</span></footer>
    </main>`
  bindLanguage()
  bindTheme()
  document.querySelector('#auth-switch')?.addEventListener('click', () => {
    state.authMode = isSignup ? 'signin' : 'signup'
    render()
  })
  document.querySelector('#auth-form')?.addEventListener('submit', onAuthSubmit)
  document.querySelector('#forgot-password')?.addEventListener('click', onForgotPassword)
}

function themeControl() {
  return `<button class="icon-button theme-toggle" data-theme-toggle aria-label="${text('theme')}: ${text(state.theme)}">${state.theme === 'dark' ? '☼' : '☾'}</button>`
}

function bindTheme() {
  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('shop-ledger-theme', state.theme)
      render()
    })
  })
}

async function onAuthSubmit(event) {
  event.preventDefault()
  const form = new FormData(event.currentTarget)
  const email = String(form.get('email')).trim()
  const password = String(form.get('password'))
  const isSignup = state.authMode === 'signup'
  if (password.length < 10) {
    document.querySelector('#auth-error').textContent = 'Use a password with at least 10 characters.'
    return
  }
  state.loading = true
  const submit = event.currentTarget.querySelector('button[type="submit"]')
  submit.disabled = true
  try {
    const result = isSignup
      ? await supabase.auth.signUp({
        email,
        password,
        options: { data: { shop_name: String(form.get('shopName')).trim() } },
      })
      : await supabase.auth.signInWithPassword({ email, password })
    if (result.error) throw result.error
    if (isSignup && !result.data.session) {
      document.querySelector('#auth-error').textContent = t('configureEmail')
      return
    }
    state.session = result.data.session
    await loadLedger()
    if (state.session) await startRealtime()
  } catch (error) {
    document.querySelector('#auth-error').textContent = t('authError') + formatError(error)
  } finally {
    state.loading = false
    if (submit.isConnected) submit.disabled = false
  }
}

async function onForgotPassword() {
  const email = document.querySelector('#auth-form [name="email"]').value.trim()
  if (!email) {
    document.querySelector('#auth-error').textContent = 'Enter your email address first.'
    return
  }
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.href })
  if (error) document.querySelector('#auth-error').textContent = formatError(error)
  else showToast(t('resetSent'))
}

function renderApp() {
  document.documentElement.lang = state.language
  setTheme()
  if (!state.session) return renderAuth()
  const activeSection = state.selectedCustomer
    ? `${text('customers')} · ${escapeHTML(state.customers.find((customer) => customer.id === state.selectedCustomer)?.name || '')}`
    : text('overview')
  const rows = filteredCustomers()
  const month = new Date()
  const monthly = state.entries.filter((entry) => {
    const date = new Date(entry.occurred_at)
    return date.getFullYear() === month.getFullYear() && date.getMonth() === month.getMonth()
  })
  const due = state.customers.reduce((sum, customer) => sum + Math.max(0, balanceFor(customer.id)), 0)
  const owingCount = state.customers.filter((customer) => balanceFor(customer.id) > 0).length
  const paidMonth = monthly.filter((entry) => entry.kind === 'payment').reduce((sum, entry) => sum + Number(entry.amount), 0)
  const salesMonth = monthly.filter((entry) => entry.kind === 'sale').reduce((sum, entry) => sum + Number(entry.amount), 0)
  root.innerHTML = `
    <div class="app-frame">
      <aside class="sidebar">
        <a class="brand-mark" href="./"><span class="brand-icon">S</span><span>${text('app')}<small>${text('subtitle')}</small></span></a>
        <div class="shop-switcher"><span class="shop-avatar">${escapeHTML((state.profile?.shop_name || t('emptyShop')).slice(0, 1).toUpperCase())}</span><span><b>${escapeHTML(state.profile?.shop_name || t('emptyShop'))}</b><small>${escapeHTML(state.session.user.email)}</small></span><i>⌄</i></div>
        <p class="nav-caption">WORKSPACE</p>
        <button class="nav-item nav-active" id="go-overview"><span>◫</span>${text('overview')}</button>
        <button class="nav-item" id="go-customers"><span>♙</span>${text('customers')}<b>${state.customers.length}</b></button>
        <div class="sidebar-bottom">
          <div class="sync-indicator"><i></i>${text('syncLive')}</div>
          <div class="sidebar-controls">${languageControl()}${themeControl()}</div>
          <button class="nav-item signout-button" id="signout"><span>↪</span>${text('signOut')}</button>
        </div>
      </aside>
      <main class="main-content">
        <header class="topbar">
          <div><p class="eyebrow">${text('welcome')}</p><h1>${activeSection}</h1></div>
          <div class="topbar-actions"><label class="search-box"><span>⌕</span><input id="customer-search" placeholder="${text('search')}" value="${escapeHTML(state.search)}"><kbd>⌘ K</kbd></label><button class="button button-primary" id="new-entry-top"><span>＋</span>${text('addEntry')}</button><button class="profile-button" aria-label="${text('signOut')}" id="profile-signout">${escapeHTML((state.session.user.email || 'S').slice(0, 1).toUpperCase())}</button></div>
        </header>
        ${state.loading ? `<div class="loading-panel">${text('loading')}</div>` : ''}
        <section class="welcome-banner">
          <div><p class="eyebrow">YOUR DAILY SNAPSHOT</p><h2>${text('welcome')}, ${escapeHTML((state.profile?.shop_name || t('emptyShop')).split(/\s+/)[0])} <span>✦</span></h2><p>Here’s how your books are looking. Everything stays in sync across your signed-in shop devices.</p></div>
          <div class="banner-mark"><span>₹</span><i>✦</i><b>●</b></div>
          <div class="banner-date">${new Date().toLocaleDateString(state.language === 'ta' ? 'ta-IN' : 'en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
        </section>
        <section class="metrics-grid">
          ${metricCard('totalDue', money(due), `${owingCount} ${text('owe').toLowerCase()}`, '₹', 'metric-purple')}
          ${metricCard('owe', owingCount, `${state.customers.length} ${text('customers').toLowerCase()}`, '♙', 'metric-blue')}
          ${metricCard('received', money(paidMonth), 'Payment entries', '↗', 'metric-green')}
          ${metricCard('cashSales', money(salesMonth), 'Cash sale entries', '◈', 'metric-orange')}
        </section>
        <section class="workspace-grid">
          <section class="panel customer-panel" id="customer-panel">
            <header class="panel-header"><div><h2>${text('customers')} <span class="count-pill">${state.customers.length}</span></h2><p>Track outstanding balances by customer.</p></div><div class="panel-actions"><button class="button button-secondary" id="export-ledger">⇩ ${text('export')}</button><button class="button button-primary" id="new-customer">＋ ${text('addCustomer')}</button></div></header>
            <div class="filter-row">
              ${filterButton('all', 'allCustomers')}${filterButton('owing', 'owing')}${filterButton('advance', 'advance')}
              <span class="filter-spacer"></span><span class="live-pill"><i></i>${text('syncLive')}</span>
            </div>
            ${rows.length ? `<div class="customer-table-wrap"><table class="customer-table"><thead><tr><th>${text('customer')}</th><th>${text('phone')}</th><th>${text('balance')}</th><th>${text('action')}</th></tr></thead><tbody>${rows.map(renderCustomerRow).join('')}</tbody></table></div>` : `<div class="empty-state"><span class="empty-icon">♙</span><h3>${text(state.customers.length ? 'noResults' : 'noCustomers')}</h3><p>${text(state.customers.length ? 'searchEmpty' : 'startLedger')}</p>${!state.customers.length ? `<button class="button button-primary" id="empty-new-customer">＋ ${text('addCustomer')}</button>` : ''}</div>`}
          </section>
          <section class="panel activity-panel">
            <header class="panel-header"><div><h2>${text('recentActivity')}</h2><p>Latest ledger entries across your shop.</p></div><button class="icon-button" id="export-activity" aria-label="${text('export')}">⇩</button></header>
            ${state.entries.length ? `<div class="activity-list">${state.entries.slice(0, 12).map(renderEntryRow).join('')}</div>` : `<div class="empty-state compact-empty"><span class="empty-icon">↗</span><h3>${text('noActivity')}</h3><p>Add a credit, payment, or cash sale to see it here.</p><button class="button button-secondary" id="activity-new-entry">${text('addEntry')}</button></div>`}
          </section>
        </section>
        <footer class="app-footer"><span>ShopLedger · Private to ${escapeHTML(state.profile?.shop_name || t('emptyShop'))}</span><span class="connection-label"><i></i>${text('syncLive')}</span></footer>
      </main>
      <nav class="mobile-nav"><button id="mobile-overview">◫<span>${text('overview')}</span></button><button id="mobile-customers">♙<span>${text('customers')}</span></button><button id="mobile-new-entry">＋<span>${text('addEntry')}</span></button><button id="mobile-signout">↪<span>${text('signOut')}</span></button><label class="mobile-language">${languageControl()}</label>${themeControl()}</nav>
    </div>
    <dialog id="entry-dialog" class="app-dialog"></dialog>
    <dialog id="customer-dialog" class="app-dialog"></dialog>`
  bindLanguage()
  bindTheme()
  bindDashboard()
}

function metricCard(label, value, detail, icon, variant) {
  return `<article class="metric-card ${variant}"><div class="metric-top"><span>${text(label)}</span><i>${icon}</i></div><strong>${value}</strong><small>${detail}</small><div class="metric-spark" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></article>`
}

function filterButton(filter, label) {
  return `<button class="filter-chip ${state.filter === filter ? 'filter-active' : ''}" data-filter="${filter}">${text(label)}</button>`
}

function filteredCustomers() {
  return state.customers.filter((customer) => {
    if (state.selectedCustomer && customer.id !== state.selectedCustomer) return false
    const balance = balanceFor(customer.id)
    if (state.filter === 'owing' && balance <= 0) return false
    if (state.filter === 'advance' && balance >= 0) return false
    if (state.search) {
      const relatedNotes = state.entries.filter((entry) => entry.customer_id === customer.id).map((entry) => entry.note || '').join(' ')
      const needle = state.search.toLocaleLowerCase()
      if (!`${customer.name} ${customer.phone || ''} ${relatedNotes}`.toLocaleLowerCase().includes(needle)) return false
    }
    return true
  }).sort((a, b) => balanceFor(b.id) - balanceFor(a.id) || a.name.localeCompare(b.name))
}

function renderCustomerRow(customer) {
  const balance = balanceFor(customer.id)
  const initial = escapeHTML(customer.name.trim().slice(0, 1).toLocaleUpperCase())
  const type = balance > 0 ? text('dueLabel') : balance < 0 ? text('advanceLabel') : 'settled'
  return `<tr>
    <td><button class="customer-name-cell" data-view-customer="${customer.id}"><span class="customer-avatar">${initial}</span><span><b>${escapeHTML(customer.name)}</b><small>${state.entries.filter((entry) => entry.customer_id === customer.id).length} entries</small></span></button></td>
    <td>${customer.phone ? `<a class="phone-link" href="tel:${escapeHTML(customer.phone)}">${escapeHTML(customer.phone)}</a>` : '<span class="muted-cell">—</span>'}</td>
    <td><span class="balance-pill ${balance > 0 ? 'balance-due' : balance < 0 ? 'balance-advance' : 'balance-zero'}">${money(Math.abs(balance))}</span><small class="balance-caption">${type}</small></td>
    <td><div class="row-actions">${balance > 0 && customer.phone ? `<button class="small-action reminder-action" data-remind="${customer.id}" title="${text('reminder')}">↗</button>` : ''}<button class="small-action" data-edit-customer="${customer.id}" title="${text('edit')}">✎</button><button class="small-action danger-action" data-delete-customer="${customer.id}" title="${text('delete')}">×</button></div></td>
  </tr>`
}

function renderEntryRow(entry) {
  const customer = state.customers.find((item) => item.id === entry.customer_id)
  const labels = { credit: 'credit', payment: 'payment', sale: 'sale' }
  const signs = { credit: '+', payment: '−', sale: '+' }
  const classes = { credit: 'entry-credit', payment: 'entry-payment', sale: 'entry-sale' }
  return `<article class="activity-item">
    <span class="activity-icon ${classes[entry.kind]}">${entry.kind === 'credit' ? '↗' : entry.kind === 'payment' ? '↓' : '◈'}</span>
    <div class="activity-details"><b>${escapeHTML(customer?.name || '—')}</b><span>${text(labels[entry.kind])}${entry.note ? ` · ${escapeHTML(entry.note)}` : ''}</span><small>${localDate(entry.occurred_at)}</small></div>
    <div class="activity-amount"><b class="${entry.kind === 'payment' ? 'amount-positive' : 'amount-neutral'}">${signs[entry.kind]}${money(entry.amount)}</b><div><button class="text-action" data-edit-entry="${entry.id}">${text('edit')}</button><button class="text-action danger-text" data-delete-entry="${entry.id}">×</button></div></div>
  </article>`
}

function bindDashboard() {
  document.querySelector('#signout')?.addEventListener('click', signOut)
  document.querySelector('#profile-signout')?.addEventListener('click', signOut)
  document.querySelector('#mobile-signout')?.addEventListener('click', signOut)
  document.querySelector('#go-overview')?.addEventListener('click', () => { state.selectedCustomer = ''; render() })
  document.querySelector('#go-customers')?.addEventListener('click', () => document.querySelector('#customer-panel').scrollIntoView({ behavior: 'smooth' }))
  document.querySelector('#mobile-overview')?.addEventListener('click', () => {
    state.selectedCustomer = ''
    render()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
  document.querySelector('#mobile-customers')?.addEventListener('click', () => document.querySelector('#customer-panel').scrollIntoView({ behavior: 'smooth' }))
  document.querySelector('#new-entry-top')?.addEventListener('click', () => openEntryDialog())
  document.querySelector('#mobile-new-entry')?.addEventListener('click', () => openEntryDialog())
  document.querySelector('#activity-new-entry')?.addEventListener('click', () => openEntryDialog())
  document.querySelector('#new-customer')?.addEventListener('click', () => openCustomerDialog())
  document.querySelector('#empty-new-customer')?.addEventListener('click', () => openCustomerDialog())
  document.querySelector('#export-ledger')?.addEventListener('click', exportCsv)
  document.querySelector('#export-activity')?.addEventListener('click', exportCsv)
  document.querySelector('#customer-search')?.addEventListener('input', (event) => {
    state.search = event.target.value
    const position = event.target.selectionStart
    render()
    const input = document.querySelector('#customer-search')
    input.focus()
    input.setSelectionRange(position, position)
  })
  document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => {
    state.filter = button.dataset.filter
    render()
  }))
  document.querySelector('#customer-panel')?.addEventListener('click', onCustomerAction)
  document.querySelector('.activity-list')?.addEventListener('click', onEntryAction)
  document.querySelector('#entry-dialog')?.addEventListener('click', (event) => closeOnBackdrop(event, '#entry-dialog'))
  document.querySelector('#customer-dialog')?.addEventListener('click', (event) => closeOnBackdrop(event, '#customer-dialog'))
}

function onShortcut(event) {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k' && state.session) {
    event.preventDefault()
    document.querySelector('#customer-search')?.focus()
  }
}

function closeOnBackdrop(event, selector) {
  if (event.target === event.currentTarget) event.currentTarget.close()
}

function entryOptions(selected = 'credit') {
  return ['credit', 'payment', 'sale'].map((kind) => `<option value="${kind}" ${selected === kind ? 'selected' : ''}>${text(kind)}</option>`).join('')
}

function openEntryDialog(entry = null, defaults = {}) {
  if (!state.customers.length && !defaults.name) {
    showToast(t('startLedger'), true)
    openCustomerDialog()
    return
  }
  const dialog = document.querySelector('#entry-dialog')
  const date = entry?.occurred_at ? new Date(entry.occurred_at) : new Date()
  const dateValue = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
  let newCustomerName = defaults.name || ''
  dialog.innerHTML = `
    <form id="entry-form" class="dialog-form">
      <header class="dialog-header"><div><p class="eyebrow">LEDGER ENTRY</p><h2>${text(entry ? 'edit' : 'addEntry')}</h2></div><button class="icon-button" type="button" data-close-dialog aria-label="${text('cancel')}">×</button></header>
      <label>${text('customer')}<select name="customerId" required>${state.customers.map((customer) => `<option value="${customer.id}" ${entry?.customer_id === customer.id || (!entry && !defaults.name && customer.id === state.selectedCustomer) ? 'selected' : ''}>${escapeHTML(customer.name)}</option>`).join('')}<option value="__new__" ${defaults.name ? 'selected' : ''}>＋ ${text('addCustomer')}</option></select></label>
      <div class="quick-customer-name" style="display:${defaults.name ? 'block' : 'none'}"><label>${text('name')}<input name="newCustomerName" value="${escapeHTML(newCustomerName)}"></label></div>
      <label>${text('action')}<select name="kind">${entryOptions(entry?.kind || defaults.kind || 'credit')}</select></label>
      <label>${text('amount')}<input name="amount" type="number" inputmode="decimal" min="0.01" step="0.01" value="${entry ? escapeHTML(entry.amount) : escapeHTML(defaults.amount || '')}" required></label>
      <label>${text('date')}<input name="occurredAt" type="datetime-local" value="${dateValue}" required></label>
      <label>${text('note')}<input name="note" maxlength="240" value="${escapeHTML(entry?.note || '')}"></label>
      <div class="form-error" role="alert"></div>
      <footer class="dialog-actions"><button class="button button-secondary" type="button" data-close-dialog>${text('cancel')}</button><button class="button button-primary" type="submit">${text('save')}</button></footer>
      <div class="voice-row"><button type="button" class="voice-entry-button" id="voice-entry">🎤 ${text('voice')}</button><small>${text('voiceHint')}</small></div>
    </form>`
  const form = dialog.querySelector('#entry-form')
  form.querySelector('[name="customerId"]').addEventListener('change', (event) => {
    const isNew = event.target.value === '__new__'
    form.querySelector('.quick-customer-name').style.display = isNew ? 'block' : 'none'
    form.querySelector('[name="newCustomerName"]').required = isNew
  })
  form.querySelectorAll('[data-close-dialog]').forEach((button) => button.addEventListener('click', () => dialog.close()))
  form.querySelector('#voice-entry').addEventListener('click', captureVoiceEntry)
  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const data = new FormData(form)
    const kind = String(data.get('kind'))
    const amount = Number(data.get('amount'))
    if (!Number.isFinite(amount) || amount <= 0) {
      form.querySelector('.form-error').textContent = t('invalid')
      return
    }
    let customerId = String(data.get('customerId'))
    if (customerId === '__new__') {
      const customerName = String(data.get('newCustomerName')).trim()
      if (!customerName) return
      const { data: customer, error } = await supabase.from('customers')
        .insert({ owner_id: state.session.user.id, name: customerName })
        .select().single()
      if (error) {
        form.querySelector('.form-error').textContent = formatError(error)
        return
      }
      customerId = customer.id
    }
    const record = {
      owner_id: state.session.user.id,
      customer_id: customerId,
      kind,
      amount,
      occurred_at: new Date(String(data.get('occurredAt'))).toISOString(),
      note: String(data.get('note')).trim() || null,
    }
    const button = form.querySelector('[type="submit"]')
    button.disabled = true
    const result = entry
      ? await supabase.from('ledger_entries').update(record).eq('id', entry.id)
      : await supabase.from('ledger_entries').insert(record)
    if (result.error) {
      button.disabled = false
      form.querySelector('.form-error').textContent = formatError(result.error)
      return
    }
    dialog.close()
    showToast(t('entrySaved'))
    await loadLedger(false)
  })
  dialog.showModal()
}

function openCustomerDialog(customer = null) {
  const dialog = document.querySelector('#customer-dialog')
  dialog.innerHTML = `
    <form id="customer-form" class="dialog-form">
      <header class="dialog-header"><div><p class="eyebrow">CUSTOMER PROFILE</p><h2>${text(customer ? 'edit' : 'addCustomer')}</h2></div><button class="icon-button" type="button" data-close-dialog aria-label="${text('cancel')}">×</button></header>
      <label>${text('name')}<input name="name" maxlength="100" value="${escapeHTML(customer?.name || '')}" required autofocus></label>
      <label>${text('phone')}<input name="phone" type="tel" inputmode="tel" maxlength="24" placeholder="919876543210" value="${escapeHTML(customer?.phone || '')}"><small>${text('phoneHint')}</small></label>
      <div class="form-error" role="alert"></div>
      <footer class="dialog-actions"><button class="button button-secondary" type="button" data-close-dialog>${text('cancel')}</button><button class="button button-primary" type="submit">${text('saveCustomer')}</button></footer>
    </form>`
  dialog.querySelectorAll('[data-close-dialog]').forEach((button) => button.addEventListener('click', () => dialog.close()))
  dialog.querySelector('#customer-form').addEventListener('submit', async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const phone = String(data.get('phone')).replace(/[^\d+]/g, '')
    const record = { owner_id: state.session.user.id, name: String(data.get('name')).trim(), phone: phone || null }
    const result = customer
      ? await supabase.from('customers').update(record).eq('id', customer.id)
      : await supabase.from('customers').insert(record)
    if (result.error) {
      form.querySelector('.form-error').textContent = formatError(result.error)
      return
    }
    dialog.close()
    showToast(t('customerSaved'))
    await loadLedger(false)
  })
  dialog.showModal()
}

function onCustomerAction(event) {
  const view = event.target.closest('[data-view-customer]')
  if (view) {
    state.selectedCustomer = view.dataset.viewCustomer
    render()
    return
  }
  const edit = event.target.closest('[data-edit-customer]')
  if (edit) openCustomerDialog(state.customers.find((customer) => customer.id === edit.dataset.editCustomer))
  const remove = event.target.closest('[data-delete-customer]')
  if (remove) void deleteCustomer(remove.dataset.deleteCustomer)
  const reminder = event.target.closest('[data-remind]')
  if (reminder) openWhatsAppReminder(reminder.dataset.remind)
}

function onEntryAction(event) {
  const edit = event.target.closest('[data-edit-entry]')
  if (edit) openEntryDialog(state.entries.find((entry) => entry.id === edit.dataset.editEntry))
  const remove = event.target.closest('[data-delete-entry]')
  if (remove) void deleteEntry(remove.dataset.deleteEntry)
}

async function deleteCustomer(id) {
  const customer = state.customers.find((item) => item.id === id)
  if (!customer || !window.confirm(t('confirmDelete'))) return
  const { error } = await supabase.from('customers').delete().eq('id', id)
  if (error) {
    showToast(formatError(error), true)
    return
  }
  showToast(t('deleted'))
  await loadLedger(false)
}

async function deleteEntry(id) {
  if (!window.confirm(t('confirmDeleteEntry'))) return
  const { error } = await supabase.from('ledger_entries').delete().eq('id', id)
  if (error) {
    showToast(t('errorPrefix') + formatError(error), true)
    return
  }
  showToast(t('deleted'))
  await loadLedger(false)
}

function openWhatsAppReminder(customerId) {
  const customer = state.customers.find((item) => item.id === customerId)
  if (!customer?.phone) return
  const number = customer.phone.replace(/\D/g, '')
  if (number.length < 8) {
    showToast(t('correct'), true)
    return
  }
  const message = t('shareReminder')
    .replace('{name}', customer.name)
    .replace('{shop}', state.profile?.shop_name || t('emptyShop'))
    .replace('{amount}', money(balanceFor(customer.id)))
  window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
}

function csvCell(value) {
  let safe = String(value ?? '')
  if (/^[=+\-@]/.test(safe)) safe = `'${safe}`
  return `"${safe.replace(/"/g, '""')}"`
}

function exportCsv() {
  const customers = new Map(state.customers.map((customer) => [customer.id, customer]))
  const lines = [
    ['Date', 'Customer', 'Phone', 'Type', 'Amount INR', 'Note', 'Current balance INR'].map(csvCell).join(','),
    ...state.entries.map((entry) => {
      const customer = customers.get(entry.customer_id)
      return [
        new Date(entry.occurred_at).toISOString(), customer?.name, customer?.phone,
        entry.kind, entry.amount, entry.note, balanceFor(entry.customer_id),
      ].map(csvCell).join(',')
    }),
  ]
  const blob = new Blob([`\uFEFF${lines.join('\r\n')}`], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `shop-ledger-${new Date().toISOString().slice(0, 10)}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

function normalizeDigits(value) {
  const tamilDigits = '௦௧௨௩௪௫௬௭௮௯'
  return value.replace(/[௦-௯]/g, (digit) => String(tamilDigits.indexOf(digit))).replace(/,/g, '')
}

function parseVoiceEntry(input) {
  const value = normalizeDigits(input.trim())
  const match = value.match(/\d+(?:\.\d+)?/)
  if (!match) return { name: '', amount: '', kind: 'credit' }
  const amount = Number(match[0])
  const removeWords = /ரூபாய்|ரூ\.?|rupees?|rs\.?|₹|கடன்|பாக்கி|வரவு|கொடுத்த|செலுத்\w*|திருப்ப\w*|ரொக்க|விற்ப\w*|cash|sale|sold|credit|paid|payment|received|returned|due/gi
  const name = value.slice(0, match.index) + ' ' + value.slice(match.index + match[0].length)
  const cleanName = name.replace(removeWords, ' ').replace(/[^\p{L}\p{N}\s.'-]/gu, ' ').replace(/\s+/g, ' ').trim()
  const kind = /வரவு|கொடுத்த|செலுத்|திருப்ப|paid|payment|received|returned/i.test(value)
    ? 'payment'
    : /ரொக்க|விற்ப|cash|sale|sold/i.test(value) ? 'sale' : 'credit'
  return { name: cleanName, amount: Number.isFinite(amount) ? String(amount) : '', kind }
}

function captureVoiceEntry() {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!Recognition) {
    showToast(t('microphoneUnavailable'), true)
    return
  }
  const button = document.querySelector('#voice-entry')
  const recognition = new Recognition()
  recognition.lang = state.language === 'ta' ? 'ta-IN' : 'en-IN'
  recognition.interimResults = false
  recognition.maxAlternatives = 1
  button.disabled = true
  button.textContent = `🎤 ${t('listening')}`
  recognition.onresult = (event) => {
    const parsed = parseVoiceEntry(event.results[0][0].transcript)
    document.querySelector('#entry-dialog').close()
    openEntryDialog(null, parsed)
  }
  recognition.onerror = (event) => {
    showToast(event.error === 'network' ? t('speechNetwork') : `${t('errorPrefix')}${event.error}`, true)
  }
  recognition.onend = () => {
    if (button.isConnected) {
      button.disabled = false
      button.textContent = `🎤 ${t('voice')}`
    }
  }
  recognition.start()
}

async function loadLedger(showLoading = true) {
  if (!state.session || !supabase) return
  state.loading = showLoading
  render()
  try {
    const ownerId = state.session.user.id
    const [profileResult, customersResult, entriesResult] = await Promise.all([
      supabase.from('shop_profiles').select('*').eq('owner_id', ownerId).maybeSingle(),
      supabase.from('customers').select('*').order('name'),
      supabase.from('ledger_entries').select('*').order('occurred_at', { ascending: false }).limit(2000),
    ])
    if (profileResult.error) throw profileResult.error
    if (customersResult.error) throw customersResult.error
    if (entriesResult.error) throw entriesResult.error
    state.profile = profileResult.data || { shop_name: t('emptyShop') }
    state.customers = customersResult.data
    state.entries = entriesResult.data
    state.loading = false
    render()
  } catch (error) {
    state.loading = false
    render()
    showToast(t('errorPrefix') + formatError(error), true)
  }
}

async function signOut() {
  if (!supabase) return
  if (state.channel) await supabase.removeChannel(state.channel)
  state.channel = null
  const { error } = await supabase.auth.signOut()
  if (error) {
    showToast(t('errorPrefix') + formatError(error), true)
    return
  }
  state.session = null
  state.profile = null
  state.customers = []
  state.entries = []
  render()
}

async function startRealtime() {
  if (!state.session || state.channel) return
  const ownerId = state.session.user.id
  state.channel = supabase.channel(`shop-ledger-${ownerId}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'customers', filter: `owner_id=eq.${ownerId}` }, () => void loadLedger(false))
    .on('postgres_changes', { event: '*', schema: 'public', table: 'ledger_entries', filter: `owner_id=eq.${ownerId}` }, () => void loadLedger(false))
    .subscribe((status) => {
      document.querySelector('.sync-indicator')?.classList.toggle('sync-offline', status !== 'SUBSCRIBED')
      const statusText = document.querySelector('.sync-indicator')
      if (statusText) statusText.lastChild.textContent = status === 'SUBSCRIBED' ? t('syncLive') : t('syncPaused')
    })
}

function render() {
  if (!supabase) return renderSetup()
  if (!state.session) return renderAuth()
  renderApp()
}

async function initialize() {
  if (!supabase) {
    renderSetup()
    return
  }
  const { data, error } = await supabase.auth.getSession()
  if (error) showToast(t('authError') + formatError(error), true)
  state.session = data.session
  render()
  if (state.session) {
    await loadLedger()
    await startRealtime()
  }
  supabase.auth.onAuthStateChange(async (_event, session) => {
    const hadSession = Boolean(state.session)
    state.session = session
    if (!session) {
      if (state.channel) await supabase.removeChannel(state.channel)
      state.channel = null
      state.profile = null
      state.customers = []
      state.entries = []
      render()
    } else if (!hadSession) {
      render()
      await loadLedger()
      await startRealtime()
    }
  })
}

setTheme()
document.addEventListener('keydown', onShortcut)
void initialize()
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch((error) => {
    console.error('Service worker registration failed:', error)
  }))
}
