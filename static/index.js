const s = ["auto", "light", "dark"], a = document.querySelector(".js-theme");
function g() {
  let t = h();
  t += 1, s[t] || (t = 0);
  const e = s[t];
  setColorMode(e), sessionStorage._theme = e, m(e);
}
function h() {
  return s.indexOf(document.documentElement.getAttribute("data-color-mode") || "auto");
}
function m(t) {
  const e = a.getAttribute("data-aria-" + t);
  a.setAttribute("aria-label", e);
}
a && (a.addEventListener("click", g), m(s[h()] || "auto"));
const l = document.querySelectorAll("time.dt-published"), w = document.documentElement.lang;
function p(t) {
  const e = t.getAttribute("datetime"), o = new Date(e), n = Intl.DateTimeFormat(w, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  t.textContent = n.format(o);
}
for (let t = 0; t < l.length; t++)
  p(l[t]);
function d(t) {
  let e = t.getAttribute("data-src");
  e || (e = t.getAttribute("data-cover"));
  let o = "background-image:url(" + e + ")";
  const n = t.getAttribute("data-width"), r = t.getAttribute("data-height");
  if (n && r) {
    const i = parseInt(r, 10) * 100 / parseInt(n, 10) + "vw";
    o += ";height:" + i;
  }
  t.setAttribute("style", o);
}
const c = document.querySelectorAll(".js-cover");
if ("IntersectionObserver" in window) {
  let t = new IntersectionObserver(function(e, o) {
    e.forEach(function(n) {
      n.isIntersecting && (d(n.target), t.unobserve(n.target));
    });
  });
  for (let e = 0; e < c.length; e++)
    t.observe(c[e]);
} else
  for (let t = 0; t < c.length; t++)
    d(c[t]);
const b = {
  tw: "https://x.com/intent/post?text={t}&url={u}",
  fb: "http://www.facebook.com/sharer.php?u={u}",
  wb: "http://service.weibo.com/share/share.php?title={t}&url={u}",
  tg: "https://telegram.me/share/url?text={t}&url={u}"
}, f = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1" d="M18 6L6 18M6 6l12 12"></path></svg>';
function v(t) {
  let e = document.querySelector("#wechat-share");
  if (e)
    return e.classList.add("show");
  e = document.createElement("div"), e.id = "wechat-share", e.classList.add("show");
  const o = document.createElement("button");
  o.innerHTML = f, o.addEventListener("click", () => {
    e.classList.remove("show");
  }), e.appendChild(o);
  const n = document.createElement("div");
  e.appendChild(n), import("https://esm.sh/uqr").then(({ renderSVG: r }) => {
    n.innerHTML = "<h3>扫描二维码分享到微信</h3>" + r(t);
  }), document.body.appendChild(e);
}
function y(t) {
  const e = document.querySelector('meta[property="og:title"]').getAttribute("content"), o = document.querySelector('link[rel="canonical"]').getAttribute("href");
  t.addEventListener("click", function(n) {
    n.preventDefault();
    const r = t.getAttribute("data-type");
    if (r === "wx")
      return v(o);
    let i = b[r];
    i = i.replace("{t}", encodeURIComponent(e)).replace("{u}", encodeURIComponent(o)), window.open(i, "_blank", "width=615,height=505");
  });
}
const u = document.querySelectorAll("a.js-share");
for (let t = 0; t < u.length; t++)
  y(u[t]);
/windows/i.test(navigator.userAgent) && document.body.classList.add("win");
