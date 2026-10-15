(function () {
  var KEY = "bm-pm-demo-gate";
  var ACCOUNT = "admin";
  var PASSWORD = "bm@2026#Secure!";
  var EYE = '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>';
  var EYE_OFF = '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 3l18 18M10.6 10.7a2 2 0 0 0 2.7 2.7"/><path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.1 3.8M6.2 6.2C3.5 8 2 12 2 12s3.5 7 10 7c1.2 0 2.3-.2 3.3-.6"/></svg>';

  function readAuth() {
    try {
      return localStorage.getItem(KEY) === "1";
    } catch (err) {
      return false;
    }
  }

  function writeAuth() {
    try {
      localStorage.setItem(KEY, "1");
    } catch (err) {}
  }

  function clearAuth() {
    try {
      localStorage.removeItem(KEY);
    } catch (err) {}
  }

  var params = new URLSearchParams(location.search);
  if (params.get("relogin") === "1") {
    clearAuth();
    params.delete("relogin");
    var query = params.toString();
    history.replaceState(null, "", location.pathname + (query ? "?" + query : "") + location.hash);
  }

  if (readAuth()) return;

  var style = document.createElement("style");
  style.id = "demo-gate-style";
  style.textContent = [
    "html.gate-lock, html.gate-lock body { height: 100%; margin: 0; }",
    "html.gate-lock body > :not(#demo-gate) { display: none !important; }",
    "#demo-gate {",
    "  --blue:#3267f6; --blue-dark:#2454df; --ink:#182338; --muted:#8794aa;",
    "  --line:#e3eaf5; --lav:#eef1ff; --bg:#f8faff;",
    "  position: fixed; inset: 0; z-index: 2147483646; overflow: auto;",
    "  margin: 0; color: var(--ink); background: #fff;",
    "  font-family: Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"PingFang SC\", \"Microsoft YaHei\", sans-serif;",
    "}",
    "#demo-gate * { box-sizing: border-box; }",
    "#demo-gate button, #demo-gate input { font: inherit; }",
    "#demo-gate .page { min-height: 100%; display: grid; grid-template-columns: minmax(480px, 52%) minmax(440px, 48%); }",
    "#demo-gate .brand-panel { position: relative; overflow: hidden; min-height: 720px; padding: 56px 7.2%; background: radial-gradient(ellipse at 18% 15%, rgba(255,255,255,.88), transparent 36%), linear-gradient(145deg, #e6ebff 0%, #eef0ff 48%, #e3f3ff 100%); }",
    "#demo-gate .brand-panel:before { content: \"\"; position: absolute; width: 560px; height: 560px; border: 1px solid rgba(91,126,246,.12); border-radius: 50%; right: -240px; top: 23%; box-shadow: 0 0 0 52px rgba(255,255,255,.13), 0 0 0 105px rgba(255,255,255,.10); }",
    "#demo-gate .brand-panel:after { content: \"\"; position: absolute; width: 420px; height: 420px; border-radius: 50%; background: rgba(255,255,255,.18); filter: blur(2px); left: -230px; bottom: -210px; }",
    "#demo-gate .brand { display: flex; align-items: center; gap: 16px; position: relative; z-index: 2; }",
    "#demo-gate .logo { width: 58px; height: 58px; border-radius: 18px; background: linear-gradient(140deg, #3267f6, #7541ed); display: grid; place-items: center; color: #fff; font-weight: 800; font-size: 31px; box-shadow: 0 12px 28px rgba(70,89,220,.22); }",
    "#demo-gate .brand-name { font-size: 27px; font-weight: 760; letter-spacing: -.8px; }",
    "#demo-gate .brand-sub { margin-top: 4px; font-size: 14px; color: #61708b; letter-spacing: 1px; }",
    "#demo-gate .brand-copy { position: relative; z-index: 2; margin-top: 72px; max-width: 470px; }",
    "#demo-gate .eyebrow { font-size: 11px; font-weight: 750; letter-spacing: 2.3px; color: #627dbb; }",
    "#demo-gate .brand-copy h1 { font-size: clamp(28px, 3.1vw, 42px); line-height: 1.3; letter-spacing: -1.2px; margin: 16px 0 12px; max-width: 420px; }",
    "#demo-gate .brand-copy p { font-size: 15px; line-height: 1.9; color: #71809a; margin: 0; max-width: 390px; }",
    "#demo-gate .visual { position: relative; z-index: 2; height: 360px; margin: 34px auto 0; max-width: 540px; }",
    "#demo-gate .connector { position: absolute; inset: 14px 12px; width: calc(100% - 24px); height: calc(100% - 28px); overflow: visible; }",
    "#demo-gate .ui-card { position: absolute; background: rgba(255,255,255,.76); border: 1px solid rgba(255,255,255,.95); box-shadow: 0 18px 48px rgba(71,99,175,.10); backdrop-filter: blur(12px); border-radius: 16px; padding: 18px; display: flex; align-items: center; gap: 14px; }",
    "#demo-gate .card-a { left: 3%; top: 8%; width: 58%; }",
    "#demo-gate .card-b { right: 1%; top: 42%; width: 64%; }",
    "#demo-gate .card-c { left: 10%; bottom: 4%; width: 58%; }",
    "#demo-gate .card-icon { width: 44px; height: 44px; border-radius: 13px; display: grid; place-items: center; flex-shrink: 0; color: #fff; background: linear-gradient(145deg, #76adff, #4778f5); }",
    "#demo-gate .card-b .card-icon { background: linear-gradient(145deg, #9d8aff, #6548ed); }",
    "#demo-gate .card-c .card-icon { background: linear-gradient(145deg, #79c7ff, #3987ed); }",
    "#demo-gate .card-title { font-size: 14px; font-weight: 720; margin-bottom: 10px; }",
    "#demo-gate .skeleton { height: 7px; background: #e0e7f7; border-radius: 10px; margin-top: 7px; width: 88%; }",
    "#demo-gate .skeleton.short { width: 65%; }",
    "#demo-gate .progress-row { display: flex; align-items: center; gap: 10px; }",
    "#demo-gate .progress { height: 7px; background: #e1e7f7; border-radius: 10px; width: 135px; overflow: hidden; }",
    "#demo-gate .progress span { display: block; width: 68%; height: 100%; background: linear-gradient(90deg, #3675ff, #7b4cf2); border-radius: 10px; }",
    "#demo-gate .percent { font-size: 11px; color: #71809a; font-weight: 700; }",
    "#demo-gate .pill { position: absolute; font-size: 11px; color: #6484d9; background: rgba(220,230,255,.8); border: 1px solid rgba(255,255,255,.7); padding: 8px 12px; border-radius: 99px; }",
    "#demo-gate .pill.one { right: 10%; top: 9%; }",
    "#demo-gate .pill.two { right: 5%; bottom: 5%; }",
    "#demo-gate .brand-footer { position: absolute; z-index: 2; left: 7.2%; bottom: 42px; display: flex; align-items: center; gap: 12px; color: #61718e; font-size: 13px; }",
    "#demo-gate .footer-mark { width: 22px; height: 3px; border-radius: 5px; background: linear-gradient(90deg, #3877ff, #8961f5); }",
    "#demo-gate .login-panel { display: flex; align-items: center; justify-content: center; padding: 60px 9% 76px; background: linear-gradient(180deg, #fff 0%, #fcfdff 100%); }",
    "#demo-gate .login-wrap { width: 100%; max-width: 430px; }",
    "#demo-gate .topline { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }",
    "#demo-gate .secure { display: flex; align-items: center; gap: 7px; color: #94a0b3; font-size: 12px; }",
    "#demo-gate .dot { width: 7px; height: 7px; border-radius: 50%; background: #37b780; box-shadow: 0 0 0 4px #e8f8f1; }",
    "#demo-gate .kicker { font-size: 11px; letter-spacing: 2px; font-weight: 750; color: #8797b2; margin-bottom: 12px; }",
    "#demo-gate .login-wrap h2 { font-size: 32px; letter-spacing: -.8px; margin: 0 0 10px; font-weight: 760; }",
    "#demo-gate .subtitle { color: #8a97ac; font-size: 14px; margin: 0 0 38px; line-height: 1.7; }",
    "#demo-gate .field { margin-bottom: 23px; }",
    "#demo-gate label { display: block; font-size: 13px; font-weight: 700; color: #3b4960; margin-bottom: 10px; }",
    "#demo-gate .input-wrap { height: 52px; display: flex; align-items: center; gap: 12px; padding: 0 15px; border: 1px solid #dfe7f3; border-radius: 9px; background: #fff; transition: border-color .18s, box-shadow .18s; }",
    "#demo-gate .input-wrap:focus-within { border-color: #7da1ff; box-shadow: 0 0 0 4px rgba(50,103,246,.09); }",
    "#demo-gate .input-wrap svg { width: 18px; height: 18px; color: #91a0b8; flex-shrink: 0; }",
    "#demo-gate input { border: 0; outline: 0; min-width: 0; flex: 1; color: #26334a; font-size: 14px; background: transparent; }",
    "#demo-gate input::placeholder { color: #b3bdcc; }",
    "#demo-gate .icon-button { display: grid; place-items: center; border: 0; background: transparent; padding: 4px; cursor: pointer; color: #8a99b0; }",
    "#demo-gate .icon-button:hover { color: var(--blue); }",
    "#demo-gate .icon-button svg { width: 19px; height: 19px; }",
    "#demo-gate .error { display: none; font-size: 12px; color: #df4d5a; margin-top: 8px; }",
    "#demo-gate .error.show { display: block; }",
    "#demo-gate .submit { height: 52px; width: 100%; margin-top: 7px; border: 0; border-radius: 9px; background: linear-gradient(100deg, #3267f6, #285ce9); color: #fff; font-size: 15px; font-weight: 700; cursor: pointer; box-shadow: 0 8px 18px rgba(50,103,246,.16); }",
    "#demo-gate .submit:hover { background: linear-gradient(100deg, #285ce9, #214fd2); box-shadow: 0 11px 24px rgba(50,103,246,.23); }",
    "#demo-gate .form-foot { display: flex; justify-content: center; gap: 8px; align-items: center; color: #a1aaba; font-size: 12px; margin-top: 27px; }",
    "#demo-gate .form-foot .line { width: 28px; height: 1px; background: #e6ebf3; }",
    "@media (max-width: 900px) {",
    "  #demo-gate .page { grid-template-columns: 1fr; }",
    "  #demo-gate .brand-panel { min-height: auto; padding: 28px 7% 24px; }",
    "  #demo-gate .brand-copy { margin-top: 44px; }",
    "  #demo-gate .brand-copy h1 { font-size: 30px; }",
    "  #demo-gate .brand-copy p { font-size: 14px; }",
    "  #demo-gate .visual { height: 280px; max-width: 480px; margin-top: 10px; }",
    "  #demo-gate .brand-footer { position: relative; left: auto; bottom: auto; margin-top: 12px; }",
    "  #demo-gate .login-panel { padding: 54px 8% 64px; }",
    "  #demo-gate .topline { margin-bottom: 28px; }",
    "}",
    "@media (max-width: 560px) {",
    "  #demo-gate .brand-panel { padding: 24px 22px 20px; }",
    "  #demo-gate .logo { width: 48px; height: 48px; border-radius: 15px; font-size: 26px; }",
    "  #demo-gate .brand-name { font-size: 23px; }",
    "  #demo-gate .brand-copy { margin-top: 32px; }",
    "  #demo-gate .brand-copy h1 { font-size: 27px; }",
    "  #demo-gate .visual { height: 235px; margin-top: 4px; }",
    "  #demo-gate .ui-card { padding: 12px; gap: 10px; border-radius: 12px; }",
    "  #demo-gate .card-icon { width: 36px; height: 36px; border-radius: 10px; }",
    "  #demo-gate .card-title { font-size: 12px; margin-bottom: 7px; }",
    "  #demo-gate .skeleton { height: 5px; }",
    "  #demo-gate .progress { width: 90px; }",
    "  #demo-gate .pill { font-size: 10px; padding: 6px 9px; }",
    "  #demo-gate .brand-footer { font-size: 12px; }",
    "  #demo-gate .login-panel { padding: 42px 24px 48px; }",
    "  #demo-gate .login-wrap h2 { font-size: 28px; }",
    "  #demo-gate .subtitle { margin-bottom: 30px; }",
    "}"
  ].join("\n");
  document.head.appendChild(style);
  document.documentElement.classList.add("gate-lock");

  function lockSiblings(locked) {
    if (!document.body) return;
    Array.prototype.forEach.call(document.body.children, function (el) {
      if (el.id === "demo-gate") return;
      if (locked) {
        el.setAttribute("inert", "");
        el.setAttribute("aria-hidden", "true");
      } else {
        el.removeAttribute("inert");
        el.removeAttribute("aria-hidden");
      }
    });
  }

  function unlock() {
    var gate = document.getElementById("demo-gate");
    if (gate) gate.remove();
    document.documentElement.classList.remove("gate-lock");
    if (style.parentNode) style.remove();
    lockSiblings(false);
    var next = document.documentElement.getAttribute("data-gate-continue");
    if (next) location.replace(next);
  }

  window.addEventListener("storage", function (event) {
    if (event.key === KEY && event.newValue === "1") unlock();
  });

  function mount() {
    if (document.getElementById("demo-gate")) return;
    var root = document.createElement("main");
    root.id = "demo-gate";
    root.innerHTML = [
      '<div class="page">',
      '  <section class="brand-panel">',
      '    <div class="brand"><div class="logo">迭</div><div><div class="brand-name">BM-PM</div><div class="brand-sub">迭代需求管理系统</div></div></div>',
      '    <div class="brand-copy">',
      '      <div class="eyebrow">BUILD · TRACK · IMPROVE</div>',
      '      <h1 id="gate-title">让每一次迭代，<br>都有迹可循。</h1>',
      '      <p>集中查看项目总览、迭代进度与需求内容，让协作更清晰，让每一步更新都有记录。</p>',
      "    </div>",
      '    <div class="visual" aria-hidden="true">',
      '      <svg class="connector" viewBox="0 0 520 350" fill="none"><path d="M94 73 C190 28 315 45 379 112 S400 223 287 260 S108 285 95 210 S150 135 94 73Z" stroke="#9AB8FF" stroke-width="1.3" stroke-opacity=".65"/><path d="M110 78 C165 100 200 135 245 164" stroke="#B6C9FF" stroke-width="1.2" stroke-dasharray="4 6"/><circle cx="379" cy="112" r="4.5" fill="#4F80FA"/><circle cx="287" cy="260" r="4.5" fill="#7357F5"/><circle cx="95" cy="210" r="4" fill="#4F80FA"/></svg>',
      '      <div class="ui-card card-a"><div class="card-icon"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg></div><div style="flex:1;min-width:0"><div class="card-title">需求管理</div><div class="skeleton"></div><div class="skeleton short"></div></div></div>',
      '      <div class="pill one">高效协同</div>',
      '      <div class="ui-card card-b"><div class="card-icon"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></div><div style="flex:1;min-width:0"><div class="card-title">迭代进度</div><div class="progress-row"><div class="progress"><span></span></div><span class="percent">68%</span></div></div></div>',
      '      <div class="ui-card card-c"><div class="card-icon"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19V9h4v10M10 19V4h4v15M16 19v-7h4v7"/></svg></div><div style="flex:1;min-width:0"><div class="card-title">项目总览</div><div class="skeleton"></div><div class="skeleton short"></div></div></div>',
      '      <div class="pill two">清晰可控</div>',
      "    </div>",
      '    <div class="brand-footer"><span class="footer-mark"></span><span>登录后查看项目总览与需求内容</span></div>',
      "  </section>",
      '  <section class="login-panel">',
      '    <div class="login-wrap">',
      '      <div class="topline"><div class="kicker" style="margin:0">PROJECT MANAGEMENT</div><div class="secure"><span class="dot"></span>安全登录</div></div>',
      "      <h2>登录 BM-PM</h2>",
      '      <p class="subtitle">核对账号后，即可进入需求预览。</p>',
      '      <form id="gate-form" novalidate>',
      '        <div class="field"><label for="gate-account">账号</label><div class="input-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4.5 21v-2a7.5 7.5 0 0 1 15 0v2"/></svg><input id="gate-account" name="account" autocomplete="username" placeholder="请输入账号" /></div><div class="error" id="accountError">请输入账号后再继续</div></div>',
      '        <div class="field"><label for="gate-password">密码</label><div class="input-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></svg><input id="gate-password" name="password" type="password" autocomplete="current-password" placeholder="请输入密码" /><button type="button" class="icon-button" id="togglePassword" aria-label="显示密码">' + EYE + '</button></div><div class="error" id="passwordError">请输入密码后再继续</div><div class="error" id="credentialError" role="alert">账号或密码不正确</div></div>',
      '        <button class="submit" type="submit">进入系统 <span aria-hidden="true">↗</span></button>',
      "      </form>",
      '      <div class="form-foot"><span class="line"></span><span>BM-PM 迭代需求管理系统</span><span class="line"></span></div>',
      "    </div>",
      "  </section>",
      "</div>"
    ].join("");
    document.body.appendChild(root);
    lockSiblings(true);

    var account = document.getElementById("gate-account");
    var password = document.getElementById("gate-password");
    var toggle = document.getElementById("togglePassword");
    var accountError = document.getElementById("accountError");
    var passwordError = document.getElementById("passwordError");
    var credentialError = document.getElementById("credentialError");
    account.focus();

    toggle.addEventListener("click", function () {
      var visible = password.type === "password";
      password.type = visible ? "text" : "password";
      toggle.setAttribute("aria-label", visible ? "隐藏密码" : "显示密码");
      toggle.innerHTML = visible ? EYE_OFF : EYE;
    });

    function clearErrors() {
      accountError.classList.remove("show");
      passwordError.classList.remove("show");
      credentialError.classList.remove("show");
      account.removeAttribute("aria-invalid");
      password.removeAttribute("aria-invalid");
    }

    account.addEventListener("input", clearErrors);
    password.addEventListener("input", clearErrors);

    document.getElementById("gate-form").addEventListener("submit", function (event) {
      event.preventDefault();
      var noAccount = !account.value.trim();
      var noPassword = !password.value;
      accountError.classList.toggle("show", noAccount);
      passwordError.classList.toggle("show", noPassword);
      credentialError.classList.remove("show");
      account.toggleAttribute("aria-invalid", noAccount);
      password.toggleAttribute("aria-invalid", noPassword);
      if (noAccount) {
        account.focus();
        return;
      }
      if (noPassword) {
        password.focus();
        return;
      }
      if (account.value === ACCOUNT && password.value === PASSWORD) {
        writeAuth();
        unlock();
        return;
      }
      credentialError.classList.add("show");
      account.setAttribute("aria-invalid", "true");
      password.setAttribute("aria-invalid", "true");
    });
  }

  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
})();
